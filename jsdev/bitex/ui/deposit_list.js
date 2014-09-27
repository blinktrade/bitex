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
var MSG_DEPOSIT_TABLE_COLUMN_CTRL_NUMBER = goog.getMsg('Control Number');

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
 * @desc Column Username of the Deposit List
 */
var MSG_DEPOSIT_TABLE_COLUMN_USERNAME = goog.getMsg('Username');


/**
 * @param {Array.<Object>} crypto_currencies_def
 * @param {boolean} opt_broker_mode
 * @param {boolean} opt_show_customers
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.DepositList = function( crypto_currencies_def, opt_broker_mode, opt_show_customers ,opt_domHelper) {
  var broker_mode = false;
  if (opt_broker_mode === true) {
    broker_mode = opt_broker_mode;
  }

  var show_customers = false;
  if (opt_show_customers === true ) {
    show_customers = opt_show_customers;
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
      'formatter': function(s, rowSet){
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

        var progress_message = MSG_DEPOSIT_TABLE_COLUMN_STATUS_PROGRESS;
        var number_of_necessary_confirmations = null;
        if (rowSet['Type'] == 'CRY' ) {
          // search for currency
          var crypto_currency_def = goog.array.find(crypto_currencies_def,function(c){
            if (c['CurrencyCode'] == rowSet['Currency']  ) {
              return true;
            }
          });

          if (goog.isDefAndNotNull(crypto_currency_def)) {
            var confirmation_info_array;
            if (goog.isDefAndNotNull(rowSet['PaidValue']) && rowSet['PaidValue'] > 0 ) {
              confirmation_info_array = goog.array.find( crypto_currency_def['Confirmations'], function(conf_info){
                if ( rowSet['PaidValue'] >= conf_info[0]  &&  rowSet['PaidValue'] < conf_info[1] ) {
                  return true;
                }
              });
            }
            if (goog.isDefAndNotNull(confirmation_info_array)) {
              number_of_necessary_confirmations = confirmation_info_array[2];

              var number_of_confirmations = 0;
              if (goog.isDef(rowSet['Data']) && goog.isDef(rowSet['Data']['Confirmations'] ) ) {
                number_of_confirmations = rowSet['Data']['Confirmations'] ;
              }

              /**
               * @desc status message for confirming crypto coin deposits
               */
              var MSG_PROGRESS_MESSAGE_FOR_CRYPTO_CURRENCY =
                  goog.getMsg('{$confirmations} of {$necessaryconfirmations} confirmations',{
                    'confirmations': number_of_confirmations,
                    'necessaryconfirmations': number_of_necessary_confirmations
                  });

              progress_message = MSG_PROGRESS_MESSAGE_FOR_CRYPTO_CURRENCY;
            }
          }
        }

        var status = function(s) {
          switch(s){
            case '0': return [''          , MSG_DEPOSIT_TABLE_COLUMN_STATUS_UNCONFIRMED];
            case '1': return ['warning'   , MSG_DEPOSIT_TABLE_COLUMN_STATUS_PENDING];
            case '2': return ['info'      , progress_message];
            case '4': return ['success'   , MSG_DEPOSIT_TABLE_COLUMN_STATUS_COMPLETED];
            case '8': return ['important' , MSG_DEPOSIT_TABLE_COLUMN_STATUS_CANCELLED];
          }
          return ['',''];
        };
        var label_class_text = status(s);
        return goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ],  label_class_text[1] );
      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'status'); }
    },{
      'property': 'Value',
      'label': MSG_DEPOSIT_TABLE_COLUMN_VALUE,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'value'); }
    },{
      'property':'ControlNumber',
      'label': MSG_DEPOSIT_TABLE_COLUMN_CTRL_NUMBER,
      'sortable': false,
      'formatter': function(value, rowSet) {
        switch (rowSet['Type'] ) {
          case 'CRY':
            var top_el =  goog.dom.createDom('div');
            goog.style.setStyle(top_el, 'position', 'relative');
            goog.style.setWidth(top_el, 120);


            var inner_el = goog.dom.createDom('div',
                                              undefined,
                                              goog.dom.createDom('span', undefined, rowSet['Data']['InputAddress']) );

            if (rowSet['Currency'] == 'BTC') {

              var blockchain_address = 'https://blockchain.info/address/'  + rowSet['Data']['InputAddress'];
              switch (rowSet['Data']['InputAddress'][0]) {
                case 'm':
                case 'n':
                case '2':
                case '9':
                case 'c':
                  blockchain_address = 'https://test-insight.bitpay.com/address/'  + rowSet['Data']['InputAddress'];
              }

              inner_el = goog.dom.createDom('div',
                                            undefined,
                                            goog.dom.createDom('a',
                                                               {
                                                                 href:blockchain_address,
                                                                 target:'blank_'
                                                               }, rowSet['Data']['InputAddress']) );

            }

            goog.style.setFloat(inner_el, 'left');
            goog.style.setStyle(inner_el, 'max-width', '110px' );
            goog.style.setStyle(inner_el, 'overflow', 'hidden');
            goog.style.setStyle(inner_el, 'text-overflow', 'ellipsis');
            goog.style.setStyle(inner_el, 'white-space', 'nowrap');

            goog.dom.appendChild(top_el, inner_el);
            return top_el;
          default:
            return '' + value;
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'method'); }
    },{
      'property': 'Data',
      'label': MSG_DEPOSIT_TABLE_COLUMN_DETAIL,
      'sortable': false,
      'formatter': function(value, rowSet){
        var data_row = goog.json.serialize( rowSet );

        /**
         * @desc Deposit delete button label in the  broker's deposit list
         */
        var MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_VIEW  = goog.getMsg('view');

        /**
         * @desc Deposit delete button label in the  broker's deposit list
         */
        var MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_QR  = goog.getMsg('qr');

        /**
         * @desc Deposit delete button label in the  broker's deposit list
         */
        var MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_TRANSACTION  = goog.getMsg('blockchain');

        var btn_view = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-info btn-deposit-view',
          'href': '/get_deposit?deposit_id=' + rowSet['DepositID'],
          'target':'_blank'
        },MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_VIEW,' ' ,goog.dom.createDom( 'i', ['icon-white', 'icon-eye-open']));

        var btn_qr = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-info btn-deposit-view-qr',
          'href':'#',
          'data-action':'SHOW_QR',
          'data-row': data_row
        },MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_QR,' ' , goog.dom.createDom( 'i', ['icon-white', 'icon-qrcode']));


        switch (rowSet['Type'] ) {
          case 'CRY':
            switch( rowSet['Status'] ) {
              case '0':
              case '1':
                return goog.dom.createDom('div', 'btn-group',[btn_qr] ) ;
              case '2':
              case '4':
              case '8':
                return '';
            }
            break;

          case 'BBS':
          case 'WTP':
          case 'DTP':
            switch( rowSet['Status'] ) {
              case '0':
              case '1':
                return goog.dom.createDom('div', 'btn-group',[btn_view]);
              case '2':
              case '4':
              case '8':
                return goog.dom.createDom('div', 'btn-group',[btn_view]);
            }
        }

      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'details');}
    }
  ];


  /**
   * @desc Deposit delete button label in the  broker's deposit list
   */
  var MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_CANCEL  = goog.getMsg('cancel');

  /**
   * @desc Deposit delete button label in the  broker's deposit list
   */
  var MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_UPLOAD  = goog.getMsg('send receipt');


  /**
   * @desc Withdraw progress button label in the  broker's withdraw list
   */
  var MSG_DEPOSIT_TABLE_COLUMN_ACTION_PROGRESS = goog.getMsg('Set in progress');

  /**
   * @desc Withdraw progress button label in the  broker's withdraw list
   */
  var MSG_DEPOSIT_TABLE_COLUMN_ACTION_COMPLETE = goog.getMsg('Set as complete');


  if (show_customers) {
    grid_columns.push({
      'property': 'Username',
      'label': MSG_DEPOSIT_TABLE_COLUMN_USERNAME,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'username'); }
    });
  }

  if (broker_mode ){
    grid_columns.push({
      'property' : 'DepositID',
      'label': MSG_DEPOSIT_TABLE_COLUMN_ACTIONS,
      'sortable': false,
      'formatter': function(value, rowSet){
        var data_row = goog.json.serialize( rowSet );

        var btn_cancel = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-danger btn-deposit-cancel',
          'href':'#',
          'data-action':'CANCEL',
          'data-row': data_row
        },MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_CANCEL,' ', goog.dom.createDom( 'i', ['icon-white', 'icon-remove']));

        var btn_progress = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-info btn-deposit-progress',
          'href':'#',
          'data-action':'PROGRESS',
          'data-row': data_row
        },MSG_DEPOSIT_TABLE_COLUMN_ACTION_PROGRESS,' ', goog.dom.createDom( 'i', ['icon-white', 'icon-refresh']));

        var btn_complete = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-success btn-deposit-complete',
          'href':'#',
          'data-action':'COMPLETE',
          'data-row': data_row
        },MSG_DEPOSIT_TABLE_COLUMN_ACTION_COMPLETE,' ', goog.dom.createDom( 'i', ['icon-white', 'icon-ok']));

        var btn_show_receipt_broker = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-success btn-deposit-show-receipt',
          'data-action':'SHOW_RECEIPT',
          'data-row': data_row
        }, goog.dom.createDom( 'i', ['icon-white', 'icon-file']));

        switch (rowSet['Type'] ) {
          case 'CRY':
            switch( rowSet['Status'] ) {
              case '0':
              case '1':
                return goog.dom.createDom('div', 'btn-group',[btn_progress]);
              case '2':
                return goog.dom.createDom('div', 'btn-group',[btn_complete]);
              case '4':
                return '';
              case '8':
                return goog.dom.createDom('div', 'btn-group',[btn_progress]);
            }
            break;

          default:
            switch( rowSet['Status'] ) {
              case '0':
                return goog.dom.createDom('div', 'btn-group',[btn_cancel, btn_progress]);
              case '1':
                return goog.dom.createDom('div', 'btn-group',[btn_show_receipt_broker,btn_cancel, btn_progress]);
              case '2':
                return goog.dom.createDom('div', 'btn-group',[btn_show_receipt_broker,btn_cancel, btn_complete]);
              case '4':
                return goog.dom.createDom('div', 'btn-group',[btn_cancel]);
              case '8':
                return goog.dom.createDom('div', 'btn-group',[btn_progress]);
            }
        }

      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'actions');}
    });
  } else {
    grid_columns.push({
      'property' : 'DepositID',
      'label': MSG_DEPOSIT_TABLE_COLUMN_ACTIONS,
      'sortable': false,
      'formatter':function(value, rowSet){
        var data_row = goog.json.serialize( rowSet );

        /**
         * @desc Request support action button label on deposit table
         */
        var MSG_DEPOSIT_TABLE_COLUMN_ACTION_REQUEST_SUPPORT = goog.getMsg('Where are my coins ?');


        var btn_upload = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-success btn-deposit-upload',
          'data-action':'UPLOAD',
          'data-row': data_row
        },MSG_DEPOSIT_TABLE_DETAILS_COLUMN_BTN_UPLOAD, ' ' ,goog.dom.createDom( 'i', ['icon-white', 'icon-file']));

        var btn_show_receipt = goog.dom.createDom( 'a', {
          'class':'btn btn-mini btn-success btn-deposit-show-receipt',
          'data-action':'SHOW_RECEIPT',
          'data-row': data_row
        }, goog.dom.createDom( 'i', ['icon-white', 'icon-file']));


        switch (rowSet['Type'] ) {
          case 'CRY':
            switch( rowSet['Status'] ) {
              case '0':
              case '1':
              case '2':
              case '4':
              case '8':
                return '';
            }
            break;

          default:
            switch( rowSet['Status'] ) {
              case '0':
                return goog.dom.createDom('div', 'btn-group',[btn_upload]);
              case '1':
                return goog.dom.createDom('div', 'btn-group',[btn_show_receipt]);
              case '2':
              case '4':
              case '8':
                return '';
            }
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.DepositList.CSS_CLASS, 'actions');}
    });
  }

  this.selected_deposit_ = null;

  /**
   * @desc deposit table title
   */
  var MSG_DEPOSIT_LIST_TABLE_TITLE  = goog.getMsg('Deposits');

  /**
   * @desc placeholder for the search input text
   */
  var MSG_DEPOSIT_LIST_SEARCH_PLACEHOLDER = goog.getMsg('Search ...');

  var options = {
    'rowIDFn':this.getRowId,
    'rowClassFn':this.getRowClass,
    'columns': grid_columns,
    'title': MSG_DEPOSIT_LIST_TABLE_TITLE,
    'showSearch': true,
    'searchPlaceholder':  MSG_DEPOSIT_LIST_SEARCH_PLACEHOLDER
  };

  bitex.ui.DataGrid.call(this, options, opt_domHelper);
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
 * @return {string}
 */
bitex.ui.DepositList.prototype.getDepositID = function() {
  if (goog.isDefAndNotNull(this.selected_deposit_)){
    return this.selected_deposit_['DepositID'];
  }
  return "";
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
