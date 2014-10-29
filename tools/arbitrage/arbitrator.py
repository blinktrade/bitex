
import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from order_book_processor import OrderBookProcessor
from util import get_funded_entries, aggregate_orders
from pyblinktrade.signals import Signal
from client import BitExThreadedClient
import json
import datetime
import time

class BlinkTradeArbitrator(object):
  def __init__(self, blinktrade_broker_id,  blinktrade_username, blinktrade_password,  blinktrade_ws_url='wss://api.blinktrade.com/trade/', symbol='BTCUSD'):
    self.fiat_currency = symbol[3:]
    self.crypto_currency = symbol[:3]
    self.fiat_balance = 0
    self.crypto_balance = 0
    self.latency = 0
    self.blinktrade_ws_url = blinktrade_ws_url
    self.blinktrade_broker_id = blinktrade_broker_id 
    self.blinktrade_username = blinktrade_username
    self.blinktrade_password = blinktrade_password
    self.blinktrade_broker = None
    self.blinktrade_profile = None

    self.order_book_bid_processor = OrderBookProcessor('1', symbol)
    self.order_book_ask_processor = OrderBookProcessor('2', symbol)
    self.order_book_bid_processor.send_new_order_signal.connect(self.on_send_buy_new_order)
    self.order_book_ask_processor.send_new_order_signal.connect(self.on_send_sell_new_order)
    self.order_book_bid_processor.cancel_order_signal.connect(self.on_send_cancel_order)
    self.order_book_ask_processor.cancel_order_signal.connect(self.on_send_cancel_order)

    #Signals
    self.signal_connected     = Signal()
    self.signal_disconnected  = Signal()
    self.signal_logged        = Signal()
    self.signal_order         = Signal()


    self.create_websocket()

  def create_websocket(self):
    self.ws = BitExThreadedClient( self.blinktrade_ws_url )
    self.ws.signal_connection_open.connect(self.on_ws_open)
    self.ws.signal_connection_closed.connect(self.on_ws_closed)
    self.ws.signal_heartbeat.connect(self.on_blinktrade_heartbeat)
    self.ws.signal_logged.connect(self.on_blinktrade_connected)
    self.ws.signal_balance.connect(self.on_blinktrade_balance )
    self.ws.signal_execution_report.connect(self.on_blinktrade_execution_report)
    self.ws.signal_send.connect(self.on_blinktrade_send)
    self.ws.signal_recv.connect(self.on_blinktrade_recv)

  def is_connected(self):
    return self.ws.is_connected

  def is_logged(self):
    return self.ws.is_logged

  def on_ws_open(self, sender, msg):
    self.signal_connected(self)
    self.ws.login(self.blinktrade_broker_id,  self.blinktrade_username, self.blinktrade_password )

  def on_ws_closed(self, sender, code_reason):
    self.signal_disconnected(self, code_reason)

  def reconnect(self):
    del self.ws
    self.create_websocket()
    self.connect()

  def connect(self):
    from ws4py.exc import HandshakeError
    try:
      self.ws.connect()
    except HandshakeError, e:
      print datetime.datetime.now(), 'ERROR', 'connection error: ', e
      raise

  def close(self):
    self.ws.close()

  def on_blinktrade_send(self, sender, msg):
    print datetime.datetime.now(), 'SEND', msg

  def on_blinktrade_recv(self, sender, msg):
    print datetime.datetime.now(), 'RECV', msg

  def on_blinktrade_execution_report(self, sender, msg):
    if msg['ExecType'] == '0' or msg['ExecType'] == '4': # cancel
      return
    self.signal_order(self,  {
      'MsgType'   : 'D',
      'Symbol'    : msg['Symbol'],
      'OrderQty'  : msg['LastShares'],
      'Price'     : msg['Price'],
      'OrdType'   : '2',  # Limited
      'Side'      : '1' if msg['Side'] == '2' else '2'
    } )

  def on_blinktrade_balance(self, sender, msg):
    if str(self.blinktrade_broker['BrokerID']) in msg:
      if self.fiat_currency in msg[str(self.blinktrade_broker['BrokerID'])]:
        self.fiat_balance = msg[str(self.blinktrade_broker['BrokerID'])][self.fiat_currency]
      if self.crypto_currency in msg[str(self.blinktrade_broker['BrokerID'])]:
        self.crypto_balance = msg[str(self.blinktrade_broker['BrokerID'])][self.crypto_currency]

  def on_blinktrade_connected(self, sender, msg):
    self.signal_logged(sender, msg)
    print 'connected to blinktrade'
    self.blinktrade_broker = msg['Broker']
    self.blinktrade_profile = msg['Profile']
    self.ws.send(json.dumps({ 'MsgType':'F'}))  # Cancel all open orders for this user
    self.ws.requestBalances()


  def on_send_buy_new_order(self,sender, msg):
    self.ws.sendMsg(msg)

  def on_send_sell_new_order(self,sender, msg):
    self.ws.sendMsg(msg)

  def on_send_cancel_order(self,sender, msg):
    self.ws.sendMsg(msg)

  def process_bid_list(self, bid_list ):
    bid_list = get_funded_entries(bid_list, self.fiat_balance, True)
    bid_list = aggregate_orders(bid_list)
    self.order_book_bid_processor.process_order_list(bid_list)

  def process_ask_list(self, ask_list):
    ask_list = get_funded_entries(ask_list, self.crypto_balance, False)
    ask_list = aggregate_orders(ask_list)
    self.order_book_ask_processor.process_order_list(ask_list)

  def on_blinktrade_heartbeat(self, msg):
    received_timestamp = int(time.time()*1000)
    sent_timestamp = msg['TestReqID']
    self.latency = received_timestamp - sent_timestamp


  def send_testRequest(self):
    self.ws.testRequest( int(time.time()*1000) )

  def run(self):
    self.ws.run_forever()

  def cancel_all_orders(self):
    self.ws.send(json.dumps({'MsgType':'F'}))  # Cancel all open orders for this user

