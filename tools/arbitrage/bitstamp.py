#!/usr/bin/env python
import os
import sys
import logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

import pusherclient
import json

import datetime
import hmac
import hashlib
from arbitrator import BlinkTradeArbitrator
from time import sleep


class BitStampClient(object):
  def __init__(self, username,password,websocket_url, bid_fee=0., ask_fee=0., api_key=None, api_secret=None):
    self.pusher = pusherclient.Pusher(key= 'de504dc5763aeef9ff52', log_level=logging.ERROR)
    self.api_key = api_key
    self.api_secret = api_secret
    self.bid_fee = bid_fee
    self.ask_fee = ask_fee

    self.arbitrator = BlinkTradeArbitrator(username,password,websocket_url, 'BTCUSD')
    self.arbitrator.signal_order.connect(self.on_send_order_to_bitstamp)

  def connect(self):
    self.pusher.connection.bind('pusher:connection_established', self.on_bitstamp_connect_handler)
    self.pusher.connection.bind('pusher:connection_failed', self.on_bitstamp_connect_failed_handler)

    self.pusher.connect()
    self.arbitrator.connect_to_blinktrade()

  def disconnect(self):
    self.pusher.disconnect()
    self.arbitrator.cancel_all_orders()
    self.arbitrator.close()

  def keep_alive(self):
    self.arbitrator.send_testRequest()

  def on_bitstamp_connect_failed_handler(self, data):
    self.arbitrator.cancel_all_orders()


  def on_bitstamp_connect_handler(self, data):
    print 'connected to bitstamp'
    channel = self.pusher.subscribe('order_book')
    channel.bind('data', self.on_bitstamp_order_book_handler )

  def on_bitstamp_order_book_handler(self, data):
    print data
    self.arbitrator.send_testRequest()

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
  import getpass
  print "BlinkTrade <-> Bitstamp arbitrator"
  websocket_url = raw_input('BlinkTrade Websocket api server: ')
  username = raw_input('Username: ')
  password = getpass.getpass()

  buy_fee =  float(raw_input('buy fee [0 - 100]: ')) / 100
  sell_fee =  float(raw_input('sell fee [0 - 100]: ')) / 100


  bitstamp_blinktrade_arbitrator = BitStampClient(username,password,websocket_url,buy_fee,sell_fee,'XXXX','YYYY')
  bitstamp_blinktrade_arbitrator.connect()

  while True:
    try:
      bitstamp_blinktrade_arbitrator.keep_alive()
      sleep(5)

    except KeyboardInterrupt:
      bitstamp_blinktrade_arbitrator.disconnect()
      break
    except Exception,e:
      print  e
      break

  bitstamp_blinktrade_arbitrator.disconnect()

main()

