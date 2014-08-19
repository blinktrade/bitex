goog.provide('bitex.ui.ChangePassword');
goog.provide('bitex.ui.ChangePassword.EventType');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.ChangePassword.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.ChangePassword = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(bitex.ui.ChangePassword, goog.ui.Component);


/**
 * The events fired
 * @enum {string} The event types
 */
bitex.ui.ChangePassword.EventType = {
  CHANGE_PASSWORD: 'control_change_password'
};

/**
 * @type {string}
 */
bitex.ui.ChangePassword.CSS_CLASS = goog.getCssName('change-password');

/** @inheritDoc */
bitex.ui.ChangePassword.prototype.getCssClass = function() {
  return bitex.ui.ChangePassword.CSS_CLASS;
};

/** @inheritDoc */
bitex.ui.ChangePassword.prototype.createDom = function() {
  var topEl = goog.soy.renderAsElement(bitex.ui.ChangePassword.templates.ChangePassword, {id: this.makeId('form')});
  this.setElementInternal(topEl);
};

bitex.ui.ChangePassword.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

};

bitex.ui.ChangePassword.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement(this.makeId('form_change')), goog.events.EventType.CLICK, this.onChangePassword_);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.ChangePassword.prototype.onChangePassword_ = function(e) {
  e.preventDefault();
  e.stopPropagation();


  this.dispatchEvent(bitex.ui.ChangePassword.EventType.CHANGE_PASSWORD);

};

/**
 * @return {string}
 */
bitex.ui.ChangePassword.prototype.getCurrentPassword = function(){
  return goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_oldpassword')) );
};

/**
 * @return {string}
 */
bitex.ui.ChangePassword.prototype.getPassword = function(){
  return goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_password')) );
};

/**
 * @return {string}
 */
bitex.ui.ChangePassword.prototype.getNewPassword = function(){
  return goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_repeat_password')) );
};
