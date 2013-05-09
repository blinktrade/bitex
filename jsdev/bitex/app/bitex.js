goog.provide('bitex.app.bitex');


goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');
goog.require('bitex.ui.BalanceInfo');
goog.require('bitex.ui.OrderEntry');
goog.require('bitex.ui.OrderEntry.EventType');

goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.app.UrlRouter');

/**
 * @param {string} url
 */
bitex.app.bitex = function( url ) {
  var router = new bitex.app.UrlRouter( '', 'start' );


  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;

    // remove any active view classes from document body
    var classes = goog.dom.classes.get(document.body );
    var classes_to_remove = [];
    goog.array.forEach( classes, function( cls ) {
      if (goog.string.startsWith(cls, 'active-view-' ) ){
        classes_to_remove.push(cls);
      }
    });
    goog.array.forEach( classes_to_remove, function( cls ) {
      goog.dom.classes.remove( document.body, cls );
    });

    document.body.scrollTop = 0;

    // set the current view
    goog.dom.classes.add( document.body, 'active-view-' + view_name );
  });


  goog.events.listen( document.body, 'click' , function(e){
    var element = e.target;

    var view_name = element.getAttribute('data-switch-view');
    if (goog.isDefAndNotNull(view_name)) {
      e.preventDefault();
      e.stopPropagation();

      router.setView(view_name );
    }
  });


  var bitEx = new bitex.api.BitEx();
  var currentUsername = null;


  var order_book_bid = null;
  var order_book_offer = null;

  var balance_info = new bitex.ui.BalanceInfo();
  balance_info.decorate( goog.dom.getElement('account_overview') );

  var order_entry = new bitex.ui.OrderEntry();
  order_entry.decorate( goog.dom.getElement('id_order_entry') );

  order_entry.addEventListener( bitex.ui.OrderEntry.EventType.BUY_LIMITED, function(e){
    var client_order_id = bitEx.sendBuyLimitedOrder( e.symbol, e.qty, e.price );
  });
  order_entry.addEventListener( bitex.ui.OrderEntry.EventType.SELL_LIMITED, function(e){
    var client_order_id = bitEx.sendSellLimitedOrder( e.symbol, e.qty, e.price );
  });

  /**
   * @param {bitex.ui.OrderBookEvent} e
   */
  var onCancelOrder_ = function(e) {
    bitEx.cancelOrder(undefined, e.order_id);
  };

  bitEx.addEventListener('login_ok',  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-not-logged' );
    currentUsername = msg['Username'];

    if (goog.isDefAndNotNull(order_book_bid)) {
      order_book_bid.dispose() ;
      order_book_offer.dispose();
    }


    order_book_bid = new bitex.ui.OrderBook(currentUsername, bitex.ui.OrderBook.Side.BUY);
    order_book_offer = new bitex.ui.OrderBook(currentUsername, bitex.ui.OrderBook.Side.SELL);
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );

    order_book_bid.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
    order_book_offer.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);

    // Get the list of all open orders
    bitEx.requestOpenOrders();

    // Subscribe to MarketData
    bitEx.subscribeMarketData( 0, ['BRLBTC'], ['0','1','2'] );

    // set view to Trading
    router.setView('trading');
  });


  bitEx.addEventListener('login_error',  function(e) {
    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );

    var msg = e.data;
    alert(msg['UserStatusText']);
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
    var price =  (msg['MDEntryPx']/1e5).toFixed(5);
    var qty = (msg['MDEntrySize']/1e8).toFixed(8);
    var username = msg['Username'];
    var orderId =  msg['OrderID'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.insertOrder(index, orderId, price, qty, username );
    } else if (side == '1') {
      order_book_offer.insertOrder(index, orderId, price, qty, username );
    }
  });

  bitEx.addEventListener('balance_response',  function(e) {
    var msg = e.data;
    balance_info.updateBalanceBRL(msg['balance_brl']);
    balance_info.updateBalanceBTC(msg['balance_btc']);
  });


  var button_signup = new goog.ui.Button();
  button_signup.decorate(goog.dom.getElement('id_btn_signup'));


  goog.events.listen(goog.dom.getElement('user_agreed_tos'),goog.events.EventType.CLICK,function(e) {
     button_signup.setEnabled(e.target.checked);
   });

  button_signup.addEventListener( goog.ui.Component.EventType.ACTION, function(e){
    e.stopPropagation();
    e.preventDefault();


    // Perform client validation
    var first_name = goog.dom.forms.getValue( goog.dom.getElement("id_signup_first_name") );
    var last_name = goog.dom.forms.getValue( goog.dom.getElement("id_signup_last_name") );
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_signup_username") );
    var email = goog.dom.forms.getValue( goog.dom.getElement("id_signup_email") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password") );
    var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password2") );


    if (goog.string.isEmpty(first_name)) {
      alert('Primeiro nome é de preenchimento obrigatório');
      return;
    }

    if (goog.string.isEmpty(last_name)) {
      alert('Ultimo nome é de preenchimento obrigatório');
      return;
    }

    if (goog.string.isEmpty(username) || !goog.string.isAlphaNumeric(username) ) {
      alert('Nome de usuário inválido');
      return;
    }

    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      alert('Endereço de email inválido');
      return;
    }

    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Senha deve ter no mínimo 6 letras');
      return;
    }

    if ( password !== password2 ) {
      alert('Senhas não conferem');
      return;
    }


    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Erro se conectando ao servidor...');
        return;
      }

      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.signUp(username, password, first_name, last_name, email);
      });

    } else {
      bitEx.close();
    }
  });


  var button_login = new goog.ui.Button();
  button_login.decorate(goog.dom.getElement('id_btn_login'));

  button_login.addEventListener( goog.ui.Component.EventType.ACTION, function(e){
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );


    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Erro se conectando ao servidor...');
        return;
      }

      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.login(username, password);
      } );

    } else {
      bitEx.close();
    }
  });

  bitEx.addEventListener('opened', function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );
  });

  bitEx.addEventListener('closed', function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    router.setView('signin');
  });

  bitEx.addEventListener('error',  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    router.setView('signin');
  });
};

goog.exportSymbol('bitex.app.bitex', bitex.app.bitex );
