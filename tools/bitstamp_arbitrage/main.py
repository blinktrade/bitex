import os
import sys
sys.path.insert(0, '../..//libs')

from bitex.client import BitExThreadedClient
from bitex.signals import  Signal
import pusherclient
import datetime
import time
import json

class OrderBookProcessor():
  order_id_generator = 0
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
    OrderBookProcessor.order_id_generator += 1
    order_id = OrderBookProcessor.order_id_generator

    now = datetime.datetime.now()
    timestamp = time.mktime(now.timetuple())*1e3 + now.microsecond/1e3

    order = { 'id': order_id, 'price': price, 'vol': volume , 'ts': timestamp }
    self.orders_by_price[price] = order
    self.orders_by_id[order_id] = order

    self.orders_list_ordered_by_timestamp.append( order )

    self.send_new_order_signal( self,{
      'MsgType': 'D',
      'Symbol' : self.symbol,
      'OrdType':'2',
      'Price': price,
      'OrderQty':volume,
      'ClOrdID': str(order_id),
      'Side': self.side,
      })

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
        self._send_cancel_replace_order( order['id'], order_volume )
      else:
        self._send_new_order(order_price, order_volume)
    self._cancel_all_orders_prior_timestamp(bid_timestamp)


global pusher
global order_book_bid_processor
global order_book_ask_processor


pusher = pusherclient.Pusher('de504dc5763aeef9ff52')
order_book_bid_processor = OrderBookProcessor('1', 'BTCUSD')
order_book_ask_processor = OrderBookProcessor('2', 'BTCUSD')



def connect_handler(data):
  channel = pusher.subscribe('order_book')
  channel.bind('data', order_book_handler )

def order_book_handler( data ) :
  data = json.loads(data)
  order_book_bid_processor.process_order_list([  [  int(float( usd)*1e8) , int(float(btc) * 1e8) ]  for usd,btc in data['bids'] ])
  order_book_ask_processor.process_order_list([  [  int(float( usd)*1e8) , int(float(btc) * 1e8) ]  for usd,btc in data['asks'] ])


def main():
  ws = BitExThreadedClient('wss://pinhopro.no-ip.org/trade/')
  try:
    #ws = BitExThreadedClient('wss://localhost/trade/')
    #ws = BitExThreadedClient('wss://bitex.com.br/trade/')

    def on_login(sender, msg):
      ws.testRequest()

    def on_message(sender, msg):
      print 'received ' , msg

    def on_send_buy_new_order(sender, msg):
      ws.sendMsg(msg)

    def on_send_sell_new_order(sender, msg):
      ws.sendMsg(msg)

    def on_send_cancel_order(sender, msg):
      ws.sendMsg(msg)

    ws.signal_logged.connect(on_login)
    ws.signal_recv.connect(on_message)

    ws.connect()
    ws.login('rodrigo','abc12345')

    order_book_bid_processor.send_new_order_signal.connect(on_send_buy_new_order)
    order_book_ask_processor.send_new_order_signal.connect(on_send_sell_new_order)
    order_book_bid_processor.cancel_order_signal.connect(on_send_cancel_order)
    order_book_ask_processor.cancel_order_signal.connect(on_send_cancel_order)


    pusher.connection.bind('pusher:connection_established', connect_handler)
    pusher.connect()

    ws.run_forever()
  except KeyboardInterrupt:
    ws.close()


main()

