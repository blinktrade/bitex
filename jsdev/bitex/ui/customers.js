goog.provide('bitex.ui.Customers');
goog.provide('bitex.ui.CustomersEvent');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

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
var MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES = goog.getMsg('Yes');

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
      'sortable': true,
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'email'); }
    },{
      'property': 'Verified',
      'label': MSG_CUSTOMER_TABLE_COLUMN_VERIFIED,
      'sortable': true,
      'formatter': function(s){
        if (s) {
          return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_YES;
        } else {
          return MSG_CUSTOMER_TABLE_COLUMN_VERIFIED_NO;
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

        var classes = "btn btn-mini btn-primary btn-deposit";
        return goog.dom.createDom( 'button', { 'class':classes, 'data-user-id':row_set_obj['ID'] }, MSG_CUSTOMER_TABLE_ACTION_DETAILS );
      },
      'classes': function() { return goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'last-login'); }
    }
  ];

  bitex.ui.DataGrid.call(this,  { 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
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
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.Customers.prototype.getRowClass = function(row_set) {
  var class_status;
  if  (row_set['Verified'])  {
    class_status = goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'verified');
  } else {
    class_status = goog.getCssName(bitex.ui.Customers.CSS_CLASS, 'non-verified');
  }

  return  class_status;
};



/** @inheritDoc */
bitex.ui.Customers.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();

  handler.listen(this.getElement(), 'click', function(e){
    var user_id = e.target.getAttribute('data-user-id');
    if (goog.isDefAndNotNull(user_id)) {
      this.dispatchEvent( new bitex.ui.CustomersEvent (bitex.ui.Customers.EventType.DETAIL, user_id) );
    }
  });
};


/**
 *
 * @param {string} type
 * @param {number} user_id
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.CustomersEvent = function(type, user_id) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.user_id = user_id;

};
goog.inherits(bitex.ui.OrderManagerEvent, goog.events.Event);



goog.ui.registry.setDecoratorByClassName(
    bitex.ui.Customers.CSS_CLASS,
    function() {
      return new bitex.ui.Customers();
    });
