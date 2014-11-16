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

    def _send_tiker(self, symbol):
      md_subscriber = MarketDataSubscriber.get(symbol, self.application)

      ticker = {
        "pair": symbol,
        "high": md_subscriber.inst_status.max_price / 1e8,
        "low": md_subscriber.inst_status.min_price / 1e8,
        "last": md_subscriber.inst_status.last_price / 1e8,
        "vol_" + symbol[3:].lower(): md_subscriber.inst_status.volume_price / 1e8,
        "vol": md_subscriber.inst_status.volume_size / 1e8,
        "buy": md_subscriber.inst_status.bid / 1e8,
        "sell": md_subscriber.inst_status.ask / 1e8
      }
      self.write( json.dumps(ticker))

    def _send_order_book(self, symbol):
       md_subscriber = MarketDataSubscriber.get(symbol, self.application.db_session)

       bids = []
       asks = []

       for order in md_subscriber.buy_side:
           bids.append([order['price']/1e8, order['qty']/1e8, order['user_id']])

       for order in md_subscriber.sell_side:
           asks.append([order['price']/1e8, order['qty']/1e8, order['user_id']])

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
        currency  = self.get_argument("crypto_currency", default='BTC', strip=False)
        since     = self.get_argument("since", default=0, strip=False)
        callback  = self.get_argument("callback", default='', strip=False)
        if not callback:
          callback  = self.get_argument("jsonp", default='', strip=False)

        instrument = '%s%s'%(currency,  symbol)

        if callback:
          self.write( callback + '(' )
        if version == 'v1':
            if resource == 'orderbook':
                self._send_order_book(instrument)
            elif resource == 'trades':
                self._send_trades(instrument, float(since))
            elif resource == 'ticker':
                self._send_tiker(instrument)
            else:
                self.send_error(404)
        else:
            self.send_error(404)

        if callback:
          self.write( ');' )
