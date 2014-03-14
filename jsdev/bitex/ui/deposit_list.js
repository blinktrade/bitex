goog.provide('bitex.ui.DepositList');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');

/**
 * @desc Column ID of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_ID = goog.getMsg('ID');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS = goog.getMsg('Status');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS_PENDING = goog.getMsg('Pending');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS_UNCONFIRMED = goog.getMsg('Unconfirmed');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS_PROGRESS = goog.getMsg('In progress...');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS_COMPLETED = goog.getMsg('Completed');

/**
 * @desc Column Status of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_STATUS_CANCELLED = goog.getMsg('Cancelled');

/**
 * @desc Column Currency of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_CURRENCY = goog.getMsg('Currency');

/**
 * @desc Column Amount of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_VALUE = goog.getMsg('Value');


/**
 * @desc Column Amount of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_PAID_VALUE = goog.getMsg('Paid Value');

/**
 * @desc Column Method of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_METHOD = goog.getMsg('Method');

/**
 * @desc Column Created of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_CREATED = goog.getMsg('Date/Hour');

/**
 * @desc Column Actions of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_ACTIONS = goog.getMsg('Actions');

/**
 * @desc Column Detail of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_DETAIL = goog.getMsg('Details');


/**
 * @param {boolean} opt_broker_mode
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.DepositList = function( opt_broker_mode, opt_domHelper) {
  var broker_mode = false;
  if (opt_broker_mode === true) {
    broker_mode = true;
  }

  var grid_columns = [
    {
      'property': 'Created',
      'label': MSG_DEPOSIT_TABLE_COLUMN_CREATED,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'created'); }
    },{
      'property': 'Status',
      'label': MSG_DEPOSIT_TABLE_COLUMN_STATUS,
      'sortable': false,
      'formatter': function(s){
        var status = function(s) {
          switch(s){
            case '0': return [''          , MSG_DEPOSIT_TABLE_COLUMN_STATUS_UNCONFIRMED];
            case '1': return ['warning'   , MSG_DEPOSIT_TABLE_COLUMN_STATUS_PENDING];
            case '2': return ['info'      , MSG_DEPOSIT_TABLE_COLUMN_STATUS_PROGRESS];
            case '4': return ['sucess'    , MSG_DEPOSIT_TABLE_COLUMN_STATUS_COMPLETED];
            case '8': return ['important' , MSG_DEPOSIT_TABLE_COLUMN_STATUS_CANCELLED];
          }
          return ['',''];
        };
        var label_class_text = status(s);
        return goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ],  label_class_text[1] );
      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'status'); }
    },{
      'property': 'Currency',
      'label': MSG_DEPOSIT_TABLE_COLUMN_CURRENCY,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'currency'); }
    },{
      'property': 'Value',
      'label': MSG_DEPOSIT_TABLE_COLUMN_VALUE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'value'); }
    },{
      'property': 'PaidValue',
      'label': MSG_DEPOSIT_TABLE_COLUMN_PAID_VALUE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'paid-value'); }
    },{
      'property':'DepositMethodName',
      'label': MSG_DEPOSIT_TABLE_COLUMN_METHOD,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'method'); }
    },{
      'property': 'Data',
      'label': MSG_DEPOSIT_TABLE_COLUMN_DETAIL,
      'sortable': false,
      'formatter': function(s, record){
        var row_set_obj = goog.object.clone(record);
        delete row_set_obj['MsgType'];
        delete row_set_obj['BrokerID'];
        delete row_set_obj['UserID'];
        delete row_set_obj['Status'];
        delete row_set_obj['Value'];
        delete row_set_obj['PaidValue'];
        delete row_set_obj['Type'];
        delete row_set_obj['Currency'];
        delete row_set_obj['Created'];
        delete row_set_obj['Method'];
        delete row_set_obj['DepositID'];
        delete row_set_obj['DepositMethodID'];
        delete row_set_obj['DepositMethodName'];


        // remove the nulls
        var detail_obj = {};
        for (var key in row_set_obj) {
          if (goog.isDefAndNotNull(row_set_obj[key] )) {
            detail_obj[key] = row_set_obj[key];
          }
        }
        return JSON.stringify(detail_obj);
      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'details');}
    }
  ];

  if (broker_mode ){
    grid_columns.push({
                        'property' : 'DepositID',
                        'label': MSG_DEPOSIT_TABLE_COLUMN_ACTIONS,
                        'sortable': false,
                        'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'actions');},
                        'formatter': function(s, row_set_obj){
                          var data_row = goog.json.serialize( row_set_obj );

                          /**
                           * @desc Deposit cancel button label in the  broker's deposit list
                           */
                          var MSG_DEPOSIT_TABLE_COLUMN_ACTION_CANCEL = goog.getMsg('Cancel');

                          var btn_cancel = goog.dom.createDom( 'button',
                                                               { 'class':'btn btn-mini btn-danger btn-deposit-cancel', 'data-row': data_row},
                                                               MSG_DEPOSIT_TABLE_COLUMN_ACTION_CANCEL );

                          /**
                           * @desc Deposit progress button label in the  broker's deposit list
                           */
                          var MSG_DEPOSIT_TABLE_COLUMN_ACTION_PROGRESS = goog.getMsg('Set in progress');

                          var btn_progress = goog.dom.createDom( 'button',
                                                                 { 'class':'btn btn-mini btn-primary btn-deposit-progress', 'data-row': data_row},
                                                                 MSG_DEPOSIT_TABLE_COLUMN_ACTION_PROGRESS );


                          /**
                           * @desc Deposit progress button label in the  broker's deposit list
                           */
                          var MSG_DEPOSIT_TABLE_COLUMN_ACTION_COMPLETE = goog.getMsg('Set as complete');

                          var btn_complete = goog.dom.createDom( 'button',
                                                                 { 'class':'btn btn-mini btn-success btn-deposit-complete', 'data-row': data_row},
                                                                 MSG_DEPOSIT_TABLE_COLUMN_ACTION_COMPLETE );

                          switch(row_set_obj['Status']){
                            case '0': return btn_cancel;
                            case '1': return [btn_cancel, btn_progress];
                            case '2': return [btn_cancel, btn_complete];
                            case '4': return "";
                            case '8': return "";
                          }
                        }
                      });
  }

  this.selected_deposit_ = null;

  bitex.ui.DataGrid.call(this,  { 'rowIDFn':this.getRowId, 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.DepositList, bitex.ui.DataGrid);

/**
 * Events fired by Deposit
 * @enum {string}
 */
bitex.ui.DepositList.EventType = {
  CANCEL: 'deposit_cancel',
  PROGRESS: 'deposit_progress',
  COMPLETE: 'deposit_complete'
};

/**
 * @type {Object}
 */
bitex.ui.DepositList.prototype.selected_deposit_;

/**
 * @type {string}
 */
bitex.ui.DepositList.CSS_CLASS = goog.getCssName('deposit-list');

/** @inheritDoc */
bitex.ui.DepositList.prototype.getCssClass = function() {
  return bitex.ui.DepositList.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.DepositList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

/**
 * @return {Object}
 */
bitex.ui.DepositList.prototype.getDepositData = function() {
  return this.selected_deposit_;
};

/**
 * @return {number}
 */
bitex.ui.DepositList.prototype.getDepositID = function() {
  if (goog.isDefAndNotNull(this.selected_deposit_)){
    return this.selected_deposit_['DepositID'];
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DepositList.prototype.handleClick_ = function(e) {
  this.selected_deposit_ = goog.json.parse(e.target.getAttribute('data-row'));
  if (!goog.isDefAndNotNull(this.selected_deposit_)) {
    return;
  }

  if (goog.dom.classes.has(e.target, 'btn-deposit-complete' )) {
    this.dispatchEvent(bitex.ui.DepositList.EventType.COMPLETE);
  } else if (goog.dom.classes.has(e.target, 'btn-deposit-progress' )) {
    this.dispatchEvent(bitex.ui.DepositList.EventType.PROGRESS);
  } else if (goog.dom.classes.has(e.target, 'btn-deposit-cancel' )) {
    this.dispatchEvent(bitex.ui.DepositList.EventType.CANCEL);
  }

  this.selected_deposit_ = null;
};


/**
 * @param {Object} row_set
 * @return {string}
 */
bitex.ui.DepositList.prototype.getRowId = function(row_set) {
  return this.makeId(row_set['DepositID'] );
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.DepositList.prototype.getRowClass = function(row_set) {
  var side =  row_set['Status'];

  var class_status;
  switch(side) {
    case '0':
      class_status = goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'unconfirmed');
      break;
    case '1':
      class_status = goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'pending');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'processing');
      break;
    case '4':
      class_status = goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'complete');
      break;
    case '8':
      class_status = goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'cancelled');
      break;
  }
  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.DepositList.CSS_CLASS,
    function() {
      return new bitex.ui.DepositList();
    });
