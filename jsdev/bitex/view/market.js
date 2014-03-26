goog.provide('bitex.view.MarketView');
goog.require('bitex.view.View');

goog.require('bitex.templates');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.MarketView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.MarketView, bitex.view.View);



bitex.view.MarketView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  //handler.listen(model, bitex.model.Model.EventType.SET + 'Broker', this.onModelSetBroker_);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.MarketView.prototype.onModelSetBroker_ = function(e) {
  //var broker = e.data;
  //goog.soy.renderElement(goog.dom.getElement('my_broker'), bitex.templates.MarketView, {msg_broker:broker});
};
