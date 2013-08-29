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

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.app.UrlRouter');

goog.require('bootstrap.Dialog');


bitex.app.admin = function() {
  var router = new bitex.app.UrlRouter( 'admin/', 'user_list', 'deposit_list' );


  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;

    // remove any active view classes from document body
    var classes = goog.dom.classes.get(document.body);
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

  var button_login = new goog.ui.Button();
  button_login.decorate(goog.dom.getElement('id_btn_login'));

  var button_ws_connect = new goog.ui.Button();
  button_ws_connect.decorate(goog.dom.getElement('btn_ws_connect'));

  var deposit_button = new goog.ui.Button();
  deposit_button.decorate(goog.dom.getElement('id_deposit'));

  var withdrawBtcDataGrid = new bitex.ui.DataGrid({'columns': [
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
  ]});

  var depositDataGrid = new bitex.ui.DataGrid({'columns': [
    { 'property': 'user_id',
      'label': 'UserId',
      'sortable': true
  //    'formatter': function(s){ console.log(s); return s; }
    },{
      'property': 'currency',
      'label': 'Currency',
      'sortable': true
    },{
      'property': 'amount',
      'label': 'Amount',
      'sortable': true,
      'formatter': function(value){return (value/1e8).toFixed(8);}
    },{
      'property': 'status',
      'label': 'Status',
      'sortable': true
//      'formatter': function(s){ console.log(s); return s; }
    },{
      'property': 'created',
      'label': 'When',
      'sortable': true
//      'formatter': function(s){ console.log(s); return s; }
    },{
      'property': 'id',
      'label': 'Actions',
      'sortable': true,
      'formatter': function(id){
        var classes = "btn btn-mini btn-primary btn-in-progress";
        return [
          goog.dom.createDom('div', 'btn-group',
          goog.dom.createDom( 'button', { 'class':classes, 'data-deposit-id':id }, 'in-progress'),
          goog.dom.createDom( 'button', { 'class':classes, 'data-deposit-id':id }, 'done'))
        ];
      }
    }
  ]});

  var userListDataGrid = new bitex.ui.DataGrid({'columns' : [
    {
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
    }]});


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

  depositDataGrid.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,
                                        goog.partial( onRequestTableData, 'deposits' ) );

  bitEx.addEventListener('raw_message',  function(e) {
    var msg = e.data;
    if (msg['MsgType'] == 'ADMIN_SELECT_RESPONSE') {
      switch( msg['Table'] ) {
        case 'users':
          userListDataGrid.setResultSet( msg['ResultSet'], msg['Columns'] );
          break;
        case 'withdraws_btc':
          withdrawBtcDataGrid.setResultSet( msg['ResultSet'], msg['Columns'] );
          break;
        case 'deposits':
          depositDataGrid.setResultSet( msg['ResultSet'], msg['Columns'] );
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


    bitEx.subscribeMarketData( 0, ['BTCBRL'], ['0','1','2'] );

    if (userListDataGrid.wasDecorated()) {
      userListDataGrid.reload();
      withdrawBtcDataGrid.reload();
      depositDataGrid.reload();
    } else {
      userListDataGrid.decorate(goog.dom.getElement('user_list_data_grid'));
      withdrawBtcDataGrid.decorate(goog.dom.getElement('withdraw_requests_data_grid'));
      depositDataGrid.decorate(goog.dom.getElement('deposit_list_data_grid'));

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

    if (side == '0') {
      order_book_bid.insertOrder(index, orderId, price, qty, username );
    } else if (side == '1') {
      order_book_offer.insertOrder(index, orderId, price, qty, username );
    }

  });


  var secondFactorDialog;
  bitEx.addEventListener('login_error',  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );

    if (msg['NeedSecondFactor']) {
      if (goog.isDefAndNotNull(secondFactorDialog)) {
        secondFactorDialog.dispose();
      }

      secondFactorDialog = new bootstrap.Dialog();
      secondFactorDialog.setTitle('Autenticação em 2 passos');
      secondFactorDialog.setContent('Código de autenticação do Google Authenticator: <input id="id_second_factor" placeholder="ex. 555555" size="10">');
      secondFactorDialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOkCancel());
      secondFactorDialog.setVisible(true);

      goog.events.listenOnce(secondFactorDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
        if (e.key == 'ok') {

          var username = goog.dom.forms.getValue( goog.dom.getElement("id_landing_username") );
          var password = goog.dom.forms.getValue( goog.dom.getElement("id_landing_password") );
          var second_factor = goog.dom.forms.getValue( goog.dom.getElement("id_second_factor") );

          if ( goog.string.isEmpty(username) ) {
            username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
            password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );
          }
          login(username, password,second_factor);
        }
        secondFactorDialog.dispose();
      });
    } else {
      var error_dialog = new bootstrap.Dialog();
      error_dialog.setTitle('Erro');
      error_dialog.setContent(msg['UserStatusText']);
      error_dialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
      error_dialog.setVisible(true);
    }
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




  var login = function(username, password, opt_second_factor ) {
    username      = goog.string.trim(username);
    var second_factor = goog.string.trim(opt_second_factor || '');

    if (goog.string.isEmpty(username) ) {
      alert('Nome de usuário inválido');
      return;
    }
    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Senha deve ter no mínimo 6 letras');
      return;
    }

    if (goog.string.isEmpty(second_factor) ) {
      bitEx.login(username, password);
    } else {
      bitEx.login(username, password, second_factor);
    }
  };



  button_login.addEventListener( goog.ui.Component.EventType.ACTION, function(e){
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_password"));
    login(username, password);
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
