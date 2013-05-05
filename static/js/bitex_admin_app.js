goog.require('BitEx');
goog.require('bitex.ui.DataGrid');
goog.require('bitex.ui.DataGrid.EventType');
goog.require('bitex.ui.DataGridEvent');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');

goog.require('goog.ui.Button');

var main = function() {
  var bitEx = new BitEx();
  var currentUsername = null;



  var button_login = new goog.ui.Button();
  button_login.decorate(goog.dom.getElement('id_btn_login'));

  var button_ws_connect = new goog.ui.Button();
  button_ws_connect.decorate(goog.dom.getElement('btn_ws_connect'));

  var deposit_button = new goog.ui.Button();
  deposit_button.decorate(goog.dom.getElement('id_deposit'));


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


  bitEx.addEventListener('raw_message',  function(e) {
    var msg = e.data;
    if (msg['MsgType'] == 'ADMIN_SELECT_RESPONSE') {
      switch( msg['Table'] ) {
        case 'users':
          userListDataGrid.setResultSet( msg['ResultSet'] );
          break;
      }
    }
  });


  bitEx.addEventListener('login_ok',  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-not-logged' );
    currentUsername = msg['Username'];

    userListDataGrid.decorate(goog.dom.getElement('user_list_data_grid'));

    goog.events.listen( userListDataGrid.getElement(), 'click' , function(e){
      if (goog.dom.classes.has(e.target, 'btn-deposit')) {
        var user_id = e.target.getAttribute('data-user-id');
        goog.dom.forms.setValue( goog.dom.getElement('id_deposit_user_id'), user_id );
        $("#deposit_modal").modal();
      }
    });
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


main();
