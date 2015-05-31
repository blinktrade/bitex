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
import logging

ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert(0, os.path.join( os.path.dirname(__file__), '../' ) )

import ConfigParser
import argparse
from appdirs import site_config_dir

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template
from tornado import websocket

import urllib
import urllib2
import json
import uuid
from pyblinktrade.json_encoder import JsonEncoder

import zmq
from pyblinktrade.message import JsonMessage, InvalidMessageException
from trade.zmq_client  import TradeClient, TradeClientException

from pyblinktrade.project_options import ProjectOptions

from time import mktime

from zmq.eventloop.zmqstream import ZMQStream


from market_data_helper import MarketDataPublisher, MarketDataSubscriber, generate_md_full_refresh, generate_trade_history, SecurityStatusPublisher, generate_security_status, signal_publish_md_status, signal_publish_md_order_depth_incremental

from deposit_hander import DepositHandler
from process_deposit_handler import ProcessDepositHandler
from verification_webhook_handler import VerificationWebHookHandler
from deposit_receipt_webhook_handler import  DepositReceiptWebHookHandler
from rest_api_handler import RestApiHandler
from datetime import datetime, timedelta

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from models import Trade
import urllib

class WebSocketHandler(websocket.WebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(WebSocketHandler, self).__init__(application, request, **kwargs)
        self.remote_ip = request.headers.get(
            'X-Forwarded-For',
            request.headers.get(
                'X-Real-Ip',
                request.remote_ip))
        application.log('INFO', 'CONNECTION_OPEN', self.remote_ip )

        self.trade_client = None
        self.user_response = None
        self.last_message_datetime = [datetime.now()]
        self.open_orders = {}
        self.md_subscriptions = {}
        self.sec_status_subscriptions = {}
        self.honey_pot_connection = False

        if self.application.is_tor_node( self.remote_ip ):
            self.honey_pot_connection = True
            application.log('INFO', 'BLOCKED_TOR_NODE', self.remote_ip )
            return

        self.trade_client = TradeClient(
            self.application.zmq_context,
            self.application.trade_in_socket,
            self.application.options.trade_pub)

    def process_execution_report(self):
        pass

    def on_close(self):
        self.application.log('INFO', 'CONNECTION_CLOSE', self.remote_ip )

        for req_id, md_publisher_list in self.md_subscriptions.items():
            for md_publisher in md_publisher_list:
                md_publisher.cleanup()
            self.md_subscriptions[req_id] = []
        self.md_subscriptions = {}

        for req_id, sec_status_publisher_list in self.sec_status_subscriptions.items():
            for sec_status_publisher in sec_status_publisher_list:
                sec_status_publisher.cleanup()
            self.sec_status_subscriptions[req_id] = []
        self.sec_status_subscriptions = {}

        self.application.unregister_connection(self)
        if self.trade_client:
            self.trade_client.close()
        self.trade_client = None

    def on_trade_publish(self, message):
        self.write_message(str(message[1]))

    def check_origin(self, origin):
      self.application.log('INFO', 'ORIGIN', origin)
      return self.application.is_origin_allowed(origin)

    def open(self):
        self.set_nodelay(True)
        try:
            if self.trade_client:
                self.trade_client.connect()
                self.trade_client.on_trade_publish = self.on_trade_publish
                self.application.register_connection(self)

        except TradeClientException as e:
            self.write_message(
                '{"MsgType":"ERROR", "Description":"Error establishing connection with trade", "Detail": "' +
                str(e) +
                '"}')
            if self.trade_client:
                self.trade_client.close()
            self.close()

    def write_message(self, message, binary=False):
        super(WebSocketHandler, self).write_message(message, binary)

    def close(self, code=None, reason=None):
      self.application.log('DEBUG', self.remote_ip, 'WebSocketHandler.close() invoked' )
      super(WebSocketHandler, self).close()

    def on_message(self, raw_message):
        if self.honey_pot_connection:
            self.application.log('INFO', "HONEY_POT", raw_message )

        if self.trade_client is None or not self.trade_client.isConnected():
            return

        self.last_message_datetime.append(datetime.now())
        message_time_last_second = self.last_message_datetime[-1] - timedelta(seconds=1)
        for x in xrange(0, len(self.last_message_datetime)):
            if self.last_message_datetime[x] > message_time_last_second:
                self.last_message_datetime = self.last_message_datetime[x:]
                break
        if len(self.last_message_datetime) > 15:  # higher than 15 messages per second
            self.application.log("ERROR",
                                 "TOO_MANY_MESSAGES",
                                 "Exceed 15 messages per second. [ip=" + self.remote_ip + ",'" + raw_message + "']")
            self.write_message(
                '{"MsgType":"ERROR", "Description":"Too many messages per second", "Detail": "16 messages in the last second"}')
            self.application.unregister_connection(self)
            self.trade_client.close()
            self.close()
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

        req_msg.set('RemoteIP' ,self.remote_ip)

        if req_msg.isUserRequest():
            if req_msg.has('Password'):
                raw_message = raw_message.replace(req_msg.get('Password'), '*')
            if req_msg.has('NewPassword'):
                raw_message = raw_message.replace(req_msg.get('NewPassword'), '*')
            self.application.log('IN', self.trade_client.connection_id ,raw_message )



        if req_msg.isTestRequest() or req_msg.isHeartbeat():
            dt = datetime.now()
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
                callback_url = self.application.options.callback_url + secret

                hot_wallet  = self.get_broker_wallet('hot', currency)
                cold_wallet = self.get_broker_wallet('cold', currency)
                if not hot_wallet and not cold_wallet:
                    return

                if not hot_wallet and cold_wallet:
                    dest_wallet = cold_wallet
                elif hot_wallet and not cold_wallet:
                    dest_wallet = hot_wallet
                else:
                    # 62.5% of all deposits go to the cold wallet, and 37.5% go to the hot wallet
                    dest_wallet = hot_wallet
                    if secret[0] in ('0','1','2','3','4','5','6','7','8','9'):
                        dest_wallet = cold_wallet

                if not dest_wallet:
                    return

                parameters = urllib.urlencode({
                    'method': 'create',
                    'address': dest_wallet,
                    'callback': callback_url,
                    'currency': currency
                })

                try:
                    url_payment_processor = self.application.options.url_payment_processor + '?' + parameters
                    self.application.log('DEBUG', self.trade_client.connection_id, "invoking..."  + url_payment_processor )
                    response = urllib2.urlopen(url_payment_processor)
                    data = json.load(response)
                    self.application.log('DEBUG', self.trade_client.connection_id, str(data) )

                    req_msg.set('InputAddress', data['input_address'])
                    req_msg.set('Destination', data['destination'])
                    req_msg.set('Secret', secret)
                except urllib2.HTTPError as e:
                    out_message = json.dumps({
                      'MsgType': 'ERROR',
                      'ReqID': req_msg.get('DepositReqID'),
                      'Description': 'Blockchain.info is not available at this moment, please try again within few minutes',
                      'Detail': str(e)
                    })
                    self.write_message(out_message)
                    return
                except Exception as e:
                    out_message = json.dumps({
                      'MsgType': 'ERROR',
                      'ReqID': req_msg.get('DepositReqID'),
                      'Description': 'Error retrieving a new deposit address from Blockchain.info. Please, try again',
                      'Detail': str(e)
                    })
                    self.write_message(out_message)
                    return

        try:
            resp_message = self.trade_client.sendMessage(req_msg)
            if resp_message:
                self.write_message(resp_message.raw_message)

            if resp_message and resp_message.isUserResponse():
                self.user_response = resp_message
                if self.is_user_logged():
                    self.application.log('LOGIN_OK', self.trade_client.connection_id, raw_message )
                    #TODO: Request open order list 
                    #self.trade_client.

 
                else:
                    self.application.log('LOGIN_FAILED', self.trade_client.connection_id, raw_message )


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

    def is_broker(self):
      if not self.is_user_logged():
        return False
      return self.user_response.get('IsBroker') == 1


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

    def on_trade_history_request(self, msg):
        since       = msg.get('Since') 
        page        = msg.get('Page', 0)
        page_size   = msg.get('PageSize', 100)
        filter      = msg.get('Filter')

        offset      = page * page_size

        if self.is_broker():
          columns = [ 'TradeID' , 'Market',  'Side', 'Price', 'Size',
                      'Buyer'   , 'Seller', 'Created', 'BuyerUsername' ,'SellerUsername' ]
        else:
          columns = [ 'TradeID' , 'Market',  'Side', 'Price', 'Size',
                      'Buyer'   , 'Seller', 'Created' ]


        trade_list = generate_trade_history(self.application.db_session, page_size, offset, show_username=self.is_broker(), since=since)

        response_msg = {
            'MsgType'           : 'U33', # TradeHistoryResponse
            'TradeHistoryReqID' : msg.get('TradeHistoryReqID'),
            'Page'              : page,
            'PageSize'          : page_size,
            'Columns'           : columns,
            'TradeHistoryGrp'   : trade_list
        }
        if since:
          response_msg['Since'] = since

        self.write_message(str(json.dumps(response_msg, cls=JsonEncoder)))

    def on_security_status_request(self, msg):
        # Generate a FullRefresh
        req_id = msg.get('SecurityStatusReqID')

        # Disable previous Snapshot + Update Request
        if int(msg.get('SubscriptionRequestType')) == 2:
            if req_id in self.sec_status_subscriptions:
                for sec_status_publisher in self.sec_status_subscriptions[req_id]:
                    sec_status_publisher.cleanup()
                self.sec_status_subscriptions[req_id] = []
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
                for md_publisher  in self.md_subscriptions[req_id]:
                    md_publisher.cleanup()
                self.md_subscriptions[req_id] = []
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
                req_id,
                self.is_broker())
            self.write_message(str(json.dumps(md, cls=JsonEncoder)))

            # Snapshot + Updates
            if int(msg.get('SubscriptionRequestType')) == 1:
                self.md_subscriptions[req_id].append(
                    MarketDataPublisher(
                        req_id,
                        market_depth,
                        entries,
                        instrument,
                        self.on_send_json_msg_to_user,
                        self.is_broker()))

    def on_send_json_msg_to_user(self, sender, json_msg):
        s = json.dumps(json_msg, cls=JsonEncoder)
        self.write_message(s)


class WebSocketGatewayApplication(tornado.web.Application):

    def __init__(self, opt, instance_name):
        self.options = opt
        self.instance_name = instance_name

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


        self.allowed_origins = json.loads(self.options.allowed_origins)
        self.allow_all_origins = self.allowed_origins[0] == '*'

        input_log_file_handler = logging.handlers.TimedRotatingFileHandler(
          os.path.expanduser(self.options.gateway_log), when='MIDNIGHT')
        formatter = logging.Formatter('%(asctime)s - %(message)s')
        input_log_file_handler.setFormatter(formatter)

        self.replay_logger = logging.getLogger(self.instance_name)
        self.replay_logger.setLevel(logging.INFO)
        self.replay_logger.addHandler(input_log_file_handler)

        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.DEBUG)
        ch.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
        self.replay_logger.addHandler(ch)

        self.replay_logger.info('START')
        self.log_start_data()

        self.update_tor_nodes()

        from models import Base, db_bootstrap
        db_engine = self.options.sqlalchemy_engine + ':///' +\
                    os.path.expanduser(self.options.sqlalchemy_connection_string)
        engine = create_engine( db_engine, echo=self.options.db_echo)
        Base.metadata.create_all(engine)
        self.db_session = scoped_session(sessionmaker(bind=engine))
        db_bootstrap(self.db_session)


        self.zmq_context = zmq.Context()

        self.trade_in_socket = self.zmq_context.socket(zmq.REQ)
        self.trade_in_socket.connect(self.options.trade_in)

        self.application_trade_client = TradeClient(
            self.zmq_context,
            self.trade_in_socket)
        self.application_trade_client.connect()

        self.security_list = self.application_trade_client.getSecurityList()
        self.md_subscriber = {}

        for instrument in self.security_list.get('Instruments'):
            symbol = instrument['Symbol']
            self.md_subscriber[symbol] = MarketDataSubscriber.get(symbol, self)
            self.md_subscriber[symbol].subscribe(
                self.zmq_context,
                self.options.trade_pub,
                self.application_trade_client)

        last_trade_id = Trade.get_last_trade_id(self.db_session)
        trade_list = self.application_trade_client.getLastTrades(last_trade_id)

        for trade in trade_list:
            msg = dict()
            msg['id']               = trade[0]
            msg['symbol']           = trade[1]
            msg['side']             = trade[2]
            msg['price']            = trade[3]
            msg['size']             = trade[4]
            msg['buyer_id']         = trade[5]
            msg['seller_id']        = trade[6]
            msg['buyer_username']   = trade[7]
            msg['seller_username']  = trade[8]
            msg['created']          = trade[9]
            msg['trade_date']       = trade[9][:10]
            msg['trade_time']       = trade[9][11:]
            msg['order_id']         = trade[10]
            msg['counter_order_id'] = trade[11]
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

        self.update_tor_nodes_timer = tornado.ioloop.PeriodicCallback(
            self.update_tor_nodes,
            3600000)
        self.update_tor_nodes_timer.start()


    def format_currency(self, currency_code, value, is_value_in_satoshis=True):
      currencies = self.security_list.get('Currencies')
      for currency_obj in currencies:
        if currency_obj['Code'] == currency_code:
          if is_value_in_satoshis:
            return currency_obj['FormatPython'].format(value/1e8)
          else:
            return currency_obj['FormatPython'].format(value)
      return value

    def is_origin_allowed(self, origin):
      if self.allow_all_origins:
        return  True

      if origin in self.allowed_origins:
        return True
      return False

    def is_tor_node(self, ip):
        self.log('DEBUG', 'TOR_CHECK', ip)
        return ip in self.tor_ip_list_

    def log_start_data(self):
        self.log('PARAM','BEGIN')
        self.log('PARAM','callback_url'                 ,self.options.callback_url)
        self.log('PARAM','port'                         ,self.options.port)
        self.log('PARAM','trade_in'                     ,self.options.trade_in)
        self.log('PARAM','trade_pub'                    ,self.options.trade_pub)
        self.log('PARAM','url_payment_processor'        ,self.options.url_payment_processor)
        self.log('PARAM','session_timeout_limit'        ,self.options.session_timeout_limit)
        self.log('PARAM','db_echo'                      ,self.options.db_echo)
        self.log('PARAM','sqlalchemy_engine'            ,self.options.sqlalchemy_engine)
        self.log('PARAM','sqlalchemy_connection_string' ,self.options.sqlalchemy_connection_string)
        self.log('PARAM','allowed_origins'              ,self.options.allowed_origins)
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

    def update_tor_nodes(self):
        self.log('DEBUG', 'TOR_LIST', 'requesting from https://torstatus.blutmagie.de/ip_list_all.php/Tor_ip_list_ALL.csv')
        try:
            from urllib2 import urlopen
            response = urlopen("https://torstatus.blutmagie.de/ip_list_all.php/Tor_ip_list_ALL.csv")
            self.tor_ip_list_ = set(response.read().splitlines())
            #self.tor_ip_list_.add('127.0.0.1')
            self.log('INFO', 'TOR_LIST', str(self.tor_ip_list_))
        except:
            pass

    def send_heartbeat_to_trade(self):
        try:
            self.application_trade_client.sendJSON({'MsgType': '1',
                                                    'TestReqID': '0',
                                                    'NumActiveConnections': len(self.connections)})
        except Exception as e:
            pass

    def register_connection(self, ws_client):
        self.log('INFO', 'REGISTER_CONNECTION',  {'remote_ip': ws_client.remote_ip, 'trade.connection_id':  ws_client.trade_client.connection_id  }  )
        if ws_client.trade_client.connection_id in self.connections:
            return False
        self.connections[ws_client.trade_client.connection_id] = ws_client
        return True

    def unregister_connection(self, ws_client):
        if ws_client.trade_client:
            self.log('INFO', 'UNREGISTER_CONNECTION',  {'remote_ip': ws_client.remote_ip, 'trade.connection_id':  ws_client.trade_client.connection_id  }  )
            if ws_client.trade_client.connection_id in self.connections:
                del self.connections[ws_client.trade_client.connection_id]
                return True
            return False

    def clean_up(self):
        self.heart_beat_timer.stop()
        self.application_trade_client.close()

        for client_connection_id in self.connections:
            self.connections[client_connection_id].close()
        self.connections = []

def run_application(options, instance_name):
  from zmq.eventloop import ioloop
  ioloop.install()

  application = WebSocketGatewayApplication(options, instance_name)

  server = tornado.httpserver.HTTPServer(application)
  server.listen(options.port)

  try:
    tornado.ioloop.IOLoop.instance().start()
  except KeyboardInterrupt:
    application.clean_up()



def main():
    parser = argparse.ArgumentParser(description="Blinktrade WebSocket Gateway application")
    parser.add_argument('-i', "--instance", action="store", dest="instance", help='Instance name', type=str)
    parser.add_argument('-c', "--config",
                        action="store",
                        dest="config",
                        default=os.path.expanduser('~/.blinktrade/bitex.ini'),
                        help='Configuration file', type=str)
    arguments = parser.parse_args()

    if not arguments.instance:
      parser.print_help()
      return

    candidates = [ os.path.join(site_config_dir('blinktrade'), 'bitex.ini'),
                   os.path.expanduser('~/.blinktrade/bitex.ini'),
                   arguments.config]
    config = ConfigParser.SafeConfigParser()
    config.read( candidates )

    options = ProjectOptions(config, arguments.instance)

    if not options.trade_in or\
       not options.trade_pub or\
       not options.gateway_log or\
       not options.callback_url or\
       not options.port or\
       not options.allowed_origins or\
       not options.sqlalchemy_connection_string or \
       not options.sqlalchemy_engine:
      raise RuntimeError("Invalid configuration file")


    run_application(options, arguments.instance)
if __name__ == "__main__":
    main()
