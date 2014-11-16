#!/usr/bin/env python
import sys
import urllib2
from time import sleep
import json

from arbitrator import BlinkTradeArbitrator

import datetime
import hmac
import hashlib
import subprocess
import ConfigParser
from ws4py.exc import HandshakeError


BINVEST_API_KEY = 'XXXX'
BINVEST_API_SECRET = 'YYYY'

def send_order_to_BINVEST(sender, order):
  nonce = datetime.datetime.now().strftime('%s')
  message = 'sendorder' + str(BINVEST_API_KEY) + str(nonce)
  signature = hmac.new(BINVEST_API_SECRET, msg=message, digestmod=hashlib.sha256).hexdigest().upper()

  post_params = {
    'key': BINVEST_API_KEY,
    'sign': signature,
    'pair': 'btc_brl',
    'volume': float(order['OrderQty']/1.e8),
    'price': float( order['Price'] / 1.e8)
  }

  if msg['Side'] == '1':
    post_params['type'] = 'buy'
  elif msg['Side'] == '2':
    post_params['type'] = 'sell'

  print datetime.datetime.now(), 'POST https://api.bitinvest.com.br/tapi/' + message, str(post_params)

def main():
  candidates = ['arbitrage.ini', 'basebit.ini' ]
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])


  config = ConfigParser.SafeConfigParser({
    'websocket_url': 'wss://127.0.0.1/trade/',
    'username': '',
    'password': '',
    'buy_fee': 0,
    'sell_fee': 0,
    'api_key': 'KEY',
    'api_secret': 'SECRET',
    'subscription_api_key':'api_key'
  })
  config.read( candidates )

  websocket_url = config.get('bitinvest', 'websocket_url')
  username      = config.get('bitinvest', 'username')
  password      = config.get('bitinvest', 'password')
  buy_fee       = int(config.get('bitinvest', 'buy_fee'))
  sell_fee      = int(config.get('bitinvest', 'sell_fee'))
  api_key       = config.get('bitinvest', 'api_key')
  api_secret    = config.get('bitinvest', 'api_secret')
  subscription_api_key = config.get('bitinvest', 'subscription_api_key')
  broker_id     = config.getint('bitinvest',  'broker_id')
  dest_market   = config.get('bitinvest',  'dest_market')


  arbitrator = BlinkTradeArbitrator(broker_id, username,password,websocket_url, dest_market)
  arbitrator.connect()

  arbitrator.signal_order.connect(send_order_to_BINVEST)

  while True:
    try:
      sleep(15)
      if arbitrator.is_connected():
        arbitrator.send_testRequest()
      else:
        try:
          arbitrator.reconnect()
        except HandshakeError,e:
          continue

      try:
        # something wrong with urllib2 or bitinvest servers.
        #raw_data = urllib2.urlopen('https://api.bitinvest.com.br/exchange/orderbook?subscription-key=' + subscription_api_key).read()

        # curl works. I know, this is ugly, but it works
        api_url = 'https://api.bitinvest.com.br/exchange/orderbook?subscription-key=' + subscription_api_key
        raw_data = subprocess.check_output( ['curl', api_url ] )
      except Exception:
        print 'ERROR RETRIEVING ORDER BOOK'
        continue

      bids_asks = []
      try:
        bids_asks = json.loads(raw_data)
      except  Exception :
        pass

      if bids_asks:
        ask_list = [ [  int(float(o[0]) * 1e8 * (1. + sell_fee) ) , int(o[1] * 1e8) ] for o in bids_asks['asks'] ]
        bid_list = [ [  int(float(o[0]) * 1e8 * (1. + buy_fee) ) , int(o[1] * 1e8) ] for o in bids_asks['bids'] ]
        arbitrator.process_ask_list(ask_list)
        arbitrator.process_bid_list(bid_list)
    except urllib2.URLError as e:
      print datetime.datetime.now(), e

    except KeyboardInterrupt:
      arbitrator.cancel_all_orders()
      print 'wait....'
      sleep(5)
      arbitrator.close()
      break

main()

