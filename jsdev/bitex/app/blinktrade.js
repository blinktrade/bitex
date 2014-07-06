goog.provide('bitex.app.BlinkTrade');
goog.provide('bitex.app.blink_trade');

goog.require('goog.structs.Map');
goog.require('goog.structs.Set');

goog.require('bitex.util');
goog.require('bitex.api.BitEx');

goog.require('goog.soy');
goog.require('bitex.templates');

goog.require('bitex.ui.OrderBook');
goog.require('bitex.ui.OrderBook.Side');

goog.require('bitex.ui.OrderEntryX');
goog.require('bitex.ui.OrderEntryX.EventType');


goog.require('bitex.ui.OrderBook.EventType');
goog.require('bitex.ui.OrderBookEvent');

goog.require('bitex.ui.OrderManager');
goog.require('bitex.ui.AccountActivity');
goog.require('bitex.ui.WithdrawList');

goog.require('bitex.ui.Customers');

goog.require('goog.fx');
goog.require('goog.fx.dom');

goog.require('goog.events.InputHandler');

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
goog.require('bootstrap.Dialog.ButtonSet');
goog.require('bootstrap.Alert');
goog.require('bootstrap.Dropdown');


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
goog.require('bitex.view.BrokerView');
goog.require('bitex.view.TradingView');
goog.require('bitex.view.ToolBarView');
goog.require('bitex.view.MarketView');
goog.require('bitex.view.LedgerView');
goog.require('bitex.view.ProfileView')


/**
 * @param {string=} opt_default_country
 * @param {number=} opt_default_broker_id
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.BlinkTrade = function(opt_default_country, opt_default_broker_id) {
  goog.events.EventTarget.call(this);

  bootstrap.Dropdown.install();

  this.dialog_ = null;
  this.error_message_alert_timeout_ = 5000;

  try {
    this.router_  = new bitex.app.UrlRouter( this, '', 'start');
    this.model_   = new bitex.model.Model(document.body);
    this.conn_    = new bitex.api.BitEx();
    this.views_   = new goog.ui.Component();
    this.pricemin_ = 0;
    this.pricemax_ = 0;
  } catch ( error) {
    this.showDialog(error);
  }

  if (goog.isDefAndNotNull(opt_default_country)) {
    this.model_.set('DefaultCountry', opt_default_country);
  }

  if (goog.isDefAndNotNull(opt_default_broker_id)) {
    this.model_.set('DefaultBrokerID', opt_default_broker_id);
  }

  this.currency_info_       = {};
  this.all_markets_         = {};
};
goog.inherits(bitex.app.BlinkTrade, goog.events.EventTarget);
goog.addSingletonGetter(bitex.app.BlinkTrade);


/**
 * @type {bitex.app.UrlRouter}
 * @private
 */
bitex.app.BlinkTrade.prototype.router_;

/**
 * @type {bitex.model.Model}
 * @private
 */
bitex.app.BlinkTrade.prototype.model_;

/**
 * @type {string}
 * @private
 */
bitex.app.BlinkTrade.prototype.url_;

/**
 * @type {bitex.api.BitEx}
 * @private
 */
bitex.app.BlinkTrade.prototype.conn_;

/**
 * @type {Object}
 * @private
 */
bitex.app.BlinkTrade.prototype.currency_info_;

/**
 * @type {Array}
 * @private
 */
bitex.app.BlinkTrade.prototype.all_markets_;


/**
 * Event handler.
 * TODO(user): rename it to handler_ after all component subclasses in
 * inside Google have been cleaned up.
 * Code search: http://go/component_code_search
 * @type {goog.events.EventHandler}
 * @private
 */
bitex.app.BlinkTrade.prototype.handler_;

/**
 * @type {goog.ui.Dialog}
 */
bitex.app.BlinkTrade.prototype.dialog_;

/**
 * @type {bitex.view.LoginView}
 */
bitex.app.BlinkTrade.prototype.loginView_;

/**
 * @type {goog.ui.Component}
 */
bitex.app.BlinkTrade.prototype.views_;

/**
 * @type {number}
 */
bitex.app.BlinkTrade.prototype.error_message_alert_timeout_;

/**
 * @protected
 */
bitex.app.BlinkTrade.prototype.createHtmlTemplates_ = function() {
  // Create all datagrids
  goog.dom.removeChildren( goog.dom.getElement('id_withdraw_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_withdraw_request_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_deposit_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_deposit_request_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_ledger_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_trade_list'));
  goog.dom.removeChildren( goog.dom.getElement('id_customers_well') );
  goog.dom.removeChildren( goog.dom.getElement('id_trade_history_well') );
  goog.dom.removeChildren( goog.dom.getElement('account_overview_balances_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_withdraw_requests_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_trades_id'));
  goog.dom.removeChildren( goog.dom.getElement('account_overview_deposits_id'));
  goog.dom.removeChildren( goog.dom.getElement('id_trading_well'));


  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER = goog.getMsg('Search ...');


  /**
   * @desc deposit table title
   */
  var MSG_WITHDRAW_TABLE_TITLE  = goog.getMsg('Withdrawals');

  goog.soy.renderElement(goog.dom.getElement('id_withdraw_list'), bitex.templates.DataGrid, {
    id: 'id_withdraw_list_table',
    title: MSG_WITHDRAW_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });

  goog.soy.renderElement(goog.dom.getElement('id_withdraw_request_list'), bitex.templates.DataGrid, {
    id: 'id_withdraw_request_list_table',
    title: MSG_WITHDRAW_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });



  /**
   * @desc deposit table title
   */
  var MSG_DEPOSIT_TABLE_TITLE  = goog.getMsg('Deposits');

  /**
   * @desc last trades table title
   */
  var MSG_LAST_TRADES_TABLE_TITLE  = goog.getMsg('Last trades');


  goog.soy.renderElement(goog.dom.getElement('id_deposit_list'), bitex.templates.DataGrid, {
    id: 'id_deposit_list_table',
    title: MSG_DEPOSIT_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });

  goog.soy.renderElement(goog.dom.getElement('id_deposit_request_list'), bitex.templates.DataGrid, {
    id: 'id_deposit_request_list_table',
    title: MSG_DEPOSIT_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });


  goog.soy.renderElement(goog.dom.getElement('id_trade_list'), bitex.templates.DataGrid, {
    id: 'id_trade_list_table',
    title: MSG_LAST_TRADES_TABLE_TITLE,
    show_search: false
  });


  /** @desc Order manager table tittle */
  var MSG_ORDER_MANAGER_TABLE_TITLE = goog.getMsg('My orders');
  goog.soy.renderElement(goog.dom.getElement('id_trading_well'), bitex.templates.DataGrid, {
    id: 'id_order_manager_table',
    title: MSG_ORDER_MANAGER_TABLE_TITLE,
    show_search: false
  });


  /**
   * @desc Title  for the customers table
   */
  var MSG_CUSTOMERS_TABLE_TITLE = goog.getMsg('Customers');

  /**
   * @desc placeholder for the search input text in the customers table
   */
  var MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER = goog.getMsg('Username or email...');
  goog.soy.renderElement(goog.dom.getElement('id_customers_well'), bitex.templates.DataGrid, {
    id: 'id_customer_table',
    title: MSG_CUSTOMERS_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_CUSTOMERS_TABLE_SEARCH_PLACEHOLDER
  });

  goog.soy.renderElement(goog.dom.getElement('id_trade_history_well'), bitex.templates.DataGrid, {
    id: 'id_trade_history_table'
  });

  /**
   * @desc Title  for the customers table
   */
  var MSG_BROKER_CUSTOMER_ACCOUNT_OVERVIEW_TABLE_TITLE = goog.getMsg('Withdraw requests...');
  goog.soy.renderElement(goog.dom.getElement('account_overview_withdraw_requests_id'), bitex.templates.DataGrid, {
    id: 'account_overview_withdraw_requests_table_id',
    title: MSG_BROKER_CUSTOMER_ACCOUNT_OVERVIEW_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });

  /**
   * @desc Trades table title
   */
  var MSG_TRADES_TABLE_TITLE = goog.getMsg('Trades');

  goog.soy.renderElement(goog.dom.getElement('account_overview_trades_id'), bitex.templates.DataGrid, {
    id: 'account_overview_trades_table_id',
    title: MSG_TRADES_TABLE_TITLE
  });


  goog.soy.renderElement(goog.dom.getElement('account_overview_deposits_id'), bitex.templates.DataGrid, {
    id: 'account_overview_deposits_table_id',
    title: MSG_DEPOSIT_TABLE_TITLE,
    show_search: true,
    search_placeholder: MSG_DEPOSITS_TABLE_SEARCH_PLACEHOLDER
  });

  // create all order entries
  goog.dom.removeChildren( goog.dom.getElement('offer_book_order_entry_content'));
  var buy_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntry, {
    id: 'id_order_entry_buy',
    symbol:'',
    side:1,
    type:2,
    hide_fee:true,
    hide_client_id:true,
    broker_id:''
  });
  var sell_order_entry_el = goog.soy.renderAsElement(bitex.templates.OrderEntry, {
    id: 'id_order_entry_sell',
    symbol:'',
    side:2,
    type:2,
    hide_fee:true,
    hide_client_id:true,
    broker_id:''
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
bitex.app.BlinkTrade.prototype.getHandler = function() {
  return this.handler_ ||
      (this.handler_ = new goog.events.EventHandler(this));

};

/**
 * @param {string} opt_url
 */
bitex.app.BlinkTrade.prototype.run = function(opt_url) {
  var url =  'wss://' + window.location.hostname + '/trade/';
  if (goog.isDefAndNotNull(opt_url)) {
    url = opt_url;
  }


  this.createHtmlTemplates_();

  this.url_ = url;


  // Populate all the views
  var startView           = new bitex.view.NullView(this);
  var setNewPasswordView  = new bitex.view.SetNewPasswordView(this);
  var loginView           = new bitex.view.LoginView(this);
  var signUpView          = new bitex.view.SignupView(this);
  var forgotPasswordView  = new bitex.view.ForgotPasswordView(this);
  var tosView             = new bitex.view.NullView(this);
  var depositView         = new bitex.view.DepositView(this, false);
  var depositRequestsView = new bitex.view.DepositView(this, true);
  var verificationView    = new bitex.view.VerificationView(this);
  var enableTwoFactorView = new bitex.view.TwoFactorView(this);
  var offerBookView       = new bitex.view.OfferBookView(this);
  var accountActivityView = new bitex.view.AccountActivityView(this);
  var withdrawView        = new bitex.view.WithdrawView(this, false);
  var withdrawRequestsView= new bitex.view.WithdrawView(this, true);
  var customersView       = new bitex.view.CustomersView(this);
  var accountOverviewView = new bitex.view.AccountOverview(this);
  var brokerView          = new bitex.view.BrokerView(this);
  var marketView          = new bitex.view.MarketView(this);
  var tradingView         = new bitex.view.TradingView(this);
  var toolBarView         = new bitex.view.ToolBarView(this);
  var sideBarView         = new bitex.view.SideBarView(this);
  var ledgerView          = new bitex.view.LedgerView(this);
  var profileView         = new bitex.view.ProfileView(this);
  var brokerApplicationView= new bitex.view.NullView(this);



  this.views_.addChild( toolBarView         );
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
  this.views_.addChild( depositRequestsView );
  this.views_.addChild( withdrawView        );
  this.views_.addChild( withdrawRequestsView);
  this.views_.addChild( accountActivityView );
  this.views_.addChild( customersView       );
  this.views_.addChild( accountOverviewView );
  this.views_.addChild( verificationView    );
  this.views_.addChild( enableTwoFactorView );
  this.views_.addChild( brokerView          );
  this.views_.addChild( marketView          );
  this.views_.addChild( ledgerView          );
  this.views_.addChild( profileView         );
  this.views_.addChild( brokerApplicationView);

  startView.decorate(goog.dom.getElement('start'));
  setNewPasswordView.decorate(goog.dom.getElement('set_new_password'));
  loginView.decorate(goog.dom.getElement('signin'));
  signUpView.decorate(goog.dom.getElement('signup'));
  forgotPasswordView.decorate(goog.dom.getElement('forgot_password'));
  tosView.decorate(goog.dom.getElement('tos'));
  tradingView.decorate(goog.dom.getElement('trading'));
  offerBookView.decorate(goog.dom.getElement('offerbook'));
  depositView.decorate(goog.dom.getElement('deposit'));
  depositRequestsView.decorate(goog.dom.getElement('deposit_requests'));
  withdrawView.decorate(goog.dom.getElement('withdraw'));
  withdrawRequestsView.decorate(goog.dom.getElement('withdraw_requests'));
  accountActivityView.decorate(goog.dom.getElement('account_activity'));
  customersView.decorate(goog.dom.getElement('customers'));
  accountOverviewView.decorate(goog.dom.getElement('account_overview'));
  verificationView.decorate(goog.dom.getElement('verification'));
  enableTwoFactorView.decorate(goog.dom.getElement('enable_two_factor'));
  sideBarView.decorate(goog.dom.getElement('id_sidebar'));
  toolBarView.decorate(goog.dom.getElement('id_toolbar') );
  brokerView.decorate(goog.dom.getElement('my_broker'));
  marketView.decorate(goog.dom.getElement('market'));
  ledgerView.decorate(goog.dom.getElement('ledger'));
  profileView.decorate(goog.dom.getElement('profile'));
  brokerApplicationView.decorate(goog.dom.getElement('broker_application'));

  this.views_.decorate(document.body);


  this.router_.addView( '(start)'                       , startView           );
  this.router_.addView( '(set_new_password)'            , setNewPasswordView  );
  this.router_.addView( '(signin)'                      , loginView           );
  this.router_.addView( '(signup)'                      , signUpView          );
  this.router_.addView( '(forgot_password)'             , forgotPasswordView  );
  this.router_.addView( '(tos)'                         , tosView             );
  this.router_.addView( '(trading)'                     , tradingView         );
  this.router_.addView( '(offerbook)'                   , offerBookView       );
  this.router_.addView( '(deposit_requests)'            , depositRequestsView );
  this.router_.addView( '(deposit)'                     , depositView         );
  this.router_.addView( '(withdraw_requests)'           , withdrawRequestsView);
  this.router_.addView( '(withdraw)'                    , withdrawView        );
  this.router_.addView( '(account_activity)'            , accountActivityView );
  this.router_.addView( '(customers)'                   , customersView       );
  this.router_.addView( '(account_overview)/(\\w+)/$'   , accountOverviewView );
  this.router_.addView( '(verification)'                , verificationView    );
  this.router_.addView( '(enable_two_factor)'           , enableTwoFactorView );
  this.router_.addView( '(my_broker)'                   , brokerView          );
  this.router_.addView( '(market)'                      , marketView          );
  this.router_.addView( '(ledger)'                      , ledgerView          );
  this.router_.addView( '(profile)'                     , profileView          );
  this.router_.addView( '(broker_application)'          , brokerApplicationView);

  this.router_.setView('start');
  this.router_.init();
  
  this.loginView_ = loginView;

  var handler = this.getHandler();
  handler.listen( this.router_ , bitex.app.UrlRouter.EventType.SET_VIEW, this.onBeforeSetView_ );

  handler.listen( this.conn_, bitex.api.BitEx.EventType.OPENED, this.onConnectionOpen_ );
  handler.listen( this.conn_, bitex.api.BitEx.EventType.CLOSED, this.onConnectionClose_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR ,  this.onConnectionError_);
  handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR_MESSAGE, this.onConnectionErrorMessage_);


  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, this.onBrokerListResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.SECURITY_LIST, this.onSecurityList_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_OK, this.onUserLoginOk_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.LOGIN_ERROR, this.onUserLoginError_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, this.onBitexTwoFactorSecretResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.BALANCE_RESPONSE, this.onBitexBalanceResponse_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK, this.onBitexPasswordChangedOk_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR, this.onBitexPasswordChangedError_);
  handler.listen( this.conn_ , bitex.api.BitEx.EventType.DEPOSIT_METHODS_RESPONSE, this.onBitexDepositMethodsResponse_ );

  handler.listen( this.conn_ , bitex.api.BitEx.EventType.WITHDRAW_REFRESH, this.onBitexWithdrawIncrementalUpdate_);

  handler.listen( this.conn_ , bitex.api.BitEx.EventType.EXECUTION_REPORT, this.onBitexExecutionReport_);

  handler.listen( this.conn_, bitex.api.BitEx.EventType.RAW_MESSAGE, goog.bind(  this.onBitexRawMessageLogger_, this, 'rx: ' ) );
  handler.listen( this.conn_, bitex.api.BitEx.EventType.SENT_RAW_MESSAGE, goog.bind(  this.onBitexRawMessageLogger_, this, 'tx: ' )  );

  handler.listen( this.conn_, bitex.api.BitEx.EventType.VERIFY_CUSTOMER_UPDATE, this.onBitexVerifyCustomerUpdate_ );

  handler.listen( document.body, goog.events.EventType.CLICK , this.onBodyClick_);
  handler.listen( document.body, goog.events.EventType.CHANGE , this.onBodyChange_);


  // Listen to the views
  handler.listen(signUpView, bitex.view.SignupView.EventType.SIGNUP, this.onUserSignupButton_ );
  handler.listen(loginView, bitex.view.LoginView.EventType.LOGIN, this.onUserLoginButtonClick_) ;

  handler.listen(enableTwoFactorView, bitex.view.TwoFactorView.EventType.ENABLE, this.onUserEnableTwoFactor_);
  handler.listen(enableTwoFactorView, bitex.view.TwoFactorView.EventType.DISABLE, this.onUserDisableTwoFactor_);
  handler.listen(forgotPasswordView, bitex.view.ForgotPasswordView.EventType.RECOVER_PASSWORD, this.onUserForgotPassword_);
  handler.listen(setNewPasswordView, bitex.view.SetNewPasswordView.EventType.SET_NEW_PASSWORD, this.onUserSetNewPassword_);
  handler.listen(sideBarView, bitex.view.SideBarView.EventType.CHANGE_MARKET, this.onUserChangeMarket_ );


  handler.listen(this.views_, bitex.view.View.EventType.CHANGE_BROKER, this.onUserChangeBroker_ );

  handler.listen(this.views_, bitex.ui.OrderEntryX.EventType.SUBMIT, this.onUserOrderEntry_ );
  handler.listen(this.views_, bitex.view.View.EventType.CANCEL_ORDER, this.onUserCancelOrder_ );
  handler.listen(this.views_, bitex.view.View.EventType.MARKET_DATA_SUBSCRIBE, this.onUserMarketDataSubscribe_);
  handler.listen(this.views_, bitex.view.View.EventType.MARKET_DATA_UNSUBSCRIBE, this.onUserMarketDataUnsubscribe_);

  handler.listen(this.views_, bitex.view.View.EventType.SECURITY_STATUS_SUBSCRIBE, this.onUserSecurityStatusSubscribe_);
  handler.listen(this.views_, bitex.view.View.EventType.SECURITY_STATUS_UNSUBSCRIBE, this.onUserSecurityStatusUnsubscribe_);

  handler.listen(this.views_, bitex.view.View.EventType.REQUEST_WITHDRAW, this.onUserWithdrawRequest_ );
  handler.listen(this.views_, bitex.view.View.EventType.CONFIRM_WITHDRAW, this.onUserConfirmWithdraw_ );
  handler.listen(this.views_, bitex.view.View.EventType.PROCESS_WITHDRAW, this.onBrokerProcessWithdraw_ );

  handler.listen(this.views_, bitex.view.View.EventType.DEPOSIT_REQUEST, this.onUserDepositRequest_ );
  handler.listen(this.views_, bitex.view.View.EventType.PROCESS_DEPOSIT, this.onProcessDeposit_ );


  handler.listen(this.views_, bitex.view.View.EventType.CONNECT_BITEX, this.onUserConnectBitEx_);

  handler.listen(this.views_, bitex.view.View.EventType.SHOW_QR, this.onUserShowQr_);

  handler.listen(this.views_, bitex.view.View.EventType.SHOW_RECEIPT, this.onShowReceipt_);
  handler.listen(this.views_, bitex.view.View.EventType.UPLOAD_RECEIPT, this.onUserUploadReceipt_);

  handler.listen(this.views_, bitex.view.View.EventType.SET_VERIFIED, this.onBrokerSetUserAsVerified_ );



  this.connectBitEx();
};

/**
 * logger
 * @param {string} action
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexRawMessageLogger_ = function(action, e) {
  var raw_msg = e.data;
  try {
    console.log(action + ':' + raw_msg);
  } catch(e) {}
};

/**
 * Connect to the bitex Server
 */
bitex.app.BlinkTrade.prototype.connectBitEx = function(){
  try{
    this.conn_.open(this.url_);
  } catch( e ) {
    /**
     * @desc Connection error message when trying to open websockets connection for the first time
     */
    var MSG_CONNECTION_ERROR = goog.getMsg('Error connecting to the server. Your browser MUST SUPPORT WebSockets.');

    var error_dialog = bitex.templates.ErrorDialogContent({
                                                            error_message: MSG_CONNECTION_ERROR,
                                                            error_code: 'WebSocket: ' + e
                                                          });

    var dlg = this.showDialog(error_dialog, undefined, bootstrap.Dialog.ButtonSet.createYesNoCancel());
  }
};

bitex.app.BlinkTrade.prototype.getBitexConnection = function(){
  return this.conn_;
};

/**
 * @param {string} view_id
 */
bitex.app.BlinkTrade.prototype.setView = function(view_id){

  this.router_.setView(view_id);
};


bitex.app.BlinkTrade.prototype.onUserMarketDataSubscribe_ = function(e) {
  this.conn_.subscribeMarketData(e.target.getMDMarketDepth(),
                                 e.target.getMDInstruments(),
                                 e.target.getMDEntries(),
                                 e.target.getMDSubscriptionId());
};

bitex.app.BlinkTrade.prototype.onUserMarketDataUnsubscribe_ = function(e) {
  this.conn_.unSubscribeMarketData(e.target.getMDSubscriptionId());
};

bitex.app.BlinkTrade.prototype.onUserSecurityStatusSubscribe_ = function(e) {
  this.conn_.subscribeSecurityStatus(e.target.getSecurities(),
                                 e.target.getSecSubscriptionId());
};

bitex.app.BlinkTrade.prototype.onUserSecurityStatusUnsubscribe_ = function(e) {
  this.conn_.unSubscribeSecurityStatus(e.target.getSecSubscriptionId());
};

/**
 * @param {string} symbol
 * @return {string}
 */
bitex.app.BlinkTrade.prototype.getPriceCurrencyFromSymbol = function(symbol) {
  return symbol.substr(3);
};
/**
 * @param {string} symbol
 * @return {string}
 */
bitex.app.BlinkTrade.prototype.getQtyCurrencyFromSymbol = function(symbol) {
  return symbol.substr(0,3);
};

/**
 * @param {goog.events.Event} e
 */
bitex.app.BlinkTrade.prototype.onUserChangeBroker_ = function(e) {
  var brokerID = e.target.getBrokerID();
  this.getModel().set('SelectedBrokerID', brokerID);
};


/**
 * @param {goog.events.Event} e
 */
bitex.app.BlinkTrade.prototype.onUserChangeMarket_ = function(e) {

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



/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexDepositMethodsResponse_ = function(e) {
  var msg = e.data;

  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
  var deposit_methods = [];
  goog.array.forEach( msg['DepositMethodGrp'], function(deposit_method) {
    var deposit_method_id = deposit_method['DepositMethodID'];
    var description = deposit_method['Description'];
    var disclaimer = deposit_method['Disclaimer'];
    var type = deposit_method['Type'];
    var currency = deposit_method['Currency'];
    var percent_fee = fmt.format(deposit_method['PercentFee']/100.0);
    var fixed_fee = fmt.format(deposit_method['FixedFee']/1e8);

    deposit_methods.push( { id:deposit_method_id,
                           description:description,
                           disclaimer:disclaimer,
                           type: type,
                           currency:currency,
                           percent_fee: percent_fee,
                           fixed_fee: fixed_fee
                         } );
  });

  this.getModel().set('DepositMethods', deposit_methods);
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexPasswordChangedOk_ = function(e) {
  /**
   * @desc Password Chanced with success dialog title
   */
  var MSG_BITEX_PASSWORD_CHANGED_OK_TITLE = goog.getMsg('Success');


  /**
   * @desc Password Chanced with success dialog content
   */
  var MSG_BITEX_PASSWORD_CHANGED_OK_CONTENT = goog.getMsg('Password Changed');

  this.showDialog( MSG_BITEX_PASSWORD_CHANGED_OK_CONTENT, MSG_BITEX_PASSWORD_CHANGED_OK_TITLE );

  this.router_.setView('signin');
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexPasswordChangedError_ = function(e) {
  /**
   * @desc Password Chanced with success dialog title
   */
  var MSG_BITEX_PASSWORD_CHANGED_ERROR_TITLE = goog.getMsg('Error');


  /**
   * @desc Password Chanced with success dialog content
   */
  var MSG_BITEX_PASSWORD_CHANGED_ERROR_CONTENT = goog.getMsg('There was an error changing the password');

  this.showDialog( MSG_BITEX_PASSWORD_CHANGED_ERROR_CONTENT, MSG_BITEX_PASSWORD_CHANGED_ERROR_TITLE );

};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexWithdrawIncrementalUpdate_ = function(e) {
  var msg = e.data;

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_UNCONFIRMED_TITLE = goog.getMsg('Created withdraw [{$id}] ', {id: msg['WithdrawID']});

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE = goog.getMsg('Withdraw [{$id}] confirmed', {id: msg['WithdrawID']});

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE = goog.getMsg('Withdraw [{$id}] in progress', {id: msg['WithdrawID']});

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE = goog.getMsg('Withdraw [{$id}] completed', {id: msg['WithdrawID']});

  /**
   * @desc Withdraw user notification
   */
  var MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE = goog.getMsg('withdraw [{$id}] cancelled', {id: msg['WithdrawID']});


  var formatted_value = this.formatCurrency(msg['Amount']/1e8, msg['Currency'] );

  var notification_type_title;
  switch (msg['Status']) {
    case '0':
      notification_type_title = ['warning', MSG_WITHDRAW_NOTIFICATION_USER_UNCONFIRMED_TITLE];
      break;
    case '1': // CONFIRMED
      notification_type_title = ['info', MSG_WITHDRAW_NOTIFICATION_USER_CONFIRMED_TITLE];
      break;
    case '2': // IN PROGRESS
      notification_type_title = ['info', MSG_WITHDRAW_NOTIFICATION_USER_PROGRESS_TITLE];
      break;
    case '4': // COMPLETED
      notification_type_title = ['success', MSG_WITHDRAW_NOTIFICATION_USER_COMPLETE_TITLE];
      break;
    case '8': // CANCELLED
      notification_type_title = ['danger', MSG_WITHDRAW_NOTIFICATION_USER_CANCEL_TITLE];
      break;

  }
  if (goog.isDefAndNotNull(notification_type_title)) {
    this.showNotification(notification_type_title[0], notification_type_title[1], formatted_value);
  }
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexVerifyCustomerUpdate_ = function(e) {
  var msg = e.data;

  var profile = this.getModel().get('Profile');
  var old_verified = profile['Verified'];

  profile['Verified']         = msg['Verified'];
  profile['VerificationData'] = msg['VerificationData'];
  this.getModel().set('Profile', profile);

  this.getModel().set('IsVerified',       profile['Verified'] > 1);

  /** @desc verification notification title msg */
  var MSG_NOTIFICATION_VERIFY_TITLE = goog.getMsg('Verification:');

  /** @desc pending verification notification content msg */
  var MSG_PENDING_VERIFICATION_CONTENT = goog.getMsg('Sent to the broker.');

  /** @desc level 2 verification notification content msg */
  var MSG_ACCOUNT_VERIFIED_CONTENT = goog.getMsg('You account has been verified. level - {$level}', {level : profile['Verified'] });


  if (old_verified == 0 && profile['Verified'] == 1  ) {
    this.router_.setView('offerbook');
    this.showNotification('success', MSG_NOTIFICATION_VERIFY_TITLE, MSG_PENDING_VERIFICATION_CONTENT);
  } else if (profile['Verified'] >= 2  ) {
    this.showNotification('success', MSG_NOTIFICATION_VERIFY_TITLE, MSG_ACCOUNT_VERIFIED_CONTENT);
  }
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexExecutionReport_ = function(e) {
  var msg = e.data;

  /**
   * @desc - execution report title notification message
   */
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


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexTwoFactorSecretResponse_ = function(e){
  var msg = e.data;
  this.getModel().set('TwoFactorSecret', msg['TwoFactorSecret']);
  this.getModel().set('TwoFactorEnabled', msg['TwoFactorEnabled'] );
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBitexBalanceResponse_ = function(e) {
  var msg = e.data;
  delete msg['MsgType'];
  delete msg['BalanceReqID'];

  var clientID = msg['ClientID'];

  goog.object.forEach(msg, function( balances, broker ) {
    goog.object.forEach(balances, function( balance, currency ) {
      balance = balance / 1e8;

      // formatted_balance_9000001:2_USD
      var balance_key = 'balance_' + broker + ':' + clientID + '_'  + currency;
      this.getModel().set( balance_key , balance );
      this.getModel().set('formatted_' + balance_key, this.formatCurrency(balance, currency, true));
    }, this);
  },this);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserWithdrawRequest_ = function(e){
  var currency = e.target.getCurrency();

  var withdraw_methods = this.getModel().get('Broker')['WithdrawStructure'][currency];

  var method_element_id = goog.string.getRandomString();
  var withdraw_amount_element_id = goog.string.getRandomString();
  var fixed_fee_element_id = goog.string.getRandomString();
  var percent_fee_element_id = goog.string.getRandomString();
  var total_fees_element_id = goog.string.getRandomString();
  var net_value_element_id = goog.string.getRandomString();
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

  var dialogContent = bitex.templates.DepositWithdrawDialogContent( {
    fmt:fmt,
    side: 'client',
    currency: currency,
    currencySign: this.getCurrencySign(currency),
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
      goog.getMsg('{$currency} withdrawal', {currency :  this.getCurrencyDescription(currency) });

  var dlg =  this.showDialog(dialogContent,
                             MSG_CURRENCY_WITHDRAW_DIALOG_TITLE,
                             bootstrap.Dialog.ButtonSet.createOkCancel());

  this.doCalculateFees_(
      withdraw_amount_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
      currency,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
      true);

  var handler = this.getHandler();
  handler.listen(goog.dom.getElement(method_element_id), goog.events.EventType.CHANGE, function(e){
    this.doCalculateFees_(
        withdraw_amount_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
        currency,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
        true);
  }, this);

  handler.listen( new goog.events.InputHandler(goog.dom.getElement(withdraw_amount_element_id) ),goog.events.InputHandler.EventType.INPUT,function(e) {
    this.doCalculateFees_(
        withdraw_amount_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
        currency,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
        true);
  }, this);

  handler.listenOnce(dlg, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      var withdraw_data = bitex.util.getFormAsJSON(goog.dom.getFirstElementChild(dlg.getContentElement()));

      var amount = goog.string.toNumber(withdraw_data['Amount']); delete withdraw_data['Amount'];
      var method = withdraw_data['Method']; delete withdraw_data['Method'];
      var currency = withdraw_data['Currency']; delete withdraw_data['Currency'];

      this.conn_.requestWithdraw( e.target.getRequestId(),
                                  amount,
                                  method,
                                  currency,
                                  withdraw_data );
    }
  }, this);

  /*

  this.conn_.requestWithdraw( e.target.getRequestId(),
                              e.target.getAmount(),
                              e.target.getMethod(),
                              e.target.getCurrency(),
                              e.target.getWithdrawData() );

  */
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserConfirmWithdraw_ = function(e){
  this.conn_.confirmWithdraw(e.target.getConfirmationToken());
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBrokerSetUserAsVerified_ = function(e){
  var request_id = e.target.getRequestId();
  var client_id = e.target.getClientID();
  var verification_data = e.target.getVerificationData();

  this.conn_.verifyCustomer(request_id, client_id, 2, verification_data );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBrokerProcessWithdraw_ = function(e){
  var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  var withdraw_data = e.target.getWithdrawData();
  var request_id = e.target.getRequestId();
  var action = e.target.getWithdrawAction();
  var handler = this.getHandler();
  var model = this.getModel();

  var method_element_id = goog.string.getRandomString();
  var withdraw_amount_element_id = goog.string.getRandomString();
  var fixed_fee_element_id = goog.string.getRandomString();
  var percent_fee_element_id = goog.string.getRandomString();
  var total_fees_element_id = goog.string.getRandomString();
  var net_value_element_id = goog.string.getRandomString();

  console.log( 'onBrokerProcessWithdraw_:' + action);

  if (action === 'CANCEL') {

    /**
     * @desc Cancel Withdraw dialog title
     */
    var MSG_WITHDRAW_CANCEL_DIALOG_TITLE = goog.getMsg('Cancel withdraw');

    var cancel_reason_dialog_content = bitex.templates.CancelWithdrawDialogContent( {
                                                                                      reason_id:'id_select_reason',
                                                                                      custom_reason_id:'id_custom_reason_text'
                                                                                    });
    var cancelWithdrawDlg =  this.showDialog( cancel_reason_dialog_content,
                                               MSG_WITHDRAW_CANCEL_DIALOG_TITLE,
                                               bootstrap.Dialog.ButtonSet.createOkCancel() );


    var select_reason_el = goog.dom.getElement('id_select_reason');
    var reason_el = goog.dom.getElement('id_custom_reason_text');
    handler.listen(select_reason_el, goog.events.EventType.CHANGE, function(e){
      var reason_id = goog.string.toNumber(goog.dom.forms.getValue( select_reason_el ));
      goog.style.showElement ( reason_el, (reason_id === 0 )) ;
    });

    handler.listen(cancelWithdrawDlg, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var reason_id = goog.string.toNumber(goog.dom.forms.getValue( select_reason_el ));
        var reason;

        if (reason_id === 0 ) {
          reason = goog.string.trim(goog.dom.forms.getValue(reason_el));

          if (goog.string.isEmpty(reason)) {
            e.stopPropagation();
            e.preventDefault();
            goog.dom.getElement('id_custom_reason_text').focus();
            return;
          }
        }

        this.getBitexConnection().processWithdraw(request_id,
                                                  action,
                                                  withdraw_data['WithdrawID'],
                                                  reason_id,
                                                  reason);
      }
    }, this);
  } else if (action === 'PROGRESS') {
    var formatted_amount = this.formatCurrency(withdraw_data['Amount']/1e8, withdraw_data['Currency'] );

    var feeDialogContent = bitex.templates.FeesForm({
       amount: withdraw_data['Amount'],
       formattedAmount: formatted_amount,
       currency: withdraw_data['Currency'],
       currencySign: this.getCurrencySign(withdraw_data['Currency']),
       amountID: withdraw_amount_element_id,
       fixedFeeID: fixed_fee_element_id,
       percentFeeID: percent_fee_element_id,
       totalFeesID: total_fees_element_id,
       netValueID: net_value_element_id,
       fixedFee: valueFormatter.format(withdraw_data['FixedFee']/1e8),
       percentFee: valueFormatter.format(withdraw_data['PercentFee']/100.0)
    });

    /**
     * @desc Crypto Currency Withdraw accordion title
     */
    var MSG_WITHDRAW_IN_PROGRESS_DIALOG_TITLE =
        goog.getMsg('Set {$currency} withdrawal in progress',
                    {currency :  this.getCurrencyDescription(withdraw_data['Currency']) });


    var feeDlg =  this.showDialog(feeDialogContent,
                                  MSG_WITHDRAW_IN_PROGRESS_DIALOG_TITLE,
                               bootstrap.Dialog.ButtonSet.createOkCancel());

    this.doCalculateFees_ (withdraw_amount_element_id,
                           fixed_fee_element_id,
                           percent_fee_element_id,
                           withdraw_data['Currency'],
                           total_fees_element_id,
                           net_value_element_id,
                           true );

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(withdraw_amount_element_id) ),
                    goog.events.InputHandler.EventType.INPUT,
                    goog.bind(this.doCalculateFees_, this,
                              withdraw_amount_element_id,
                              fixed_fee_element_id,
                              percent_fee_element_id,
                              withdraw_data['Currency'],
                              total_fees_element_id,
                              net_value_element_id,
                              true));

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(percent_fee_element_id)),
                    goog.events.InputHandler.EventType.INPUT,
                    goog.bind(this.doCalculateFees_, this,
                              withdraw_amount_element_id,
                              fixed_fee_element_id,
                              percent_fee_element_id,
                              withdraw_data['Currency'],
                              total_fees_element_id,
                              net_value_element_id,
                              true));

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(fixed_fee_element_id)),
                    goog.events.InputHandler.EventType.INPUT,
                    goog.bind(this.doCalculateFees_, this,
                              withdraw_amount_element_id,
                              fixed_fee_element_id,
                              percent_fee_element_id,
                              withdraw_data['Currency'],
                              total_fees_element_id,
                              net_value_element_id,
                              true));


    handler.listen(feeDlg, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var form_data = bitex.util.getFormAsJSON(goog.dom.getFirstElementChild(feeDlg.getContentElement()));


        var percent_fee = form_data['PercentFee'];
        pos = [0];
        var percent_fee_value = valueFormatter.parse(percent_fee, pos);
        if (isNaN(percent_fee_value)) {
          percent_fee_value = 0;
        }
        if (pos[0] != percent_fee.length || isNaN(percent_fee_value) || percent_fee_value < 0 ) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        percent_fee_value = percent_fee_value * 100;


        var fixed_fee = form_data['FixedFee'];
        pos = [0];
        var fixed_fee_value = valueFormatter.parse(fixed_fee, pos);
        if (isNaN(fixed_fee_value)) {
          fixed_fee_value = 0;
        }

        if (pos[0] != fixed_fee.length || isNaN(fixed_fee_value) || fixed_fee_value < 0 ) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        fixed_fee_value = fixed_fee_value * 1e8;

        this.getBitexConnection().processWithdraw(request_id,
                                                  action,
                                                  withdraw_data['WithdrawID'],
                                                  undefined,  // opt_reason_id
                                                  undefined,  // opt_reason
                                                  form_data,  // opt_data
                                                  percent_fee_value, // opt_percent_fee
                                                  fixed_fee_value); // opt_fixed_fee

      }
    });

  } else if (action === 'COMPLETE') {
    var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

    var dialogContent = bitex.templates.DepositWithdrawDialogContent({
      fmt: fmt,
      side: 'broker',
      currency: withdraw_data['Currency'],
      currencySign: this.getCurrencySign(withdraw_data['Currency']),
      force_method: withdraw_data['Method'],
      amount: withdraw_data['Amount'],
      methods: model.get('Profile')['WithdrawStructure'][withdraw_data['Currency'] ],
      methodID: method_element_id,
      showFeeDataEntry:false,
      amountID: withdraw_amount_element_id,
      fixedFeeID: fixed_fee_element_id,
      percentFeeID: percent_fee_element_id,
      totalFeesID: total_fees_element_id,
      netValueID: net_value_element_id,
      hideNetAmount:false
    });

    /**
     * @desc Crypto Currency Withdraw accordion title
     */
    var MSG_CURRENCY_BROKER_WITHDRAW_DIALOG_TITLE =
        goog.getMsg('Confirm {$currency} withdrawal', {currency :  this.getCurrencyDescription(withdraw_data['Currency']) });


    var dlg =  this.showDialog(dialogContent,
                               MSG_CURRENCY_BROKER_WITHDRAW_DIALOG_TITLE,
                               bootstrap.Dialog.ButtonSet.createOkCancel());


    handler.listen(dlg, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var broker_withdraw_data = bitex.util.getFormAsJSON(goog.dom.getFirstElementChild(dlg.getContentElement()));

        this.getBitexConnection().processWithdraw(request_id,
                                                  action,
                                                  withdraw_data['WithdrawID'],
                                                  undefined,
                                                  undefined,
                                                  broker_withdraw_data);
      }
    }, this);
  }
};




/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserOrderEntry_ = function(e){
  /**
   * @desc notification for send order request
   */
  var MSG_SEND_ORDER_NOTIFICATION_TITLE = goog.getMsg('Sending order...');

  /**
   * @desc notification for send order request
   */
  var MSG_SEND_ORDER_NOTIFICATION_SIDE_BUY = goog.getMsg('BUY');


  /**
   * @desc notification for send order request
   */
  var MSG_SEND_ORDER_NOTIFICATION_SIDE_SELL = goog.getMsg('SELL');

  var side_msg =  MSG_SEND_ORDER_NOTIFICATION_SIDE_BUY;

  if (e.target.getSide() == '2') {
    side_msg = MSG_SEND_ORDER_NOTIFICATION_SIDE_SELL;
  }

  /**
   * @desc notification for send order request
   */
  var MSG_SEND_ORDER_NOTIFICATION_CONTENT = goog.getMsg('{$side} {$amount} {$symbol}  @ {$price}', {
    side: side_msg,
    amount: e.target.getAmount(),
    symbol: e.target.getSymbol(),
    price: e.target.getPrice()
  });

  this.showNotification( 'info', MSG_SEND_ORDER_NOTIFICATION_TITLE,MSG_SEND_ORDER_NOTIFICATION_CONTENT );

  this.conn_.sendLimitedOrder(e.target.getSymbol(),
                              e.target.getAmount(),
                              e.target.getPrice(),
                              e.target.getSide(),
                              e.target.getBrokerID(),
                              e.target.getClientID());
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserCancelOrder_ = function(e){
  /**
   * @desc notification for order cancel request
   */
  var MSG_CANCEL_ORDER_NOTIFICATION_TITLE = goog.getMsg('Cancelling order...');

  if (goog.isDefAndNotNull(e.target.getClientOrderId())) {
    this.showNotification('info', MSG_CANCEL_ORDER_NOTIFICATION_TITLE, ':' + e.target.getClientOrderId() );
  } else {
    this.showNotification('info', MSG_CANCEL_ORDER_NOTIFICATION_TITLE, ':' + e.target.getOrderId() );
  }
  this.conn_.cancelOrder(e.target.getClientOrderId(), e.target.getOrderId());
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onShowReceipt_ = function(e){
  var receiptData = e.target.getReceiptData();

  /**
   * @desc Crypto Currency Withdraw deposit title
   */
  var MSG_SHOW_DEPOSIT_RECEIPT_DIALOG_TITLE =
      goog.getMsg('Submission {$submissionID}', {submissionID : receiptData['SubmissionID'] });


  var dlg =  this.showDialog(bitex.templates.DepositReceiptDialogContent({depositReceiptList:receiptData['DepositReceipt']}),
                             MSG_SHOW_DEPOSIT_RECEIPT_DIALOG_TITLE,
                             bootstrap.Dialog.ButtonSet.createOk());
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserShowQr_ = function(e){
  var qrData = e.target.getQrData();

  /**
   * @desc Crypto Currency Withdraw deposit title
   */
  var MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE =
      goog.getMsg('{$currency} deposit', {currency :  this.getCurrencyDescription(qrData['Currency']) });

  /**
   * @desc Crypto Currency Withdraw withdraw title
   */
  var MSG_SHOW_QR_CURRENCY_WITHDRAW_DIALOG_TITLE =
      goog.getMsg('{$currency} withdraw', {currency :  this.getCurrencyDescription(qrData['Currency']) });

  var dialog_title = MSG_SHOW_QR_CURRENCY_WITHDRAW_DIALOG_TITLE;
  if (e.target.getQrDataVerb() === 'DEPOSIT') {
    dialog_title = MSG_SHOW_QR_CURRENCY_DEPOSIT_DIALOG_TITLE;
  }

  var dlg =  this.showDialog(bitex.templates.CryptoCurrencyQRContentDialog({data:qrData}),
                             dialog_title,
                             bootstrap.Dialog.ButtonSet.createCancel());
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserUploadReceipt_ = function(e){
  var model = this.getModel();
  var deposit_data = e.target.getDepositData();

  var broker = model.get('Broker');
  if (!goog.isDefAndNotNull(broker)){
    return;
  }

  var upload_form_url =  broker['UploadForm'];
  upload_form_url = upload_form_url.replace('{{UserID}}', model.get('UserID'));
  upload_form_url = upload_form_url.replace('{{Username}}', model.get('Username'));
  upload_form_url = upload_form_url.replace('{{BrokerID}}', model.get('Broker')['BrokerID']);
  upload_form_url = upload_form_url.replace('{{BrokerUsername}}', model.get('Broker')['ShortName']);
  upload_form_url = upload_form_url.replace('{{Email}}', model.get('Email'));
  upload_form_url = upload_form_url.replace('{{DepositMethod}}', deposit_data['DepositMethodName']);
  upload_form_url = upload_form_url.replace('{{ControlNumber}}', deposit_data['ControlNumber']);
  upload_form_url = upload_form_url.replace('{{DepositID}}', deposit_data['DepositID']);


  var form_src = upload_form_url;
  window.open(form_src,
              'blank',
              'scrollbars=yes,toolbar=no,width=700,height=500');
};

/**
 * @param {string} amount_element_id
 * @param {string} fixed_fee_element_id
 * @param {string} percent_fee_element_id
 * @param {string} currency
 * @param {string} opt_fee_value_element_id
 * @param {string} opt_net_amount_element_id
 * @param {boolean} opt_add_fees.  Default for true
 * @private
 */
bitex.app.BlinkTrade.prototype.doCalculateFees_ = function(amount_element_id,
                                                              fixed_fee_element_id,
                                                              percent_fee_element_id,
                                                              currency,
                                                              opt_fee_value_element_id,
                                                              opt_net_amount_element_id,
                                                              opt_add_fees){
  var add_fees = true;
  if (opt_add_fees === false) {
    add_fees = opt_add_fees;
  }

  var valueFormatter = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

  var pos = [0];
  var raw_amount = goog.dom.forms.getValue( goog.dom.getElement(amount_element_id) );
  var amount = valueFormatter.parse(raw_amount , pos );
  if (pos[0] != raw_amount.length || isNaN(amount) || amount <= 0 ) {
    return;
  }
  amount = amount * 1e8;


  var percent_fee = goog.dom.forms.getValue( goog.dom.getElement(percent_fee_element_id) );
  pos = [0];
  var percent_fee_value = valueFormatter.parse(percent_fee, pos);
  if (isNaN(percent_fee_value)) {
    percent_fee_value = 0;
  }


  var fixed_fee = goog.dom.forms.getValue( goog.dom.getElement(fixed_fee_element_id) );
  pos = [0];
  var fixed_fee_value = valueFormatter.parse(fixed_fee, pos);
  if (isNaN(fixed_fee_value)) {
    fixed_fee_value = 0;
  }
  fixed_fee_value = fixed_fee_value * 1e8;

  var total_percent_fee_value = ((amount - fixed_fee_value) * (percent_fee_value/100.0));
  var total_fixed_fee_value = fixed_fee_value;
  var total_fees = total_percent_fee_value + total_fixed_fee_value;

  var net_amount = amount - total_fees;
  if (add_fees) {
    net_amount = amount + total_fees;
  }

  if (goog.isDefAndNotNull(opt_fee_value_element_id)) {
    var formatted_total_fee = this.formatCurrency(total_fees/1e8, currency, true);
    goog.dom.setTextContent( goog.dom.getElement(opt_fee_value_element_id) , formatted_total_fee);
  }
  if (goog.isDefAndNotNull(opt_net_amount_element_id)) {
    var formatted_net_amount = this.formatCurrency(net_amount/1e8, currency, true);
    goog.dom.setTextContent(goog.dom.getElement(opt_net_amount_element_id), formatted_net_amount);
  }

  return [ amount, percent_fee_value, fixed_fee_value, net_amount ];
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onProcessDeposit_ = function(e){
  var model = this.getModel();
  var deposit_data = e.target.getDepositData();
  var request_id = e.target.getRequestId();
  var action = e.target.getDepositAction();
  var handler = this.getHandler();

  if (action === 'CANCEL') {

    /**
     * @desc Cancel Deposit dialog title
     */
    var MSG_DEPOSIT_CANCEL_DIALOG_TITLE = goog.getMsg('Cancel deposit');

    var cancel_reason_dialog_content = bitex.templates.CancelDepositDialogContent({
      reason_id:'id_select_reason',
      custom_reason_id:'id_custom_reason_text'
    });

    var cancelWithdrawDlg =  this.showDialog( cancel_reason_dialog_content,
                                              MSG_DEPOSIT_CANCEL_DIALOG_TITLE,
                                              bootstrap.Dialog.ButtonSet.createOkCancel() );


    var select_reason_el = goog.dom.getElement('id_select_reason');
    var reason_el = goog.dom.getElement('id_custom_reason_text');
    handler.listen(select_reason_el, goog.events.EventType.CHANGE, function(e){
      var reason_id = goog.string.toNumber(goog.dom.forms.getValue( select_reason_el ));
      goog.style.showElement ( reason_el, (reason_id === 0 )) ;
    });

    handler.listen(cancelWithdrawDlg, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var reason_id = goog.string.toNumber(goog.dom.forms.getValue( select_reason_el ));
        var reason;

        if (reason_id === 0 ) {
          reason = goog.string.trim(goog.dom.forms.getValue(reason_el));

          if (goog.string.isEmpty(reason)) {
            e.stopPropagation();
            e.preventDefault();
            goog.dom.getElement('id_custom_reason_text').focus();
            return;
          }
        }

        this.getBitexConnection().processDeposit (request_id,
                                                  action,
                                                  undefined,
                                                  deposit_data['DepositID'],
                                                  reason_id,
                                                  reason);
      }
    }, this);
  } else if (action === 'PROGRESS') {
    this.getBitexConnection().processDeposit (request_id,
                                              action,
                                              undefined,
                                              deposit_data['DepositID']);

  } else if (action === 'COMPLETE') {
    var valueFormatter = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
    var paid_value_element_id = goog.string.getRandomString();
    var fixed_fee_element_id = goog.string.getRandomString();
    var percent_fee_element_id = goog.string.getRandomString();
    var total_fees_element_id = goog.string.getRandomString();
    var net_value_element_id = goog.string.getRandomString();

    var control_number  = deposit_data['ControlNumber'];
    if (deposit_data['Type'] == 'CRY') {
      control_number  = deposit_data['Data']['InputAddress'];
    }

    var confirm_deposit_dialog_content = bitex.templates.BrokerConfirmDepositContent({
      id_value:paid_value_element_id,
      fixedFeeID: fixed_fee_element_id,
      percentFeeID: percent_fee_element_id,
      totalFeesID: total_fees_element_id,
      netValueID: net_value_element_id,
      controlNumber:control_number ,
      currencySign:this.getCurrencySign(deposit_data['Currency']),
      value: valueFormatter.format(deposit_data['Value']/1e8),
      percentFee: valueFormatter.format(deposit_data['PercentFee']/100.0),
      fixedFee: valueFormatter.format(deposit_data['FixedFee']/1e8)
    });

    /**
     * @desc Dialog title to get deposit paid value
     */
    var MSG_DLG_TITLE_GET_DEPOSIT_PAID_VALUE = goog.getMsg('Confirm deposit');

    var confirmDepositDlg = this.showDialog(confirm_deposit_dialog_content,
                                            MSG_DLG_TITLE_GET_DEPOSIT_PAID_VALUE,
                                            bootstrap.Dialog.ButtonSet.createOkCancel());


    this.doCalculateFees_ (paid_value_element_id,
                           fixed_fee_element_id,
                           percent_fee_element_id,
                           deposit_data['Currency'],
                           total_fees_element_id,
                           net_value_element_id,
                           false);

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(paid_value_element_id) ),
        goog.events.InputHandler.EventType.INPUT,
        goog.bind(this.doCalculateFees_, this,
                  paid_value_element_id,
                  fixed_fee_element_id,
                  percent_fee_element_id,
                  deposit_data['Currency'],
                  total_fees_element_id,
                  net_value_element_id,
                  false));

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(percent_fee_element_id) ),
        goog.events.InputHandler.EventType.INPUT,
        goog.bind(this.doCalculateFees_, this,
                  paid_value_element_id,
                  fixed_fee_element_id,
                  percent_fee_element_id,
                  deposit_data['Currency'],
                  total_fees_element_id,
                  net_value_element_id,
                  false));

    handler.listen( new goog.events.InputHandler(goog.dom.getElement(fixed_fee_element_id) ),
        goog.events.InputHandler.EventType.INPUT,
        goog.bind(this.doCalculateFees_, this,
                  paid_value_element_id,
                  fixed_fee_element_id,
                  percent_fee_element_id,
                  deposit_data['Currency'],
                  total_fees_element_id,
                  net_value_element_id,
                  false));

    handler.listen(confirmDepositDlg, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var pos = [0];
        var raw_paid_value = goog.dom.forms.getValue( goog.dom.getElement(paid_value_element_id) );

        var paid_value = valueFormatter.parse(raw_paid_value , pos );
        if (pos[0] != raw_paid_value.length || isNaN(paid_value) || paid_value <= 0 ) {
          e.stopPropagation();
          e.preventDefault();
          goog.dom.getElement(paid_value_element_id).focus();
          return;
        }
        paid_value = paid_value * 1e8;


        var percent_fee = goog.dom.forms.getValue( goog.dom.getElement(percent_fee_element_id) );
        pos = [0];
        var percent_fee_value = valueFormatter.parse(percent_fee, pos);
        if (isNaN(percent_fee_value)) {
          percent_fee_value = 0;
        }
        if (pos[0] != percent_fee.length || isNaN(percent_fee_value) || percent_fee_value < 0 ) {
          e.stopPropagation();
          e.preventDefault();
          goog.dom.getElement(percent_fee_element_id).focus();
          return;
        }
        percent_fee_value = percent_fee_value * 100;


        var fixed_fee = goog.dom.forms.getValue( goog.dom.getElement(fixed_fee_element_id) );
        pos = [0];
        var fixed_fee_value = valueFormatter.parse(fixed_fee, pos);
        if (isNaN(fixed_fee_value)) {
          fixed_fee_value = 0;
        }

        if (pos[0] != fixed_fee.length || isNaN(fixed_fee_value) || fixed_fee_value < 0 ) {
          e.stopPropagation();
          e.preventDefault();
          goog.dom.getElement(fixed_fee_element_id).focus();
          return;
        }
        fixed_fee_value = fixed_fee_value * 1e8;

        this.getBitexConnection().processDeposit (request_id,
                                                  action,
                                                  undefined, // opt_secret
                                                  deposit_data['DepositID'],
                                                  undefined, // opt_reasonId
                                                  undefined, // opt_reason
                                                  paid_value, // opt_amount
                                                  percent_fee_value,
                                                  fixed_fee_value);

      }
    }, this);
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserDepositRequest_ = function(e){
  var currency = e.target.getCurrency();
  var handler = this.getHandler();


  /**
   * @desc Crypto Currency Withdraw accordion title
   */
  var MSG_CURRENCY_DEPOSIT_DIALOG_TITLE =
      goog.getMsg('{$currency} deposit', {currency :  this.getCurrencyDescription(currency) });


  if (this.isCryptoCurrency(currency)) {

    var confirmDialogContent = bitex.templates.ConfirmDepositCryptoCurrencyContentDialog({
      currencydescription: this.getCurrencyDescription(currency)
    });

    var dlgConfirm =  this.showDialog(confirmDialogContent,
                                      MSG_CURRENCY_DEPOSIT_DIALOG_TITLE,
                                      bootstrap.Dialog.ButtonSet.createYesNoCancel());

    handler.listen(dlgConfirm, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'yes') {
        e.preventDefault();
        e.stopPropagation();

        var request_id = parseInt( 1e7 * Math.random() , 10 );
        this.conn_.requestDeposit( request_id, undefined , undefined, undefined, currency);

        goog.soy.renderElement(goog.dom.getFirstElementChild(dlgConfirm.getContentElement()),
                               bitex.templates.WaitingForDepositResponseDialogContent);

        dlgConfirm.setButtonSet( bootstrap.Dialog.ButtonSet.createCancel() );


        handler.listenOnce( this.conn_ , bitex.api.BitEx.EventType.ERROR_MESSAGE + '.' + request_id, function(e){
          dlgConfirm.dispose();
        });

        handler.listenOnce( this.conn_ , bitex.api.BitEx.EventType.DEPOSIT_RESPONSE + '.' + request_id, function(e){
          var msg = e.data;
          goog.soy.renderElement(goog.dom.getFirstElementChild(dlgConfirm.getContentElement()),
                                 bitex.templates.DepositCryptoCurrencyContentDialog,
                                 {deposit_message:msg} );
        });

      }
    });
    return;
  }


  var deposit_methods = [];
  goog.array.forEach(this.getModel().get('DepositMethods'), function(deposit_method){
    if (deposit_method.currency == currency) {
      deposit_methods.push({
                              'method': deposit_method.id,
                              'description': deposit_method.description,
                              'disclaimer': deposit_method.disclaimer,
                              'percent_fee': deposit_method.percent_fee,
                              'fixed_fee': deposit_method.fixed_fee,
                              'fields': []
                            });
    }
  }, this);

  var method_element_id = goog.string.getRandomString();
  var withdraw_amount_element_id = goog.string.getRandomString();
  var fixed_fee_element_id = goog.string.getRandomString();
  var percent_fee_element_id = goog.string.getRandomString();
  var total_fees_element_id = goog.string.getRandomString();
  var net_value_element_id = goog.string.getRandomString();


  var dialogContent = bitex.templates.DepositWithdrawDialogContent( {
    side: 'client',
    currency: currency,
    currencySign: this.getCurrencySign(currency),
    methods: deposit_methods,
    methodID: method_element_id,
    amountID: withdraw_amount_element_id,
    showFeeDataEntry:false,
    fixedFeeID: fixed_fee_element_id,
    percentFeeID: percent_fee_element_id,
    totalFeesID: total_fees_element_id,
    netValueID: net_value_element_id,
    hideNetAmount:false
  });


  var dlg =  this.showDialog(dialogContent,
                              MSG_CURRENCY_DEPOSIT_DIALOG_TITLE,
                              bootstrap.Dialog.ButtonSet.createOkCancel());

  this.doCalculateFees_(
      withdraw_amount_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
      currency,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
      goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
      false);


  handler.listen(goog.dom.getElement(method_element_id), goog.events.EventType.CHANGE, function(e){
    this.doCalculateFees_(
        withdraw_amount_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
        currency,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
        goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
        false);
  });

  handler.listen( new goog.events.InputHandler(goog.dom.getElement(withdraw_amount_element_id) ),goog.events.InputHandler.EventType.INPUT,
    function(e) {
      this.doCalculateFees_(
          withdraw_amount_element_id,
          goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + fixed_fee_element_id,
          goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + percent_fee_element_id,
          currency,
          goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + total_fees_element_id,
          goog.dom.forms.getValue(goog.dom.getElement(method_element_id)) + '_' + net_value_element_id,
          false);
    });





  handler.listenOnce(dlg, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      e.preventDefault();
      e.stopPropagation();

      var deposit_form_el = goog.dom.getFirstElementChild(dlg.getContentElement());

      var deposit_data = bitex.util.getFormAsJSON(deposit_form_el);

      var amount = goog.string.toNumber(deposit_data['Amount']);
      var deposit_method_id = goog.string.toNumber(deposit_data['Method']);

      if (!goog.isNumber(amount) ||  isNaN(amount)) {
        return;
      }

      if (deposit_form_el.getAttribute('data-deposit-status') != 'prepare')  {
        dlg.dispose();
      } else {
        var request_id = parseInt( 1e7 * Math.random() , 10 );
        this.conn_.requestDeposit( request_id, deposit_method_id , amount);

        goog.soy.renderElement(deposit_form_el,
                               bitex.templates.WaitingForDepositResponseDialogContent);


        handler.listenOnce( this.conn_ , bitex.api.BitEx.EventType.DEPOSIT_RESPONSE + '.' + request_id, function(e){
          var msg = e.data;
          goog.soy.renderElement(deposit_form_el,
                                 bitex.templates.DepositSlipContentDialog,
                                 {deposit_id:msg['DepositID'] } );

          dlg.setButtonSet(bootstrap.Dialog.ButtonSet.createOk());
        });
      }
    }
  });
};




/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserForgotPassword_ = function(e){
  this.conn_.forgotPassword(e.target.getEmail());
  this.router_.setView('set_new_password');
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserSetNewPassword_ = function(e){
  this.conn_.resetPassword(e.target.getToken() ,  e.target.getPassword() );
};



/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserEnableTwoFactor_ = function(e){
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
bitex.app.BlinkTrade.prototype.onUserDisableTwoFactor_ = function(e){
  this.conn_.enableTwoFactor( false );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBodyClick_ =function(e){
  var element = e.target;

  var view_name = element.getAttribute('data-switch-view');
  if (goog.isDefAndNotNull(view_name)) {
    e.preventDefault();
    e.stopPropagation();

    this.router_.setView(view_name );
  }

  var model = this.getModel();
  var model_set_element;
  if (goog.dom.classes.has(e.target, 'model-action-set')){
    model_set_element = e.target;
  } else {
    model_set_element = goog.dom.getAncestorByClass(e.target, 'model-action-set');
  }
  if (goog.isDefAndNotNull(model_set_element)) {
    if ( goog.isDefAndNotNull(model_set_element.getAttribute('data-key'))) {
      model.set(model_set_element.getAttribute('data-key'),model_set_element.getAttribute('data-value'));
    }
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBodyChange_ =function(e){
  if (goog.dom.classes.has( e.target, 'withdraw-method-selector' )) {
    var selected_method = goog.dom.forms.getValue( e.target );

    var elements = goog.dom.getElementsByClass( 'withdraw-method');

    goog.array.forEach(elements, function(element) {
      var method = element.getAttribute('data-withdraw-method');
      goog.style.showElement(element, method == selected_method );

      var field_elements = goog.dom.getElementsByClass('withdraw-field', element);
      goog.array.forEach(field_elements, function(element){
        element.disabled = (method != selected_method);
      });
    }, this);
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onUserLoginButtonClick_ = function(e){
  var username = e.target.getUsername();
  var password = e.target.getPassword();
  this.model_.set('Password',         e.target.getPassword() );

  this.conn_.login(username, password);
};


/**
 * @param {bitex.api.BitExEvent} e
 */
bitex.app.BlinkTrade.prototype.onUserLoginOk_ = function(e) {
  var msg = e.data;

  goog.dom.classes.add( document.body, 'bitex-logged'  );
  goog.dom.classes.remove( document.body, 'bitex-not-logged' );

  this.getModel().set('UserID',           msg['UserID'] );
  this.getModel().set('Username',         msg['Username']);
  this.getModel().set('TwoFactorEnabled', msg['TwoFactorEnabled']);
  this.getModel().set('IsBroker',         msg['IsBroker'] );
  this.getModel().set('IsVerified',       msg['Profile']['Verified'] > 1);

  var broker_currencies = new goog.structs.Set();
  var allowed_markets = {};
  var user_brokers = {};
  var broker_info;
  if (goog.isDefAndNotNull(msg['Broker'])) {
    broker_info = this.adjustBrokerData_(msg['Broker']);
    goog.object.extend(allowed_markets,  broker_info['AllowedMarkets']);
    broker_currencies.addAll(broker_info['BrokerCurrencies']);

    this.getModel().set('Broker', broker_info);


    user_brokers[ broker_info['BrokerID'] ] = broker_info;
    if (!msg['IsBroker'] ) {
      this.getModel().set('UserBrokers', user_brokers);
    }
  }

  var profile = msg['Profile'];
  if (msg['IsBroker'] ) {
    goog.dom.classes.add( document.body, 'bitex-broker');
    profile = this.adjustBrokerData_(profile);

    user_brokers[ profile['BrokerID'] ] = profile;
    this.getModel().set('UserBrokers', user_brokers);

    goog.object.extend(allowed_markets,  profile['AllowedMarkets']);
    broker_currencies.addAll(profile['BrokerCurrencies']);
  } else {
    goog.dom.classes.add( document.body, 'bitex-non-broker');
  }
  this.getModel().set('Profile',  profile);
  if (msg['IsBroker'] ) {
    this.getModel().set('SelectedBrokerID', this.getModel().get('Profile')['BrokerID']);
  } else if (goog.isDefAndNotNull(msg['Broker'])) {
    this.getModel().set('SelectedBrokerID', this.getModel().get('Broker')['BrokerID']);
  }


  this.getModel().set('AllowedMarkets', allowed_markets);
  this.getModel().set('BrokerCurrencies', broker_currencies.getValues() );


  this.conn_.requestBalances();

  // Request Deposit Options
  this.conn_.requestDepositMethods();

  if (this.getModel().get('IsVerified')) {
    this.router_.setView('offerbook');
  } else {
    if (this.getModel().get('Profile')['Verified']==0) {
      this.router_.setView('verification');
    } else {
      this.router_.setView('offerbook');
    }
  }
};

/**
 * @param {bitex.api.BitExEvent} e
 */
bitex.app.BlinkTrade.prototype.onUserLoginError_ = function(e) {
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
                               bootstrap.Dialog.ButtonSet.createOkCancel() );

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
bitex.app.BlinkTrade.prototype.onUserSignupButton_ = function(e) {

  this.model_.set('Password',         e.target.getPassword() );

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
bitex.app.BlinkTrade.prototype.getModel = function() {
  return this.model_;
};

bitex.app.BlinkTrade.prototype.onBeforeSetView_ = function(e){
  var view_id = e.view_id;
  if (! this.conn_.isLogged()) {
    switch(view_id) {
      case 'start':
      case 'signin':
      case 'signup':
      case 'tos':
      case 'forgot_password':
      case 'set_new_password':
      case 'broker_application':
        break;
      case 'market':
        if ( !this.conn_.isConnected() )
          this.router_.setView('start');
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

/**
 *
 * @param {string} country
 * @param {string=} opt_state
 * @return {Array.<Object>}
 */
bitex.app.BlinkTrade.prototype.getBrokersByCountry = function(country, opt_state) {
  var response = [];

  var query = country;
  if (goog.isDefAndNotNull(opt_state)) {
    query += '_' + opt_state;
  }

  var brokers = this.getModel().get('BrokerList');
  if (goog.isDefAndNotNull(brokers)) {
    goog.array.forEach(brokers, function(broker){
      var broker_accept_array = broker['AcceptCustomersFrom'][0];
      var broker_reject_array = broker['AcceptCustomersFrom'][1];

      var is_explicit_accepted = goog.array.findIndex( broker_accept_array, function(accept_data){
        return (accept_data === query || accept_data === country);
      }) >= 0;

      var is_accepted = is_explicit_accepted ||  (broker_accept_array[0] === "*" );

      var is_explicit_rejected = goog.array.findIndex( broker_reject_array, function(accept_data){
        return (accept_data === query || accept_data === country);
      }) >= 0;

      var is_rejected = is_explicit_rejected ||  (broker_reject_array[0] === "*" );

      if (is_explicit_accepted) {
        response.push(broker);
      } else if (is_accepted && !is_rejected ) {
        response.push(broker);
      }
    });
  }


  return response;
};

/**
 * @param {number} amount
 * @param {string} currency_code
 * @param {boolean=} opt_human
 */
bitex.app.BlinkTrade.prototype.formatCurrency  =   function(amount, currency_code, opt_human) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  var formatter;
  if (goog.isDefAndNotNull(opt_human) && opt_human === true) {
    formatter = new goog.i18n.NumberFormat( currency_def.human_format, currency_def.code );
  } else {
    formatter = new goog.i18n.NumberFormat( currency_def.format, currency_def.code );
  }
  return formatter.format(amount);
};

/**
 * @param {string} currency_code
 * @return {boolean}
 */
bitex.app.BlinkTrade.prototype.isCryptoCurrency  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.is_crypto;
};

/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.app.BlinkTrade.prototype.getCurrencySign  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.sign;
};

/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.app.BlinkTrade.prototype.getCurrencyDescription  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.description;
};


/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onSecurityList_ =   function(e) {
  var msg = e.data;

  goog.array.forEach(msg['Currencies'], function( currency) {
    this.currency_info_[ currency['Code'] ] = {
      code: currency['Code'],
      format: currency['FormatJS'],
      human_format: currency['HumanFormatJS'],
      description : currency['Description'],
      sign : currency['Sign'],
      pip : currency['Pip'],
      is_crypto : currency['IsCrypto']
    };

    var currency_key = currency['Code'].toLowerCase();
    var volume_key = 'volume_' +  currency_key;
    var min_key = 'min_' +  currency_key;
    var max_key = 'max_' +  currency_key;
    var avg_key = 'avg_' +  currency_key;
    var bid_key = 'best_bid_' +  currency_key;
    var offer_key = 'best_offer_' +  currency_key;
    var last_price = 'last_price_' +  currency_key;

    this.model_.set('formatted_' + volume_key, this.formatCurrency(0, currency['Code']), true );
    this.model_.set('formatted_' + min_key, this.formatCurrency(0, currency['Code']) , true);
    this.model_.set('formatted_' + max_key, this.formatCurrency(0, currency['Code']), true);
    this.model_.set('formatted_' + avg_key, this.formatCurrency(0, currency['Code']), true);
    this.model_.set('formatted_' + bid_key, this.formatCurrency(0, currency['Code']), true);
    this.model_.set('formatted_' + offer_key, this.formatCurrency(0, currency['Code']), true);
    this.model_.set('formatted_' + last_price, this.formatCurrency(0, currency['Code']), true);
  }, this);

  var symbols = [];
  goog.array.forEach(msg['Instruments'], function( instrument) {
    var symbol = instrument['Symbol'];

    this.all_markets_[symbol]  = {
      'symbol': symbol,
      'description': instrument['Description']
    };

    symbols.push( symbol );
  }, this );

  this.model_.set('SecurityList', msg);
};

/**
 * @param {Object} broker_info
 * @return {Object}
 * @private
 */
bitex.app.BlinkTrade.prototype.adjustBrokerData_ = function(broker_info) {
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
  var withdraw_structure = broker_info['WithdrawStructure'];
  goog.object.forEach(withdraw_structure,  function(withdraw_methods) {
    goog.array.forEach( withdraw_methods, function(method) {
      method['percent_fee'] = fmt.format(method['percent_fee']/100.0);
      method['fixed_fee'] = fmt.format(method['fixed_fee']/1e8);
    });
  });

  broker_info['Currencies'] = broker_info['Currencies'].split(',');
  if (broker_info['Currencies'].length === 1 && goog.string.isEmpty(broker_info['Currencies'][0])) {
    broker_info['Currencies'] = [];
  }

  var allowed_markets = {};
  var broker_currencies = goog.array.clone(broker_info['Currencies']);
  goog.array.forEach( broker_info['CryptoCurrencies'], function(crypto_currency){
    broker_currencies.push(crypto_currency['CurrencyCode']);

    var market_crypto_currency = goog.object.findKey( this.all_markets_, function(market_info, symbol) {
      if (symbol.indexOf(crypto_currency['CurrencyCode']) >= 0)  {
        return true;
      }
    });

    if (goog.isDefAndNotNull(market_crypto_currency)) {
      goog.array.forEach( broker_info['Currencies'], function(currency) {
        var market_currency = goog.object.findKey( this.all_markets_, function(market_info, symbol) {
          if (symbol.indexOf(currency) >= 0)  {
            return true;
          }
        });
        if (goog.isDefAndNotNull(market_currency)) {
          allowed_markets[market_currency] = this.all_markets_[market_currency];
        }
      },this);
    }
  },this);
  broker_info['BrokerCurrencies'] = broker_currencies;
  broker_info['AllowedMarkets'] = allowed_markets;

  return broker_info;
};

/**
 * @param {bitex.api.BitExEvent} e
 * @private
 */
bitex.app.BlinkTrade.prototype.onBrokerListResponse_ =  function(e){
  var msg = e.data;

  var broker_list = [];
  goog.array.forEach(msg['BrokerListGrp'], function( broker_array )  {
    var broker_info = {};
    goog.array.forEach(msg['Columns'], function( column, index )  {
      broker_info[column] = broker_array[index];
    }, this);

    /**
     * @desc label for broker selection on signup form
     */
    var MSG_APPLY_TO_BE_BROKER = goog.getMsg('Apply to be a broker');

    /**
     * @desc label for broker selection on signup form
     */
    var MSG_NOTIFY_ME_WHEN_A_NEW_BROKER_ARRIVE = goog.getMsg('Notify me when a new broker arrive in my region');

    switch(broker_info['SignupLabel']) {
      case '{MSG_BROKER_APPLY}':
        broker_info['SignupLabel'] = MSG_APPLY_TO_BE_BROKER;
        break;

      case '{MSG_NOTIFY_NEW_BROKER}':
        broker_info['SignupLabel'] = MSG_NOTIFY_ME_WHEN_A_NEW_BROKER_ARRIVE;
        break;
    }

    broker_info = this.adjustBrokerData_(broker_info);
    broker_list.push(broker_info);
  }, this );


  this.model_.set('BrokerList', broker_list);
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.BlinkTrade.prototype.onUserConnectBitEx_ = function(e){
  this.connectBitEx();
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.BlinkTrade.prototype.onConnectionOpen_ = function(e){
  goog.dom.classes.remove( document.body, 'ws-not-connected' );
  goog.dom.classes.add( document.body, 'ws-connected' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );

  if (! goog.isDefAndNotNull(this.model_.get('SecurityList') )) {
    this.conn_.requestSecurityList();
  }

  if (! goog.isDefAndNotNull(this.model_.get('BrokerList') )) {
    this.conn_.requestBrokerList();
  }

  // auto login in case of the user reconnecting
  var username = this.getModel().get('Username');
  var password = this.getModel().get('Password');
  if (goog.isDefAndNotNull(username) && goog.isDefAndNotNull(password)) {
    if (!goog.string.isEmpty(username) && !goog.string.isEmpty(password) ) {
      if (password.length >= 8 ) {
        this.conn_.login(username, password);
      }
    }
  }
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.BlinkTrade.prototype.onConnectionClose_ = function(e){
  goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
  goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );

  this.router_.setView('start');
};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.BlinkTrade.prototype.onConnectionError_ = function(e){
  goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
  goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
  goog.dom.classes.remove( document.body, 'bitex-broker' );
  goog.dom.classes.remove( document.body, 'bitex-non-broker' );

  /**
   * @desc notification title on Connection close
   */
  var MSG_CONNECTION_ERROR_NOTIFICATION_ERROR_TITLE = goog.getMsg('Error');


  /**
   * @desc notification content on Connection close
   */
  var MSG_CONNECTION_ERROR_NOTIFICATION_ERROR_CONTENT = goog.getMsg('detected with the connection.');

  this.showNotification('error',
                        MSG_CONNECTION_ERROR_NOTIFICATION_ERROR_TITLE,
                        MSG_CONNECTION_ERROR_NOTIFICATION_ERROR_CONTENT);

  this.router_.setView('start');
};

/**
 * @param {bitex.api.BitExEvent} e
 * @protected
 */
bitex.app.BlinkTrade.prototype.onConnectionErrorMessage_ = function(e){
  var msg = e.data;

  /**
   * @desc notification content on Connection close
   */
  var MSG_CONNECTION_ERROR_MESSAGE_NOTIFICATION_TITLE = goog.getMsg('Message from server:');

  this.showNotification('error',
                        MSG_CONNECTION_ERROR_MESSAGE_NOTIFICATION_TITLE,
                        msg['Description'] + ' - ' + msg['Detail'],
                        this.error_message_alert_timeout_);
};



/**
 * @param {string} content
 * @param {string} opt_title
 * @param {goog.ui.Dialog.ButtonSet?} opt_button_set The button set to use.
 * @return {bootstrap.Dialog}
 */
bitex.app.BlinkTrade.prototype.showDialog = function(content, opt_title, opt_button_set) {
  /**
   * @desc Connection error dialog title
   */
  var MSG_CONNECTION_ERROR_DEFAULT_DIALOG_TITLE = goog.getMsg('Error');
  var title = opt_title || MSG_CONNECTION_ERROR_DEFAULT_DIALOG_TITLE ;

  var buttonSet = opt_button_set || bootstrap.Dialog.ButtonSet.createOk();

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
 * @param {number} opt_display_time.  Defaults to 3000 milliseconds
 */
bitex.app.BlinkTrade.prototype.showNotification = function(type , title, content,  opt_display_time) {
  var display_time = 3000;
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
bitex.app.blink_trade = function( url ) {
  var app = new bitex.app.BlinkTrade();
  app.run(url );
};


goog.exportSymbol('BlinkTradeApp', bitex.app.BlinkTrade);
goog.exportProperty(BlinkTradeApp.prototype, 'showNotification', bitex.app.BlinkTrade.prototype.showNotification);
goog.exportProperty(BlinkTradeApp.prototype, 'showDialog', bitex.app.BlinkTrade.prototype.showDialog);
goog.exportProperty(BlinkTradeApp.prototype, 'getHandler', bitex.app.BlinkTrade.prototype.getHandler);
goog.exportProperty(BlinkTradeApp.prototype, 'getCurrencyDescription', bitex.app.BlinkTrade.prototype.getCurrencyDescription);
goog.exportProperty(BlinkTradeApp.prototype, 'getCurrencySign', bitex.app.BlinkTrade.prototype.getCurrencySign);
goog.exportProperty(BlinkTradeApp.prototype, 'isCryptoCurrency', bitex.app.BlinkTrade.prototype.isCryptoCurrency);
goog.exportProperty(BlinkTradeApp.prototype, 'formatCurrency', bitex.app.BlinkTrade.prototype.formatCurrency);
goog.exportProperty(BlinkTradeApp.prototype, 'getBrokersByCountry', bitex.app.BlinkTrade.prototype.getBrokersByCountry);
goog.exportProperty(BlinkTradeApp.prototype, 'getModel', bitex.app.BlinkTrade.prototype.getModel);
goog.exportProperty(BlinkTradeApp.prototype, 'getQtyCurrencyFromSymbol', bitex.app.BlinkTrade.prototype.getQtyCurrencyFromSymbol);
goog.exportProperty(BlinkTradeApp.prototype, 'getPriceCurrencyFromSymbol', bitex.app.BlinkTrade.prototype.getPriceCurrencyFromSymbol);
goog.exportProperty(BlinkTradeApp.prototype, 'setView', bitex.app.BlinkTrade.prototype.setView);
goog.exportProperty(BlinkTradeApp.prototype, 'getBitexConnection', bitex.app.BlinkTrade.prototype.getBitexConnection);
goog.exportProperty(BlinkTradeApp.prototype, 'connectBitEx', bitex.app.BlinkTrade.prototype.connectBitEx);
goog.exportProperty(BlinkTradeApp.prototype, 'run', bitex.app.BlinkTrade.prototype.run);

