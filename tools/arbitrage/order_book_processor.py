import sys
sys.path.insert(0, '../../libs')

from pyblinktrade.signals import  Signal
import datetime
import time
import random

class OrderBookProcessor():
  def __init__(self, side, symbol):
    self.side = side
    self.symbol = symbol
    self.orders_by_id = {}
    self.orders_by_price = {}
    self.orders_list_ordered_by_timestamp = []

    self.send_new_order_signal = Signal()
    self.cancel_order_signal = Signal()

  def _get_order_by_price(self, price):
    if price in self.orders_by_price:
      return self.orders_by_price[price]
    return None

  def _send_new_order(self, price, volume):
    now = datetime.datetime.now()
    timestamp = time.mktime(now.timetuple())*1e3 + now.microsecond/1e3

    order_id = str(int(timestamp)) + str(int(random.random()*100000))

    order = { 'id': order_id, 'price': price, 'vol': volume , 'ts': timestamp }
    self.orders_by_price[price] = order
    self.orders_by_id[order_id] = order

    self.orders_list_ordered_by_timestamp.append( order )

    order_message = {
      'MsgType': 'D',
      'Symbol' : self.symbol,
      'OrdType':'2',
      'Price': int(price),
      'OrderQty': int(volume),
      'ClOrdID': str(order_id),
      'Side': self.side,
    }
    self.send_new_order_signal( self, order_message)

    return order_id

  def _send_cancel_replace_order(self, order_id, new_volume):
    original_order  = self.orders_by_id[order_id]

    original_volume = original_order['vol']
    if original_volume != new_volume:
      self._cancel_order( original_order['id'] )
      return self._send_new_order( original_order['price'], new_volume )
    else:
      # nothing to do ... let's just update the current order timestamp.
      now = datetime.datetime.now()
      new_timestamp = time.mktime(now.timetuple())*1e3 + now.microsecond/1e3
      original_order['ts'] = new_timestamp

      pos = 0
      for order in self.orders_list_ordered_by_timestamp:
        if order['id'] == order_id:
          break
        pos += 1
      del self.orders_list_ordered_by_timestamp[pos]
      self.orders_list_ordered_by_timestamp.append( original_order )

  def _get_last_timestamp(self):
    if not self.orders_list_ordered_by_timestamp:
      now = datetime.datetime.now()
      timestamp = time.mktime(now.timetuple())*1e3 + now.microsecond/1e3
      return timestamp
    return  self.orders_list_ordered_by_timestamp[-1]['ts']

  def _cancel_all_orders_prior_timestamp(self, timestamp):
    orders_to_cancel = []
    for order in self.orders_list_ordered_by_timestamp:
      if order['ts'] <= timestamp:
        orders_to_cancel.append(order['id'])

    for order_id in orders_to_cancel:
      self._cancel_order( order_id )

  def _cancel_order(self, order_id):
    original_order  = self.orders_by_id[order_id]

    self.cancel_order_signal(self, { 'MsgType':'F', 'OrigClOrdID': str(order_id)} )

    # find the order position
    pos = 0
    for order in self.orders_list_ordered_by_timestamp:
      if order['id'] == order_id:
        break
      pos += 1
    del self.orders_list_ordered_by_timestamp[pos]

    del self.orders_by_price[original_order['price']]
    del self.orders_by_id[original_order['id'] ]
    return True

  def process_order_list(self, order_list):
    bid_timestamp = self._get_last_timestamp()
    for o in order_list:
      order_volume = o[1]
      order_price = o[0]

      # get the order using the price
      order = self._get_order_by_price(order_price)
      if order:
        if not order_volume:
          self._cancel_order(order['id'])
        else:
          self._send_cancel_replace_order( order['id'], order_volume )
      else:
        if order_price and order_volume:
          self._send_new_order(order_price, order_volume)
    self._cancel_all_orders_prior_timestamp(bid_timestamp)
