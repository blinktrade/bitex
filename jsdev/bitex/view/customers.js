goog.provide('bitex.view.CustomersView');

goog.require('bitex.view.View');

goog.require('bitex.ui.Customers');
goog.require('bitex.templates');

goog.require('goog.soy');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.CustomersView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
  this.confirmation_token_ = null
};
goog.inherits(bitex.view.CustomersView, bitex.view.View);


/**
 * @type {bitex.ui.Customers}
 */
bitex.view.CustomersView.prototype.customers_table_;



bitex.view.CustomersView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.CustomersView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

/**
 * @override
 */
bitex.view.CustomersView.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * @type {number}
 */
bitex.view.CustomersView.prototype.request_id_;

/**
 * @override
 */
bitex.view.CustomersView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

/**
 * @override
 */
bitex.view.CustomersView.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * @private
 */
bitex.view.CustomersView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();


  if (goog.isDefAndNotNull(this.customers_table_)) {

    handler.unlisten(this.customers_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawListReponse_);
  }
  this.removeChildren(true);
  this.customers_table_ = null;
  this.request_id_ = null;
};



/**
 * @private
 */
bitex.view.CustomersView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull( this.customers_table_)) {
    this.customers_table_.reload();
    return;
  }

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );


  this.customers_table_  = new bitex.ui.Customers();


  handler.listen(this.customers_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onCustomerListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.CUSTOMER_LIST_RESPONSE + '.' + this.request_id_,
                 this.onCustomerListReponse_);

  handler.listen(this.customers_table_,
                 bitex.ui.Customers.EventType.DETAIL,
                 this.onUserDetailsClick_ );

  this.addChild(this.customers_table_, true );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.CustomersView.prototype.onUserDetailsClick_ = function(e) {
  var data = e.target.getSelectedCustomer();
  this.getApplication().getModel().set('SelectedCustomer', data );
  this.getApplication().setView( 'account_overview/' + data['Username'] + '/');
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.CustomersView.prototype.onCustomerListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestCustomerList(this.request_id_, undefined, undefined, filter, page, limit, [0,1,2,3,4,5]);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.CustomersView.prototype.onCustomerListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.customers_table_) ) {
    return
  }
  var msg = e.data;
  this.customers_table_.setResultSet( msg['CustomerListGrp'], msg['Columns'] );
};


