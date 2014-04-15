goog.provide('bitex.app.markets');

goog.require('goog.debug');
goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');
goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');
//goog.require('bitex.ui.LastTrades');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.model.Model');
goog.require('bitex.model.Model.EventType');
goog.require('bitex.model.OrderBookInstrumentModel');
goog.require('bitex.model.OrderBookCurrencyModel');

goog.require('bootstrap.Dialog');
goog.require('goog.debug');

/**
 * @param {string} url
 */
bitex.app.markets = function( url ) {
  //var bitEx = new bitex.api.BitEx();
  //var model = new bitex.model.Model(document.body);
  var last_trades = new bitex.ui.LastTrades();
  var order_book_bid =  null;
  var order_book_offer =  null;

  last_trades.decorate( goog.dom.getElement('last_trades_id') );

  var trade_subscriptions = null;

  var subscription_1 = null;
  var subscription_2 = null;

  /**
   * @type {Object.<bitex.model.OrderBookCurrencyModel>}
   */
  var currency_info = {};

  /**
   * @type {Object.<bitex.model.OrderBookInstrumentModel>}
   */
  var instrument_info = {};

  var format_currency = function(value, currency) {
    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var currency_def = currency_info[currency];

    var formatter = new goog.i18n.NumberFormat( currency_def.format, currency_def.code );

    return formatter.format(value);
  };

  bitEx.addEventListener(bitex.api.BitEx.EventType.ERROR_MESSAGE, function(e) {
    var msg = e.data;
  });

  try{
    bitEx.open(url);
  } catch( e ) {
    alert('Error connecting to the server. Please try again');
    return;
  }

  bitEx.addEventListener( bitex.api.BitEx.EventType.OPENED, function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );

    bitEx.requestSecurityList();
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.SECURITY_LIST, function(e) {
    var msg = e.data;
    goog.array.forEach(msg['Currencies'], function( currency) {
      currency_info[ currency['Code'] ] = {
        code: currency['Code'],
        format: currency['FormatJS'],
        description : currency['Description'],
        sign : currency['Sign'],
        pip : currency['Pip'],
        is_crypto : currency['IsCrypto']
      };
    });

    var symbols = [];
    goog.array.forEach(msg['Instruments'], function( instrument) {
      instrument_info[instrument['Symbol']] = {
        symbol: instrument['Symbol'],
        currency: instrument['Currency'],
        description: instrument['Description']
      };

      var symbol = instrument['Symbol'];
      symbols.push( symbol );

      var el = goog.dom.createDom('option', {'value': symbol }, instrument['Description']);
      goog.dom.appendChild( goog.dom.getElement('id_instrument_1'), el );
    });

    trade_subscriptions =  bitEx.subscribeMarketData( 0,  symbols , ['2'] );
  });

  goog.events.listen(goog.dom.getElement('id_instrument_1'), goog.events.EventType.CHANGE  , function(e) {
    var symbol = goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') ) ;

    // Subscribe to MarketData
    if (subscription_1) {
      bitEx.unSubscribeMarketData(subscription_1);
    }
    subscription_1 =  bitEx.subscribeMarketData( 0, [ symbol ], ['0','1'] );

    if (goog.isDefAndNotNull(order_book_bid)) {
      order_book_bid.clear();
      order_book_offer.clear();

      order_book_bid.dispose();
      order_book_offer.dispose();
    }

    var qtyCurrency = symbol.substr(0,3);
    var priceCurrency = symbol.substr(3);

    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var qtyCurrencyDef = currency_info[qtyCurrency];

    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var priceCurrencyDef = currency_info[priceCurrency];

    order_book_bid =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.BUY, qtyCurrencyDef, priceCurrencyDef);
    order_book_offer =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.SELL, qtyCurrencyDef, priceCurrencyDef);
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.CLOSED, function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    alert('Connection closed by the server');
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.TRADE_CLEAR, function(e){
    last_trades.clear();
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.TRADE, function(e) {
    var msg = e.data;
    var price =  (msg['MDEntryPx']/1e8);
    var size =  (msg['MDEntrySize']/1e8);

    // Workaround for satoshi square USD market
    var symbol = msg['Symbol'];
    var price_currency  = symbol.substr(3,3);
    var size_currency   = symbol.substr(0,3);

    last_trades.publishTrade(msg['MDEntryDate'],
                             msg['MDEntryTime'],
                             symbol,
                             msg['Side'],
                             format_currency(price, price_currency),
                             format_currency(size, size_currency),
                             msg['MDEntryBuyer'],
                             msg['MDEntrySeller'] );
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.TRADING_SESSION_STATUS, function(e) {
    try {
      //  {"BRL": 52800000000, "MDEntryType": "4", "BTC": 66000000}
      var msg = e.data;

      delete msg['MDEntryType'];

      goog.object.forEach( msg, function(volume, currency) {
        volume = volume / 1e8;

        var volume_key = 'volume_' +  currency.toLowerCase();
        model.set( volume_key , volume );
        model.set('formatted_' + volume_key, format_currency(volume, currency));
      });
    } catch(str) { }
  });

  bitEx.addEventListener('ob_clear', function(e){
    order_book_bid.clear();
    order_book_offer.clear();
  });

  bitEx.addEventListener('ob_delete_orders_thru',  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrderThru(index);
    } else if (side == '1') {
      order_book_offer.deleteOrderThru(index);
    }
  });

  bitEx.addEventListener('ob_delete_order',  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrder(index);
    } else if (side == '1') {
      order_book_offer.deleteOrder(index);
    }
  });

  bitEx.addEventListener('ob_update_order',  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var qty = msg['MDEntrySize']/1e8;
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.updateOrder(index, qty);
    } else if (side == '1') {
      order_book_offer.updateOrder(index, qty);
    }
  });

  bitEx.addEventListener('ob_new_order',  function(e) {
    var msg = e.data;

    console.log("=================> 2 - received:", msg);

    var symbol = msg['Symbol'];
    var index = msg['MDEntryPositionNo'] - 1;
    var price =  msg['MDEntryPx']/1e8;
    var qty = msg['MDEntrySize']/1e8;
    var username = msg['Username'];
    var broker = msg['Broker'];
    var orderId =  msg['OrderID'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      if (index === 0) {
        model.set('formatted_best_bid_brl', format_currency(price, symbol.substr(3,3) ));
      }
      order_book_bid.insertOrder(index, orderId, price, qty, username, broker );
    } else if (side == '1') {
      if (index === 0) {
        model.set('formatted_best_offer_brl', format_currency(price, symbol.substr(3,3) ));
      }
      order_book_offer.insertOrder(index, orderId, price, qty, username, broker );
    }
  });

  bitEx.addEventListener('error',  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Erro');
    dlg.setContent('Your browser does not support WebSockets.');
    dlg.setButtonSet( bootstrap.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);
  });
};

goog.exportSymbol('bitex.app.markets', bitex.app.markets );
