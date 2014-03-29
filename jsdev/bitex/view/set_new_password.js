goog.provide('bitex.view.SetNewPasswordView');
goog.provide('bitex.view.SetNewPasswordView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.model.Model');
goog.require('goog.style');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.SetNewPasswordView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.SetNewPasswordView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.SetNewPasswordView.EventType = {
  SET_NEW_PASSWORD: 'set_new_pwd'
};


/**
 * @return {string}
 */
bitex.view.SetNewPasswordView.prototype.getToken = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_set_new_password_token'));
};

/**
 * @return {string}
 */
bitex.view.SetNewPasswordView.prototype.getPassword = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_set_new_password_password'));
};

/**
 * @return {string}
 */
bitex.view.SetNewPasswordView.prototype.getPassword2 = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_set_new_password_password2'));
};


bitex.view.SetNewPasswordView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement('id_btn_set_new_password'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();


    if (goog.string.isEmpty(this.getToken())) {
      /**
       * @desc invalid token error on set new password view
       */
      var MSG_SET_NEW_PASSWORD_VIEW_INVALID_TOKEN = goog.getMsg('Invalid confirmation code');

      this.getApplication().showDialog(MSG_SET_NEW_PASSWORD_VIEW_INVALID_TOKEN);
      return;
    }

    if ( goog.string.isEmpty(this.getPassword())  || this.getPassword().length < 8) {

      /**
       * @desc invalid password error on set new password view
       */
      var MSG_SET_NEW_PASSWORD_VIEW_INVALID_PASSWORD = goog.getMsg('Password must have at least 8 characters');

      this.getApplication().showDialog(MSG_SET_NEW_PASSWORD_VIEW_INVALID_PASSWORD);

      return;
    }

    if ( this.getPassword() !== this.getPassword2() ) {

      /**
       * @desc invalid password error on set new password view
       */
      var MSG_SET_NEW_PASSWORD_VIEW_PASSWORD_DOESNT_MATCH = goog.getMsg('Passwords does not match');

      this.getApplication().showDialog(MSG_SET_NEW_PASSWORD_VIEW_PASSWORD_DOESNT_MATCH);

      return;
    }

    this.dispatchEvent(bitex.view.SetNewPasswordView.EventType.SET_NEW_PASSWORD);
  }, this);
};


