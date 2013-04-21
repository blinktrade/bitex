__author__ = 'rodrigo'

last_order_id = 1

from users import  has_margin
from execution import  OrderMatcher
import datetime
from errors import OrderNotFound
from execution import  ExecutionReport

class Order(object):
  user_id         = None
  id              = None
  client_order_id = None
  status          = None
  symbol          = None
  side            = None
  type            = None
  price           = None
  order_qty       = 0
  cum_qty         = 0
  leaves_qty      = 0
  created         = None
  last_price      = 0
  last_qty        = 0
  average_price   = 0


  def __cmp__(self, other):
    if self.is_buy and other.is_buy:
      if self.price > other.price:
        return -1
      elif self.price < other.price:
        return  1
      elif self.created > other.created:
        return  -1
      else:
        return  1
    elif self.is_sell and other.is_sell:
      if self.price < other.price:
        return -1
      elif self.price > other.price:
        return  1
      elif self.created < other.created:
        return  -1
      else:
        return  1

  def match(self, other, execute_qty):
    if self.is_buy and other.is_sell:
      if self.price >= other.price:
        return min( execute_qty, other.leaves_qty)
    elif self.is_sell and other.is_buy:
      if self.price <= other.price:
        return min( execute_qty, other.leaves_qty)
    return  0

  def execute(self, qty, price):
    if qty == 0:
      return

    self.average_price = ((price * qty) + (self.cum_qty * self.average_price )) / ( self.cum_qty + qty )
    self.cum_qty += qty
    self.leaves_qty -= qty
    self.last_price = price
    self.last_qty = qty

    if self.cum_qty == self.order_qty:
      self.status = '2' # Fill
    else:
      self.status = '1' # Partial fill

    return

  @property
  def has_leaves_qty(self):
    return self.leaves_qty > 0

  def __repr__(self):
    return str(self)

  def __str__(self):
    return "%d: - %f - %d"%(self.id,  self.price, self.leaves_qty)

  @property
  def is_buy(self):
    return self.side == '1'

  @property
  def is_sell(self):
    return  self.side == '2'

  @staticmethod
  def create( user_id, client_order_id, symbol, side, type, price, qty ):
    global last_order_id
    last_order_id +=  1

    order = Order()
    order.user_id         = user_id
    order.id              = last_order_id
    order.client_order_id = client_order_id
    order.status          = '0'  # New_Order
    order.symbol          = symbol
    order.side            = side
    order.type            = type
    order.price           = price
    order.leaves_qty      = qty
    order.order_qty       = qty
    order.cum_qty         = 0
    order.created         = datetime.datetime.now()
    return  order

  @staticmethod
  def get_order( order_id, original_client_order_id, client_order_id ):
    return  None

  def save(self):
    #TODO store the order into a database
    return


def process_new_order_single(user_id, client_order_id, symbol, side, order_type, price, order_quantity):
  # create a new order
  order = Order.create( user_id, client_order_id, symbol, side, order_type, price, order_quantity )

  if not has_margin(user_id, order):
    order.status = '4'  #Canceled
    order.save()
    return  order

  OrderMatcher.get(symbol).match(order)

  return order

def cancel_order(user_id, order_id, original_client_order_id, client_order_id ):
  order = Order.get_order(order_id, original_client_order_id, client_order_id)

  # TODO: Make sure the order belong to the same user
  if order.user_id != user_id:
    raise OrderNotFound


  # TODO: Cancel the order inside the order matcher
  OrderMatcher.get(order.symbol).cancel(order)

  return order
