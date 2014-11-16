
import os
import sys
import logging
import ConfigParser

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

import pusherclient
import json

import datetime
import hmac
import hashlib
from arbitrator import BlinkTradeArbitrator
from time import sleep
from ws4py.exc import HandshakeError


class BitStampClient(object):
  def __init__(self, broker_id,username,password,websocket_url, bid_fee=0., ask_fee=0., api_key=None, api_secret=None, dest_market='BTCUSD'):
    self.api_key = api_key
    self.api_secret = api_secret
    self.bid_fee = bid_fee
    self.ask_fee = ask_fee

    self.broker_id = broker_id 
    self.username = username
    self.password = password
    self.websocket_url = websocket_url

    self.pusher = pusherclient.Pusher(key= 'de504dc5763aeef9ff52', log_level=logging.ERROR)
    self.pusher.connection.bind('pusher:connection_established', self.on_bitstamp_connect_handler)
    self.pusher.connection.bind('pusher:connection_failed', self.on_bitstamp_connect_failed_handler)

    self.arbitrator = BlinkTradeArbitrator( self.broker_id, self.username,self.password,self.websocket_url, dest_market)
    self.arbitrator.signal_order.connect(self.on_send_order_to_bitstamp)
    self.arbitrator.signal_logged.connect(self.on_blinktrade_logged)
    self.arbitrator.signal_disconnected.connect(self.on_blinktrade_discconnected)
    self.arbitrator.signal_connected.connect(self.on_blinktrade_connected)


  def on_blinktrade_discconnected(self, sender, code_reason):
    print datetime.datetime.now(), 'CLOSED', 'websocket closed.  code:', code_reason[0], 'reason', code_reason[1]

  def on_blinktrade_logged(self, sender, data):
    print 'logged to blinktrade'
    self.arbitrator.cancel_all_orders()

  def on_blinktrade_connected(self, sender, data):
    print 'Connected to blinktrade'
    self.arbitrator.send_testRequest()

  def connect(self):
    print 'connecting....'
    self.arbitrator.connect()
    self.pusher.connect()

  def cancel_all_orders(self):
    if self.arbitrator.is_logged():
      self.arbitrator.cancel_all_orders()

  def keep_alive(self):
    if self.arbitrator.is_connected():
      self.arbitrator.send_testRequest()

  def on_bitstamp_connect_failed_handler(self, data):
    print 'Disconnected from bitstamp. Trying to reconnect within 10 minutes'
    if self.arbitrator.is_connected():
      self.arbitrator.cancel_all_orders()
      self.pusher.connect() # reconnect to pusher

  def on_bitstamp_connect_handler(self, data):
    print 'connected to bitstamp'
    channel = self.pusher.subscribe('order_book')
    channel.bind('data', self.on_bitstamp_order_book_handler )


  def on_bitstamp_order_book_handler(self, data):
    if not self.arbitrator.is_logged():
      return

    data = json.loads(data)
    bid_list = [  [  int(float(usd)*1e8 * (1. - self.bid_fee) ), int(float(btc) * 1e8) ]  for usd,btc in data['bids'] ]
    ask_list = [  [  int(float(usd)*1e8 * (1. + self.ask_fee) ), int(float(btc) * 1e8) ]  for usd,btc in data['asks'] ]
    self.arbitrator.process_ask_list(ask_list)
    self.arbitrator.process_bid_list(bid_list)


  def on_send_order_to_bitstamp(self, sender, msg):
    nonce = datetime.datetime.now().strftime('%s')
    message = str(nonce) + '.blinktrade.' + str(self.api_key)
    signature = hmac.new(self.api_secret, msg=message, digestmod=hashlib.sha256).hexdigest().upper()

    post_params = {
      'key': self.api_key,
      'signature': signature,
      'nonce': nonce,
      'amount': float(msg['LastShares']/1.e8),
      'price': float( msg['Price'] / 1.e8)
    }

    if msg['Side'] == '1':
      print datetime.datetime.now(), 'POST https://www.bitstamp.net/api/sell/', str(post_params)
    elif msg['Side'] == '2':
      print datetime.datetime.now(), 'POST https://www.bitstamp.net/api/buy/', str(post_params)


def main():
  candidates = ['arbitrage.ini', 'bitstamp.ini' ]
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])


  config = ConfigParser.SafeConfigParser({
    'websocket_url': 'wss://127.0.0.1/trade/',
    'broker_id': 5,
    'username': '',
    'password': '',
    'buy_fee': 0,
    'sell_fee': 0,
    'api_key': 'KEY',
    'api_secret': 'SECRET'
    })
  config.read( candidates )

  websocket_url = config.get('bitstamp', 'websocket_url')
  broker_id     = config.getint('bitstamp',  'broker_id')
  username      = config.get('bitstamp', 'username')
  password      = config.get('bitstamp', 'password')
  buy_fee       = float(config.get('bitstamp', 'buy_fee'))
  sell_fee      = float(config.get('bitstamp', 'sell_fee'))
  api_key       = config.get('bitstamp', 'api_key')
  api_secret    = config.get('bitstamp', 'api_secret')
  broker_id     = config.getint('bitstamp',  'broker_id')
  dest_market   = config.get('bitstamp',  'dest_market')

  print 'websocket_url:', websocket_url
  print 'broker_id:', broker_id 
  print 'username:', username
  print 'buy_fee:', buy_fee
  print 'sell_fee:', sell_fee

  bitstamp_blinktrade_arbitrator = BitStampClient(broker_id,username,password,websocket_url,buy_fee,sell_fee,api_key,api_secret, dest_market)
  bitstamp_blinktrade_arbitrator.connect()

  while True:
    try:
      sleep(5)

      if bitstamp_blinktrade_arbitrator.arbitrator.is_connected():
        bitstamp_blinktrade_arbitrator.keep_alive()
      else:
        try:
          bitstamp_blinktrade_arbitrator.arbitrator.reconnect()
        except HandshakeError,e:
          continue

    except KeyboardInterrupt:
      break
    except Exception,e:
      print e
      break

  bitstamp_blinktrade_arbitrator.cancel_all_orders()

main()

