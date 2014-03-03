goog.provide('bitex.app.SatoshiSquare');
goog.provide('bitex.app.satoshi_square');

goog.require('bitex.util');
goog.require('bitex.api.BitEx');

goog.require('goog.soy');
goog.require('bitex.templates');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');

goog.require('bitex.ui.OrderEntryX');
goog.require('bitex.ui.OrderEntryX.EventType');


goog.require('bitex.ui.Withdraw');
goog.require('bitex.ui.Withdraw.EventType');

goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');

goog.require('bitex.ui.OrderManager');
goog.require('bitex.ui.AccountActivity');
goog.require('bitex.ui.WithdrawList');

goog.require('bitex.ui.Customers');

goog.require('goog.fx');
goog.require('goog.fx.dom');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.object');

goog.require('bitex.app.UrlRouter');
goog.require('bitex.model.Model');
goog.require('bitex.model.Model.EventType');

goog.require('bootstrap.Dialog');
goog.require('bootstrap.Alert');

goog.require('goog.debug');

goog.require('bitex.view.NullView');
goog.require('bitex.view.SignupView');
goog.require('bitex.view.LoginView');
goog.require('bitex.view.TwoFactorView');
goog.require('bitex.view.ForgotPasswordView');
goog.require('bitex.view.SetNewPasswordView');
goog.require('bitex.view.VerificationView');
goog.require('bitex.view.DepositView');
goog.require('bitex.view.OfferBookView');
goog.require('bitex.view.AccountActivityView');
goog.require('bitex.view.SideBarView');
goog.require('bitex.view.WithdrawView');
goog.require('bitex.view.CustomersView');
goog.require('bitex.view.AccountOverview');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.SatoshiSquare = function() {
  goog.events.EventTarget.call(this);
  this.dialog_ = null;

  this.router_  = new bitex.app.UrlRouter( this, '', 'start');
  this.model_   = new bitex.model.Model(document.body);
  this.conn_    = new bitex.api.BitEx();
  this.views_   = new goog.ui.Component();


  this.currency_info_       = {};
  this.all_markets_         = {};
  this.brokers_by_country_  = {};
};
goog.inherits(bitex.app.SatoshiSquare, goog.events.EventTarget);
goog.addSingletonGetter(bitex.app.SatoshiSquare);


/**
 * @type {bitex.app.UrlRouter}
 * @private
 */
bitex.app.SatoshiSquare.prototype.router_;

/**
 * @type {bitex.model.Model}
 * @private
 */
bitex.app.SatoshiSquare.prototype.model_;

/**
 * @type {string}
 * @private
 */
bitex.app.SatoshiSquare.prototype.url_;

/**
 * @type {bitex.api.BitEx}
 * @private
 */
bitex.app.SatoshiSquare.prototype.conn_;

/**
 * @type {Object}
 * @private
 */
bitex.app.SatoshiSquare.prototype.currency_info_;

/**
 * @type {Array}
 * @private
 */
bitex.app.SatoshiSquare.prototype.all_markets_;

/**
 * @type {Object}
 * @private
 */
bitex.app.SatoshiSquare.prototype.brokers_by_country_;


/**
 * Event handler.
 * TODO(user): rename it to handler_ after all component subclasses in
 * inside Google have been cleaned up.
 * Code search: http://go/component_code_search
 * @type {goog.events.EventHandler}
 * @private
 */
bitex.app.SatoshiSquare.prototype.googUiComponentHandler_;

/**
 * @type {goog.ui.Dialog}
 */
bitex.app.SatoshiSquare.prototype.dialog_;

/**
 * @type {bitex.view.LoginView}
 */
bitex.app.SatoshiSquare.prototype.loginView_;

/**
 * @type {goog.ui.Component}
 */
bitex.app.SatoshiSquare.prototype.views_;

/**
 * @protected
 */
bitex.app.SatoshiSquare.prototype.createHtmlTemplates_ = function() {
  // Create all datagrids
  goog.dom.removeChildren( goog.dom.getElement('id_withdraw_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_customers_well') );
  goog.dom.removeChildren( goog.dom.getElement('id_trade_history_well') );
  goog.dom.removeChildren( goog.dom.getElement('account_overview_balances_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_withdraw_requests_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_trades_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_printed_boletos_id'));


  goog.soy.renderElement(goog.dom.getElement('id_withdraw_list'), bitex.templates.DataGrid, {
    id: 'id_withdraw_list_table',
    title: 'Withdrawal history'
  });

  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER = goog.getMsg('Username or email...');
  goog.soy.renderElement(goog.dom.getElement('id_customers_well'), bitex.templates.DataGrid, {
    id: 'id_customer_table',
    title: 'Customers',
    show_search: true,
    search_placeholder: MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER
  });

  goog.soy.renderElement(goog.dom.getElement('id_trade_history_well'), bitex.templates.DataGrid, {
    id: 'id_trade_history_table'
  });

  goog.soy.renderElement(goog.dom.getElement('account_overview_balances_id'), bitex.templates.DataGrid, {
    id: 'account_overview_balances_table_id'
  });

  goog.soy.renderElement(goog.dom.getElement('account_overview_withdraw_requests_id'), bitex.templates.DataGrid, {
    id: 'account_overview_withdraw_requests_table_id'
  });

  goog.soy.renderElement(goog.dom.getElement('account_overview_trades_id'), bitex.templates.DataGrid, {
    id: 'account_overview_trades_table_id'
  });

  goog.soy.renderElement(goog.dom.getElement('account_overview_printed_boletos_id'), bitex.templates.DataGrid, {
    id: 'account_overview_printed_boletos_table_id'
  });

  // create all order entries
  goog.dom.removeChildren( goog.dom.getElement('offer_book_order_entry_content'));
  var buy_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntry, {
    id: 'id_order_entry_buy',
    symbol:'',
    side:1,
    type:2,
    hide_fee:true,
    hide_client_id:true
  });
  var sell_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntry, {
    id: 'id_order_entry_sell',
    symbol:'',
    side:2,
    type:2,
    hide_fee:true,
    hide_client_id:true
  });
  goog.dom.appendChild(goog.dom.getElement('offer_book_order_entry_content'), buy_order_entry_el);
  goog.dom.appendChild(goog.dom.getElement('offer_book_order_entry_content'), sell_order_entry_el);


  // Order book
  goog.dom.removeChildren( goog.dom.getElement('id_order_book_bid_content'));
  goog.dom.removeChildren( goog.dom.getElement('id_order_book_ask_content'));

  /**
   * @desc Title in the bid side on the order book
   */
  var MSG_ORDER_BOOK_BID_TITLE = goog.getMsg('BID');

  /**
   * @desc Title in the ask side on the order book
   */
  var MSG_ORDER_BOOK_ASK_TITLE = goog.getMsg('ASK');

  /**
   * @desc Buyer column on the order book
   */
  var MSG_ORDER_BOOK_BUYER_COLUMN = goog.getMsg('Buyer');

  /**
   * @desc Seller column on the order book
   */
  var MSG_ORDER_BOOK_SELLER_COLUMN = goog.getMsg('Seller');

  /**
   * @desc Amount column on the order book
   */
  var MSG_ORDER_BOOK_AMOUNT_COLUMN = goog.getMsg('Amount');


  /**
   * @desc Price column on the order book
   */
  var MSG_ORDER_BOOK_PRICE_COLUMN = goog.getMsg('Price');

  goog.soy.renderElement(goog.dom.getElement('id_order_book_bid_content'), bitex.templates.OrderBook, {
    id: 'order_book_bid',
    title: MSG_ORDER_BOOK_BID_TITLE,
    columns: [MSG_ORDER_BOOK_BUYER_COLUMN, MSG_ORDER_BOOK_AMOUNT_COLUMN, MSG_ORDER_BOOK_PRICE_COLUMN]
  });

  goog.soy.renderElement(goog.dom.getElement('id_order_book_ask_content'), bitex.templates.OrderBook, {
    id: 'order_book_offer',
    title: MSG_ORDER_BOOK_ASK_TITLE,
    columns: [MSG_ORDER_BOOK_PRICE_COLUMN, MSG_ORDER_BOOK_AMOUNT_COLUMN, MSG_ORDER_BOOK_SELLER_COLUMN]
  });
};

/**
 * @return {goog.events.EventHandler}
 */
bitex.app.SatoshiSquare.prototype.getHandler = function() {
  return this.handler_ ||
      (this.handler_ = new goog.events.EventHandler(this));

};

/**
 * @param {string} url
 */
bitex.app.SatoshiSquare.prototype.run = function(url) {
  this.createHtmlTemplates_();

  this.url_ = url;


  // Populate all the views
  var startView           = new bitex.view.NullView(this);
  var setNewPasswordView  = new bitex.view.SetNewPasswordView(this);
  var loginView           = new bitex.view.LoginView(this);
  var signUpView          = new bitex.view.SignupView(this);
  var forgotPasswordView  = new bitex.view.ForgotPasswordView(this);
  var tosView             = new bitex.view.NullView(this);
  var depositView         = new bitex.view.DepositView(this);
  var verificationView    = new bitex.view.VerificationView(this);
  var enableTwoFactorView = new bitex.view.TwoFactorView(this);
  var offerBookView       = new bitex.view.OfferBookView(this);
  var accountActivityView = new bitex.view.AccountActivityView(this);
  var withdrawView        = new bitex.view.WithdrawView(this);
  var customersView       = new bitex.view.CustomersView(this);
  var accountOverviewView = new bitex.view.AccountOverview(this);
  var sideBarView         = new bitex.view.SideBarView(this);

  var tradingView         = new bitex.view.NullView(this);

  this.views_.addChild( sideBarView         );
  this.views_.addChild( startView           );
  this.views_.addChild( setNewPasswordView  );
  this.views_.addChild( loginView           );
  this.views_.addChild( signUpView          );
  this.views_.addChild( forgotPasswordView  );
  this.views_.addChild( tosView             );
  this.views_.addChild( tradingView         );
  this.views_.addChild( offerBookView       );
  this.views_.addChild( depositView         );
  this.views_.addChild( withdrawView        );
  this.views_.addChild( accountActivityView );
  this.views_.addChild( customersView       );
  this.views_.addChild( accountOverviewView );
  this.views_.addChild( verificationView    );
  this.views_.addChild( enableTwoFactorView );


  startView.decorate(goog.dom.getElement('start'));
  setNewPasswordView.decorate(goog.dom.getElement('set_new_password'));
  loginView.decorate(goog.dom.getElement('signin'));
  signUpView.decorate(goog.dom.getElement('signup'));
  forgotPasswordView.decorate(goog.dom.getElement('forgot_password'));
  tosView.decorate(goog.dom.getElement('tos'));
  tradingView.decorate(goog.dom.getElement('trading'));
  offerBookView.decorate(goog.dom.getElement('offerbook'));
  depositView.decorate(goog.dom.getElement('deposit'));
  withdrawView.decorate(goog.dom.getElement('withdraw'));
  accountActivityView.decorate(goog.dom.getElement('account_activity'));
  customersView.decorate(goog.dom.getElement('customers'));
  accountOverviewView.decorate(goog.dom.getElement('account_overview'));
  verificationView.decorate(goog.dom.getElement('verification'));
  enableTwoFactorView.decorate(goog.dom.getElement('enable_two_factor'));
  sideBarView.decorate(goog.dom.getElement('id_sidebar'));

  this.views_.decorate(document.body);


  this.router_.addView( '(start)'                       , startView           );
  this.router_.addView( '(set_new_password)'            , setNewPasswordView  );
  this.router_.addView( '(signin)'                      , loginView           );
  this.router_.addView( '(signup)'                      , signUpView          );
  this.router_.addView( '(forgot_password)'             , forgotPasswordView  );
  this.router_.addView( '(tos)'                         , tosView             );
  this.router_.addView( '(trading)'                     , tradingView         );
  this.router_.addView( '(offerbook)'                   , offerBookView       );
  this.router_.addView( '(deposit)'                     , depositView         );
  this.router_.addView( '(withdraw)'                    , withdrawView        );
  this.router_.addView( '(account_activity)'            , accountActivityView );
  this.router_.addView( '(customers)'                   , customersView       );
  this.router_.addView( '(account_overview)/(\\w+)/$'   , accountOverviewView );
  this.router_.addView( '(verification)'                , verificationView    );
  this.router_.addView( '(enable_two_factor)'           , enableTwoFactorView );

  this.router_.setView('start');
  this.router_.init();
  
  this.loginView_ = loginView;

  var handler = this.getHandler();
  handler.listen( this.router_ , bitex.app.UrlRouter.EventType.SET_VIEW, this.onBeforeSetView_ );

  handler.listen( this.conn_,bitex.api.BitEx.EventType.OPENED, this.onConnectionOpen_ );
  handler.listen( this.conn_, bitex.api.BitEx.EventType.CLOSED, this.onConnectionClose_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR ,  this.onConnectionError_);


  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, this.onBrokerListResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.SECURITY_LIST, this.onSecurityList_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_OK, this.onUserLoginOk_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_ERROR, this.onUserLoginError_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, this.onBitexTwoFactorSecretResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BALANCE_RESPONSE, this.onBitexBalanceResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK, this.onBitexPasswordChangedOk_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR, this.onBitexPasswordChangedError_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BOLETO_OPTIONS_RESPONSE, this.onBitexBoletoOptionsResponse_ );
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.GENERATE_BOLETO_RESPONSE, this.onBitexGenerateBoletoResponse_);


  handler.listen( this.conn_ , bitex.api.BitEx.EventType.EXECUTION_REPORT, this.onBitexExecutionReport_);

  handler.listen( document.body, 'click' , this.onBodyClick_);


  // Listen to the views
  handler.listen(signUpView, bitex.view.SignupView.EventType.SIGNUP, this.onUserSignupButton_ );
  handler.listen(loginView, bitex.view.LoginView.EventType.LOGIN, this.onUserLoginButtonClick_) ;

  handler.listen(enableTwoFactorView, bitex.view.TwoFactorView.EventType.ENABLE, this.onUserEnableTwoFactor_);
  handler.listen(enableTwoFactorView, bitex.view.TwoFactorView.EventType.DISABLE, this.onUserDisableTwoFactor_);
  handler.listen(forgotPasswordView, bitex.view.ForgotPasswordView.EventType.RECOVER_PASSWORD, this.onUserForgotPassword_);
  handler.listen(setNewPasswordView, bitex.view.SetNewPasswordView.EventType.SET_NEW_PASSWORD, this.onUserSetNewPassword_);
  handler.listen(depositView, bitex.view.DepositView.EventType.GEN_BOLETO, this.onUserGenerateBoleto_);
  handler.listen(sideBarView, bitex.view.SideBarView.EventType.CHANGE_MARKET, this.onUserChangeMarket_ );

  handler.listen(this.views_, bitex.ui.OrderEntryX.EventType.SUBMIT, this.onUserOrderEntry_ );
  handler.listen(this.views_, bitex.view.View.EventType.CANCEL_ORDER, this.onUserCancelOrder_ );
  handler.listen(this.views_, bitex.view.View.EventType.MARKET_DATA_SUBSCRIBE, this.onUserMarketDataSubscribe_);
  handler.listen(this.views_, bitex.view.View.EventType.MARKET_DATA_UNSUBSCRIBE, this.onUserMarketDataUnsubscribe_);

  handler.listen(this.views_, bitex.ui.OrderEntryX.EventType.SUBMIT, this.onUserOrderEntry_ );

  handler.listen(this.views_, bitex.ui.Withdraw.EventType.WITHDRAW, this.onUserWithdrawRequest_ );
  handler.listen(this.views_, bitex.view.View.EventType.CONFIRM_WITHDRAW, this.onUserConfirmWithdraw_ );

  handler.listen(this.model_, bitex.model.Model.EventType.SET + 'Broker', this.onModelSetBroker_);

  try{
    this.conn_.open(this.url_);
  } catch( e ) {
    /**
     * @desc Connection error message when trying to open websockets connection for the first time
     */
    var MSG_CONNECTION_ERROR = goog.getMsg('Error connecting to the server. Your browser MUST SUPPORT WebSockets.');
    this.showDialog(MSG_CONNECTION_ERROR );
    return;
  }
};

bitex.app.SatoshiSquare.prototype.getBitexConnection = function(){
  return this.conn_;
};

/**
 * @param {string} view_id
 */
bitex.app.SatoshiSquare.prototype.setView = function(view_id){

  this.router_.setView(view_id);
};


bitex.app.SatoshiSquare.prototype.onUserMarketDataSubscribe_ = function(e) {
  console.log('onUserMarketDataSubscribe: ' + e.target.getMDSubscriptionId() + ',' + e.target.getMDInstruments() );
  this.conn_.subscribeMarketData(e.target.getMDMarketDepth(),
                                 e.target.getMDInstruments(),
                                 e.target.getMDEntries(),
                                 e.target.getMDSubscriptionId());
};

bitex.app.SatoshiSquare.prototype.onUserMarketDataUnsubscribe_ = function(e) {
  console.log('onUserMarketDataUnsubscribe ' + e.target.getMDSubscriptionId() + ',' + e.target.getMDInstruments() );
  this.conn_.unSubscribeMarketData(e.target.getMDSubscriptionId());
};

/**
 * @param {string} symbol
 * @return {string}
 */
bitex.app.SatoshiSquare.prototype.getPriceCurrencyFromSymbol = function(symbol) {
  return symbol.substr(3);
};
/**
 * @param {string} symbol
 * @return {string}
 */
bitex.app.SatoshiSquare.prototype.getQtyCurrencyFromSymbol = function(symbol) {
  return symbol.substr(0,3);
};


bitex.app.SatoshiSquare.prototype.onUserChangeMarket_ = function(e) {
  var symbol = e.target.getSymbol();
  var qtyCurrency = this.getQtyCurrencyFromSymbol(symbol);
  var priceCurrency = this.getPriceCurrencyFromSymbol(symbol);

  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var qtyCurrencyDef = this.currency_info_[qtyCurrency];

  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var priceCurrencyDef = this.currency_info_[priceCurrency];

  this.getModel().set('SelectedSymbol', {
    symbol: symbol ,
    qty_currency: qtyCurrencyDef,
    price_currency: priceCurrencyDef
  });

};

bitex.app.SatoshiSquare.prototype.onBitexBoletoOptionsResponse_ = function(e) {
  var msg = e.data;

  var boleto_options = [];
  var boleto_options_group_elements = goog.dom.getElementsByClass('boleto-options-group');
  goog.array.forEach( boleto_options_group_elements, function( boleto_options_group_element ) {
    goog.dom.removeChildren(boleto_options_group_element);
    goog.array.forEach( msg['BoletoOptionGrp'], function(boleto_option) {
      var boleto_id = boleto_option['BoletoId'];
      var description = boleto_option['Description'];

      boleto_options.push( { id:boleto_id, description:description } );
    });
  });
  this.getModel().set('BoletoOptions', boleto_options);
};

bitex.app.SatoshiSquare.prototype.onBitexPasswordChangedOk_ = function(e) {
  /**
   * @desc Password Chanced with sucess dialog title
   */
  var MSG_BITEX_PASSWORD_CHANGED_OK_TITLE = goog.getMsg('Success');


  /**
   * @desc Password Chanced with sucess dialog content
   */
  var MSG_BITEX_PASSWORD_CHANGED_OK_CONTENT = goog.getMsg('Password Changed');

  this.showDialog( MSG_BITEX_PASSWORD_CHANGED_OK_CONTENT, MSG_BITEX_PASSWORD_CHANGED_OK_TITLE );

  this.router_.setView('signin');
};

bitex.app.SatoshiSquare.prototype.onBitexPasswordChangedError_ = function(e) {
  /**
   * @desc Password Chanced with sucess dialog title
   */
  var MSG_BITEX_PASSWORD_CHANGED_ERROR_TITLE = goog.getMsg('Error');


  /**
   * @desc Password Chanced with sucess dialog content
   */
  var MSG_BITEX_PASSWORD_CHANGED_ERROR_CONTENT = goog.getMsg('There was an error changing the password');

  this.showDialog( MSG_BITEX_PASSWORD_CHANGED_ERROR_CONTENT, MSG_BITEX_PASSWORD_CHANGED_ERROR_TITLE );

};

bitex.app.SatoshiSquare.prototype.onBitexGenerateBoletoResponse_ = function(e) {
  var msg = e.data;

  /**
   * @desc Boleto dialog title
   */
  var MSG_BITEX_BOLETO_DIALOG_TITLE = goog.getMsg('Boleto');

  this.showDialog(bitex.templates.BoletoDialog({boleto_id:msg['BoletoId']  }), MSG_BITEX_BOLETO_DIALOG_TITLE );
};


bitex.app.SatoshiSquare.prototype.onBitexExecutionReport_ = function(e) {
  var msg = e.data;

  var MSG_ORDER_EXECUTION_TITLE_NOTIFICATION = goog.getMsg("Order {$id} ", {id: msg['OrderID']} );

  /**
   * @desc - Partially filled notification message
   */
  var MSG_NOTIFICATION_ORDER_PARTIALLY_FILLED = goog.getMsg('partially filled');

  /**
   * @desc - filled notification message
   */
  var MSG_NOTIFICATION_ORDER_FILLED = goog.getMsg('filled');

  /**
   * @desc - Canceled notification message
   */
  var MSG_NOTIFICATION_ORDER_CANCELLED = goog.getMsg('cancelled');


  switch( msg['ExecType'] ) {
    case '1':  //Partial Execution
      this.showNotification('success', MSG_ORDER_EXECUTION_TITLE_NOTIFICATION, MSG_NOTIFICATION_ORDER_PARTIALLY_FILLED);
      break;
    case '2':  //Execution
      this.showNotification('success', MSG_ORDER_EXECUTION_TITLE_NOTIFICATION, MSG_NOTIFICATION_ORDER_FILLED);
      break;
    case '4':  //Offer Cancelled
      this.showNotification('success', MSG_ORDER_EXECUTION_TITLE_NOTIFICATION, MSG_NOTIFICATION_ORDER_CANCELLED);
      break;
  }
};


bitex.app.SatoshiSquare.prototype.onBitexTwoFactorSecretResponse_ = function(e){
  var msg = e.data;
  this.getModel().set('TwoFactorSecret', msg['TwoFactorSecret']);
  this.getModel().set('TwoFactorEnabled', msg['TwoFactorEnabled'] );
};

bitex.app.SatoshiSquare.prototype.onBitexBalanceResponse_ = function(e) {
  var msg = e.data;
  delete msg['MsgType'];
  delete msg['BalanceReqID'];

  goog.object.forEach(msg, function( balances, broker ) {
    goog.object.forEach(balances, function( balance, currency ) {
      balance = balance / 1e8;

      var balance_key = 'balance_' +  currency.toLowerCase();
      this.getModel().set( balance_key , balance );
      this.getModel().set('formatted_' + balance_key, this.formatCurrency(balance, currency));
    }, this);
  },this);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserWithdrawRequest_ = function(e){
  var data = e.target.getModel().data;
  var reqId = parseInt(Math.random() * 1000000, 10);

  var amount = goog.string.toNumber(data['Amount']);
  var type = data['Type'];
  var currency = data['Currency'];


  delete data['Amount'];
  delete data['Type'];
  delete data['Currency'];

  this.conn_.requestWithdraw(reqId, amount, type, currency, data);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserConfirmWithdraw_ = function(e){
  this.conn_.confirmWithdraw(e.target.getConfirmationToken());
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserOrderEntry_ = function(e){
  this.conn_.sendLimitedOrder(e.target.getSymbol(),
                              e.target.getAmount(),
                              e.target.getPrice(),
                              e.target.getSide(),
                              e.target.getClientID());
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserCancelOrder_ = function(e){
  console.log('cancelling order ...');
  this.conn_.cancelOrder(e.target.getClientOrderId(), e.target.getOrderId());
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserGenerateBoleto_ = function(e){
  this.conn_.generateBoleto(e.target.getBoletoId() , e.target.getAmount());
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserForgotPassword_ = function(e){
  this.conn_.forgotPassword(e.target.getEmail());
  this.router_.setView('set_new_password');
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserSetNewPassword_ = function(e){
  this.conn_.resetPassword(e.target.getToken() ,  e.target.getPassword() );
};



/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserEnableTwoFactor_ = function(e){
  var code = e.target.getCode();
  var has_code = !goog.string.isEmpty(code);
  var secret = "";
  if (has_code) {
    secret = this.getModel().get('TwoFactorSecret');
  }
  this.conn_.enableTwoFactor( true, secret, code );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserDisableTwoFactor_ = function(e){
  this.conn_.enableTwoFactor( false );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onBodyClick_ =function(e){
  var element = e.target;

  var view_name = element.getAttribute('data-switch-view');
  if (goog.isDefAndNotNull(view_name)) {
    e.preventDefault();
    e.stopPropagation();

    this.router_.setView(view_name );
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserLoginButtonClick_ = function(e){
  var username = e.target.getUsername();
  var password = e.target.getPassword();

  this.conn_.login(username, password);
};


/**
 * @param {bitex.api.BitExEvent} e
 */
bitex.app.SatoshiSquare.prototype.onUserLoginOk_ = function(e) {
  var msg = e.data;

  goog.dom.classes.add( document.body, 'bitex-logged'  );
  goog.dom.classes.remove( document.body, 'bitex-not-logged' );

  this.model_.set('UserID',           msg['UserID'] );
  this.model_.set('Username',         msg['Username']);
  this.model_.set('TwoFactorEnabled', msg['TwoFactorEnabled']);
  this.model_.set('IsBroker',         msg['IsBroker'] );
  this.model_.set('Broker',           msg['Broker']);


  goog.dom.removeChildren( goog.dom.getElement("id_account_summary_content"));

  if (! msg['IsBroker'] ) {
    goog.dom.classes.add( document.body, 'bitex-non-broker'  );

    var balance_currencies = msg['Broker']['Currencies'].toLocaleLowerCase().split(',');

    // get all crypto currencies
    goog.object.forEach( this.currency_info_ , function(currency_obj, currency_code) {
      if (currency_obj.is_crypto ) {
        balance_currencies.push(currency_code.toLocaleLowerCase());
      }
    });

    goog.soy.renderElement(goog.dom.getElement('id_account_summary_content'), bitex.templates.YourAccountSummary, {
      currencies: balance_currencies
    });
  } else {
    goog.dom.classes.add( document.body, 'bitex-broker'  );
  }

  this.conn_.requestBalances();

  // Request Boleto Options
  this.conn_.requestBoletoOptions();

  // set view to Trading
  this.router_.setView('offerbook');
};

/**
 * @param {bitex.api.BitExEvent} e
 */
bitex.app.SatoshiSquare.prototype.onUserLoginError_ = function(e) {
  goog.dom.classes.add( document.body, 'bitex-not-logged'  );
  goog.dom.classes.remove( document.body, 'bitex-logged' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );


  var msg = e.data;

  this.model_.set('UserID', '');
  this.model_.set('Username', '');

  if (msg['NeedSecondFactor']) {
    /**
     * @desc google authentication dialog title
     */
    var MSG_TWO_STEPS_AUTHENTICATION_DIALOG_TITLE = goog.getMsg('2 steps authentication');

    var dlg_ = this.showDialog(MSG_TWO_STEPS_AUTHENTICATION_DIALOG_TITLE,
                               bitex.templates.GoogleAuthenticationCodeDialogContent({id:"id_second_factor"  }),
                               goog.ui.Dialog.ButtonSet.createOkCancel() );

    var handler = this.getHandler();
    handler.listenOnce(dlg_, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var second_factor = goog.dom.forms.getValue( goog.dom.getElement("id_second_factor") );

        this.conn_.login( this.loginView_.getUsername(), this.loginView_.getPassword(), second_factor );
      }
    });

  } else {
    this.showDialog( msg['UserStatusText'] );
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onUserSignupButton_ = function(e) {
  this.conn_.signUp( e.target.getUsername(),
                     e.target.getPassword(),
                     e.target.getEmail(),
                     e.target.getState(),
                     e.target.getCountry(),
                     e.target.getBroker());
};

/**
 * return {bitex.model.Model}
 */
bitex.app.SatoshiSquare.prototype.getModel = function() {
  return this.model_;
};

bitex.app.SatoshiSquare.prototype.onBeforeSetView_ = function(e){
  var view_id = e.view_id;
  if (! this.conn_.isLogged()) {
    switch(view_id) {
      case 'start':
      case 'signin':
      case 'signup':
      case 'forgot_password':
      case 'set_new_password':
        break;
      default:
        // redirect non-logged users to the signin page
        this.router_.setView('start');
        return false;
    }
  }

  // remove any active view classes from document body
  var classes = goog.dom.classes.get(document.body );
  var classes_to_remove = [];
  goog.array.forEach( classes, function( cls ) {
    if (goog.string.startsWith(cls, 'active-view-' ) ){
      classes_to_remove.push(cls);
    }
  });
  goog.array.forEach( classes_to_remove, function( cls ) {
    goog.dom.classes.remove( document.body, cls );
  });

  document.body.scrollTop = 0;

  // set the current view
  goog.dom.classes.add( document.body, 'active-view-' + view_id );
};

bitex.app.SatoshiSquare.prototype.getBrokerByCountry = function(country) {
  return this.brokers_by_country_[country];
};

/**
 * @param {number} amount
 * @param {string} currency_code
 */
bitex.app.SatoshiSquare.prototype.formatCurrency  =   function(amount, currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  var formatter = new goog.i18n.NumberFormat( currency_def.format, currency_def.code );
  return formatter.format(amount);
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onSecurityList_ =   function(e) {
  var msg = e.data;

  goog.array.forEach(msg['Currencies'], function( currency) {
    this.currency_info_[ currency['Code'] ] = {
      code: currency['Code'],
      format: currency['FormatJS'],
      description : currency['Description'],
      sign : currency['Sign'],
      pip : currency['Pip'],
      is_crypto : currency['IsCrypto']
    };

    var balance_key = 'balance_' +  currency['Code'].toLowerCase();
    this.model_.set( balance_key , 0 );
    this.model_.set('formatted_' + balance_key, this.formatCurrency(0, currency['Code']));
  }, this);

  var symbols = [];
  goog.array.forEach(msg['Instruments'], function( instrument) {
    var symbol = instrument['Symbol'];

    this.all_markets_[symbol]  = {
      symbol: symbol,
      description: instrument['Description']
    };

    symbols.push( symbol );
  }, this );

  this.model_.set('SecurityList', msg);
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onModelSetBroker_ = function(e) {
  var broker = e.data;
  console.log(goog.debug.deepExpose(broker));
  var allowed_markets = {};
  goog.array.forEach( broker['Currencies'].split(',') , function(currency) {
    var market = goog.object.findKey( this.all_markets_, function(market_info, symbol) {
      if (symbol.indexOf(currency) >= 0)  {
        return true;
      }
    });
    if (goog.isDefAndNotNull(market)) {
      allowed_markets[market] = this.all_markets_[market];
    }
  }, this);

  console.log(goog.debug.deepExpose(allowed_markets));
  this.getModel().set('AllowedMarkets',allowed_markets);
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.SatoshiSquare.prototype.onBrokerListResponse_ =  function(e){
  var msg = e.data;

  goog.array.forEach(msg['BrokerListGrp'], function( broker_array )  {
    var broker_info = {};
    goog.array.forEach(msg['Columns'], function( column, index )  {
      broker_info[column] = broker_array[index];
    }, this);
    if (broker_info['CountryCode'] in this.brokers_by_country_) {
      this.brokers_by_country_[broker_info['CountryCode'] ].push(broker_info);
    } else {
      this.brokers_by_country_[broker_info['CountryCode'] ] = [broker_info];
    }
  }, this );


  this.model_.set('BrokerList', msg);
};



/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.SatoshiSquare.prototype.onConnectionOpen_ = function(e){
  goog.dom.classes.remove( document.body, 'ws-not-connected' );
  goog.dom.classes.add( document.body, 'ws-connected' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );

  this.conn_.requestSecurityList();

  this.conn_.requestBrokerList();
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.SatoshiSquare.prototype.onConnectionClose_ = function(e){
  goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
  goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );
  this.router_.setView('start');

  // TODO:  TRY TO REOPEN THE CONNECTION, OR RELOAD THE PAGE.
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.SatoshiSquare.prototype.onConnectionError_ = function(e){
  goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
  goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );

  /**
   * @desc Connection error dialog general content
   */
  var MSG_CONNECTION_ERROR_DIALOG_GENERAL_CONTENT = goog.getMsg('Error connecting to the server. Your browser MUST SUPPORT WebSockets.');

  this.showDialog(MSG_CONNECTION_ERROR_DIALOG_GENERAL_CONTENT);

  this.router_.setView('start');

  // TODO:  TRY TO REOPEN THE CONNECTION, OR RELOAD THE PAGE.
};

/**
 * @param {string} content
 * @param {string} opt_title
 * @param {goog.ui.Dialog.ButtonSet?} opt_button_set The button set to use.
 * @return {bootstrap.Dialog}
 */
bitex.app.SatoshiSquare.prototype.showDialog = function(content, opt_title, opt_button_set) {
  /**
   * @desc Connection error dialog title
   */
  var MSG_CONNECTION_ERROR_DEFAULT_DIALOG_TITLE = goog.getMsg('Error');
  var title = opt_title || MSG_CONNECTION_ERROR_DEFAULT_DIALOG_TITLE ;

  var buttonSet = opt_button_set || goog.ui.Dialog.ButtonSet.createOk();

  if (goog.isDefAndNotNull(this.dialog_)) {
    this.dialog_.dispose();
    this.dialog_ = null;
  }

  this.dialog_ = new bootstrap.Dialog();
  this.dialog_.setTitle(title);
  this.dialog_.setContent(content);
  this.dialog_.setButtonSet( buttonSet);
  this.dialog_.setVisible(true);

  return this.dialog_;
};

/**
 * @param {string} type
 * @param {string} title
 * @param {string} content
 * @param {number} opt_display_time.  Defaults to 2000 milliseconds
 */
bitex.app.SatoshiSquare.prototype.showNotification = function(type , title, content,  opt_display_time) {
  var display_time = 2000;
  if ( goog.isNumber(opt_display_time) ) {
    display_time = opt_display_time;
  }

  var alert_content = goog.dom.createDom( 'span', undefined,
    [goog.dom.createDom( 'strong', undefined, title), ' ', content ] );

  var notification = new bootstrap.Alert(type, alert_content, true );

  notification.render( goog.dom.getElement('id_notifications') );

  if (display_time > 0) {
    var handler = this.getHandler();

    goog.Timer.callOnce(function(e){
      var anim = new goog.fx.dom.FadeOutAndHide(notification.getElement(), 200);
      handler.listenOnce(anim, goog.fx.Transition.EventType.END, function(e) {
        notification.dispose();
        anim.dispose();
      });
      anim.play();
    }, display_time, this);
  }
};

/**
 * @param {string} url
 */
bitex.app.satoshi_square = function( url ) {
  var app = new bitex.app.SatoshiSquare();
  app.run(url );
};

goog.exportSymbol('bitex.app.satoshi_square', bitex.app.satoshi_square );
