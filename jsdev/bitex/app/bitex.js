goog.provide('bitex.app.bitex');


goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');
goog.require('bitex.ui.OrderEntry');
goog.require('bitex.ui.OrderEntry.EventType');

goog.require('bitex.ui.WithdrawBTC');
goog.require('bitex.ui.WithdrawBTC.EventType');

goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');

goog.require('bitex.ui.OrderManager');
goog.require('bitex.ui.AccountActivity');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.app.UrlRouter');
goog.require('bitex.model.Model');

goog.require('bootstrap.Dialog');

/**
 * @param {string} url
 */
bitex.app.bitex = function( url ) {
  var router = new bitex.app.UrlRouter( '', 'start', 'withdrawing_bitcoin' );

  var bitEx = new bitex.api.BitEx();
  var model = new bitex.model.Model(document.body);

  var order_book_bid = null;
  var order_book_offer = null;

  var account_activity_table = null;

  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (!bitEx.isLogged()) {
      switch(view_name) {
        case 'start':
        case 'signin':
        case 'signup':
        case 'forgot_password':
        case 'set_new_password':
          break;
        default:
          // redirect non-logged users to the signin page
          router.setView('start');
          return false;
      }
    }

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


  // when user select 'account_activity', let's load all transactions from this user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'account_activity' || !bitEx.isLogged() ) {
      return;
    }

    if (!goog.isDefAndNotNull(account_activity_table)) {
      var el = goog.dom.getElement('id_trade_history_table');
      account_activity_table = new bitex.ui.AccountActivity();


      account_activity_table.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
        // Get the list of all open orders
        var page = e.options['Page'];
        var limit = e.options['Limit'];

        bitEx.requestOrderList( 'closed_orders', page, limit, ['1', '2'] );
      });

      account_activity_table.decorate(el);

      bitEx.addEventListener('order_list_response',  function(e) {
        var msg = e.data;

        if (msg['OrdersReqID'] === 'closed_orders' && goog.isDefAndNotNull(account_activity_table) ) {
          account_activity_table.setResultSet( msg['OrdListGrp'], msg['Columns'] );
        }
      });

    }
  });

  // when user select 'verification', let's the verification iframe for the user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'verification' || !bitEx.isLogged() ) {
      return;
    }


    var form_src = '/account_verification/?user_id=' + model.get('UserID') + "&username="  + model.get('Username');

    var verificationIFrameForm = goog.dom.getElement("JotFormIFrame");

    if (verificationIFrameForm.src !== form_src ) {
      verificationIFrameForm.src = form_src;
    }
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


  var withdraw_btc = new bitex.ui.WithdrawBTC();
  withdraw_btc.decorate( goog.dom.getElement('id_btc_withdraw') );

  withdraw_btc.addEventListener( bitex.ui.WithdrawBTC.EventType.WITHDRAW_BTC, function(e){
    bitEx.withDrawBTC(e.qty, e.address);
  });

  var order_entry = new bitex.ui.OrderEntry();
  order_entry.decorate( goog.dom.getElement('id_order_entry') );

  var order_manager = new bitex.ui.OrderManager();

  order_entry.addEventListener( bitex.ui.OrderEntry.EventType.BUY_LIMITED, function(e){
    var client_order_id = bitEx.sendBuyLimitedOrder( e.symbol, e.qty, e.price );
    var pendingOrderMessage = {
      'OrderID': '-',
      'ClOrdID': '' + client_order_id,
      'OrdStatus': '-',
      'Symbol': e.symbol,
      'Side': '1',
      'OrderQty': e.qty * 1e8,
      'Price': e.price * 1e5
    };
    order_manager.processExecutionReport(pendingOrderMessage);
  });
  order_entry.addEventListener( bitex.ui.OrderEntry.EventType.SELL_LIMITED, function(e){
    var client_order_id = bitEx.sendSellLimitedOrder( e.symbol, e.qty, e.price );

    var pendingOrderMessage = {
      'OrderID': '-',
      'ClOrdID': '' + client_order_id,
      'OrdStatus': '-',
      'Symbol': e.symbol,
      'Side': '2',
      'OrderQty': e.qty * 1e8,
      'Price': e.price * 1e5
    };
    order_manager.processExecutionReport(pendingOrderMessage);
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

    model.set('UserID', msg['UserID'] );
    model.set('Username', msg['Username']);

    if (goog.isDefAndNotNull(order_book_bid)) {
      order_book_bid.dispose() ;
      order_book_offer.dispose();
    }


    order_book_bid = new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.BUY);
    order_book_offer = new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.SELL);
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );

    order_book_bid.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
    order_book_offer.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);

    if (order_manager.wasDecorated()) {
      order_manager.reload();
    } else {
      order_manager.decorate( goog.dom.getElement('id_orders_table') );
    }


    // Subscribe to MarketData
    bitEx.subscribeMarketData( 0, ['BRLBTC'], ['0','1','2'] );
    bitEx.getBitcoinAddress(0, msg['UserID'])

    // set view to Trading
    router.setView('trading');
  });

  order_manager.addEventListener(bitex.ui.OrderManager.EventType.CANCEL, function(e){
    bitEx.cancelOrder(e.client_order_id );
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.EXECUTION_REPORT, function(e){
    var msg = e.data;
    switch( msg['ExecType'] ) {
      case '1':  //Partial Execution
        $.sticky('Oferta numero: ' + msg['OrderID'] +  ' foi parcialmente executada');
        break;
      case '4':  //Offer Cancelled 
        $.sticky('Oferta numero: ' + msg['OrderID'] +  ' foi cancelada');
        break;
    }
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.BTC_ADDRESS, function(e){
    var msg = e.data;
    model.set('UserWallet', msg['Address']);
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.WITHDRAW_RESPONSE, function(e){
    var msg = e.data;
    console.log(msg);
    console.log('====>');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK,  function(e) {
    var msg = e.data;
    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Sucesso');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('signin');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR,  function(e) {
    var msg = e.data;
    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Erro');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

  });


  bitEx.addEventListener('login_error',  function(e) {
    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );

    var msg = e.data;

    model.set('UserID', '');
    model.set('Username', '');


    var error_dialog = new bootstrap.Dialog();
    error_dialog.setTitle('Erro');
    error_dialog.setContent(msg['UserStatusText']);
    error_dialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    error_dialog.setVisible(true);
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
      if (index === 0) {
        model.set('formatted_best_bid_brl', price);
        price_changed(price);
      }

      order_book_bid.insertOrder(index, orderId, price, qty, username );
    } else if (side == '1') {
      if (index === 0) {
        model.set('formatted_best_offer_brl', price);
        price_changed(price);
      }


      order_book_offer.insertOrder(index, orderId, price, qty, username );
    }
  });


  function price_changed(price) {
    var new_px = price.toString().trim();
    var old_px = goog.dom.getTextContent(goog.dom.getElement('formatted_quote_brl'));

    old_px = old_px.substring(1).trim();
    new_px = new_px.substring(0,new_px.length-3).trim();

    if (new_px > old_px) { goog.dom.getElement('formatted_quote_brl').innerHTML = ('&#9650;'+new_px); }
    if (new_px < old_px) { goog.dom.getElement('formatted_quote_brl').innerHTML = ('&#9660;'+new_px); }

    var qty = goog.dom.forms.getValue( goog.dom.getElement("id_order_qty") );
    if ( !isNaN(qty) )  {
      var suggested_price = (new_px-0.1).toFixed(2);
      goog.dom.forms.setValue( goog.dom.getElement("id_price"), suggested_price);
      var total = qty * suggested_price;
      goog.dom.setTextContent(goog.dom.getElement('formatted_order_total'), total);
    }
  }

  goog.events.listen(goog.dom.getElement('id_order_qty'),goog.events.EventType.BLUR,function(e) {
    var new_px = goog.dom.forms.getValue( goog.dom.getElement("id_price") );
    var qty = goog.dom.forms.getValue( goog.dom.getElement("id_order_qty") );
    if (!isNaN(new_px) && !isNaN(qty) ) {
      var total = qty * new_px;
      goog.dom.setTextContent(goog.dom.getElement('formatted_order_total'), total);
    }
   });
  
  goog.events.listen(goog.dom.getElement('id_price'),goog.events.EventType.BLUR,function(e) {
    var new_px = goog.dom.forms.getValue( goog.dom.getElement("id_price") );
    var qty = goog.dom.forms.getValue( goog.dom.getElement("id_order_qty") );
    if (!isNaN(new_px) && !isNaN(qty) ) {
      var total = qty * new_px;
      goog.dom.setTextContent(goog.dom.getElement('formatted_order_total'), total);
    }
   });

  bitEx.addEventListener('trade',  function(e) {
    var msg = e.data;
    var price =  (msg['MDEntryPx']/1e5).toFixed(5);
    price_changed(price);
  });

  bitEx.addEventListener('balance_response',  function(e) {
    var msg = e.data;

    model.set('balance_brl', msg['balance_brl']);
    model.set('balance_btc', msg['balance_btc']);

    var formatted_brl = (msg['balance_brl']/1e5).toFixed(2);
    var formatted_btc = (msg['balance_btc']/1e8).toFixed(8);
    model.set('formatted_balance_brl', formatted_brl);
    model.set('formatted_balance_btc', formatted_btc);
  });

  bitEx.addEventListener('execution_report', function(e){
    order_manager.processExecutionReport(e.data);
  });


  order_manager.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
    // Get the list of all open orders
    var page = e.options['Page'];
    var limit = e.options['Limit'];

    bitEx.requestOrderList( 'open_orders', page, limit, ['0', '1'] );
  });


  bitEx.addEventListener('order_list_response',  function(e) {
    var msg = e.data;

    if (msg['OrdersReqID'] === 'open_orders' ) {
      order_manager.setResultSet( msg['OrdListGrp'], msg['Columns'] );
    }
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
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_signup_username") );
    var email = goog.dom.forms.getValue( goog.dom.getElement("id_signup_email") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password") );
    var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password2") );


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
        bitEx.signUp(username, password, email);
      });

    } else {
      bitEx.close();
    }
  });

  var login = function(username, password) {
    if (goog.string.isEmpty(username) ) {
      alert('Nome de usuário inválido');
      return;
    }
    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Senha deve ter no mínimo 6 letras');
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
        bitEx.login(username, password);
      });

    } else {
      bitEx.close();
    }
  };

  goog.events.listen( goog.dom.getElement('id_btn_forgot_password'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();

    var email = goog.dom.forms.getValue( goog.dom.getElement("id_forgot_password_email") );
    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      alert('Endereço de email inválido');
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
        bitEx.forgotPassword(email);
      });

    } else {
      bitEx.forgotPassword(email);
    }

    router.setView('set_new_password');
  });

  goog.events.listen( goog.dom.getElement('id_btn_set_new_password'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();

    var token = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_token") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_password") );
    var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_password2") );

    if (goog.string.isEmpty(token)) {
      alert('Por favor, informe um código de confirmação');
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
        bitEx.resetPassword(token, password);
      });

    } else {
      bitEx.resetPassword(token, password);
    }

  });


  goog.events.listen( goog.dom.getElement('id_landing_signin'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_landing_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_landing_password") );
    login(username, password);
  });

  goog.events.listen( goog.dom.getElement('id_btn_login'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );
    login(username, password);
  });


  bitEx.addEventListener('opened', function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );
  });

  bitEx.addEventListener('closed', function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    router.setView('start');
  });

  bitEx.addEventListener('error',  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Erro');
    dlg.setContent('Ocorreu um erro ao se conectar com a BitEx. Por favor, verifique se você possui um Browser de última geração.');
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('start');
  });
};

goog.exportSymbol('bitex.app.bitex', bitex.app.bitex );
