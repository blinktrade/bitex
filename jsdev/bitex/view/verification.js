goog.provide('bitex.view.VerificationView');
goog.require('bitex.view.View');



/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.VerificationView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
  this.loaded_jot_form_ = false;
};
goog.inherits(bitex.view.VerificationView, bitex.view.View);

/**
 * @type {boolean}
 */
bitex.view.VerificationView.prototype.loaded_jot_form_;

bitex.view.VerificationView.prototype.enterView = function() {
  if (this.loaded_jot_form_) {
    return;
  }

  var model = this.getApplication().getModel();

  var broker = model.get('Broker');
  if (!goog.isDefAndNotNull(broker)){
    return;
  }

  var verification_form_url =  broker['VerificationForm'];
  var form_src = goog.string.subs(verification_form_url, model.get('UserID'), model.get('Username'), model.get('Email'));

  var verificationIFrameForm = goog.dom.getElement("JotFormIFrame");

  if (verificationIFrameForm.src !== form_src ) {
    verificationIFrameForm.src = form_src;
    this.loaded_jot_form_ = true;
  }
};

bitex.view.VerificationView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};
