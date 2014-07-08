goog.provide('bitex.ui.OrderEntry');
goog.provide('bitex.ui.OrderEntry.EventType');

goog.require('bitex.ui.order_entry.templates');
goog.require('goog.ui.Component');

goog.require('goog.string');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.OrderEntry = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
};
goog.inherits(bitex.ui.OrderEntry, goog.ui.Component);


/**
 * @type {number}
 * @private
 */
bitex.ui.OrderEntry.prototype.blink_delay_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.OrderEntry.BASE_CSS_CLASS_ = goog.getCssName('order-entry');


/**
 * @enum {string}
 */
bitex.ui.OrderEntry.EventType = {
  SUBMIT: 'order_entry_submitted'
};

/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.OrderEntry.prototype.getBaseCssClass = function() {
  return bitex.ui.OrderEntry.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.OrderEntry.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.OrderEntry.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(bitex.ui.order_entry.templates.OrderEntry, {
    id: this.makeId('order_entry'),
    symbol:this.getModel().symbol,
    crypto_currency_symbol:this.getModel().crypto_currency_symbol,
    crypto_currency_description:this.getModel().crypto_currency_description,
    currency_symbol:this.getModel().currency_symbol,
    currency_description:this.getModel().currency_description,
    side:this.getModel().side,
    type:this.getModel().type,
    broker_id:this.getModel().broker_id
  });
  this.setElementInternal( el )
};

/** @override */
bitex.ui.OrderEntry.prototype.enterDocument = function() {
  var handler = this.getHandler();
  var dom  = this.getDomHelper();
};

/**
 * @param {.Array<.Array>} order_depth
 */
bitex.ui.OrderEntry.prototype.setOrderDepth = function(order_depth) {
  // order_depth = [ [ price, size ], [price, size ] ]
};

/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getSymbol = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_symbol') ));
};

/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getSide = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_side') ));
};


/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getType = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_type') ));
};

/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getBrokerID = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_broker_id') ));
};


/**
 * @return {number}
 */
bitex.ui.OrderEntry.prototype.getAmount = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_amount')));
};

/**
 * @return {number}
 */
bitex.ui.OrderEntry.prototype.getPrice = function(){
  // TODO: max price on the book
  return 0;
};




