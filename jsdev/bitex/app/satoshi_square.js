goog.provide('bitex.app.satoshi_square');

goog.require('bitex.util');
goog.require('bitex.api.BitEx');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');

goog.require('bitex.ui.OrderEntryX');
goog.require('bitex.ui.OrderEntryX.EventType');


goog.require('bitex.ui.Withdraw');
goog.require('bitex.ui.Withdraw.EventType');

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
goog.require('goog.object');

goog.require('bitex.app.UrlRouter');
goog.require('bitex.model.Model');
goog.require('bitex.model.Model.EventType');

goog.require('bootstrap.Dialog');
goog.require('goog.debug');

/**
 * @param {string} url
 */
bitex.app.satoshi_square = function( url ) {
  var router = new bitex.app.UrlRouter( '', 'start', 'withdrawing_bitcoin' );

  var bitEx = new bitex.api.BitEx();
  var model = new bitex.model.Model(document.body);


  var account_activity_table = null;

  var withdraw_list_table = null;

  var brokers_by_country = {};
  var currency_info = {};
  var all_markets = [];
  var trade_subscriptions = null;

  var order_book_bid = null;
  var order_book_offer = null;
  var subscription_1 = null;

  var format_currency = function(value, currency) {
    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var currency_def = currency_info[currency];

    var formatter = new goog.i18n.NumberFormat( currency_def.format, currency_def.code );

    return formatter.format(value);
  };

  var countries = bitex.util.getCountries();
  goog.object.forEach( countries, function(country_info, country_code ) {
    var country = country_info;

    if (goog.isArrayLike(country)) {
      country = country[0];
    }

    var el = goog.dom.createDom('option', {'value': country_code }, country);
    goog.dom.appendChild( goog.dom.getElement('id_signup_country'), el );
  });

  var buy_order_entry = new bitex.ui.OrderEntryX();
  var sell_order_entry = new bitex.ui.OrderEntryX();

  buy_order_entry.decorate( goog.dom.getElement('id_order_entry_buy') );
  sell_order_entry.decorate( goog.dom.getElement('id_order_entry_sell') );

  try{
    bitEx.open(url);
  } catch( e ) {
    alert('Error connecting to the server. Please try again');
    return;
  }

  buy_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendBuyLimitedOrder( e.target.getSymbol(),
                                                     e.target.getAmount(),
                                                     e.target.getPrice(),
                                                     e.target.getClientID());
  });

  sell_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendSellLimitedOrder( e.target.getSymbol(),
                                                      e.target.getAmount(),
                                                      e.target.getPrice(),
                                                      e.target.getClientID());
  });



  bitEx.addEventListener( bitex.api.BitEx.EventType.OPENED, function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );

    goog.dom.removeChildren(goog.dom.getElement('id_instrument_1'));
    bitEx.requestSecurityList();

    bitEx.requestBrokerList();
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.CLOSED, function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    router.setView('start');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ERROR ,  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Error');
    dlg.setContent('Error connecting to the server. Your browser MUST SUPPORT WebSockets.');
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('start');
  });

  var onSelectCountry = function(selected_country) {
    console.log( 'selected country:' + selected_country);

    goog.dom.removeChildren(goog.dom.getElement('id_signup_state'));
    var country_info = countries[selected_country];
    goog.style.showElement( goog.dom.getElement('id_signup_state_group'), goog.isArrayLike(country_info) );

    goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));
    if (goog.isDefAndNotNull(brokers_by_country[""][0] )) {
      var broker_info = brokers_by_country[""][0];
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }

    if ( goog.isArrayLike(country_info)) {
      var states_code_array = country_info[1].split('|');
      var states_name_array = country_info[2].split('|');

      var number_of_states_with_brokers = 0;
      var last_state_with_broker = '';
      goog.array.forEach(states_code_array, function(state_code, index) {
        var state_name = states_name_array[index];
        var el = goog.dom.createDom('option', {'value': state_code }, state_name);
        goog.dom.appendChild( goog.dom.getElement('id_signup_state'), el );

        var stateIndex = goog.array.findIndex( brokers_by_country[selected_country], function(broker_info )  {
          if (broker_info['State'] === state_code ) {
            return true;
          }
        });
        if (stateIndex >= 0){
          ++number_of_states_with_brokers;
          last_state_with_broker = state_code;
        }

      });
      if (number_of_states_with_brokers==1) {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), last_state_with_broker );
        onSelectState(selected_country, last_state_with_broker);
      }
    } else {
      var number_of_available_brokers = 0;
      var last_available_broker = "";

      goog.object.forEach(brokers_by_country[selected_country], function(broker_info) {
        var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
        goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );

        ++number_of_available_brokers;
        last_available_broker = broker_info['BrokerID'];
      });

      if (number_of_available_brokers == 1) {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
      } else {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
      }

      goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
      goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );
    }
  };

  var onSelectState = function( selected_country, selected_state ) {
    goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));

    if (goog.isDefAndNotNull(brokers_by_country[""][0] )) {
      var broker_info = brokers_by_country[""][0];
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }

    var number_of_available_brokers = 0;
    var last_available_broker = "";
    goog.array.forEach(brokers_by_country[selected_country], function(broker_info) {
      if (broker_info['State'] === selected_state ) {
        ++number_of_available_brokers;
        last_available_broker = broker_info['BrokerID'];
        var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
        goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
      }
    });
    if (number_of_available_brokers == 1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
    } else {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
    }
    goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
    goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );

  };

  goog.events.listen(goog.dom.getElement('id_signup_country'), goog.events.EventType.CHANGE  , function(e) {
    var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
    onSelectCountry(selected_country);
  });

  goog.events.listen(goog.dom.getElement('id_signup_state'), goog.events.EventType.CHANGE  , function(e) {
    var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
    var selected_state = goog.dom.forms.getValue(goog.dom.getElement('id_signup_state') ) ;
    onSelectState(selected_country, selected_state);
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, function(e){
    var msg = e.data;
    console.log(goog.debug.deepExpose(msg));

    var last_country_code = "";
    var number_of_countries = 0;
    goog.array.forEach(msg['BrokerListGrp'], function( broker_array )  {
      var broker_info = {};
      goog.array.forEach(msg['Columns'], function( column, index )  {
        broker_info[column] = broker_array[index];
      });
      if (broker_info['CountryCode'] in brokers_by_country) {
        brokers_by_country[broker_info['CountryCode'] ].push(broker_info);
      } else {
        brokers_by_country[broker_info['CountryCode'] ] = [broker_info];

        if (broker_info['CountryCode'].length > 0) {
          last_country_code = broker_info['CountryCode'];
          ++number_of_countries ;
        }
      }
    });

    if (number_of_countries == 1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), last_country_code );
      onSelectCountry(last_country_code);
    }
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

      var balance_key = 'balance_' +  currency['Code'].toLowerCase();
      model.set( balance_key , 0 );
      model.set('formatted_' + balance_key, format_currency(0, currency['Code']));
    });

    var symbols = [];
    goog.array.forEach(msg['Instruments'], function( instrument) {
      var symbol = instrument['Symbol'];

      all_markets[symbol]  = {
        symbol: symbol,
        description: instrument['Description']
      };

      symbols.push( symbol );
      var el = goog.dom.createDom('option', {'value': symbol }, instrument['Description']);
      goog.dom.appendChild( goog.dom.getElement('id_instrument_1'), el );
    });

    //trade_subscriptions =  bitEx.subscribeMarketData( 0,  symbols , ['2'] );
  });

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


  /**
   * @param {string} symbol
   */
  var switchSymbol = function(symbol) {
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

    buy_order_entry.setSymbol(symbol);
    buy_order_entry.setAmountCurrencySign( qtyCurrencyDef.sign );
    buy_order_entry.setPriceCurrencySign( priceCurrencyDef.sign );
    sell_order_entry.setSymbol(symbol);
    sell_order_entry.setAmountCurrencySign( qtyCurrencyDef.sign );
    sell_order_entry.setPriceCurrencySign( priceCurrencyDef.sign );

    goog.style.showElement( sell_order_entry.getElement(), goog.isDefAndNotNull( model.get('AllowedMarkets')[symbol]));
    goog.style.showElement( buy_order_entry.getElement(), goog.isDefAndNotNull( model.get('AllowedMarkets')[symbol]));

    order_book_bid =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.BUY, qtyCurrencyDef, priceCurrencyDef);
    order_book_offer =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.SELL, qtyCurrencyDef, priceCurrencyDef);
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );

    order_book_bid.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
    order_book_offer.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
  };

  // when user select 'offerbook', let's the verification iframe for the user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'offerbook' || !bitEx.isLogged() ) {
      if (subscription_1) {
        bitEx.unSubscribeMarketData(subscription_1);
        subscription_1 = null;
      }

      if (goog.isDefAndNotNull(order_book_bid)) {
        order_book_bid.clear();
        order_book_offer.clear();

        order_book_bid.dispose();
        order_book_offer.dispose();

        order_book_bid = null;
        order_book_offer = null;
      }

      return;
    }

    var symbol = goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') ) ;
    if (goog.isDefAndNotNull(symbol) ) {
      switchSymbol(symbol);
    }

    goog.events.listen(goog.dom.getElement('id_instrument_1'), goog.events.EventType.CHANGE  , function(e) {
      symbol = goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') ) ;
      console.log('selected ' + symbol);
      switchSymbol(symbol);
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR, function(e){
    order_book_bid.clear();
    order_book_offer.clear();
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrderThru(index);
    } else if (side == '1') {
      order_book_offer.deleteOrderThru(index);
    }
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrder(index);
    } else if (side == '1') {
      order_book_offer.deleteOrder(index);
    }
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER,  function(e) {
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

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var price =  msg['MDEntryPx']/1e8;
    var qty = msg['MDEntrySize']/1e8;
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

  /**
   * @desc Withdraw Button
   */
  var MSG_BTN_WITHDRAW = goog.getMsg('Withdraw');

  /**
   * @desc Bitcoin Withdraw accordion title
   */
  var MSG_LABEL_BITCOIN_WITHDRAWAL = goog.getMsg('Bitcoin withdrawal');

  var withdraw_btc = new bitex.ui.Withdraw( { parent_id:'withdraw_accordion',
                                              button_label:MSG_BTN_WITHDRAW,
                                              title: MSG_LABEL_BITCOIN_WITHDRAWAL,
                                              description: 'Fill up the form.',
                                              controls: [ ['amount', 'Amount', 'eg. 0.44550000', '฿'],
                                                ['wallet', 'Wallet', 'eg. 1933phfhK3ZgFQNLGSDXvqCn32k2buXY8a'] ]  });

  /**
   * @desc Brazilian bank Withdraw accordion title
   */
  var MSG_LABEL_BRAZILIAN_BANK_WITHDRAWAL = goog.getMsg('Brazilian Bank Withdrawal');

  var withdraw_brl_bank_transfer =
      new bitex.ui.Withdraw({ parent_id:'withdraw_accordion',
                              button_label:MSG_BTN_WITHDRAW,
                              title: MSG_LABEL_BRAZILIAN_BANK_WITHDRAWAL,
                              description: 'R$ 10,00 fee for DOC and TED.',
                              controls: [ ['amount', 'Amount'         , 'eg. 2300', 'R$'],
                                ['bank_number',     'Bank number'     , 'eg. 341'],
                                ['bank_name',       'Bank name'       , 'eg. Banco Itáu'],
                                ['account_branch',  'Account Branch'  , 'eg. 5555'],
                                ['account_name',    'Account name '   , 'eg. José da Silva'],
                                ['account_number',  'Account number'  , 'ex. 888888'],
                                ['CPFCNPJ',         'CPF or CNPJ'     , 'ex. 567.890.123-45']
                              ]});

  withdraws_component.addChild(withdraw_btc, true);
  withdraws_component.addChild(withdraw_brl_bank_transfer, true);


  withdraw_btc.addEventListener( bitex.ui.Withdraw.EventType.WITHDRAW, function(e){
    var amount = e.target.getModel().data['amount'];
    amount = amount.replace(',','.');
    if (amount.lastIndexOf('.') != amount.indexOf('.') ) {
      alert('Invalid value.');
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
      alert('Invalid value.');
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


  model.addEventListener( bitex.model.Model.EventType.SET + 'best_offer_brl', function(e) {
    var formatted_best_offer = e.data;
    buy_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_offer) );
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'best_bid_brl', function(e) {
    var formatted_best_bid = e.data;
    sell_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_bid) );
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

  bitEx.addEventListener( bitex.api.BitEx.EventType.LOGIN_OK,  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-not-logged' );

    model.set('UserID',           msg['UserID'] );
    model.set('Username',         msg['Username']);
    model.set('TwoFactorEnabled', msg['TwoFactorEnabled']);
    model.set('IsBroker',         msg['IsBroker'] );
    model.set('Broker',           msg['Broker']);

    buy_order_entry.setBrokerMode(model.get('IsBroker')  );
    sell_order_entry.setBrokerMode(model.get('IsBroker')  );


    if (! msg['IsBroker'] ) {
      goog.dom.classes.add( document.body, 'bitex-non-broker'  );
      buy_order_entry.setClientID(model.get('UserID'));
      sell_order_entry.setClientID(model.get('UserID'));
    } else {
      goog.dom.classes.add( document.body, 'bitex-broker'  );
    }

    bitEx.requestBalances();

    // Request Boleto Options
    bitEx.requestBoletoOptions();

    // set view to Trading
    router.setView('offerbook');
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.EXECUTION_REPORT, function(e){
    var msg = e.data;
    switch( msg['ExecType'] ) {
      case '1':  //Partial Execution
        $.sticky('Order ' + msg['OrderID'] +  ' partially filled');
        break;
      case '2':  //Execution
        $.sticky('Order ' + msg['OrderID'] +  ' filled');
        break;
      case '4':  //Offer Cancelled
        $.sticky('Order ' + msg['OrderID'] +  ' cancelled');
        break;
    }
  });

  var withdrawConfirmationDialog;
  var withdrawResponseFunction = function(e){
    var msg = e.data;

    if (goog.isDefAndNotNull(withdrawConfirmationDialog)) {
      withdrawConfirmationDialog.dispose();
    }
    /*
    var dlg_content =
        '<p>Para a sua segurança, nós enviamos um <strong>código de confirmação</strong> para o seu email. </p> ' +
            '<input id="id_withdraw_confirmation" placeholder="Código de confirmação" class="input-block-level">' +
            '<p><i>A operação só será efeutada mediante ao código de confirmação que fora enviada para o seu email.</i></p>';

    */

    var dlg_content =
        '<p>We just sent a <strong>confirmation code</strong> to your email. </p> ' +
            '<input id="id_withdraw_confirmation" placeholder="Código de confirmação" class="input-block-level">' +
            '<p><i>This is security measure to improve your account security</i></p>';

    withdrawConfirmationDialog = new bootstrap.Dialog();
    withdrawConfirmationDialog.setTitle('Confirm the withdraw request');
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
    dlg.setTitle('Success');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('signin');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR,  function(e) {
    var msg = e.data;
    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Error chaning password');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

  });

  var secondFactorDialog;
  bitEx.addEventListener(bitex.api.BitEx.EventType.LOGIN_ERROR,  function(e) {
    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    var msg = e.data;

    model.set('UserID', '');
    model.set('Username', '');

    if (msg['NeedSecondFactor']) {
      if (goog.isDefAndNotNull(secondFactorDialog)) {
        secondFactorDialog.dispose();
      }

      secondFactorDialog = new bootstrap.Dialog();
      secondFactorDialog.setTitle('Autenticação em 2 passos');
      secondFactorDialog.setContent('Google Authenticator code: <input id="id_second_factor" placeholder="eg. 555555" size="10">');
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
      error_dialog.setTitle('Error');
      error_dialog.setContent(msg['UserStatusText']);
      error_dialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
      error_dialog.setVisible(true);
    }
  });


  bitEx.addEventListener( bitex.api.BitEx.EventType.TRADE,  function(e) {
    var msg = e.data;
    //var formated_price =  format_currency(msg['MDEntryPx']/1e8) , msg['Symbol'].substr(3) );
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BALANCE_RESPONSE,  function(e) {
    var msg = e.data;
    delete msg['MsgType'];
    delete msg['BalanceReqID'];

    goog.object.forEach(msg, function( balances, broker ) {
      goog.object.forEach(balances, function( balance, currency ) {
        balance = balance / 1e8;

        var balance_key = 'balance_' +  currency.toLowerCase();
        model.set( balance_key , balance );

        model.set('formatted_' + balance_key, format_currency(balance, currency));
      });
    });
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
    var state = goog.dom.forms.getValue( goog.dom.getElement("id_signup_state") );
    var country_code = goog.dom.forms.getValue( goog.dom.getElement("id_signup_country") );
    var broker = goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker")));


    if (goog.string.isEmpty(username) || !goog.string.isAlphaNumeric(username) ) {
      alert('Invalid username');
      return;
    }

    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      alert('Invalid email');
      return;
    }

    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Senha deve ter no mínimo 6 letras');
      return;
    }

    if ( password !== password2 ) {
      alert('Passwords does not match');
      return;
    }


    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }
      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.signUp(username, password, email, state, country_code,  broker);
      });

    } else {
      bitEx.close();
    }
  });


  var login = function(username, password, opt_second_factor ) {
    username      = goog.string.trim(username);
    var second_factor = goog.string.trim(opt_second_factor || '');

    if (goog.string.isEmpty(username) ) {
      alert('Invalid username');
      return;
    }
    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Password must have at least 6 characters');
      return;
    }

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
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
      if (goog.string.isEmpty(second_factor) ) {
        bitEx.login(username, password);
      } else {
        bitEx.login(username, password, second_factor);
      }
    }
  };


  bitEx.addEventListener( bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, function(e){
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

  model.addEventListener( bitex.model.Model.EventType.SET + 'Broker', function(e) {
    var broker = e.data;

    var allowed_markets = {};
    goog.array.forEach( broker['Currencies'].split(',') , function(currency) {
     var market = goog.object.findKey( all_markets, function(market_info, symbol) {
       if (symbol.indexOf(currency) >= 0)  {
         return true;
       }
     });
     if (goog.isDefAndNotNull(market)) {
       allowed_markets[market] = all_markets[market];
     }
    });
    model.set('AllowedMarkets',allowed_markets);

    var allowed_markets_array = goog.object.getKeys(allowed_markets);
    if (allowed_markets_array.length === 1 ) {
      goog.dom.forms.setValue(goog.dom.getElement('id_instrument_1'), allowed_markets_array[0] );
      switchSymbol(allowed_markets_array[0]);
    }

  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'BtcAddress', function(e) {
    var btc_address = e.data;
    var qr_code = 'https://chart.googleapis.com/chart?chs=100x100&chld=M%7C0&cht=qr&chl=' + btc_address;

    btc_adrress_el = goog.dom.getElement('id_bitcoin_address_img');
    btc_adrress_el.setAttribute('src', qr_code);
  });


  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorSecret', function(e){
    var secret = e.data;
    var has_secret = goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    goog.style.showElement( divEl , has_secret);
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorEnabled', function(e){
    var enabled = e.data;

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
        alert('Error connecting to the server...');
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
      alert('Invalid confirmation code');
      return;
    }

    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Password must have at least 6 characters');
      return;
    }

    if ( password !== password2 ) {
      alert('Passwords does not match');
      return;
    }

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }
      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.resetPassword(token, password);
      });

    } else {
      bitEx.resetPassword(token, password);
    }

  });

  var boleto_buttons = goog.dom.getElementsByClass('boleto-options-group');
  goog.array.forEach( boleto_buttons, function( boleto_button ) {
    goog.events.listen( boleto_button, 'click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var element = e.target;

      var value = goog.dom.forms.getValue( goog.dom.getElement("id_boleto_value") );
      var boleto_id = element.getAttribute('data-boleto-id');

      if (goog.isDefAndNotNull(boleto_id)) {
        if (goog.string.isEmpty(value) || !goog.string.isNumeric(value) || parseInt(value,10) <= 0 ) {
          alert('Por favor, preencha o valor do boleto a ser gerado');
          return;
        }

        bitEx.generateBoleto(boleto_id,value);
      }
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BOLETO_OPTIONS_RESPONSE, function(e) {
    var msg = e.data;

    //boleto-options-group
    var boleto_options_group_elements = goog.dom.getElementsByClass('boleto-options-group');
    goog.array.forEach( boleto_options_group_elements, function( boleto_options_group_element ) {
      goog.dom.removeChildren(boleto_options_group_element);
      goog.array.forEach( msg['BoletoOptionGrp'], function(boleto_option) {
        var boleto_id = boleto_option['BoletoId'];
        var description = boleto_option['Description'];

        var boleto_btn_attributes = {
          "data-boleto-id": boleto_id,
          "class" : "btn btn-primary btn-boleto"
        };
        var buttonElement = goog.dom.createDom( goog.dom.TagName.BUTTON, boleto_btn_attributes, description  );

        goog.dom.appendChild(boleto_options_group_element, buttonElement);
      });

    });

  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.GENERATE_BOLETO_RESPONSE, function(e) {
    var msg = e.data;

    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Boleto');
    dlg.setContent('<a  target="_blank" href="/print_boleto?boleto_id=' +  msg['BoletoId']
                       + '" class="btn btn-primary">Print</a> or <a href="/print_boleto?download=1&boleto_id='
                       +  msg['BoletoId'] + '">Download</a>');

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


};

goog.exportSymbol('bitex.app.satoshi_square', bitex.app.satoshi_square );
