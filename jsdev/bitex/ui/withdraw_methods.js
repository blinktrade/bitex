goog.provide('bitex.ui.WithdrawMethods');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.withdraw_methods.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawMethods = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(bitex.ui.WithdrawMethods, goog.ui.Component);


/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.CSS_CLASS = goog.getCssName('withdraw-methods');

/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.getCssClass = function() {
  return bitex.ui.WithdrawMethods.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var topEl = goog.soy.renderAsElement(bitex.ui.withdraw_methods.templates.WithdrawMethods, {
    id: this.makeId('form'),
    model: this.getModel()
  });

  this.setElementInternal(topEl);
};


bitex.ui.WithdrawMethods.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement(this.makeId('form_table')), goog.events.EventType.CLICK, this.onTableClick_);
  handler.listen( goog.dom.getElement(this.makeId('form_add')), goog.events.EventType.CLICK, this.onAddField_);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onTableClick_ = function(e){
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'field-action-edit') )) {
    var tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    e.preventDefault();
    e.stopPropagation();


  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onAddField_ = function(e) {
  e.preventDefault();
  e.stopPropagation();

};
