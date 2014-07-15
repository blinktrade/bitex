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

  try{
    this.conn_.open(this.url_);
  } catch( e ) {
    // TODO: Show a popup error to the user.
    console.log(e);
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
  this.timer_ = new goog.Timer(3000);
  handler.listen( this.timer_, goog.Timer.TICK, this.onTimerHeartBeat_ );
  this.timer_.start();
  this.conn_.sendHearBeat();

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

  var username = goog.dom.forms.getValue( goog.dom.getElement('id_login_username') );
  var password = goog.dom.forms.getValue( goog.dom.getElement('id_login_password') );

  this.model_.set('Password',  password);
  this.conn_.login(username, password);
};

// End
goog.exportSymbol('MerchantApp', bitex.app.MerchantApp);
goog.exportProperty(MerchantApp.prototype, 'run', bitex.app.MerchantApp.prototype.run);

