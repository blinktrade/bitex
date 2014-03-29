goog.provide('bitex.view.SideBarView');
goog.provide('bitex.view.SideBarView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.model.Model');
goog.require('goog.style');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.SideBarView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.SideBarView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.SideBarView.EventType = {
  CHANGE_MARKET: 'changed_market'
};

bitex.view.SideBarView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen( model, bitex.model.Model.EventType.SET + 'BrokerCurrencies', function(e){
    goog.dom.removeChildren( goog.dom.getElement("id_account_summary_content"));

    if (!model.get('IsBroker')) {
      var broker_currencies = model.get('BrokerCurrencies');

      goog.soy.renderElement(goog.dom.getElement('id_account_summary_content'), bitex.templates.YourAccountSummary, {
        currencies: broker_currencies
      });
    }
  });


  handler.listen( model,  bitex.model.Model.EventType.SET + 'SecurityList', function(e){
    var msg = model.get('SecurityList');

    goog.dom.removeChildren(goog.dom.getElement('id_instrument_1'));
    goog.array.forEach(msg['Instruments'], function( instrument) {
      var el = goog.dom.createDom('option', {'value': instrument['Symbol'] }, instrument['Description']);
      goog.dom.appendChild( goog.dom.getElement('id_instrument_1'), el );
    }, this);
  },this);


  handler.listen( model,  bitex.model.Model.EventType.SET + 'AllowedMarkets', function(e) {
    var allowed_markets = model.get('AllowedMarkets');

    var allowed_markets_array = goog.object.getKeys(allowed_markets);
    if (allowed_markets_array.length > 0 ) {
      goog.dom.forms.setValue(goog.dom.getElement('id_instrument_1'), allowed_markets_array[0] );
      this.dispatchEvent(bitex.view.SideBarView.EventType.CHANGE_MARKET);
    }
  }, this);

  handler.listen(goog.dom.getElement('id_instrument_1'), goog.events.EventType.CHANGE  , function(e) {
    this.dispatchEvent(bitex.view.SideBarView.EventType.CHANGE_MARKET);
  }, this);

};


/**
 * @return {string}
 */
bitex.view.SideBarView.prototype.getSymbol = function() {
  return goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') );
};
