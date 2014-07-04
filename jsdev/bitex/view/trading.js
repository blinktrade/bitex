goog.provide('bitex.view.TradingView');
goog.require('bitex.view.View');


goog.require('bitex.ui.OrderManager');

goog.require('bitex.templates');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.TradingView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.market_data_subscription_id_ = null;
  this.market_data_subscription_symbol_ = null;

  this.order_id_ = null;
  this.client_order_id = null;
  this.request_order_id_ = null;
};
goog.inherits(bitex.view.TradingView, bitex.view.View);


/**
 * @type {number}
 */
bitex.view.TradingView.prototype.market_data_subscription_id_;

/**
 * @type {string}
 */
bitex.view.TradingView.prototype.market_data_subscription_symbol_;

/**
 * @type {number}
 */
bitex.view.TradingView.prototype.order_id_;

/**
 * @type {number}
 */
bitex.view.TradingView.prototype.client_order_id;

/**
 * @type {bitex.ui.OrderManager}
 */
bitex.view.TradingView.prototype.order_manager_table_;


/**
 * @type {number}
 */
bitex.view.TradingView.prototype.request_order_id_;


bitex.view.TradingView.prototype.enterView = function() {
  var model = this.getApplication().getModel();
  var selected_symbol = model.get('SelectedSymbol');
  if (goog.isDefAndNotNull(selected_symbol)) {
    this.recreateComponents_(selected_symbol);
  }
};
bitex.view.TradingView.prototype.exitView = function() {
  this.destroyComponents_();
};


/**
 * @param {Element} element Element to decorate.
 * @protected
 */
bitex.view.TradingView.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * @private
 */
bitex.view.TradingView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull(this.market_data_subscription_id_)) {
    var conn = this.getApplication().getBitexConnection() ;

    this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_UNSUBSCRIBE);
    this.market_data_subscription_id_ = null;
    this.market_data_subscription_symbol_ = null;
  }


  if (goog.isDefAndNotNull(this.order_manager_table_)) {

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.EXECUTION_REPORT,
                     this.onExecutionReport_ );

    handler.unlisten(this.order_manager_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onOrderManagerRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE + '.' + this.request_order_id_,
                     this.onOrderListResponse_);


    this.order_manager_table_.dispose();
  }
  goog.dom.removeChildren( goog.dom.getElement('trading_order_entry_content'));

  this.order_manager_table_ = null;
  this.request_order_id_ = null;
};

/**
 * @param {*} selected_symbol
 * @private
 */
bitex.view.TradingView.prototype.recreateComponents_ = function( selected_symbol ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (this.market_data_subscription_symbol_ === selected_symbol.symbol) {
    return;
  }

  this.destroyComponents_();


  var buy_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntrySimple, {
    id: 'id_order_entry_buy',
    symbol:'',
    crypto_currency_symbol:'฿',
    crypto_currency_description:'Bitcoin',
    currency_symbol:'$',
    currency_description:'Dollar',
    side:1,
    type:2,
    broker_id:''
  });
  goog.dom.appendChild(goog.dom.getElement('trading_order_entry_content'), buy_order_entry_el);

  var sell_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntrySimple, {
    id: 'id_order_entry_sell',
    symbol:'',
    crypto_currency_symbol:'฿',
    crypto_currency_description:'Bitcoin',
    currency_symbol:'$',
    currency_description:'Dollar',
    side:2,
    type:2,
    broker_id:''
  });
  goog.dom.appendChild(goog.dom.getElement('trading_order_entry_content'), sell_order_entry_el);


  this.request_order_id_ = parseInt( 1e7 * Math.random() , 10 );

  var el = goog.dom.getElement('id_order_manager_table');
  this.order_manager_table_ =  new bitex.ui.OrderManager();

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.EXECUTION_REPORT,
                 this.onExecutionReport_ );

  handler.listen(this.order_manager_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onOrderManagerRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE + '.' + this.request_order_id_,
                 this.onOrderListResponse_);


  this.order_manager_table_.decorate(el);

  this.order_manager_table_.setColumnFormatter('Price', this.priceFormatter_, this);
  this.order_manager_table_.setColumnFormatter('AvgPx', this.priceFormatter_, this);
  this.order_manager_table_.setColumnFormatter('Volume', this.priceFormatter_, this);
  this.order_manager_table_.setColumnFormatter('CumQty', this.qtyFormatter_, this);


  this.market_data_subscription_id_ = parseInt( 1e7 * Math.random() , 10 );
  this.market_data_subscription_symbol_ = selected_symbol.symbol;

  this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_SUBSCRIBE);


};

bitex.view.TradingView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  handler.listen( model,  bitex.model.Model.EventType.SET + 'SelectedSymbol', function(e) {
    var selected_symbol = model.get('SelectedSymbol');
    var selected_broker_id = model.get('SelectedBrokerID');
    var selectedBroker = model.get('UserBrokers')[ selected_broker_id ];
    var symbol = selected_symbol.symbol;

    var market;
    if (goog.isDefAndNotNull(selectedBroker)) {
      market = selectedBroker['AllowedMarkets'][symbol];
    }

    this.recreateComponents_(selected_symbol);
  }, this);

  handler.listen(model, bitex.model.Model.EventType.SET + 'SelectedBrokerID', function(e){
    var selected_broker_id = model.get('SelectedBrokerID');
    var selected_symbol = goog.isDefAndNotNull(selected_broker_id) ? selected_broker_id.symbol : null;
    var selectedBroker = model.get('UserBrokers')[ selected_broker_id ];

    var market = selectedBroker['AllowedMarkets'][selected_symbol];
  });
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.TradingView.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = this.getApplication().getPriceCurrencyFromSymbol(rowSet['Symbol']);
  return this.getApplication().formatCurrency(value/1e8, priceCurrency, true);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.TradingView.prototype.qtyFormatter_ = function(value, rowSet) {
  var priceCurrency = this.getApplication().getQtyCurrencyFromSymbol(rowSet['Symbol']);
  return this.getApplication().formatCurrency(value/1e8, priceCurrency, true);
};


/**
 * @return {number}
 */
bitex.view.TradingView.prototype.getMDSubscriptionId = function(){
  return this.market_data_subscription_id_;
};

/**
 * @return {Array.<string>}
 */
bitex.view.TradingView.prototype.getMDInstruments = function(){
  return [this.market_data_subscription_symbol_];
};

/**
 * @return {number}
 */
bitex.view.TradingView.prototype.getMDMarketDepth = function(){
  return 1; // Top of the book
};

/**
 * @return {Array.<string>}
 */
bitex.view.TradingView.prototype.getMDEntries = function(){
  return ['0', '1']; // bid, ask
};

bitex.view.TradingView.prototype.getOrderId = function() {
  return this.order_id_;
};

bitex.view.TradingView.prototype.getClientOrderId = function() {
  return this.client_order_id_;
};


/**
 * @param {bitex.api.BitExEvent} e
 */
bitex.view.TradingView.prototype.onExecutionReport_ = function(e){
  if (!goog.isDefAndNotNull(this.order_manager_table_) ) {
    return;
  }
  this.order_manager_table_.processExecutionReport(e.data);
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.TradingView.prototype.onOrderManagerRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestOrderList(this.request_order_id_, page, limit, ['0', '1'] );
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.TradingView.prototype.onOrderListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.order_manager_table_) ) {
    return;
  }
  var msg = e.data;
  this.order_manager_table_.setResultSet(msg['OrdListGrp'], msg['Columns']);
};
