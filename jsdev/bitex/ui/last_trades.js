goog.provide('bitex.ui.LastTrades');

goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.object');

goog.require('goog.Timer');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.LastTrades = function (  opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
};
goog.inherits( bitex.ui.LastTrades, goog.ui.Component);

/**
 * @type {number}
 * @private
 */
bitex.ui.LastTrades.prototype.blink_delay_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.LastTrades.prototype.bodyEl_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.LastTrades.BASE_CSS_CLASS_ = goog.getCssName('last-trades');

bitex.ui.LastTrades.prototype.getBaseCssClass = function() {
  return bitex.ui.LastTrades.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.LastTrades.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  var dom = this.getDomHelper();
  this.bodyEl_ = dom.getElementsByTagNameAndClass('tbody', undefined, element)[0];
};


bitex.ui.LastTrades.prototype.clear  = function(){
  var dom = this.getDomHelper();
  goog.dom.removeChildren(this.bodyEl_);
};

/**
 * @param {string} date
 * @param {string} time
 * @param {string} symbol
 * @param {number} side
 * @param {number} size
 * @param {number} price
 * @param {string} buyer
 * @param {string} seller
 */
bitex.ui.LastTrades.prototype.publishTrade = function( date, time, symbol, side, price, size, buyer, seller ) {
  var dom = this.getDomHelper();

  if (side == 1) {
    side = "Buy";
  } else if (side == 2) {
    side = "Sell";
  }

  var price_currency  = symbol.substr(3,3);
  var size_currency   = symbol.substr(0,3);

  var dateEl   = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'date') , date);
  var timeEl   = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'time') , time);
  var sideEl   = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'side') , side);
  var priceEl  = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'price') , price + ' ' + price_currency);
  var sizeEl   = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'size'), size + ' ' + size_currency);
  var buyerEl  = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'buyer'), buyer);
  var sellerEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'seller'), seller);

  var td_list = [ timeEl, sideEl,  priceEl, sizeEl, buyerEl, sellerEl ];

  var tr_properties = {
    'class': goog.getCssName(this.getBaseCssClass(), 'row')
  };

  var rowEl = dom.createDom( 'tr', tr_properties , td_list );
  dom.insertChildAt(this.bodyEl_, rowEl, 0);

  var blink_class = goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( rowEl,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( rowEl,  blink_class );
  }, this.blink_delay_ , this);
};

