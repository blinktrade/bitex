goog.provide('bitex.ui.WithdrawList');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');

/**
 * @desc Column ID of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_ID = goog.getMsg('ID');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS = goog.getMsg('Status');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS_PENDING = goog.getMsg('Pending');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS_UNCONFIRMED = goog.getMsg('Unconfirmed');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS_PROGRESS = goog.getMsg('In progress...');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS_COMPLETED = goog.getMsg('Completed');

/**
 * @desc Column Status of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_STATUS_CANCELLED = goog.getMsg('Cancelled');

/**
 * @desc Column Currency of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_CURRENCY = goog.getMsg('Currency');

/**
 * @desc Column Amount of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_AMOUNT = goog.getMsg('Amount');

/**
 * @desc Column Method of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_METHOD = goog.getMsg('Method');

/**
 * @desc Column Created of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_CREATED = goog.getMsg('Date/Hour');

/**
 * @desc Column Actions of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_ACTIONS = goog.getMsg('Actions');

/**
 * @desc Column Detail of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_DETAIL = goog.getMsg('Details');


/**
 * @param {boolean} opt_broker_mode
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawList = function( opt_broker_mode, opt_domHelper) {
  var broker_mode = false;
  if (opt_broker_mode === true) {
    broker_mode = true;
  }

  var grid_columns = [
    {
      'property': 'Created',
      'label': MSG_WITHDRAW_TABLE_COLUMN_CREATED,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'created'); }
    },{
      'property': 'Status',
      'label': MSG_WITHDRAW_TABLE_COLUMN_STATUS,
      'sortable': false,
      'formatter': function(s){
        var status = function(s) {
          switch(s){
            case '0': return [''          , MSG_WITHDRAW_TABLE_COLUMN_STATUS_UNCONFIRMED];
            case '1': return ['warning'   , MSG_WITHDRAW_TABLE_COLUMN_STATUS_PENDING];
            case '2': return ['info'      , MSG_WITHDRAW_TABLE_COLUMN_STATUS_PROGRESS];
            case '4': return ['success'   , MSG_WITHDRAW_TABLE_COLUMN_STATUS_COMPLETED];
            case '8': return ['important' , MSG_WITHDRAW_TABLE_COLUMN_STATUS_CANCELLED];
          }
          return ['',''];
        };
        var label_class_text = status(s);
        return goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ],  label_class_text[1] );
      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'status'); }
    },{
      'property': 'Currency',
      'label': MSG_WITHDRAW_TABLE_COLUMN_CURRENCY,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'currency'); }
    },{
      'property': 'Amount',
      'label': MSG_WITHDRAW_TABLE_COLUMN_AMOUNT,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'amount'); }
    },{
      'property':'Method',
      'label': MSG_WITHDRAW_TABLE_COLUMN_METHOD,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'method'); }
    },{
      'property': 'Data',
      'label': MSG_WITHDRAW_TABLE_COLUMN_DETAIL,
      'sortable': false,
      'formatter': function(data, rowSet){
        var element = goog.dom.createDom( 'table' );

        var reason_id = rowSet['ReasonID'];
        var reason    = rowSet['Reason'];

        if (goog.isDefAndNotNull(reason_id)) {
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_INSUFFICIENT_FUNDS = goog.getMsg('Insufficient funds');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_ACCOUNT_NOT_VERIFIED = goog.getMsg('Account not verified');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_SUSPICION_OF_FRAUD = goog.getMsg('Suspicion of fraud');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_DIFFERENT_ACCOUNT = goog.getMsg('Withdrawing to a different account than yours');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_INVALID_WALLET = goog.getMsg('Invalid wallet');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_INVALID_BANK_ACCOUNT = goog.getMsg('Invalid bank account');
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_OVER_LIMIT = goog.getMsg('Amount exceeded your daily withdraw limit');


          switch(reason_id) {
            case 0:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,reason ))) ;
              break;
            case -1:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_INSUFFICIENT_FUNDS ))) ;
              break;

            case -2:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_ACCOUNT_NOT_VERIFIED ))) ;
              break;

            case -3:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_SUSPICION_OF_FRAUD ))) ;
              break;
            case -4:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_DIFFERENT_ACCOUNT ))) ;
              break;
            case -5:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_INVALID_WALLET ))) ;
              break;
            case -6:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_INVALID_BANK_ACCOUNT ))) ;
              break;
            case -7:
              goog.dom.appendChild(element, goog.dom.createDom('tr', undefined,
                                                               goog.dom.createDom('td', {'colspan':2} ,MSG_WITHDRAW_REASON_OVER_LIMIT ))) ;
              break;
          }
        }

        goog.object.forEach(data, function(value, key) {
          var row_element =  goog.dom.createDom('tr', undefined,
                                                goog.dom.createDom('td', undefined, key ),
                                                goog.dom.createDom('td', undefined, value ));
          goog.dom.appendChild(element, row_element);
        }, this);

        return element;

      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details');}
    }
  ];

  if (broker_mode ){
    grid_columns.push({
      'property' : 'WithdrawID',
      'label': MSG_WITHDRAW_TABLE_COLUMN_ACTIONS,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'actions');},
      'formatter': function(s, row_set_obj){
        var data_row = goog.json.serialize( row_set_obj );

        /**
         * @desc Withdraw cancel button label in the  broker's withdraw list
         */
        var MSG_WITHDRAW_TABLE_COLUMN_ACTION_CANCEL = goog.getMsg('Cancel');

        var btn_cancel = goog.dom.createDom( 'button',
                                             { 'class':'btn btn-mini btn-danger btn-withdraw-cancel', 'data-row': data_row},
                                             MSG_WITHDRAW_TABLE_COLUMN_ACTION_CANCEL );

        /**
         * @desc Withdraw progress button label in the  broker's withdraw list
         */
        var MSG_WITHDRAW_TABLE_COLUMN_ACTION_PROGRESS = goog.getMsg('Set in progress');

        var btn_progress = goog.dom.createDom( 'button',
                                               { 'class':'btn btn-mini btn-primary btn-withdraw-progress', 'data-row': data_row},
                                               MSG_WITHDRAW_TABLE_COLUMN_ACTION_PROGRESS );


        /**
         * @desc Withdraw progress button label in the  broker's withdraw list
         */
        var MSG_WITHDRAW_TABLE_COLUMN_ACTION_COMPLETE = goog.getMsg('Set as complete');

        var btn_complete = goog.dom.createDom( 'button',
                                               { 'class':'btn btn-mini btn-success btn-withdraw-complete', 'data-row': data_row},
                                               MSG_WITHDRAW_TABLE_COLUMN_ACTION_COMPLETE );

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

  this.selected_withdraw_ = null;

  bitex.ui.DataGrid.call(this,  { 'rowIDFn':this.getRowId, 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.WithdrawList, bitex.ui.DataGrid);

/**
 * Events fired by Withdraw
 * @enum {string}
 */
bitex.ui.WithdrawList.EventType = {
  CANCEL: 'withdraw_cancel',
  PROGRESS: 'withdraw_progress',
  COMPLETE: 'withdraw_complete'
};

/**
 * @type {Object}
 */
bitex.ui.WithdrawList.prototype.selected_withdraw_;

/**
 * @type {string}
 */
bitex.ui.WithdrawList.CSS_CLASS = goog.getCssName('withdraw-list');

/** @inheritDoc */
bitex.ui.WithdrawList.prototype.getCssClass = function() {
  return bitex.ui.WithdrawList.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.WithdrawList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

/**
 * @return {Object}
 */
bitex.ui.WithdrawList.prototype.getWithdrawData = function() {
  return this.selected_withdraw_;
};

/**
 * @return {number}
 */
bitex.ui.WithdrawList.prototype.getWithdrawID = function() {
  if (goog.isDefAndNotNull(this.selected_withdraw_)){
    return this.selected_withdraw_['WithdrawID'];
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawList.prototype.handleClick_ = function(e) {
  this.selected_withdraw_ = goog.json.parse(e.target.getAttribute('data-row'));
  if (!goog.isDefAndNotNull(this.selected_withdraw_)) {
    return;
  }

  if (goog.dom.classes.has(e.target, 'btn-withdraw-complete' )) {
    this.dispatchEvent(bitex.ui.WithdrawList.EventType.COMPLETE);
  } else if (goog.dom.classes.has(e.target, 'btn-withdraw-progress' )) {
    this.dispatchEvent(bitex.ui.WithdrawList.EventType.PROGRESS);
  } else if (goog.dom.classes.has(e.target, 'btn-withdraw-cancel' )) {
    this.dispatchEvent(bitex.ui.WithdrawList.EventType.CANCEL);
  }

  this.selected_withdraw_ = null;
};


/**
 * @param {Object} row_set
 * @return {string}
 */
bitex.ui.WithdrawList.prototype.getRowId = function(row_set) {
  return this.makeId(row_set['WithdrawID'] );
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.WithdrawList.prototype.getRowClass = function(row_set) {
  var side =  row_set['Status'];

  var class_status;
  switch(side) {
    case '0':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'unconfirmed');
      break;
    case '1':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'pending');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'processing');
      break;
    case '4':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'complete');
      break;
    case '8':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'cancelled');
      break;
  }
  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.WithdrawList.CSS_CLASS,
    function() {
      return new bitex.ui.WithdrawList();
    });
