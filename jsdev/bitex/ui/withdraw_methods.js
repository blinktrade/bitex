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


/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.selected_method_;

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.selected_currency_;

/**
 * @enum {string}
 */
bitex.ui.WithdrawMethods.EventType = {
  DELETE_WITHDRAW_METHOD: 'delete_withdraw_method',
  EDIT_WITHDRAW_METHOD: 'edit_withdraw_method',
  ADD_WITHDRAW_METHOD: 'add_withdraw_method'
};


/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.getCssClass = function() {
  return bitex.ui.WithdrawMethods.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.createDom = function() {
  var dom = this.getDomHelper();



  var topEl = goog.soy.renderAsElement(bitex.ui.withdraw_methods.templates.WithdrawMethods, {
    id: this.makeId('form'),
    methods: this.getModel()['withdraw_methods'],
    currencies: this.getModel()['currencies']
  });

  this.setElementInternal(topEl);
};

bitex.ui.WithdrawMethods.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement(this.makeId('form_table')), goog.events.EventType.CLICK, this.onTableClick_);
  handler.listen( this.getElement(), goog.events.EventType.CLICK, this.onAddField_);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onTableClick_ = function(e){
  var tr_el ;
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-edit') )) {
    tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    e.preventDefault();
    e.stopPropagation();

    this.selected_method_ = tr_el.getAttribute('data-withdraw-method');
    this.selected_currency_ = tr_el.getAttribute('data-withdraw-currency');

    this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.EDIT_WITHDRAW_METHOD);
  } else if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-delete') )) {
    tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    e.preventDefault();
    e.stopPropagation();

    this.selected_method_ = tr_el.getAttribute('data-withdraw-method');
    this.selected_currency_ = tr_el.getAttribute('data-withdraw-currency');

    this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.DELETE_WITHDRAW_METHOD);
    goog.dom.removeNode(tr_el);
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onAddField_ = function(e) {
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-add') )) {
    this.selected_currency_ = e.target.getAttribute('data-withdraw-currency');
    e.preventDefault();
    this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.ADD_WITHDRAW_METHOD);
  }
};


/**
 * @return {string}
 */
bitex.ui.WithdrawMethods.prototype.getSelectedMethod = function(){
  return this.selected_method_;
};

/**
 * @return {string}
 */
bitex.ui.WithdrawMethods.prototype.getSelectedCurrency = function(){
  return this.selected_currency_;
};

