goog.provide('bitex.view.AccountOverview');

goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawList');
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
};
goog.inherits(bitex.view.AccountOverview, bitex.view.View);


/**
 * @type {bitex.ui.AccountActivity}
 */
bitex.view.AccountOverview.prototype.  withdraw_list_table_ ;


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
  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');
  this.destroyComponents_(selectedCustomer);
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
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.destroyComponents_ = function(customer ) {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull(this.withdraw_list_table_)) {

    handler.unlisten(this.withdraw_list_table_ ,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawListReponse_);

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.CANCEL,
                     this.onUserCancelWithdraw_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.PROGRESS,
                     this.onUserSetWithdrawInProgress_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.COMPLETE,
                     this.onUserSetWithdrawComplete_ );

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawProcessResponse_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + customer['ID'],
                     this.onWithdrawRefresh_);


    this.withdraw_list_table_ .dispose();
  }

  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
  goog.dom.removeChildren(account_overview_header_el);

  this.withdraw_list_table_  = null;
  this.request_id_ = null;
};



/**
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.recreateComponents_ = function(customer) {
  var handler = this.getHandler();

  this.destroyComponents_(customer);

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
  goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewHeader, {msg_customer_detail: customer});

  this.withdraw_list_table_ =  new bitex.ui.WithdrawList( true);


  handler.listen(this.withdraw_list_table_ ,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onWithdrawListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawListReponse_);

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.CANCEL,
                 this.onUserCancelWithdraw_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.PROGRESS,
                 this.onUserSetWithdrawInProgress_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.COMPLETE,
                 this.onUserSetWithdrawComplete_ );


  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawProcessResponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + customer['ID'],
                 this.onWithdrawRefresh_);


  this.withdraw_list_table_.decorate(goog.dom.getElement('account_overview_withdraw_requests_table_id'));
  this.withdraw_list_table_.setColumnFormatter('Amount', this.priceFormatter_, this);


};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserCancelWithdraw_ = function(e) {
  var withdraw_data = e.target.getWithdrawData();

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE = goog.getMsg('Cancelling withdraw [{$id}]', {id: withdraw_data['WithdrawID']});

  var formatted_value = this.getApplication().formatCurrency(withdraw_data['Amount']/1e8, withdraw_data['Currency'] );

  this.getApplication().showNotification('danger', MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE, formatted_value);

  this.getApplication().getBitexConnection().processWithdraw(this.request_id_,'CANCEL', withdraw_data['WithdrawID'], -10);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserSetWithdrawInProgress_ = function(e) {
  var withdraw_data = e.target.getWithdrawData();

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE = goog.getMsg('Setting Withdraw [{$id}] in progress', {id: withdraw_data['WithdrawID']});

  var formatted_value = this.getApplication().formatCurrency(withdraw_data['Amount']/1e8, withdraw_data['Currency'] );

  this.getApplication().showNotification('info', MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE, formatted_value);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserSetWithdrawComplete_ = function(e) {
  var withdraw_data = e.target.getWithdrawData();

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE = goog.getMsg('Setting Withdraw [{$id}] as completed', {id: withdraw_data['WithdrawID']});

  var formatted_value = this.getApplication().formatCurrency(withdraw_data['Amount']/1e8, withdraw_data['Currency'] );

  this.getApplication().showNotification('success', MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE, formatted_value);

};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];

  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

  var conn = this.getApplication().getBitexConnection();
  conn.requestWithdrawList(this.request_id_, page, limit, ['1', '2', '4', '8'], selectedCustomer['ID']);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.AccountOverview.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = rowSet['Currency'];
  return this.getApplication().formatCurrency(value/1e8, priceCurrency);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.withdraw_list_table_ ) ) {
    return
  }
  var msg = e.data;
  this.withdraw_list_table_.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawProcessResponse_ = function(e) {
  var msg = e.data;
  console.log(goog.debug.deepExpose(msg));
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawRefresh_ = function(e) {
  var msg = e.data;
  delete msg['MsgType'];
  this.withdraw_list_table_.insertOrUpdateRecord(msg, 0);
};

