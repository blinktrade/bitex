goog.provide('bitex.view.DepositView');
goog.provide('bitex.view.DepositView.EventType');

goog.require('bitex.view.View');


goog.require('bitex.ui.DepositList');
goog.require('bitex.templates');
goog.require('bitex.util');
goog.require('goog.soy');
goog.require('goog.string');



/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.DepositView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
};
goog.inherits(bitex.view.DepositView, bitex.view.View);


/**
 * @type {bitex.ui.DepositList}
 */
bitex.view.DepositView.prototype.deposit_list_table_;

bitex.view.DepositView.prototype.enterView = function() {
  this.recreateComponents_();
};

bitex.view.DepositView.prototype.exitView = function() {
  this.destroyComponents_();
};


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
 * @type {number}
 */
bitex.view.DepositView.prototype.request_id_;


/**
 * @type {Object}
 */
bitex.view.DepositView.prototype.data_;


/**
 * @type {string}
 */
bitex.view.DepositView.prototype.action_;


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


bitex.view.DepositView.prototype.getRequestId = function() {
  return this.request_id_;
};


bitex.view.DepositView.prototype.getDepositAction = function() {
  return this.action_;
};

bitex.view.DepositView.prototype.getDepositData = function() {
  return this.data_;
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



/**
 * @private
 */
bitex.view.DepositView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (goog.isDefAndNotNull(this.deposit_list_table_)) {

    handler.unlisten(this.deposit_list_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onDepositListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE,
                     this.onDepositListReponse_);


    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + model.get('UserID'),
                     this.onDepositRefresh_);

    handler.unlisten(this.deposit_list_table_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onDepositListTableClick_);

    this.deposit_list_table_.dispose();
  }

  this.deposit_list_table_ = null;
  this.request_id_ = null;
};




/**
 * @private
 */
bitex.view.DepositView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  this.destroyComponents_();

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  var el = goog.dom.getElement('id_deposit_list_table');
  this.deposit_list_table_ =  new bitex.ui.DepositList();

  handler.listen(this.deposit_list_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onDepositListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE + '.' + this.request_id_,
                 this.onDepositListReponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + model.get('UserID'),
                 this.onDepositRefresh_);


  this.deposit_list_table_.decorate(el);

  this.deposit_list_table_.setColumnFormatter('Value', this.valuePriceFormatter_, this);

  handler.listen(this.deposit_list_table_.getElement(),
                 goog.events.EventType.CLICK,
                 this.onDepositListTableClick_);
};



/**
 * @param {goog.events.Event} e
 */
bitex.view.DepositView.prototype.onDepositListTableClick_ = function(e) {
  console.log('onDepositListTableClick_');
  var element = e.target;
  if (element.tagName  === goog.dom.TagName.I ) {
    element = goog.dom.getParentElement(element);
  }

  var data_action = element.getAttribute('data-action');
  if (goog.isDefAndNotNull(data_action)) {
    e.preventDefault();
    e.stopPropagation();

    this.action_ = data_action;
    this.data_ = goog.json.parse(element.getAttribute('data-row'));

    switch( data_action ) {
      case 'SHOW_QR':
        this.dispatchEvent(bitex.view.View.EventType.SHOW_QR);
        break;
      case 'UPLOAD':
        this.dispatchEvent(bitex.view.View.EventType.UPLOAD_RECEIPT);
        break;
      case 'CANCEL':
      case 'PROGRESS':
      case 'COMPLETE':
        this.dispatchEvent(bitex.view.View.EventType.PROCESS_DEPOSIT);
        break;
    }
  }
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.DepositView.prototype.valuePriceFormatter_ = function(value, rowSet) {
  var paid_value  = rowSet['PaidValue'];
  var priceCurrency = rowSet['Currency'];
  var currency_description = this.getApplication().getCurrencyDescription(priceCurrency );
  var formatted_value =  this.getApplication().formatCurrency(value/1e8, priceCurrency);

  if (value === 0 ) {
    if (paid_value  === 0){
      return '-';
    } else {
      value = paid_value;
    }
  } else if ( paid_value >0 && paid_value != value ) {
    var formatted_paid_value =  this.getApplication().formatCurrency(paid_value/1e8, priceCurrency);

    /**
     * @desc value abbrev title when paid value differs from declared value
     */
    var MSG_DEPOSIT_DIFFERENT_DECLARED_PAID_VALUE = goog.getMsg('declared / paid in {$currencyDesc}' , {
      currencyDesc:currency_description});

    return goog.dom.createDom('abbr', {'title': MSG_DEPOSIT_DIFFERENT_DECLARED_PAID_VALUE  },
                              formatted_value + ' / ' + formatted_paid_value  );

  } else {
    return goog.dom.createDom('abbr', {'title': currency_description }, formatted_value  );
  }
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.DepositView.prototype.onDepositListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];
  
  var conn = this.getApplication().getBitexConnection();
  conn.requestDepositList(this.request_id_, page, limit, ['0', '1', '2', '4', '8'] , undefined, filter );
};



/**
 * @param {goog.events.Event} e
 */
bitex.view.DepositView.prototype.onDepositRefresh_ = function(e) {
  var msg = e.data;

  if (!goog.isDefAndNotNull(this.deposit_list_table_) ) {
    return;
  }
  this.deposit_list_table_.insertOrUpdateRecord(msg, 0);
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.DepositView.prototype.onDepositListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.deposit_list_table_) ) {
    return
  }

  var msg = e.data;

  this.deposit_list_table_.setResultSet( msg['DepositListGrp'], msg['Columns'] );
};
