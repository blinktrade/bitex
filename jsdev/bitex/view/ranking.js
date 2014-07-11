goog.provide('bitex.view.RankingView');
goog.require('bitex.view.View');


/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.RankingView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.market_data_subscription_id_ = null;
  this.market_data_subscription_symbol_ = null;
};
goog.inherits(bitex.view.RankingView, bitex.view.View);


/**
 * @type {number}
 */
bitex.view.RankingView.prototype.market_data_subscription_id_;

/**
 * @type {Array.<string>}
 */
bitex.view.RankingView.prototype.market_data_subscription_symbol_;

/**
 * @type {bitex.ui.TradeHistory}
 */
bitex.view.RankingView.prototype.last_trades_table_;

/**
 * @type {bitex.ui.RankingViewTable}
 */
bitex.view.RankingView.prototype.market_view_table_;


bitex.view.RankingView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.RankingView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

bitex.view.RankingView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

/**
 * @override
 * @protected
 */
bitex.view.RankingView.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.destroyComponents_();
};

bitex.view.RankingView.prototype.recreateComponents_ = function() {
};

bitex.view.RankingView.prototype.destroyComponents_ = function( ) {
};

