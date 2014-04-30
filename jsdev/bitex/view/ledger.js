goog.provide('bitex.view.LedgerView');

goog.require('bitex.view.View');

goog.require('bitex.ui.LedgerActivity');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.LedgerView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
};
goog.inherits(bitex.view.LedgerView, bitex.view.View);

/**
 * @type {bitex.ui.LedgerActivity}
 * @private
 */
bitex.view.LedgerView.prototype.ledger_table_;

bitex.view.LedgerView.prototype.enterView = function() {
  this.recreateComponents_();
};

bitex.view.LedgerView.prototype.exitView = function() {
  this.destroyComponents_();
};

/**
 * @type {number}
 */
bitex.view.LedgerView.prototype.request_id_;

/**
 * @private
 */
bitex.view.LedgerView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();


  if (goog.isDefAndNotNull(this.ledger_table_)) {

    handler.unlisten(this.ledger_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onLedgerTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE,
                     this.onLedgerListResponse_);


    this.ledger_table_.dispose();
  }

  this.ledger_table_ = null;
  this.request_id_ = null;
};


/**
 * @private
 */
bitex.view.LedgerView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();

  this.destroyComponents_();

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  var el = goog.dom.getElement('id_ledger_list_table');
  this.ledger_table_ =  new bitex.ui.LedgerActivity();

  handler.listen(this.ledger_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onLedgerTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE + '.' + this.request_id_,
                 this.onLedgerListResponse_);

  this.ledger_table_.decorate(el);

  this.ledger_table_.setColumnFormatter('Amount',  this.amountFormatter_, this);
  this.ledger_table_.setColumnFormatter('Balance', this.balanceFormatter_, this);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.LedgerView.prototype.amountFormatter_ = function(value, rowSet) {
  if (rowSet['Operation'] == 'D') {
    value = value * -1;
  }
  return this.getApplication().formatCurrency(value/1e8, rowSet['Currency']);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.LedgerView.prototype.balanceFormatter_ = function(value, rowSet) {
  return this.getApplication().formatCurrency(value/1e8, rowSet['Currency']);
};

/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.LedgerView.prototype.onLedgerTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestLedgerList(this.request_id_, page, limit);
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.LedgerView.prototype.onLedgerListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.ledger_table_) ) {
    return
  }

  var msg = e.data;

  this.ledger_table_.setResultSet( msg['LedgerListGrp'], msg['Columns'] );
};
