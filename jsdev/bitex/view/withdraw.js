goog.provide('bitex.view.WithdrawView');

goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawList');
goog.require('bitex.templates');

goog.require('goog.soy');

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
};
goog.inherits(bitex.view.WithdrawView, bitex.view.View);

/**
 * @type {bitex.ui.AccountActivity}
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

  var withdraws_component = new goog.ui.Component();
  this.addChild(withdraws_component);
  withdraws_component.decorate(goog.dom.getElement('withdraw_accordion'));
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
 * @override
 */
bitex.view.WithdrawView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getApplication().getModel();
  var handler = this.getHandler();

  handler.listen( model, bitex.model.Model.EventType.SET + 'Broker', this.onModelSetBroker_);

  handler.listen( this.getApplication().getBitexConnection(),
                  bitex.api.BitEx.EventType.WITHDRAW_RESPONSE,
                  this.onBitexWithdrawResponse_);
};


bitex.view.WithdrawView.prototype.onBitexWithdrawResponse_ = function(e) {
  var dlg_content = bitex.templates.WithdrawConfirmationDialogContent({
    id: "id_withdraw_confirmation",
    startStrong: '<strong>',
    endStrong: '</strong>'
  }) ;

  /**
   * @desc withdraw confirmation dialog title
   */
  var MSG_WITHDRAW_CONFIRMATION_DIALOG_TITLE = goog.getMsg('Confirm');

  var withdrawConfirmationDialog = this.getApplication().showDialog(dlg_content,
                                                                    MSG_WITHDRAW_CONFIRMATION_DIALOG_TITLE,
                                                                    goog.ui.Dialog.ButtonSet.createOkCancel());


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


  if (goog.isDefAndNotNull(this.withdraw_list_table_)) {

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE,
                     this.onWithdrawListReponse_);


    this.withdraw_list_table_.dispose();
  }

  this.withdraw_list_table_ = null;
  this.request_id_ = null;
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.view.WithdrawView.prototype.onModelSetBroker_ = function(e) {
  var broker = e.data;
  var model = this.getApplication().getModel();
  var security_list = model.get('SecurityList');

  var broker_government_currencies_codes = broker['Currencies'].split(',');

  var government_currencies = [];
  var crypto_currencies = [];
  var currency_balances_template_params = [];
  goog.array.forEach(security_list['Currencies'], function( currency) {
    if (currency['IsCrypto'] ) {
      crypto_currencies.push(currency);
      currency_balances_template_params.push({ code: currency['Code'], code_lower: currency['Code'].toLowerCase() });
    }

    if ( goog.array.contains(broker_government_currencies_codes , currency['Code'] )) {
      government_currencies.push(currency);
      currency_balances_template_params.push({ code: currency['Code'], code_lower: currency['Code'].toLowerCase() });
    }

  }, this);

  goog.dom.removeChildren(goog.dom.getElement('id_user_balances_well'));
  goog.soy.renderElement(goog.dom.getElement('id_user_balances_well'), bitex.templates.YourAccountBalances, {
    currencies: currency_balances_template_params
  });


  var withdraws_component = this.getChildAt(0);
  withdraws_component.removeChildren(true);

  /**
   * @desc Withdraw Button label in the withdraw view
   */
  var MSG_BUTTON_WITHDRAW_LABEL = goog.getMsg('Withdraw');

  /**
   * @desc Withdraw accordion description in the withdraw view
   */
  var MSG_WITHDRAW_ACCORDION_DESCRIPTION = goog.getMsg('Fill up the form.');


  /**
   * @desc Amount label
   */
  var MSG_LABEL_AMOUNT = goog.getMsg('Amount');


  goog.array.forEach(crypto_currencies, function(currency) {


    /**
     * @desc Crypto Currency Withdraw accordion title
     */
    var MSG_CRYPTO_CURRENCY_WITHDRAW_TITLE =
        goog.getMsg('{$currency} withdrawal', {currency : currency['Description']});

    /**
     * @desc Amount label
     */
    var MSG_AMOUNT_CRYPTO_CURRENCY_PLACEHOLDER = goog.getMsg('eg. 0.44550000');

    /**
     * @desc Wallet label on crypto currency withdrawal
     */
    var MSG_LABEL_WALLET_CRYPTO_CURRENCY = goog.getMsg('Wallet');

    /**
     * @desc Crypto Currency Withdraw accordion title
     */
    var MSG_WALLET_CRYPTO_CURRENCY_PLACEHOLDER = goog.getMsg('Your {$currency} wallet here.', {currency: currency['Description']});

    var crypto_currency_withdraw = new bitex.ui.Withdraw( {
        type: 'CRY',
        currency: currency['Code'],
        parent_id   : 'withdraw_accordion',
        button_label: MSG_BUTTON_WITHDRAW_LABEL,
        title       : MSG_CRYPTO_CURRENCY_WITHDRAW_TITLE,
        description : MSG_WITHDRAW_ACCORDION_DESCRIPTION,
        controls   : [ ['Amount', MSG_LABEL_AMOUNT, MSG_AMOUNT_CRYPTO_CURRENCY_PLACEHOLDER, currency['Sign'] ],
                       ['Wallet', MSG_LABEL_WALLET_CRYPTO_CURRENCY , MSG_WALLET_CRYPTO_CURRENCY_PLACEHOLDER] ]
    });

    withdraws_component.addChild(crypto_currency_withdraw, true);

  }, this);

  goog.array.forEach(government_currencies, function(currency) {

    /**
     * @desc Government Currency Withdraw accordion title
     */
    var MSG_GOVT_CURRENCY_WITHDRAW_TITLE =
        goog.getMsg('{$currency} withdrawal', {currency : currency['Description']});


    /**
     * @desc Amount label
     */
    var MSG_AMOUNT_GOVT_CURRENCY_PLACEHOLDER = goog.getMsg('eg. 2300.00');

    /**
     * @desc Bank number in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NUMBER = goog.getMsg('Bank number');

    /**
     * @desc Bank name in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NAME = goog.getMsg('Bank name');


    /**
     * @desc Account Branch in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_BRANCH = goog.getMsg('Account Branch');

    /**
     * @desc Account name in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NAME = goog.getMsg('Account name');

    /**
     * @desc Account number in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NUMBER = goog.getMsg('Account number');

    /**
     * @desc ID in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ID = goog.getMsg("ID");


    /**
     * @desc Bank number placeholder in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NUMBER_PH = goog.getMsg('eg. 2331');

    /**
     * @desc Bank name placeholder in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NAME_PH = goog.getMsg('eg. Bank of America');


    /**
     * @desc Account Branch placeholder in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_BRANCH_PH = goog.getMsg('eg. 88888');

    /**
     * @desc Account name placeholder in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NAME_PH = goog.getMsg('eg. John Doe');


    /**
     * @desc Account number placeholder in bank withdrawal form
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NUMBER_PH = goog.getMsg('eg. 88888');

    /**
     * @desc ID placeholder in bank withdrawal form placeholder
     */
    var MSG_GOVT_CURRENCY_BANK_TRANSFER_ID_PH = goog.getMsg("eg. A34455");


    var government_currency_withdraw = new bitex.ui.Withdraw({
      parent_id:'withdraw_accordion',
      type: 'BBT',
      currency: currency['Code'],
      button_label:MSG_BUTTON_WITHDRAW_LABEL,
      title: MSG_GOVT_CURRENCY_WITHDRAW_TITLE,
      description: MSG_WITHDRAW_ACCORDION_DESCRIPTION,
      controls: [ ['Amount', MSG_LABEL_AMOUNT , MSG_AMOUNT_GOVT_CURRENCY_PLACEHOLDER, currency['Sign']],
        ['BankNumber',     MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NUMBER   , MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NUMBER_PH],
        ['BankName',       MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NAME     , MSG_GOVT_CURRENCY_BANK_TRANSFER_BANK_NAME_PH],
        ['AccountBranch',  MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_BRANCH, MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_BRANCH_PH],
        ['AccountName',    MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NAME  , MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NAME_PH],
        ['AccountNumber',  MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NUMBER, MSG_GOVT_CURRENCY_BANK_TRANSFER_ACCOUNT_NUMBER_PH],
        ['CPFCNPJ',         MSG_GOVT_CURRENCY_BANK_TRANSFER_ID            , MSG_GOVT_CURRENCY_BANK_TRANSFER_ID_PH]
      ]
    });

    withdraws_component.addChild(government_currency_withdraw, true);
  }, this);


  console.log(goog.debug.deepExpose(government_currencies));
};


/**
 * @private
 */
bitex.view.WithdrawView.prototype.recreateComponents_ = function() {
  var handler = this.getHandler();

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

  this.withdraw_list_table_.decorate(el);

  this.withdraw_list_table_.setColumnFormatter('Amount', this.priceFormatter_, this);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.WithdrawView.prototype.priceFormatter_ = function(value, rowSet) {
  var priceCurrency = rowSet['Currency'];
  return this.getApplication().formatCurrency(value/1e8, priceCurrency);
};

/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestWithdrawList(this.request_id_, page, limit, ['1', '2'] );
};


/**
 *
 * @param {goog.events.Event} e
 */
bitex.view.WithdrawView.prototype.onWithdrawListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.withdraw_list_table_) ) {
    return
  }

  var msg = e.data;

  this.withdraw_list_table_.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
};
