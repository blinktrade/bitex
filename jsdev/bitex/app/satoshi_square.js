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

goog.require('bitex.view.SideBarView');

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

  goog.soy.renderElement(goog.dom.getElement('id_customers_well'), bitex.templates.DataGrid, {
    id: 'id_customer_table',
    title: 'Customers'
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
  var accountActivityView = new bitex.view.NullView(this);
  var tradingView         = new bitex.view.NullView(this);
  var withdrawView        = new bitex.view.NullView(this);
  var customersView       = new bitex.view.NullView(this);
  var accountOverviewView = new bitex.view.NullView(this);
  var sideBarView         = new bitex.view.SideBarView(this);

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


  this.router_.addView( 'start'             , startView           );
  this.router_.addView( 'set_new_password'  , setNewPasswordView  );
  this.router_.addView( 'signin'            , loginView           );
  this.router_.addView( 'signup'            , signUpView          );
  this.router_.addView( 'forgot_password'   , forgotPasswordView  );
  this.router_.addView( 'tos'               , tosView             );
  this.router_.addView( 'trading'           , tradingView         );
  this.router_.addView( 'offerbook'         , offerBookView       );
  this.router_.addView( 'deposit'           , depositView         );
  this.router_.addView( 'withdraw'          , withdrawView        );
  this.router_.addView( 'account_activity'  , accountActivityView );
  this.router_.addView( 'customers'         , customersView       );
  this.router_.addView( 'account_overview'  , accountOverviewView );
  this.router_.addView( 'verification'      , verificationView    );
  this.router_.addView( 'enable_two_factor' , enableTwoFactorView );

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

  handler.listen(this.model_, bitex.model.Model.EventType.SET + 'Broker', this.onModelSetBroker_ );

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

bitex.app.SatoshiSquare.prototype.onUserChangeMarket_ = function(e) {
  var symbol = e.target.getSymbol();
  var qtyCurrency = symbol.substr(0,3);
  var priceCurrency = symbol.substr(3);

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
  var view_name = e.view;
  if (! this.conn_.isLogged()) {
    switch(view_name) {
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
  goog.dom.classes.add( document.body, 'active-view-' + view_name );
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


bitex.app.SatoshiSquare.prototype.onModelSetBroker_ = function(e) {
  var broker = e.data;

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
 * @param {string} url
 */
bitex.app.satoshi_square = function( url ) {
  var app = new bitex.app.SatoshiSquare();
  app.run(url );
  return ;



  var bitEx = new bitex.api.BitEx();
  var model = new bitex.model.Model(document.body);


  var account_activity_table = null;

  var withdraw_list_table = null;
  var customers_table = null;

  var brokers_by_country = {};
  var currency_info = {};
  var all_markets = [];
  var trade_subscriptions = null;

  var order_book_bid = null;
  var order_book_offer = null;
  var subscription_1 = null;

  var format_currency = function(value, currency) {
    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var currency_def = currency_info[currency];

    var formatter = new goog.i18n.NumberFormat( currency_def.format, currency_def.code );

    return formatter.format(value);
  };

  // Create all order books
  goog.dom.removeChildren( goog.dom.getElement('id_order_book_bid_content'));
  goog.dom.removeChildren( goog.dom.getElement('id_order_book_ask_content'));

  goog.soy.renderElement(goog.dom.getElement('id_order_book_bid_content'), bitex.templates.OrderBook, {
    id: 'order_book_bid',
    title: 'BID',
    columns: ['Buyer', 'Amount', 'Price']
  });

  goog.soy.renderElement(goog.dom.getElement('id_order_book_ask_content'), bitex.templates.OrderBook, {
    id: 'order_book_offer',
    title: 'ASK',
    columns: ['Price', 'Amount', 'Seller']
  });


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

  goog.soy.renderElement(goog.dom.getElement('id_customers_well'), bitex.templates.DataGrid, {
    id: 'id_customer_table',
    title: 'Customers'
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


  var countries = bitex.util.getCountries();
  goog.object.forEach( countries, function(country_info, country_code ) {
    var country = country_info;

    if (goog.isArrayLike(country)) {
      country = country[0];
    }

    var el = goog.dom.createDom('option', {'value': country_code }, country);
    goog.dom.appendChild( goog.dom.getElement('id_signup_country'), el );
  });

  var buy_order_entry = new bitex.ui.OrderEntryX();
  var sell_order_entry = new bitex.ui.OrderEntryX();

  buy_order_entry.decorate( goog.dom.getElement('id_order_entry_buy') );
  sell_order_entry.decorate( goog.dom.getElement('id_order_entry_sell') );


  try{
    bitEx.open(url);
  } catch( e ) {
    alert('Error connecting to the server. Please try again');
    return;
  }

  buy_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendBuyLimitedOrder( e.target.getSymbol(),
                                                     e.target.getAmount(),
                                                     e.target.getPrice(),
                                                     e.target.getClientID());
  });

  sell_order_entry.addEventListener(bitex.ui.OrderEntryX.EventType.SUBMIT, function(e) {
    var client_order_id = bitEx.sendSellLimitedOrder( e.target.getSymbol(),
                                                      e.target.getAmount(),
                                                      e.target.getPrice(),
                                                      e.target.getClientID());
  });



  bitEx.addEventListener( bitex.api.BitEx.EventType.OPENED, function(e) {
    goog.dom.classes.remove( document.body, 'ws-not-connected' );
    goog.dom.classes.add( document.body, 'ws-connected' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );

    goog.dom.removeChildren(goog.dom.getElement('id_instrument_1'));
    bitEx.requestSecurityList();

    bitEx.requestBrokerList();
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.CLOSED, function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    router.setView('start');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ERROR ,  function(e) {
    goog.dom.classes.add( document.body, 'ws-not-connected','bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'ws-connected' , 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Error');
    dlg.setContent('Error connecting to the server. Your browser MUST SUPPORT WebSockets.');
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('start');
  });

  var onSelectCountry = function(selected_country) {
    console.log( 'selected country:' + selected_country);

    goog.dom.removeChildren(goog.dom.getElement('id_signup_state'));
    var country_info = countries[selected_country];
    goog.style.showElement( goog.dom.getElement('id_signup_state_group'), goog.isArrayLike(country_info) );

    goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));
    if (goog.isDefAndNotNull(brokers_by_country[""][0] )) {
      var broker_info = brokers_by_country[""][0];
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }

    if ( goog.isArrayLike(country_info)) {
      var states_code_array = country_info[1].split('|');
      var states_name_array = country_info[2].split('|');

      var number_of_states_with_brokers = 0;
      var last_state_with_broker = '';
      goog.array.forEach(states_code_array, function(state_code, index) {
        var state_name = states_name_array[index];
        var el = goog.dom.createDom('option', {'value': state_code }, state_name);
        goog.dom.appendChild( goog.dom.getElement('id_signup_state'), el );

        var stateIndex = goog.array.findIndex( brokers_by_country[selected_country], function(broker_info )  {
          if (broker_info['State'] === state_code ) {
            return true;
          }
        });
        if (stateIndex >= 0){
          ++number_of_states_with_brokers;
          last_state_with_broker = state_code;
        }

      });
      if (number_of_states_with_brokers==1) {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), last_state_with_broker );
        onSelectState(selected_country, last_state_with_broker);
      }
    } else {
      var number_of_available_brokers = 0;
      var last_available_broker = "";

      goog.object.forEach(brokers_by_country[selected_country], function(broker_info) {
        var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
        goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );

        ++number_of_available_brokers;
        last_available_broker = broker_info['BrokerID'];
      });

      if (number_of_available_brokers == 1) {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
      } else {
        goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
      }

      goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
      goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );
    }
  };

  var onSelectState = function( selected_country, selected_state ) {
    goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));

    if (goog.isDefAndNotNull(brokers_by_country[""][0] )) {
      var broker_info = brokers_by_country[""][0];
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }

    var number_of_available_brokers = 0;
    var last_available_broker = "";
    goog.array.forEach(brokers_by_country[selected_country], function(broker_info) {
      if (broker_info['State'] === selected_state ) {
        ++number_of_available_brokers;
        last_available_broker = broker_info['BrokerID'];
        var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
        goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
      }
    });
    if (number_of_available_brokers == 1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
    } else {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
    }
    goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
    goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );

  };

  goog.events.listen(goog.dom.getElement('id_signup_country'), goog.events.EventType.CHANGE  , function(e) {
    var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
    onSelectCountry(selected_country);
  });

  goog.events.listen(goog.dom.getElement('id_signup_state'), goog.events.EventType.CHANGE  , function(e) {
    var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
    var selected_state = goog.dom.forms.getValue(goog.dom.getElement('id_signup_state') ) ;
    onSelectState(selected_country, selected_state);
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, function(e){
    var msg = e.data;

    var last_country_code = "";
    var number_of_countries = 0;
    goog.array.forEach(msg['BrokerListGrp'], function( broker_array )  {
      var broker_info = {};
      goog.array.forEach(msg['Columns'], function( column, index )  {
        broker_info[column] = broker_array[index];
      });
      if (broker_info['CountryCode'] in brokers_by_country) {
        brokers_by_country[broker_info['CountryCode'] ].push(broker_info);
      } else {
        brokers_by_country[broker_info['CountryCode'] ] = [broker_info];

        if (broker_info['CountryCode'].length > 0) {
          last_country_code = broker_info['CountryCode'];
          ++number_of_countries ;
        }
      }
    });

    if (number_of_countries == 1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), last_country_code );
      onSelectCountry(last_country_code);
    }
  });



  bitEx.addEventListener( bitex.api.BitEx.EventType.SECURITY_LIST, function(e) {
    var msg = e.data;

    goog.array.forEach(msg['Currencies'], function( currency) {
      currency_info[ currency['Code'] ] = {
        code: currency['Code'],
        format: currency['FormatJS'],
        description : currency['Description'],
        sign : currency['Sign'],
        pip : currency['Pip'],
        is_crypto : currency['IsCrypto']
      };

      var balance_key = 'balance_' +  currency['Code'].toLowerCase();
      model.set( balance_key , 0 );
      model.set('formatted_' + balance_key, format_currency(0, currency['Code']));
    });

    var symbols = [];
    goog.array.forEach(msg['Instruments'], function( instrument) {
      var symbol = instrument['Symbol'];

      all_markets[symbol]  = {
        symbol: symbol,
        description: instrument['Description']
      };

      symbols.push( symbol );
      var el = goog.dom.createDom('option', {'value': symbol }, instrument['Description']);
      goog.dom.appendChild( goog.dom.getElement('id_instrument_1'), el );
    });

    //trade_subscriptions =  bitEx.subscribeMarketData( 0,  symbols , ['2'] );
  });

  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (!bitEx.isLogged()) {
      switch(view_name) {
        case 'start':
        case 'signin':
        case 'signup':
        case 'forgot_password':
        case 'set_new_password':
          break;
        default:
          // redirect non-logged users to the signin page
          router.setView('start');
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
    goog.dom.classes.add( document.body, 'active-view-' + view_name );
  });

  // When user select 'withdraw', let's load all withdraw requests from this user
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e){
    var view_name = e.view;
    if (view_name !== 'withdraw' || !bitEx.isLogged() ) {
      return;
    }

    if (!goog.isDefAndNotNull(withdraw_list_table)) {
      var el = goog.dom.getElement('id_withdraw_list_table');

      withdraw_list_table = new bitex.ui.WithdrawList();
      withdraw_list_table.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
        var page = e.options['Page'];
        var limit = e.options['Limit'];
        bitEx.requestWithdrawList( 'all_withdraws', page, limit, ['1', '2'] );
      });

      withdraw_list_table.decorate(el);

      bitEx.addEventListener(bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE,  function(e) {
        var msg = e.data;

        if (msg['WithdrawListReqID'] === 'all_withdraws' && goog.isDefAndNotNull(withdraw_list_table) ) {
          withdraw_list_table.setResultSet( msg['WithdrawListGrp'], msg['Columns'] );
        }
      });

    }
  });

  // when user select 'account_activity', let's load all transactions from this user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'account_activity' || !bitEx.isLogged() ) {
      return;
    }

    if (!goog.isDefAndNotNull(account_activity_table)) {
      var el = goog.dom.getElement('id_trade_history_table');
      account_activity_table = new bitex.ui.AccountActivity();


      account_activity_table.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
        // Get the list of all open orders
        var page = e.options['Page'];
        var limit = e.options['Limit'];

        bitEx.requestOrderList( 'closed_orders', page, limit, ['1', '2'] );
      });

      account_activity_table.decorate(el);

      bitEx.addEventListener('order_list_response',  function(e) {
        var msg = e.data;

        if (msg['OrdersReqID'] === 'closed_orders' && goog.isDefAndNotNull(account_activity_table) ) {
          account_activity_table.setResultSet( msg['OrdListGrp'], msg['Columns'] );
        }
      });

    }
  });

  // when user select 'verification', let's the verification iframe for the user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'verification' || !bitEx.isLogged() ) {
      return;
    }

    var broker = model.get('Broker');
    if (!goog.isDefAndNotNull(broker)){
      return;
    }

    var verification_form_url =  broker['VerificationForm'];
    var form_src = goog.string.subs(verification_form_url, model.get('UserID'), model.get('Username'), model.get('Email'));



    var verificationIFrameForm = goog.dom.getElement("JotFormIFrame");

    if (verificationIFrameForm.src !== form_src ) {
      verificationIFrameForm.src = form_src;
    }
  });


  // 'customers' view
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'customers' || !bitEx.isLogged() ) {
      return;
    }

    if (! goog.isDefAndNotNull(customers_table)) {
      customers_table = new bitex.ui.Customers();
      customers_table.decorate(goog.dom.getElement('id_customer_table'));

      customers_table.addEventListener( bitex.ui.DataGrid.EventType.REQUEST_DATA,function(e) {
        var page = e.options['Page'];
        var limit = e.options['Limit'];
        bitEx.requestCustomerList('customers', undefined, undefined, page, limit, [0,1]);
      });

      bitEx.addEventListener(bitex.api.BitEx.EventType.CUSTOMER_LIST_RESPONSE,  function(e) {
        var msg = e.data;
        customers_table.setResultSet( msg['CustomerListGrp'], msg['Columns'] );
      });
      bitEx.requestCustomerList('customers', undefined, undefined, 0, 100, [0,1]);

      customers_table.addEventListener( bitex.ui.Customers.EventType.DETAIL, function(e){
        var user_id = e.user_id;
        var user_data = e.data;

        router.setView('account_overview');

        var account_overview_header_el = goog.dom.getElement('account_overview_header_id');
        goog.dom.removeChildren(account_overview_header_el);
        goog.soy.renderElement(account_overview_header_el,bitex.templates.AccountOverviewHeader, {msg_customer_detail: user_data});
      });
    }
  });



  //var customerDetailDialog;
  bitEx.addEventListener(bitex.api.BitEx.EventType.CUSTOMER_DETAIL_RESPONSE, function(e){
    var msg = e.data;

    router.setView('account_overview');

    //if (goog.isDefAndNotNull(customerDetailDialog)) {
    //  customerDetailDialog.dispose();
    //}
    //
    //var dlg_content = bitex.templates.CustomerDetailDialog({ username: msg['Username'] });
    //
    ///**
    // * @desc Customer dialog title
    // */
    //var MSG_CUSTOMER_DIALOG_TITLE = goog.getMsg('Customer details');
    //
    //customerDetailDialog = new bootstrap.Dialog();
    //customerDetailDialog.setTitle( MSG_CUSTOMER_DIALOG_TITLE );
    //customerDetailDialog.setContent(dlg_content);
    //customerDetailDialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOkCancel());
    //customerDetailDialog.setVisible(true);
  });


  /**
   * @param {string} symbol
   */
  var switchSymbol = function(symbol) {
    // Subscribe to MarketData
    if (subscription_1) {
      bitEx.unSubscribeMarketData(subscription_1);
    }
    subscription_1 =  bitEx.subscribeMarketData( 0, [ symbol ], ['0','1'] );

    if (goog.isDefAndNotNull(order_book_bid)) {
      order_book_bid.clear();
      order_book_offer.clear();

      order_book_bid.dispose();
      order_book_offer.dispose();
    }

    var qtyCurrency = symbol.substr(0,3);
    var priceCurrency = symbol.substr(3);

    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var qtyCurrencyDef = currency_info[qtyCurrency];

    /**
     * @type {bitex.model.OrderBookCurrencyModel}
     */
    var priceCurrencyDef = currency_info[priceCurrency];

    buy_order_entry.setSymbol(symbol);
    buy_order_entry.setAmountCurrencySign( qtyCurrencyDef.sign );
    buy_order_entry.setPriceCurrencySign( priceCurrencyDef.sign );
    sell_order_entry.setSymbol(symbol);
    sell_order_entry.setAmountCurrencySign( qtyCurrencyDef.sign );
    sell_order_entry.setPriceCurrencySign( priceCurrencyDef.sign );

    goog.style.showElement( sell_order_entry.getElement(), goog.isDefAndNotNull( model.get('AllowedMarkets')[symbol]));
    goog.style.showElement( buy_order_entry.getElement(), goog.isDefAndNotNull( model.get('AllowedMarkets')[symbol]));

    order_book_bid =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.BUY, qtyCurrencyDef, priceCurrencyDef);
    order_book_offer =  new bitex.ui.OrderBook(model.get('Username'), bitex.ui.OrderBook.Side.SELL, qtyCurrencyDef, priceCurrencyDef);
    order_book_bid.decorate( goog.dom.getElement('order_book_bid') );
    order_book_offer.decorate( goog.dom.getElement('order_book_offer') );

    order_book_bid.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
    order_book_offer.addEventListener(bitex.ui.OrderBook.EventType.CANCEL, onCancelOrder_);
  };

  // when user select 'offerbook', let's the verification iframe for the user.
  router.addEventListener(bitex.app.UrlRouter.EventType.SET_VIEW, function(e) {
    var view_name = e.view;
    if (view_name !== 'offerbook' || !bitEx.isLogged() ) {
      if (subscription_1) {
        bitEx.unSubscribeMarketData(subscription_1);
        subscription_1 = null;
      }

      if (goog.isDefAndNotNull(order_book_bid)) {
        order_book_bid.clear();
        order_book_offer.clear();

        order_book_bid.dispose();
        order_book_offer.dispose();

        order_book_bid = null;
        order_book_offer = null;
      }

      return;
    }

    var symbol = goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') ) ;
    if (goog.isDefAndNotNull(symbol) ) {
      switchSymbol(symbol);
    }

    goog.events.listen(goog.dom.getElement('id_instrument_1'), goog.events.EventType.CHANGE  , function(e) {
      symbol = goog.dom.forms.getValue(goog.dom.getElement('id_instrument_1') ) ;
      console.log('selected ' + symbol);
      switchSymbol(symbol);
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR, function(e){
    order_book_bid.clear();
    order_book_offer.clear();
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrderThru(index);
    } else if (side == '1') {
      order_book_offer.deleteOrderThru(index);
    }
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.deleteOrder(index);
    } else if (side == '1') {
      order_book_offer.deleteOrder(index);
    }
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var qty = msg['MDEntrySize']/1e8;
    var side = msg['MDEntryType'];

    if (side == '0') {
      order_book_bid.updateOrder(index, qty);
    } else if (side == '1') {
      order_book_offer.updateOrder(index, qty);
    }
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER,  function(e) {
    var msg = e.data;
    var index = msg['MDEntryPositionNo'] - 1;
    var price =  msg['MDEntryPx']/1e8;
    var qty = msg['MDEntrySize']/1e8;
    var username = msg['Username'];
    var broker = msg['Broker'];
    var orderId =  msg['OrderID'];
    var side = msg['MDEntryType'];

    if (side == '0') {
      if (index === 0) {
        model.set('formatted_best_bid_brl', price);
      }
      order_book_bid.insertOrder(index, orderId, price, qty, username, broker );
    } else if (side == '1') {
      if (index === 0) {
        model.set('formatted_best_offer_brl', price);
      }
      order_book_offer.insertOrder(index, orderId, price, qty, username, broker );
    }
  });


  goog.events.listen( document.body, 'click' , function(e){
    var element = e.target;

    var view_name = element.getAttribute('data-switch-view');
    if (goog.isDefAndNotNull(view_name)) {
      e.preventDefault();
      e.stopPropagation();

      router.setView(view_name );
    }
  });

  var withdraws_component = new goog.ui.Component();
  withdraws_component.decorate(goog.dom.getElement('withdraw_accordion'));

  /**
   * @desc Withdraw Button
   */
  var MSG_BTN_WITHDRAW = goog.getMsg('Withdraw');

  /**
   * @desc Bitcoin Withdraw accordion title
   */
  var MSG_LABEL_BITCOIN_WITHDRAWAL = goog.getMsg('Bitcoin withdrawal');

  /**
   * @desc Amount label
   */
  var MSG_LABEL_AMOUNT = goog.getMsg('Amount');

  /**
   * @desc Amount label
   */
  var MSG_LABEL_AMOUNT_BITCOIN_PLACEHOLDER = goog.getMsg('eg. 0.44550000');

  var withdraw_btc = new bitex.ui.Withdraw( { parent_id:'withdraw_accordion',
                                              button_label:MSG_BTN_WITHDRAW,
                                              title: MSG_LABEL_BITCOIN_WITHDRAWAL,
                                              description: 'Fill up the form.',
                                              controls: [ ['amount', MSG_LABEL_AMOUNT, MSG_LABEL_AMOUNT_BITCOIN_PLACEHOLDER, '฿'],
                                                ['wallet', 'Wallet', 'eg. 1933phfhK3ZgFQNLGSDXvqCn32k2buXY8a'] ]  });

  /**
   * @desc Brazilian bank Withdraw accordion title
   */
  var MSG_LABEL_BRAZILIAN_BANK_WITHDRAWAL = goog.getMsg('Brazilian Bank Withdrawal');

  /**
   * @desc Amount label
   */
  var MSG_LABEL_AMOUNT_BRAZLIAN_BANK_PLACEHOLDER = goog.getMsg('eg. 2300');


  var withdraw_brl_bank_transfer =
      new bitex.ui.Withdraw({ parent_id:'withdraw_accordion',
                              button_label:MSG_BTN_WITHDRAW,
                              title: MSG_LABEL_BRAZILIAN_BANK_WITHDRAWAL,
                              description: 'R$ 10,00 fee for DOC and TED.',
                              controls: [ ['amount', MSG_LABEL_AMOUNT , MSG_LABEL_AMOUNT_BRAZLIAN_BANK_PLACEHOLDER, 'R$'],
                                ['bank_number',     'Bank number'     , 'eg. 341'],
                                ['bank_name',       'Bank name'       , 'eg. Banco Itáu'],
                                ['account_branch',  'Account Branch'  , 'eg. 5555'],
                                ['account_name',    'Account name '   , 'eg. José da Silva'],
                                ['account_number',  'Account number'  , 'ex. 888888'],
                                ['CPFCNPJ',         'CPF or CNPJ'     , 'ex. 567.890.123-45']
                              ]});

  withdraws_component.addChild(withdraw_btc, true);
  withdraws_component.addChild(withdraw_brl_bank_transfer, true);


  withdraw_btc.addEventListener( bitex.ui.Withdraw.EventType.WITHDRAW, function(e){
    var amount = e.target.getModel().data['amount'];
    amount = amount.replace(',','.');
    if (amount.lastIndexOf('.') != amount.indexOf('.') ) {
      alert('Invalid value.');
      return;
    }


    bitEx.withdrawCryptoCoin( parseFloat(amount),
                              e.target.getModel().data['wallet'] ,
                              'BTC');
  });

  withdraw_brl_bank_transfer.addEventListener( bitex.ui.Withdraw.EventType.WITHDRAW, function(e){
    var amount = e.target.getModel().data['amount'];
    amount = amount.replace(',','.');
    if (amount.lastIndexOf('.') != amount.indexOf('.') ) {
      alert('Invalid value.');
      return;
    }

    bitEx.withdrawBRLBankTransfer( parseFloat(amount),
                                   e.target.getModel().data['bank_number'] ,
                                   e.target.getModel().data['bank_name'] ,
                                   e.target.getModel().data['account_name'] ,
                                   e.target.getModel().data['account_number'] ,
                                   e.target.getModel().data['account_branch'] ,
                                   e.target.getModel().data['CPFCNPJ'])
  });


  model.addEventListener( bitex.model.Model.EventType.SET + 'best_offer_brl', function(e) {
    var formatted_best_offer = e.data;
    buy_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_offer) );
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'best_bid_brl', function(e) {
    var formatted_best_bid = e.data;
    sell_order_entry.setMarketPrice( goog.string.toNumber(formatted_best_bid) );
  });


  /**
   * @param {bitex.ui.OrderBookEvent} e
   */
  var onCancelOrder_ = function(e) {
    bitEx.cancelOrder(undefined, e.order_id);
  };


  bitEx.addEventListener(bitex.api.BitEx.EventType.ERROR_MESSAGE, function(e) {
    var msg = e.data;

    console.log( goog.debug.deepExpose(msg) );
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.LOGIN_OK,  function(e) {
    var msg = e.data;

    goog.dom.classes.add( document.body, 'bitex-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-not-logged' );

    model.set('UserID',           msg['UserID'] );
    model.set('Username',         msg['Username']);
    model.set('TwoFactorEnabled', msg['TwoFactorEnabled']);
    model.set('IsBroker',         msg['IsBroker'] );
    model.set('Broker',           msg['Broker']);

    buy_order_entry.setBrokerMode(model.get('IsBroker')  );
    sell_order_entry.setBrokerMode(model.get('IsBroker')  );

    goog.dom.removeChildren( goog.dom.getElement("id_account_summary_content"));

    if (! msg['IsBroker'] ) {
      goog.dom.classes.add( document.body, 'bitex-non-broker'  );
      buy_order_entry.setClientID(model.get('UserID'));
      sell_order_entry.setClientID(model.get('UserID'));


      var balance_currencies = msg['Broker']['Currencies'].toLocaleLowerCase().split(',');

      // get all crypto currencies
      goog.object.forEach( currency_info, function(currency_obj, currency_code) {
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




    bitEx.requestBalances();

    // Request Boleto Options
    bitEx.requestBoletoOptions();

    // set view to Trading
    router.setView('offerbook');
  });

  bitEx.addEventListener(bitex.api.BitEx.EventType.EXECUTION_REPORT, function(e){
    var msg = e.data;
    switch( msg['ExecType'] ) {
      case '1':  //Partial Execution
        $.sticky('Order ' + msg['OrderID'] +  ' partially filled');
        break;
      case '2':  //Execution
        $.sticky('Order ' + msg['OrderID'] +  ' filled');
        break;
      case '4':  //Offer Cancelled
        $.sticky('Order ' + msg['OrderID'] +  ' cancelled');
        break;
    }
  });

  var withdrawConfirmationDialog;
  var withdrawResponseFunction = function(e){
    var msg = e.data;

    if (goog.isDefAndNotNull(withdrawConfirmationDialog)) {
      withdrawConfirmationDialog.dispose();
    }
    /*
    var dlg_content =
        '<p>Para a sua segurança, nós enviamos um <strong>código de confirmação</strong> para o seu email. </p> ' +
            '<input id="id_withdraw_confirmation" placeholder="Código de confirmação" class="input-block-level">' +
            '<p><i>A operação só será efeutada mediante ao código de confirmação que fora enviada para o seu email.</i></p>';

    */

    var dlg_content =
        '<p>We just sent a <strong>confirmation code</strong> to your email. </p> ' +
            '<input id="id_withdraw_confirmation" placeholder="Código de confirmação" class="input-block-level">' +
            '<p><i>This is security measure to improve your account security</i></p>';

    withdrawConfirmationDialog = new bootstrap.Dialog();
    withdrawConfirmationDialog.setTitle('Confirm the withdraw request');
    withdrawConfirmationDialog.setContent(dlg_content);
    withdrawConfirmationDialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOkCancel());
    withdrawConfirmationDialog.setVisible(true);

    goog.events.listenOnce(withdrawConfirmationDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var token = goog.dom.forms.getValue( goog.dom.getElement("id_withdraw_confirmation") );
        bitEx.confirmWithdraw(token);
      }
      withdrawConfirmationDialog.dispose();
    });
  };
  bitEx.addEventListener(bitex.api.BitEx.EventType.BRL_BANK_TRANSFER_WITHDRAW_RESPONSE, withdrawResponseFunction );
  bitEx.addEventListener(bitex.api.BitEx.EventType.CRYPTO_COIN_WITHDRAW_RESPONSE, withdrawResponseFunction );


  bitEx.addEventListener( bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK,  function(e) {
    var msg = e.data;
    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Success');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

    router.setView('signin');
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR,  function(e) {
    var msg = e.data;
    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Error chaning password');
    dlg.setContent(msg['UserStatusText']);
    dlg.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);

  });

  var secondFactorDialog;
  bitEx.addEventListener(bitex.api.BitEx.EventType.LOGIN_ERROR,  function(e) {
    goog.dom.classes.add( document.body, 'bitex-not-logged'  );
    goog.dom.classes.remove( document.body, 'bitex-logged' );
    goog.dom.classes.remove( document.body, 'bitex-broker' );
    goog.dom.classes.remove( document.body, 'bitex-non-broker' );


    var msg = e.data;

    model.set('UserID', '');
    model.set('Username', '');

    if (msg['NeedSecondFactor']) {
      if (goog.isDefAndNotNull(secondFactorDialog)) {
        secondFactorDialog.dispose();
      }

      secondFactorDialog = new bootstrap.Dialog();
      secondFactorDialog.setTitle('Autenticação em 2 passos');
      secondFactorDialog.setContent('Google Authenticator code: <input id="id_second_factor" placeholder="eg. 555555" size="10">');
      secondFactorDialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOkCancel());
      secondFactorDialog.setVisible(true);

      goog.events.listenOnce(secondFactorDialog, goog.ui.Dialog.EventType.SELECT, function(e) {
        if (e.key == 'ok') {

          var username = goog.dom.forms.getValue( goog.dom.getElement("id_landing_username") );
          var password = goog.dom.forms.getValue( goog.dom.getElement("id_landing_password") );
          var second_factor = goog.dom.forms.getValue( goog.dom.getElement("id_second_factor") );

          if ( goog.string.isEmpty(username) ) {
            username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
            password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );
          }
          login(username, password,second_factor);
        }
        secondFactorDialog.dispose();
      });


    } else {
      var error_dialog = new bootstrap.Dialog();
      error_dialog.setTitle('Error');
      error_dialog.setContent(msg['UserStatusText']);
      error_dialog.setButtonSet( goog.ui.Dialog.ButtonSet.createOk());
      error_dialog.setVisible(true);
    }
  });


  bitEx.addEventListener( bitex.api.BitEx.EventType.TRADE,  function(e) {
    var msg = e.data;
    //var formated_price =  format_currency(msg['MDEntryPx']/1e8) , msg['Symbol'].substr(3) );
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BALANCE_RESPONSE,  function(e) {
    var msg = e.data;
    delete msg['MsgType'];
    delete msg['BalanceReqID'];

    goog.object.forEach(msg, function( balances, broker ) {
      goog.object.forEach(balances, function( balance, currency ) {
        balance = balance / 1e8;

        var balance_key = 'balance_' +  currency.toLowerCase();
        model.set( balance_key , balance );

        model.set('formatted_' + balance_key, format_currency(balance, currency));
      });
    });
  });


  var button_signup = new goog.ui.Button();
  button_signup.decorate(goog.dom.getElement('id_btn_signup'));

  goog.events.listen(goog.dom.getElement('user_agreed_tos'),goog.events.EventType.CLICK,function(e) {
    button_signup.setEnabled(e.target.checked);
  });

  button_signup.addEventListener( goog.ui.Component.EventType.ACTION, function(e){
    e.stopPropagation();
    e.preventDefault();


    // Perform client validation
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_signup_username") );
    var email = goog.dom.forms.getValue( goog.dom.getElement("id_signup_email") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password") );
    var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password2") );
    var state = goog.dom.forms.getValue( goog.dom.getElement("id_signup_state") );
    var country_code = goog.dom.forms.getValue( goog.dom.getElement("id_signup_country") );
    var broker = goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker")));


    if (goog.string.isEmpty(username) || !goog.string.isAlphaNumeric(username) ) {
      alert('Invalid username');
      return;
    }

    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      alert('Invalid email');
      return;
    }

    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Senha deve ter no mínimo 6 letras');
      return;
    }

    if ( password !== password2 ) {
      alert('Passwords does not match');
      return;
    }


    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }
      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.signUp(username, password, email, state, country_code,  broker);
      });

    } else {
      bitEx.close();
    }
  });


  var login = function(username, password, opt_second_factor ) {
    username      = goog.string.trim(username);
    var second_factor = goog.string.trim(opt_second_factor || '');

    if (goog.string.isEmpty(username) ) {
      alert('Invalid username');
      return;
    }
    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Password must have at least 6 characters');
      return;
    }

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }

      goog.events.listenOnce( bitEx, 'opened', function(e){
        if (goog.string.isEmpty(second_factor) ) {
          bitEx.login(username, password);
        } else {
          bitEx.login(username, password, second_factor);
        }
      });

    } else {
      if (goog.string.isEmpty(second_factor) ) {
        bitEx.login(username, password);
      } else {
        bitEx.login(username, password, second_factor);
      }
    }
  };


  bitEx.addEventListener( bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, function(e){
    var msg = e.data;
    model.set('TwoFactorSecret', msg['TwoFactorSecret']);
    model.set('TwoFactorEnabled', msg['TwoFactorEnabled'] );

    var secret_qr_el = goog.dom.getElement('id_secret_qr');
    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    if (goog.string.isEmpty(msg['TwoFactorSecret'])) {
      goog.style.showElement( divEl , false);
    } else {
      goog.style.showElement( divEl , true);

      var qr_code = 'https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=' + msg['TwoFactorSecret'];
      secret_qr_el.setAttribute('src', qr_code);
    }
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'Broker', function(e) {
    var broker = e.data;

    var allowed_markets = {};
    goog.array.forEach( broker['Currencies'].split(',') , function(currency) {
     var market = goog.object.findKey( all_markets, function(market_info, symbol) {
       if (symbol.indexOf(currency) >= 0)  {
         return true;
       }
     });
     if (goog.isDefAndNotNull(market)) {
       allowed_markets[market] = all_markets[market];
     }
    });
    model.set('AllowedMarkets',allowed_markets);

    var allowed_markets_array = goog.object.getKeys(allowed_markets);
    if (allowed_markets_array.length === 1 ) {
      goog.dom.forms.setValue(goog.dom.getElement('id_instrument_1'), allowed_markets_array[0] );
      switchSymbol(allowed_markets_array[0]);
    }

  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'BtcAddress', function(e) {
    var btc_address = e.data;
    var qr_code = 'https://chart.googleapis.com/chart?chs=100x100&chld=M%7C0&cht=qr&chl=' + btc_address;

    btc_adrress_el = goog.dom.getElement('id_bitcoin_address_img');
    btc_adrress_el.setAttribute('src', qr_code);
  });


  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorSecret', function(e){
    var secret = e.data;
    var has_secret = goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    goog.style.showElement( divEl , has_secret);
  });

  model.addEventListener( bitex.model.Model.EventType.SET + 'TwoFactorEnabled', function(e){
    var enabled = e.data;

    var secret = model.get('TwoFactorSecret');
    var has_secret = goog.string.isEmpty(secret);

    var divEl = goog.dom.getElement('id_enable_two_factor_div');
    var btnEnableEl = goog.dom.getElement('id_btn_enable_two_factor');
    var btnDisableEl = goog.dom.getElement('id_btn_disable_two_factor');

    goog.style.showElement( btnEnableEl , !enabled);
    goog.style.showElement( btnDisableEl , enabled);
    goog.style.showElement( divEl , has_secret);
  });


  goog.events.listen( goog.dom.getElement('id_btn_enable_two_factor'), 'click', function(e){
    var secret = model.get('TwoFactorSecret');
    var code = goog.dom.forms.getValue( goog.dom.getElement('id_second_step_verification'));
    bitEx.enableTwoFactor(true, secret, code);
  });

  goog.events.listen( goog.dom.getElement('id_btn_disable_two_factor'), 'click', function(e){
    bitEx.enableTwoFactor(false);
  });

  goog.events.listen( goog.dom.getElement('id_btn_forgot_password'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();

    var email = goog.dom.forms.getValue( goog.dom.getElement("id_forgot_password_email") );
    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      alert('Endereço de email inválido');
      return;
    }

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }
      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.forgotPassword(email);
      });

    } else {
      bitEx.forgotPassword(email);
    }

    router.setView('set_new_password');
  });

  goog.events.listen( goog.dom.getElement('id_btn_set_new_password'), 'click', function(e){

    e.stopPropagation();
    e.preventDefault();

    var token = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_token") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_password") );
    var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_set_new_password_password2") );

    if (goog.string.isEmpty(token)) {
      alert('Invalid confirmation code');
      return;
    }

    if ( goog.string.isEmpty(password)  || password.length < 6) {
      alert('Password must have at least 6 characters');
      return;
    }

    if ( password !== password2 ) {
      alert('Passwords does not match');
      return;
    }

    if (goog.dom.classes.has( document.body, 'ws-not-connected' )) {
      try{
        bitEx.open(url);
      } catch( e ) {
        alert('Error connecting to the server...');
        return;
      }
      goog.events.listenOnce( bitEx, 'opened', function(e){
        bitEx.resetPassword(token, password);
      });

    } else {
      bitEx.resetPassword(token, password);
    }

  });

  var boleto_buttons = goog.dom.getElementsByClass('boleto-options-group');
  goog.array.forEach( boleto_buttons, function( boleto_button ) {
    goog.events.listen( boleto_button, 'click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var element = e.target;

      var value = goog.dom.forms.getValue( goog.dom.getElement("id_boleto_value") );
      var boleto_id = element.getAttribute('data-boleto-id');

      if (goog.isDefAndNotNull(boleto_id)) {
        if (goog.string.isEmpty(value) || !goog.string.isNumeric(value) || parseInt(value,10) <= 0 ) {
          alert('Por favor, preencha o valor do boleto a ser gerado');
          return;
        }

        bitEx.generateBoleto(boleto_id,value);
      }
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.BOLETO_OPTIONS_RESPONSE, function(e) {
    var msg = e.data;

    //boleto-options-group
    var boleto_options_group_elements = goog.dom.getElementsByClass('boleto-options-group');
    goog.array.forEach( boleto_options_group_elements, function( boleto_options_group_element ) {
      goog.dom.removeChildren(boleto_options_group_element);
      goog.array.forEach( msg['BoletoOptionGrp'], function(boleto_option) {
        var boleto_id = boleto_option['BoletoId'];
        var description = boleto_option['Description'];

        var boleto_btn_attributes = {
          "data-boleto-id": boleto_id,
          "class" : "btn btn-primary btn-boleto"
        };
        var buttonElement = goog.dom.createDom( goog.dom.TagName.BUTTON, boleto_btn_attributes, description  );

        goog.dom.appendChild(boleto_options_group_element, buttonElement);
      });
    });
  });

  bitEx.addEventListener( bitex.api.BitEx.EventType.GENERATE_BOLETO_RESPONSE, function(e) {
    var msg = e.data;

    var dlg = new bootstrap.Dialog();
    dlg.setTitle('Boleto');
    dlg.setContent('<a  target="_blank" href="/print_boleto?boleto_id=' +  msg['BoletoId']
                       + '" class="btn btn-primary">Print</a> or <a href="/print_boleto?download=1&boleto_id='
                       +  msg['BoletoId'] + '">Download</a>');

    dlg.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
    dlg.setVisible(true);
  });

  goog.events.listen( goog.dom.getElement('id_landing_signin'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_landing_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_landing_password") );
    login(username, password);
  });

  goog.events.listen( goog.dom.getElement('id_btn_login'), 'click', function(e){
    e.stopPropagation();
    e.preventDefault();
    var username = goog.dom.forms.getValue( goog.dom.getElement("id_username") );
    var password = goog.dom.forms.getValue( goog.dom.getElement("id_password") );
    login(username, password);
  });


};

goog.exportSymbol('bitex.app.satoshi_square', bitex.app.satoshi_square );
