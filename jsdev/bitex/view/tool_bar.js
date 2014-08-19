goog.provide('bitex.view.ToolBarView');
goog.require('bitex.view.View');

goog.require('bitex.model.Model');
goog.require('goog.style');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.ToolBarView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.ToolBarView, bitex.view.View);


bitex.view.ToolBarView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen( model, bitex.model.Model.EventType.SET + 'BrokerCurrencies', function(e){
    if (!model.get('IsBroker')) {
      var broker_currencies = model.get('BrokerCurrencies');
    }
  });

  handler.listen(model, bitex.model.Model.EventType.SET + 'Broker', function(e){
    var support_link_elements = goog.dom.getElementsByClass('bitex-support-link');
    goog.array.forEach(support_link_elements, function(el){
      el.href = model.get('Broker')['SupportURL'];
    });
  });


  handler.listen( model,  bitex.model.Model.EventType.SET + 'SecurityList', function(e){
    var msg = model.get('SecurityList');

  },this);


  handler.listen( model,  bitex.model.Model.EventType.SET + 'AllowedMarkets', function(e) {
    var allowed_markets = model.get('AllowedMarkets');
  }, this);

  handler.listen( goog.dom.getElement('id_button_connect_ws'), goog.events.EventType.CLICK, function(e){
    this.dispatchEvent( bitex.view.View.EventType.CONNECT_BITEX );
  });


};

