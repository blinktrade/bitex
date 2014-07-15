goog.provide('bitex.ui.LedgerActivity');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');


/**
 * @desc Column ID of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_ID = goog.getMsg('ID');

/**
 * @desc Column  Date / Time of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_DATE_TIME = goog.getMsg('Date/Time');

/**
 * @desc Column Currency of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_CURRENCY = goog.getMsg('Currency');

/**
 * @desc Column Amount of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_AMOUNT = goog.getMsg('Amount');

/**
 * @desc Column Balance of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_BALANCE = goog.getMsg('Balance');

/**
 * @desc Column Operation of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_OPERATION = goog.getMsg('Operation');

/**
 * @desc Column Description of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_DESCRIPTION = goog.getMsg('Description');

/**
 * @desc Column Account Name of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_ACCOUNT_NAME = goog.getMsg('Account');


/**
 * @desc Column Payee of the Ledger Activity
 */
var MSG_LEDGER_ACTIVITY_TABLE_COLUMN_PAYEE = goog.getMsg('Payee');


/**
 * @param {*} button_filters
 * @param {boolean} opt_broker_mode
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.ui.DataGrid}
 */
bitex.ui.LedgerActivity = function(button_filters, opt_broker_mode, opt_domHelper) {
  var broker_mode = false;
  if (opt_broker_mode === true) {
    broker_mode = opt_broker_mode;
  }


  var grid_columns = [
    {
      'property': 'Created',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_DATE_TIME,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'date-time'); }
    },{
      'property': 'Currency',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_CURRENCY,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'currency'); }
    },{
      'property': 'Description',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_DESCRIPTION,
      'sortable': false,
      'formatter': function(s, rowSet){
        /**
         * @desc Ledger deposit description
         */
        var MSG_LEDGER_DEPOSIT_DESCRIPTION = goog.getMsg('Deposit');

        /**
         * @desc Ledger withdraw description
         */
        var MSG_LEDGER_WITHDRAW_DESCRIPTION = goog.getMsg('Withdraw');

        /**
         * @desc Ledger deposit fee description
         */
        var MSG_LEDGER_DEPOSIT_FEE_DESCRIPTION = goog.getMsg('Fee on deposit');

        /**
         * @desc Ledger withdraw fee description
         */
        var MSG_LEDGER_WITHDRAW_FEE_DESCRIPTION = goog.getMsg('Fee on withdraw');

        /**
         * @desc Ledger trade  description
         */
        var MSG_LEDGER_TRADE_DESCRIPTION = goog.getMsg('Trade');

        /**
         * @desc Ledger trade fee description
         */
        var MSG_LEDGER_TRADE_FEE_DESCRIPTION = goog.getMsg('Fee on trade');


        /**
         * @desc Ledger trade  description
         */
        var MSG_LEDGER_TRADE_BONUS_DESCRIPTION = goog.getMsg('Bonus');

        switch(s) {
          case 'B':
            return MSG_LEDGER_TRADE_BONUS_DESCRIPTION;
          case 'D':
            return MSG_LEDGER_DEPOSIT_DESCRIPTION;
          case 'DF':
            return MSG_LEDGER_DEPOSIT_FEE_DESCRIPTION;
          case 'W':
            return MSG_LEDGER_WITHDRAW_DESCRIPTION;
          case 'WF':
            return MSG_LEDGER_WITHDRAW_FEE_DESCRIPTION;
          case 'T':
            return MSG_LEDGER_TRADE_DESCRIPTION;
          case 'TF':
            return MSG_LEDGER_TRADE_FEE_DESCRIPTION;
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'description'); }
    },{
      'property': 'PayeeName',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_PAYEE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'payee'); }
    },{
      'property': 'Amount',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_AMOUNT,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'amount'); }
    },{
      'property': 'Balance',
      'label': MSG_LEDGER_ACTIVITY_TABLE_COLUMN_BALANCE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'balance'); }
    }
  ];

  /**
   * @desc deposit table title
   */
  var MSG_LEDGER_ACTIVITY_TITLE  = goog.getMsg('Ledger');

  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_LEDGER_ACTIVITY_SEARCH_PLACEHOLDER = goog.getMsg('Search ...');

  var options = {
    'title': MSG_LEDGER_ACTIVITY_TITLE,
    'showSearch': true,
    'searchPlaceholder': MSG_LEDGER_ACTIVITY_SEARCH_PLACEHOLDER,
    'buttonFilters': button_filters,
    'rowClassFn':this.getRowClass,
    'columns': grid_columns
  };

  bitex.ui.DataGrid.call(this,  options , opt_domHelper);
};
goog.inherits(bitex.ui.LedgerActivity, bitex.ui.DataGrid);


/**
 * @type {string}
 */
bitex.ui.LedgerActivity.CSS_CLASS = goog.getCssName('ledger-activity');

/** @inheritDoc */
bitex.ui.LedgerActivity.prototype.getCssClass = function() {
  return bitex.ui.LedgerActivity.CSS_CLASS;
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.LedgerActivity.prototype.getRowClass = function(row_set) {
  var operation =  row_set['Operation'];

  var class_status;
  switch(operation) {
    case 'D':
      class_status = goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'debit');
      break;
    case 'C':
      class_status = goog.getCssName(bitex.ui.LedgerActivity.CSS_CLASS, 'credit');
      break;
  }
  return  class_status;
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.LedgerActivity.CSS_CLASS,
    function() {
      return new bitex.ui.LedgerActivity();
    });
