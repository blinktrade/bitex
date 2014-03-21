#!/usr/bin/env python

#  Copyright (c) 2013 Bitex
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.


import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

import  base64

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template
from tornado.options import define, options

from tornado import  websocket

import urllib
import urllib2
import json
import uuid
from json import loads
from bitex.json_encoder import  JsonEncoder

import zmq
from bitex.message import JsonMessage, InvalidMessageException
from bitex.zmq_client import TradeClient, TradeClientException

from zmq.eventloop.zmqstream import  ZMQStream

define("callback_url", default="https://www.bitex.com.br/process_deposit?s=" )
define("port", default=8443, help="port" )
define("certfile",default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_certificate.pem") , help="Certificate file" )
define("keyfile", default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_privatekey.pem") , help="Private key file" )
define("trade_in",  default="tcp://127.0.0.1:5755", help="trade zmq queue" )
define("trade_pub", default="tcp://127.0.0.1:5756", help="trade zmq publish queue" )
define("session_timeout_limit", default=0, help="Session timeout")
define("db_echo", default=False, help="Prints every database command on the stdout" )
define("db_engine", default="sqlite:///" + os.path.join(ROOT_PATH, "db/", "ws_01_bitex.sqlite"), help="SQLAlchemy database engine string")

tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "ws_gateway.conf"))
tornado.options.parse_command_line()

from market_data_helper import  MarketDataPublisher, MarketDataSubscriber, generate_md_full_refresh

#from withdraw_confirmation import WithdrawConfirmationHandler, WithdrawConfirmedHandler
from deposit_hander import DepositHandler
from process_deposit_handler import ProcessDepositHandler
import datetime

class WebSocketHandler(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(WebSocketHandler, self).__init__(application, request, **kwargs)
    self.remote_ip = request.headers.get('X-Forwarded-For', request.headers.get('X-Real-Ip', request.remote_ip))
    print 'remote_ip',  self.remote_ip

    self.trade_client = TradeClient(self.application.zmq_context, self.application.trade_in_socket, options.trade_pub)
    self.md_subscriptions = {}

    self.user_response = None

  def on_trade_publish(self, message):
    self.write_message(str(message[1]))

  def open(self):
    try:
      self.trade_client.connect()
      self.trade_client.on_trade_publish = self.on_trade_publish
      self.application.register_connection(self)
    except TradeClientException, e:
      self.write_message('{"MsgType":"ERROR", "Description":"Error establishing connection with trade", "Detail": "' + str(e) + '"}' )
      self.trade_client.close()
      self.close()

  def write_message(self, message, binary=False):
    print "out_message,", self.trade_client.connection_id, ',', message
    super(WebSocketHandler, self).write_message(message, binary)

  def on_message(self, raw_message):
    if not self.trade_client.isConnected():
      return

    try:
      req_msg = JsonMessage(raw_message)
    except InvalidMessageException, e:
      self.write_message('{"MsgType":"ERROR", "Description":"Invalid message", "Detail": "' + str(e) + '"}' )
      self.application.unregister_connection(self)
      self.trade_client.close()
      self.close()
      return

    if req_msg.isUserRequest():
      print 'in_message ,', self.trade_client.connection_id, ' , ***LOGIN***'
    else:
      print 'in_message ,', self.trade_client.connection_id, ',', raw_message

    if req_msg.isMarketDataRequest(): # Market Data Request
      self.on_market_data_request(req_msg)

      if not self.trade_client.isConnected():
        self.application.unregister_connection(self)
        self.trade_client.close()
        self.close()
      return

    if req_msg.isDepositRequest():
      if not req_msg.get('DepositMethodID') and not req_msg.get('DepositID'):

        currency = req_msg.get('Currency')

        secret = uuid.uuid4().hex
        hot_wallet =  self.get_broker_wallet( 'hot', currency )
        callback_url = options.callback_url  + secret
        if not hot_wallet:
          return

        parameters = urllib.urlencode({
          'method': 'create',
          'address': hot_wallet,
          'callback': callback_url
        })

        url_payment_processor = None
        if currency == 'BTC':
          url_payment_processor = 'https://blockchain.info/api/receive'

        if not url_payment_processor:
          # TODO: Return NOT SUPPORTED COIN error to the user
          return

        try:
          response = urllib2.urlopen(url_payment_processor + '?' + parameters)
          data = json.load(response)
          req_msg.set('InputAddress', data['input_address'])
          req_msg.set('Destination',  data['destination'])
          req_msg.set('Secret', secret)
        except urllib2.HTTPError, e:
          self.write_message ( json.dumps( {
            'MsgType':'ERROR',
            'ReqID': req_msg.get('DepositReqID'),
            'Description': 'Blockchain.info is not available at this moment, please try again within few minutes',
            'Detail': str(e)
          }))
          return
        except Exception, e:
          self.write_message ( json.dumps( {
            'MsgType':'ERROR',
            'ReqID': req_msg.get('DepositReqID'),
            'Description': 'Error retrieving a new deposit address from Blockchain.info. Please, try again',
            'Detail': str(e)
          }))
          return

    try:
      resp_message = self.trade_client.sendMessage( req_msg )
      if resp_message:
        self.write_message(resp_message.raw_message)

      if resp_message and resp_message.isUserResponse():
        self.user_response = resp_message

      if not self.trade_client.isConnected():
        self.application.unregister_connection(self)
        self.trade_client.close()
        self.close()
    except TradeClientException, e:
      exception_message = {
        'MsgType': 'ERROR',
        'Description': 'Invalid message',
        'Detail': str(e)
      }
      self.write_message( json.dumps(exception_message) )
      self.application.unregister_connection(self)
      self.trade_client.close()
      self.close()

  def is_user_logged(self):
    if not self.user_response:
      return  False
    return self.user_response.get('UserStatus') == 1

  def get_broker_wallet(self, type, currency):
    if not self.user_response:
      return

    broker = self.user_response.get('Broker')
    if not broker:
      return

    if 'CryptoCurrencies' not in broker:
      return

    broker_crypto_currencies =  broker['CryptoCurrencies']
    for crypto_currency in broker_crypto_currencies:
      if crypto_currency['CurrencyCode'] == currency:
        for wallet in crypto_currency['Wallets']:
          if wallet['type']  == type:
            return wallet['address']


  def on_close(self):
    print 'on_close', self.trade_client.connection_id
    self.application.unregister_connection(self)
    self.trade_client.close()

  def on_market_data_request(self, msg):
    # Generate a FullRefresh
    req_id = msg.get('MDReqID')

    if int(msg.get('SubscriptionRequestType')) == 2: # Disable previous Snapshot + Update Request
      if req_id in self.md_subscriptions:
        del self.md_subscriptions[req_id]
      return

    market_depth = msg.get('MarketDepth')
    instruments = msg.get('Instruments')
    entries = msg.get('MDEntryTypes')

    if int(msg.get('SubscriptionRequestType')) == 1: # Snapshot + Updates
      if req_id not in self.md_subscriptions:
        self.md_subscriptions[req_id] = []

    for instrument in  instruments:
      md = generate_md_full_refresh( instrument, market_depth, entries, req_id )
      self.write_message( str(json.dumps(md, cls=JsonEncoder )) )

      if int(msg.get('SubscriptionRequestType')) == 1: # Snapshot + Updates
        self.md_subscriptions[req_id].append( MarketDataPublisher(req_id,
                                                                  market_depth,
                                                                  entries,
                                                                  instrument,
                                                                  self.on_send_json_msg_to_user ) )

  def on_send_json_msg_to_user(self, sender, json_msg):
    s = json.dumps(json_msg, cls=JsonEncoder )
    print 'on_send_json_msg_to_user', s
    self.write_message(s)




class WebSocketGatewayApplication(tornado.web.Application):
  def __init__(self, opt):
    handlers = [
      (r'/', WebSocketHandler),
      (r'/get_deposit(.*)', DepositHandler),
      (r'/process_deposit(.*)', ProcessDepositHandler)
    ]
    settings = dict(
      cookie_secret='cookie_secret'
    )
    tornado.web.Application.__init__(self, handlers, **settings)

    self.zmq_context = zmq.Context()

    self.trade_in_socket = self.zmq_context.socket(zmq.REQ)
    self.trade_in_socket.connect(opt.trade_in)

    self.application_trade_client = TradeClient(self.zmq_context, self.trade_in_socket)
    self.application_trade_client.connect()

    instruments = self.application_trade_client.getSecurityList()
    self.md_subscriber = {}

    for instrument in instruments:
      symbol = instrument['Symbol']
      self.md_subscriber[symbol] =  MarketDataSubscriber.get(symbol)
      self.md_subscriber[symbol].subscribe( self.zmq_context, options.trade_pub, self.application_trade_client )

    self.connections = {}

    self.heart_beat_timer =  tornado.ioloop.PeriodicCallback(self.send_heartbeat_to_trade, 30000 )
    self.heart_beat_timer.start()

  def send_heartbeat_to_trade(self):
    self.application_trade_client.sendJSON( {'MsgType':'1', 'TestReqID':'0'} )

  def register_connection(self, ws_client):
    if ws_client.trade_client.connection_id in self.connections:
      return False
    self.connections[ws_client.trade_client.connection_id] = ws_client
    return True

  def unregister_connection(self, ws_client):
    if ws_client.trade_client.connection_id in self.connections:
      del self.connections[ws_client.trade_client.connection_id]
      return  True
    return False

  def clean_up(self):
    self.heart_beat_timer.stop()
    self.application_trade_client.close()

    for client_connection_id in self.connections:
      self.connections[client_connection_id].trade_client.close()
    self.connections = []


def main():
  print 'port', options.port
  print 'certfile', options.certfile
  print 'keyfile', options.keyfile
  print 'trade_in', options.trade_in
  print 'trade_pub', options.trade_pub


  from zmq.eventloop import ioloop
  ioloop.install()

  application = WebSocketGatewayApplication(options)

  server = tornado.httpserver.HTTPServer(application)
  server.listen(options.port)

  try:
    tornado.ioloop.IOLoop.instance().start()
  except KeyboardInterrupt:
    application.clean_up()
    print 'END'

if __name__ == "__main__":
  main()
