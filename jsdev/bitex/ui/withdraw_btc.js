goog.provide('bitex.ui.WithdrawBTC');
goog.provide('bitex.ui.WithdrawBTC.EventType');
goog.provide('bitex.ui.WithdrawBTCEvent');

goog.require('goog.ui.Component');

goog.require('goog.string');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.WithdrawBTC = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
};
goog.inherits(bitex.ui.WithdrawBTC, goog.ui.Component);


/**
 * @type {number}
 * @private
 */
bitex.ui.WithdrawBTC.prototype.blink_delay_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.WithdrawBTC.BASE_CSS_CLASS_ = goog.getCssName('btc-withdraw');


/**
 * @enum {string}
 */
bitex.ui.WithdrawBTC.EventType = {
  WITHDRAW_BTC: 'withdraw_btc'
};

/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.WithdrawBTC.prototype.getBaseCssClass = function() {
  return bitex.ui.WithdrawBTC.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.WithdrawBTC.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.WithdrawBTC.prototype.enterDocument = function() {
  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  var buyBtn = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'submit'), this.getElement());
  handler.listen(buyBtn,
                 goog.events.EventType.CLICK,
                 goog.partial(this.onAction_,bitex.ui.WithdrawBTC.EventType.WITHDRAW_BTC ) );

};



/**
 * @param {bitex.ui.WithdrawBTC.EventType} eventType
 * @param {goog.events.Event} e
 */
bitex.ui.WithdrawBTC.prototype.onAction_ = function(eventType, e) {

  var address_el    = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'address'));
  var qty_el  = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'qty'));

  var address  = goog.dom.forms.getValue(address_el );
  var qty    = goog.dom.forms.getValue(qty_el );

  // validate
  if (goog.string.isEmpty(address)) {
    alert ('Endereço não selecionado');
    return;
  }

  if (goog.string.isEmpty(qty) ||  parseFloat(qty) <= 0 ) {
    alert ('Quantidade inválida');
    return;
  }

  this.dispatchEvent(
      new bitex.ui.WithdrawBTCEvent(eventType,
                                   address,
                                   parseFloat(qty) ) );

};



/**
 *
 * @param {string} type
 * @param {string} address
 * @param {number} qty
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.WithdrawBTCEvent = function(type, address, qty) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.address = address;

  /**
   * @type {number}
   */
  this.qty = qty;


};
goog.inherits(bitex.ui.WithdrawBTCEvent, goog.events.Event);

