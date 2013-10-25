__author__ = 'rodrigo'

from models import Trade
from trade_application import application

class MarketDataPublisher(object):
  def __init__(self,req_id, market_depth, entry, instrument, handler):
    self.handler = handler
    self.req_id = req_id


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
    application.publish( symbol + '.' + entry_type , md )

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
    application.publish( symbol + '.' + entry_type , md )


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
    application.publish( symbol + '.' + entry_type , md )

  @staticmethod
  def publish_trade(trade):
    md = {
      "MsgType":"X",
      "TradeDate": trade.created,
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": [{
        "MDUpdateAction":"0",
        "MDEntryType": "2",  # Trade
        "Symbol": trade.symbol,
        "MDEntryPx": trade.price,
        "MDEntrySize": trade.size,
        "MDEntryDate": trade.created.date(),
        "MDEntryTime": trade.created.time(),
        "OrderID": trade.order_id,
        "Side": trade.side,
        "SecondaryOrderID": trade.counter_order_id,
        "TradeID": trade.id,
        "MDEntryBuyer": trade.buyer_username,
        "MDEntrySeller": trade.seller_username,
        }]
    }
    application.publish( trade.symbol , md )


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
          "MDEntryDate": trade.created.date(),
          "MDEntryTime": trade.created.time(),
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
