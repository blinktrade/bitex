goog.provide('bitex.view.ProfileView');
goog.provide('bitex.view.ProfileView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawMethods');
goog.require('bitex.ui.WithdrawMethodEditor');
goog.require('bitex.ui.ChangePassword');

goog.require('goog.date.UtcDateTime');
goog.require('goog.graphics.Stroke');
goog.require('goog.i18n.DateTimeFormat');


/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.ProfileView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.ProfileView, bitex.view.View);

/**
 * @type {bitex.ui.ChangePassword}
 */
bitex.view.ProfileView.prototype.change_password_;




bitex.view.ProfileView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  var model = this.getApplication().getModel();
  var handler = this.getHandler();

  if (model.get('IsBroker') ) {

    var withdraw_methods = new bitex.ui.WithdrawMethods(
        goog.bind(this.getApplication().formatCurrency,this.getApplication()),
        goog.bind(this.getApplication().getCurrencyDescription, this.getApplication()));



    var broker_currencies = [];
    goog.array.forEach (model.get('Profile')['BrokerCurrencies'], function(currency) {
      var obj = {
        'code': currency,
        'description': this.getApplication().getCurrencyDescription(currency)
      };
      broker_currencies.push(obj);
    }, this );

    var withdraw_methods_model = goog.object.unsafeClone( model.get('Profile')['WithdrawStructure']);
    withdraw_methods.setModel( { 'withdraw_methods':withdraw_methods_model, 'currencies':broker_currencies } );


    this.addChild(withdraw_methods, true);
    withdraw_methods.enterDocument();
  } else {

    var customer = {};
    customer['ID'] = model.get('Profile')['UserID'];
    customer['Username'] = model.get('Profile')['Username'];
    customer['Email'] = model.get('Profile')['Email'];

    var state = model.get('Profile')['State'];
    if (!goog.isDefAndNotNull(state) ) {
        state = model.get('Broker')['State'];
    }

    customer['State'] = state;
    customer['CountryCode'] = model.get('Profile')['Country'];
    customer['Verified'] = model.get('Profile')['Verified'];

    var account_overview_header_el = goog.dom.getElement('account_overview_user_id');
    goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewUser, {msg_customer_detail: customer});
  }


  var secret = this.getApplication().getModel().get('TwoFactorSecret');
  var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

  var divEl = goog.dom.getElement('id_enable_two_factor_div');
  var btnEnableEl = goog.dom.getElement('id_btn_enable_two_factor');
  var btnDisableEl = goog.dom.getElement('id_btn_disable_two_factor');
  goog.style.showElement( btnEnableEl , !this.getApplication().getModel().get("TwoFactorEnabled"));
  goog.style.showElement( btnDisableEl , this.getApplication().getModel().get("TwoFactorEnabled"));
  goog.style.showElement( divEl , has_secret);

  this.change_password_ = new bitex.ui.ChangePassword();
  this.addChild(this.change_password_, true);
  this.change_password_.enterDocument();

  handler.listen(this, bitex.ui.ChangePassword.EventType.CHANGE_PASSWORD, this.onChangePassword_);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onChangePassword_ = function(e) {
  var current_password = e.target.getCurrentPassword();
  var password = e.target.getPassword();
  var password2 = e.target.getNewPassword();

  if ( goog.string.isEmpty(current_password) ) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_CHANGE_PASSWORD_EMPTY_PASSWORD = goog.getMsg('Password must not be empty');

    this.getApplication().showDialog(MSG_CHANGE_PASSWORD_EMPTY_PASSWORD );
    return;
  }

  if ( goog.string.isEmpty(password)  || password.length < 8) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_CHANGE_PASSWORD_INVALID_PASSWORD = goog.getMsg('New password must have at least 8 characters');

    this.getApplication().showDialog(MSG_CHANGE_PASSWORD_INVALID_PASSWORD );
    return;
  }

  if ( password !== password2 ) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_CHANGE_PASSWORDS_DOES_NOT_MATCH = goog.getMsg('Passwords does not match');

    this.getApplication().showDialog(MSG_CHANGE_PASSWORDS_DOES_NOT_MATCH );
    return;
  }

  this.dispatchEvent(bitex.view.View.EventType.CHANGE_PASSWORD);
};

/**
 * @return {string}
 */
bitex.view.ProfileView.prototype.getCurrentPassword = function(){
  return this.change_password_.getCurrentPassword();
};

/**
 * @return {string}
 */
bitex.view.ProfileView.prototype.getPassword = function(){
  return this.change_password_.getPassword();
};

/**
 * @return {string}
 */
bitex.view.ProfileView.prototype.getNewPassword = function(){
  return this.change_password_.getNewPassword();
};



bitex.view.ProfileView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.removeChildren(true);
};

/** @override */
bitex.view.ProfileView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.CHANGE, this.onChangeWithdrawStructure_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.SAVE, this.onSaveWithdrawStructure_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.CANCEL, this.onCancelWithdrawStructure_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.VALIDATION_ERROR, this.onValidationErrorWithdrawStructure_);

  var model = this.getApplication().getModel();
  handler.listen( model, bitex.model.Model.EventType.SET + 'TwoFactorSecret', this.onModelSetTwoFactorSecret_ );
  handler.listen( model, bitex.model.Model.EventType.SET + 'TwoFactorEnabled', this.onModelSetTwoFactorEnabled_);


  handler.listen(goog.dom.getElement('id_btn_enable_two_factor'), goog.events.EventType.CLICK, function(e){
    this.dispatchEvent(bitex.view.View.EventType.ENABLE_TWOFACTOR);
  }, this);


  handler.listen( goog.dom.getElement('id_btn_disable_two_factor'),  goog.events.EventType.CLICK , function(e){
    this.dispatchEvent(bitex.view.View.EventType.DISABLE_TWOFACTOR);
  }, this);

};

/**
 * @param  {bitex.model.ModelEvent} e
 * @private
 */
bitex.view.ProfileView.prototype.onModelSetTwoFactorSecret_ = function(e) {
  var model = this.getApplication().getModel();

  var secret = e.data;
  var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

  if (has_secret) {
    var issuer = 'BlinkTrade - ' + model.get('Broker')['ShortName'];

    var qr_code = 'https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=' +
        encodeURIComponent('otpauth://totp/' + model.get('Username') + ' ' + model.get('Profile')['Email'] + '?secret=')  + secret +
        encodeURIComponent('&issuer=' + issuer);

    goog.dom.getElement('id_secret_qr').setAttribute('src', qr_code);
  }
};

/**
 * @param  {bitex.model.ModelEvent} e
 * @private
 */
bitex.view.ProfileView.prototype.onModelSetTwoFactorEnabled_ = function(e) {
  var enabled = e.data;

  var secret = this.getApplication().getModel().get('TwoFactorSecret');
  var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

  var divEl = goog.dom.getElement('id_enable_two_factor_div');
  var btnEnableEl = goog.dom.getElement('id_btn_enable_two_factor');
  var btnDisableEl = goog.dom.getElement('id_btn_disable_two_factor');

  goog.style.showElement( btnEnableEl , !enabled);
  goog.style.showElement( btnDisableEl , enabled);
  goog.style.showElement( divEl , has_secret);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onChangeWithdrawStructure_ = function(e) {
  var withdraw_structure = e.target.getWithdrawStructure();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onSaveWithdrawStructure_ = function(e) {
  var withdraw_structure = e.target.getWithdrawStructure();

  var withdraw_method_component = e.target;
  withdraw_method_component.setSavingStatus(true);

  var conn = this.getApplication().getBitexConnection();
  var requestId = conn.updateUserProfile({ 'WithdrawStructure': withdraw_structure});
  var handler = this.getHandler();
  handler.listenOnce( conn, bitex.api.BitEx.EventType.UPDATE_PROFILE_RESPONSE + '.' + requestId, function(e){
    withdraw_method_component.setDirty(false);
    withdraw_method_component.setSavingStatus(false);
  });
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onValidationErrorWithdrawStructure_ = function(e) {
  var error = e.target.getLastError();
  this.getApplication().showNotification('error', error);
};



/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onCancelWithdrawStructure_ = function(e) {
  var model = this.getApplication().getModel();
  var broker_currencies = [];
  goog.array.forEach (model.get('Profile')['BrokerCurrencies'], function(currency) {
    var obj = {
      'code': currency,
      'description': this.getApplication().getCurrencyDescription(currency)
    };
    broker_currencies.push(obj);
  }, this );

  var withdraw_methods_model = goog.object.unsafeClone( model.get('Profile')['WithdrawStructure']);
  e.target.setModel( { 'withdraw_methods':withdraw_methods_model, 'currencies':broker_currencies } );
  e.target.updateWindow();
  e.target.setDirty(false);
};


/**
 * @return {string}
 */
bitex.view.ProfileView.prototype.getCode = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_second_step_verification'));
};


