#!/usr/bin/env python
import os
import sys
import logging

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))

from bitex.client import BitExThreadedClient
import pusherclient
import json

import datetime
import hmac
import hashlib
import ConfigParser
import os.path
import sys

class BitexBot(object):
  def __init__(self, bitex_username, bitex_password,  bitex_ws_url):

    self.ws = BitExThreadedClient( bitex_ws_url )
    self.bitex_username = bitex_username
    self.bitex_password = bitex_password

    self.usd_balance = 0
    self.btc_balance = 0
    self.bitex_broker = None
    self.bitex_profile = None

    self.last_bid = None
    self.last_ask = None

    self.best_bid = []
    self.best_ask = []

  def on_bitex_execution_report(self, sender, msg):
    if msg['ExecType'] == '0' or msg['ExecType'] == '4': # cancel
      return

    print msg

  def on_bitex_balance(self, sender, msg):
    if str(self.bitex_broker['BrokerID']) in msg:
      if 'USD' in msg[str(self.bitex_broker['BrokerID'])]:
        self.usd_balance = msg[str(self.bitex_broker['BrokerID'])]['USD']
      if 'BTC' in msg[str(self.bitex_broker['BrokerID'])]:
        self.btc_balance = msg[str(self.bitex_broker['BrokerID'])]['BTC']

  def on_bitex_error(self, sender, msg):
    print 'error blinktrade: ', msg

  def on_bitex_error_login(self, sender, msg):
    self.ws.close()
    print 'login error on blinktrade: ', msg['UserStatusText']
    sys.exit(-1)

  def on_bitex_connected(self, sender, msg):
    print 'connected to blinktrade'
    self.bitex_broker = msg['Broker']
    self.bitex_profile = msg['Profile']

    self.ws.send(json.dumps({ 'MsgType':'F'}))  # Cancel all open orders for this user
    self.ws.requestBalances()
    self.ws.requestMarketData('1', ['BTCUSD'], ['0','1', '2'] )


  def on_send_buy_new_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def on_send_sell_new_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def on_send_cancel_order(self,sender, msg):
    print datetime.datetime.now(), msg
    self.ws.sendMsg(msg)

  def on_book_clear_ask(self, sender, msg):
    self.best_ask = []

  def on_book_ask_new_order(self, sender, msg):
    self.best_ask.insert( msg['MDEntryPositionNo']-1, msg['MDEntryPx']/1e8 )
    self.on_tick()

  def on_book_ask_delete_order(self, sender, msg):
    del self.best_ask[ msg['MDEntryPositionNo']-1 ]
    self.on_tick()

  def on_book_ask_update_order(self, sender, msg):
    self.best_ask[ msg['MDEntryPositionNo']-1 ] = ( msg['MDEntryPx']/1e8 )
    self.on_tick()

  def on_book_ask_delete_thru(self, sender, msg):
    idx = (msg['MDEntryPositionNo']-1)
    while --idx :
      self.best_ask.pop()

  def on_book_clear_bid(self, sender, msg):
    self.best_bid = []

  def on_book_bid_new_order(self, sender, msg):
    self.best_bid.insert( msg['MDEntryPositionNo']-1, msg['MDEntryPx']/1e8 )
    self.on_tick()

  def on_book_bid_update_order(self, sender, msg):
    self.best_bid[ msg['MDEntryPositionNo']-1 ] = ( msg['MDEntryPx']/1e8 )
    self.on_tick()

  def on_book_bid_delete_order(self, sender, msg):
    del self.best_bid[ msg['MDEntryPositionNo']-1 ]
    self.on_tick()

  def on_book_bid_delete_thru(self, sender, msg):
    idx = (msg['MDEntryPositionNo']-1)
    while --idx :
      self.best_bid.pop()


  def on_tick(self):
    if len(self.best_bid) > 0 and len(self.best_ask) > 0:

      tick = False
      if self.last_ask != self.best_ask[0]:
        self.last_ask = self.best_ask[0]
        tick = True

      if self.last_bid != self.best_bid[0]:
        self.last_bid = self.best_bid[0]
        tick = True

      if tick:
        print 'bid: %f ask %f spread %f' % ( self.last_bid, self.last_ask, self.last_ask - self.last_bid )

  def run(self):

    self.ws.signal_logged.connect(self.on_bitex_connected)
    self.ws.signal_error_login.connect(self.on_bitex_error_login)
    self.ws.signal_error.connect(self.on_bitex_error)

    self.ws.signal_balance.connect(self.on_bitex_balance )
    self.ws.signal_execution_report.connect(self.on_bitex_execution_report)

    self.ws.signal_book_bid_new_order.connect(self.on_book_bid_new_order)
    self.ws.signal_book_bid_update_order.connect(self.on_book_bid_update_order)
    self.ws.signal_book_bid_delete_order.connect(self.on_book_bid_delete_order)
    self.ws.signal_book_bid_delete_thru.connect(self.on_book_bid_delete_thru)

    self.ws.signal_book_bid_clear.connect(self.on_book_clear_bid)

    self.ws.signal_book_offer_new_order.connect(self.on_book_ask_new_order)
    self.ws.signal_book_offer_update_order.connect(self.on_book_ask_update_order)
    self.ws.signal_book_offer_delete_order.connect(self.on_book_ask_delete_order)
    self.ws.signal_book_offer_delete_thru.connect(self.on_book_ask_delete_thru)

    self.ws.signal_book_offer_clear.connect(self.on_book_clear_ask)


    self.ws.connect()
    self.ws.login(self.bitex_username, self.bitex_password )


    try:
      self.ws.run_forever()
    except Exception, e:
      self.ws.send(json.dumps({'MsgType':'F'}))  # Cancel all open orders for this user
      self.ws.close()
      pass



def main():

  if not os.path.isfile('robot.ini'):
    sys.exit('robot.ini file not foud')

  config = ConfigParser.SafeConfigParser({
    'websocket_url': '',
    'username': '',
    'password': '',
  })
  config.read( 'robot.ini' )

  socket_url = config.get('connection', 'websocket_url')
  username = config.get('connection', 'username')
  password = config.get('connection', 'password')

  print 'connecting on server %s with user %s' % (socket_url, username)
  bot = BitexBot(username, password, socket_url)

  try:
    bot.run()
  except:
    print 'erro'

main()

