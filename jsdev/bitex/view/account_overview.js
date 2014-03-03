goog.provide('bitex.view.AccountOverview');

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
bitex.view.AccountOverview = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
  this.confirmation_token_ = null
};
goog.inherits(bitex.view.AccountOverview, bitex.view.View);


/**
 * @type {bitex.ui.AccountActivity}
 */
bitex.view.AccountOverview.prototype.customers_table_;


/**
 * @param {string} username
 */
bitex.view.AccountOverview.prototype.enterView = function(username) {
  console.log('AccountOverview:' + username);

  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

  if (!goog.isDefAndNotNull(selectedCustomer) || selectedCustomer['Username'] != username ) {
   // TODO: request user detail from the server
    return;
  }

  this.recreateComponents_(selectedCustomer);
};

bitex.view.AccountOverview.prototype.exitView = function() {
  this.destroyComponents_();
};

/**
 * @override
 */
bitex.view.AccountOverview.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * @type {number}
 */
bitex.view.AccountOverview.prototype.request_id_;

/**
 * @override
 */
bitex.view.AccountOverview.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getApplication().getModel();
  var handler = this.getHandler();
};


/**
 * @private
 */
bitex.view.AccountOverview.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();


  if (goog.isDefAndNotNull(this.customers_table_)) {

    handler.unlisten(this.customers_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawListReponse_);


    this.customers_table_.dispose();
  }

  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
  goog.dom.removeChildren(account_overview_header_el);

  this.customers_table_ = null;
  this.request_id_ = null;
};



/**
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.recreateComponents_ = function(customer) {
  var handler = this.getHandler();

  this.destroyComponents_();

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
  goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewHeader, {msg_customer_detail: customer});

  /*
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

  this.customers_table_ .decorate(goog.dom.getElement('id_customer_table'));
  */
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onCustomerListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestCustomerList(this.request_id_, undefined, undefined, filter, page, limit, [0,1]);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onCustomerListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.customers_table_) ) {
    return
  }
  var msg = e.data;
  this.customers_table_.setResultSet( msg['CustomerListGrp'], msg['Columns'] );
};


