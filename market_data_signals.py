__author__ = 'rodrigo'

from  signals import Signal
import json

from models import Trade

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
        "OrderID": order.id,
        "Username": order.username
      })
    md = {
      "MsgType":"X",
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": entry_list
    }
    order_book_signal( symbol + '.' + entry_type , md )

  @staticmethod
  def publish_cancel_order(symbol, entry_type, order_position ):
    md = {
      "MsgType":"X",
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": [{
        "MDUpdateAction":"2",  # Delete
        "Symbol": symbol,
        "MDEntryType": entry_type,
        "MDEntryPositionNo": order_position,
        }]
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
          "OrderID": order.id,
          "Username": order.username
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


def generate_md_full_refresh( session, symbol, market_depth, om, entries  ):
  entry_list = []

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
          "MDEntryType": entry_type,
          "MDEntryPositionNo": entry_position,
          "MDEntryID": order.id,
          "MDEntryPx": order.price,
          "MDEntrySize": order.leaves_qty,
          "MDEntryDate": order.created.date(),
          "MDEntryTime": order.created.time(),
          "OrderID": order.id,
          "Username": order.username
        })

        if entry_position >= market_depth > 0:
          break
    elif entry_type == '2':
      # return last 100 Trades
      trades = Trade.get_last_100_trades(session, symbol)
      trade_list = []
      for trade in  trades:
        trade_list.append({
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
