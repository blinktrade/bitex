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
  this.confirmation_token_ = null
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


bitex.view.WithdrawView.prototype.getRequestId = function() {
  return this.request_id_;
};

bitex.view.WithdrawView.prototype.getAmount = function() {
  return this.amount_;
};

bitex.view.WithdrawView.prototype.getCurrency = function() {
  return this.currency_;
};

bitex.view.WithdrawView.prototype.getMethod = function() {
  return this.method_;
};

bitex.view.WithdrawView.prototype.getWithdrawData = function() {
  return this.data_;
};


bitex.view.WithdrawView.prototype.showCurrencyWithdrawDialog = function(currency){
  var model = this.getApplication().getModel();
  var withdraw_methods = model.get('Broker')['WithdrawStructure'][currency];

  var dialogContent = bitex.templates.DepositWithdrawDialogContent( {
    side: 'client',
    currency: currency,
    currency_sign: this.getApplication().getCurrencySign(currency),
    methods: withdraw_methods
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
  this.withdraw_list_table_ =  new bitex.ui.WithdrawList();

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onWithdrawListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawListReponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + model.get('UserID'),
                 this.onWithdrawRefresh_);


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

  var conn = this.getApplication().getBitexConnection();
  conn.requestWithdrawList(this.request_id_, page, limit, ['1', '2', '4', '8']  );
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
