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

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert(0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert(0, os.path.join(ROOT_PATH, 'apps'))

import base64

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template
from tornado.options import define, options

from tornado import websocket

import logging
import urllib
import urllib2
import json
import uuid
from json import loads
from bitex.json_encoder import JsonEncoder

import zmq
from bitex.message import JsonMessage, InvalidMessageException
from bitex.zmq_client import TradeClient, TradeClientException

import calendar, time
from time import mktime
import datetime


from zmq.eventloop.zmqstream import ZMQStream

define("callback_url")
define("port", type=int  ,help="port")
define("gateway_log", help="logging" )
define("trade_in", help="trade zmq queue")
define("trade_pub",help="trade zmq publish queue")
define("url_payment_processor",help="blockchain api_receive url", default='https://blockchain.info/api/receive')
define("session_timeout_limit", default=0, help="Session timeout")
define("db_echo",default=False, help="Prints every database command on the stdout")

define("db_engine",help="SQLAlchemy database engine string")
define("config", help="config file", callback=lambda path: tornado.options.parse_config_file(path, final=False))

tornado.options.parse_command_line()
if not options.trade_in or \
   not options.trade_pub or \
   not options.gateway_log or \
   not options.callback_url or \
   not options.port or \
   not options.db_engine:
  tornado.options.print_help()
  exit(0)

input_log_file_handler = logging.handlers.TimedRotatingFileHandler( options.gateway_log, when='MIDNIGHT')
formatter = logging.Formatter('%(asctime)s - %(message)s')
input_log_file_handler.setFormatter(formatter)


from market_data_helper import MarketDataPublisher, MarketDataSubscriber, generate_md_full_refresh, generate_trade_history, SecurityStatusPublisher, generate_security_status

#from withdraw_confirmation import WithdrawConfirmationHandler, WithdrawConfirmedHandler
from deposit_hander import DepositHandler
from process_deposit_handler import ProcessDepositHandler
from verification_webhook_handler import VerificationWebHookHandler
from deposit_receipt_webhook_handler import  DepositReceiptWebHookHandler
from rest_api_handler import RestApiHandler
import datetime

from sqlalchemy.orm import scoped_session, sessionmaker

from models import Trade

class WebSocketHandler(websocket.WebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(WebSocketHandler, self).__init__(application, request, **kwargs)
        self.remote_ip = request.headers.get(
            'X-Forwarded-For',
            request.headers.get(
                'X-Real-Ip',
                request.remote_ip))
        application.log('INFO', 'CONNECTION_OPEN', self.remote_ip )

        self.trade_client = TradeClient(
            self.application.zmq_context,
            self.application.trade_in_socket,
            options.trade_pub)
        self.md_subscriptions = {}
        self.sec_status_subscriptions = {}

        self.user_response = None

    def on_trade_publish(self, message):
        self.write_message(str(message[1]))

    def open(self):
        try:
            self.trade_client.connect()
            self.trade_client.on_trade_publish = self.on_trade_publish
            self.application.register_connection(self)

        except TradeClientException as e:
            self.write_message(
                '{"MsgType":"ERROR", "Description":"Error establishing connection with trade", "Detail": "' +
                str(e) +
                '"}')
            self.trade_client.close()
            self.close()

    def write_message(self, message, binary=False):
        self.application.log('OUT', self.trade_client.connection_id, message )
        super(WebSocketHandler, self).write_message(message, binary)

    def close(self):
      self.application.log('DEBUG', self.remote_ip, 'WebSocketHandler.close() invoked' )
      super(WebSocketHandler, self).close()

    def on_message(self, raw_message):
        if not self.trade_client.isConnected():
            return

        try:
            req_msg = JsonMessage(raw_message)
        except InvalidMessageException as e:
            self.write_message(
                '{"MsgType":"ERROR", "Description":"Invalid message", "Detail": "' +
                str(e) +
                '"}')
            self.application.unregister_connection(self)
            self.trade_client.close()
            self.close()
            return


        if req_msg.isUserRequest():
            if req_msg.has('Password'):
                raw_message = raw_message.replace(req_msg.get('Password'), '*')
            if req_msg.has('NewPassword'):
                raw_message = raw_message.replace(req_msg.get('NewPassword'), '*')

            self.application.log('IN', self.trade_client.connection_id ,raw_message )
        else:
            self.application.log('IN', self.trade_client.connection_id, raw_message )


        if req_msg.isTestRequest() or req_msg.isHeartbeat():
            dt = datetime.datetime.now()
            response_msg = {
                'MsgType'           : '0',
                'TestReqID'         : req_msg.get('TestReqID'),
                'ServerTimestamp'   : int(mktime(dt.timetuple()) + dt.microsecond/1000.0 )
            }

            sendTime = req_msg.get('SendTime')
            if sendTime:
                response_msg['SendTime'] = sendTime


            self.write_message(str(json.dumps(response_msg, cls=JsonEncoder)))
            return


        if req_msg.isTradeHistoryRequest():  # Trade History request
            self.on_trade_history_request(req_msg)
            return

        if req_msg.isMarketDataRequest():  # Market Data Request
            self.on_market_data_request(req_msg)

            if not self.trade_client.isConnected():
                self.application.log('DEBUG', self.trade_client.connection_id, 'not self.trade_client.isConnected()' )
                self.application.unregister_connection(self)
                self.trade_client.close()
                self.close()
            return

        if req_msg.isSecurityStatusRequest():
            self.on_security_status_request(req_msg)
            return

        if req_msg.isDepositRequest():
            if not req_msg.get('DepositMethodID') and not req_msg.get('DepositID'):

                currency = req_msg.get('Currency')

                secret = uuid.uuid4().hex
                cold_wallet = self.get_broker_wallet('cold', currency)
                callback_url = options.callback_url + secret
                if not cold_wallet:
                    return

                parameters = urllib.urlencode({
                    'method': 'create',
                    'address': cold_wallet,
                    'callback': callback_url,
                    'currency': currency
                })


                try:
                    url_payment_processor = options.url_payment_processor + '?' + parameters
                    print "invoking .. ", url_payment_processor
                    response = urllib2.urlopen(url_payment_processor)
                    data = json.load(response)
                    req_msg.set('InputAddress', data['input_address'])
                    req_msg.set('Destination', data['destination'])
                    req_msg.set('Secret', secret)
                except urllib2.HTTPError as e:
                    self.write_message(json.dumps({
                        'MsgType': 'ERROR',
                        'ReqID': req_msg.get('DepositReqID'),
                        'Description': 'Blockchain.info is not available at this moment, please try again within few minutes',
                        'Detail': str(e)
                    }))
                    return
                except Exception as e:
                    self.write_message(json.dumps({
                        'MsgType': 'ERROR',
                        'ReqID': req_msg.get('DepositReqID'),
                        'Description': 'Error retrieving a new deposit address from Blockchain.info. Please, try again',
                        'Detail': str(e)
                    }))
                    return

        try:
            resp_message = self.trade_client.sendMessage(req_msg)
            if resp_message:
                self.write_message(resp_message.raw_message)

            if resp_message and resp_message.isUserResponse():
                self.user_response = resp_message

            if not self.trade_client.isConnected():
                self.application.log('DEBUG', self.trade_client.connection_id, 'not self.trade_client.isConnected()' )
                self.application.unregister_connection(self)
                self.trade_client.close()
                self.close()
        except TradeClientException as e:
            exception_message = {
                'MsgType': 'ERROR',
                'Description': 'Invalid message',
                'Detail': str(e)
            }
            self.write_message(json.dumps(exception_message))
            self.application.unregister_connection(self)
            self.trade_client.close()
            self.close()

    def is_user_logged(self):
        if not self.user_response:
            return False
        return self.user_response.get('UserStatus') == 1

    def get_broker_wallet(self, type, currency):
        if not self.user_response:
            return

        broker = self.user_response.get('Broker')
        if not broker:
            return

        if 'CryptoCurrencies' not in broker:
            return

        broker_crypto_currencies = broker['CryptoCurrencies']
        for crypto_currency in broker_crypto_currencies:
            if crypto_currency['CurrencyCode'] == currency:
                for wallet in crypto_currency['Wallets']:
                    if wallet['type'] == type:
                        return wallet['address']

    def on_close(self):
        self.application.log('DEBUG', self.trade_client.connection_id, 'WebSocketHandler.on_close' )
        self.application.unregister_connection(self)
        self.trade_client.close()

    def on_trade_history_request(self, msg):
        page        = msg.get('Page', 0)
        page_size   = msg.get('PageSize', 100)
        filter      = msg.get('Filter')

        offset      = page * page_size

        columns = [ 'TradeID'           , 'Market',  'Side', 'Price', 'Size', 
                    'Buyer'             , 'Seller', 'Created' ]

        trade_list = generate_trade_history(page_size, offset)

        response_msg = {
            'MsgType'           : 'U33', # TradeHistoryResponse
            'TradeHistoryReqID' : msg.get('TradeHistoryReqID'),
            'Page'              : page,
            'PageSize'          : page_size,
            'Columns'           : columns,
            'TradeHistoryGrp'   : trade_list
        }

        self.write_message(str(json.dumps(response_msg, cls=JsonEncoder)))

    def on_security_status_request(self, msg):
        # Generate a FullRefresh
        req_id = msg.get('SecurityStatusReqID')

        # Disable previous Snapshot + Update Request
        if int(msg.get('SubscriptionRequestType')) == 2:
            if req_id in self.sec_status_subscriptions:
                del self.sec_status_subscriptions[req_id]
            return

        instruments = msg.get('Instruments')

        if int(msg.get('SubscriptionRequestType')) == 1:  # Snapshot + Updates
            if req_id not in self.sec_status_subscriptions:
                self.sec_status_subscriptions[req_id] = []

        for instrument in instruments:
            ss = generate_security_status(
                instrument,
                req_id)
            self.write_message(str(json.dumps(ss, cls=JsonEncoder)))

            # Snapshot + Updates
            if int(msg.get('SubscriptionRequestType')) == 1:
                self.sec_status_subscriptions[req_id].append(
                    SecurityStatusPublisher(
                        req_id,
                        instrument,
                        self.on_send_json_msg_to_user))


    def on_market_data_request(self, msg):
        # Generate a FullRefresh
        req_id = msg.get('MDReqID')

        # Disable previous Snapshot + Update Request
        if int(msg.get('SubscriptionRequestType')) == 2:
            if req_id in self.md_subscriptions:
                del self.md_subscriptions[req_id]
            return

        market_depth = msg.get('MarketDepth')
        instruments = msg.get('Instruments')
        entries = msg.get('MDEntryTypes')

        if int(msg.get('SubscriptionRequestType')) == 1:  # Snapshot + Updates
            if req_id not in self.md_subscriptions:
                self.md_subscriptions[req_id] = []

        for instrument in instruments:
            md = generate_md_full_refresh(
                instrument,
                market_depth,
                entries,
                req_id)
            self.write_message(str(json.dumps(md, cls=JsonEncoder)))

            # Snapshot + Updates
            if int(msg.get('SubscriptionRequestType')) == 1:
                self.md_subscriptions[req_id].append(
                    MarketDataPublisher(
                        req_id,
                        market_depth,
                        entries,
                        instrument,
                        self.on_send_json_msg_to_user))

    def on_send_json_msg_to_user(self, sender, json_msg):
        s = json.dumps(json_msg, cls=JsonEncoder)
        self.write_message(s)


class WebSocketGatewayApplication(tornado.web.Application):

    def __init__(self, opt):
        handlers = [
            (r'/', WebSocketHandler),
            (r'/get_deposit(.*)', DepositHandler),
            (r'/_webhook/verification_form', VerificationWebHookHandler),
            (r'/_webhook/deposit_receipt', DepositReceiptWebHookHandler),
            (r'/process_deposit(.*)', ProcessDepositHandler),
            (r'/api/(?P<version>[^\/]+)/(?P<symbol>[^\/]+)/(?P<resource>[^\/]+)', RestApiHandler)
        ]
        settings = dict(
            cookie_secret='cookie_secret'
        )
        tornado.web.Application.__init__(self, handlers, **settings)

        self.replay_logger = logging.getLogger("REPLAY")
        self.replay_logger.setLevel(logging.INFO)
        self.replay_logger.addHandler(input_log_file_handler)
        self.replay_logger.info('START')
        self.log_start_data()


        from models import ENGINE, db_bootstrap
        self.db_session = scoped_session(sessionmaker(bind=ENGINE))
        db_bootstrap(self.db_session)


        self.zmq_context = zmq.Context()

        self.trade_in_socket = self.zmq_context.socket(zmq.REQ)
        self.trade_in_socket.connect(opt.trade_in)

        self.application_trade_client = TradeClient(
            self.zmq_context,
            self.trade_in_socket)
        self.application_trade_client.connect()

        instruments = self.application_trade_client.getSecurityList()
        self.md_subscriber = {}

        for instrument in instruments:
            symbol = instrument['Symbol']
            self.md_subscriber[symbol] = MarketDataSubscriber.get(symbol, self)
            self.md_subscriber[symbol].subscribe(
                self.zmq_context,
                options.trade_pub,
                self.application_trade_client)

        last_trade_id = Trade.get_last_trade_id()
        trade_list = self.application_trade_client.getLastTrades(last_trade_id)

        for trade in trade_list:
            msg = dict()
            msg['id']               = trade[0]
            msg['symbol']           = trade[1]
            msg['side']             = trade[2]
            msg['price']            = trade[3]
            msg['size']             = trade[4]
            msg['buyer_username']   = trade[5]
            msg['seller_username']  = trade[6]
            msg['created']          = trade[7]
            msg['trade_date']       = trade[7][:10]
            msg['trade_time']       = trade[7][11:]
            msg['order_id']         = trade[8]
            msg['counter_order_id'] = trade[9]
            Trade.create( self.db_session, msg)

        all_trades = Trade.get_all_trades(self.db_session)
        for t in all_trades:
          trade_info = dict()
          trade_info['price'] = t.price
          trade_info['size'] = t.size
          trade_info['trade_date'] = t.created.strftime('%Y-%m-%d')
          trade_info['trade_time'] = t.created.strftime('%H:%M:%S')
          self.md_subscriber[ t.symbol ].inst_status.push_trade(trade_info)

        for symbol, subscriber in self.md_subscriber.iteritems():
            subscriber.ready()

        self.connections = {}

        self.heart_beat_timer = tornado.ioloop.PeriodicCallback(
            self.send_heartbeat_to_trade,
            30000)
        self.heart_beat_timer.start()

    def log_start_data(self):
        self.log('PARAM','BEGIN')
        self.log('PARAM','callback_url'         ,options.callback_url)
        self.log('PARAM','port'                 ,options.port)
        self.log('PARAM','trade_in'             ,options.trade_in)
        self.log('PARAM','trade_pub'            ,options.trade_pub)
        self.log('PARAM','url_payment_processor',options.url_payment_processor)
        self.log('PARAM','session_timeout_limit',options.session_timeout_limit)
        self.log('PARAM','db_echo'              ,options.db_echo)
        self.log('PARAM','db_engine'            ,options.db_engine)
        self.log('PARAM','END')


    def log(self, command, key, value=None):
        log_msg = command + ',' + key
        if value:
            try:
                log_msg += ',' + value
            except Exception,e :
                try:
                    log_msg += ',' + str(value)
                except Exception,e :
                    try:
                        log_msg += ',' + unicode(value)
                    except Exception,e :
                        log_msg += ', [object]'

        self.replay_logger.info(  log_msg )

    def send_heartbeat_to_trade(self):
        try:
            self.application_trade_client.sendJSON({'MsgType': '1', 'TestReqID': '0'})
        except Exception as e:
            pass

    def register_connection(self, ws_client):
        self.log('INFO', 'REGISTER_CONNECTION',  {'remote_ip': ws_client.remote_ip, 'trade.connection_id':  ws_client.trade_client.connection_id  }  )
        if ws_client.trade_client.connection_id in self.connections:
            return False
        self.connections[ws_client.trade_client.connection_id] = ws_client
        return True

    def unregister_connection(self, ws_client):
        self.log('INFO', 'UNREGISTER_CONNECTION',  {'remote_ip': ws_client.remote_ip, 'trade.connection_id':  ws_client.trade_client.connection_id  }  )
        if ws_client.trade_client.connection_id in self.connections:
            del self.connections[ws_client.trade_client.connection_id]
            return True
        return False

    def clean_up(self):
        self.heart_beat_timer.stop()
        self.application_trade_client.close()

        for client_connection_id in self.connections:
            self.connections[client_connection_id].trade_client.close()
        self.connections = []


def main():
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
