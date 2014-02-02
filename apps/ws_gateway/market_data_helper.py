import os
import base64
import json

from bitex.signals import Signal

import zmq
from zmq.eventloop.zmqstream import  ZMQStream

from bitex.message import JsonMessage

market_data_subscriber_dict = {}

signal_order_depth_entry                  = Signal()
signal_publish_md_order_depth_incremental = Signal()


class MarketDataSubscriber(object):
  def __init__(self,  symbol):
    self.symbol = symbol
    self.buy_side = []
    self.sell_side = []
    self.bid = 0
    self.ask = 0
    self.trade_list = []

  def subscribe(self, zmq_context,trade_pub_connection_string, trade_client ):
    self.md_pub_socket = zmq_context.socket(zmq.SUB)
    self.md_pub_socket.connect(trade_pub_connection_string)
    self.md_pub_socket.setsockopt(zmq.SUBSCRIBE, "MD_FULL_REFRESH_" + self.symbol )
    self.md_pub_socket.setsockopt(zmq.SUBSCRIBE, "MD_TRADE_" + self.symbol)
    self.md_pub_socket.setsockopt(zmq.SUBSCRIBE, "MD_INCREMENTAL_" + self.symbol + ".0" )
    self.md_pub_socket.setsockopt(zmq.SUBSCRIBE, "MD_INCREMENTAL_" + self.symbol + ".1" )

    self.md_pub_socket_stream = ZMQStream(self.md_pub_socket)
    self.md_pub_socket_stream.on_recv(self.on_md_publish)

    md_subscription_msg = {
      'MsgType': 'V',
      'MDReqID': '0',  # not important.
      'SubscriptionRequestType': '0',
      'MarketDepth': 0,
      'MDUpdateType': '0',
      'MDEntryTypes': ['0','1','2'],
      'Instruments': [ self.symbol ]
    }

    return trade_client.sendJSON( md_subscription_msg )

  @staticmethod
  def get(symbol):
    global market_data_subscriber_dict
    if symbol not in market_data_subscriber_dict:
      market_data_subscriber_dict[symbol] = MarketDataSubscriber(symbol)
    return  market_data_subscriber_dict[symbol]

  def on_md_publish(self, publish_msg):
    topic = publish_msg[0]
    raw_message = publish_msg[1]
    print "on_md_publish",  topic, raw_message

    msg = JsonMessage(raw_message)

    if msg.type == 'W':  # Full Refresh
      self.on_md_full_refresh(msg)

    elif msg.type == 'X': # Incremental
      self.on_md_incremental(msg)

  def on_md_full_refresh(self, msg):
    #TODO: Check if our current order book is sync with the full refresh
    if msg.get('MarketDepth') != 1:  # Has Market Depth
      self.on_book_clear()
      self.on_trade_clear()

      group = msg.get('MDFullGrp')
      for entry  in group:
        entry_type     = entry.get('MDEntryType')

        if entry_type == '0' or entry_type == '1':
          self.on_book_new_order(entry)
        elif entry_type == '2':
          self.on_trade(entry)


  def on_md_incremental(self, msg):
    if msg.get('MDBkTyp') == '3': #Order Depth
      group = msg.get('MDIncGrp')

      for entry  in group:
        entry_type = entry.get('MDEntryType')

        signal_order_depth_entry(  self.symbol + '.3.' + entry_type , entry )

        if entry_type == '0' or entry_type == '1':
          update_action = entry.get('MDUpdateAction')
          if update_action == '0':
            self.on_book_new_order(entry)
          elif update_action == '1':
            self.on_book_update_order(entry)
          elif  update_action == '2':
            self.on_book_delete_order(entry)
          elif  update_action == '3':
            self.on_book_delete_orders_thru(entry)
        elif entry_type == '2':
          self.on_trade(entry)
      signal_publish_md_order_depth_incremental( self.symbol + '.3', { "MsgType":"X"} )


  def on_book_clear(self):
    self.buy_side = []
    self.sell_side = []
    self.bid = 0
    self.ask = 0

  def on_trade_clear(self):
    self.trade_list = []

  def on_book_delete_orders_thru(self, msg):
    print 'on_book_delete_orders_thru', msg
    index = msg.get('MDEntryPositionNo')
    side = msg.get('MDEntryType')
    if side == '0':
      self.buy_side = self.buy_side[index:]

      if self.buy_side:
        self.bid = self.buy_side[0]['price']
      else:
        self.bid = 0

    elif side == '1':
      self.sell_side = self.sell_side[index:]

      if self.sell_side:
        self.ask = self.sell_side[0]['price']
      else:
        self.ask = 0

  def on_book_delete_order(self, msg):
    print 'on_book_delete_order', msg

    index = msg.get('MDEntryPositionNo') - 1
    side = msg.get('MDEntryType')

    if side == '0':
      del self.buy_side[index]
      if self.buy_side:
        self.bid = self.buy_side[0]['price']
      else:
        self.bid = 0

    elif side == '1':
      del self.sell_side[index]
      if self.sell_side:
        self.ask = self.sell_side[0]['price']
      else:
        self.ask = 0

  def on_book_new_order(self, msg):
    print 'on_book_new_order', msg

    index       = msg.get('MDEntryPositionNo') - 1
    order = {
      'price'     : msg.get('MDEntryPx'),
      'qty'       : msg.get('MDEntrySize'),
      'username'  : msg.get('Username'),
      'broker'    : msg.get('Broker'),
      'order_id'  : msg.get('OrderID'),
      'side'      : msg.get('MDEntryType'),
      'order_time': msg.get('MDEntryTime'),
      'order_date': msg.get('MDEntryDate')
    }

    if msg.get('MDEntryType') == '0':  # buy
      self.buy_side.insert(index, order)
      if index == 0:
        self.bid = msg.get('MDEntryPx')

    elif msg.get('MDEntryType') == '1':  # sell
      self.sell_side.insert(index, order)
      if index == 0:
        self.ask = msg.get('MDEntryPx')

  def on_book_update_order(self, msg):
    print 'on_book_update_order', msg

    index       = msg.get('MDEntryPositionNo') - 1
    order = {
      'price'     : msg.get('MDEntryPx'),
      'qty'       : msg.get('MDEntrySize'),
      'username'  : msg.get('Username'),
      'broker'    : msg.get('Broker'),
      'order_id'  : msg.get('OrderID'),
      'side'      : msg.get('MDEntryType'),
      'order_time': msg.get('MDEntryTime'),
      'order_date': msg.get('MDEntryDate')
    }
    if msg.get('MDEntryType') == '0': # sell
      self.buy_side[index] =  order
      if index == 0:
        self.bid = msg.get('MDEntryPx')

    elif msg.get('MDEntryType') == '1': # sell
      self.sell_side[index] = order
      if index == 0:
        self.ask = msg.get('MDEntryPx')

  def on_trade(self, msg):
    print 'on_trade', msg
    trade = {
      "price":            msg.get('MDEntryPx'),
      "size":             msg.get('MDEntrySize'),
      "trade_date":       msg.get('MDEntryDate'),
      "trade_time":       msg.get('MDEntryTime'),
      "order_id":         msg.get('OrderID'),
      "side":             msg.get('Side'),
      "counter_order_id": msg.get('SecondaryOrderID'),
      "id":               msg.get('TradeID'),
      "buyer_username":   msg.get('MDEntryBuyer'),
      "seller_username":  msg.get('MDEntrySeller'),
    }
    self.trade_list.insert(0, trade)

    # only keep in memory only the last 100 trades
    if len(self.trade_list) > 100:
      self.trade_list.pop()


class MarketDataPublisher(object):
  def __init__(self,req_id, market_depth, entries, instrument, handler):
    self.handler = handler
    self.req_id = req_id

    self.entry_list_order_depth = []
    for entry in entries:
      signal_order_depth_entry.connect( self.signal_order_depth_added_entry, instrument + '.3.' + entry )

    signal_publish_md_order_depth_incremental.connect(self.signal_publish_md_order_depth, instrument + '.3' )

  def signal_order_depth_added_entry(self, sender, entry):
    self.entry_list_order_depth.append(entry)

  def signal_publish_md_order_depth(self, sender, md):
    md["MDReqID"] =  self.req_id
    md["MDBkTyp"] =  '3'
    md["MDIncGrp"] = self.entry_list_order_depth
    self.handler(sender, md)
    self.entry_list_order_depth = []


def generate_md_full_refresh( symbol, market_depth, entries  ):
  entry_list = []
  om = MarketDataSubscriber.get(symbol)

  for entry_type in entries:
    if entry_type == '0' or entry_type == '1':
      if entry_type == '0': # Bid
        orders = om.buy_side
      else: # Offer
        orders = om.sell_side

      entry_position = 0
      for order in orders:
        entry_position += 1

        entry_list.append( {
          "MDEntryType"       : entry_type,
          "MDEntryPositionNo" : entry_position,
          "MDEntryID"         : order['order_id'],
          "MDEntryPx"         : order['price'],
          "MDEntrySize"       : order['qty'],
          "MDEntryDate"       : order['order_date'],
          "MDEntryTime"       : order['order_time'],
          "OrderID"           : order['order_id'],
          "Username"          : order['username'],
          'Broker'            : order['broker']
        })

        if entry_position >= market_depth > 0:
          break
    elif entry_type == '2':
      trade_list = []
      for trade in  om.trade_list:
        trade_list.append({
          "MDEntryType":      "2",  # Trade
          "Symbol":           symbol,
          "MDEntryPx":        trade['price'],
          "MDEntrySize":      trade['size'],
          "MDEntryDate":      trade['trade_date'],
          "MDEntryTime":      trade['trade_time'],
          "OrderID":          trade['order_id'],
          "Side":             trade['side'],
          "SecondaryOrderID": trade['counter_order_id'],
          "TradeID":          trade['id'],
          "MDEntryBuyer":     trade['buyer_username'],
          "MDEntrySeller":    trade['seller_username'],
          })
      for trade in reversed(trade_list):
        entry_list.append(trade)

  md = {
    "MsgType":"W",
    "MarketDepth": market_depth,
    "Symbol": symbol,
    "MDFullGrp": entry_list
  }
  return md
