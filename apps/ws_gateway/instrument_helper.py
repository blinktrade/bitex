from datetime import datetime
from pyblinktrade.signals import Signal

import time

signal_publish_security_status = Signal()

class InstrumentStatusHelper(object):
    """" InstrumentStatusHelper. """

    def __init__(self, symbol = "ALL"):
        self.symbol = str(symbol)
        self.last_trades = []
        self.volume_price = 0
        self.volume_size = 0
        self.last_price = 0
        self.max_price = 0
        self.min_price = None
        self.bid = None
        self.ask = None
        self.timestamp_last_update = int(time.time() * 1000)

    def set_best_bid(self, bid ):
      if self.bid != bid:
        self.timestamp_last_update = int(time.time() * 1000)
        self.bid = bid
        signal_publish_security_status('SECURITY_STATUS', self)

    def set_best_ask(self, ask ):
      if self.ask != ask:
        self.timestamp_last_update = int(time.time() * 1000)
        self.ask = ask
        signal_publish_security_status('SECURITY_STATUS', self)

    def _subtract_trade(self, trade):
        volume_price = int(
            trade['price'] *
            trade['size'] /
            1.e8)

        self.volume_price -= volume_price
        self.volume_size -= trade['size']

        if self.max_price == trade['price']:
            if self.last_trades:
                max_price_record = max(self.last_trades, key=lambda x:x['price'])
                if max_price_record:
                    self.max_price = max_price_record['price']
                else:
                    self.max_price = 0
            else:
                self.max_price = 0

        if self.min_price == trade['price']:
            if self.last_trades:
                min_price = min(self.last_trades, key=lambda x:x['price'])
                if min_price:
                    self.min_price = min_price['price']

    def _add_trade(self, trade):
        volume_price = int( trade['price'] * trade['size'] / 1.e8)
        self.volume_price += volume_price
        self.volume_size += trade['size']

        if trade['price'] > self.max_price:
            self.max_price = trade['price']

        if self.min_price is None or trade['price'] < self.min_price:
            self.min_price = trade['price']

    def push_trade(self, trade):
        while True:
            if len(self.last_trades) > 0:
                d1 = datetime.strptime(self.last_trades[-1]['trade_date'] + ' ' + self.last_trades[-1]['trade_time'], '%Y-%m-%d %H:%M:%S')
                d2 = datetime.strptime(trade['trade_date'] + ' ' + trade['trade_time'], '%Y-%m-%d %H:%M:%S')
                if (d2 - d1).days > 0:
                    removed_trade = self.last_trades.pop()
                    self._subtract_trade(removed_trade)
                    continue
            break

        self.last_trades.insert(0,trade)
        self._add_trade(trade)
        self.last_price = trade['price']

        signal_publish_security_status('SECURITY_STATUS', self)
