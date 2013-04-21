__author__ = 'rodrigo'

import bisect
from signal import Signal

import doctest

matcher_dict  = {}

class ExecutionReport(object):
  def __init__(self, symbol,  ):
    pass

class OrderMatcher(object):
  """
  >>> from orders import *
  >>>
  >>> from execution import  *
  >>> om = OrderMatcher.get('BRLBTC')
  >>>
  >>> o1 = Order.create('a','10', 'BRLBTC', '1','2',100,1)
  >>> o2 = Order.create('a','10', 'BRLBTC', '1','2',99,2)
  >>> o3 = Order.create('a','10', 'BRLBTC', '1','2',98,5)
  >>>
  >>> om.match(o3)
  >>> om.match(o1)
  >>> om.match(o2)
  >>> print str(om)
  -
  2: - 100.000000 - 1
  3: - 99.000000 - 2
  4: - 98.000000 - 5
  >>> o4 = Order.create('a','10', 'BRLBTC', '2','2',101,5)
  >>> o5 = Order.create('a','10', 'BRLBTC', '2','2',102,2)
  >>> o6 = Order.create('a','10', 'BRLBTC', '2','2',103,1)
  >>> om.match(o6)
  >>> om.match(o5)
  >>> om.match(o4)
  >>> print om
  7: - 103.000000 - 1
  6: - 102.000000 - 2
  5: - 101.000000 - 5
  -
  2: - 100.000000 - 1
  3: - 99.000000 - 2
  4: - 98.000000 - 5
  >>> #create a buy order order that will partially fill o4
  >>> o7 = Order.create('a','10', 'BRLBTC', '1','2',101,1)
  >>> om.match(o7)
  >>> assert o7.has_leaves_qty == False
  >>> assert o7.cum_qty == o7.order_qty  # fully executed
  >>> print om
  7: - 103.000000 - 1
  6: - 102.000000 - 2
  5: - 101.000000 - 4
  -
  2: - 100.000000 - 1
  3: - 99.000000 - 2
  4: - 98.000000 - 5
  >>> assert o4.has_leaves_qty == True
  >>> assert o4.cum_qty == o4.order_qty - o4.leaves_qty
  >>> assert o4.leaves_qty == 4
  >>> # create a buy order that will fully fill o4
  >>> o8 = Order.create('a','10', 'BRLBTC', '1','2',101,10)
  >>> om.match(o8)
  >>> assert o8.has_leaves_qty == True
  >>> assert o8.cum_qty == o8.order_qty - o8.leaves_qty
  >>> assert o8.leaves_qty == 6
  >>> assert o4.has_leaves_qty == False
  >>> assert o4.cum_qty == o4.order_qty  # fully executed
  >>> print om
  7: - 103.000000 - 1
  6: - 102.000000 - 2
  -
  9: - 101.000000 - 6
  2: - 100.000000 - 1
  3: - 99.000000 - 2
  4: - 98.000000 - 5
  >>>
  >>> # create a sell order that will fully fill o8, o1 and partially fill o2
  >>> o9 = Order.create('a','10', 'BRLBTC', '2','2',99,8)
  >>> om.match(o9)
  >>> print om
  7: - 103.000000 - 1
  6: - 102.000000 - 2
  -
  3: - 99.000000 - 1
  4: - 98.000000 - 5
  """

  def __init__(self, symbol ):
    self.symbol = symbol
    self.buy_side = []
    self.sell_side = []

  def __str__(self):
    res = ""
    for order in reversed(self.sell_side):
      res += str(order) + '\n'
    res += '-' + '\n'
    for order in self.buy_side:
      res += str(order) + '\n'
    return  res[:-1]

  def match(self, order):
    other_side = []
    self_side = []
    if order.is_buy:
      self_side = self.buy_side
      other_side = self.sell_side
    elif order.is_sell:
      other_side = self.buy_side
      self_side = self.sell_side

    # get all executions
    executed_orders = []
    total_executed_qty = 0
    for x in xrange(0, len(other_side)):
      counter_order = other_side[x]
      executed_qty = order.match( counter_order, max(order.leaves_qty-total_executed_qty, 0) )
      if not executed_qty:
        break
      total_executed_qty += executed_qty
      executed_orders.append( ( executed_qty, counter_order ) )

    # let's include the order in the book if the order is not fully executed.
    insert_pos = 0
    if total_executed_qty < order.leaves_qty:
      insert_pos = bisect.bisect_right(self_side, order)


    # order execution
    delete_pos = 0
    for executed_qty, counter_order in executed_orders:
      order.execute( executed_qty, counter_order.price )
      counter_order.execute(executed_qty, counter_order.price)

      if not counter_order.has_leaves_qty:
        delete_pos += 1
        other_side.pop(0)


    if order.has_leaves_qty:
      self_side.insert( insert_pos, order )

    # TODO : update the market data


  def cancel(self, order):
    # TODO: Find the order
    # TODO: mark it as canceled
    # TODO: remove the order from the book
    # TODO: update the market data
    pass

  @staticmethod
  def get(symbol):
    global matcher_dict

    if symbol not in matcher_dict:
      matcher_dict[symbol] = OrderMatcher(symbol)

    return  matcher_dict[symbol]

if __name__ == "__main__":
  import doctest
  doctest.testmod()

