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


/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.ProfileView.EventType = {
  ENABLE_TWOFACTOR: 'two_factor_enable',
  DISABLE_TWOFACTOR: 'two_factor_disable'
};


bitex.view.ProfileView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  var model = this.getApplication().getModel();
  var handler = this.getHandler();

  if (model.get('IsBroker') ) {

    var withdraw_methods = new bitex.ui.WithdrawMethods();
    var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);

    var broker_currencies = [];
    goog.array.forEach (model.get('Profile')['BrokerCurrencies'], function(currency) {
      var obj = {
        'code': currency,
        'description': this.getApplication().getCurrencyDescription(currency)
      };
      broker_currencies.push(obj);
    }, this );

    var withdraw_methods_model = [];
    goog.object.forEach(model.get('Profile')['WithdrawStructure'], function( withdraw_methods, currency) {
      goog.array.forEach(withdraw_methods, function(withdraw_method) {
        var obj = {
          'currency': currency,
          'currency_description': this.getApplication().getCurrencyDescription(currency)
        };
        goog.object.extend(obj, withdraw_method);

        var pos = [0];
        var fixed_fee = valueFormatter.parse(obj['fixed_fee'], pos);

        obj['has_fixed_fee'] = !(pos[0] != obj['fixed_fee'].length || isNaN(fixed_fee) || fixed_fee <= 0 );


        obj['formatted_fixed_fee'] = this.getApplication().formatCurrency(fixed_fee, currency, true );

        withdraw_methods_model.push(obj);
      }, this);
    }, this);
    withdraw_methods.setModel( { 'withdraw_methods':withdraw_methods_model, 'currencies':broker_currencies } );

    this.addChild(withdraw_methods, true);
    withdraw_methods.enterDocument();
  } else {

    var customer = {};
    customer['ID'] = model.get('Profile')['UserID'];
    customer['Username'] = model.get('Profile')['Username'];
    customer['Email'] = model.get('Profile')['Email'];
    customer['State'] = model.get('Profile')['State'];
    customer['CountryCode'] = model.get('Profile')['Country'];
    customer['Verified'] = model.get('Profile')['Verified'];

    var account_overview_header_el = goog.dom.getElement('account_overview_user_id');
    goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewUser, {msg_customer_detail: customer});
  }

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
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen(this, bitex.ui.WithdrawMethods.EventType.DELETE_WITHDRAW_METHOD, this.onDeleteMethod_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.EDIT_WITHDRAW_METHOD, this.onEditMethod_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.ADD_WITHDRAW_METHOD, this.onAddMethod_);

  handler.listen( this.getApplication().getModel(),  bitex.model.Model.EventType.SET + 'TwoFactorSecret', function(e){
    var secret = e.data;
    var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

    if (has_secret) {

      var qr_code = 'https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=' +
        encodeURIComponent('otpauth://totp/'  + model.get('Username') + '?secret=')  +secret +
        encodeURIComponent('&issuer=BlinkTrade');

      goog.dom.getElement('id_secret_qr').setAttribute('src', qr_code);
    }
  });

  handler.listen( this.getApplication().getModel(),  bitex.model.Model.EventType.SET + 'TwoFactorEnabled', function(e){
    var enabled = e.data;

    var secret = this.getApplication().getModel().get('TwoFactorSecret');
    var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    var btnEnableEl = goog.dom.getElement('id_btn_enable_two_factor');
    var btnDisableEl = goog.dom.getElement('id_btn_disable_two_factor');

    goog.style.showElement( btnEnableEl , !enabled);
    goog.style.showElement( btnDisableEl , enabled);
    goog.style.showElement( divEl , has_secret);
  }, this);

  handler.listen(goog.dom.getElement('id_btn_enable_two_factor'), 'click', function(e){
    this.dispatchEvent(bitex.view.ProfileView.EventType.ENABLE_TWOFACTOR);
  }, this);


  handler.listen( goog.dom.getElement('id_btn_disable_two_factor'), 'click', function(e){
    this.dispatchEvent(bitex.view.ProfileView.EventType.DISABLE_TWOFACTOR);
  }, this);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onDeleteMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  var withdraw_method = e.target.getSelectedMethod();
  var model = this.getApplication().getModel();

  var idx = goog.array.findIndex(model.get('Profile')['WithdrawStructure'][currency], function(wm) {
    if (wm['method'] ==  withdraw_method) {
      return true;
    }
  } );


  //console.log('deleted ' + currency + ',' + withdraw_method  );
  delete model.get('Profile')['WithdrawStructure'][currency][idx];
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onEditMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  var withdraw_method = e.target.getSelectedMethod();
  var model = this.getApplication().getModel();

  var idx = goog.array.findIndex(model.get('Profile')['WithdrawStructure'][currency], function(wm) {
    if (wm['method'] ==  withdraw_method) {
      return true;
    }
  });

  var withdraw_method_editor = new  bitex.ui.WithdrawMethodEditor();
  withdraw_method_editor.setModel(model.get('Profile')['WithdrawStructure'][currency][idx]);

  /**
   * @desc Edit Method dialog title
   */
  var MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE = goog.getMsg('Edit withdraw method');
  var title = MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE;

  var buttonSet = bootstrap.Dialog.ButtonSet.createOkCancel();

  var dialog_ = new bootstrap.Dialog();
  dialog_.setTitle(title);
  dialog_.addChild(withdraw_method_editor, true);
  dialog_.setButtonSet( buttonSet);
  dialog_.setVisible(true);
  goog.style.setWidth(dialog_.getElement(), 850);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onAddMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  //console.log('adding withdraw method for ' + currency )
};


/**
 * @return {string}
 */
bitex.view.ProfileView.prototype.getCode = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_second_step_verification'));
};


