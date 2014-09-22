goog.provide('bitex.view.LedgerView');

goog.require('bitex.view.View');

goog.require('bitex.ui.LedgerActivity');

goog.require('goog.json');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.LedgerView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
};
goog.inherits(bitex.view.LedgerView, bitex.view.View);

/**
 * @type {bitex.ui.LedgerActivity}
 * @private
 */
bitex.view.LedgerView.prototype.ledger_table_;

bitex.view.LedgerView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.LedgerView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

/**
 * @type {number}
 */
bitex.view.LedgerView.prototype.request_id_;

/**
 * @private
 */
bitex.view.LedgerView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();


  if (goog.isDefAndNotNull(this.ledger_table_)) {

    handler.unlisten(this.ledger_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onLedgerTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE,
                     this.onLedgerListResponse_);

  }

  this.removeChildren(true);
  this.ledger_table_ = null;
  this.request_id_ = null;
};


/**
 * @private
 */
bitex.view.LedgerView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  this.destroyComponents_();


  /**
   * @desc All currencies filter label on ledger table filters
   */
  var MSG_LEDGER_TABLE_SEARCH_ALL_CURRENCIES = goog.getMsg('All currencies');

  var button_filters = [ {'label': MSG_LEDGER_TABLE_SEARCH_ALL_CURRENCIES, 'value':'all' } ];
  if (model.get('IsBroker')) {
    button_filters = [];


    /**
     * @desc label on ledge filter
     */
    var MSG_MY_CUSTOMERS_LABEL = goog.getMsg('My customers');

    goog.array.forEach(model.get('Profile')['BrokerCurrencies'], function(currency_code){
      button_filters.push(
          {
            'label': MSG_MY_CUSTOMERS_LABEL + ':' + this.getApplication().getCurrencyDescription(currency_code),
            'value':goog.json.serialize( {'currency':currency_code, 'broker_id':model.get('UserID') } )
          });
    }, this );

    if (goog.isDefAndNotNull( model.get('Profile')['Accounts'] )) {
      goog.object.forEach( model.get('Profile')['Accounts'], function(account_data, account_name) {
        goog.array.forEach(model.get('Profile')['BrokerCurrencies'], function(currency_code){

          button_filters.push(
              {
                'label': account_name + ':' + this.getApplication().getCurrencyDescription(currency_code),
                'value':goog.json.serialize( {'currency':currency_code, 'account_id': account_data[0]  } )
              });

        }, this);

      }, this);
    }



    goog.array.forEach(model.get('Broker')['BrokerCurrencies'], function(currency_code){
      button_filters.push(
          {
            'label':model.get('Broker')['ShortName']  + ':' + this.getApplication().getCurrencyDescription(currency_code),
            'value':goog.json.serialize( {'currency':currency_code, 'broker_id':model.get('Broker')['BrokerID']  } )
          });
    }, this );



  } else {
    goog.array.forEach(model.get('BrokerCurrencies'), function(currency_code){
      button_filters.push(
          {
            'label':this.getApplication().getCurrencyDescription(currency_code),
            'value':goog.json.serialize( {'currency':currency_code, 'broker_id':model.get('Broker')['BrokerID']  } )
          });
    }, this );
  }


  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  this.ledger_table_ =  new bitex.ui.LedgerActivity(button_filters, model.get('IsBroker') );

  handler.listen(this.ledger_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onLedgerTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE + '.' + this.request_id_,
                 this.onLedgerListResponse_);

  this.addChild(this.ledger_table_, true );

  this.ledger_table_.setColumnFormatter('Amount',  this.amountFormatter_, this);
  this.ledger_table_.setColumnFormatter('Balance', this.balanceFormatter_, this);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.LedgerView.prototype.amountFormatter_ = function(value, rowSet) {
  if (rowSet['Operation'] == 'D') {
    value = value * -1;
  }
  return this.getApplication().formatCurrency(value/1e8, rowSet['Currency']);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.LedgerView.prototype.balanceFormatter_ = function(value, rowSet) {
  return this.getApplication().formatCurrency(value/1e8, rowSet['Currency']);
};

/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.LedgerView.prototype.onLedgerTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filters_param = e.options['Filter'];

  var currency;
  var filters = [];
  var userID = this.getApplication().getModel().get('UserID');
  var brokerID = this.getApplication().getModel().get('Broker')['BrokerID'];
  if (this.getApplication().getModel().get('IsBroker')) {
    brokerID = userID;
  }

  if (goog.isArrayLike(filters_param)) {
    goog.array.forEach(filters_param, function(filter){
      try {
        var filter_obj = goog.json.parse(filter);
        if (goog.isDefAndNotNull(filter_obj['currency'])) {
          currency = filter_obj['currency'];
        }
        if (goog.isDefAndNotNull(filter_obj['broker_id'])) {
          brokerID = filter_obj['broker_id'];
        }
        if (goog.isDefAndNotNull(filter_obj['account_id'])) {
          userID = filter_obj['account_id'];
        }

      } catch (ex) {
        filters.push(filter);
      }
    }, this);
  }

  var conn = this.getApplication().getBitexConnection();

  conn.requestLedgerList(this.request_id_, page, limit, brokerID, userID, currency, filters);
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.LedgerView.prototype.onLedgerListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.ledger_table_) ) {
    return
  }

  var msg = e.data;

  this.ledger_table_.setResultSet( msg['LedgerListGrp'], msg['Columns'] );
};
