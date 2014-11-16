#!/usr/bin/env python
import sys
import urllib2
from time import sleep
import json

from arbitrator import BlinkTradeArbitrator

import datetime
import hmac
import hashlib
import ConfigParser
from ws4py.exc import HandshakeError


B2U_API_KEY = 'XXXX'
B2U_API_SECRET = 'YYYY'

def send_order_to_b2u(sender, order):
  nonce = datetime.datetime.now().strftime('%s')
  message = str(nonce) + '.blinktrade.' + str(B2U_API_KEY)
  signature = hmac.new(B2U_API_SECRET, msg=message, digestmod=hashlib.sha256).hexdigest().upper()

  post_params = {
    'key': B2U_API_KEY,
    'signature': signature,
    'nonce': nonce,
    'amount': float(order['OrderQty']/1.e8),
    'price': float(order['Price'] / 1.e8)
  }

  if msg['Side'] == '1':
    print datetime.datetime.now(), 'POST https://www.bitcointoyou.com/api/buy/', str(post_params)
  elif msg['Side'] == '2':
    print datetime.datetime.now(), 'POST https://www.bitcointoyou.com/api/sell/', str(post_params)


def main():
  candidates = ['arbitrage.ini', 'b2u.ini' ]
  if len(sys.argv) > 1:
    candidates.append(sys.argv[1])


  config = ConfigParser.SafeConfigParser({
    'websocket_url': 'wss://127.0.0.1/trade/',
    'username': '',
    'password': '',
    'broker_id': 5,
    'buy_fee': 0,
    'sell_fee': 0,
    'api_key': 'KEY',
    'api_secret': 'SECRET'
  })
  config.read( candidates )

  websocket_url = config.get('b2u', 'websocket_url')
  username      = config.get('b2u', 'username')
  password      = config.get('b2u', 'password')
  buy_fee       = int(config.get('b2u', 'buy_fee'))
  sell_fee      = int(config.get('b2u', 'sell_fee'))
  api_key       = config.get('b2u', 'api_key')
  api_secret    = config.get('b2u', 'api_secret')
  broker_id     = config.getint('b2u',  'broker_id')
  dest_market   = config.get('b2u',  'dest_market')

  print 'websocket_url:', websocket_url
  print 'username:', username
  print 'buy_fee:', buy_fee
  print 'sell_fee:', sell_fee

  arbitrator = BlinkTradeArbitrator( broker_id, username,password,websocket_url, dest_market)
  arbitrator.connect()

  arbitrator.signal_order.connect(send_order_to_b2u)

  while True:
    try:
      sleep(10)
      if arbitrator.is_connected():
        arbitrator.send_testRequest()
      else:
        try:
          arbitrator.reconnect()
        except HandshakeError,e:
          continue

      try:
        raw_data = urllib2.urlopen('http://www.bitcointoyou.com/API/orderbook.aspx').read()
      except Exception:
        print 'ERROR RETRIEVING ORDER BOOK'
        continue


      bids_asks = []
      try:
        bids_asks = json.loads(raw_data)
      except  Exception :
        try:
          bids_asks = json.loads(raw_data.replace('][','],['))  # bug with b2u api
        except  Exception :
          pass
        pass

      if bids_asks:
        ask_list = [  [  int(float(fiat)*1e8 * (1. + sell_fee) ), int(float(btc) * 1e8) ]  for fiat,btc in bids_asks['asks'] ]
        bid_list = [  [  int(float(fiat)*1e8 * (1. - buy_fee) ), int(float(btc) * 1e8) ]  for fiat,btc in bids_asks['bids'] ]

        number_of_asks_to_remove_due_a_weird_bug = 0
        for ask_price, ask_size in ask_list:
          if ask_price < bid_list[0][0]:
            number_of_asks_to_remove_due_a_weird_bug += 1
          else:
            break
        if number_of_asks_to_remove_due_a_weird_bug:
          print datetime.datetime.now(), 'Those sell orders are weird => ', [ 'BTC {:,.8f}'.format(s/1e8) + ' @ R$ {:,.2f}'.format(p/1e8) for p, s in ask_list[:number_of_asks_to_remove_due_a_weird_bug] ]

        ask_list = ask_list[number_of_asks_to_remove_due_a_weird_bug:]

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

