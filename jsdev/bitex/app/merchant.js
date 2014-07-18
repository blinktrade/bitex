goog.provide('bitex.app.MerchantApp');

goog.require('bitex.model.Model');

goog.require('goog.ui.Component');

goog.require('goog.structs.Map');
goog.require('goog.structs.Set');

goog.require('bitex.util');
goog.require('bitex.api.BitEx');
goog.require('goog.soy');

goog.require('goog.fx');
goog.require('goog.fx.dom');

goog.require('goog.events.InputHandler');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.object');

goog.require('bootstrap.Alert');
goog.require('uniform.Uniform');
goog.require('uniform.Meta');               // Switch according to the test($MODULE_NAME$)
goog.require('uniform.Validators');         // Switch according to the test($MODULE_NAME$)

goog.require('bitex.ui.ListView');

/**
 * @param {string=} opt_default_country
 * @param {number=} opt_default_broker_id
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.MerchantApp = function(opt_default_country, opt_default_broker_id) {
  goog.events.EventTarget.call(this);

  this.model_ = new bitex.model.Model(document.body);
  this.conn_ = new bitex.api.BitEx();

  if (goog.isDefAndNotNull(opt_default_country)) {
    this.model_.set('DefaultCountry', opt_default_country);
  }

  if (goog.isDefAndNotNull(opt_default_broker_id)) {
    this.model_.set('DefaultBrokerID', opt_default_broker_id);
  }

  this.currency_info_       = {};
  this.all_markets_         = {};
};
goog.inherits(bitex.app.MerchantApp, goog.events.EventTarget);
goog.addSingletonGetter(bitex.app.MerchantApp);


/**
 *  @type {bitex.api.Bitex}
 *  @private
 */
bitex.app.MerchantApp.prototype.conn_;

/**
 * @type {bitex.model.Model}
 * @private
 */
bitex.app.MerchantApp.prototype.model_;

/**
 * @type {string}
 * @private
 */
bitex.app.MerchantApp.prototype.url_;

/**
 * @type {Object}
 * @private
 */
bitex.app.MerchantApp.prototype.currency_info_;

/**
 * @type {Array}
 * @private
 */
bitex.app.MerchantApp.prototype.all_markets_;


/**
 * @type {bitex.ui.ListView}
 * @private
 */
bitex.app.MerchantApp.prototype.transactions_list_view_;

/**
 * @type {number}
 * @private
 */
bitex.app.MerchantApp.prototype.ledger_request_id_;

/**
 * Event handler.
 * TODO(user): rename it to handler_ after all component subclasses in
 * inside Google have been cleaned up.
 * Code search: http://go/component_code_search
 * @type {goog.events.EventHandler}
 * @private
 */
bitex.app.MerchantApp.prototype.handler_;


/**
 * @param {string=} opt_url
 */
bitex.app.MerchantApp.prototype.run = function(opt_url){
  var url = 'wss://' + window.location.hostname + '/trade/';
  if(goog.isDefAndNotNull(opt_url)){
    url = opt_url;
  }
  this.url_ = url;

  var handler = this.getHandler();
  var model = this.getModel();

  /*
    Loading combobox
  */
  var signup_country_el = goog.dom.getElement('id_signup_country');
  var signup_state_el   = goog.dom.getElement('id_signup_state');
  var broker_el         = goog.dom.getElement('id_signup_broker');
  var id_display_main  = goog.dom.getElement('id_display_main');
  var withdraw_selector_el = goog.dom.getElement('withdraw-method-selector');


  var countries = bitex.util.getCountries();
  goog.object.forEach( countries, function(country_info, country_code ) {
    var country = country_info;

    if (goog.isArrayLike(country)) {
      country = country[0];
    }

    var el = goog.dom.createDom('option', {'value': country_code }, country);
    goog.dom.appendChild( signup_country_el, el );

  },this);


  handler.listen(signup_country_el, goog.events.EventType.CHANGE, this.onChangeCountry_  );
  handler.listen(signup_state_el, goog.events.EventType.CHANGE, this.onChangeState_);
  handler.listen(broker_el, goog.events.EventType.CHANGE, this.onChangeBroker_);

  handler.listen(id_display_main, goog.events.EventType.CLICK, this.onClick_);

  handler.listen(withdraw_selector_el, goog.events.EventType.CHANGE, this.onChangeWithDrawMethod_  );

  handler.listen( model, bitex.model.Model.EventType.SET + "BrokerList", this.onBrokerList_ );



  handler.listen( this.conn_, bitex.api.BitEx.EventType.OPENED, this.onConnectionOpen_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.CLOSED, this.onConnectionClose_ );
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR, this.onConnectionError_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR_MESSAGE, this.onConnectionErrorMessage_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.RAW_MESSAGE, goog.bind(  this.onBitexRawMessageLogger_, this, 'rx: ' ) );
  handler.listen( this.conn_, bitex.api.BitEx.EventType.SENT_RAW_MESSAGE, goog.bind(  this.onBitexRawMessageLogger_, this, 'tx: ' )  );
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.HEARTBEAT, this.onHearBeat_);

  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, this.onBrokerListResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.SECURITY_LIST, this.onSecurityList_);


  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_OK, this.onUserLoginOk_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_ERROR, this.onUserLoginError_);


  handler.listen( goog.dom.getElement('id_login_btn_login'), goog.events.EventType.CLICK, this.onUserLogin_ );
  handler.listen( goog.dom.getElement('id_signup_confirm'), goog.events.EventType.CLICK, this.onUserSignupButtonClick_ );

  handler.listen( goog.dom.getElement('id_enter_btn_receive'), goog.events.EventType.CLICK, this.onEnterReceiveClick_ );

  var button_signup = new goog.ui.Button();
  button_signup.decorate(goog.dom.getElement('id_signup_confirm'));
  handler.listen(goog.dom.getElement('id_signup_terms'),goog.events.EventType.CLICK,function(e) {
    button_signup.setEnabled(e.target.checked);
  });
  button_signup.setEnabled(false);

  if (goog.isDefAndNotNull(model.get('DefaultCountry'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), model.get('DefaultCountry') );
    this.onSelectCountry_(model.get('DefaultCountry'));
  }

  try{
    this.conn_.open(this.url_);
  } catch( e ) {
    // TODO: Show a popup error to the user.
    console.log(e);
  }
};

/**
 * @param {string} type
 * @param {string} title
 * @param {string} content
 * @param {number} opt_display_time.  Defaults to 3000 milliseconds
 */
bitex.app.MerchantApp.prototype.showNotification = function(type , title, content,  opt_display_time) {
  var display_time = 3000;
  if ( goog.isNumber(opt_display_time) ) {
    display_time = opt_display_time;
  }

  var alert_content = goog.dom.createDom( 'span', undefined,
                                          [goog.dom.createDom( 'strong', undefined, title), ' ', content ] );

  var notification = new bootstrap.Alert(type, alert_content, true );

  notification.render( goog.dom.getElement('id_notifications') );

  if (display_time > 0) {
    var handler = this.getHandler();

    goog.Timer.callOnce(function(e){
      var anim = new goog.fx.dom.FadeOutAndHide(notification.getElement(), 200);
      handler.listenOnce(anim, goog.fx.Transition.EventType.END, function(e) {
        notification.dispose();
        anim.dispose();
      });
      anim.play();
    }, display_time, this);
  }
};


/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onConnectionOpen_ = function(e){
  if (! goog.isDefAndNotNull(this.model_.get('SecurityList') )) {
    this.conn_.requestSecurityList();
  }

  if (! goog.isDefAndNotNull(this.model_.get('BrokerList') )) {
    this.conn_.requestBrokerList();
  }

  var handler = this.getHandler();
  this.timer_ = new goog.Timer(300000);
  handler.listen( this.timer_, goog.Timer.TICK, this.onTimerHeartBeat_ );
  this.timer_.start();
  this.conn_.sendHearBeat();

  console.log("#LOGIN");

  jQuery.mobile.changePage('#login')

};

bitex.app.MerchantApp.prototype.onConnectionClose_ = function(e){
  jQuery.mobile.changePage('#preLoad')
};
bitex.app.MerchantApp.prototype.onConnectionError_ = function(e){
  jQuery.mobile.changePage('#preLoad')
};
bitex.app.MerchantApp.prototype.onConnectionErrorMessage_ = function(e) {
  // TODO: Show a popup to the user with the error message.
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onTimerHeartBeat_ = function(e){
  this.conn_.sendHearBeat();
};


bitex.app.MerchantApp.prototype.onHearBeat_ = function(e) {

  var msg = e.data;

  var sent = new Date(msg['SendTime']);
  var just_now = new Date(Date.now());

  this.getModel().set('latency', just_now - sent );
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onBrokerListResponse_ =  function(e){
  var msg = e.data;

  var broker_list = [];
  goog.array.forEach(msg['BrokerListGrp'], function( broker_array )  {
    var broker_info = {};
    goog.array.forEach(msg['Columns'], function( column, index )  {
      broker_info[column] = broker_array[index];
    }, this);

    /**
     * @desc label for broker selection on signup form
     */
    var MSG_MERCHANT_NOTIFY_ME_WHEN_A_NEW_BROKER_ARRIVE = goog.getMsg('Notify me when a new broker arrive in my region');

    var skip = false;
    switch(broker_info['SignupLabel']) {
      case '{MSG_BROKER_APPLY}':
        skip = true;
        break;

      case '{MSG_NOTIFY_NEW_BROKER}':
        broker_info['SignupLabel'] = MSG_MERCHANT_NOTIFY_ME_WHEN_A_NEW_BROKER_ARRIVE;
        break;
    }

    if (!skip) {
      broker_info = this.adjustBrokerData_(broker_info);
      broker_list.push(broker_info);
    }
  }, this );


  this.model_.set('BrokerList', broker_list);
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onSecurityList_ =   function(e) {
  var msg = e.data;

  goog.array.forEach(msg['Currencies'], function( currency) {
    this.currency_info_[ currency['Code'] ] = {
      code: currency['Code'],
      format: currency['FormatJS'],
      human_format: currency['HumanFormatJS'],
      description : currency['Description'],
      sign : currency['Sign'],
      pip : currency['Pip'],
      is_crypto : currency['IsCrypto']
    };

  }, this);

  var symbols = [];
  goog.array.forEach(msg['Instruments'], function( instrument) {
    var symbol = instrument['Symbol'];

    this.all_markets_[symbol]  = {
      'symbol': symbol,
      'description': instrument['Description']
    };

    symbols.push( symbol );

    var currency_key = instrument['Symbol'];
    var last_price = 'last_price_' +  currency_key;

    this.model_.set('formatted_' + last_price, this.formatCurrency(0, instrument['Currency'], true), true);

  }, this );

  this.model_.set('SecurityList', msg);
};

/**
 * @param {Object} broker_info
 * @return {Object}
 * @private
 */
bitex.app.MerchantApp.prototype.adjustBrokerData_ = function(broker_info) {
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
  var withdraw_structure = broker_info['WithdrawStructure'];
  goog.object.forEach(withdraw_structure,  function(withdraw_methods) {
    goog.array.forEach( withdraw_methods, function(method) {
      method['percent_fee'] = fmt.format(method['percent_fee']/100.0);
      method['fixed_fee'] = fmt.format(method['fixed_fee']/1e8);
    });
  });

  broker_info['Currencies'] = broker_info['Currencies'].split(',');
  if (broker_info['Currencies'].length === 1 && goog.string.isEmpty(broker_info['Currencies'][0])) {
    broker_info['Currencies'] = [];
  }

  var allowed_markets = {};
  var broker_currencies = goog.array.clone(broker_info['Currencies']);
  goog.array.forEach( broker_info['CryptoCurrencies'], function(crypto_currency){
    broker_currencies.push(crypto_currency['CurrencyCode']);

    var market_crypto_currency = goog.object.findKey( this.all_markets_, function(market_info, symbol) {
      if (symbol.indexOf(crypto_currency['CurrencyCode']) >= 0)  {
        return true;
      }
    });

    if (goog.isDefAndNotNull(market_crypto_currency)) {
      goog.array.forEach( broker_info['Currencies'], function(currency) {
        var market_currency = goog.object.findKey( this.all_markets_, function(market_info, symbol) {
          if (symbol.indexOf(currency) >= 0)  {
            return true;
          }
        });

        if (goog.isDefAndNotNull(market_currency)) {
          allowed_markets[market_currency] = this.all_markets_[market_currency];
        }
      },this);
    }
  },this);
  broker_info['BrokerCurrencies'] = broker_currencies;
  broker_info['AllowedMarkets'] = allowed_markets;

  return broker_info;
};

bitex.app.MerchantApp.prototype.isCryptoCurrency  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.is_crypto;
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onUserLoginOk_ = function(e) {

  var msg = e.data;
  this.getModel().set('UserID',           msg['UserID'] );
  this.getModel().set('Username',         msg['Username']);
  this.getModel().set('TwoFactorEnabled', msg['TwoFactorEnabled']);
  this.getModel().set('IsBroker',         msg['IsBroker'] );
  this.getModel().set('IsVerified',       msg['Profile']['Verified'] > 1);

  var broker_currencies = new goog.structs.Set();
  var allowed_markets = {};
  var user_brokers = {};
  var broker_info;
  if (goog.isDefAndNotNull(msg['Broker'])) {
    broker_info = this.adjustBrokerData_(msg['Broker']);
    goog.object.extend(allowed_markets,  broker_info['AllowedMarkets']);
    broker_currencies.addAll(broker_info['BrokerCurrencies']);

    this.getModel().set('Broker', broker_info);


    user_brokers[ broker_info['BrokerID'] ] = broker_info;
    if (!msg['IsBroker'] ) {
      this.getModel().set('UserBrokers', user_brokers);
    }
  }

  var profile = msg['Profile'];
  if (msg['IsBroker'] ) {
    profile = this.adjustBrokerData_(profile);

    user_brokers[ profile['BrokerID'] ] = profile;
    this.getModel().set('UserBrokers', user_brokers);

    goog.object.extend(allowed_markets,  profile['AllowedMarkets']);
    broker_currencies.addAll(profile['BrokerCurrencies']);
  }
  this.getModel().set('Profile',  profile);
  if (msg['IsBroker'] ) {
    this.getModel().set('SelectedBrokerID', this.getModel().get('Profile')['BrokerID']);
  } else if (goog.isDefAndNotNull(msg['Broker'])) {
    this.getModel().set('SelectedBrokerID', this.getModel().get('Broker')['BrokerID']);

    list_currencies = [];
    goog.object.forEach(this.getModel().get('Broker')['WithdrawStructure'],  function(withdraw_methods, currency) {
        if (!this.isCryptoCurrency(currency)) {
            list_currencies.push(withdraw_methods)
        }
    }, this);

    withdraw_selector = goog.dom.getElement('withdraw-method-selector');
    goog.dom.removeChildren(withdraw_selector);

    if (list_currencies.length > 1) {
        // TODO: exibir ou esconder select
    } else {
        goog.array.forEach(list_currencies[0],  function(method) {
            goog.dom.appendChild(withdraw_selector, goog.dom.createDom('option', { 'value' : method.method },method.description));
        });
        goog.events.dispatchEvent(withdraw_selector, goog.events.EventType.CHANGE);
    }

  }

  this.getModel().set('AllowedMarkets', allowed_markets);
  this.getModel().set('BrokerCurrencies', broker_currencies.getValues());


  this.conn_.requestBalances();

  // Request Deposit Options
  this.conn_.requestDepositMethods();

  if (this.getModel().get('IsVerified')) {
    jQuery.mobile.changePage('#menu')
  } else {
    if (this.getModel().get('Profile')['Verified']==0) {
      jQuery.mobile.changePage('#waitingVerification');
    } else {
      jQuery.mobile.changePage('#menu')
    }
  }

  if (goog.isDefAndNotNull(this.transactions_list_view_)){
    this.transactions_list_view_.dispose();
    this.transactions_list_view_ = null;
  }

  this.ledger_request_id_ = parseInt( 1e7 * Math.random() , 10 );
  var handler = this.getHandler();
  this.transactions_list_view_ = new bitex.ui.ListView( {
    'rowFormatterFn': goog.bind(this.formatTransactionRecord_, this),
    'rowClassFn': function(rec) { return 'ui-li-has-count' }
  });

  handler.listen( this.transactions_list_view_ , bitex.ui.ListView.EventType.REQUEST_DATA, this.onTransactionsListViewRequestData_);
  handler.listen(this.conn_,
                 bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE + '.' + this.ledger_request_id_,
                 this.onLedgerListResponse_);

  this.transactions_list_view_.render( goog.dom.getElement('id_transactions_container') );
};

/**
 * @param {Object} record
 * @return {string|Element}
 */
bitex.app.MerchantApp.prototype.formatTransactionRecord_ = function(record) {
  var row_attributes = {
    'class': 'ui-btn ',
    'href' : '#'
  };

  var value_element;
  if (record['Operation'] == 'D') {
    value_element = goog.dom.createDom('span',
                                       ['ui-li-count', 'ui-body-b' ],
                                       this.formatCurrency(record['Amount']/1e8, record['Currency'], true) );
  } else {
    value_element = goog.dom.createDom('span',
                                       ['ui-li-count', 'ui-body-a' ],
                                       this.formatCurrency(record['Amount']/1e8, record['Currency'], true) );
  }
  return  goog.dom.createDom('a', row_attributes, record['Created'], value_element  );
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onTransactionsListViewRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var userID = this.getModel().get('UserID');
  var brokerID = this.getModel().get('Broker')['BrokerID'];
  var currency = 'USD';

  this.conn_.requestLedgerList(this.ledger_request_id_, page, limit, brokerID, userID, currency);
};

/**
 *
 * @param {goog.events.Event} e
 */
bitex.app.MerchantApp.prototype.onLedgerListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.transactions_list_view_) ) {
    return
  }
  var msg = e.data;
  this.transactions_list_view_.setResultSet( msg['LedgerListGrp'], msg['Columns'] );
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onUserLoginError_ = function(e) {
  var msg = e.data;

  this.model_.set('UserID', '');
  this.model_.set('Username', '');

  if (msg['NeedSecondFactor']) {
    jQuery.mobile.changePage('#secondStep');

    // TODO: get the second step from the user and send it to the serve.

  } else {
    jQuery.mobile.changePage('#wrongLogin');
  }
};


/**
 * logger
 * @param {string} action
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.MerchantApp.prototype.onBitexRawMessageLogger_ = function(action, e) {
  var raw_msg = e.data;
  try {
    console.log(action + ':' + raw_msg);
  } catch(e) {}
};


/**
 * @return {goog.events.EventHandler}
 */
bitex.app.MerchantApp.prototype.getHandler = function() {
  return this.handler_ ||
      (this.handler_ = new goog.events.EventHandler(this));
};


/**
 * return {bitex.model.Model}
 */
bitex.app.MerchantApp.prototype.getModel = function() {
  return this.model_;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onUserLogin_ = function(e) {
  e.preventDefault();
  e.stopPropagation();

  var form_element =  goog.dom.getElement('id_form_login');

  var uf = new uniform.Uniform();
  uf.decorate(  form_element ) ;
  var error_list = uf.validate();
  if (error_list.length > 0) {
    goog.array.forEach(error_list, function (error_msg) {

      /**
       * @desc Error notification title
       */
      var MSG_MERCHANTAPP_VALIDATION_ERROR_NOTIFICATION_TITLE = goog.getMsg('Error');

      this.showNotification('danger', MSG_MERCHANTAPP_VALIDATION_ERROR_NOTIFICATION_TITLE, error_msg);
    }, this);
    e.stopPropagation();
    e.preventDefault();

    return;
  }

  var username = goog.dom.forms.getValue( goog.dom.getElement('id_login_username') );
  var password = goog.dom.forms.getValue( goog.dom.getElement('id_login_password') );

  this.model_.set('Password',  password);
  this.conn_.login(username, password);
};

/**
 *
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onEnterReceiveClick_ = function(e){

  e.preventDefault();
  e.stopPropagation();

  var value_display = goog.dom.forms.getValue( goog.dom.getElement('id_display_receive'));

   if (goog.string.isEmpty(value_display) || value_display == "0") {
     /**
     * @desc Put a value on merchant app balance-repor form
     */
    var MSG_MERCHANTAPP_DISPLAY_PUT_A_VALUE= goog.getMsg('Put a Value');

    this.showNotification('danger', '', MSG_MERCHANTAPP_DISPLAY_PUT_A_VALUE );

    return;
  }

  /**
   * Load infos about Balance Report
   */

  //this.formatCurrency(value_display, instrument['Currency'], true)
  goog.dom.setTextContent( goog.dom.getElement('id_balance_report_purchase_amount'), value_display );

  var price_amount_fee;
  price_amount_fee = bitex.util.calculatePriceAmountAndFee(value_display,
                                                            bitex.util.PriceAmountCalculatorVerb.GET,
                                                            this.order_depth_,
                                                            this.getModel().username,
                                                            this.getModel().fee  );

  console.log(price_amount_fee);

  jQuery.mobile.changePage('#id_balance-report');

};

/**
 * @type {.Array<.Array<Object>>}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.order_depth_;


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onUserSignupButtonClick_ = function(e) {

  e.preventDefault();
  e.stopPropagation();

  var username  = goog.dom.forms.getValue( goog.dom.getElement('id_signup_username') );
  var password  = goog.dom.forms.getValue( goog.dom.getElement('id_signup_password') );
  var password_2= goog.dom.forms.getValue( goog.dom.getElement('id_signup_password_2') );
  var email     = goog.dom.forms.getValue( goog.dom.getElement('id_signup_email') );
  var country   = goog.dom.forms.getValue( goog.dom.getElement('id_signup_country') );
  var state     = goog.dom.forms.getValue( goog.dom.getElement('id_signup_state') );
  var broker    = goog.dom.forms.getValue( goog.dom.getElement('id_signup_broker') );


  var form_element =  goog.dom.getElement('id_form_signup');

  var uf = new uniform.Uniform();
  uf.decorate(  form_element ) ;
  var error_list = uf.validate();
  if (error_list.length > 0) {
    goog.array.forEach(error_list, function (error_msg) {
      this.showNotification('danger', '', error_msg);
    }, this);

    return;
  }

  if (password !== password_2) {
    /**
     * @desc Passwords doesn' match on merchant app signup form
     */
    var MSG_MERCHANTAPP_SIGNUP_PWD_DOESNT_MATCH = goog.getMsg('Passwords does not match');

    this.showNotification('danger', '', MSG_MERCHANTAPP_SIGNUP_PWD_DOESNT_MATCH );

    return;
  }


  this.model_.set('Password', password);


  this.conn_.signUp( username,
                     password,
                     email,
                     state,
                     country,
                     goog.string.toNumber(broker));

};


bitex.app.MerchantApp.prototype.onBrokerList_ = function(e) {
  //
  // auto select the country/state in case there is only one broker
  //

  console.log("\n onBrokerList_ \n");

  var model = this.getModel();

  var broker_list = model.get("BrokerList");
  if (!goog.isDefAndNotNull(broker_list)) {
    return;
  }

  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));


  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    var broker_info = goog.array.find(broker_list, function(broker_info) {
      if (broker_info['BrokerID'] === model.get('DefaultBrokerID')) {
        return true;
      }
    });
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }

  goog.object.forEach(this.getBrokersByCountry(''), function(broker_info) {
    if (model.get('DefaultBrokerID') != broker_info['BrokerID']) {
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'),  '' + model.get('DefaultBrokerID') );
    this.onChangeBroker_();
  }


  var last_country_code = "";
  var number_of_countries = 0;
  var brokers_by_country = {};

  goog.array.forEach(broker_list, function( broker_info )  {
    if (!broker_info['IsBrokerHub']) {
      if (broker_info['CountryCode'] in brokers_by_country) {
        brokers_by_country[broker_info['CountryCode'] ].push(broker_info);
      } else {
        brokers_by_country[broker_info['CountryCode'] ] = [broker_info];

        if (broker_info['CountryCode'].length > 0) {
          last_country_code = broker_info['CountryCode'];
          ++number_of_countries ;
        }
      }
    }
  }, this );


  if (goog.isDefAndNotNull(model.get('DefaultCountry'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), model.get('DefaultCountry') );
    this.onSelectCountry_(model.get('DefaultCountry'));
  } else if (number_of_countries === 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), last_country_code );
    this.onSelectCountry_(last_country_code);
  } else {
    this.onChangeBroker_();
  }


};

bitex.app.MerchantApp.prototype.onSelectCountry_ = function(selected_country) {

  var signup_state_el = goog.dom.getElement('id_signup_state');
  var model = this.getModel();
  var countries = bitex.util.getCountries();

  goog.dom.removeChildren(signup_state_el);
  var country_info = countries[selected_country];
  goog.style.showElement( goog.dom.getElement('id_signup_state'), goog.isArrayLike(country_info) );

  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));

  if ( goog.isArrayLike(country_info)) {
    var states_code_array = country_info[1].split('|');
    var states_name_array = country_info[2].split('|');

    var number_of_states_with_brokers = 0;
    var last_state_with_broker = '';
    goog.array.forEach(states_code_array, function(state_code, index) {
      var state_name = states_name_array[index];
      var el = goog.dom.createDom('option', {'value': state_code }, state_name);
      goog.dom.appendChild( goog.dom.getElement('id_signup_state'), el );

      var stateIndex = goog.array.findIndex( this.getBrokersByCountry(selected_country), function(broker_info){
        if (broker_info['IsBrokerHub']) {
          return false;
        }
        if (broker_info['State'] === state_code ) {
          return true;
        }
      });
      if (stateIndex >= 0){
        ++number_of_states_with_brokers;
        last_state_with_broker = state_code;
      }

    }, this);

    if (number_of_states_with_brokers==1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), last_state_with_broker );
      this.onSelectState_(selected_country, last_state_with_broker);
      return;
    }
  }


  var number_of_available_brokers = 0;
  var number_of_brokers_in_same_country = 0;
  var last_available_broker = "";

  goog.object.forEach(this.getBrokersByCountry(selected_country), function(broker_info) {
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );

    if (!broker_info['IsBrokerHub']) {
      ++number_of_available_brokers;

      if (broker_info['CountryCode'] === selected_country ) {
        ++number_of_brokers_in_same_country;
        last_available_broker = broker_info['BrokerID'];
      }
    }
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + model.get('DefaultBrokerID') );
  } else if (number_of_brokers_in_same_country == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  }
  this.onChangeBroker_();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onChangeWithDrawMethod_ = function(e){
    console.log('changed=>', e.target);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onChangeCountry_ = function(e){
  var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
  this.onSelectCountry_(selected_country);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onChangeState_ = function(e){
  var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
  var selected_state = goog.dom.forms.getValue(goog.dom.getElement('id_signup_state') ) ;
  this.onSelectState_(selected_country, selected_state);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onClick_ = function(e){

  //  console.log(e);
  //  console.log(e.target.getAttribute("data-display-value"));

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onChangeBroker_ = function(e){
  var model = this.getModel();
  var selected_broker = goog.dom.forms.getValue(goog.dom.getElement('id_signup_broker') ) ;

  var broker_list = model.get('BrokerList');
  if (goog.isDefAndNotNull(broker_list)) {
    var broker = goog.array.find(broker_list, function(broker){
      if (broker['BrokerID'] == selected_broker) {
        return true;
      }
    });

    var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.PERCENT);
    fmt.setMaximumFractionDigits(2);
    fmt.setMinimumFractionDigits(2);

    broker['FormattedTransactionFeeBuy'] = fmt.format(broker['TransactionFeeBuy'] / 10000);
    broker['FormattedTransactionFeeSell'] = fmt.format(broker['TransactionFeeSell'] / 10000);

  }
};

/**
 * @param {string} selected_country
 * @param {string} selected_state
 * @private
 */
bitex.app.MerchantApp.prototype.onSelectState_ = function( selected_country, selected_state ) {
  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));
  var model = this.getModel();

  var number_of_available_brokers = 0;
  var number_of_brokers_in_same_country_state = 0;
  var last_available_broker = "";
  goog.array.forEach(this.getBrokersByCountry(selected_country, selected_state), function(broker_info){
    if (!broker_info['IsBrokerHub']) {
      ++number_of_available_brokers;

      if (broker_info['CountryCode'] === selected_country && broker_info['State'] === selected_state ) {
        ++number_of_brokers_in_same_country_state;
        last_available_broker = broker_info['BrokerID'];
      }
    }
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + model.get('DefaultBrokerID') );
  } if (number_of_brokers_in_same_country_state == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  }
  this.onChangeBroker_();
};


/**
 *
 * @param {string} country
 * @param {string=} opt_state
 * @return {Array.<Object>}
 */
bitex.app.MerchantApp.prototype.getBrokersByCountry = function(country, opt_state) {
  var response = [];

  var query = country;
  if (goog.isDefAndNotNull(opt_state)) {
    query += '_' + opt_state;
  }

  var brokers = this.getModel().get('BrokerList');
  if (goog.isDefAndNotNull(brokers)) {
    goog.array.forEach(brokers, function(broker){
      var broker_accept_array = broker['AcceptCustomersFrom'][0];
      var broker_reject_array = broker['AcceptCustomersFrom'][1];

      var is_explicit_accepted = goog.array.findIndex( broker_accept_array, function(accept_data){
        return (accept_data === query || accept_data === country);
      }) >= 0;

      var is_accepted = is_explicit_accepted ||  (broker_accept_array[0] === "*" );

      var is_explicit_rejected = goog.array.findIndex( broker_reject_array, function(accept_data){
        return (accept_data === query || accept_data === country);
      }) >= 0;

      var is_rejected = is_explicit_rejected ||  (broker_reject_array[0] === "*" );

      if (is_explicit_accepted) {
        response.push(broker);
      } else if (is_accepted && !is_rejected ) {
        response.push(broker);
      }
    });
  }


  return response;
};

// End
goog.exportSymbol('MerchantApp', bitex.app.MerchantApp);
goog.exportProperty(MerchantApp.prototype, 'run', bitex.app.MerchantApp.prototype.run);

