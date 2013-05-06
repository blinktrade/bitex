goog.provide('bitex.app.admin');

goog.require('bitex.api.BitEx');
goog.require('bitex.ui.DataGrid');
goog.require('bitex.ui.DataGrid.EventType');
goog.require('bitex.ui.DataGridEvent');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');

goog.require('goog.ui.Button');

goog.require('goog.history.Html5History');
goog.require('goog.array');
goog.require('goog.string');

bitex.app.admin = function() {
  var BASE_URL = 'admin/';
  var DEFAULT_VIEW = 'user_list';

  var history = new goog.history.Html5History();
  history.setUseFragment(false);

  history.addEventListener( goog.history.EventType.NAVIGATE, function(e){
    if (e.isNavigation) {
      console.log('goog.history.EventType.NAVIGATE isNavigation '  +  e.token);
      setActiveView(e.token);
    }
  });

  history.setEnabled(true);

  /**
   * @param {string} view_name
   */
  var setActiveView = function( view_name ) {
    view_name = goog.string.remove(view_name, BASE_URL );
    if  ( view_name === "" ) {
      view_name = DEFAULT_VIEW;
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

    // set the current view
    goog.dom.classes.add( document.body, 'active-view-' + view_name );
  };

  goog.events.listen( document.body, 'click' , function(e){
    var element = e.target;

    var view_name = element.getAttribute('data-switch-view');
    if (goog.isDefAndNotNull(view_name)) {
      e.preventDefault();
      e.stopPropagation();

      view_name = BASE_URL + view_name;
      setActiveView(view_name);
      history.setToken(view_name);
    }
  });


  var bitEx = new bitex.api.BitEx();
  var currentUsername = null;

  var order_book_bid = null;
  var order_book_offer = null;

  var button_login = new goog.ui.Button();
  button_login.decorate(goog.dom.getElement('id_btn_login'));

  var button_ws_connect = new goog.ui.Button();
  button_ws_connect.decorate(goog.dom.getElement('btn_ws_connect'));

  var deposit_button = new goog.ui.Button();
  deposit_button.decorate(goog.dom.getElement('id_deposit'));

  var withdrawBtcDataGrid = new bitex.ui.DataGrid([
    { 'property': 'username',
      'label': 'Username',
      'sortable': true,
      'formatter': function(s){ return  s; }
    },{
      'property': 'created',
      'label': 'When',
      'sortable': true,
      'formatter': function(s){ return s; }
    },{
      'property': 'amount',
      'label': 'Amount ( BTC )',
      'sortable': true,
      'formatter': function(value){return (value/1e8).toFixed(8);}
    },{
      'property': 'status',
      'label': 'Status',
      'sortable': true,
      'formatter': function(s){
        var status_dict = { 0: 'pending', 1:'in-progress', 2:'complete' };
        return status_dict[s];
      }
    },{
      'property': 'id',
      'label': 'Actions',
      'sortable': true,
      'formatter': function(id){
        var classes = "btn btn-mini btn-primary btn-in-progress";
        return [
          goog.dom.createDom( 'button', { 'class':classes, 'data-withdraw-btc-id':id }, 'Set in-progress'),
          goog.dom.createDom( 'button', { 'class':classes, 'data-withdraw-btc-id':id }, 'Set complete')
        ];
      }
    }
  ]);

  var userListDataGrid = new bitex.ui.DataGrid([
    { 'property': 'first_name',
      'label': 'First Name',
      'sortable': true,
      'formatter': function(s){ return  s; }
    },{
      'property': 'last_name',
      'label': 'Last Name',
      'sortable': true,
      'formatter': function(s){ return s; }
    },{
      'property': 'email',
      'label': 'Email',
      'sortable': true,
      'formatter': function(s){ return s; }
    },{
      'property': 'balance_btc',
      'label': 'BTC',
      'sortable': true,
      'formatter': function(value){return (value/1e8).toFixed(8);}
    },{
      'property': 'balance_brl',
      'label': 'R$',
      'sortable': true,
      'formatter': function(value){return (value/1e5).toFixed(5);}
    },{
      'property': 'verified',
      'label': 'Verified',
      'sortable': true,
      'formatter': function(s){ if (s) { return 'Y' } else {return 'N';} }
    },{
      'property': 'id',
      'label': 'Actions',
      'sortable': true,
      'formatter': function(user_id){
        var classes = "btn btn-mini btn-primary btn-deposit";
        return goog.dom.createDom( 'button', { 'class':classes, 'data-user-id':user_id }, 'deposit' );
      }
    }]);


  bitEx.addEventListener('opened', function(e) {
    button_ws_connect.setCaption('Desconectar');
    button_ws_connect.setEnabled(true);

    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );
  });

  bitEx.addEventListener('closed', function(e) {
    button_ws_connect.setCaption('Connectar');
    button_ws_connect.setEnabled(true);

    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
  });

  bitEx.addEventListener('error',  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );

    button_ws_connect.setCaption('Connectar');
    button_ws_connect.setEnabled(true);
    goog.dom.setTextContent( goog.dom.getElement('websocket_error_msg'), 'Erro se conectando c/ o servidor' );

    $("#error_websocket_modal").modal();
  });


  /**
   * @param {string} table_name
   * @param {bitex.ui.DataGridEvent} e
   */
  var onRequestTableData = function( table_name, e ) {
    var options = e.options;

    options['MsgType'] = 'ADMIN_SELECT';
    options['Table'] = table_name;

    bitEx.sendRawMessage( options );
  };


  userListDataGrid.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,
                                     goog.partial( onRequestTableData, 'users' ) );

  withdrawBtcDataGrid.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,
                                        goog.partial( onRequestTableData, 'withdraws_btc' ) );



  bitEx.addEventListener('raw_message',  function(e) {
    var msg = e.data;
    if (msg['MsgType'] == 'ADMIN_SELECT_RESPONSE') {
      switch( msg['Table'] ) {
        case 'users':
          userListDataGrid.setResultSet( msg['ResultSet'] );
          break;
        case 'withdraws_btc':
          withdrawBtcDataGrid.setResultSet( msg['ResultSet'] );
          break;
      }
    }
  });


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


    bitEx.subscribeMarketData( 0, ['BRLBTC'], ['0','1','2'] );

    if (userListDataGrid.wasDecorated()) {
      userListDataGrid.reload();
      withdrawBtcDataGrid.reload();
    } else {
      userListDataGrid.decorate(goog.dom.getElement('user_list_data_grid'));
      withdrawBtcDataGrid.decorate(goog.dom.getElement('withdraw_requests_btc_data_grid'));

    }


    goog.events.listen( userListDataGrid.getElement(), 'click' , function(e){
      if (goog.dom.classes.has(e.target, 'btn-deposit')) {
        var user_id = e.target.getAttribute('data-user-id');
        goog.dom.forms.setValue( goog.dom.getElement('id_deposit_user_id'), user_id );
        $("#deposit_modal").modal();
      }
    });
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

    console.log('ob_new_order: ' + index );

    if (side == '0') {
      order_book_bid.insertOrder(index, orderId, price, qty, username );
    } else if (side == '1') {
      order_book_offer.insertOrder(index, orderId, price, qty, username );
    }

  });


  bitEx.addEventListener('login_error',  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );
    alert(msg['UserStatusText']);
  });


  deposit_button.addEventListener(goog.ui.Component.EventType.ACTION, function(e){
    var is_valid = $('#deposit-form').parsley( 'validate' );
    if (is_valid) {

      var currency =  goog.dom.forms.getValue( goog.dom.getElement('id_deposit_currency'));
      var amount =  goog.dom.forms.getValue( goog.dom.getElement('id_deposit_amount'));
      var user_id =  goog.dom.forms.getValue( goog.dom.getElement('id_deposit_user_id'));
      var origin =  goog.dom.forms.getValue( goog.dom.getElement('id_deposit_origin'));

      if (currency == 'BRL' || currency == 'USD' ) {
        amount = parseInt(amount * 1e5, 10) ;
      } else if (currency == 'BTC' || currency == 'LTC' ) {
        amount = parseInt(amount * 1e8, 10)
      } else {
        alert('invalid currency code');
        e.stopPropagation();
        return;
      }

      if (amount === 0) {
        alert('invalid amount');
        e.stopPropagation();
        return;
      }

      var depositMsg = {
        'MsgType': 'DEPOSIT',
        'UserID': user_id,
        'Origin': origin,
        'Amount': amount,
        'Currency': currency
      };
      bitEx.sendRawMessage(depositMsg);

      userListDataGrid.reload();
    } else {
      // Invalid data
      e.stopPropagation();
    }
  });



  button_login.addEventListener( goog.ui.Component.EventType.ACTION, function(e){
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );
    bitEx.login(username, password);
  });

  button_ws_connect.addEventListener(goog.ui.Component.EventType.ACTION, function(e){
    var url =  goog.dom.forms.getValue(goog.dom.getElement( 'ws_url')) ;

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      button_ws_connect.setCaption('Loading ...');
      button_ws_connect.setEnabled(false);

      try{
        bitEx.open(url);
      } catch( e ) {
        $("#no_websockets_modal").modal();
      }

    } else {
      button_ws_connect.setCaption('Loading ...');
      button_ws_connect.setEnabled(false);
      bitEx.close();
    }
  });
};


goog.exportSymbol('bitex.app.admin', bitex.app.admin );
