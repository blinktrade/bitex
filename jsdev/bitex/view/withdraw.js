goog.provide('bitex.view.WithdrawView');

goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawList');
goog.require('bitex.templates');
goog.require('bitex.util');
goog.require('goog.soy');
goog.require('goog.string');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.WithdrawView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
  this.confirmation_token_ = null;
  this.withdraw_action_ = null;
  this.qr_data_ = null;
  this.qr_data_verb_ = null;
};
goog.inherits(bitex.view.WithdrawView, bitex.view.View);

/**
 * @type {bitex.ui.WithdrawList}
 */
bitex.view.WithdrawView.prototype.withdraw_list_table_;

bitex.view.WithdrawView.prototype.enterView = function() {
  this.recreateComponents_();
};

bitex.view.WithdrawView.prototype.exitView = function() {
  this.destroyComponents_();
};

/**
 * @override
 */
bitex.view.WithdrawView.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/**
 * @type {number}
 */
bitex.view.WithdrawView.prototype.request_id_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.withdraw_action_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.confirmation_token_;

/**
 * @type {number}
 */
bitex.view.WithdrawView.prototype.amount_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.currency_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.method_;

/**
 * @type {Object}
 */
bitex.view.WithdrawView.prototype.data_;

/**
 * @type {Object}
 */
bitex.view.WithdrawView.prototype.qr_data_;

/**
 * @type {string}
 */
bitex.view.WithdrawView.prototype.qr_data_verb_;


/**
 * @override
 */
bitex.view.WithdrawView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getApplication().getModel();
  var handler = this.getHandler();


  handler.listen( this.getApplication().getBitexConnection(),
                  bitex.api.BitEx.EventType.WITHDRAW_RESPONSE,
                  this.onBitexWithdrawResponse_);


  handler.listen( model, bitex.model.Model.EventType.SET + 'BrokerCurrencies', function(e){
    goog.dom.removeChildren( goog.dom.getElement("id_user_balances_well"));

    var broker_currencies = model.get('BrokerCurrencies');
    goog.soy.renderElement(goog.dom.getElement('id_user_balances_well'), bitex.templates.AccountBalances, {
      currencies: broker_currencies,
      action: 'withdraw'
    });

    model.updateDom();
  });


  handler.listen( this.getElement(), goog.events.EventType.CLICK, function(e){
    if (e.target.getAttribute('data-action') === 'withdraw' ) {
      var user_currency = e.target.getAttribute('data-currency');
      this.showCurrencyWithdrawDialog(user_currency);
    }
  }, this);

};


/**
 * @return {number}
 */
bitex.view.WithdrawView.prototype.getRequestId = function() {
  return this.request_id_;
};

/**
 * @return {number}
 */
bitex.view.WithdrawView.prototype.getAmount = function() {
  return this.amount_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getCurrency = function() {
  return this.currency_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getMethod = function() {
  return this.method_;
};

/**
 * @return {string}
 */
bitex.view.WithdrawView.prototype.getWithdrawAction = function() {
  return this.withdraw_action_;
};


/**
 * @return {Object}
 */
bitex.view.WithdrawView.prototype.getWithdrawData = function() {
  return this.data_;
};


bitex.view.WithdrawView.prototype.showCurrencyWithdrawDialog = function(currency){
  var model = this.getApplication().getModel();
  var withdraw_methods = model.get('Broker')['WithdrawStructure'][currency];

  var method_element_id = goog.string.getRandomString();
  var withdraw_amount_element_id = goog.string.getRandomString();
  var fixed_fee_element_id = goog.string.getRandomString();
  var percent_fee_element_id = goog.string.getRandomString();
  var total_fees_element_id = goog.string.getRandomString();
  var net_value_element_id = goog.string.getRandomString();

  var dialogContent = bitex.templates.DepositWithdrawDialogContent( {
    side: 'client',
    currency: currency,
    currencySign: this.getApplication().getCurrencySign(currency),
    methods: withdraw_methods,
    methodID: method_element_id,
    showFeeDataEntry:false,
    amountID: withdraw_amount_element_id,
    fixedFeeID: fixed_fee_element_id,
    percentFeeID: percent_fee_element_id,
    totalFeesID: total_fees_element_id,
    netValueID: net_value_element_id,
    hideNetAmount:true
  });


  /**
   * @desc Crypto Currency Withdraw accordion title
   */
  var MSG_CURRENCY_WITHDRAW_DIALOG_TITLE =
      goog.getMsg('{$currency} withdrawal', {currency :  this.getApplication().getCurrencyDescription(currency) });


  var dlg =  this.getApplication().showDialog(dialogContent,
                                              MSG_CURRENCY_WITHDRAW_DIALOG_TITLE,
                                              bootstrap.Dialog.ButtonSet.createOkCancel());
  var handler = this.getHandler();


  this.getApplication().doCalculateFees_(
      withdraw_amount_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
      currency,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
      true);


  handler.listen(goog.dom.getElement(method_element_id), goog.events.EventType.CHANGE, function(e){
    this.getApplication().doCalculateFees_(
        withdraw_amount_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
        currency,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
        true);
  });

  handler.listen( new goog.events.InputHandler(goog.dom.getElement(withdraw_amount_element_id) ),goog.events.InputHandler.EventType.INPUT,
                  function(e) {
                    this.getApplication().doCalculateFees_(
                        withdraw_amount_element_id,
                        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
                        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
                        currency,
                        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
                        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
                        true);
                  });

  handler.listenOnce(dlg, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      var withdraw_data = bitex.util.getFormAsJSON(goog.dom.getFirstElementChild(dlg.getContentElement()));

      this.amount_ = goog.string.toNumber(withdraw_data['Amount']); delete withdraw_data['Amount'];
      this.method_ = withdraw_data['Method']; delete withdraw_data['Method'];
      this.currency_ = withdraw_data['Currency']; delete withdraw_data['Currency'];
      this.data_ = withdraw_data;

      this.dispatchEvent( bitex.view.View.EventType.REQUEST_WITHDRAW);
    }
  }, this);
};



/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListTableClick_ = function(e) {
  var element = e.target;
  if (element.tagName  === goog.dom.TagName.I ) {
    element = goog.dom.getParentElement(element);
  }

  var data_action = element.getAttribute('data-action');
  if (goog.isDefAndNotNull(data_action)) {
    e.preventDefault();
    e.stopPropagation();

    var data = goog.json.parse(element.getAttribute('data-row'));

    switch( data_action ) {
      case 'SHOW_QR':
        this.qr_data_ = {
          'Wallet': data['Data']['Wallet'],
          'Currency': data['Currency']
        };
        this.qr_data_verb_ = 'WITHDRAW';
        this.dispatchEvent(bitex.view.View.EventType.SHOW_QR);
        break;
    }
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onBitexWithdrawResponse_ = function(e) {
  var dlg_content = bitex.templates.WithdrawConfirmationDialogContent({id: "id_withdraw_confirmation"}) ;

  /**
   * @desc withdraw confirmation dialog title
   */
  var MSG_WITHDRAW_CONFIRMATION_DIALOG_TITLE = goog.getMsg('Confirm');

  var withdrawConfirmationDialog = this.getApplication().showDialog(dlg_content,
                                                                    MSG_WITHDRAW_CONFIRMATION_DIALOG_TITLE,
                                                                    bootstrap.Dialog.ButtonSet.createOkCancel());


  var handler = this.getHandler();
  handler.listenOnce(withdrawConfirmationDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      this.confirmation_token_ = goog.dom.forms.getValue( goog.dom.getElement("id_withdraw_confirmation") );
      this.dispatchEvent(  bitex.view.View.EventType.CONFIRM_WITHDRAW );
    }
  }, this);
};


bitex.view.WithdrawView.prototype.getConfirmationToken = function() {
  return this.confirmation_token_;
};

/**
 * @private
 */
bitex.view.WithdrawView.prototype.destroyComponents_ = function( ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (goog.isDefAndNotNull(this.withdraw_list_table_)) {

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE,
                     this.onWithdrawListReponse_);


    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + model.get('UserID'),
                     this.onWithdrawRefresh_);

    handler.unlisten(this.withdraw_list_table_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onWithdrawListTableClick_);

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.CANCEL,
                     this.onUserCancelWithdraw_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.PROGRESS,
                     this.onUserSetWithdrawInProgress_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.COMPLETE,
                     this.onUserSetWithdrawComplete_ );



    this.withdraw_list_table_.dispose();
  }

  this.withdraw_list_table_ = null;
  this.request_id_ = null;
};



/**
 * @private
 */
bitex.view.WithdrawView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  this.destroyComponents_();

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );



  var el = goog.dom.getElement('id_withdraw_list_table');
  var currency_method_description_obj = {};
  goog.object.forEach( model.get('Broker')['WithdrawStructure'], function(method_list, currency){
    currency_method_description_obj[ currency ] = {};
    goog.array.forEach(method_list, function(method) {
      currency_method_description_obj[ currency ][method['method'] ] = method['description'];
    } );
  });

  this.withdraw_list_table_ =  new bitex.ui.WithdrawList(currency_method_description_obj,
                                                         model.get('IsBroker'),
                                                         model.get('IsBroker'));

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onWithdrawListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawListReponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + model.get('UserID'),
                 this.onWithdrawRefresh_);



  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.CANCEL,
                 this.onUserCancelWithdraw_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.PROGRESS,
                 this.onUserSetWithdrawInProgress_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.COMPLETE,
                 this.onUserSetWithdrawComplete_ );


  this.withdraw_list_table_.decorate(el);

  this.withdraw_list_table_.setColumnFormatter('Amount', this.priceFormatter_, this);

  handler.listen(this.withdraw_list_table_.getElement(),
                 goog.events.EventType.CLICK,
                 this.onWithdrawListTableClick_);

};


/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.WithdrawView.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = rowSet['Currency'];
  var currency_description = this.getApplication().getCurrencyDescription(priceCurrency );

  if (value === 0 ) {
    return '-'
  }
  return goog.dom.createDom('abbr',
                            {'title': currency_description },
                            this.getApplication().formatCurrency(value/1e8, priceCurrency) );
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestWithdrawList(this.request_id_, page, limit, ['1', '2', '4', '8'], undefined, filter  );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserCancelWithdraw_ = function(e) {
  this.withdraw_action_ = 'CANCEL';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserSetWithdrawInProgress_ = function(e) {
  this.withdraw_action_ = 'PROGRESS';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.WithdrawView.prototype.onUserSetWithdrawComplete_ = function(e) {
  this.withdraw_action_ = 'COMPLETE';
  this.data_ = this.withdraw_list_table_.getWithdrawData();
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};


/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawRefresh_ = function(e) {
  var msg = e.data;

  if (!goog.isDefAndNotNull(this.withdraw_list_table_) ) {
    return;
  }
  this.withdraw_list_table_.insertOrUpdateRecord(msg, 0);
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.withdraw_list_table_) ) {
    return
  }

  var msg = e.data;

  this.withdraw_list_table_.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
};
