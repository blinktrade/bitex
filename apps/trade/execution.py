# -*- coding: utf-8 -*-

__author__ = 'rodrigo'

import bisect

import json
import datetime
from models import Trade, UserEmail

from trade_application import TradeApplication

from market_data_publisher import MarketDataPublisher

matcher_dict  = {}

class ExecutionReport(object):
  execution_id_generator = 0
  def __init__(self, order, execution_side):
    ExecutionReport.execution_id_generator += 1
    self.execution_id = ExecutionReport.execution_id_generator

    self.order_id = order.id
    self.client_order_id = order.client_order_id
    if order.leaves_qty > 0 and order.cum_qty == 0:
      self.execution_type  = '0'  # New
    elif order.leaves_qty > 0 and order.cum_qty > 0 :
      self.execution_type  = '1'  # Partial fill
    elif not order.leaves_qty > 0 and (order.cum_qty == order.order_qty ) :
      self.execution_type  = '2'  # fill
    else :
      self.execution_type  = '4'  # Cancel

    self.order_type = order.type
    self.time_in_force = order.time_in_force
    self.order_status = order.status
    self.symbol = order.symbol
    self.side =  '1' if order.is_buy else '2'
    self.last_price = order.last_price
    self.last_shares = order.last_qty
    self.leaves_qty = order.leaves_qty
    self.cum_qty = order.cum_qty
    self.cxl_qty = order.cxl_qty
    self.average_price = order.average_price
    self.order_qty = order.order_qty
    self.price = order.price
    self.execution_side = execution_side

  def toJson(self):
    resp = {
      'MsgType':'8',
      'OrderID': self.order_id,
      'ClOrdID': self.client_order_id,
      'ExecID': self.execution_id,
      'ExecType':  self.execution_type,
      'ExecSide': self.execution_side,
      'OrdStatus': self.order_status,
      'Symbol': self.symbol,
      'Side': self.side,
      'LastPx': self.last_price,
      'OrderQty': self.order_qty,
      'Price': self.price,
      'LastShares': self.last_shares,
      'LeavesQty': self.leaves_qty,
      'CxlQty': self.cxl_qty,
      'AvgPx': self.average_price,
      'CumQty': self.cum_qty,
      'TimeInForce': self.time_in_force,
      'OrdType': self.order_type
    }
    return  resp

  def __str__(self):
    return str(self.toJson())



class OrderMatcher(object):
  def __init__(self, symbol ):
    self.symbol     = symbol
    self.buy_side   = []
    self.sell_side  = []
    self.bid        = 0
    self.ask        = 0

  def __str__(self):
    res = ""
    for order in reversed(self.sell_side):
      res += str(order) + '\n'
    res += '-' + '\n'
    for order in self.buy_side:
      res += str(order) + '\n'
    return  res[:-1]


  def match(self, session, order, order_matcher_disabled=False, broker_fee=0):
    other_side = []
    self_side = []
    if order.is_buy:
      self_side = self.buy_side
      other_side = self.sell_side
    elif order.is_sell:
      other_side = self.buy_side
      self_side = self.sell_side


    execution_reports = []
    trades_to_publish = []

    execution_side = '1' if order.is_buy else '2'

    rpt_order  = ExecutionReport( order, execution_side )
    execution_reports.append( ( order.user_id, rpt_order.toJson() )  )
    if order.user_id != order.account_id:
      execution_reports.append( ( order.account_id, rpt_order.toJson() )  )

    is_last_match_a_partial_execution_on_counter_order = False
    execution_counter = 0
    number_of_filled_counter_market_orders = 0

    if not order_matcher_disabled:
      for execution_counter in xrange(0, len(other_side) + 1):
        if execution_counter == len(other_side):
          break # workaround to make the execution_counter be counted until the last order.

        if not order.leaves_qty > 0:
          break

        counter_order = other_side[execution_counter]

        if not order.has_match(counter_order):
          break

        # check for self execution
        if order.account_id == counter_order.account_id:
          # self execution.... let's cancel the counter order
          counter_order.cancel_qty( counter_order.leaves_qty )

          # generate a cancel report
          cancel_rpt_counter_order  = ExecutionReport( counter_order, execution_side )
          execution_reports.append( ( counter_order.user_id, cancel_rpt_counter_order.toJson() )  )
          if counter_order.user_id != counter_order.account_id:
            execution_reports.append( ( counter_order.account_id, cancel_rpt_counter_order.toJson() )  )

          # go to the next order
          is_last_match_a_partial_execution_on_counter_order = False
          continue

        # Get the desired executed price and qty, by matching against the counter_order
        executed_qty = order.match( counter_order, order.leaves_qty)

        if counter_order.type == '1': # Market Order
          executed_price = order.price
          number_of_filled_counter_market_orders += 1
        else:
          executed_price = counter_order.price

        # let's get the available qty to execute on the order side
        available_qty_on_order_side = order.get_available_qty_to_execute(session,
                                                                         '1' if order.is_buy else '2',
                                                                         executed_qty,
                                                                         executed_price )

        qty_to_cancel_from_order = 0
        if available_qty_on_order_side <  executed_qty:
          # ops ... looks like the order.user didn't have enough to execute the order
          executed_qty = available_qty_on_order_side

          # cancel the remaining  qty
          qty_to_cancel_from_order = order.leaves_qty - executed_qty


        # check if the order got fully cancelled
        if not executed_qty:
          order.cancel_qty( qty_to_cancel_from_order )
          cancel_rpt_order  = ExecutionReport( order, execution_side )
          execution_reports.append( ( order.user_id, cancel_rpt_order.toJson() )  )
          if order.user_id != order.account_id:
            execution_reports.append( ( order.account_id, cancel_rpt_order.toJson() )  )
          break


        # let's get the available qty to execute on the counter side
        available_qty_on_counter_side = counter_order.get_available_qty_to_execute(session,
                                                                                   '1' if counter_order.is_buy else '2',
                                                                                   executed_qty,
                                                                                   executed_price )

        qty_to_cancel_from_counter_order = 0
        if available_qty_on_counter_side <  executed_qty:
          if qty_to_cancel_from_order:
            qty_to_cancel_from_order -= executed_qty - available_qty_on_order_side

            # ops ... looks like the counter_order.user didn't have enough to execute the order
          executed_qty = available_qty_on_counter_side

          # cancel the remaining  qty
          qty_to_cancel_from_counter_order = counter_order.leaves_qty - executed_qty


        # check if the counter order was fully cancelled due the lack
        if not executed_qty:
          # just cancel the counter order, and go to the next order.
          counter_order.cancel_qty( qty_to_cancel_from_counter_order )

          # generate a cancel report
          cancel_rpt_counter_order  = ExecutionReport( counter_order, execution_side )
          execution_reports.append( ( counter_order.user_id, cancel_rpt_counter_order.toJson() )  )
          if counter_order.user_id != counter_order.account_id:
            execution_reports.append( ( counter_order.account_id, cancel_rpt_counter_order.toJson() )  )

          # go to the next order
          is_last_match_a_partial_execution_on_counter_order = False
          continue

        # lets perform the execution
        if executed_qty:
          order.execute( executed_qty, executed_price )
          counter_order.execute(executed_qty, executed_price )

          trade = Trade.create(session, order, counter_order, self.symbol, executed_qty, executed_price, None, broker_fee )
          trades_to_publish.append(trade)

          rpt_order         = ExecutionReport( order, execution_side )
          execution_reports.append( ( order.user_id, rpt_order.toJson() )  )
          if order.user_id != order.account_id:
            execution_reports.append( ( order.account_id, rpt_order.toJson() )  )

          rpt_counter_order = ExecutionReport( counter_order, execution_side )
          execution_reports.append( ( counter_order.user_id, rpt_counter_order.toJson() )  )
          if counter_order.user_id != counter_order.account_id:
            execution_reports.append( ( counter_order.account_id, rpt_counter_order.toJson() )  )

          def generate_email_subject_and_body( session, order, trade ):
            from json import  dumps
            from pyblinktrade.json_encoder import  JsonEncoder
            from models import Currency

            qty_currency = order.symbol[:3]
            formatted_qty = Currency.format_number( session, qty_currency, trade.size / 1.e8 )


            price_currency = order.symbol[3:]
            formatted_price = Currency.format_number( session, price_currency, trade.price / 1.e8 )

            formatted_total_price = Currency.format_number( session, price_currency, trade.size/1.e8 * trade.price/1.e8 )

            email_subject =  'E'
            email_template = "order-execution"
            email_params = {
              'username': order.user.username,
              'order_id': order.id,
              'trade_id': trade.id,
              'side': order.side,
              'executed_when': trade.created,
              'qty': formatted_qty,
              'price': formatted_price,
              'total': formatted_total_price
            }
            return  email_subject, email_template, dumps(email_params, cls=JsonEncoder)

          email_data = generate_email_subject_and_body(session, counter_order, trade)
          UserEmail.create( session = session,
                            user_id = counter_order.account_id,
                            broker_id = counter_order.broker_id,
                            subject = email_data[0],
                            template= email_data[1],
                            language= counter_order.email_lang,
                            params  = email_data[2])


        #
        # let's do the partial cancels
        #

        # Cancel the qty from the current order
        if qty_to_cancel_from_order:
          order.cancel_qty(qty_to_cancel_from_order)

          # generate a cancel report
          cancel_rpt_order  = ExecutionReport( order, execution_side )
          execution_reports.append( ( order.user_id, cancel_rpt_order.toJson() )  )

          if order.user_id != order.account_id:
            execution_reports.append( ( order.account_id, cancel_rpt_order.toJson() )  )


        if qty_to_cancel_from_counter_order:
          counter_order.cancel_qty(qty_to_cancel_from_counter_order)

          # generate a cancel report
          cancel_rpt_counter_order  = ExecutionReport( counter_order, execution_side )
          execution_reports.append( ( counter_order.user_id, cancel_rpt_counter_order.toJson() )  )
          if counter_order.user_id != counter_order.account_id:
            execution_reports.append( ( counter_order.account_id, cancel_rpt_counter_order.toJson() )  )

        if counter_order.leaves_qty > 0:
          is_last_match_a_partial_execution_on_counter_order = True


    md_entry_type = '0' if order.is_buy else '1'
    counter_md_entry_type = '1' if order.is_buy else '0'

    # let's include the order in the book if the order is not fully executed.
    if order.leaves_qty > 0:
      insert_pos = bisect.bisect_right(self_side, order)
      self_side.insert( insert_pos, order )

      if order.type == '2': # Limited orders go to the book.
        MarketDataPublisher.publish_new_order( self.symbol, md_entry_type , insert_pos, order)

    # don't send the first execution report (NEW) if the order was fully cancelled
    if order.is_cancelled and order.cum_qty == 0:
      execution_reports.pop(0)

    # Publish all execution reports
    for user_id, execution_report in execution_reports:
      TradeApplication.instance().publish( user_id, execution_report )

    # Publish Market Data for the counter order
    if execution_counter:
      if is_last_match_a_partial_execution_on_counter_order:
        del other_side[0: execution_counter-1]
        MarketDataPublisher.publish_executions( self.symbol,
                                                 counter_md_entry_type,
                                                 execution_counter - 1 - number_of_filled_counter_market_orders,
                                                 other_side[0] )
      else:
        del other_side[0: execution_counter]
        MarketDataPublisher.publish_executions( self.symbol,
                                                 counter_md_entry_type,
                                                 execution_counter - number_of_filled_counter_market_orders )

    if trades_to_publish:
      MarketDataPublisher.publish_trades(self.symbol, trades_to_publish)
    return ""


  def cancel(self, session, order):
    if not order:
      # Generate an Order Cancel Reject - Order not found
      return

    # let's find the  order position
    self_side = []
    if order.is_buy:
      self_side = self.buy_side
    elif order.is_sell:
      self_side = self.sell_side

    order_found = False
    order_pos = bisect.bisect_left(self_side, order)
    for x in xrange( order_pos, len(self_side)):
      tmp_order = self_side[x]

      if tmp_order.id == order.id:
        order_found = True
        break

      if tmp_order.price != order.price:
        break

      order_pos += 1


    if not order_found:
      # Generate an Order Cancel Reject - Order not found
      return

    # update the order
    order.cancel_qty( order.leaves_qty )
    session.commit()

    # remove the order from the book
    self_side.pop( order_pos )


    # Generate a cancel report
    cancel_rpt = ExecutionReport( order, '1' if order.is_buy else '2' )
    TradeApplication.instance().publish(order.user_id, cancel_rpt.toJson() )

    if order.user_id != order.account_id:
      TradeApplication.instance().publish(order.account_id, cancel_rpt.toJson() )


    # market data
    md_entry_type = '0' if order.is_buy else '1'
    MarketDataPublisher.publish_cancel_order( self.symbol, md_entry_type, order_pos+1 )

    return ""

  @staticmethod
  def get(symbol):
    global matcher_dict

    if symbol not in matcher_dict:
      matcher_dict[symbol] = OrderMatcher(symbol)

    return  matcher_dict[symbol]

