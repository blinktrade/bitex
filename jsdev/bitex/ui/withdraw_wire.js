goog.provide('bitex.ui.WithdrawWire');
goog.provide('bitex.ui.WithdrawWire.EventType');
goog.provide('bitex.ui.WithdrawWireEvent');

goog.require('goog.ui.Component');

goog.require('goog.string');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.WithdrawWire = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
};
goog.inherits(bitex.ui.WithdrawWire, goog.ui.Component);


/**
 * @type {number}
 * @private
 */
bitex.ui.WithdrawWire.prototype.blink_delay_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.WithdrawWire.BASE_CSS_CLASS_ = goog.getCssName('wire-withdraw');


/**
 * @enum {string}
 */
bitex.ui.WithdrawWire.EventType = {
  WITHDRAW_WIRE: 'withdraw_wire'
};

/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.WithdrawWire.prototype.getBaseCssClass = function() {
  return bitex.ui.WithdrawWire.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.WithdrawWire.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.WithdrawWire.prototype.enterDocument = function() {
  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  var buyBtn = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'submit'), this.getElement());
  handler.listen(buyBtn,
                 goog.events.EventType.CLICK,
                 goog.partial(this.onAction_,bitex.ui.WithdrawWire.EventType.WITHDRAW_WIRE ) );

};



/**
 * @param {bitex.ui.WithdrawWire.EventType} eventType
 * @param {goog.events.Event} e
 */
bitex.ui.WithdrawWire.prototype.onAction_ = function(eventType, e) {

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
      new bitex.ui.WithdrawWireEvent(eventType,
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
bitex.ui.WithdrawWireEvent = function(type, address, qty) {
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
goog.inherits(bitex.ui.WithdrawWireEvent, goog.events.Event);

