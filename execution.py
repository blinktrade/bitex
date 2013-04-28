__author__ = 'rodrigo'

import bisect
from signals import Signal

import  datetime
from models import Trade

from market_data_signals import MdSubscriptionHelper

matcher_dict  = {}

execution_report_signal = Signal()

class ExecutionReport(object):
  execution_id_generator = 0
  def __init__(self, order, side):
    ExecutionReport.execution_id_generator += 1
    self.execution_id = ExecutionReport.execution_id_generator

    self.order_id = order.id
    self.client_order_id = order.client_order_id
    if order.has_leaves_qty and order.cum_qty == 0:
      self.execution_type  = '0'  # New
    elif order.has_leaves_qty and order.cum_qty > 0 :
      self.execution_type  = '1'  # Partial fill
    elif not order.has_leaves_qty and (order.cum_qty == order.order_qty ) :
      self.execution_type  = '2'  # fill
    else :
      self.execution_type  = '4'  # Cancel

    self.order_status = order.status
    self.symbol = order.symbol
    self.side = side
    self.last_price = order.last_price
    self.last_shares = order.last_qty
    self.leaves_qty = order.leaves_qty
    self.cxl_qty = order.cxl_qty

  def __str__(self):
    return '{"MsgType":"8", "OrderID":"%s", "ClOrdID":"%s", "ExecID":"%s", "ExecType":"%s",' \
           ' "OrdStatus":"%s", "Symbol":"%s", "Side":"%s", "LastPx":"%s", ' \
           ' "LastShares":"%s", "LeavesQty":"%s", "CxlQty":"%s" }' \
            % ( self.order_id, self.client_order_id, self.execution_id, self.execution_type,
                self.order_status, self.symbol, self.side, self.last_price,
                self.last_shares, self.leaves_qty, self.cxl_qty)


def on_execution_report(sender, rpt):
  print str(rpt)


class OrderMatcher(object):
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

  def match(self, session, order):
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
    cancelled_order = {}
    total_executed_qty = 0
    total_cancelled_qty = 0
    for x in xrange(0, len(other_side)):
      counter_order = other_side[x]

      executed_qty = order.match( counter_order, max(order.leaves_qty-total_executed_qty-total_cancelled_qty, 0) )
      if not executed_qty:
        break

      # Cancel this order if both orders belong to the same client
      if order.account_id == counter_order.account_id:
        cancelled_qty = order.leaves_qty - total_executed_qty
        total_cancelled_qty += cancelled_qty
        cancelled_order[order.id] = (cancelled_qty, order)
        break

      executed_price = counter_order.price

      # Check if the both accounts have funding to execute the order
      if order.is_buy:
        available_qty_to_buy = order.get_available_qty_to_execute('1',executed_qty, executed_price, total_executed_qty )
        if available_qty_to_buy < executed_qty:
          cancelled_qty = executed_qty - available_qty_to_buy
          total_cancelled_qty += cancelled_qty
          executed_qty = available_qty_to_buy
          cancelled_order[order.id] = (cancelled_qty, order)

        available_qty_to_sell =  counter_order.get_available_qty_to_execute('2',executed_qty, executed_price )
        if available_qty_to_sell < executed_qty:
          executed_qty = available_qty_to_sell
          cancelled_qty = counter_order.leaves_qty - executed_qty
          cancelled_order[counter_order.id] = (cancelled_qty, counter_order)

      elif order.is_sell:
        available_qty_to_sell =  order.get_available_qty_to_execute('2',executed_qty, executed_price, total_executed_qty )
        if available_qty_to_sell < executed_qty:
          cancelled_qty = executed_qty - available_qty_to_sell
          total_cancelled_qty += cancelled_qty
          executed_qty = available_qty_to_sell
          cancelled_order[order.id] = (cancelled_qty, order)

        available_qty_to_buy = counter_order.get_available_qty_to_execute('1',executed_qty, executed_price )
        if available_qty_to_buy < executed_qty:
          cancelled_qty = executed_qty - available_qty_to_buy
          executed_qty = available_qty_to_buy
          cancelled_order[counter_order.id] = (cancelled_qty, counter_order)

      if executed_qty:
        total_executed_qty += executed_qty
        executed_orders.append( ( executed_qty, executed_price, counter_order ) )

    # let's include the order in the book if the order is not fully executed.
    insert_pos = 0
    if total_executed_qty + total_cancelled_qty < order.leaves_qty:
      insert_pos = bisect.bisect_right(self_side, order)

    # generate a execution report if the order was accepted ( not cancelled )
    if total_cancelled_qty != order.order_qty:
      rpt_order         = ExecutionReport( order,         '1' if order.is_buy else '2' )
      execution_report_signal( order.account_id, rpt_order )



    # order execution
    delete_pos = 0
    for executed_qty, executed_price, counter_order in executed_orders:
      order.execute( executed_qty, executed_price )
      counter_order.execute(executed_qty, executed_price )

      buyer_username = order.user.username
      seller_username = counter_order.user.username
      if order.is_sell:
        tmp_username = buyer_username
        buyer_username = seller_username
        seller_username = buyer_username

      trade =  Trade( id                = str(order.id) + '.' + str(counter_order.id),
                      order_id          = order.id,
                      counter_order_id  = counter_order.id,
                      buyer_username    = buyer_username,
                      seller_username   = seller_username,
                      side              = order.side,
                      symbol            = self.symbol,
                      size              = executed_qty,
                      price             = executed_price,
                      when              = datetime.datetime.now())
      session.add(trade)
      MdSubscriptionHelper.publish_trade(trade)

      rpt_order         = ExecutionReport( order, '1' if order.is_buy else '2' )
      execution_report_signal(order.account_id, rpt_order )


      rpt_counter_order = ExecutionReport( counter_order, '1' if order.is_buy else '2' )
      execution_report_signal(counter_order.account_id, rpt_counter_order )

      if counter_order.id in cancelled_order:
        counter_order.cancel_qty(cancelled_order[counter_order.id][0])
        cancel_rpt_counter_order  = ExecutionReport( counter_order, '1' if order.is_buy else '2' )
        execution_report_signal( counter_order.account_id, cancel_rpt_counter_order )
        del cancelled_order[counter_order.id]

      if not counter_order.has_leaves_qty:
        delete_pos += 1
        other_side.pop(0)

    # cancelling all quantities that could not be filled
    for cancelled_qty, cxl_order in cancelled_order.values():
      cxl_order.cancel_qty(cancelled_qty)

      rpt_cancel_order = ExecutionReport( cxl_order, '1' if cxl_order.is_buy else '2' )
      execution_report_signal(cxl_order.account_id, rpt_cancel_order )


    md_entry_type = '0' if order.is_buy else '1'
    counter_md_entry_type = '1' if order.is_buy else '0'

    if order.has_leaves_qty:
      self_side.insert( insert_pos, order )

      MdSubscriptionHelper.publish_new_order( self.symbol, md_entry_type  , insert_pos, order)

      if len(executed_orders):
        if len(other_side):
          MdSubscriptionHelper.publish_executions( self.symbol, counter_md_entry_type, delete_pos, other_side[0] )
        else:
          MdSubscriptionHelper.publish_executions( self.symbol, counter_md_entry_type, delete_pos)

    else:
      if len(other_side) and len(executed_orders):
        MdSubscriptionHelper.publish_executions( self.symbol, counter_md_entry_type, delete_pos, other_side[0] )
      else:
        MdSubscriptionHelper.publish_executions( self.symbol, counter_md_entry_type, delete_pos)


    print str(self)


  def cancel(self, order):
    # TODO: remove the order from the book
    # TODO: Generate a cancel report
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

