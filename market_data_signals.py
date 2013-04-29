__author__ = 'rodrigo'

from  signals import Signal
import json

trades_signal           = Signal()
top_of_the_book_signal  = Signal()
order_book_signal       = Signal()



class MdSubscriptionHelper(object):
  def __init__(self,req_id, market_depth, entry, instrument, handler):
    self.handler = handler
    self.req_id = req_id

    if entry in ('0', '1', 'B'):  # Bid, Offer, Trade Volume
      if market_depth == 0:
        order_book_signal.connect( self.signal_handler, instrument + '.' + entry )
      elif market_depth == 1:
        top_of_the_book_signal.connect( self.signal_handler, instrument + '.' + entry )

    elif entry == '2': # Trade
      trades_signal.connect(self.signal_handler, instrument)


  def signal_handler(self, sender, md):
    md['MDReqID'] = self.req_id
    self.handler(sender, md)


  @staticmethod
  def publish_full_refresh(orderMatcher):
    pass


  @staticmethod
  def publish_executions(symbol, entry_type, executed_count, order = None):
    entry_list = []

    if executed_count:
      entry_list.append( {
        "MDUpdateAction":"3",  # Delete Thru
        "Symbol": symbol,
        "MDEntryType": entry_type,
        "MDEntryPositionNo": executed_count,
        })

    if order:
      entry_list.append( {
        "MDUpdateAction":"1",  # Update
        "Symbol": symbol,
        "MDEntryType": entry_type,
        "MDEntryPositionNo": 1,
        "MDEntryID": order.id,
        "MDEntryPx": order.price,
        "MDEntrySize": order.leaves_qty,
        "MDEntryDate": order.created.date(),
        "MDEntryTime": order.created.time(),
        "OrderID": order.id
      })
    md = {
      "MsgType":"X",
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": entry_list
    }
    order_book_signal( symbol + '.' + entry_type , md )

  @staticmethod
  def publish_new_order(symbol, entry_type, order_position, order ):
    md = {
      "MsgType":"X",
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": [{
          "MDUpdateAction":"0",  # new
          "Symbol": symbol,
          "MDEntryType": entry_type,
          "MDEntryPositionNo": order_position + 1,
          "MDEntryID": order.id,
          "MDEntryPx": order.price,
          "MDEntrySize": order.leaves_qty,
          "MDEntryDate": order.created.date(),
          "MDEntryTime": order.created.time(),
          "OrderID": order.id
      }]
    }
    order_book_signal( symbol + '.' + entry_type , md )

  @staticmethod
  def publish_trade(trade):
    md = {
      "MsgType":"X",
      "TradeDate": trade.when,
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": [{
          "MDUpdateAction":"0",
          "MDEntryType": "2",  # Trade
          "Symbol": trade.symbol,
          "MDEntryPx": trade.price,
          "MDEntrySize": trade.size,
          "MDEntryDate": trade.when.date(),
          "MDEntryTime": trade.when.time(),
          "OrderID": trade.order_id,
          "Side": trade.side,
          "SecondaryOrderID": trade.counter_order_id,
          "TradeID": trade.id,
          "MDEntryBuyer": trade.buyer_username,
          "MDEntrySeller": trade.seller_username,
      }]
    }

    trades_signal( trade.symbol,  md )
