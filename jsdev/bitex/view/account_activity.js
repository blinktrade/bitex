goog.provide('bitex.view.AccountActivityView');

goog.require('bitex.view.View');

goog.require('bitex.ui.AccountActivity');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.AccountActivityView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_order_id_ = null;
};
goog.inherits(bitex.view.AccountActivityView, bitex.view.View);

/**
 * @type {bitex.ui.AccountActivity}
 */
bitex.view.AccountActivityView.prototype.account_activity_table_;

bitex.view.AccountActivityView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.AccountActivityView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

/**
 * @type {number}
 */
bitex.view.AccountActivityView.prototype.request_order_id_;

/**
 * @private
 */
bitex.view.AccountActivityView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();


  if (goog.isDefAndNotNull(this.account_activity_table_)) {
    
    handler.unlisten(this.account_activity_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onAccountActivityTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE,
                     this.onOrderListResponse_);


  }

  this.removeChildren(true);
  this.account_activity_table_ = null;
  this.request_order_id_ = null;
};


/**
 * @private
 */
bitex.view.AccountActivityView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();

  this.destroyComponents_();

  this.request_order_id_ = parseInt( 1e7 * Math.random() , 10 );

  this.account_activity_table_ =  new bitex.ui.AccountActivity();

  handler.listen(this.account_activity_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onAccountActivityTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE + '.' + this.request_order_id_,
                 this.onOrderListResponse_);

  this.addChild(this.account_activity_table_, true);

  this.account_activity_table_.setColumnFormatter('Price', this.priceFormatter_, this);
  this.account_activity_table_.setColumnFormatter('AvgPx', this.priceFormatter_, this);
  this.account_activity_table_.setColumnFormatter('Volume', this.priceFormatter_, this);
  this.account_activity_table_.setColumnFormatter('CumQty', this.qtyFormatter_, this);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.AccountActivityView.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = this.getApplication().getPriceCurrencyFromSymbol(rowSet['Symbol']);
  return this.getApplication().formatCurrency(value/1e8, priceCurrency, true);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.AccountActivityView.prototype.qtyFormatter_ = function(value, rowSet) {
  var priceCurrency = this.getApplication().getQtyCurrencyFromSymbol(rowSet['Symbol']);
  return this.getApplication().formatCurrency(value/1e8, priceCurrency, true);
};

/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.AccountActivityView.prototype.onAccountActivityTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestOrderList(this.request_order_id_, page, limit, ['1', '2'] );
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.AccountActivityView.prototype.onOrderListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.account_activity_table_) ) {
    return;
  }

  var msg = e.data;



  this.account_activity_table_.setResultSet( msg['OrdListGrp'], msg['Columns'] );
};
