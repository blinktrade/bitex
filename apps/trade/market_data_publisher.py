__author__ = 'rodrigo'

from models import Trade
from trade_application import TradeApplication

class MarketDataPublisher(object):
  def __init__(self, market_depth, entry, instrument, handler):
    self.handler = handler

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
        "UserID": order.account_id,
        "Username": order.account_username,
        "Broker": order.broker_username
      })
    if entry_list:
      md = {
        "MsgType":"X",
        "MDBkTyp": '3', # Order Depth
        "MDIncGrp": entry_list
      }
      TradeApplication.instance().publish( 'MD_INCREMENTAL_' + symbol + '.' + entry_type , md )

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
    TradeApplication.instance().publish( 'MD_INCREMENTAL_' + symbol + '.' + entry_type , md )


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
        "UserID": order.account_id,
        "Username": order.account_username,
        "Broker": order.broker_username

      }]
    }
    TradeApplication.instance().publish( 'MD_INCREMENTAL_' + symbol + '.' + entry_type , md )

  @staticmethod
  def publish_trades(symbol, trades):
    md_trades = []
    for trade in trades:
      md_trades.append({
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
        "MDEntryBuyerID": trade.buyer_id,
        "MDEntrySellerID": trade.seller_id,
        "MDEntryBuyer": trade.buyer_username,
        "MDEntrySeller": trade.seller_username,
      })
    md = {
      "MsgType":"X",
      "MDBkTyp": '3', # Order Depth
      "MDIncGrp": md_trades
    }
    TradeApplication.instance().publish( 'MD_TRADE_' + symbol , md )

  @staticmethod
  def generate_trade_history( session, page_size = None, offset = None, sort_column = None, sort_order='ASC' ):
    trades = Trade.get_last_trades(session, page_size, offset, sort_column, sort_order)
    trade_list = []
    for trade in  trades:
        trade_list.append([
          trade.id,
          trade.symbol,
          trade.side,
          trade.price,
          trade.size,
          trade.buyer_id,
          trade.seller_id,
          trade.buyer_username,
          trade.seller_username,
          trade.created,
          trade.order_id,
          trade.counter_order_id
        ])
    return trade_list

    #trades = Trade.get_last_trades( session, since ).all()
    #return trades
    pass

  @staticmethod
  def generate_md_full_refresh( session, symbol, market_depth, om, entries, req_id, timestamp  ):
    entry_list = []

    for entry_type in entries:
      if entry_type == '0' or entry_type == '1':
        if entry_type == '0': # Bid
          orders = om.buy_side
        else: # Offer
          orders = om.sell_side

        entry_position = 0
        for order in orders:
          if order.type == '1': # Hide the market orders
            continue

          entry_position += 1

          entry_list.append({
            "MDEntryType": entry_type,
            "MDEntryPositionNo": entry_position,
            "MDEntryID": order.id,
            "MDEntryPx": order.price,
            "MDEntrySize": order.leaves_qty,
            "MDEntryDate": order.created.date(),
            "MDEntryTime": order.created.time(),
            "OrderID": order.id,
            "UserID": order.account_id,
            "Username": order.account_username,
            "Broker": order.broker_username
          })

          if entry_position >= market_depth > 0:
            break

    md = {
      "MsgType":"W",
      "MDReqID": req_id,
      "MarketDepth": market_depth,
      "Symbol": symbol,
      "MDFullGrp": entry_list
    }
    TradeApplication.instance().publish( 'MD_FULL_REFRESH_' + symbol , md )
    return md
