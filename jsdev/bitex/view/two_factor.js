goog.provide('bitex.view.TwoFactorView');
goog.provide('bitex.view.TwoFactorView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.model.Model');
goog.require('goog.style');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.TwoFactorView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.TwoFactorView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.TwoFactorView.EventType = {
  ENABLE: 'two_factor_enable',
  DISABLE: 'two_factor_disable'
};


bitex.view.TwoFactorView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( this.getApplication().getModel(),  bitex.model.Model.EventType.SET + 'TwoFactorSecret', function(e){
    var secret = e.data;
    var has_secret = goog.isDefAndNotNull(secret) && !goog.string.isEmpty(secret);

    if (has_secret) {
      var qr_code = 'https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=' + encodeURIComponent('otpauth://totp/you@blinktrade?secret=')  +secret;
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
    this.dispatchEvent(bitex.view.TwoFactorView.EventType.ENABLE);
  }, this);


  handler.listen( goog.dom.getElement('id_btn_disable_two_factor'), 'click', function(e){
    this.dispatchEvent(bitex.view.TwoFactorView.EventType.DISABLE);
  }, this);

};

/**
 * @return {string}
 */
bitex.view.TwoFactorView.prototype.getCode = function() {
  return goog.dom.forms.getValue( goog.dom.getElement('id_second_step_verification'));
};

