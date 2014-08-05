#!/usr/bin/env python
import urllib2
from time import sleep
import json

from arbitrator import BlinkTradeArbitrator

import datetime
import hmac
import hashlib


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
  import getpass
  print "BlinkTrade <-> BitcoinToYou arbitrator"
  websocket_url = raw_input('BlinkTrade Websocket api server: ')
  username = raw_input('Username: ')
  password = getpass.getpass()
  bid_fee =  float(raw_input('buy fee [0 - 100]: ')) / 100
  ask_fee =  float(raw_input('sell fee [0 - 100]: ')) / 100

  #websocket_url = 'wss://127.0.0.1/trade/'
  #username = 'b2u'
  #password = 'senha123'
  #bid_fee = 0
  #ask_fee = 0

  arbitrator = BlinkTradeArbitrator(username,password,websocket_url, 'BTCBRL')

  arbitrator.connect_to_blinktrade()

  arbitrator.signal_order.connect(send_order_to_b2u)

  while True:
    try:
      sleep(10)
      arbitrator.send_testRequest()

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
        ask_list = [  [  int(float(fiat)*1e8 * (1. + ask_fee) ), int(float(btc) * 1e8) ]  for fiat,btc in reversed(bids_asks['asks']) ]
        bid_list = [  [  int(float(fiat)*1e8 * (1. - bid_fee) ), int(float(btc) * 1e8) ]  for fiat,btc in bids_asks['bids'] ]

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

