goog.provide('bitex.app.bitex');


goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');
goog.require('bitex.ui.OrderEntry');
goog.require('bitex.ui.OrderEntry.EventType');

goog.require('bitex.ui.OrderEntryX');
goog.require('bitex.ui.OrderEntryX.EventType');


//goog.require('bitex.ui.Withdraw');
//goog.require('bitex.ui.Withdraw.EventType');

goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');

goog.require('bitex.ui.OrderManager');
goog.require('bitex.ui.AccountActivity');
goog.require('bitex.ui.WithdrawList');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');

goog.require('bitex.app.UrlRouter');
goog.require('bitex.model.Model');
goog.require('bitex.model.Model.EventType');

goog.require('bootstrap.Dialog');
goog.require('goog.debug');

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

  var withdraw_list_table = null;

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

  // When user select 'withdraw', let's load all withdraw requests from this user
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e){
    var view_name = e.view;
    if (view_name !== 'withdraw' || !bitEx.isLogged() ) {
      return;
    }

    if (!goog.isDefAndNotNull(withdraw_list_table)) {
      var el = goog.dom.getElement('id_withdraw_list_table');

      withdraw_list_table = new bitex.ui.WithdrawList();
      withdraw_list_table.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
        var page = e.options['Page'];
        var limit = e.options['Limit'];
        bitEx.requestWithdrawList( 'all_withdraws', page, limit, ['1', '2'] );
      });

      withdraw_list_table.decorate(el);

      bitEx.addEventListener(bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE,  function(e) {
        var msg = e.data;

        if (msg['WithdrawListReqID'] === 'all_withdraws' && goog.isDefAndNotNull(withdraw_list_table) ) {
          withdraw_list_table.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
        }
      });

    }
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

  var withdraws_component = new goog.ui.Component();
  withdraws_component.decorate(goog.dom.getElement('withdraw_accordion'));

  /*
  var withdraw_ltc = new bitex.ui.Withdraw( { parent_id:'withdraw_accordion',
                                              button_label:'Retirada em LTC',
                                              title: 'Retirada em Litecoin',
                                              description: 'Utilize o formulário abaixo para iniciar a sua retirada.',
                                              controls: [ ['amount', 'Quantidade', 'Digite a quantidade', 'Ł'],
                                                ['Wallet', 'carteira', 'Digite o endereço de sua carteira'] ]  });
  withdraws_component.addChild(withdraw_ltc, true);
  */

  var withdraw_btc = new bitex.ui.Withdraw( { parent_id:'withdraw_accordion',
                                              button_label:'Retirada em BTC',
                                              title: 'Retirada em Bitcoin',
                                              description: 'Utilize o formulário abaixo para iniciar a sua retirada.',
                                              controls: [ ['amount', 'Quantidade', 'Digite a quantidade', '฿'],
                                                          ['wallet', 'Carteira', 'Digite o endereço de sua carteira'] ]  });

  var withdraw_brl_bank_transfer =
      new bitex.ui.Withdraw({ parent_id:'withdraw_accordion',
                              button_label:'Retirada em BRL',
                              title: 'Transferência Bancária no Brasil',
                              description: 'Transferência Bancaria via DOC-C ou TED o custo de R$ 10,00 é cobrado.',
                              controls: [ ['amount',          'Valor',          'ex. 2300', 'R$'],
                                          ['bank_number',     'Número do banco', 'ex. 341'],
                                          ['bank_name',       'Nome do banco', 'ex. Banco Itáu'],
                                          ['account_branch',  'Código da agência', 'ex. 5555'],
                                          ['account_name',    'Nome do titular da conta', 'ex. José da Silva'],
                                          ['account_number',  'Conta corrente', 'ex. 888888'],
                                          ['CPFCNPJ',         'CPF ou CNPJ', 'ex. 888888']
                              ]});

  withdraws_component.addChild(withdraw_btc, true);
  withdraws_component.addChild(withdraw_brl_bank_transfer, true);


  withdraw_btc.addEventListener( bitex.ui.Withdraw.EventType.WITHDRAW, function(e){
    var amount = e.target.getModel().data['amount'];
    amount = amount.replace(',','.');
    if (amount.lastIndexOf('.') != amount.indexOf('.') ) {
      alert('Valor de saque inválido. Por favor digite somente números sem separadores de milhares.');
      return;
    }


    bitEx.withdrawCryptoCoin( parseFloat(amount),
                              e.target.getModel().data['wallet'] ,
                              'BTC');
  });

  withdraw_brl_bank_transfer.addEventListener( bitex.ui.Withdraw.EventType.WITHDRAW, function(e){
    var amount = e.target.getModel().data['amount'];
    amount = amount.replace(',','.');
    if (amount.lastIndexOf('.') != amount.indexOf('.') ) {
      alert('Valor de saque inválido. Por favor digite somente números sem separadores de milhares.');
      return;
    }

    bitEx.withdrawBRLBankTransfer( parseFloat(amount),
                                   e.target.getModel().data['bank_number'] ,
                                   e.target.getModel().data['bank_name'] ,
                                   e.target.getModel().data['account_name'] ,
                                   e.target.getModel().data['account_number'] ,
                                   e.target.getModel().data['account_branch'] ,
                                   e.target.getModel().data['CPFCNPJ'])
  });
  var buy_order_entry = new bitex.ui.OrderEntryX();
  buy_order_entry.decorate( goog.dom.getElement('id_order_entry_buy') );

  var sell_order_entry = new bitex.ui.OrderEntryX();
  sell_order_entry.decorate( goog.dom.getElement('id_order_entry_sell') );



  model.addEventListener( bitex.model.Model.EventType.SET + 'formatted_best_offer_brl', function(e) {
    var formatted_best_offer = /* @type {string}  */  e.data;
    buy_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_offer) );
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'formatted_best_bid_brl', function(e) {
    var formatted_best_bid = /* @type {string}  */  e.data;
    sell_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_bid) );
  });

  buy_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendBuyLimitedOrder( "BTCBRL", e.target.getAmount(), e.target.getPrice(), e.target.getClientID());
    var pendingOrderMessage = {
      'OrderID': '-',
      'ClOrdID': '' + client_order_id,
      'OrdStatus': '-',
      'Symbol': 'BTCBRL',
      'Side': '1',
      'OrderQty': e.target.getAmount() * 1e8,
      'Price': e.target.getPrice()  * 1e8
    };
    order_manager.processExecutionReport(pendingOrderMessage);
  });

  sell_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendSellLimitedOrder( "BTCBRL", e.target.getAmount(), e.target.getPrice(), e.target.getClientID());
    var pendingOrderMessage = {
      'OrderID': '-',
      'ClOrdID': '' + client_order_id,
      'OrdStatus': '-',
      'Symbol': 'BTCBRL',
      'Side': '2',
      'OrderQty': e.target.getAmount() * 1e8,
      'Price': e.target.getPrice()  * 1e8
    };
    order_manager.processExecutionReport(pendingOrderMessage);
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
      'Price': e.price * 1e8
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
      'Price': e.price * 1e8
    };
    order_manager.processExecutionReport(pendingOrderMessage);
  });

  /**
   * @param {bitex.ui.OrderBookEvent} e
   */
  var onCancelOrder_ = function(e) {
    bitEx.cancelOrder(undefined, e.order_id);
  };


  bitEx.addEventListener(bitex.api.BitEx.EventType.ERROR_MESSAGE, function(e) {
    var msg = e.data;

    console.log( goog.debug.deepExpose(msg) );
  });

  bitEx.addEventListener('login_ok',  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-not-logged' );

    model.set('UserID', msg['UserID'] );
    model.set('Username', msg['Username']);
    model.set('TwoFactorEnabled', msg['TwoFactorEnabled']);
    model.set('BtcAddress', msg['BtcAddress']);
    model.set('IsBroker', msg['IsBroker'] );

    buy_order_entry.setBrokerMode(model.get('IsBroker')  );
    sell_order_entry.setBrokerMode(model.get('IsBroker')  );
    if (! msg['IsBroker'] ) {
      buy_order_entry.setClientID(model.get('UserID'));
      sell_order_entry.setClientID(model.get('UserID'));
    }


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
    bitEx.subscribeMarketData( 0, ['BTCBRL'], ['0','1','2'] );

    // Request Deposit Options
    bitEx.requestDepositMethods();

    // set view to Trading
    router.setView('trading');
  });

  order_manager.addEventListener(bitex.ui.OrderManager.EventType.CANCEL, function(e){
    bitEx.cancelOrder( e.client_order_id , e.order_id );
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

  var withdrawConfirmationDialog;
  var withdrawResponseFunction = function(e){
    var msg = e.data;

    if (goog.isDefAndNotNull(withdrawConfirmationDialog)) {
      withdrawConfirmationDialog.dispose();
    }

    var dlg_content =
        '<p>Para a sua segurança, nós enviamos um <strong>código de confirmação</strong> para o seu email. </p> ' +
            '<input id="id_withdraw_confirmation" placeholder="Código de confirmação" class="input-block-level">' +
            '<p><i>A operação só será efeutada mediante ao código de confirmação que fora enviada para o seu email.</i></p>';

    withdrawConfirmationDialog = new bootstrap.Dialog();
    withdrawConfirmationDialog.setTitle('Confirme a operação de saque');
    withdrawConfirmationDialog.setContent(dlg_content);
    withdrawConfirmationDialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOkCancel());
    withdrawConfirmationDialog.setVisible(true);

    goog.events.listenOnce(withdrawConfirmationDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var token = goog.dom.forms.getValue( goog.dom.getElement("id_withdraw_confirmation") );
        bitEx.confirmWithdraw(token);
      }
      withdrawConfirmationDialog.dispose();
    });
  };
  bitEx.addEventListener(bitex.api.BitEx.EventType.BRL_BANK_TRANSFER_WITHDRAW_RESPONSE, withdrawResponseFunction );
  bitEx.addEventListener(bitex.api.BitEx.EventType.CRYPTO_COIN_WITHDRAW_RESPONSE, withdrawResponseFunction );


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

  var secondFactorDialog;
  bitEx.addEventListener('login_error',  function(e) {
    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );

    var msg = e.data;

    model.set('UserID', '');
    model.set('Username', '');

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
    var price =  (msg['MDEntryPx']/1e8).toFixed(5);
    var qty = (msg['MDEntrySize']/1e8).toFixed(8);
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

  /*
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
  */

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
    var price =  (msg['MDEntryPx']/1e8).toFixed(5);
    //price_changed(price);
  });

  bitEx.addEventListener('balance_response',  function(e) {
    var msg = e.data;

    model.set('balance_brl', msg['balance_brl']);
    model.set('balance_btc', msg['balance_btc']);

    var formatted_brl = (msg['balance_brl']/1e8).toFixed(2);
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
    var broker = goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker")));


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
        bitEx.signUp(username, password, email, broker);
      });

    } else {
      bitEx.close();
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

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Erro se conectando ao servidor...');
        return;
      }

      goog.events.listenOnce( bitEx, 'opened', function(e){
        if (goog.string.isEmpty(second_factor) ) {
          bitEx.login(username, password);
        } else {
          bitEx.login(username, password, second_factor);
        }
      });

    } else {
      bitEx.close();
    }
  };


  bitEx.addEventListener('two_factor_secret', function(e){
    var msg = e.data;
    model.set('TwoFactorSecret', msg['TwoFactorSecret']);
    model.set('TwoFactorEnabled', msg['TwoFactorEnabled'] );

    var secret_qr_el = goog.dom.getElement('id_secret_qr');
    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    if (goog.string.isEmpty(msg['TwoFactorSecret'])) {
      goog.style.showElement( divEl , false);
    } else {
      goog.style.showElement( divEl , true);

      var qr_code = 'https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=' + msg['TwoFactorSecret'];
      secret_qr_el.setAttribute('src', qr_code);
    }
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'BtcAddress', function(e) {
    var btc_address = /* @type {string}  */  e.data;
    var qr_code = 'https://chart.googleapis.com/chart?chs=100x100&chld=M%7C0&cht=qr&chl=' + btc_address;

    btc_adrress_el = goog.dom.getElement('id_bitcoin_address_img');
    btc_adrress_el.setAttribute('src', qr_code);
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorSecret', function(e){
    var secret = /* @type {string} */ e.data;
    var has_secret = goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    goog.style.showElement( divEl , has_secret);
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorEnabled', function(e){
    var enabled = /* @type {boolean} */ e.data;

    var secret = model.get('TwoFactorSecret');
    var has_secret = goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    var btnEnableEl = goog.dom.getElement('id_btn_enable_two_factor');
    var btnDisableEl = goog.dom.getElement('id_btn_disable_two_factor');

    goog.style.showElement( btnEnableEl , !enabled);
    goog.style.showElement( btnDisableEl , enabled);
    goog.style.showElement( divEl , has_secret);
  });


  goog.events.listen( goog.dom.getElement('id_btn_enable_two_factor'), 'click', function(e){
    var secret = model.get('TwoFactorSecret');
    var code = goog.dom.forms.getValue( goog.dom.getElement('id_second_step_verification'));
    bitEx.enableTwoFactor(true, secret, code);
  });

  goog.events.listen( goog.dom.getElement('id_btn_disable_two_factor'), 'click', function(e){
    bitEx.enableTwoFactor(false);
  });

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

  var deposit_buttons = goog.dom.getElementsByClass('deposit-methods-group');
  goog.array.forEach( deposit_buttons, function( deposit_button ) {
    goog.events.listen( deposit_button, 'click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var element = e.target;

      var value = goog.dom.forms.getValue( goog.dom.getElement("id_deposit_value") );
      var deposit_id = element.getAttribute('data-deposit-id');

      if (goog.isDefAndNotNull(deposit_id)) {
        if (goog.string.isEmpty(value) || !goog.string.isNumeric(value) || parseInt(value,10) <= 0 ) {
          alert('Por favor, preencha o valor do deposit a ser gerado');
          return;
        }

        bitEx.generateDeposit(deposit_id,value);
      }
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.DEPOSIT_METHODS_RESPONSE, function(e) {
    var msg = e.data;

    //deposit-methods-group
    var deposit_methods_group_elements = goog.dom.getElementsByClass('deposit-methods-group');
    goog.array.forEach( deposit_methods_group_elements, function( deposit_methods_group_element ) {
      goog.dom.removeChildren(deposit_methods_group_element);
      goog.array.forEach( msg['DepositMethodGrp'], function(deposit_method) {
        var deposit_method_id = deposit_method['DepositMethodGrp'];
        var description = deposit_method['Description'];

        var deposit_btn_attributes = {
          "data-deposit-id": deposit_method_id,
          "class" : "btn btn-primary btn-deposit"
        };
        var buttonElement = goog.dom.createDom( goog.dom.TagName.BUTTON, deposit_btn_attributes, description  );

        goog.dom.appendChild(deposit_methods_group_element, buttonElement);
      });

    });

  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.GENERATE_DEPOSIT_RESPONSE, function(e) {
    var msg = e.data;

    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Deposit');
    dlg.setContent('<a  target="_blank" href="/print_deposit?deposit_id=' +  msg['DepositID']
             + '" class="btn btn-primary">Imprimir deposit</a> ou fazer <a href="/print_deposit?download=1&deposit_id='
             +  msg['DepositID'] + '">download do deposit</a> em seu computador');

    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);
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
