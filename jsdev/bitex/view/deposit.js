goog.provide('bitex.view.DepositView');
goog.provide('bitex.view.DepositView.EventType');

goog.require('bitex.view.View');



/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.DepositView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.DepositView, bitex.view.View);



/**
 * @type {number}
 */
bitex.view.DepositView.prototype.amount_;

/**
 * @type {number}
 */
bitex.view.DepositView.prototype.method_;

/**
 * @type {string}
 */
bitex.view.DepositView.prototype.currency_;


/**
 * @return {number}
 */
bitex.view.DepositView.prototype.getAmount = function() {
  return this.amount_;
};

/**
 * @return {number}
 */
bitex.view.DepositView.prototype.getDepositMethodID = function() {
  return this.method_;
};

/**
 * @return {string}
 */
bitex.view.DepositView.prototype.getCurrency = function() {
  return this.currency_;
};


bitex.view.DepositView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen( model, bitex.model.Model.EventType.SET + 'BrokerCurrencies', function(e){
    goog.dom.removeChildren( goog.dom.getElement("id_deposit_balances_container"));

    var broker_currencies = model.get('BrokerCurrencies');
    goog.soy.renderElement(goog.dom.getElement('id_deposit_balances_container'), bitex.templates.AccountBalances, {
      currencies: broker_currencies,
      action: 'deposit'
    });

    model.updateDom();
  });

  handler.listen( this.getElement(), goog.events.EventType.CLICK, function(e){
    if (e.target.getAttribute('data-action') === 'deposit' ) {
      this.currency_ = e.target.getAttribute('data-currency');
      this.dispatchEvent(bitex.view.View.EventType.DEPOSIT_REQUEST);
    }
  }, this);

};

bitex.view.WithdrawView.prototype.showCurrencyDepositDialog = function(currency){
  var model = this.getApplication().getModel();



};

