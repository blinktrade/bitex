goog.provide('bitex.view.NullView');
goog.require('bitex.view.View');



/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.NullView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.NullView, bitex.view.View);


bitex.view.NullView.prototype.enterView = function() {
  console.log('enterView:' + this.getId());
};

bitex.view.NullView.prototype.exitView = function() {
  console.log('exitView:' + this.getId() );
};

