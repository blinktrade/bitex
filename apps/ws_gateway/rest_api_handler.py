import tornado.web
import tornado.httpclient
import calendar
import json

from market_data_helper import MarketDataSubscriber

class RestApiHandler(tornado.web.RequestHandler):
    def head(self, version, symbol, resource):
        self._process_request(version, symbol, resource)

    def get(self, version, symbol, resource):
        self._process_request(version, symbol, resource)

    def _send_order_book(self, symbol):
       md_subscriber = MarketDataSubscriber.get(symbol, self.application.db_session)

       bids = []
       asks = []

       for order in md_subscriber.buy_side:
           bids.append([order['price']/1e8, order['qty']/1e8, order['username']])

       for order in md_subscriber.sell_side:
           asks.append([order['price']/1e8, order['qty']/1e8, order['username']])

       self.write(
            {
                'pair': symbol,
                'bids': bids,
                'asks': asks
            }
        )

    def _send_trades(self, symbol, since):
        md_subscriber = MarketDataSubscriber.get(symbol, self.application)

        trades = []

        for trade in md_subscriber.get_trades(symbol, since):
            trades.append({
                'tid': trade.id,
                'price': trade.price/1e8,
                'amount': trade.size/1e8,
                'date': calendar.timegm(trade.created.timetuple()),
            })

        self.write(json.dumps(trades))

    def _process_request(self, version, symbol, resource):
        currency = self.get_argument("crypto_currency", default='BTC', strip=False)
        since = self.get_argument("since", default=0, strip=False)
        instrument = '%s%s'%(currency,  symbol)

        if version == 'v1':
            if resource == 'orderbook':
                self._send_order_book(instrument)
            elif resource == 'trades':
                self._send_trades(instrument, since)
            else:
                self.send_error(404)
        else:
            self.send_error(404)

