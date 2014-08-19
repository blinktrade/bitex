goog.provide('bitex.view.LoginView');
goog.provide('bitex.view.LoginView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.util');

goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('bitex.model.Model');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.LoginView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
  this.username_el_ = null;
  this.password_el_ = null;
};
goog.inherits(bitex.view.LoginView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.LoginView.EventType = {
  LOGIN: 'login_click'
};

/**
 * @type {Element}
 */
bitex.view.LoginView.prototype.username_el_;

/**
 * @type {Element}
 */
bitex.view.LoginView.prototype.password_el_;

/**
 * @override
 */
bitex.view.LoginView.prototype.enterDocument = function(){
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement('id_landing_signin'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    this.onLoginClick_( goog.dom.getElement("id_landing_username"),goog.dom.getElement("id_landing_password") );
  } ) ;

  handler.listen( goog.dom.getElement('id_btn_login'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    this.onLoginClick_( goog.dom.getElement("id_username"),goog.dom.getElement("id_password") );
  });
};

/**
 * @return {string}
 */
bitex.view.LoginView.prototype.getUsername = function() {
  return goog.dom.forms.getValue(this.username_el_);
};

/**
 * @return {string}
 */
bitex.view.LoginView.prototype.getPassword = function() {
  return goog.dom.forms.getValue(this.password_el_);
};


/**
 *
 * @param {Element} username_el
 * @param {Element} password_el
 * @private
 */
bitex.view.LoginView.prototype.onLoginClick_ = function( username_el, password_el ) {
  this.username_el_ = username_el;
  this.password_el_ = password_el;

  var username = this.getUsername();
  var password = this.getPassword();

  if (goog.string.isEmpty(username) ) {
    /**
     * @desc Invalid Username Alert error message when pushing the login button
     */
    var MSG_LOGIN_VIEW_INVALID_USERNAME = goog.getMsg('Invalid username');
    this.getApplication().showDialog( MSG_LOGIN_VIEW_INVALID_USERNAME );

    this.username_el_.focus();
    return;
  }
  if ( goog.string.isEmpty(password)  || password.length < 8) {
    /**
     * @desc Invalid Password Alert error message when pushing the login button
     */
    var MSG_LOGIN_VIEW_INVALID_PASSWORD = goog.getMsg('Password must have at least 8 characters');
    this.getApplication().showDialog( MSG_LOGIN_VIEW_INVALID_PASSWORD );
    this.password_el_.focus();
    return;
  }

  this.dispatchEvent(bitex.view.LoginView.EventType.LOGIN);
};


bitex.view.LoginView.prototype.clear = function(){
  if (goog.isDefAndNotNull(this.username_el_)) {
    goog.dom.forms.setValue(this.username_el_, "");
  }
  if (goog.isDefAndNotNull(this.password_el_)) {
    goog.dom.forms.setValue(this.password_el_, "");
  }
};
