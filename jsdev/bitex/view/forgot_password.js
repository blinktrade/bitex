goog.provide('bitex.view.ForgotPasswordView');
goog.provide('bitex.view.ForgotPasswordView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.model.Model');
goog.require('goog.style');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.ForgotPasswordView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.ForgotPasswordView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.ForgotPasswordView.EventType = {
  RECOVER_PASSWORD: 'recover_pwd'
};


bitex.view.ForgotPasswordView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement('id_btn_forgot_password'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();

    var email = goog.dom.forms.getValue( goog.dom.getElement("id_forgot_password_email") );
    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      goog.dom.getElement("id_forgot_password_email").focus();

      /**
       * @desc invalid email message shown in the forgot password view
       */
      var MSG_FORGOT_PASSWORD_INVALID_EMAIL = goog.getMsg('Invalid email address');

      this.getApplication().showDialog(MSG_FORGOT_PASSWORD_INVALID_EMAIL);
      return;
    }

    this.dispatchEvent(bitex.view.ForgotPasswordView.EventType.RECOVER_PASSWORD);
  }, this);
};

/**
 * @return {string}
 */
bitex.view.ForgotPasswordView.prototype.getEmail = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_forgot_password_email'));
};

