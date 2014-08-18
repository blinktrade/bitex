import os
import base64
import json
import time

from instrument_helper import InstrumentStatusHelper, signal_publish_security_status
from bitex.signals import Signal

import zmq
from zmq.eventloop.zmqstream import ZMQStream

from bitex.message import JsonMessage

from models import Trade

from sqlalchemy.orm import scoped_session, sessionmaker

from datetime import datetime

MDSUBSCRIBEDICT = {}

signal_order_depth_entry = Signal()
signal_publish_md_order_depth_incremental = Signal()
signal_publish_md_status = Signal()


class MarketDataSubscriber(object):
    """" MarketDataSubscriber. """

    @classmethod
    def instance(cls):
        if not hasattr(cls, "_instance"):
          cls._instance = cls()
        return cls._instance

    def __init__(self, symbol = "ALL", application = None):
        self.symbol = str(symbol)
        self.buy_side = []
        self.sell_side = []
        self.volume_dict = {}
        self.inst_status = InstrumentStatusHelper(symbol)
        self.md_pub_socket = None
        self.md_pub_socket_stream = None
        self.is_ready = False
        self.process_later = []
        self.application = application
        self.db_session = application.db_session

    def subscribe(self,zmq_context,trade_pub_connection_string,trade_client):

        """" subscribe. """
        self.md_pub_socket = zmq_context.socket(zmq.SUB)
        self.md_pub_socket.connect(trade_pub_connection_string)
        self.md_pub_socket.setsockopt(zmq.SUBSCRIBE,"MD_FULL_REFRESH_" +self.symbol)
        self.md_pub_socket.setsockopt(zmq.SUBSCRIBE, "MD_TRADE_" + self.symbol)
        self.md_pub_socket.setsockopt(zmq.SUBSCRIBE,"MD_INCREMENTAL_" +self.symbol +".0")
        self.md_pub_socket.setsockopt(zmq.SUBSCRIBE,"MD_INCREMENTAL_" +self.symbol +".1")

        self.md_pub_socket_stream = ZMQStream(self.md_pub_socket)
        self.md_pub_socket_stream.on_recv(self.on_md_publish)

        md_subscription_msg = {
            'MsgType': 'V',
            'MDReqID': '0',  # not important.
            'SubscriptionRequestType': '0',
            'MarketDepth': 0,
            'TradeDate': time.strftime("%Y%m%d", time.localtime()),
            'MDUpdateType': '0',
            'MDEntryTypes': ['0', '1', '2'],
            'Instruments': [self.symbol]
        }

        return trade_client.sendJSON(md_subscription_msg)

    def ready(self):
        self.is_ready = True
        for trade in self.process_later:
          self.on_trade(trade)

        self.process_later = []


    @staticmethod
    def get(symbol, db_session=None):
        """" get. """
        global MDSUBSCRIBEDICT
        if symbol not in MDSUBSCRIBEDICT:
            MDSUBSCRIBEDICT[symbol] = MarketDataSubscriber(symbol, db_session)
        return MDSUBSCRIBEDICT[symbol]

    def get_last_trades(self):
        """" get_last_trades. """
        return Trade.get_last_trades()

    def get_trades(self, symbol, since):
        """" get_trades. """
        return Trade.get_trades(self.db_session, symbol, since)

    def on_md_publish(self, publish_msg):
        """" on_md_publish. """
        topic = publish_msg[0]
        raw_message = publish_msg[1]
        self.application.log('IN', 'TRADE_PUB', raw_message )

        msg = JsonMessage(raw_message)

        if msg.type == 'W':  # Full Refresh
            self.on_md_full_refresh(msg)

        elif msg.type == 'X':  # Incremental
            self.on_md_incremental(msg)

    def on_md_full_refresh(self, msg):
        """" on_md_full_refresh. """
        # TODO: Check if our current order book is sync with the full refresh
        if msg.get('MarketDepth') != 1:  # Has Market Depth
            self.on_book_clear()
            self.on_trade_clear()

            group = msg.get('MDFullGrp')
            for entry in group:
                entry_type = entry.get('MDEntryType')

                if entry_type == '0' or entry_type == '1':
                    self.on_book_new_order(entry)
                elif entry_type == '2':
                    self.on_trade(entry)

    def on_md_incremental(self, msg):
        """" on_md_incremental. """
        if msg.get('MDBkTyp') == '3':  # Order Depth
            group = msg.get('MDIncGrp')

            for entry in group:
                entry_type = entry.get('MDEntryType')

                signal_order_depth_entry(
                    self.symbol +
                    '.3.' +
                    entry_type,
                    entry)

                if entry_type == '0' or entry_type == '1':
                    update_action = entry.get('MDUpdateAction')
                    if update_action == '0':
                        self.on_book_new_order(entry)
                    elif update_action == '1':
                        self.on_book_update_order(entry)
                    elif update_action == '2':
                        self.on_book_delete_order(entry)
                    elif update_action == '3':
                        self.on_book_delete_orders_thru(entry)
                elif entry_type == '2':
                    self.on_trade(entry)
            signal_publish_md_order_depth_incremental(
                self.symbol + '.3', {"MsgType": "X"})

    def on_book_clear(self):
        """" on_book_clear. """
        self.buy_side = []
        self.sell_side = []

    def on_trade_clear(self):
        """" on_trade_clear. """
        self.volume_dict = {}

    def on_book_delete_orders_thru(self, msg):
        """" on_book_delete_orders_thru. """
        index = msg.get('MDEntryPositionNo')
        side = msg.get('MDEntryType')
        if side == '0':
            self.buy_side = self.buy_side[index:]

            if self.buy_side:
                self.inst_status.bid = self.buy_side[0]['price']
            else:
                self.inst_status.bid = 0

        elif side == '1':
            self.sell_side = self.sell_side[index:]

            if self.sell_side:
                self.inst_status.ask = self.sell_side[0]['price']
            else:
                self.inst_status.ask = 0


    def on_book_delete_order(self, msg):
        """" on_book_delete_order. """
        index = msg.get('MDEntryPositionNo') - 1
        side = msg.get('MDEntryType')

        if side == '0':
            del self.buy_side[index]
            if self.buy_side:
                self.inst_status.bid = self.buy_side[0]['price']
            else:
                self.inst_status.bid = 0

        elif side == '1':
            del self.sell_side[index]
            if self.sell_side:
                self.inst_status.ask = self.sell_side[0]['price']
            else:
                self.inst_status.ask = 0


    def on_book_new_order(self, msg):
        """" on_book_new_order. """
        index = msg.get('MDEntryPositionNo') - 1
        order = {
            'price': msg.get('MDEntryPx'),
            'qty': msg.get('MDEntrySize'),
            'username': msg.get('Username'),
            'broker': msg.get('Broker'),
            'order_id': msg.get('OrderID'),
            'side': msg.get('MDEntryType'),
            'order_time': msg.get('MDEntryTime'),
            'order_date': msg.get('MDEntryDate')
        }

        if msg.get('MDEntryType') == '0':  # buy
            self.buy_side.insert(index, order)
            if index == 0:
                self.inst_status.bid = msg.get('MDEntryPx')

        elif msg.get('MDEntryType') == '1':  # sell
            self.sell_side.insert(index, order)
            if index == 0:
                self.inst_status.ask = msg.get('MDEntryPx')


    def on_book_update_order(self, msg):
        """" on_book_new_order. """
        index = msg.get('MDEntryPositionNo') - 1
        order = {
            'price': msg.get('MDEntryPx'),
            'qty': msg.get('MDEntrySize'),
            'username': msg.get('Username'),
            'broker': msg.get('Broker'),
            'order_id': msg.get('OrderID'),
            'side': msg.get('MDEntryType'),
            'order_time': msg.get('MDEntryTime'),
            'order_date': msg.get('MDEntryDate')
        }
        if msg.get('MDEntryType') == '0':  # sell
            self.buy_side[index] = order
            if index == 0:
                self.inst_status.bid = msg.get('MDEntryPx')

        elif msg.get('MDEntryType') == '1':  # sell
            self.sell_side[index] = order
            if index == 0:
                self.inst_status.ask = msg.get('MDEntryPx')

    def on_trade(self, msg):
        if not self.is_ready:
            self.process_later.append(msg)
            return

        trade = {
            "price": msg.get('MDEntryPx'),
            "symbol": msg.get('Symbol'),
            "size": msg.get('MDEntrySize'),
            "trade_date": msg.get('MDEntryDate'),
            "trade_time": msg.get('MDEntryTime'),
            "order_id": msg.get('OrderID'),
            "side": msg.get('Side'),
            "counter_order_id": msg.get('SecondaryOrderID'),
            "id": msg.get('TradeID'),
            "buyer_username": msg.get('MDEntryBuyer'),
            "seller_username": msg.get('MDEntrySeller'),
        }

        Trade.create(self.db_session, trade)

        # BTC BRL
        price_currency = self.symbol[3:]
        size_currency = self.symbol[:3]
        if price_currency not in self.volume_dict:
            self.volume_dict[price_currency] = 0
        if size_currency not in self.volume_dict:
            self.volume_dict[size_currency] = 0

        volume_price = int(
            msg.get('MDEntryPx') *
            msg.get('MDEntrySize') /
            1.e8)

        volume_size = msg.get('MDEntrySize')
        self.volume_dict[price_currency] += volume_price
        self.volume_dict[size_currency] += volume_size

        self.volume_dict['MDEntryType'] = '4'
        signal_publish_md_status('MD_STATUS', self.volume_dict)

        self.inst_status.push_trade(trade)

class SecurityStatusPublisher(object):
    def __init__(self, req_id, instrument, handler):
        self.handler = handler
        self.req_id = req_id
        self.symbol = instrument

        signal_publish_security_status.connect(self.signal_security_status, 'SECURITY_STATUS')

    def signal_security_status(self, sender, helper):
        if helper.symbol == self.symbol:
            ss = {
                "MsgType": "f",
                "SecurityStatusReqID": self.req_id,
                "Symbol": self.symbol,
                "HighPx": helper.max_price,
                "LowPx": helper.min_price,
                "LastPx": helper.last_price,
                "BuyVolume": helper.volume_price,
                "SellVolume": helper.volume_size,
                "BestBid": helper.bid,
                "BestAsk": helper.ask
            }

            self.handler(sender, ss)


class MarketDataPublisher(object):

    def __init__(self, req_id, market_depth, entries, instrument, handler):
        self.handler = handler
        self.req_id = req_id

        self.entry_list_order_depth = []
        for entry in entries:
            signal_order_depth_entry.connect(
                self.signal_order_depth_added_entry,
                instrument +
                '.3.' +
                entry)

        signal_publish_md_order_depth_incremental.connect(
            self.signal_publish_md_order_depth,
            instrument + '.3')

        signal_publish_md_status.connect(self.signal_md_status, 'MD_STATUS')

    def signal_md_status(self, sender, entry):
        self.entry_list_order_depth.append(entry)

    def signal_order_depth_added_entry(self, sender, entry):
        self.entry_list_order_depth.append(entry)

    def signal_publish_md_order_depth(self, sender, md):
        if len(self.entry_list_order_depth) > 0:
            md["MDReqID"] = self.req_id
            md["MDBkTyp"] = '3'
            md["MDIncGrp"] = self.entry_list_order_depth
            self.handler(sender, md)
            self.entry_list_order_depth = []

def generate_trade_history(page_size = None, offset = None, sort_column = None, sort_order='ASC'):
    trades = Trade.get_last_trades(page_size, offset, sort_column, sort_order)
    trade_list = []
    for trade in  trades:
        trade_list.append([ 
          trade.id,
          trade.symbol,
          trade.side,
          trade.price,
          trade.size,
          trade.buyer_username,
          trade.seller_username,
          trade.created
        ])
    return trade_list


def generate_security_status(symbol, req_id):
    md_subscriber = MarketDataSubscriber.get(symbol)

    ss = {
        "MsgType": "f",
        "SecurityStatusReqID": req_id,
        "Symbol": symbol,
        "HighPx": md_subscriber.inst_status.max_price,
        "LowPx": md_subscriber.inst_status.min_price,
        "LastPx": md_subscriber.inst_status.last_price,
        "BuyVolume": md_subscriber.inst_status.volume_price,
        "SellVolume": md_subscriber.inst_status.volume_size,
        "BestBid": md_subscriber.inst_status.bid,
        "BestAsk": md_subscriber.inst_status.ask
    }

    return ss

def generate_md_full_refresh(symbol, market_depth, entries, req_id):
    entry_list = []
    md_subscriber = MarketDataSubscriber.get(symbol)

    for entry_type in entries:
        if entry_type == '0' or entry_type == '1':
            if entry_type == '0':  # Bid
                orders = md_subscriber.buy_side
            else:  # Offer
                orders = md_subscriber.sell_side

            entry_position = 0
            for order in orders:
                entry_position += 1

                entry_list.append({
                    "MDEntryType": entry_type,
                    "MDEntryPositionNo": entry_position,
                    "MDEntryID": order['order_id'],
                    "MDEntryPx": order['price'],
                    "MDEntrySize": order['qty'],
                    "MDEntryDate": order['order_date'],
                    "MDEntryTime": order['order_time'],
                    "OrderID": order['order_id'],
                    "Username": order['username'],
                    'Broker': order['broker']
                })

                if entry_position >= market_depth > 0:
                    break
        elif entry_type == '2':
            trade_list = []
            for trade in md_subscriber.get_last_trades():
                trade_list.append({
                    "MDEntryType": "2",  # Trade
                    "Symbol": symbol,
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

            volume_dict = {}

            if not len(trade_list):
                price_currency = symbol[3:]
                size_currency = symbol[:3]
                if price_currency not in volume_dict:
                    volume_dict[price_currency] = 0
                if size_currency not in volume_dict:
                    volume_dict[size_currency] = 0
                volume_dict['MDEntryType'] = '4'    
                
            for trade in reversed(trade_list):
                entry_list.append(trade)

                price_currency = symbol[3:]
                size_currency = symbol[:3]
                if price_currency not in volume_dict:
                    volume_dict[price_currency] = 0
                if size_currency not in volume_dict:
                    volume_dict[size_currency] = 0

                volume_price = int(
                    trade['MDEntryPx'] *
                    trade['MDEntrySize'] /
                    1.e8)
                volume_size = trade['MDEntrySize']
                volume_dict[price_currency] += volume_price
                volume_dict[size_currency] += volume_size
                volume_dict['MDEntryType'] = '4'
            entry_list.append(volume_dict)


    md = {
        "MsgType": "W",
        "MDReqID": req_id,
        "MarketDepth": market_depth,
        "Symbol": symbol,
        "MDFullGrp": entry_list
    }
    return md
