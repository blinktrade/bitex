goog.provide('bitex.ui.BalanceInfo');

goog.require('goog.ui.Component');


/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.BalanceInfo = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
};
goog.inherits(bitex.ui.BalanceInfo, goog.ui.Component);


/**
 * @type {number}
 * @private
 */
bitex.ui.BalanceInfo.prototype.blink_delay_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.BalanceInfo.BASE_CSS_CLASS_ = goog.getCssName('balance-info');


/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.BalanceInfo.prototype.getBaseCssClass = function() {
  return bitex.ui.BalanceInfo.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.BalanceInfo.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  /*
  <div class="balance-info">
    <h6>Sua Conta</h6>
    <table class="data  balance-info">
      <tbody>
        <tr><td><strong>R$</strong></td><td ><span class="balance-info-brl"></span></td></tr>
        <tr><td><strong>฿</strong></td><td><span class="balance-info-btc"></span></td></tr>
      </tbody>
    </table>
  </div>
  */
};

/**
 * @param {number} value
 */
bitex.ui.BalanceInfo.prototype.updateBalanceBRL = function(value) {
  var el = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'brl'));
  var formatted_value = (value/1e5).toFixed(2);

  var blink_class = goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( el,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( el,  blink_class );
  }, this.blink_delay_ , this);

  goog.dom.setTextContent(el, formatted_value);
};

/**
 * @param {number} value
 */
bitex.ui.BalanceInfo.prototype.updateBalanceBTC = function(value) {
  var el = goog.dom.getElementByClass(goog.getCssName(this.getBaseCssClass(),'btc'));
  var formatted_value = (value/1e8).toFixed(2);

  var blink_class = goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( el,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( el,  blink_class );
  }, this.blink_delay_ , this);

  goog.dom.setTextContent(el, formatted_value);
};

