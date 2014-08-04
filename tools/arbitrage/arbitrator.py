
import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from order_book_processor import OrderBookProcessor
from util import get_funded_entries, aggregate_orders
from bitex.signals import Signal
from bitex.client import BitExThreadedClient
import json
import datetime

class BlinkTradeArbitrator(object):
  def __init__(self, blinktrade_username, blinktrade_password,  blinktrade_ws_url='wss://api.blinktrade.com/trade/', symbol='BTCUSD'):
    self.order_book_bid_processor = OrderBookProcessor('1', symbol)
    self.order_book_ask_processor = OrderBookProcessor('2', symbol)

    self.ws = BitExThreadedClient( blinktrade_ws_url )
    self.blinktrade_username = blinktrade_username
    self.blinktrade_password = blinktrade_password

    self.order_book_bid_processor.send_new_order_signal.connect(self.on_send_buy_new_order)
    self.order_book_ask_processor.send_new_order_signal.connect(self.on_send_sell_new_order)
    self.order_book_bid_processor.cancel_order_signal.connect(self.on_send_cancel_order)
    self.order_book_ask_processor.cancel_order_signal.connect(self.on_send_cancel_order)

    self.ws.signal_logged.connect(self.on_blinktrade_connected)
    self.ws.signal_balance.connect(self.on_blinktrade_balance )
    self.ws.signal_execution_report.connect(self.on_blinktrade_execution_report)

    self.blr_balance = 0
    self.btc_balance = 0
    self.blinktrade_broker = None
    self.blinktrade_profile = None

    self.signal_order  = Signal()

  def on_blinktrade_execution_report(self, sender, msg):
    if msg['ExecType'] == '0' or msg['ExecType'] == '4': # cancel
      return

    print datetime.datetime.now(), msg

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
      if 'BRL' in msg[str(self.blinktrade_broker['BrokerID'])]:
        self.blr_balance = msg[str(self.blinktrade_broker['BrokerID'])]['BRL']
      if 'BTC' in msg[str(self.blinktrade_broker['BrokerID'])]:
        self.btc_balance = msg[str(self.blinktrade_broker['BrokerID'])]['BTC']

  def on_blinktrade_connected(self, sender, msg):
    print 'connected to blinktrade'
    self.blinktrade_broker = msg['Broker']
    self.blinktrade_profile = msg['Profile']
    self.ws.send(json.dumps({ 'MsgType':'F'}))  # Cancel all open orders for this user
    self.ws.requestBalances()


  def on_send_buy_new_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def on_send_sell_new_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def on_send_cancel_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def process_bid_list(self, bid_list ):
    bid_list = get_funded_entries(bid_list, self.blr_balance, True)
    bid_list = aggregate_orders(bid_list)
    self.order_book_bid_processor.process_order_list(bid_list)

  def process_ask_list(self, ask_list):
    ask_list = get_funded_entries(ask_list, self.btc_balance, False)
    ask_list = aggregate_orders(ask_list)
    self.order_book_ask_processor.process_order_list(ask_list)


  def connect_to_blinktrade(self):
    self.ws.connect()
    self.ws.login(self.blinktrade_username, self.blinktrade_password )

  def run(self):
    self.ws.run_forever()

  def cancel_all_orders(self):
    self.ws.send(json.dumps({'MsgType':'F'}))  # Cancel all open orders for this user
  def close(self):
    self.ws.close()

