goog.provide('bitex.ui.AccountActivity');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');


/**
 * @desc Column ID of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_ID = goog.getMsg('ID');

/**
 * @desc Column Side of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_SIDE = goog.getMsg('Side');

/**
 * @desc Column Order Date of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_ORDER_DATE = goog.getMsg('Date/Time');

/**
 * @desc Column Price of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_PRICE = goog.getMsg('Price');

/**
 * @desc Column Qty of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_QTY = goog.getMsg('Qty');

/**
 * @desc Column Average Price of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_AVG_PX = goog.getMsg('Average Price');

/**
 * @desc Column Volume of the Account Activity
 */
var MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_VOLUME = goog.getMsg('Total');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.AccountActivity = function(opt_domHelper) {
  var grid_columns = [
    {
      'property': 'OrderID',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_ID,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'order-id'); }
    },{
      'property': 'Side',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_SIDE,
      'sortable': false,
      'formatter': function(s){
        switch(s){
          case '1': return 'C';
          case '2': return 'V';
        }
        return '';
      },
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'side'); }
    },{
      'property': 'OrderDate',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_ORDER_DATE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'order-date'); }
    },{
      'property': 'Price',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_PRICE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'price'); }
    },{
      'property': 'CumQty',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_QTY,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'cum-qty'); }
    },{
      'property': 'AvgPx',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_AVG_PX,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'avg-price'); }
    },{
      'property': 'Volume',
      'label': MSG_ACCOUNT_ACTIVITY_TABLE_COLUMN_VOLUME,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'vol'); }
    }
  ];

  bitex.ui.DataGrid.call(this,  { 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.AccountActivity, bitex.ui.DataGrid);


/**
 * @type {string}
 */
bitex.ui.AccountActivity.CSS_CLASS = goog.getCssName('account-activity');

/** @inheritDoc */
bitex.ui.AccountActivity.prototype.getCssClass = function() {
  return bitex.ui.AccountActivity.CSS_CLASS;
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.AccountActivity.prototype.getRowClass = function(row_set) {
  var side =  row_set['Side'];

  var class_status;
  switch(side) {
    case '1':
      class_status = goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'buy');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.AccountActivity.CSS_CLASS, 'sell');
      break;
  }

  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.AccountActivity.CSS_CLASS,
    function() {
      return new bitex.ui.AccountActivity();
    });
