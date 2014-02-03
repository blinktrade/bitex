goog.provide('bitex.app.markets');

goog.require('goog.debug');
goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');
goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');
goog.require('bitex.ui.LastTrades');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.model.Model');
goog.require('bitex.model.Model.EventType');

goog.require('bootstrap.Dialog');
goog.require('goog.debug');

/**
 * @param {string} url
 */
bitex.app.markets = function( url ) {
  var bitEx = new bitex.api.BitEx();
  var model = new bitex.model.Model(document.body);

  var order_book_bid = null;
  var order_book_offer = null;
  var last_trades = null;

  bitEx.addEventListener(bitex.api.BitEx.EventType.ERROR_MESSAGE, function(e) {
    var msg = e.data;
    console.log( goog.debug.deepExpose(msg) );
  });

  try{
    bitEx.open(url);
  } catch( e ) {
    alert('Error connecting to the server. Please try again');
    return;
  }

  bitEx.addEventListener('opened', function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );

    if (goog.isDefAndNotNull(order_book_bid)) {
      order_book_bid.dispose() ;
      order_book_offer.dispose();
      last_trades.dispose();
    }

    order_book_bid = new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.BUY);
    order_book_offer = new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.SELL);
    last_trades = new bitex.ui.LastTrades();
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );
    last_trades.decorate( goog.dom.getElement('last_trades_id') );

    // Subscribe to MarketData
    bitEx.subscribeMarketData( 0, ['BTCBRL'], ['0','1','2'] );

  });

  bitEx.addEventListener('closed', function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    alert('Connection closed by the server');
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.TRADE_CLEAR, function(e){
    last_trades.clear();
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.TRADE, function(e) {
    var msg = e.data;
    var price =  (msg['MDEntryPx']/1e8).toFixed(0);
    var size =  (msg['MDEntrySize']/1e8).toFixed(3);

    // Workaround for satoshi square USD market
    var symbol = msg['Symbol'];
    if (symbol === 'BTCBRL') {
      symbol = 'BTCUSD';
    }

    last_trades.publishTrade(msg['MDEntryDate'],
                             msg['MDEntryTime'],
                             symbol,
                             msg['Side'],
                             price,
                             size,
                             msg['MDEntryBuyer'],
                             msg['MDEntrySeller'] );
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
    var qty = (msg['MDEntrySize']/1e8).toFixed(8);
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.updateOrder(index, qty);
    } else if (side == '1') {
      order_book_offer.updateOrder(index, qty);
    }
  });

  bitEx.addEventListener('ob_new_order',  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var price =  (msg['MDEntryPx']/1e8).toFixed(0);
    var qty = (msg['MDEntrySize']/1e8).toFixed(3);
    var username = msg['Username'];
    var broker = msg['Broker'];
    var orderId =  msg['OrderID'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      if (index === 0) {
        model.set('formatted_best_bid_brl', price);
      }
      order_book_bid.insertOrder(index, orderId, price, qty, username, broker );
    } else if (side == '1') {
      if (index === 0) {
        model.set('formatted_best_offer_brl', price);
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
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);
  });
};

goog.exportSymbol('bitex.app.markets', bitex.app.markets );
