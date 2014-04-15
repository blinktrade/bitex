goog.provide('bitex.ui.TradeHistory');

goog.require('goog.dom.classes');
goog.require('goog.object');

goog.require('goog.Timer');

goog.require('bitex.ui.DataGrid');

/**
 * @desc Column Market Pair
 */
var MSG_TRADE_HISTORY_COLUMN_MARKET = goog.getMsg('Market');

/**
 * @desc Column Time 
 */
var MSG_TRADE_HISTORY_COLUMN_CREATED = goog.getMsg('Date/Hour');

/**
 * @desc Column Side
 */
var MSG_TRADE_HISTORY_COLUMN_SIDE = goog.getMsg('Side');

/**
 * @desc Column Price
 */
var MSG_TRADE_HISTORY_COLUMN_PRICE = goog.getMsg('Price');

/**
 * @desc Column Size
 */
var MSG_TRADE_HISTORY_COLUMN_SIZE = goog.getMsg('Size');

/**
 * @desc Column Buyer
 */
var MSG_TRADE_HISTORY_COLUMN_BUYER = goog.getMsg('Buyer');

/**
 * @desc Column Seller
 */
var MSG_TRADE_HISTORY_COLUMN_SELLER = goog.getMsg('Seller');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.TradeHistory = function (opt_domHelper) {

  var grid_columns = [
    {
      'property': 'Market',
      'label': MSG_TRADE_HISTORY_COLUMN_MARKET,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'market'); }
    },{
      'property': 'Side',
      'label': MSG_TRADE_HISTORY_COLUMN_SIDE,
      'sortable': false,
      'formatter': function(s){
        switch(s){
          case '1': return 'C';
          case '2': return 'V';
        }
        return '';
      },
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'side'); }
    },{
      'property': 'Price',
      'label': MSG_TRADE_HISTORY_COLUMN_PRICE,
      'sortable': false,
      'formatter': function(value){return (value/1e8).toFixed(8);},      
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'price'); }
    },{
      'property': 'Size',
      'label': MSG_TRADE_HISTORY_COLUMN_SIZE,
      'sortable': false,
      'formatter': function(value){return (value/1e8).toFixed(8);},      
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'size'); }
    },{
      'property':'Buyer',
      'label': MSG_TRADE_HISTORY_COLUMN_BUYER,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'buyer'); }
    },{
      'property': 'Seller',
      'label': MSG_TRADE_HISTORY_COLUMN_SELLER,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'seller');}
    },{
      'property': 'Created',
      'label': MSG_TRADE_HISTORY_COLUMN_CREATED,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'created');}
    }
  ];

  this.selected_trade_ = null;

  bitex.ui.DataGrid.call(this,  { 'rowIDFn':this.getRowId, 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.TradeHistory, bitex.ui.DataGrid);

/**
 * @type {string}
 */
bitex.ui.TradeHistory.CSS_CLASS = goog.getCssName('trade-history');


/**
 * @param {Object} row_set
 * @return {string}
 */
bitex.ui.TradeHistory.prototype.getRowId = function(row_set) {
  return this.makeId(row_set['TradeID'] );
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.TradeHistory.prototype.getRowClass = function(row_set) {
  var side =  row_set['Status'];

  var class_status;
  switch(side) {
    case '0':
      class_status = goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'unconfirmed');
      break;
    case '1':
      class_status = goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'pending');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'processing');
      break;
    case '4':
      class_status = goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'complete');
      break;
    case '8':
      class_status = goog.getCssName(bitex.ui.TradeHistory.CSS_CLASS, 'cancelled');
      break;
  }
  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
  bitex.ui.TradeHistory.CSS_CLASS,
  function() {
    return new bitex.ui.TradeHistory();
  });
