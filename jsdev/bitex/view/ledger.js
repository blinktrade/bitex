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

  goog.dom.removeChildren( goog.dom.getElement('id_ledger_list'));
};


/**
 * @private
 */
bitex.view.LedgerView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  this.destroyComponents_();


  /**
   * @desc deposit table title
   */
  var MSG_LEDGER_TABLE_TITLE  = goog.getMsg('Ledger');

  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_LEDGER_TABLE_SEARCH_PLACEHOLDER = goog.getMsg('Search ...');

  /**
   * @desc All currencies filter label on ledger table filters
   */
  var MSG_LEDGER_TABLE_SEARCH_ALL_CURRENCIES = goog.getMsg('All currencies');

  var broker_currencies = model.get('BrokerCurrencies');
  var button_filters = [ {'label': MSG_LEDGER_TABLE_SEARCH_ALL_CURRENCIES, 'value':'all' } ];
  goog.array.forEach(broker_currencies, function(currency_code){
    button_filters.push( { 'label':this.getApplication().getCurrencyDescription(currency_code), 'value':'CURRENCY=' + currency_code });
  }, this );

  goog.soy.renderElement(goog.dom.getElement('id_ledger_list'), bitex.templates.DataGrid, {
    id: 'id_ledger_list_table',
    title: MSG_LEDGER_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_LEDGER_TABLE_SEARCH_PLACEHOLDER,
    button_filters: button_filters
  });

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
  var filters_param = e.options['Filter'];

  var currency;
  var filters = [];
  if (goog.isArrayLike(filters_param)) {
    goog.array.forEach(filters_param, function(filter){
      if (filter.substr(0,9) == 'CURRENCY=') {
        currency = filter.substr(9);
      } else {
        filters.push(filter);
      }
    }, this);
  }

  var conn = this.getApplication().getBitexConnection();
  conn.requestLedgerList(this.request_id_, page, limit, undefined, currency, filters);
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
