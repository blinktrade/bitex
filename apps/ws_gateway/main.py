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

import json
from json import loads
from bitex.json_encoder import  JsonEncoder

import zmq
from bitex.message import JsonMessage

from zmq.eventloop.zmqstream import  ZMQStream

from market_data_helper import  MarketDataPublisher, MarketDataSubscriber, generate_md_full_refresh

define("port", default=8443, help="port" )
define("certfile",default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_certificate.pem") , help="Certificate file" )
define("keyfile", default=os.path.join(ROOT_PATH, "ssl/", "order_matcher_privatekey.pem") , help="Private key file" )

define("trade_in",  default="tcp://127.0.0.1:5755", help="trade zmq queue" )
define("trade_pub", default="tcp://127.0.0.1:5756", help="trade zmq publish queue" )

tornado.options.parse_config_file(os.path.join(ROOT_PATH, "config/", "ws_gateway.conf"))
tornado.options.parse_command_line()


from boleto_hander import BoletoHandler

class OrderManager(object):
  pass

class WebSocketHandler(websocket.WebSocketHandler):
  def __init__(self, application, request, **kwargs):
    super(WebSocketHandler, self).__init__(application, request, **kwargs)
    self.connection_id = base64.b32encode(os.urandom(10))

    self.trade_in_socket = self.application.trade_in_socket

    self.trade_pub_socket = self.application.zmq_context.socket(zmq.SUB)
    self.trade_pub_socket.connect(options.trade_pub)
    self.trade_pub_socket_stream = ZMQStream(self.trade_pub_socket)
    self.trade_pub_socket_stream.on_recv(self.on_trade_publish)

    
    self.is_logged  = False
    self.user_id    = None

    self.md_subscriptions = {}

  def on_trade_publish(self, message):
    print "on_trade_publish", self.connection_id, message
    self.write_message(str(message[1]))


  def open(self):
    self.application.register_connection(self)
    
    self.trade_in_socket.send( "OPN," + self.connection_id)
    response_message = self.trade_in_socket.recv()
    opt_code    = response_message[:3]
    raw_message = response_message[4:]

    if opt_code != 'OPN':
      if opt_code == 'ERR':
        self.write_message(raw_message)
        
      self.application.unregister_connection(self)
      self.close()
      return
    #self.write_message(raw_message)


  def on_message(self, raw_message):
    print 'on_message', raw_message

    req_msg = JsonMessage(raw_message)
    if not req_msg.is_valid():
      self.write_message('{"MsgType":"ERROR", "Description":"Invalid message", "Detail": ""}' )
      self.close()
      return

    if req_msg.type == 'V':  # market data subscribe
      self.on_market_data_request(req_msg)
      return

    self.trade_in_socket.send_unicode( "REQ," +  self.connection_id + ',' + raw_message  )
    response_message = self.trade_in_socket.recv()
    raw_resp_message_header = response_message[:3]
    raw_resp_message        = response_message[4:].strip()

    if raw_resp_message_header != 'REP':
      if raw_resp_message:
        self.write_message(raw_resp_message)

      del self.application.connections[self.connection_id]
      self.close()
      return

    if raw_resp_message:
      rep_msg = JsonMessage(raw_resp_message)
      if rep_msg.is_valid() and rep_msg.type == "BF":
        self.on_login_response(rep_msg)
      self.write_message(raw_resp_message)

  def on_close(self):
    self.trade_pub_socket_stream.close()
    if self.application.unregister_connection(self):
      self.trade_in_socket.send( "CLS," + self.connection_id  )
      response_message = self.trade_in_socket.recv()

  def on_login_response(self, msg):
    if msg.get("UserStatus") == 1:
      self.user_id = msg.get("UserID")
      self.is_logged = True
      self.trade_pub_socket.setsockopt(zmq.SUBSCRIBE, str(self.user_id))

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
      md = generate_md_full_refresh( instrument, self.application.application_connection_id, market_depth, entries )
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
      (r'/print_boleto(.*)', BoletoHandler),
    ]
    settings = dict(
      cookie_secret='cookie_secret'
    )
    tornado.web.Application.__init__(self, handlers, **settings)


    self.zmq_context = zmq.Context()

    self.trade_in_socket = self.zmq_context.socket(zmq.REQ)
    self.trade_in_socket.connect(opt.trade_in)

    self.application_connection_id = base64.b32encode(os.urandom(10))
    self.trade_in_socket.send( "OPN," + self.application_connection_id)
    dummy_response = self.trade_in_socket.recv()

    self.md_subscriber =  MarketDataSubscriber.get( "BTCBRL", self.application_connection_id)
    self.md_subscriber.subscribe( self.zmq_context, options.trade_pub, self.trade_in_socket )

    self.connections = {}


  def register_connection(self, ws_client):
    if ws_client.connection_id in self.connections:
      return False
    self.connections[ws_client.connection_id] = ws_client
    return True

  def unregister_connection(self, ws_client):
    if ws_client.connection_id in self.connections:
      del self.connections[ws_client.connection_id]
      return  True
    return False

  def clean_up(self):
    self.trade_in_socket.send( "CLS," + self.application_connection_id)
    dummy_response = self.trade_in_socket.recv()
    self.application_connection_id = None

    for client_connection_id in self.connections:
      self.trade_in_socket.send( "CLS," + client_connection_id )
      dummy_response = self.trade_in_socket.recv()
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

  ssl_options={
    "certfile": options.certfile,
    "keyfile" : options.keyfile,
  }

  server = tornado.httpserver.HTTPServer(application,ssl_options=ssl_options)
  server.listen(options.port)

  try:
    tornado.ioloop.IOLoop.instance().start()
  except KeyboardInterrupt:
    application.clean_up()
    print 'END'

if __name__ == "__main__":
  main()
