goog.provide('bitex.view.AccountOverview');

goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawList');
goog.require('bitex.ui.DepositList');
goog.require('bitex.templates');
goog.require('goog.style');
goog.require('goog.string');
goog.require('goog.array');
goog.require('goog.soy');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.AccountOverview = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.request_id_ = null;
  this.withdraw_action_ = null;
  this.deposit_action_ = null;
  this.deposit_data_ = null;
  this.qr_data_ = null;
  this.qr_data_verb_ = null;
  this.verification_data_ = null;
};
goog.inherits(bitex.view.AccountOverview, bitex.view.View);


/**
 * @type {bitex.ui.WithdrawList}
 */
bitex.view.AccountOverview.prototype.withdraw_list_table_ ;

/**
 * @type {bitex.ui.DepositList}
 */
bitex.view.AccountOverview.prototype.deposit_list_table_ ;


/**
 * @type {number}
 */
bitex.view.AccountOverview.prototype.request_id_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.withdraw_action_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.deposit_action_;

/**
 * @type {Object}
 */
bitex.view.AccountOverview.prototype.deposit_data_;

/**
 * @type {Object}
 */
bitex.view.AccountOverview.prototype.receipt_data_;


/**
 * @type {Object}
 */
bitex.view.AccountOverview.prototype.qr_data_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.qr_data_verb_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.client_id_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.verification_data_;

/**
 * @type {Object}
 */
bitex.view.AccountOverview.prototype.update_profile_data_;

/**
 * @type {number}
 */
bitex.view.AccountOverview.prototype.verification_level_;

/**
 * @type {string}
 */
bitex.view.AccountOverview.prototype.file_name_;

/**
 * @param {string} username
 */
bitex.view.AccountOverview.prototype.enterView = function(username) {
  goog.base(this, 'enterView');
  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');


  var handler = this.getHandler();
  handler.listen( this.getApplication().getModel(),
                  bitex.model.Model.EventType.SET + "SelectedCustomer", this.onUpdateSelectedCustomer_ );

  if (!goog.isDefAndNotNull(selectedCustomer) || selectedCustomer['Username'] != username ) {
   // TODO: request user detail from the server
    return;
  }

  var state = selectedCustomer['State'];
  if (!goog.isDefAndNotNull(state) ) {
      state = this.getApplication().getModel().get('Profile')['State'];
      if (!goog.isDefAndNotNull(state) ) {
        state = this.getApplication().getModel().get('Broker')['State'];
      }
  }

  selectedCustomer['State'] = state;

  this.recreateComponents_(selectedCustomer);
};

bitex.view.AccountOverview.prototype.exitView = function() {
  goog.base(this, 'exitView');

  var handler = this.getHandler();
  handler.unlisten( this.getApplication().getModel(),
                    bitex.model.Model.EventType.SET + "SelectedCustomer", this.onUpdateSelectedCustomer_ );


  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');
  this.destroyComponents_(selectedCustomer);
};

/**
 * @override
 */
bitex.view.AccountOverview.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};


/**
 * @override
 */
bitex.view.AccountOverview.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/**
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.destroyComponents_ = function(customer ) {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull(this.deposit_list_table_)) {
    handler.unlisten(this.deposit_list_table_ ,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onDepositListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE + '.' + this.request_id_,
                     this.onDepositListResponse_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.PROCESS_DEPOSIT_RESPONSE + '.' + this.request_id_,
                     this.onDepositProcessResponse_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + customer['ID'],
                     this.onDepositRefresh_);

    handler.unlisten(this.deposit_list_table_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onDepositListTableClick_);
  }

  if (goog.isDefAndNotNull(this.withdraw_list_table_)) {

    handler.unlisten(this.withdraw_list_table_ ,
                     bitex.ui.DataGrid.EventType.REQUEST_DATA,
                     this.onWithdrawListTableRequestData_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawListReponse_);

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.CANCEL,
                     this.onUserCancelWithdraw_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.PROGRESS,
                     this.onUserSetWithdrawInProgress_ );

    handler.unlisten(this.withdraw_list_table_,
                     bitex.ui.WithdrawList.EventType.COMPLETE,
                     this.onUserSetWithdrawComplete_ );

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE + '.' + this.request_id_,
                     this.onWithdrawProcessResponse_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + customer['ID'],
                     this.onWithdrawRefresh_);

    handler.unlisten(this.getApplication().getBitexConnection(),
                     bitex.api.BitEx.EventType.BALANCE_RESPONSE,
                     this.onBalanceResponse_);

    handler.unlisten(this.withdraw_list_table_.getElement(),
                     goog.events.EventType.CLICK,
                     this.onWithdrawListTableClick_);
  }
  this.removeChildren(true);
  this.withdraw_list_table_ = null;
  this.deposit_list_table_ = null;


  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
  handler.unlisten(account_overview_header_el,
                   goog.events.EventType.CLICK,
                   this.onAccountOverviewHeaderClick_ );

  handler.unlisten(this.getApplication().getBitexConnection(),
                   bitex.api.BitEx.EventType.VERIFY_CUSTOMER_RESPONSE + '.' + this.request_id_,
                   this.onVerifyCustomerResponse_);

  handler.unlisten(goog.dom.getElement('id_btn_user_fees'),
                 goog.events.EventType.CLICK,
                 this.onBtnUserFeesClick_ );

  handler.listen(this.getElement(), goog.events.EventType.CHANGE, this.onElementChange_ );

  goog.dom.removeChildren(account_overview_header_el);

  this.request_id_ = null;
};

bitex.view.AccountOverview.prototype.getContentElement = function() {
  var element = goog.dom.getElementByClass('bitex-account-overview-view-content', this.getElement());
  return element || this.getElement();
};

/**
 * @param {string} raw_verification_data
 * @private
 */
bitex.view.AccountOverview.prototype.formatVerificationData_ = function(raw_verification_data) {
  var formatted_data = raw_verification_data;
  try {
    var verification_data = goog.json.parse(raw_verification_data);
    formatted_data = '<table class="table table-striped table-condensed">';
    goog.array.forEach(verification_data, function(verification_obj) {
      goog.object.forEach(verification_obj, function(data, key) {
        formatted_data += '<tr><td>';
        if (key != 'data') {
          formatted_data += key;
        }
        formatted_data += '</td> <td>';
        if (key == 'data') {
          formatted_data +=  data;
        } else if (key == 'uploaded_files') {
          if (goog.isArray(data)) {
            goog.array.forEach(data, function(data_line) {
              if ( goog.isDefAndNotNull(data_line.match(/\.(jpg|jpeg|png|gif)$/))) {
                formatted_data += ' <a href="#" data-action="file-view" data-filename="' + data_line + '" class="btn btn-mini btn-info" >' +
                    '<i data-action="file-view" data-filename="' + data_line + '"  class="icon-white icon-eye-open"></i></a> ';
              } else {
                formatted_data += ' <a href="' + data_line + '" class="btn btn-mini btn-info" "target":"blank" >' +
                    '<i class="icon-white icon-file"></i></a> ';
              }
            }, this);
          }
        } else if (goog.isArray(data)) {
          goog.array.forEach(data, function(data_line) {
            formatted_data += data_line + '<br/>';
          }, this);
        } else if (goog.isObject(data)) {
          goog.object.forEach(data, function(data_line_data, data_line_key) {
            formatted_data += data_line_key + ':'  + data_line_data + '<br/>';
          }, this);
        } else {
          formatted_data +=  data;
        }
        formatted_data += '</td></tr>';
      }, this  );
    }, this );
    formatted_data += '</table>';
  } catch(e){}
  return formatted_data;
};

/**
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.recreateComponents_ = function(customer) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();


  this.destroyComponents_(customer);

  this.request_id_ = parseInt( 1e7 * Math.random() , 10 );

  var account_overview_header_el = goog.dom.getElement('account_overview_header_id');

  var account_overview_verify_el = goog.dom.getElement('account_overview_verify_data_id');
  if (goog.isDefAndNotNull(account_overview_verify_el)) {
    account_overview_verify_el.innerHTML = this.formatVerificationData_(customer['VerificationData']);
  }


  goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewHeader, {msg_customer_detail: customer});

  var profile = model.get('Profile');

  var broker = model.get('Broker');
  this.deposit_list_table_ =  new bitex.ui.DepositList(profile['CryptoCurrencies'], true );

  handler.listen(this.deposit_list_table_ ,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onDepositListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE + '.' + this.request_id_,
                 this.onDepositListResponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.PROCESS_DEPOSIT_RESPONSE + '.' + this.request_id_,
                 this.onDepositProcessResponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + customer['ID'],
                 this.onDepositRefresh_);


  var currency_method_description_obj = {};

  goog.object.forEach( profile['WithdrawStructure'], function(method_list, currency, obj){
    currency_method_description_obj[ currency ] = {};
    goog.array.forEach(method_list, function(method) {
      currency_method_description_obj[ currency ][method['method'] ] = method['description'];
    } );
  });


  this.withdraw_list_table_ =  new bitex.ui.WithdrawList(currency_method_description_obj, true);
  handler.listen(this.withdraw_list_table_ ,
                 bitex.ui.DataGrid.EventType.REQUEST_DATA,
                 this.onWithdrawListTableRequestData_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawListReponse_);

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.CANCEL,
                 this.onUserCancelWithdraw_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.PROGRESS,
                 this.onUserSetWithdrawInProgress_ );

  handler.listen(this.withdraw_list_table_,
                 bitex.ui.WithdrawList.EventType.COMPLETE,
                 this.onUserSetWithdrawComplete_ );


  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE + '.' + this.request_id_,
                 this.onWithdrawProcessResponse_);

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + customer['ID'],
                 this.onWithdrawRefresh_);


  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.BALANCE_RESPONSE,
                 this.onBalanceResponse_);

  this.addChild(this.deposit_list_table_, true);
  this.deposit_list_table_.setColumnFormatter('Value', this.valuePriceFormatter_, this);


  this.addChild(this.withdraw_list_table_, true);
  this.withdraw_list_table_.setColumnFormatter('Amount', this.priceFormatter_, this);


  handler.listen(this.deposit_list_table_.getElement(),
                 goog.events.EventType.CLICK,
                 this.onDepositListTableClick_);

  handler.listen(this.withdraw_list_table_.getElement(),
                 goog.events.EventType.CLICK,
                 this.onWithdrawListTableClick_);

  handler.listen(account_overview_header_el,
                 goog.events.EventType.CLICK,
                 this.onAccountOverviewHeaderClick_ );

  handler.listen(goog.dom.getElement('id_btn_user_fees'),
                 goog.events.EventType.CLICK,
                 this.onBtnUserFeesClick_ );

  handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.VERIFY_CUSTOMER_RESPONSE + '.' + this.request_id_,
                 this.onVerifyCustomerResponse_);

  handler.listen(this.getElement(), goog.events.EventType.CHANGE, this.onElementChange_ );
  handler.listen(this.getElement(), goog.events.EventType.CLICK, this.onViewClick_);

  this.getApplication().getBitexConnection().requestBalances( customer['ID'] );


  this.recreateUserFeeComponents_(customer);
};

/**
 * @param {Object} customer
 * @private
 */
bitex.view.AccountOverview.prototype.recreateUserFeeComponents_ = function(customer) {
  var buy_fee = customer['TransactionFeeBuy'];
  var sell_fee = customer['TransactionFeeSell'];

  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.PERCENT);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  if (goog.isDefAndNotNull(buy_fee) ) {
    buy_fee = fmt.format(buy_fee / 10000);
  }

  if (goog.isDefAndNotNull(sell_fee) ) {
    sell_fee = fmt.format(sell_fee / 10000);
  }

  var account_overview_fees_balances_el = goog.dom.getElement('account_overview_fees_balances_id');

  goog.soy.renderElement(account_overview_fees_balances_el,bitex.templates.YourFeesBalances, {
      buy_fee: buy_fee,
      sell_fee: sell_fee
  });
};



/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getWithdrawData = function() {
  return this.withdraw_list_table_.getWithdrawData();
};

/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getWithdrawAction = function() {
  return this.withdraw_action_;
};

/**
 * @return {number}
 */
bitex.view.AccountOverview.prototype.getRequestId = function() {
  return this.request_id_;
};

/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getQrData = function() {
  return this.qr_data_;
};

/**
 * @return {String}
 */
bitex.view.AccountOverview.prototype.getQrDataVerb = function() {
  return this.qr_data_verb_;
};


/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getReceiptData = function() {
  return this.receipt_data_;
};


/**
 * @return {String}
 */
bitex.view.AccountOverview.prototype.getClientID = function() {
  return this.client_id_;
};


/**
 * @return {String}
 */
bitex.view.AccountOverview.prototype.getVerificationData = function() {
  return this.verification_data_;
};

/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getProfileTagNewValues = function() {
  return this.update_profile_data_;
};

/**
 * @return {number}
 */
bitex.view.AccountOverview.prototype.getVerificationLevel = function() {
  return this.verification_level_;
};


/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getDepositData = function() {
  return this.deposit_data_;
};

/**
 * @return {Object}
 */
bitex.view.AccountOverview.prototype.getDepositAction = function() {
  return this.deposit_action_;
};



/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onDepositListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

  var conn = this.getApplication().getBitexConnection();
  conn.requestDepositList(this.request_id_, page, limit, ['0', '1', '2', '4', '8'] , selectedCustomer["ID"], filter );
};



/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onDepositRefresh_ = function(e) {
  var msg = e.data;

  if (!goog.isDefAndNotNull(this.deposit_list_table_) ) {
    return;
  }
  this.deposit_list_table_.insertOrUpdateRecord(msg, 0);
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onDepositListResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.deposit_list_table_) ) {
    return
  }

  var msg = e.data;

  this.deposit_list_table_.setResultSet( msg['DepositListGrp'], msg['Columns'] );
};


/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onVerifyCustomerResponse_ = function(e) {
  var msg = e.data;

  var account_overview_verify_el = goog.dom.getElement('account_overview_verify_data_id');
  if (goog.isDefAndNotNull(account_overview_verify_el)) {
    account_overview_verify_el.innerHTML = this.formatVerificationData_(msg['VerificationData']);
  }
};

/**
 * @return {string}
 */
bitex.view.AccountOverview.prototype.getFilename = function() {
  return this.file_name_;
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onViewClick_ = function(e){
  var el = e.target;

  if (goog.isDefAndNotNull(el.getAttribute('data-action') )){
    switch(el.getAttribute('data-action')) {
      case 'file-view':
        e.preventDefault();
        e.stopPropagation();
        this.file_name_ = el.getAttribute('data-filename');
        this.dispatchEvent(bitex.view.View.EventType.FILE_VIEW);
        break;
    }
  }
};


/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onElementChange_ = function(e){
  var el = e.target;
  if (goog.isDefAndNotNull(el.getAttribute('data-profile-change') )){
    var changed_attribute = el.getAttribute('data-profile-change');
    var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

    var should_change = false;
    this.client_id_ = selectedCustomer['ID'];
    this.update_profile_data_ = {};

    var new_value = goog.dom.forms.getValue(el);

    switch(changed_attribute) {
      case 'Verified':
        new_value = goog.string.toNumber(new_value);
        this.verification_data_ = null;
        this.verification_level_ = new_value;
        this.dispatchEvent(bitex.view.View.EventType.SET_VERIFIED);
        break;
    }

    if (should_change) {
      this.dispatchEvent(bitex.view.View.EventType.UPDATE_PROFILE);
    }
  }
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onBtnUserFeesClick_ = function(e) {
  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  var buy_fee = selectedCustomer['TransactionFeeBuy'];
  var sell_fee = selectedCustomer['TransactionFeeSell'];

  if (goog.isDefAndNotNull(buy_fee) ) {
    buy_fee = fmt.format(buy_fee / 100);
  }

  if (goog.isDefAndNotNull(sell_fee) ) {
    sell_fee = fmt.format(sell_fee / 100);
  }

  var dlg_content = bitex.templates.UserFeesDialogContent({id: "id_user_fees", buy_fee:buy_fee, sell_fee:sell_fee});

  /**
   * @desc user custom fees
   */
  var MSG_USER_FEES_DIALOG_TITLE = goog.getMsg('Set custom user fees');

  var userFeesDialog = this.getApplication().showDialog(dlg_content,
                                                   MSG_USER_FEES_DIALOG_TITLE,
                                                   bootstrap.Dialog.ButtonSet.createOkCancel());

  if (goog.isDefAndNotNull(buy_fee)) {
    goog.dom.getElement('id_user_fees_buy_fee').disabled = false;
    goog.dom.getElement('id_user_fees_broker_buy_fee').checked = false;
    goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_buy_fee'), buy_fee );
  }
  else {
    goog.dom.getElement('id_user_fees_buy_fee').disabled = true;
    goog.dom.getElement('id_user_fees_broker_buy_fee').checked = true;
    goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_buy_fee'), 'None' );
  }

  if (goog.isDefAndNotNull(sell_fee)) {
    goog.dom.getElement('id_user_fees_sell_fee').disabled = false;
    goog.dom.getElement('id_user_fees_broker_sell_fee').checked = false;
    goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_sell_fee'), sell_fee );
  }
  else {
    goog.dom.getElement('id_user_fees_sell_fee').disabled = true;
    goog.dom.getElement('id_user_fees_broker_sell_fee').checked = true;
    goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_sell_fee'), 'None' );
  }

  var handler = this.getHandler();

  handler.listen(goog.dom.getElement("id_user_fees_broker_buy_fee" ), goog.events.EventType.CLICK, function(e) {

        if (e.target.checked) {
            goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_buy_fee'), 'None' );
            goog.dom.getElement('id_user_fees_buy_fee').disabled = true;
        }
        else {
            if (goog.isDefAndNotNull(buy_fee)) {
                goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_buy_fee'), buy_fee );
            }
            else {
              goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_buy_fee'), '0' );
            }
            goog.dom.getElement('id_user_fees_buy_fee').disabled = false;
        }

  });

  handler.listen(goog.dom.getElement("id_user_fees_broker_sell_fee" ), goog.events.EventType.CLICK, function(e) {

        if (e.target.checked) {
            goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_sell_fee'), 'None' );
            goog.dom.getElement('id_user_fees_sell_fee').disabled = true;
        }
        else {
            if (goog.isDefAndNotNull(sell_fee)) {
                goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_sell_fee'), sell_fee );
            }
            else {
              goog.dom.forms.setValue( goog.dom.getElement('id_user_fees_sell_fee'), '0' );
            }
            goog.dom.getElement('id_user_fees_sell_fee').disabled = false;
        }

  });

  handler.listenOnce(userFeesDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {

      var fee_buy_text = goog.dom.forms.getValue( goog.dom.getElement("id_user_fees_buy_fee" ) );
      var fee_sell_text = goog.dom.forms.getValue( goog.dom.getElement("id_user_fees_sell_fee" ) );

      var pos = [0];
      var buy_fee_value = fmt.parse(fee_buy_text, pos);
      if (pos[0] != fee_buy_text.length || isNaN(buy_fee_value) || buy_fee_value <= 0 ) {
        buy_fee_value = null;
      } else {
        buy_fee_value = buy_fee_value * 100;
      }


      pos = [0];
      var sell_fee_value = fmt.parse(fee_sell_text, pos);
      if (pos[0] != fee_sell_text.length || isNaN(sell_fee_value) || sell_fee_value <= 0 ) {
        sell_fee_value = null;
      } else {
        sell_fee_value = sell_fee_value * 100;
      }

      var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

      var conn = this.getApplication().getBitexConnection();

      this.client_id_ =  goog.string.toNumber(selectedCustomer['ID']);
      this.update_profile_data_ = { 'TransactionFeeBuy': buy_fee_value, 'TransactionFeeSell': sell_fee_value };
      this.dispatchEvent(bitex.view.View.EventType.UPDATE_PROFILE);
    }
  }, this);

};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onUpdateSelectedCustomer_ = function(e) {
  var previous_data = e.old_data;
  var new_data = e.data;

  if (!goog.isDefAndNotNull(previous_data)) {
    return;
  }

  if ( previous_data['ID'] !== new_data['ID']  ) {
    return;
  }


  if (previous_data['TransactionFeeBuy']  !== new_data['TransactionFeeBuy'] ||
      previous_data['TransactionFeeSell']  !== new_data['TransactionFeeSell']) {
    this.recreateUserFeeComponents_(new_data);
  }

  var new_data_el;
  var new_data_parent_el;

  if (previous_data['TwoFactorEnabled']  !== new_data['TwoFactorEnabled']) {
    new_data_el = soy.renderAsElement( bitex.templates.AccountOverviewHeaderTwoFactors,
        { msg_customer_detail: {'TwoFactorEnabled' : new_data['TwoFactorEnabled'] } } );

    new_data_parent_el = goog.dom.getElementByClass('account-overview-two-factors',
                                                    goog.dom.getElement('account_overview_header_id') );

    goog.dom.removeChildren(new_data_parent_el);
    goog.dom.appendChild(new_data_parent_el, new_data_el);
  }

  if (previous_data['NeedWithdrawEmail']  !== new_data['NeedWithdrawEmail']) {

    new_data_el = soy.renderAsElement( bitex.templates.AccountOverviewHeaderWithDrawEmailData,
        {msg_customer_detail: {'NeedWithdrawEmail' : new_data['NeedWithdrawEmail'] } } );

    new_data_parent_el = goog.dom.getElementByClass('account-overview-withdraw-email',
                                                    goog.dom.getElement('account_overview_header_id'));

    goog.dom.removeChildren(new_data_parent_el);
    goog.dom.appendChild(new_data_parent_el, new_data_el);
  }
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onAccountOverviewHeaderClick_ = function(e) {
  var element = e.target;
  if (element.tagName  === goog.dom.TagName.I ) {
    element = goog.dom.getParentElement(element);
  }
  var data_action = element.getAttribute('data-action');
  if (goog.isDefAndNotNull(data_action)) {
    e.preventDefault();
    e.stopPropagation();

    var handler = this.getHandler();

    var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');
    switch( data_action ) {
      case 'SET_TWO_FACTOR':
        this.client_id_ =  goog.string.toNumber(selectedCustomer['ID']);
        this.update_profile_data_ = { 'TwoFactorEnabled': false };
        this.dispatchEvent(bitex.view.View.EventType.UPDATE_PROFILE);
        break;

      case 'SET_WITHDRAW_EMAIL':
        this.client_id_ =  selectedCustomer['ID'];
        this.client_id_ =  goog.string.toNumber(selectedCustomer['ID']);
        this.update_profile_data_ = {'WithdrawEmailValidation': !selectedCustomer['NeedWithdrawEmail'] };
        this.dispatchEvent(bitex.view.View.EventType.UPDATE_PROFILE);
        break;

      case 'SET_VERIFIED':
        /** @desc Verification Data Dialog content title */
        var MSG_VERIFICATION_DATA_DIALOG_TITLE = goog.getMsg('Enter verification data');

        var dlg_content = bitex.templates.EnterVerificationDataDialogContent({clientID: selectedCustomer['ID'] });

        var dlg = this.getApplication().showDialog(dlg_content,
                                                   MSG_VERIFICATION_DATA_DIALOG_TITLE,
                                                   bootstrap.Dialog.ButtonSet.createOkCancel());
        handler.listen(dlg, goog.ui.Dialog.EventType.SELECT, function(e) {
          if (e.key == 'ok') {
            e.preventDefault();
            e.stopPropagation();

            var verification_data = bitex.util.getFormAsJSON(goog.dom.getFirstElementChild(dlg.getContentElement()));

            if ( goog.isDefAndNotNull(verification_data['VerificationData']) &&
                !goog.string.isEmpty(verification_data['VerificationData']) ) {

              this.client_id_ =  goog.string.toNumber(verification_data['ClientID']);
              this.verification_data_ = verification_data['VerificationData'];

              this.verification_level_ = 3;

              this.dispatchEvent(bitex.view.View.EventType.SET_VERIFIED);

              dlg.dispose();
            }
          }
        }, this);


        break;
    }
  }
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.AccountOverview.prototype.onWithdrawListTableClick_ = function(e) {
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
 */
bitex.view.AccountOverview.prototype.onDepositListTableClick_ = function(e) {
  var element = e.target;
  if (element.tagName  === goog.dom.TagName.I ) {
    element = goog.dom.getParentElement(element);
  }

  var data_action = element.getAttribute('data-action');
  if (goog.isDefAndNotNull(data_action)) {
    e.preventDefault();
    e.stopPropagation();

    this.deposit_action_ = data_action;
    this.deposit_data_ = goog.json.parse(element.getAttribute('data-row'));

    switch( data_action ) {
      case 'SHOW_RECEIPT':
        this.receipt_data_ = {
          'SubmissionID': this.data_['Data']['SubmissionID'],
          'DepositReceipt': this.data_['Data']['DepositReceipt']
        };
        this.dispatchEvent(bitex.view.View.EventType.SHOW_RECEIPT);
        break;
      case 'SHOW_QR':
        this.qr_data_ = {
          'Wallet': this.deposit_data_['Data']['InputAddress'],
          'Currency': this.deposit_data_['Currency']
        };
        this.qr_data_verb_ = 'DEPOSIT';
        this.dispatchEvent(bitex.view.View.EventType.SHOW_QR);
        break;
      case 'UPLOAD':
        this.dispatchEvent(bitex.view.View.EventType.UPLOAD_RECEIPT);
        break;
      case 'CANCEL':
      case 'PROGRESS':
      case 'COMPLETE':
        this.dispatchEvent(bitex.view.View.EventType.PROCESS_DEPOSIT);
        break;
    }
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserCancelWithdraw_ = function(e) {
  this.withdraw_action_ = 'CANCEL';
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserSetWithdrawInProgress_ = function(e) {
  this.withdraw_action_ = 'PROGRESS';
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onUserSetWithdrawComplete_ = function(e) {
  this.withdraw_action_ = 'COMPLETE';
  this.dispatchEvent(bitex.view.View.EventType.PROCESS_WITHDRAW);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawListTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var selectedCustomer = this.getApplication().getModel().get('SelectedCustomer');

  var conn = this.getApplication().getBitexConnection();
  conn.requestWithdrawList(this.request_id_, page, limit, ['1', '2', '4', '8'], selectedCustomer['ID'], filter);
};

/**
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.AccountOverview.prototype.priceFormatter_ = function(value, rowSet) {
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
 * @param {*} value
 * @param {Object} rowSet
 */
bitex.view.AccountOverview.prototype.valuePriceFormatter_ = function(value, rowSet) {
  var paid_value  = rowSet['PaidValue'];
  var priceCurrency = rowSet['Currency'];
  var currency_description = this.getApplication().getCurrencyDescription(priceCurrency );
  var formatted_value =  this.getApplication().formatCurrency(value/1e8, priceCurrency);

  if (value === 0 ) {
    if (paid_value  === 0){
      return '-';
    }

    return goog.dom.createDom('abbr',
                              {'title': currency_description },
                              this.getApplication().formatCurrency(paid_value/1e8, priceCurrency) );

  } else if ( paid_value >0 && paid_value != value ) {
    var formatted_paid_value =  this.getApplication().formatCurrency(paid_value/1e8, priceCurrency);

    /**
     * @desc value abbrev title when paid value differs from declared value
     */
    var MSG_ACCOUNT_OVERVIEW_DEPOSIT_DIFFERENT_DECLARED_PAID_VALUE = goog.getMsg('declared / paid in {$currencydesc}' , {
      'currencydesc':currency_description});

    return goog.dom.createDom('abbr', {'title': MSG_ACCOUNT_OVERVIEW_DEPOSIT_DIFFERENT_DECLARED_PAID_VALUE  },
                              formatted_value + ' / ' + formatted_paid_value  );

  } else {
    return goog.dom.createDom('abbr', {'title': currency_description }, formatted_value  );
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawListReponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.withdraw_list_table_ ) ) {
    return
  }
  var msg = e.data;

  //console.log("WithdrawListGrp: ", msg['WithdrawListGrp'], ", Columns: ", msg['Columns']);

  this.withdraw_list_table_.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawProcessResponse_ = function(e) {
  var msg = e.data;
  //console.log(goog.debug.deepExpose(msg));
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onDepositProcessResponse_ = function(e) {
  var msg = e.data;
  //console.log(goog.debug.deepExpose(msg));
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onBalanceResponse_ = function(e) {
  var msg = e.data;
  var model = this.getApplication().getModel();

  delete msg['MsgType'];
  delete msg['BalanceReqID'];

  var user_balances = msg[model.get('UserID') ];

  var currencies = [];
  goog.object.forEach(user_balances, function( balance, currency ) {
    balance = balance / 1e8;
    var formatted_balance = this.getApplication().formatCurrency(balance, currency);

    currencies.push({ code: currency, model_key: currency + '.' + msg['ClientID'], balance: formatted_balance });


    var balance_key = 'balance_' +  currency + '.' + msg['ClientID'];
    model.set( balance_key , balance );
    model.set('formatted_' + balance_key, formatted_balance);
  }, this);

  goog.dom.removeChildren(goog.dom.getElement('account_overview_balances_id'));
  goog.soy.renderElement(goog.dom.getElement('account_overview_balances_id'), bitex.templates.YourAccountBalances, {
    currencies: currencies
  });
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.AccountOverview.prototype.onWithdrawRefresh_ = function(e) {
  var msg = e.data;
  this.withdraw_list_table_.insertOrUpdateRecord(msg, 0);
};

