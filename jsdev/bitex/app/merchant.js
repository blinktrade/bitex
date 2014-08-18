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

goog.require('goog.style');

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

goog.require('goog.date.DateTime');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.i18n.DateTimeFormat');

goog.require('bitex.ui.ListView');
goog.require('bitex.ui.Merchant.templates');


/**
 * @param {string=} opt_default_country
 * @param {number=} opt_default_broker_id
 * @param {string=} opt_default_state
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.MerchantApp = function(opt_default_country, opt_default_broker_id, opt_default_state) {
  goog.events.EventTarget.call(this);

  this.model_ = new bitex.model.Model(document.body);
  this.conn_ = new bitex.api.BitEx();

  if (goog.isDefAndNotNull(opt_default_country)) {
    this.model_.set('DefaultCountry', opt_default_country);
  }

  if (goog.isDefAndNotNull(opt_default_broker_id)) {
    this.model_.set('DefaultBrokerID', opt_default_broker_id);
  }

  if (goog.isDefAndNotNull(opt_default_state)) {
    this.model_.set('DefaultState', opt_default_state);
  }

  this.currency_info_       = {};
  this.all_markets_         = {};
  this.bids_                = {};
  this.quote_list_          = {};
  this.receive_timeout_timer_ = new goog.Timer(1000);

  this.testrequest_timer_   = new goog.Timer(15000);


  this.deposit_request_id_  = null;
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
 * @type {number}
 * @private
 */
bitex.app.MerchantApp.prototype.deposit_request_id_;

/**
 * @type {number}
 * @private
 */
bitex.app.MerchantApp.prototype.market_data_subscription_id_;


/**
 * @type {.Array<Object>}
 * @private
 */
bitex.app.MerchantApp.prototype.bids_;


/**
 * @type {number}
 * @private
 */
bitex.app.MerchantApp.prototype.value_to_receive_in_fiat_;

/**
 * @type {number}
 * @private
 */
bitex.app.MerchantApp.prototype.value_received_in_fiat_;


/**
 * @type {string}
 * @private
 */
bitex.app.MerchantApp.prototype.market_to_sell_received_fiat_;

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
 * @type {uniform.Uniform}
 * @private
 */
bitex.app.MerchantApp.prototype.form_receive_;

/**
 * @type {Object}
 * @private
 */
bitex.app.MerchantApp.prototype.quote_list_;

/**
 * @type {string}
 * @private
 */
bitex.app.MerchantApp.prototype.input_address_;


/**
 * @type {goog.Timer}
 * @private
 */
bitex.app.MerchantApp.prototype.receive_timeout_timer_;

/**
 * @type {goog.Timer}
 * @private
 */
bitex.app.MerchantApp.prototype.testrequest_timer_;


/**
 * @param {string=} opt_url
 */
bitex.app.MerchantApp.prototype.run = function(opt_url){
  var url = 'wss://' + window.location.hostname + '/trade/';
  if(goog.isDefAndNotNull(opt_url)){
    url = opt_url;
  }
  this.url_ = url;
  this.value_to_receive_in_fiat_ = 0;
  this.value_received_in_fiat_ = 0;
  this.market_to_sell_received_fiat_ = null;

  var handler = this.getHandler();
  var model = this.getModel();

  /*
    Loading combobox
  */
  var signup_country_el = goog.dom.getElement('id_signup_country');
  var signup_state_el   = goog.dom.getElement('id_signup_state');
  var broker_el         = goog.dom.getElement('id_signup_broker');
  var withdraw_selector_el = goog.dom.getElement('id_withdraw_method_selector');
  var withdraw_submit_el =  goog.dom.getElement('id_withdraw_method_submit');


  this.form_receive_ =  new uniform.Uniform();
  this.form_receive_.decorate(goog.dom.getElement('id_receive_form') );

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

  handler.listen(withdraw_selector_el, goog.events.EventType.CHANGE, this.onChangeWithDrawMethod_  );

  handler.listen( model, bitex.model.Model.EventType.SET + "BrokerList", this.onBrokerList_ );

  handler.listen(withdraw_submit_el, goog.events.EventType.CLICK, this.onWithdrawSubmitClick_);

  handler.listen(this.receive_timeout_timer_, goog.Timer.TICK, this.onReceiveTimeoutTimerTick_);
  handler.listen(this.testrequest_timer_, goog.Timer.TICK, this.onTestRequestTimer_ );


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

  handler.listen( this.conn_ , bitex.api.BitEx.EventType.WITHDRAW_RESPONSE, this.onBitexWithdrawResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.WITHDRAW_CONFIRMATION_RESPONSE, this.onBitexWithdrawConfirmationResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.DEPOSIT_REFRESH, this.onDepositRefresh_ );


  handler.listen(goog.dom.getElement('id_receive_remaining_amount'),goog.events.EventType.CLICK, this.onReceiveRemainingAmount_ );
  handler.listen(goog.dom.getElement('id_receive_crypto_payment_back'),goog.events.EventType.CLICK, this.onExitCryptoPaymentView_  );

  handler.listen( goog.dom.getElement('id_my_transaction_menu'), goog.events.EventType.CLICK, this.onMyTransactionMenuClick_  );
  handler.listen( goog.dom.getElement('id_login_btn_login'), goog.events.EventType.CLICK, this.onUserLogin_ );
  handler.listen( goog.dom.getElement('id_signup_confirm'), goog.events.EventType.CLICK, this.onUserSignupButtonClick_ );

  handler.listen( goog.dom.getElement('id_enter_btn_receive'), goog.events.EventType.CLICK, this.onEnterReceiveClick_ );
  handler.listen( goog.dom.getElement('id_receive_refresh'), goog.events.EventType.CLICK, this.onReceiveRefreshClick_ );
  handler.listen( goog.dom.getElement('id_transactions_refresh'), goog.events.EventType.CLICK, this.onTransactionsRefreshClick_ );
  handler.listen( goog.dom.getElement('id_withdraw_confirmation_dialog'), goog.events.EventType.CLICK, this.onWithdrawConfirmClick_);
  handler.listen( goog.dom.getElement('id_payout_amount'), goog.events.InputHandler.EventType.INPUT, this.onWithdrawPayoutAmountChange_);

  handler.listen(  this.receive_timeout_timer_, goog.events.EventType.CLICK, this.onReceiveRemainingAmount_);


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
    this.showNotification( 'danger', 'Error', '' + e  );
  }
  this.testrequest_timer_.start();

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

  this.conn_.testRequest();

  jQuery.mobile.changePage('#login')

};

/**
 * @param {goog.events.Event} e
 * @protected
 */

bitex.app.MerchantApp.prototype.onConnectionClose_ = function(e){
  jQuery.mobile.changePage('#preLoad')
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onConnectionError_ = function(e){
  jQuery.mobile.changePage('#preLoad')
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onConnectionErrorMessage_ = function(e) {
  // TODO: Show a popup to the user with the error message.
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onTestRequestTimer_ = function(e){
  if (goog.isDefAndNotNull(this.conn_) && this.conn_.isConnected() && this.conn_.isLogged() ) {
    this.conn_.testRequest();
  }
};


/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onHearBeat_ = function(e) {
  var msg = e.data;

  if (goog.isDefAndNotNull(msg['SendTime'])) {
    var sent = new Date(msg['SendTime']);
    var just_now = new Date(Date.now());

    this.getModel().set('latency', just_now - sent );
  }
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
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onBitexWithdrawConfirmationResponse_ = function(e) {
  var msg = e.data;

  if (!goog.isDefAndNotNull(msg['ConfirmationToken'])) {

      /** @desc invalid confirmation toker */
      var MSG_INVALID_CONFIRMATION_TOKEN = goog.getMsg("Invalid confirmation token!");

      this.showNotification('error', MSG_INVALID_CONFIRMATION_TOKEN  );

      location.href = "#id_withdraw_confirmation_dialog";
  }
  else {
      /** @desc Withdraw user notification */
      var MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE = goog.getMsg("Withdraw confirmed");

      this.showNotification('info', MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE  );

      location.href = "#menu";
  }

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onBitexWithdrawResponse_ = function(e) {

  location.href = "#id_withdraw_confirmation_dialog";

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onWithdrawPayoutAmountChange_ = function(e){

  var el_fixed_fee = goog.dom.getElement('id_payout_fixed_fee');
  var el_payout_percent_fee = goog.dom.getElement('id_payout_percent_fee');
  var el_payout_amount = goog.dom.getElement('id_payout_amount');

  var el_total_fees = goog.dom.getElement('id_payout_fees');
  goog.dom.setTextContent( el_total_fees,  0 );


  var valueFormatter = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

  var pos = [0];
  var raw_amount = goog.dom.forms.getValue(el_payout_amount );
  var amount = valueFormatter.parse(raw_amount , pos );
  if (pos[0] != raw_amount.length || isNaN(amount) || amount <= 0 ) {
    return;
  }
  amount = amount * 1e8;

  var percent_fee = goog.dom.forms.getValue( el_payout_percent_fee );
  pos = [0];
  var percent_fee_value = valueFormatter.parse(percent_fee, pos);
  if (isNaN(percent_fee_value)) {
    percent_fee_value = 0;
  }


  var fixed_fee = goog.dom.forms.getValue( el_fixed_fee );
  pos = [0];
  var fixed_fee_value = valueFormatter.parse(fixed_fee, pos);
  if (isNaN(fixed_fee_value)) {
    fixed_fee_value = 0;
  }
  fixed_fee_value = fixed_fee_value * 1e8;

  var total_percent_fee_value = ((amount - fixed_fee_value) * (percent_fee_value/100.0));
  var total_fixed_fee_value = fixed_fee_value;
  var total_fees = total_percent_fee_value + total_fixed_fee_value;

  goog.dom.setTextContent( el_total_fees,  total_fees/1e8 );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onWithdrawConfirmClick_ = function(e){
    if ( e.target.getAttribute('data-action-value') == "ok") {
        this.conn_.confirmWithdraw( goog.dom.forms.getValue( goog.dom.getElement("id_withdraw_confirmation") ) );
    }
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

  var percent_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.PERCENT);
  percent_fmt.setMaximumFractionDigits(2);
  percent_fmt.setMinimumFractionDigits(2);

  if (goog.isDefAndNotNull(broker_info['TransactionFeeBuy'])) {
    broker_info['FormattedTransactionFeeBuy'] = percent_fmt.format(broker_info['TransactionFeeBuy'] / 10000);
  }
  if (goog.isDefAndNotNull(broker_info['TransactionFeeSell'])) {
    broker_info['FormattedTransactionFeeSell'] = percent_fmt.format(broker_info['TransactionFeeSell'] / 10000);
  }




  return broker_info;
};

/**
 * @param {string} currency_code
 * @protected
 */
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

    goog.dom.removeChildren(goog.dom.getElement('id_receive_currency'));
    goog.object.forEach(this.getModel().get('Broker')['AllowedMarkets'], function(market, symbol){
      var currency_code = this.conn_.getPriceCurrencyFromSymbol(symbol);
      var crypto_currency_code = this.conn_.getQtyCurrencyFromSymbol(symbol);

      /** @desc options for the merchant to accept  */
      var MSG_MERCHANT_APP_SELECT_SYMBOL = goog.getMsg('He pays in {$cryptocurrency}, you get {$currency}',{
        currency: this.conn_.getCurrencyDescription(currency_code), cryptocurrency:this.conn_.getCurrencyDescription(crypto_currency_code)});

      var currency_el = goog.dom.createDom('option', {'value': symbol}, MSG_MERCHANT_APP_SELECT_SYMBOL);

      goog.dom.appendChild(goog.dom.getElement('id_receive_currency'), currency_el);
    }, this);
    goog.style.showElement( goog.dom.getElement('id_receive_currency_control_holder'),
                            this.getModel().get('Broker')['Currencies'].length > 1 );


    var el_withdraw_method_selector = goog.dom.getElement('id_withdraw_method_selector');
    goog.dom.removeChildren(el_withdraw_method_selector);

    var el_withdraw_currency_selector = goog.dom.getElement('id_withdraw_currency_selector');
    goog.dom.removeChildren(el_withdraw_currency_selector);

    var currency_count = 0;

    goog.object.forEach(this.getModel().get('Broker')['WithdrawStructure'], function(withdraw_methods, currency) {
        if (!this.isCryptoCurrency(currency)) {
            goog.dom.appendChild(el_withdraw_currency_selector, goog.dom.createDom('option', { 'value' : currency }, currency));

            goog.array.forEach(withdraw_methods,  function(method) {
                goog.dom.appendChild(el_withdraw_method_selector, goog.dom.createDom('option', { 'value' : method.method },method.description));
            });

            goog.events.dispatchEvent(el_withdraw_method_selector, goog.events.EventType.CHANGE);

            currency_count = currency_count + 1;
        }
    }, this);

    goog.style.showElement(goog.dom.getElement('id_payout_currency'), currency_count > 1);
  }

  this.getModel().set('AllowedMarkets', allowed_markets);
  this.getModel().set('BrokerCurrencies', broker_currencies.getValues());


  this.conn_.requestBalances();

  // Request Deposit Options
  this.conn_.requestDepositMethods();


  var instruments = [];
  goog.object.forEach(allowed_markets, function( obj, instrument ) {
    instruments.push(instrument);
  });
  this.market_data_subscription_id_ =  this.conn_.subscribeMarketData(0, instruments, ['0'] );
  var handler = this.getHandler();

  handler.listen( this.conn_, bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR + '.' + this.market_data_subscription_id_, this.onOBClear_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU + '.' + this.market_data_subscription_id_, this.onOBDeleteOrdersThru_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER + '.' + this.market_data_subscription_id_, this.onOBDeleteOrder_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER + '.' + this.market_data_subscription_id_, this.onOBUpdateOrder_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER + '.' + this.market_data_subscription_id_, this.onOBNewOrder_);


  if (this.getModel().get('IsVerified')) {
    jQuery.mobile.changePage('#menu')
  } else {
    if (this.getModel().get('Profile')['Verified']==0) {
      jQuery.mobile.changePage('#waitingVerification');
    } else {
      jQuery.mobile.changePage('#menu')
    }
  }

};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onOBClear_ = function(e){
  var msg   = e.data;
  var symbol = msg['Symbol'];
  this.bids_[symbol] = [];
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onOBDeleteOrdersThru_ = function(e){
  var msg   = e.data;
  var index = msg['MDEntryPositionNo'];
  var side  = msg['MDEntryType'];
  var symbol = msg['Symbol'];

  if (side == '0') {
    this.bids_[symbol].splice(0,index);
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onOBDeleteOrder_ = function(e){
  var msg   = e.data;
  var index = msg['MDEntryPositionNo'] - 1;
  var side  = msg['MDEntryType'];
  var symbol = msg['Symbol'];

  if (side == '0') {
    this.bids_[symbol].splice(index,1);
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onOBUpdateOrder_ = function(e){
  var msg   = e.data;
  var index = msg['MDEntryPositionNo'] - 1;
  var qty   = msg['MDEntrySize'];
  var side  = msg['MDEntryType'];
  var symbol = msg['Symbol'];

  if (side == '0') {
    this.bids_[symbol][index] = [ this.bids_[symbol][index][0], qty, this.bids_[symbol][index][2] ];
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onOBNewOrder_ = function(e){
  var msg       = e.data;
  var index     = msg['MDEntryPositionNo'] - 1;
  var price     = msg['MDEntryPx'];
  var qty       = msg['MDEntrySize'];
  var username  = msg['Username'];
  var broker    = msg['Broker'];
  var orderId   = msg['OrderID'];
  var side      = msg['MDEntryType'];
  var symbol = msg['Symbol'];

  if (side == '0') {
    goog.array.insertAt( this.bids_[symbol], [price, qty, username], index );
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onMyTransactionMenuClick_ = function(e) {
  if (!this.getModel().get('IsVerified')) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  if (goog.isDefAndNotNull(this.transactions_list_view_)) {
    return;
  }


  this.ledger_request_id_ = parseInt( 1e7 * Math.random() , 10 );
  var handler = this.getHandler();
  this.transactions_list_view_ = new bitex.ui.ListView({
    'rowFormatterFn': goog.bind(this.formatTransactionRecord_, this),
    'rowClassFn': function(rec) { return [ 'ui-li-static','ui-body-inherit','ui-li-has-count' ]; }
  });

  handler.listen( this.transactions_list_view_ ,
                  bitex.ui.ListView.EventType.REQUEST_DATA,
                  this.onTransactionsListViewRequestData_);
  handler.listen(this.conn_,
                 bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE + '.' + this.ledger_request_id_,
                 this.onLedgerListResponse_);

  this.transactions_list_view_.render( goog.dom.getElement('id_transactions_container') );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onTransactionsRefreshClick_ = function(e) {
  if (goog.isDefAndNotNull(this.transactions_list_view_)) {
    this.transactions_list_view_.setPage(0);
    this.transactions_list_view_.clear();
    this.transactions_list_view_.reload();
  }
};

/**
 * @param {Object} record
 * @return {Element}
 */
bitex.app.MerchantApp.prototype.formatTransactionRecord_ = function(record) {
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
  return  [record['Created'],value_element];
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
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onLedgerListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.transactions_list_view_) ) {
    return
  }
  var msg = e.data;
  this.transactions_list_view_.appendResultSet( msg['LedgerListGrp'], msg['Columns'] );
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
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onReceiveRemainingAmount_ = function(e) {
  e.preventDefault();
  e.stopPropagation();

  var remaining_amount = this.value_to_receive_in_fiat_ -  this.value_received_in_fiat_;
  goog.dom.forms.setValue( goog.dom.getElement('id_display_receive'), remaining_amount/1e8  );

  this.onEnterReceiveClick_(e);
};

/**
 * @private
 */
bitex.app.MerchantApp.prototype.onReceiveRefreshClick_ = function(){
  goog.dom.forms.setValue( goog.dom.getElement('id_display_receive'), this.value_to_receive_in_fiat_/1e8  );
  this.onEnterReceiveClick_();
};

/**
 *
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onReceiveTimeoutTimerTick_ = function(e) {
  var timeout_el = goog.dom.getElement('id_receive_timeout');
  var current_timeout =  goog.dom.getTextContent(timeout_el);

  var dt = new goog.date.DateTime();
  var parser = new goog.i18n.DateTimeParse('mm:ss');
  parser.parse(current_timeout, dt);

  dt.add(new goog.date.Interval(goog.date.Interval.SECONDS , -1));

  if (dt.getMinutes() == 59) {
    this.receive_timeout_timer_.stop();
    goog.dom.forms.setValue( goog.dom.getElement('id_display_receive'), this.value_to_receive_in_fiat_/1e8  );
    jQuery.mobile.changePage('#receive');
  } else {
    var fmt = new goog.i18n.DateTimeFormat('mm:ss');
    goog.dom.setTextContent(timeout_el, fmt.format(dt));
  }
};

/**
 *
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onExitCryptoPaymentView_ = function(e){
  this.receive_timeout_timer_.stop();
  goog.dom.forms.setValue( goog.dom.getElement('id_display_receive'), this.value_to_receive_in_fiat_/1e8  );
  jQuery.mobile.changePage('#receive');
};

/**
 *
 * @param {goog.events.Event=} e
 * @private
 */
bitex.app.MerchantApp.prototype.onEnterReceiveClick_ = function(e){
  if (goog.isDefAndNotNull(e)){
    e.preventDefault();
    e.stopPropagation();
  }

  var error_list = this.form_receive_.validate();
  if (error_list.length > 0) {
    this.value_to_receive_in_fiat_ = 0;
    this.value_received_in_fiat_ = 0;
    goog.array.forEach(error_list, function (error_msg) {

      /**
       * @desc Error notification title
       */
      var MSG_MERCHANT_APP_RECEIVE_VALUE_VALIDATION_ERROR_NOTIFICATION_TITLE = goog.getMsg('Invalid amount');

      this.showNotification('danger', MSG_MERCHANT_APP_RECEIVE_VALUE_VALIDATION_ERROR_NOTIFICATION_TITLE, error_msg);
    }, this);

    return;
  }


  var value_to_receive = goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement('id_display_receive'))) ;
  if (value_to_receive <= 0) {
    this.value_to_receive_in_fiat_ = 0;
    this.value_received_in_fiat_ = 0;
    /**
      * @desc Put a value on merchant app balance-report form
      */
    var MSG_MERCHANT_APP_DISPLAY_MISSING_AMOUNT = goog.getMsg('Missing amount');

    this.showNotification('danger', '', MSG_MERCHANT_APP_DISPLAY_MISSING_AMOUNT );
    return;
  }
  goog.array.forEach(goog.dom.getElementsByClass('received-partial-payment'),
                     function(el){ goog.style.showElement(el, false) });

  goog.dom.forms.setValue(goog.dom.getElement('id_display_receive'), "0");


  this.value_to_receive_in_fiat_ =  parseInt(value_to_receive * 1e8, 10);
  this.value_received_in_fiat_ = 0;
  this.market_to_sell_received_fiat_ = goog.dom.forms.getValue(goog.dom.getElement('id_receive_currency'));

  var handler = this.getHandler();
  var crypto_currency_code = this.conn_.getQtyCurrencyFromSymbol(this.market_to_sell_received_fiat_);
  if (goog.isDefAndNotNull(this.deposit_request_id_)){
    handler.unlisten( this.conn_,
                      bitex.api.BitEx.EventType.EXECUTION_REPORT + '.' +this.deposit_request_id_ + '.L',
                      this.onExecutionReportOfFirstDepositInstruction_);

    handler.unlisten( this.conn_,
                      bitex.api.BitEx.EventType.EXECUTION_REPORT + '.' +this.deposit_request_id_ + '.M',
                      this.onExecutionReportOfSecondDepositInstruction_);
  }

  this.deposit_request_id_ = parseInt( 1e7 * Math.random() , 10 );
  this.quote_list_[this.deposit_request_id_] = [];

  handler.listenOnce( this.conn_, bitex.api.BitEx.EventType.DEPOSIT_RESPONSE + '.' + this.deposit_request_id_,
                      this.onDepositResponse_);


  goog.dom.setTextContent(goog.dom.getElement('id_receive_payment_crypto_currency_public_address'), '');
  goog.dom.removeChildren(goog.dom.getElement('id_receive_payment_crypto_currency_public_address_qr_code'));


  if (this.recalculateCryptoPayment( this.market_to_sell_received_fiat_, this.value_to_receive_in_fiat_ )) {
    var amount = this.quote_list_[this.deposit_request_id_][0][0];
    var price = this.quote_list_[this.deposit_request_id_][0][1];

    var instructions = [ {
      'Timeout': 240,  // 4 minutes to pay
      'Filter': {'PaidValue': amount }, // this quote is valid only and if only the customer pay the exactly amount.
      'Msg': {
        'MsgType': 'D',
        'ClOrdID': '' + this.deposit_request_id_ + '.L',
        'Symbol': this.market_to_sell_received_fiat_,
        'Side': '2', // Sell
        'OrdType': '2', // Limited order
        'Price': price,
        'OrderQty': '{$PaidValue}',
        'BrokerID': this.getModel().get('Broker')['BrokerID']
      }
    }, {
      'Msg': {
        'MsgType': 'D',
        'ClOrdID': '' + this.deposit_request_id_ + '.M',
        'Symbol': this.market_to_sell_received_fiat_,
        'Side': '2', // Sell
        'OrdType': '1', // Market order
        'OrderQty': '{$PaidValue}',
        'BrokerID': this.getModel().get('Broker')['BrokerID']
      }
    }];

    handler.listen( this.conn_,
                    bitex.api.BitEx.EventType.EXECUTION_REPORT + '.' +this.deposit_request_id_ + '.L',
                    this.onExecutionReportOfFirstDepositInstruction_ );

    handler.listen( this.conn_,
                    bitex.api.BitEx.EventType.EXECUTION_REPORT + '.' +this.deposit_request_id_ + '.M',
                    this.onExecutionReportOfSecondDepositInstruction_ );

    this.conn_.requestDeposit( this.deposit_request_id_,
                               undefined ,
                               amount,
                               undefined,
                               crypto_currency_code,
                               '' + this.deposit_request_id_,
                               instructions );

    goog.dom.setTextContent(goog.dom.getElement('id_receive_timeout'), '03:00');
    this.receive_timeout_timer_.start();
  }

  jQuery.mobile.changePage('#id_receive_crypto_payment');
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onDepositResponse_ = function(e) {
  var msg = e.data;

  this.input_address_ = msg['Data']['InputAddress'];
  goog.dom.setTextContent(goog.dom.getElement('id_receive_payment_crypto_currency_public_address'),
                          msg['Data']['InputAddress']);

  this.redrawQrCode_();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onExecutionReportOfFirstDepositInstruction_ = function(e) {
  var msg = e.data;

  var qty_currency = this.conn_.getQtyCurrencyFromSymbol(msg['Symbol']);
  var price_currency = this.conn_.getPriceCurrencyFromSymbol(msg['Symbol']);
  var order_volume = msg['Price'] * msg['OrderQty'] / 1e8;

  var crypto_received = this.conn_.formatCurrency( msg['OrderQty'] / 1e8, qty_currency );
  var fiat_received   = this.conn_.formatCurrency( order_volume / 1e8, price_currency );

  goog.dom.setTextContent( goog.dom.getElement('id_amount_paid_exchanged') , fiat_received );
  goog.dom.setTextContent( goog.dom.getElement('id_amount_paid') , crypto_received );
  goog.dom.setTextContent( goog.dom.getElement('id_client_order_id') , msg['ClOrdID'] );
  this.showPaymentCompletion();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onExecutionReportOfSecondDepositInstruction_ = function(e) {
  var msg = e.data;

  if (msg['OrdStatus'] == '0') {
    return; // Just the ACK
  }

  this.receive_timeout_timer_.stop();
  goog.array.forEach(goog.dom.getElementsByClass('received-partial-payment'),
                     function(el){ goog.style.showElement(el, true)});

  goog.array.forEach(goog.dom.getElementsByClass('receive-qr-code-state'),
                     function(el){ goog.style.showElement(el, false)});

  this.value_received_in_fiat_ = msg['Volume'];

  var qty_currency = this.conn_.getQtyCurrencyFromSymbol(msg['Symbol']);
  var price_currency = this.conn_.getPriceCurrencyFromSymbol(msg['Symbol']);

  var crypto_received = this.conn_.formatCurrency( msg['OrderQty'] / 1e8, qty_currency );
  var fiat_received   = this.conn_.formatCurrency( msg['Volume'] / 1e8, price_currency );

  goog.dom.setTextContent( goog.dom.getElement('id_received_amount'), crypto_received + ' (' + fiat_received + ')');

  if (msg['Volume'] >= this.value_to_receive_in_fiat_ ) {
    goog.dom.setTextContent( goog.dom.getElement('id_amount_paid_exchanged') , fiat_received );
    goog.dom.setTextContent( goog.dom.getElement('id_amount_paid') , crypto_received );
    goog.dom.setTextContent( goog.dom.getElement('id_client_order_id') , msg['ClOrdID'] );
    this.showPaymentCompletion();
  } else {
    jQuery.mobile.changePage('#id_receive_crypto_payment');
  }
};

bitex.app.MerchantApp.prototype.showPaymentCompletion = function(){
  this.receive_timeout_timer_.stop();
  jQuery.mobile.changePage('#id_dialog_complete');
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onDepositRefresh_ = function(e){
  var msg = e.data;

  if (msg['Status'] != '4') {
    return;
  }

  if (msg['ClOrdID'] != '' + this.deposit_request_id_ ) {
    return;
  }
};

/**
 * @private
 */
bitex.app.MerchantApp.prototype.redrawQrCode_ = function(){
  goog.array.forEach(goog.dom.getElementsByClass('receive-qr-code-state'),
                     function(el){ goog.style.showElement(el, goog.isDefAndNotNull(this.input_address_))}, this);

  if (! goog.isDefAndNotNull(this.input_address_)) {
    return;
  }

  var img_src = 'https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=' + this.input_address_;

  var quote_data;
  if (goog.isDefAndNotNull(this.quote_list_[this.deposit_request_id_])) {
    if (goog.isArrayLike( this.quote_list_[this.deposit_request_id_] )) {
      if (goog.isArrayLike( this.quote_list_[this.deposit_request_id_][0] )) {
        quote_data = this.quote_list_[this.deposit_request_id_][0];
      }
    }
  }

  if (goog.isDefAndNotNull(quote_data)) {
    var amount = (quote_data[0] / 1e8);
    var bitcoin_url = 'bitcoin://' + this.input_address_ + '?amount=' + amount;
    img_src = 'https://chart.googleapis.com/chart?cht=qr&chs=320x320&chl=' + encodeURIComponent(bitcoin_url);
  }

  var current_element = goog.dom.getFirstElementChild(
      goog.dom.getElement('id_receive_payment_crypto_currency_public_address_qr_code'));
  if (!goog.isDefAndNotNull( current_element )) {
    goog.dom.appendChild(goog.dom.getElement('id_receive_payment_crypto_currency_public_address_qr_code'),
                         goog.dom.createDom('img', { 'src': img_src, 'width': '100%' }));
  } else {
    if (current_element.src !=  img_src) {
      current_element.src = img_src;
    }
  }
};

/**
 * @param {string} symbol
 * @param {number} total_amount_to_receive_in_fiat
 * @return {boolean}
 */
bitex.app.MerchantApp.prototype.recalculateCryptoPayment = function( symbol, total_amount_to_receive_in_fiat ) {
  if (!goog.isDefAndNotNull(symbol) || total_amount_to_receive_in_fiat <= 0) {
    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_has_liquidity_content'), false);
    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_no_liquidity_content'), true);
    return false;
  }

  var order_price_and_expected_amount_and_fee_and_expercted_avg_price =
      bitex.util.calculatePriceAmountAndFee(total_amount_to_receive_in_fiat,
                                            bitex.util.PriceAmountCalculatorVerb.SPEND,
                                            this.bids_[symbol],
                                            this.getModel().get('Username'),
                                            this.getModel().get('Broker')['TransactionFeeSell'] );
  if (goog.isDefAndNotNull(order_price_and_expected_amount_and_fee_and_expercted_avg_price)) {

    var currency_code = this.conn_.getPriceCurrencyFromSymbol(symbol);
    var crypto_currency_code = this.conn_.getQtyCurrencyFromSymbol(symbol);
    var fee = total_amount_to_receive_in_fiat * this.getModel().get('Broker')['TransactionFeeSell']/10000;
    var quote =  order_price_and_expected_amount_and_fee_and_expercted_avg_price[0];
    var amount_to_pay = parseInt(((total_amount_to_receive_in_fiat +  fee) / quote) * 1e8, 10);
    total_amount_to_receive_in_fiat += fee;
    var timestamp = new Date();

    var quote_data = [amount_to_pay, quote, fee, total_amount_to_receive_in_fiat, symbol, timestamp.getTime() ];
    console.log(quote_data );

    if (goog.isArrayLike(this.quote_list_[this.deposit_request_id_])) {
      goog.array.insertAt( this.quote_list_[this.deposit_request_id_], quote_data , 0);
    } else {
      this.quote_list_[this.deposit_request_id_] = [quote_data];
    }

    // amount to pay in crypto
    goog.dom.setTextContent(goog.dom.getElement('id_amount_to_pay_in_crypto'),
                            this.conn_.formatCurrency( amount_to_pay / 1e8 , crypto_currency_code, false ));

    // price per crypto
    goog.dom.setTextContent( goog.dom.getElement('id_balance_report_qty_currency_description'),
                             this.conn_.getCurrencyDescription(crypto_currency_code) );

    goog.dom.setTextContent( goog.dom.getElement('id_balance_report_quote'),
                             this.conn_.formatCurrency(quote / 1e8, currency_code  ) );

    // Fee in fiat
    goog.style.showElement(goog.dom.getElement('id_balance_report_fee_row'),
                           this.getModel().get('Broker')['TransactionFeeSell'] > 0);

    goog.dom.setTextContent( goog.dom.getElement('id_balance_report_broker_fee'),
                             this.getModel().get('Broker')['FormattedTransactionFeeSell']  );

    goog.dom.setTextContent(goog.dom.getElement('id_balance_report_fee_amount'),
                            this.conn_.formatCurrency( fee/1e8 , currency_code ));

    // Total amount to receive in fiat
    goog.dom.setTextContent( goog.dom.getElement('id_balance_report_total'),
                             this.conn_.formatCurrency(total_amount_to_receive_in_fiat/1e8, currency_code, true) );


    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_no_liquidity_content'), false);
    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_has_liquidity_content'), true);
    this.redrawQrCode_();
    return true;
  } else {
    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_has_liquidity_content'), false);
    goog.style.showElement(goog.dom.getElement('id_receive_crypto_payment_no_liquidity_content'), true);
    this.receive_timeout_timer_.stop();
    return false;
  }
};

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

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onBrokerList_ = function(e) {
  //
  // auto select the country/state in case there is only one broker
  //

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

//  repaint_broker();

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

/**
 * @param {string} selected_country
 * @protected
 */
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
    } else if (goog.isDefAndNotNull(model.get('DefaultState'))) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), model.get('DefaultState') );
      this.onSelectState_(selected_country, model.get('DefaultState'));
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
 * @param {goog.array} current_fields
 * @private
 */
bitex.app.MerchantApp.prototype.createWitdrawRequiredFields_ = function(current_fields){

    var el_withdraw_method_fields = goog.dom.getElement('id_withdraw_method_fields');
    goog.dom.removeChildren(el_withdraw_method_fields);

    goog.array.forEach(current_fields, function(current_field) {
        if ( current_field['side'] == "client") {
            goog.dom.appendChild(el_withdraw_method_fields,
                goog.soy.renderAsElement( bitex.ui.Merchant.templates.WithdrawFieldContent, { field: current_field } ) );
        }
    });
};



/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onWithdrawSubmitClick_ = function(e){

    var form_element = goog.dom.getElement("id_form_request_payout");

    var uf = new uniform.Uniform();
    uf.decorate(  form_element ) ;
    var error_list = uf.validate();

    if (error_list.length > 0) {
      goog.array.forEach(error_list, function (error_msg) {
        /**
         * @desc Error notification title on payout screen
         */
        var MSG_MERCHANTAPP_PAYOUT_VALIDATION_ERROR_NOTIFICATION_TITLE = goog.getMsg('Payout Error');

        this.showNotification('danger', MSG_MERCHANTAPP_PAYOUT_VALIDATION_ERROR_NOTIFICATION_TITLE, error_msg);
      }, this);

    } else {
      var withdraw_data = bitex.util.getFormAsJSON(form_element);

      var amount = goog.string.toNumber(withdraw_data['Amount']); delete withdraw_data['Amount'];
      var method = withdraw_data['Method']; delete withdraw_data['Method'];
      var currency = goog.dom.forms.getValue(goog.dom.getElement('id_withdraw_currency_selector'));

      this.conn_.requestWithdraw( undefined,
                                  parseInt(amount * 1e8, 10),
                                  method,
                                  currency,
                                  withdraw_data);
    }

    e.stopPropagation();
    e.preventDefault();
    return;
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.MerchantApp.prototype.onChangeWithDrawMethod_ = function(e){

    var el_withdraw_method_selector = goog.dom.getElement('id_withdraw_method_selector');
    var withdraw_method_value = goog.dom.forms.getValue(el_withdraw_method_selector);

    var el_withdraw_currency_selector = goog.dom.getElement('id_withdraw_currency_selector');
    var withdraw_currency_value = goog.dom.forms.getValue(el_withdraw_currency_selector);

    goog.object.forEach(this.getModel().get('Broker')['WithdrawStructure'], function(withdraw_methods, currency) {
        if ( withdraw_currency_value == currency){

            var el_fixed_fee = goog.dom.getElement('id_payout_fixed_fee');
            var el_payout_percent_fee = goog.dom.getElement('id_payout_percent_fee');

            goog.dom.forms.setValue(el_fixed_fee, '0');
            goog.dom.forms.setValue(el_payout_percent_fee, '0');

            goog.array.forEach(withdraw_methods, function(method) {
                if ( method['method'] == withdraw_method_value ) {

                    goog.dom.forms.setValue(el_fixed_fee, method['fixed_fee']);
                    goog.dom.forms.setValue(el_payout_percent_fee, method['percent_fee']);

                    this.createWitdrawRequiredFields_( method['fields'] );
                    repaint_payout();
                }
            }, this);
        }
    }, this);
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

    if (goog.isDefAndNotNull(broker)) {
      var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.PERCENT);
      fmt.setMaximumFractionDigits(2);
      fmt.setMinimumFractionDigits(2);
      broker['FormattedTransactionFeeBuy'] = fmt.format(broker['TransactionFeeBuy'] / 10000);
      broker['FormattedTransactionFeeSell'] = fmt.format(broker['TransactionFeeSell'] / 10000);
    }
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

  if (number_of_brokers_in_same_country_state == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  } else if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + model.get('DefaultBrokerID') );
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

