goog.provide('bitex.ui.Customers');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.json');

goog.require('goog.dom.TagName');


/**
 * @desc Column ID of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_ID = goog.getMsg('ID');

/**
 * @desc Column Username of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_USERNAME = goog.getMsg('Username');

/**
 * @desc Column Verified of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED = goog.getMsg('Verified');


/**
 * @desc Column Verified YES of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LI = goog.getMsg('Yes - Level I');

/**
 * @desc Column Verified YES of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LII = goog.getMsg('Yes - Level II');

/**
 * @desc Column Verified YES of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LIII = goog.getMsg('Yes - Level III');

/**
 * @desc Column Verified YES of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LIV = goog.getMsg('Yes - Level IV');


/**
 * @desc Column Verified PENDING of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_PROGRESS = goog.getMsg('Progress');

/**
 * @desc Column Verified PENDING of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_PENDING = goog.getMsg('Pending');

/**
 * @desc Column Verified NO of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_NO = goog.getMsg('No');

/**
 * @desc Column Email of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_EMAIL = goog.getMsg('Email');

/**
 * @desc Column Last login of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_LAST_LOGIN = goog.getMsg('Last seen');

/**
 * @desc Column Two step authentication of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED = goog.getMsg('Two step');

/**
 * @desc Column Verified YES of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED_YES = goog.getMsg('Yes');

/**
 * @desc Column Verified NO of the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED_NO = goog.getMsg('No');


/**
 * @desc Column Actions the Customer Table
 */
var MSG_CUSTOMER_TABLE_COLUMN_ACTION = goog.getMsg('Actions');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.Customers = function( opt_domHelper) {
  var grid_columns = [
   /* {
      'property': 'ID',
      'label': MSG_CUSTOMER_TABLE_COLUMN_ID,
      'sortable': true,
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'order-id'); }
    },*/{
      'property': 'Username',
      'label': MSG_CUSTOMER_TABLE_COLUMN_USERNAME,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'username'); }
    },{
      'property': 'Email',
      'label': MSG_CUSTOMER_TABLE_COLUMN_EMAIL,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'email'); }
    },{
      'property': 'Verified',
      'label': MSG_CUSTOMER_TABLE_COLUMN_VERIFIED,
      'sortable': false,
      'formatter': function(s){
        switch(s) {
          case 0:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_NO;
          case 1:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_PENDING;
          case 2:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_PROGRESS;
          case 3:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LI;
          case 4:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LII;
          case 5:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LIII;
          case 6:
            return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES_LIV;
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'verified'); }
    },{
      'property': 'TwoFactorEnabled',
      'label': MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED,
      'sortable': false,
      'formatter': function(s){
        if (s) {
          return MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED_YES;
        } else {
          return MSG_CUSTOMER_TABLE_COLUMN_TWO_FACTOR_ENABLED_NO;
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'two-steps'); }
    },{
      'property': 'LastLogin',
      'label': MSG_CUSTOMER_TABLE_COLUMN_LAST_LOGIN,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'last-login'); }
    },{
      'property': 'ID',
      'label': MSG_CUSTOMER_TABLE_COLUMN_ACTION,
      'sortable': true,
      'formatter': function(id, row_set_obj){
        /**
         * @desc Label for deposit button inside the customer table in broker view.
         */
        var MSG_CUSTOMER_TABLE_ACTION_DETAILS = goog.getMsg('details');

        var data_row = goog.json.serialize( row_set_obj );

        var classes = "btn btn-mini btn-primary btn-deposit";
        return goog.dom.createDom( 'button', { 'class':classes, 'data-row': data_row}, MSG_CUSTOMER_TABLE_ACTION_DETAILS );
      },
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'last-login'); }
    }
  ];

  this.selected_customer_ = null;


  /**
   * @desc Title  for the customers table
   */
  var MSG_CUSTOMERS_TABLE_TITLE = goog.getMsg('Customers');

  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER = goog.getMsg('Username or email...');

  var options = {
    'title': MSG_CUSTOMERS_TABLE_TITLE,
    'rowClassFn':this.getRowClass,
    'columns': grid_columns,
    'showSearch': true,
    'searchPlaceholder': MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER
  };
  bitex.ui.DataGrid.call(this,  options , opt_domHelper);
};
goog.inherits(bitex.ui.Customers, bitex.ui.DataGrid);


/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.Customers.EventType = {
  DETAIL: 'detail'
};


/**
 * @type {string}
 */
bitex.ui.Customers.CSS_CLASS = goog.getCssName('customers');

/** @inheritDoc */
bitex.ui.Customers.prototype.getCssClass = function() {
  return bitex.ui.Customers.CSS_CLASS;
};

/**
 * @type {Object}
 */
bitex.ui.Customers.prototype.selected_customer_;

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.Customers.prototype.getRowClass = function(row_set) {
  var class_status;
  if  (row_set['Verified'] == 2)  {
    class_status = goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'verified');
  } else if (row_set['Verified'] == 1) {

    class_status = goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'verification-pending');
  } else {
    class_status = goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'non-verified');
  }

  return  class_status;
};

/**
 * @return {Object}
 */
bitex.ui.Customers.prototype.getSelectedCustomer = function() {
  return this.selected_customer_;
};

/** @inheritDoc */
bitex.ui.Customers.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();

  handler.listen(this.getElement(), 'click', function(e){
    this.selected_customer_ = goog.json.parse(e.target.getAttribute('data-row'));

    if (goog.isDefAndNotNull(this.selected_customer_)) {
      this.dispatchEvent( bitex.ui.Customers.EventType.DETAIL );
    }
  });
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.Customers.CSS_CLASS,
    function() {
      return new bitex.ui.Customers();
    });
