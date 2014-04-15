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

  this.market_data_subscription_id_ = null;
  this.market_data_subscription_symbol_ = null;
};
goog.inherits(bitex.view.MarketView, bitex.view.View);


/**
 * @type {number}
 */
bitex.view.MarketView.prototype.market_data_subscription_id_;

/**
 * @type {string}
 */
bitex.view.MarketView.prototype.market_data_subscription_symbol_;


bitex.view.MarketView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen( model,  bitex.model.Model.EventType.SET + 'SelectedSymbol', function(e) {
    var selected_symbol = model.get('SelectedSymbol');
    var symbol = selected_symbol.symbol;

    this.recreateLastTradesComponents_(selected_symbol);

  }, this);
};

bitex.view.MarketView.prototype.recreateLastTradesComponents_ = function( selected_symbol ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (this.market_data_subscription_symbol_ === selected_symbol.symbol) {
    return;
  }

  this.destroyLastTradesComponents_();

  this.last_trades = new bitex.ui.LastTrades();
  this.last_trades.decorate( goog.dom.getElement('last_trades_id') );  

  this.market_data_subscription_id_ = parseInt( 1e7 * Math.random() , 10 );
  this.market_data_subscription_symbol_ = selected_symbol.symbol;

  var conn = this.getApplication().getBitexConnection() ;

  handler.listen( conn , bitex.api.BitEx.EventType.TRADE_CLEAR + '.' + this.market_data_subscription_id_, this.onBitexTradesClear_ );
  handler.listen( conn , bitex.api.BitEx.EventType.TRADE + '.' + this.market_data_subscription_id_, this.onBitexTrade_ );

  this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_SUBSCRIBE);
};

bitex.view.MarketView.prototype.destroyLastTradesComponents_ = function( ) {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull(this.last_trades) ) {
    this.last_trades.dispose();
  }

  if (goog.isDefAndNotNull(this.market_data_subscription_id_)) {
    var conn = this.getApplication().getBitexConnection() ;

    handler.unlisten( conn , bitex.api.BitEx.EventType.TRADE_CLEAR + '.' + this.market_data_subscription_id_, this.onBitexTradesClear_ );
    handler.unlisten( conn , bitex.api.BitEx.EventType.TRADE + '.' + this.market_data_subscription_id_, this.onBitexTrade_ );

    this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_UNSUBSCRIBE);
    this.market_data_subscription_id_ = null;
    this.market_data_subscription_symbol_ = null;
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.MarketView.prototype.onBitexTradesClear_ = function(e) {
  if (goog.isDefAndNotNull(this.last_trades) ) {
  	this.last_trades.clear();
  }
}

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.MarketView.prototype.onBitexTrade_ = function(e) {
    var msg = e.data;
    
    var price =  (msg['MDEntryPx']/1e8);
    var size =  (msg['MDEntrySize']/1e8);

    // Workaround for satoshi square USD market
    var symbol = msg['Symbol'];
    var price_currency  = symbol.substr(3,3);
    var size_currency   = symbol.substr(0,3);

    this.last_trades.publishTrade(msg['MDEntryDate'],
                             msg['MDEntryTime'],
                             symbol,
                             msg['Side'],
                             this.getApplication().formatCurrency(price, price_currency),
                             this.getApplication().formatCurrency(size, size_currency),
                             msg['MDEntryBuyer'],
                             msg['MDEntrySeller'] );


    var last_price_key = 'last_price_' +  price_currency.toLowerCase();
    this.getApplication().getModel().set('formatted_' + last_price_key, this.getApplication().formatCurrency(price, price_currency));

    if (( this.pricemin_ == 0 ) || ( price < this.pricemin_ )) {
      var min_key = 'min_' +  price_currency.toLowerCase();

      this.getApplication().getModel().set('formatted_' + min_key, this.getApplication().formatCurrency(price, price_currency));
      this.pricemin_ = price;
    }

    if (( this.pricemax_ == 0 ) || ( price > this.pricemax_ )) {
      var max_key = 'max_' +  price_currency.toLowerCase();
      this.getApplication().getModel().set('formatted_' + max_key, this.getApplication().formatCurrency(price, price_currency));
      this.pricemax_ = price;
    }
};

/**
 * @return {number}
 */
bitex.view.MarketView.prototype.getMDSubscriptionId = function(){
  return this.market_data_subscription_id_;
};

/**
 * @return {Array.<string>}
 */
bitex.view.MarketView.prototype.getMDInstruments = function(){
  return [this.market_data_subscription_symbol_];
};

/**
 * @return {number}
 */
bitex.view.MarketView.prototype.getMDMarketDepth = function(){
  return 0;
};

/**
 * @return {Array.<string>}
 */
bitex.view.MarketView.prototype.getMDEntries = function(){
  return ['4', '1', '2'];
};
/**
 * @override
 * @protected
 */
bitex.view.MarketView.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.destroyLastTradesComponents_();
};
