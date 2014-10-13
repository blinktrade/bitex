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
 * @desc Column Username of the Withdraw List
 */
var MSG_WITHDRAW_TABLE_COLUMN_USERNAME = goog.getMsg('Username');



/**
 * @param {Object} methodDescriptionObj
 * @param {boolean} opt_broker_mode
 * @param {boolean} opt_show_customers
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawList = function( methodDescriptionObj, opt_broker_mode,  opt_show_customers, opt_domHelper) {
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
      'label': MSG_WITHDRAW_TABLE_COLUMN_CREATED,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'created'); }
    },{
      'property': 'Status',
      'label': MSG_WITHDRAW_TABLE_COLUMN_STATUS,
      'sortable': false,
      'formatter': function(s, rowSet){
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
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_REASON_UNCONFIRMED_DEPOSITS = goog.getMsg('User has deposits that are not yet confirmed');

          var status_el = goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ] );
          var reason_el;
          switch(reason_id) {
            case 0:
              reason_el = goog.dom.createDom('abbr', {'title': reason},  label_class_text[1] );
              break;
            case -1:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_INSUFFICIENT_FUNDS},  label_class_text[1] );
              break;
            case -2:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_ACCOUNT_NOT_VERIFIED},  label_class_text[1] );
              break;
            case -3:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_SUSPICION_OF_FRAUD},  label_class_text[1] );
              break;
            case -4:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_DIFFERENT_ACCOUNT},  label_class_text[1] );
              break;
            case -5:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_INVALID_WALLET},  label_class_text[1] );
              break;
            case -6:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_INVALID_BANK_ACCOUNT},  label_class_text[1] );
              break;
            case -7:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_OVER_LIMIT},  label_class_text[1] );
              break;
            case -8:
              reason_el = goog.dom.createDom('abbr', {'title': MSG_WITHDRAW_REASON_UNCONFIRMED_DEPOSITS},  label_class_text[1] );
              break;
            default:
              return goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ],  label_class_text[1]  );
          }
          goog.dom.appendChild(status_el, reason_el);
          return status_el;
        } else {
          return goog.dom.createDom('span', ['label', 'label-' + label_class_text[0] ],  label_class_text[1]  );
        }
      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'status'); }
    },{
      'property': 'Amount',
      'label': MSG_WITHDRAW_TABLE_COLUMN_AMOUNT,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'amount'); }
    },{
      'property': 'Data',
      'label': MSG_WITHDRAW_TABLE_COLUMN_DETAIL,
      'sortable': false,
      'formatter': function(data, rowSet){
        var element = goog.dom.createDom( 'table' );

        var method = methodDescriptionObj[rowSet['Currency']][ rowSet['Method'] ];
        goog.dom.appendChild(element,
            goog.dom.createDom('tr', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-tr'),
                  goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-key'), MSG_WITHDRAW_TABLE_COLUMN_METHOD ),
                  goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-value'), method ))
        );

        if (goog.isDefAndNotNull(data['Link'])) {
          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_BROKER_RECEIPT_COLUMN = goog.getMsg('Broker receipt');

          /** @desc reason for cancelling withdraw */
          var MSG_WITHDRAW_BROKER_RECEIPT_BUTTON_LABEL = goog.getMsg('view');

          if (!goog.string.isEmpty(data['Link'])){
            goog.dom.appendChild(element, goog.dom.createDom('tr', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-tr'),
                goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-key'), MSG_WITHDRAW_BROKER_RECEIPT_COLUMN ),
                goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-value'),
                  goog.dom.createDom('a', {
                    'class':'btn btn-mini btn-primary',
                    'target':'_blank',
                    'href': data['Link']
                  }, MSG_WITHDRAW_BROKER_RECEIPT_BUTTON_LABEL,' ' ,goog.dom.createDom( 'i', ['icon-white', 'icon-eye-open'] )
                ) ))) ;
          }
        }
        /**
         * @desc Withdraw qr button label in the  broker's withdraw list
         */
        var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_TRANSACTION_ID  = goog.getMsg('Transaction ID');

        goog.object.forEach(data, function(value, key) {
          if (key != 'Link' && key != 'Currency' ) {
            if (goog.isDefAndNotNull(value) && !goog.string.isEmpty(value) )  {
              if (key == 'Wallet') {
                /**
                 * @desc Withdraw qr button label in the  broker's withdraw list
                 */
                var MSG_WITHDRAW_TABLE_WALLET_KEY  = goog.getMsg('Wallet');


                /**
                 * @desc Withdraw qr button label in the  broker's withdraw list
                 */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BTN_QR  = goog.getMsg('qr');

                var btn_qr = goog.dom.createDom( 'a', {
                  'class':'btn btn-mini btn-info btn-withdraw-list-qr',
                  'href':'#',
                  'data-action':'SHOW_QR',
                  'data-row': goog.json.serialize( rowSet )
                },MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BTN_QR,' ' , goog.dom.createDom( 'i', ['icon-white', 'icon-qrcode']));

                goog.dom.appendChild(element, goog.dom.createDom('tr', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-tr'),
                    goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-key'), MSG_WITHDRAW_TABLE_WALLET_KEY ),
                    goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-value'), btn_qr)));
              } else if ( key == 'TransactionID' && data['Currency'] == 'BTC' ) {

                /**
                 * @desc Withdraw qr button label in the  broker's withdraw list
                 */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BTN_BLOCKCHAIN  = goog.getMsg('blockchain');


                var block_explorer = 'https://blockchain.info';
                switch (rowSet['Data']['Wallet'][0]) {
                  case 'm':
                  case 'n':
                  case '2':
                  case '9':
                  case 'c':
                    block_explorer = 'https://test-insight.bitpay.com';
                }

                var btn_blockchain = goog.dom.createDom( 'a', {
                  'class':'btn btn-mini btn-info btn-btc-blockchain',
                  'href': block_explorer + '/tx/' + value,
                  'target':'_blank'
                },MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BTN_BLOCKCHAIN,' ' ,goog.dom.createDom( 'i', ['icon-white', 'icon-share-alt']));

                goog.dom.appendChild(element, goog.dom.createDom('tr', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-tr'),
                   goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-key'), MSG_WITHDRAW_TABLE_DETAILS_COLUMN_TRANSACTION_ID ),
                   goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-value'), btn_blockchain)));

              } else {
                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_NUMBER  = goog.getMsg('Account number');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_HOLDER  = goog.getMsg('Account holder name');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_NAME  = goog.getMsg('Bank name');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_NUMBER  = goog.getMsg('Bank number');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_CPF_CNPJ  = goog.getMsg('CPF or CNPJ');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_BRANCH = goog.getMsg('Account branch');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ROUTING_NUMBER = goog.getMsg('Routing number');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_SWIFT = goog.getMsg('Bank Swift');

                /**  @desc Withdraw column label in the  broker's withdraw list detail table */
                var MSG_WITHDRAW_TABLE_DETAILS_COLUMN_EMAIL = goog.getMsg('Email');

                var key_description = key;

                switch(key){
                  case 'AccountNumber':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_NUMBER;
                    break;
                  case 'BankName':
                    key_description  = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_NAME;
                    break;
                  case 'BankNumber':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_NUMBER;
                    break;
                  case 'CPF_CNPJ':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_CPF_CNPJ;
                    break;
                  case 'AccountBranch':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_BRANCH;
                    break;
                  case 'AccountName':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ACCT_HOLDER;
                    break;
                  case 'RoutingNumber':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_ROUTING_NUMBER;
                    break;
                  case 'BankSwift':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_BANK_SWIFT;
                    break;
                  case 'Email':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_EMAIL;
                    break;
                  case 'TransactionID':
                    key_description = MSG_WITHDRAW_TABLE_DETAILS_COLUMN_TRANSACTION_ID;
                    break;
                }

                goog.dom.appendChild(element,
                   goog.dom.createDom('tr', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-tr'),
                     goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-key'), key_description ),
                     goog.dom.createDom('td', goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details-td-value'), value ))
                );
              }
            }
          }
        }, this);

        return element;

      },
      'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'details');}
    }
  ];

  if (show_customers) {
    grid_columns.push({
                        'property': 'Username',
                        'label': MSG_WITHDRAW_TABLE_COLUMN_USERNAME,
                        'sortable': false,
                        'classes': function() { return goog.getCssName(bitex.ui.WithdrawList.CSS_CLASS, 'username'); }
                      });
  }

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
          case '1': return goog.dom.createDom('div', 'btn-group',[btn_cancel, btn_progress]);
          case '2': return goog.dom.createDom('div', 'btn-group', [btn_cancel, btn_complete]);
          case '4': return "";
          case '8': return "";
        }
      }
    });
  }

  this.selected_withdraw_ = null;


  /**
   * @desc deposit table title
   */
  var MSG_WITHDRAW_LIST_TABLE_TITLE  = goog.getMsg('Withdrawals');

  /**
   * @desc placeholder for the search input text
   */
  var MSG_WITHDRAW_LIST_SEARCH_PLACEHOLDER = goog.getMsg('Search ...');

  var options = {
    'rowIDFn':this.getRowId,
    'rowClassFn':this.getRowClass,
    'columns': grid_columns,
    'title': MSG_WITHDRAW_LIST_TABLE_TITLE,
    'showSearch': true,
    'searchPlaceholder':  MSG_WITHDRAW_LIST_SEARCH_PLACEHOLDER
  };
  bitex.ui.DataGrid.call(this,  options , opt_domHelper);
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


