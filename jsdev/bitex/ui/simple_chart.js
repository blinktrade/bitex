goog.provide('bitex.ui.SimpleChart');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.SimpleChart.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.SimpleChart = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(bitex.ui.SimpleChart, goog.ui.Component);

/**
 * @type {string}
 */
bitex.ui.SimpleChart.CSS_CLASS = goog.getCssName('simple-chart');

/** @inheritDoc */
bitex.ui.SimpleChart.prototype.getCssClass = function() {
  return bitex.ui.SimpleChart.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.SimpleChart.prototype.createDom = function() {
  var topEl = goog.soy.renderAsElement(bitex.ui.SimpleChart.templates.SimpleChart, {
    symbol: this.getModel().symbol,
    height: this.getModel().height
  });
  this.setElementInternal(topEl);
};

bitex.ui.SimpleChart.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  this.setModel({symbol: this.getElement().getAttribute('data-symbol') } )
};


/**
 * @return {string}
 */
bitex.ui.SimpleChart.prototype.getSymbol = function(){
  return this.getModel().symbol;
};

/**
 * @param {string} symbol
 */
bitex.ui.SimpleChart.prototype.setSymbol = function(symbol){
  this.getModel().symbol = symbol;
  this.getElement().src = '/chart.html?s=' + symbol;
  this.getElement().setAttribute('data-symbol', symbol );
};

