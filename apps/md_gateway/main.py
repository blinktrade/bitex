#!/usr/bin/env python

import os
import sys

ROOT_PATH = os.path.abspath( os.path.join(os.path.dirname(__file__), "../../"))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'libs'))
sys.path.insert( 0, os.path.join(ROOT_PATH, 'apps'))

from datetime import timedelta

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.template

from md_gateway import  config
from views import MdGatewayHandler

import tornado.platform.twisted
tornado.platform.twisted.install()
from twisted.internet import reactor


from bitex.order_matcher_client import OrderMatcherClient

class MdGatewayApplication(tornado.web.Application):
  def __init__(self):
    handlers = [
      (r'/market_data', MdGatewayHandler)
    ]
    settings = dict(
      cookie_secret=config.cookie_secret
    )

    self.order_matcher_client = OrderMatcherClient( 'wss://localhost:8449/trade', 'rodrigo', 'abc123', ['BTCBRL'] )
    self.order_matcher_client.start()

    tornado.web.Application.__init__(self, handlers, **settings)

    self.buy_orders = []
    self.sell_orders = []
    self.aggregate_buy_orders = []
    self.aggregate_sell_orders = []

    self.last_published_buy_orders = []
    self.last_published_offer_orders = []
    self.orders_by_id = {}


    self.trades = []

    self.order_matcher_client.signal_recv.connect( self.slot_receive_msg )

    self.order_matcher_client.signal_trade_clear.connect(self.on_trade_clear)
    self.order_matcher_client.signal_trade.connect(self.on_trade)

    self.order_matcher_client.signal_book_bid_clear.connect(self.on_book_bid_clear)
    self.order_matcher_client.signal_book_bid_new_order.connect(self.on_book_bid_new_order)
    self.order_matcher_client.signal_book_bid_update_order.connect(self.on_book_bid_update_order)
    self.order_matcher_client.signal_book_bid_delete_order.connect(self.on_book_bid_delete_order)
    self.order_matcher_client.signal_book_bid_delete_thru.connect(self.on_book_bid_delete_thru)

    self.order_matcher_client.signal_book_offer_clear.connect(self.on_book_offer_clear)
    self.order_matcher_client.signal_book_offer_new_order.connect(self.on_book_offer_new_order)
    self.order_matcher_client.signal_book_offer_update_order.connect(self.on_book_offer_update_order)
    self.order_matcher_client.signal_book_offer_delete_order.connect(self.on_book_offer_delete_order)
    self.order_matcher_client.signal_book_offer_delete_thru.connect(self.on_book_offer_delete_thru)


    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=1), self.cron_check_md_updates)

  def slot_receive_msg(self, sender, data):
    print 'receiving :', data
    for o in reversed(self.sell_orders):
      print o
    print '------------------------'
    for o in self.buy_orders:
      print o


  def on_trade_clear(self,sender):
    self.trades = []

  def on_trade(self,sender, msg):
    pass

  def on_book_bid_clear(self,sender):
    self.buy_orders = []

  def on_book_bid_new_order(self, sender, msg):
    index     = msg['MDEntryPositionNo']
    price     = msg['MDEntryPx']
    qty       = msg['MDEntrySize']
    username  = msg['Username']
    orderId   = msg['OrderID']
    self.buy_orders.insert( index-1, [ price, qty, username, orderId ] )

    # TODO:

  def on_book_bid_update_order(self, sender,msg):
    index     = msg['MDEntryPositionNo']
    qty       = msg['MDEntrySize']
    self.buy_orders[index-1][1] = qty

  def on_book_bid_delete_order(self,sender, msg):
    index     = msg['MDEntryPositionNo']
    del self.buy_orders[index-1]

  def on_book_bid_delete_thru(self,sender, msg):
    delete_thru = msg['MDEntryPositionNo']
    self.buy_orders = self.buy_orders[delete_thru:]

  def on_book_offer_clear(self,sender):
    self.sell_orders = []

  def on_book_offer_new_order(self,sender, msg):
    index     = msg['MDEntryPositionNo']
    price     = msg['MDEntryPx']
    qty       = msg['MDEntrySize']
    username  = msg['Username']
    orderId   = msg['OrderID']
    self.sell_orders.insert( index-1, [ price, qty, username, orderId ] )

  def on_book_offer_update_order(self,sender, msg):
    index     = msg['MDEntryPositionNo']
    qty       = msg['MDEntrySize']
    self.sell_orders[index-1][1] = qty

  def on_book_offer_delete_order(self,sender, msg):
    index     = msg['MDEntryPositionNo']
    del self.sell_orders[index-1]

  def on_book_offer_delete_thru(self, sender,msg):
    delete_thru = msg['MDEntryPositionNo']
    self.sell_orders = self.sell_orders[delete_thru:]


  def cron_check_md_updates(self):
    import copy

    for order in self.buy_orders:
      if  order in self.orders_by_id:
        if self.orders_by_id[order][1] != order[1]:
          #TODO: Generate an Update Record
          pass
      else:
        # TODO: Generate an insert record
        pass


    last_published_buy_orders =  copy.deepcopy( self.sell_orders)

    # run it again 5 seconds later...
    tornado.ioloop.IOLoop.instance().add_timeout(timedelta(milliseconds=500), self.cron_check_md_updates)



def main():


  application = MdGatewayApplication()
  http_server = tornado.httpserver.HTTPServer(application)
  http_server.listen(8000)

  tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
  main()
