goog.provide('bitex.view.WithdrawView');

goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawList');
goog.require('bitex.templates');
goog.require('bitex.util');
goog.require('goog.soy');
goog.require('goog.string');

/**
 * @param {*} app
 * @param {boolean=} opt_requests_from_customers
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.WithdrawView = function(app, opt_requests_from_customers, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.is_requests_from_customers_ = false;
  if (opt_requests_from_customers === true) {
    this.is_requests_from_customers_ = opt_requests_from_customers;
  }

  this.request_id_ = null;
  this.confirmation_token_ = null;
  this.withdraw_action_ = null;
  this.qr_data_ = null;
  this.qr_data_verb_ = null;
};
goog.inherits(bitex.view.WithdrawView, bitex.view.View);

/**
 * @type {bitex.ui.WithdrawList}
 */
bitex.view.WithdrawView.prototype.withdraw_list_table_;

bitex.view.WithdrawView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.WithdrawView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

/**
 * @override
 */
bitex.view.WithdrawView.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/**
 * @type {boolean}
 */
bitex.view.DepositView.prototype.is_requests_from_customers_;

/**
 * @type {number}
 */
bitex.view.WithdrawView.prototype.request_id_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.withdraw_action_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.confirmation_token_;

/**
 * @type {number}
 */
bitex.view.WithdrawView.prototype.amount_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.currency_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.method_;

/**
 * @type {Object}
 */
bitex.view.WithdrawView.prototype.data_;

/**
 * @type {Object}
 */
bitex.view.WithdrawView.prototype.qr_data_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.qr_data_verb_;


/**
 * @override
 */
bitex.view.WithdrawView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/**
 * @return {number}
 */
bitex.view.WithdrawView.prototype.getRequestId = function() {
  return this.request_id_;
};

/**
 * @return {number}
 */
bitex.view.WithdrawView.prototype.getAmount = function() {
  return this.amount_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getCurrency = function() {
  return this.currency_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getMethod = function() {
  return this.method_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getWithdrawAction = function() {
  return this.withdraw_action_;
};


/**
 * @return {Object}
 */
bitex.view.WithdrawView.prototype.getWithdrawData = function() {
  return this.data_;
};


/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListTableClick_ = function(e) {
  var element = e.target;
  if (element.tagName  === goog.dom.TagName.I ) {
    element = goog.dom.getParentElement(element);
  }

  var data_action = element.getAttribute('data-action');
  if (goog.isDefAndNotNull(data_action)) {
    e.preventDefault();
    e.stopPropagation();

    var data = goog.json.parse(element.getAttribute('data-row'));

    switch( data_action ) {
      case 'SHOW_QR':
        this.qr_data_ = {
          'Wallet': data['Data']['Wallet'],
          'Currency': data['Currency']
        };
        this.qr_data_verb_ = 'WITHDRAW';
        this.dispatchEvent(bitex.view.View.EventType.SHOW_QR);
        break;
    }
  }
};





bitex.view.WithdrawView.prototype.getConfirmationToken = function() {
  return this.confirmation_token_;
};

/**
 * @private
 */
bitex.view.WithdrawView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (goog.isDefAndNotNull(this.withdraw_list_table_)) {

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE,
                     this.onWithdrawListReponse_);


    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + model.get('UserID'),
                     this.onWithdrawRefresh_);

    handler.unlisten(this.withdraw_list_table_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onWithdrawListTableClick_);

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.CANCEL,
                     this.onUserCancelWithdraw_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.PROGRESS,
                     this.onUserSetWithdrawInProgress_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.COMPLETE,
                     this.onUserSetWithdrawComplete_ );


    this.removeChildren(true);
    //this.withdraw_list_table_.dispose();
  }

  this.withdraw_list_table_ = null;
  this.request_id_ = null;
};



/**
 * @private
 */
bitex.view.WithdrawView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  this.destroyComponents_();

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );


  var el;
  if (this.is_requests_from_customers_) {
    el = goog.dom.getElement('id_withdraw_request_list_table');
  } else {
    el = goog.dom.getElement('id_withdraw_list_table');
  }

  var currency_method_description_obj = {};
  var broker = model.get('Broker');
  if (model.get('IsBroker') && (this.is_requests_from_customers_ ) ) {
    broker = model.get('Profile');
    broker =  goog.array.find( model.get('BrokerList'), function(broker_obj) {
      if (broker_obj['BrokerID'] ==  model.get('UserID')) {
        return true;
      }
    });
  }

  goog.object.forEach( broker['WithdrawStructure'], function(method_list, currency){
    currency_method_description_obj[ currency ] = {};
    goog.array.forEach(method_list, function(method) {
      currency_method_description_obj[ currency ][method['method'] ] = method['description'];
    } );
  });

  if (model.get('IsBroker') && (this.is_requests_from_customers_ ) ) {
    this.withdraw_list_table_ =  new bitex.ui.WithdrawList(currency_method_description_obj,true, true);
  } else {
    this.withdraw_list_table_ =  new bitex.ui.WithdrawList(currency_method_description_obj,false, false);
  }

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onWithdrawListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawListReponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + model.get('UserID'),
                 this.onWithdrawRefresh_);



  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.CANCEL,
                 this.onUserCancelWithdraw_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.PROGRESS,
                 this.onUserSetWithdrawInProgress_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.COMPLETE,
                 this.onUserSetWithdrawComplete_ );


  this.addChild(this.withdraw_list_table_, true);

  this.withdraw_list_table_.setColumnFormatter('Amount', this.priceFormatter_, this);

  handler.listen(this.withdraw_list_table_.getElement(),
                 goog.events.EventType.CLICK,
                 this.onWithdrawListTableClick_);

};


/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.WithdrawView.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = rowSet['Currency'];
  var currency_description = this.getApplication().getCurrencyDescription(priceCurrency );

  if (value === 0 ) {
    return '-'
  }
  return goog.dom.createDom('abbr',
                            {'title': currency_description },
                            this.getApplication().formatCurrency(value/1e8, priceCurrency) );
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var conn = this.getApplication().getBitexConnection();

  var model = this.getApplication().getModel();
  var clientID = undefined;
  if (model.get('IsBroker') && (!this.is_requests_from_customers_ ) ) {
    clientID = model.get('UserID');
  }


  conn.requestWithdrawList(this.request_id_,
                           page,
                           limit,
                           ['1', '2', '4', '8'],
                           clientID,
                           filter  );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserCancelWithdraw_ = function(e) {
  this.withdraw_action_ = 'CANCEL';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserSetWithdrawInProgress_ = function(e) {
  this.withdraw_action_ = 'PROGRESS';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserSetWithdrawComplete_ = function(e) {
  this.withdraw_action_ = 'COMPLETE';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};


/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawRefresh_ = function(e) {
  var msg = e.data;

  if (!goog.isDefAndNotNull(this.withdraw_list_table_) ) {
    return;
  }
  this.withdraw_list_table_.insertOrUpdateRecord(msg, 0);
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.withdraw_list_table_) ) {
    return
  }

  var msg = e.data;

  this.withdraw_list_table_.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
};
