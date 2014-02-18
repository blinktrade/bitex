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
 * @desc Column Currency of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_CURRENCY = goog.getMsg('Currency');

/**
 * @desc Column Amount of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_AMOUNT = goog.getMsg('Amount');

/**
 * @desc Column Created of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_CREATED = goog.getMsg('Date/Hour');

/**
 * @desc Column Wallet of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_WALLET = goog.getMsg('Wallet');

/**
 * @desc Column Detail of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_DETAIL = goog.getMsg('Details');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawList = function( opt_domHelper) {
  var grid_columns = [
    {
      'property': 'WithdrawID',
      'label': MSG_WITHDRAW_TABLE_COLUMN_ID,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'withdraw-id'); }
    },{
      'property': 'Status',
      'label': MSG_WITHDRAW_TABLE_COLUMN_STATUS,
      'sortable': false,
      'formatter': function(s){
        switch(s){
          case '0': return 'Não confirmado';
          case '1': return 'Pendente';
          case '2': return 'Finalizado';
        }
        return '';
      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'status'); }
    },{
      'property': 'Created',
      'label': MSG_WITHDRAW_TABLE_COLUMN_CREATED,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'created'); }
    },{
      'property': 'Currency',
      'label': MSG_WITHDRAW_TABLE_COLUMN_CURRENCY,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'currency'); }
    },{
      'property': 'Amount',
      'label': MSG_WITHDRAW_TABLE_COLUMN_AMOUNT,
      'sortable': false,
      'formatter': function(s, row_set_obj){
        if (row_set_obj['Type'] == "CRY" ) {
          return (s/1e8).toFixed(8); // is a crypto coin withdraw ?
        } else {
          return (s/1e8).toFixed(2);
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'amount'); }
    },{
      'property': 'Wallet',
      'label': MSG_WITHDRAW_TABLE_COLUMN_DETAIL,
      'sortable': false,
      'formatter': function(s, row_set_obj){
        delete row_set_obj['WithdrawID'];
        delete row_set_obj['Status'];
        delete row_set_obj['Amount'];
        delete row_set_obj['Currency'];
        delete row_set_obj['Created'];
        delete row_set_obj['Type'];
        delete row_set_obj['WithdrawID'];

        // remove the nulls
        var detail_obj = {};
        for (var key in row_set_obj) {
          if (goog.isDefAndNotNull(row_set_obj[key] )) {
            detail_obj[key] = row_set_obj[key];
          }
        }

        return JSON.stringify(detail_obj);
      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details'); }
    }
  ];

  bitex.ui.DataGrid.call(this,  { 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.WithdrawList, bitex.ui.DataGrid);


/**
 * @type {string}
 */
bitex.ui.WithdrawList.CSS_CLASS = goog.getCssName('withdraw-list');

/** @inheritDoc */
bitex.ui.WithdrawList.prototype.getCssClass = function() {
  return bitex.ui.WithdrawList.CSS_CLASS;
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.WithdrawList.prototype.getRowClass = function(row_set) {
  var side =  row_set['Status'];

  var class_status;
  switch(side) {
    case '1':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'pending');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'complete');
      break;
  }
  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.WithdrawList.CSS_CLASS,
    function() {
      return new bitex.ui.WithdrawList();
    });
