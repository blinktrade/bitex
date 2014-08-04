#!/usr/bin/env python
import urllib2
from time import sleep
import json

from arbitrator import BlinkTradeArbitrator

import datetime
import hmac
import hashlib
import subprocess

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
  import getpass
  print "BlinkTrade <-> BitInvest arbitrator"
  websocket_url = raw_input('BlinkTrade Websocket api server: ')
  username = raw_input('Username: ')
  password = getpass.getpass()
  bid_fee =  float(raw_input('buy fee [0 - 100]: ')) / 100
  ask_fee =  float(raw_input('sell fee [0 - 100]: ')) / 100
  subscription_api_key = raw_input('Subscription Api Key: ')

  arbitrator = BlinkTradeArbitrator(username,password,websocket_url, 'BTCBRL')

  arbitrator.connect_to_blinktrade()

  arbitrator.signal_order.connect(send_order_to_BINVEST)

  while True:
    try:
      sleep(15)
      arbitrator.send_testRequest()

      try:
        # something wrong with urllib2 or bitinvest servers.
        #raw_data = urllib2.urlopen('https://api.bitinvest.com.br/exchange/orderbook?subscription-key=' + subscription_api_key).read()

        # curl works. I know, this is ugly, but it works
        raw_data = subprocess.check_output( ['curl', 'https://api.bitinvest.com.br/exchange/orderbook?subscription-key=' + subscription_api_key] )
      except Exception:
        print 'ERROR RETRIEVING ORDER BOOK'
        continue

      bids_asks = []
      try:
        bids_asks = json.loads(raw_data)
      except  Exception :
        pass

      if bids_asks:
        ask_list = [ [  int(float(o[0]) * 1e8 * (1. + ask_fee) ) , int(o[1] * 1e8) ] for o in bids_asks['asks'] ]
        bid_list = [ [  int(float(o[0]) * 1e8 * (1. + bid_fee) ) , int(o[1] * 1e8) ] for o in bids_asks['bids'] ]
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

