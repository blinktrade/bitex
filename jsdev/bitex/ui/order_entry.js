goog.provide('bitex.ui.OrderEntry');
goog.provide('bitex.ui.OrderEntry.EventType');
goog.provide('bitex.ui.OrderEntryEvent');

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
  BUY_LIMITED: 'buy_limited',

  SELL_LIMITED: 'sell_limited'
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
bitex.ui.OrderEntry.prototype.enterDocument = function() {
  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  var buyBtn = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'buy'), this.getElement());
  var sellBtn = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'sell'), this.getElement());

  handler.listen(buyBtn,
                 goog.events.EventType.CLICK,
                 goog.partial(this.onAction_,bitex.ui.OrderEntry.EventType.BUY_LIMITED ) );

  handler.listen(sellBtn,
                 goog.events.EventType.CLICK,
                 goog.partial(this.onAction_, bitex.ui.OrderEntry.EventType.SELL_LIMITED) );
};



/**
 * @param {bitex.ui.OrderEntry.EventType} eventType
 * @param {goog.events.Event} e
 */
bitex.ui.OrderEntry.prototype.onAction_ = function(eventType, e) {

  var symbol_el = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'symbol'));
  var qty_el    = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'qty'));
  var price_el  = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'price'));

  var symbol = goog.dom.forms.getValue(symbol_el );
  var qty    = goog.dom.forms.getValue(qty_el );
  var price  = goog.dom.forms.getValue(price_el );

  // validate
  if (goog.string.isEmpty(symbol)) {
    alert ('Instrumento não selecionado');
    return;
  }

  if (goog.string.isEmpty(qty) ||  parseFloat(qty) <= 0 ) {
    alert ('Quantidade inválida');
    return;
  }

  if (goog.string.isEmpty(price) ||  parseFloat(price) <= 0 ) {
    alert ('Preço inválido');
    return;
  }

  this.dispatchEvent(
      new bitex.ui.OrderEntryEvent(eventType,
                                   symbol,
                                   parseFloat(qty),
                                   parseFloat(price)  ) );

};



/**
 *
 * @param {string} type
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.OrderEntryEvent = function(type, symbol, qty, price) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.symbol = symbol;

  /**
   * @type {number}
   */
  this.qty = qty;

  /**
   * @type {number}
   */
  this.price = price;


};
goog.inherits(bitex.ui.OrderEntryEvent, goog.events.Event);

