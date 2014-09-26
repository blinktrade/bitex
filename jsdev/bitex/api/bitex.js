goog.provide('bitex.api.BitEx');
goog.provide('bitex.api.BitEx.EventType');
goog.provide('bitex.api.BitExEvent');

goog.require('goog.net.WebSocket');
goog.require('goog.i18n.NumberFormat');
goog.require('goog.json');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.api.BitEx = function(){
  goog.base(this);

  this.currency_info_       = null;
  this.all_markets_         = null;


  this.ws_ = new goog.net.WebSocket(true);
};
goog.inherits(bitex.api.BitEx, goog.events.EventTarget);


/**
 * @type {Object}
 * @private
 */
bitex.app.BitEx.prototype.currency_info_;

/**
 * @type {Object}
 * @private
 */
bitex.app.BitEx.prototype.all_markets_;

/**
 * @type {goog.net.WebSocket}
 * @private
 */
bitex.api.BitEx.prototype.ws_ = null;

/**
 * @type {string}
 * @private
 */
bitex.api.BitEx.prototype.url_ = null;


/**
 * @type {boolean}
 * @private
 */
bitex.api.BitEx.prototype.connected_ = false;

/**
 * @type {boolean}
 * @private
 */
bitex.api.BitEx.prototype.logged_ = false;

/**
 * Event handler.
 * @type {goog.events.EventHandler}
 * @private
 */
bitex.api.BitEx.prototype.handler_;


/**
 * Errors thrown by the api
 * @enum {string}
 */
bitex.api.BitEx.ErrorType = {
  CONNECTION_IS_CLOSED: 'connection_is_closed'
};

/**
 * The events fired by api
 * @enum {string} The event types for the web socket.
 */
bitex.api.BitEx.EventType = {
  CLOSED: 'closed',
  ERROR: 'error',
  OPENED: 'opened',

  RAW_MESSAGE: 'raw_message',
  SENT_RAW_MESSAGE: 'sent_raw_message',
  ERROR_MESSAGE: 'error_message',
  LOGIN_OK: 'login_ok',
  LOGIN_ERROR: 'login_error',
  CHANGE_PASSWORD_RESPONSE: 'change_password_error',

  NEWS: 'news',

  /* Passwords */
  TWO_FACTOR_SECRET: 'two_factor_secret',
  PASSWORD_CHANGED_OK: 'pwd_changed_ok',
  PASSWORD_CHANGED_ERROR: 'pwd_changed_error',

  /* Profile */
  UPDATE_PROFILE_RESPONSE: 'update_profile_response',
  PROFILE_REFRESH: 'profile_refresh',

  /* Deposits */
  DEPOSIT_METHODS_RESPONSE:'deposit_methods_response',
  DEPOSIT_RESPONSE : 'deposit_response',
  DEPOSIT_REFRESH: 'deposit_refresh',
  PROCESS_DEPOSIT_RESPONSE: 'process_deposit',
  DEPOSIT_LIST_RESPONSE: 'deposit_list',

  /* Withdraws */
  WITHDRAW_RESPONSE: 'withdraw_response',
  WITHDRAW_CONFIRMATION_RESPONSE: 'withdraw_confirmation_response',
  WITHDRAW_LIST_RESPONSE: 'withdraw_list_response',
  WITHDRAW_REFRESH: 'withdraw_refresh',
  PROCESS_WITHDRAW_RESPONSE: 'process_withdraw',

  /* Positions & balance */
  POSITION_RESPONSE: 'position_response',
  BALANCE_RESPONSE: 'balance_response',

  /* Trading */
  ORDER_LIST_RESPONSE: 'order_list_response',
  HEARTBEAT: 'heartbeat',
  EXECUTION_REPORT: 'execution_report',

  /* Trusted Address Management */
  SUGGEST_TRUSTED_ADDRESS_RESPONSE: 'suggest_trusted_address_response',
  SUGGEST_TRUSTED_ADDRESS_PUBLISH: 'suggest_trusted_address_pub',

  /* Securities */
  SECURITY_LIST: 'security_list',
  SECURITY_STATUS: 'security_status',

  /* Trade History */
  TRADE_HISTORY: 'trade_history',
  TRADE_HISTORY_RESPONSE: 'trade_history_response',

  TRADERS_RANK_RESPONSE: 'traders_rank',

  LEDGER_LIST_RESPONSE: 'ledger_list',

  /* Brokers */
  BROKER_LIST_RESPONSE: 'broker_list',
  CUSTOMER_LIST_RESPONSE: 'customer_list',
  CUSTOMER_DETAIL_RESPONSE: 'customer_detail',
  VERIFY_CUSTOMER_RESPONSE: 'verify_customer_response',
  VERIFY_CUSTOMER_UPDATE: 'verify_customer_update',

  /* Market Data */
  MARKET_DATA_FULL_REFRESH : 'md_full_refresh',
  MARKET_DATA_INCREMENTAL_REFRESH: 'md_incremental_refresh',
  MARKET_DATA_REQUEST_REJECT: 'md_request_reject',

  TRADING_SESSION_STATUS: 'md_status',
  TRADE: 'trade',
  TRADE_CLEAR: 'trade_clear',
  ORDER_BOOK_CLEAR: 'ob_clear',
  ORDER_BOOK_DELETE_ORDERS_THRU: 'ob_delete_orders_thru',
  ORDER_BOOK_DELETE_ORDER: 'ob_delete_order',
  ORDER_BOOK_NEW_ORDER: 'ob_new_order',
  ORDER_BOOK_UPDATE_ORDER: 'ob_update_order'
};

/**
 * Open a connection with BitEx server
 *
 * @param {string} url The URL to which to connect.
 * @param {string=} opt_protocol The subprotocol to use.  The connection will
 *     only be established if the server reports that it has selected this
 *     subprotocol. The subprotocol name must all be a non-empty ASCII string
 *     with no control characters and no spaces in them (i.e. only characters
 *     in the range U+0021 to U+007E).
 */
bitex.api.BitEx.prototype.open = function(url, opt_protocol) {
  this.url_ = url;

  var handler = this.getHandler();
  handler.listen( this.ws_, goog.net.WebSocket.EventType.CLOSED, this.onClose_ );
  handler.listen( this.ws_, goog.net.WebSocket.EventType.MESSAGE, this.onMessage_ );
  handler.listen( this.ws_, goog.net.WebSocket.EventType.ERROR, this.onError_ );
  handler.listen( this.ws_, goog.net.WebSocket.EventType.OPENED, this.onOpen_ );

  this.ws_.open(url, opt_protocol);
};

/**
 * @return {boolean}
 */
bitex.api.BitEx.prototype.isConnected = function(){
  return this.connected_;
};

/**
 * @return {boolean}
 */
bitex.api.BitEx.prototype.isLogged = function(){
  return this.logged_;
};

/**
 * @return {goog.events.EventHandler}
 */
bitex.api.BitEx.prototype.getHandler = function() {
  return this.handler_ ||
      (this.handler_ = new goog.events.EventHandler(this));

};


/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.api.BitEx.prototype.getCurrencyDescription  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.description;
};

/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.api.BitEx.prototype.getCurrencyHumanFormat  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.human_format;
};


/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.api.BitEx.prototype.getCurrencyFormat  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.format;
};

/**
 * @param {string} currency_code
 * @return {string}
 */
bitex.api.BitEx.prototype.getCurrencySign  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.sign;
};


/**
 * @param {string} currency_code
 * @return {boolean}
 */
bitex.api.BitEx.prototype.isCryptoCurrency  =   function(currency_code) {
  /**
   * @type {bitex.model.OrderBookCurrencyModel}
   */
  var currency_def = this.currency_info_[currency_code];
  return currency_def.is_crypto;
};

/**
 * @param {number} amount
 * @param {string} currency_code
 * @param {boolean=} opt_human
 */
bitex.api.BitEx.prototype.formatCurrency  =   function(amount, currency_code, opt_human) {
  if (!goog.isDefAndNotNull(this.currency_info_)) {
    return amount;
  }

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
 * @param {string} symbol
 * @return {string}
 */
bitex.api.BitEx.prototype.getPriceCurrencyFromSymbol = function(symbol) {
  // BTCUSD will return USD
  return symbol.substr(3);
};
/**
 * @param {string} symbol
 * @return {string}
 */
bitex.api.BitEx.prototype.getQtyCurrencyFromSymbol = function(symbol) {
  // BTCUSD will return BTC
  return symbol.substr(0,3);
};

/**
 * @param {Object} msg
 * @private
 */
bitex.api.BitEx.prototype.onSecurityList_ =   function(msg) {
  this.currency_info_ = {};
  this.all_markets_ = {};

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
  }, this);

  var symbols = [];
  goog.array.forEach(msg['Instruments'], function(instrument) {
    var symbol = instrument['Symbol'];

    this.all_markets_[symbol]  = {
      symbol: symbol,
      description: instrument['Description']
    };

    symbols.push( symbol );
  }, this );
};

/**
 * @private
 */
bitex.api.BitEx.prototype.onOpen_ = function() {
  this.dispatchEvent(bitex.api.BitEx.EventType.OPENED);
  this.connected_ = true;
  this.logged_ = false;
};


/**
 * @private
 */
bitex.api.BitEx.prototype.onClose_ = function(e) {
  this.dispatchEvent(bitex.api.BitEx.EventType.CLOSED);
  this.connected_ = false;
  this.logged_ = false;
};

/**
 * @param {goog.net.WebSocket.ErrorEvent} e
 * @private
 */
bitex.api.BitEx.prototype.onError_ = function(e) {
  this.dispatchEvent(bitex.api.BitEx.EventType.ERROR);
  this.connected_ = false;
  this.logged_ = false;
};

/**
 * @param {goog.net.WebSocket.MessageEvent} e
 * @private
 */
bitex.api.BitEx.prototype.onMessage_ = function(e) {
  var msg = JSON.parse(e.message);

  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.RAW_MESSAGE, e.message ) );

  switch( msg['MsgType'] ) {
    case 'ERROR':
      if (goog.isDefAndNotNull(msg['ReqID'])) {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ERROR_MESSAGE + '.' + msg['ReqID'] , msg ) );
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ERROR_MESSAGE, msg ) );
      break;

    case '0':  //Heartbeat
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.HEARTBEAT, msg ) );
      break;

    case 'B':  //News
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.NEWS, msg ) );
      break;

    case 'BF': // Login response:

      if (msg['UserReqTyp'] == 3 ) {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.CHANGE_PASSWORD_RESPONSE + '.' + msg['UserReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.CHANGE_PASSWORD_RESPONSE, msg ) );
        break;
      }

      if (msg['UserStatus'] == 1 ) {
        this.logged_ = true;
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_OK + '.' + msg['UserReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_OK, msg ) );

      } else {
        this.logged_ = false;
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_ERROR + '.' + msg['UserReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_ERROR, msg ) );
      }
      break;

    case 'y': // Security List
      this.onSecurityList_(msg);
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SECURITY_LIST + '.' + msg['SecurityReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SECURITY_LIST, msg));
      break;

    case 'f': // Security status
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SECURITY_STATUS + '.' + msg['SecurityStatusReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SECURITY_STATUS, msg));
      break;

    case 'U13': // Password change response
      if (msg['UserStatus'] == 1 ) {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK + '.' + msg['ResetPasswordReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK, msg ) );
      } else {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR + '.' + msg['ResetPasswordReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR, msg ) );
      }
      break;

    case 'U19': // Deposit Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_RESPONSE + '.' + msg['DepositReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_RESPONSE, msg ) );
      break;

    case 'U23': // Deposit Refresh

      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + msg['UserID'], msg ) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + msg['BrokerID'], msg ) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_REFRESH + '.' + msg['DepositReqID'], msg ) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_REFRESH, msg ) );
      break;

    case 'U25': // WithDraw Confirmation response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_CONFIRMATION_RESPONSE + '.' + msg['WithdrawReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_CONFIRMATION_RESPONSE, msg ) );
      break;

    case 'U7': // Withdraw Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_RESPONSE + '.' + msg['WithdrawReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_RESPONSE, msg ) );
      break;

    case 'U9': // Withdraw Refresh
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + msg['UserID'], msg ) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_REFRESH + '.' + msg['BrokerID'], msg ) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_REFRESH, msg ) );
      break;

    case 'U3': // Balance Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BALANCE_RESPONSE + '.' + msg['BalanceReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BALANCE_RESPONSE, msg ) );
      break;

    case 'U5': // Order List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE + '.' + msg['OrdersReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE, msg ) );
      break;

    case 'U17': // Enable Two Factor Secret Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TWO_FACTOR_SECRET + '.' + msg['EnableTwoFactorReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, msg ) );
      break;

    case 'U21': // Request Deposit Options Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_METHODS_RESPONSE + '.' + msg['DepositMethodReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_METHODS_RESPONSE, msg ) );
      break;

    case 'U27': // Withdraw List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE + '.' + msg['WithdrawListReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE, msg ) );
      break;

    case 'U29': // Broker List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE + '.' + msg['BrokerListReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, msg ) );
      break;

    case 'U31': // Deposit List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE + '.' + msg['DepositListReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.DEPOSIT_LIST_RESPONSE, msg ) );
      break;

    case 'U33': // Trade History Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_HISTORY_RESPONSE + '.' + msg['TradeHistoryReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_HISTORY_RESPONSE, msg ) );
      break;

    case 'U35': // Ledger List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE + '.' + msg['LedgerListReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LEDGER_LIST_RESPONSE, msg ) );
      break;

    case 'U37': // Traders rank Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADERS_RANK_RESPONSE + '.' + msg['TradersRankReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADERS_RANK_RESPONSE, msg ) );
      break;

    case 'U39': // Update Profile Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.UPDATE_PROFILE_RESPONSE + '.' + msg['UpdateReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.UPDATE_PROFILE_RESPONSE, msg ) );
      break;

    case 'U40': // Profile Refresh
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PROFILE_REFRESH, msg ) );
      break;

    case 'U43': // Position Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.POSITION_RESPONSE + '.' + msg['PositionReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.POSITION_RESPONSE, msg ) );
      break;

    case 'U45': // Suggest Trusted Address Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SUGGEST_TRUSTED_ADDRESS_RESPONSE + '.' + msg['SuggestTrustedAddressReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SUGGEST_TRUSTED_ADDRESS_RESPONSE, msg ) );
      break;

    case 'U46': // Suggest Trusted Address Publish
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SUGGEST_TRUSTED_ADDRESS_PUBLISH + '.' + msg['SuggestTrustedAddressReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SUGGEST_TRUSTED_ADDRESS_PUBLISH, msg ) );
      break;

    case 'B1': // Process Deposit Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PROCESS_DEPOSIT_RESPONSE + '.' + msg['ProcessDepositReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PROCESS_DEPOSIT_RESPONSE, msg ) );
      break;

    case 'B3': // Customer List Response
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_LIST_RESPONSE + '.' + msg['CustomerListReqID'] , msg) );
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_LIST_RESPONSE, msg) );
      break;

    case 'B5': // Customer Detail Response
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_DETAIL_RESPONSE + '.' + msg['CustomerReqID'] , msg) );
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_DETAIL_RESPONSE, msg) );
      break;

    case 'B7': // Process Withdraw Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE + '.' + msg['ProcessWithdrawReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PROCESS_WITHDRAW_RESPONSE, msg ) );
      break;

    case 'B9': // Verification Customer Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.VERIFY_CUSTOMER_RESPONSE + '.' + msg['VerifyCustomerReqID'], msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.VERIFY_CUSTOMER_RESPONSE, msg ) );
      break;

    case 'B11': // Verification Customer Update
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.VERIFY_CUSTOMER_UPDATE, msg ) );
      break;


    case 'W':
      if ( msg['MarketDepth'] != 1 ) { // Has Market Depth
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR, msg ) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR + '.' + msg['MDReqID'], msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_CLEAR, msg) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_CLEAR + '.' + msg['MDReqID'], msg) );

        for ( var x in msg['MDFullGrp']) {
          var entry = msg['MDFullGrp'][x];
          entry['MDReqID'] = msg['MDReqID'];

          switch (entry['MDEntryType']) {
            case '0': // Bid
            case '1': // Offer
              entry['Symbol'] = msg['Symbol'];
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER, entry) );
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER + '.' + msg['MDReqID'], entry) );
              break;
            case '2': // Trade
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE, entry) );
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE + '.' + msg['MDReqID'], entry) );
              break;
            case '4': // Trading Session Status
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS, entry) );
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS + '.' + msg['MDReqID'], entry) );
              break;
          }
        }
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_FULL_REFRESH, msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_FULL_REFRESH + '.' + msg['MDReqID'], msg) );
      break;
    case 'X':
      if (msg['MDBkTyp'] == '3') {  // Order Depth
        for ( var x in msg['MDIncGrp']) {
          var entry = msg['MDIncGrp'][x];
          entry['MDReqID'] = msg['MDReqID'];

          switch (entry['MDEntryType']) {
            case '0': // Bid
            case '1': // Offer
              switch( entry['MDUpdateAction'] ) {
                case '0':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER, entry) );
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER + '.' + msg['MDReqID'], entry) );
                  break;
                case '1':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER, entry) );
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER + '.' + msg['MDReqID'], entry) );
                  break;
                case '2':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER, entry) );
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER + '.' + msg['MDReqID'], entry) );
                  break;
                case '3':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU, entry) );
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU + '.' + msg['MDReqID'], entry) );
                  break;
                case '4': // Trading Session Status
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS, entry) );
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS + '.' + msg['MDReqID'], entry) );
                  break;
              }
              break;
            case '2': // Trade
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE, entry) );
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE + '.' + msg['MDReqID'], entry) );
              break;
            case '4': // Trading Session Status
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS, entry) );
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADING_SESSION_STATUS + '.' + msg['MDReqID'], entry) );
              break;
          }
        }
      } else {
        // TODO:  Top of the book handling.
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_INCREMENTAL_REFRESH, msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_INCREMENTAL_REFRESH + '.' + msg['MDReqID'], msg) );
      break;
    case 'Y':
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_REQUEST_REJECT, msg) );
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_REQUEST_REJECT + '.' + msg['MDReqID'], msg) );
      break;

    case '8':  //Execution Report
      if (!goog.isDefAndNotNull(msg['Volume'])) {
        if (goog.isDefAndNotNull(msg['AvgPx']) && msg['AvgPx'] > 0)   {
          msg['Volume'] = msg['CumQty'] * msg['AvgPx'] / 1e8;
        } else {
          msg['Volume'] = 0;
        }
      }
      if (goog.isDefAndNotNull(msg['ClOrdID'])) {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.EXECUTION_REPORT + '.' + msg['ClOrdID'], msg) );
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.EXECUTION_REPORT, msg) );
      break;
  }
};


bitex.api.BitEx.prototype.close = function(){
  this.connected_ = false;
  this.logged_ = false;

  this.ws_.close();
  this.ws_.dispose();
  this.ws_ = null;
};

/**
 * @param {string} username
 * @param {string} password
 * @param {string=} opt_second_factor
 * @param {number=} opt_request_id
 */
bitex.api.BitEx.prototype.login = function(username, password, opt_second_factor,opt_request_id ){
  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'BE',
    'UserReqID': reqId,
    'Username': username,
    'Password': password,
    'UserReqTyp': '1'
  };
  if (goog.isDefAndNotNull(opt_second_factor)) {
    msg['SecondFactor'] = opt_second_factor;
  }
  this.sendMessage(msg);
};





/**
 * @param {boolean} enable
 * @param {string=} opt_secret
 * @param {string=} opt_code
 * @param {number=} opt_clientID
 * @param {number=} opt_request_id
 */
bitex.api.BitEx.prototype.enableTwoFactor = function(enable, opt_secret, opt_code, opt_clientID, opt_request_id){
  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U16',
    'EnableTwoFactorReqID': reqId,
    'Enable': enable
  };
  if (goog.isDefAndNotNull(opt_secret) && !goog.string.isEmpty(opt_secret) ) {
    msg['Secret'] = opt_secret;
  }

  if (goog.isDefAndNotNull(opt_code) && !goog.string.isEmpty(opt_code) ) {
    msg['Code'] = opt_code;
  }

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID))  {
    msg['ClientID'] = opt_clientID;
  }

  this.sendMessage(msg);
};


/**
 * @param {string} email
 * @param {number} opt_request_id
 */
bitex.api.BitEx.prototype.forgotPassword = function(email, opt_request_id){
  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U10',
    'ForgotPasswordReqID': reqId,
    'Email': email
  };
  this.sendMessage(msg);
};

/**
 * @param {number=} opt_clientID
 * @param {number} opt_request_id
 */
bitex.api.BitEx.prototype.requestBalances = function(opt_clientID, opt_request_id) {
  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U2',
    'BalanceReqID': reqId
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID))  {
    msg['ClientID'] = opt_clientID;
  }

  this.sendMessage(msg);
};

/**
 * @param {number=} opt_clientID
 * @param {number} opt_request_id
 */
bitex.api.BitEx.prototype.requestPositions = function(opt_clientID, opt_request_id) {
  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U42',
    'PositionReqID': reqId
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID))  {
    msg['ClientID'] = opt_clientID;
  }

  this.sendMessage(msg);
};


/**
 * @param {number} opt_request_id
 * @param {number} amount
 * @param {string} method
 * @param {string} currency
 * @param {Object} data
 * @param {string=} opt_client_order_id
 *
 */
bitex.api.BitEx.prototype.requestWithdraw = function( opt_request_id, amount, method, currency, data, opt_client_order_id) {

  var reqId = opt_request_id || parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U6',
    'WithdrawReqID': reqId,
    'Currency': currency,
    'Amount': amount,
    'Method': method,
    'Data': goog.json.serialize(data)
  };

  if (goog.isDefAndNotNull(opt_client_order_id)) {
    msg['ClOrdID'] = '' + opt_client_order_id;
  }

  this.sendMessage(msg);

  return reqId;
};


/**
 * @param {string} confirmation_token
 */
bitex.api.BitEx.prototype.confirmWithdraw = function( confirmation_token  ) {
  var reqId = parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U24',
    'WithdrawReqID': reqId,
    'ConfirmationToken': confirmation_token
  };
  this.sendMessage(msg);
};

/**
 * Request a withdraw list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {Array.<string>=} opt_status. Defaults to ['1', '2'] ( all operations )
 * @param {number=} opt_clientID
 * @param {Array.<string>=} opt_filter
 */
bitex.api.BitEx.prototype.requestWithdrawList = function(opt_requestId, opt_page, opt_limit, opt_status, opt_clientID, opt_filter){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || ['1', '2'];

  var msg = {
    'MsgType': 'U26',
    'WithdrawListReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID)){
    msg['ClientID'] = opt_clientID;
  }

  if (goog.isDefAndNotNull(opt_filter) && opt_filter.length > 0 ) {
    msg['Filter'] = opt_filter;
  }

  this.sendMessage(msg);

  return requestId;
};

/**
 *
 * @param {Object} fields
 * @param {number=} opt_userId
 * @param {number=} opt_requestId
 * @return {number} requestId
 */
bitex.api.BitEx.prototype.updateUserProfile = function(fields, opt_userId, opt_requestId){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var msg = {
    'MsgType': 'U38',
    'UpdateReqID': requestId,
    'Fields': fields
  };
  if (goog.isDefAndNotNull(opt_userId)) {
    msg['UserID'] = opt_userId;
  }

  this.sendMessage(msg);

  return requestId;
};

/**
 * Request deposit list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {Array.<string>=} opt_status. Defaults to ['1', '2'] ( all operations )
 * @param {number=} opt_clientID
 * @param {Array.<string>=} opt_filter
 */
bitex.api.BitEx.prototype.requestDepositList = function(opt_requestId, opt_page, opt_limit, opt_status, opt_clientID, opt_filter){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || ['1', '2'];

  var msg = {
    'MsgType': 'U30',
    'DepositListReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID)){
    msg['ClientID'] = opt_clientID;
  }

  if (goog.isDefAndNotNull(opt_filter) && opt_filter.length > 0 ) {
    msg['Filter'] = opt_filter;
  }


  this.sendMessage(msg);

  return requestId;
};

/**
 *
 * @param {string} address
 * @param {string} currency
 * @param {string} label
 * @param {number=} opt_requestId
 */
bitex.api.BitEx.prototype.confirmTrustedAddressRequest = function(address, currency, label ,opt_requestId) {
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'U44',
    'ConfirmTrustedAddressReqID': requestId,
    'Address': address,
    'Currency': currency,
    'Label': label
  };
  this.sendMessage(msg);
  return requestId;
};

/**
 * Request trade history
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {number=} opt_clientID
 * @param {Array.<string>=} opt_filter
 */
bitex.api.BitEx.prototype.requestTradeHistory = function(opt_requestId, opt_page, opt_limit, opt_clientID, opt_filter){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;

  var msg = {
    'MsgType': 'U32',
    'TradeHistoryReqID': requestId,
    'Page': page,
    'PageSize': limit
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID)){
    msg['ClientID'] = opt_clientID;
  }

  if (goog.isDefAndNotNull(opt_filter) && opt_filter.length > 0 ) {
    msg['Filter'] = opt_filter;
  }


  this.sendMessage(msg);

  return requestId;
};

/**
 * Request Traders ranking
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {number=} opt_clientID
 * @param {Array.<string>=} opt_filter
 */
bitex.api.BitEx.prototype.requestTradersRank = function(opt_requestId, opt_page, opt_limit, opt_clientID, opt_filter){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;

  var msg = {
    'MsgType': 'U36',
    'TradersRankReqID': requestId,
    'Page': page,
    'PageSize': limit
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID)){
    msg['ClientID'] = opt_clientID;
  }

  if (goog.isDefAndNotNull(opt_filter) && opt_filter.length > 0 ) {
    msg['Filter'] = opt_filter;
  }

  this.sendMessage(msg);

  return requestId;
};


/**
 * Request trade history
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {number=} opt_brokerID
 * @param {number=} opt_clientID
 * @param {string=} opt_currency
 * @param {Array.<string>=} opt_filter
 */
bitex.api.BitEx.prototype.requestLedgerList = function(opt_requestId, opt_page, opt_limit, opt_brokerID, opt_clientID,opt_currency, opt_filter){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var operation_list = ['C','D'];

  var msg = {
    'MsgType': 'U34',
    'LedgerListReqID': requestId,
    'OperationList': operation_list,
    'Page': page,
    'PageSize': limit
  };

  if (goog.isDefAndNotNull(opt_brokerID) && goog.isNumber(opt_brokerID)){
    msg['BrokerID'] = opt_brokerID;
  }

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID)){
    msg['ClientID'] = opt_clientID;
  }

  if (goog.isDefAndNotNull(opt_currency) && !goog.string.isEmpty(opt_currency)){
    msg['Currency'] = opt_currency;
  }

  if (goog.isDefAndNotNull(opt_filter) && opt_filter.length > 0 ) {
    msg['Filter'] = opt_filter;
  }


  this.sendMessage(msg);

  return requestId;
};


/**
 * Request the Broker's list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {string=} opt_country.
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {Array.<string>=} opt_status. Defaults to ['1'] ( active brokers )
 */
bitex.api.BitEx.prototype.requestBrokerList = function(opt_requestId, opt_country, opt_page, opt_limit, opt_status){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || ['1'];

  var msg = {
    'MsgType': 'U28',
    'BrokerListReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };
  if (goog.isDefAndNotNull(opt_country)) {
    msg['Country'] = opt_country;
  }

  this.sendMessage(msg);

  return requestId;
};

/**
 * Request the Broker Customer's list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {string=} opt_filter_country.
 * @param {string=} opt_filter_state.
 * @param {string=} opt_filter_username_or_email
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {string=} opt_sort_column
 * @param {string=} opt_sort_direction. Defaults to ASC
 * @param {Array.<string>=} opt_status. Defaults to ['1'] ( active brokers )
 */
bitex.api.BitEx.prototype.requestCustomerList = function(opt_requestId, opt_filter_country, opt_filter_state, opt_filter_username_or_email, opt_page, opt_limit, opt_status, opt_sort_column, opt_sort_direction){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || [0,1,2,3,4,5];

  var msg = {
    'MsgType': 'B2',
    'CustomerListReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };
  if (goog.isDefAndNotNull(opt_filter_country)) {
    msg['Country'] = opt_filter_country;
  }
  if (goog.isDefAndNotNull(opt_filter_state)) {
    msg['State'] = opt_filter_state;
  }
  if (goog.isDefAndNotNull(opt_filter_username_or_email)) {
    msg['ClientID'] = opt_filter_username_or_email;
  }
  if (goog.isDefAndNotNull(opt_sort_column)) {
    msg['Sort'] = opt_sort_column;
  }
  if (goog.isDefAndNotNull(opt_sort_direction)) {
    msg['SortOrder'] = opt_sort_direction;
  }

  this.sendMessage(msg);
  return requestId;
};

/**
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number} clientId
 */
bitex.api.BitEx.prototype.requestCustomerDetails = function(opt_requestId, clientId){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'B4',
    'CustomerReqID': requestId,
    'ClientID': clientId
  };
  this.sendMessage(msg);
  return requestId;
};


/**
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number} clientId
 * @param {number} verify
 * @param {Object} opt_verificationData
 */
bitex.api.BitEx.prototype.verifyCustomer = function(opt_requestId, clientId, verify, opt_verificationData){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'B8',
    'VerifyCustomerReqID': requestId,
    'ClientID': clientId,
    'Verify':  verify
  };
  if (goog.isDefAndNotNull(opt_verificationData)) {
    msg['VerificationData'] = opt_verificationData;
  }
  this.sendMessage(msg);
  return requestId;
};

/**
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {string} action
 * @param {number} withdrawId
 * @param {number=} opt_reasonId
 * @param {string=} opt_reason
 * @param {Object=} opt_data
 * @param {number=} opt_percent_fee
 * @param {number=} opt_fixed_fee
 */
bitex.api.BitEx.prototype.processWithdraw = function(opt_requestId, action, withdrawId, opt_reasonId, opt_reason, opt_data,opt_percent_fee,opt_fixed_fee){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'B6',
    'ProcessWithdrawReqID': requestId,
    'WithdrawID': withdrawId,
    'Action': action
  };

  if (goog.isDefAndNotNull(opt_reasonId)){
    msg['ReasonID'] = opt_reasonId;
  }

  if (goog.isDefAndNotNull(opt_reason)){
    msg['Reason'] = opt_reason;
  }

  if (goog.isDefAndNotNull(opt_data)){
    msg['Data'] = opt_data;
  }

  if (goog.isDefAndNotNull(opt_percent_fee)){
    msg['PercentFee'] = opt_percent_fee;
  }
  if (goog.isDefAndNotNull(opt_fixed_fee)){
    msg['FixedFee'] = opt_fixed_fee;
  }

  this.sendMessage(msg);
  return requestId;
};


/**
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {string} action
 * @param {string=} opt_secret
 * @param {number=} opt_depositId
 * @param {number=} opt_reasonId
 * @param {string=} opt_reason
 * @param {number=} opt_amount
 * @param {number=} opt_percent_fee
 * @param {number=} opt_fixed_fee
 */
bitex.api.BitEx.prototype.processDeposit = function(opt_requestId, action, opt_secret, opt_depositId, opt_reasonId, opt_reason, opt_amount, opt_percent_fee, opt_fixed_fee ){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'B0',
    'ProcessDepositReqID': requestId,
    'Action': action
  };
  if (goog.isDefAndNotNull(opt_secret)){
    msg['Secret'] = opt_secret;
  }
  if (goog.isDefAndNotNull(opt_depositId)){
    msg['DepositID'] = opt_depositId;
  }
  if (goog.isDefAndNotNull(opt_reasonId)){
    msg['ReasonID'] = opt_reasonId;
  }
  if (goog.isDefAndNotNull(opt_reason)){
    msg['Reason'] = opt_reason;
  }
  if (goog.isDefAndNotNull(opt_amount)){
    msg['Amount'] = opt_amount;
  }
  if (goog.isDefAndNotNull(opt_percent_fee)){
    msg['PercentFee'] = opt_percent_fee;
  }
  if (goog.isDefAndNotNull(opt_fixed_fee)){
    msg['FixedFee'] = opt_fixed_fee;
  }
  this.sendMessage(msg);
  return requestId;
};




/**
 * @param {string} token
 * @param {string} new_password
 * @param {number=} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.resetPassword = function(token, new_password, opt_requestId ){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var msg = {
    'MsgType': 'U12',
    'ResetPasswordReqID': requestId,
    'Token': token,
    'NewPassword': new_password
  };
  this.sendMessage(msg);
};


/**
 * @param {string} username
 * @param {string} password
 * @param {string} new_password
 * @param {number=} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.changePassword = function(username, password, new_password, opt_second_factor, opt_requestId ){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'BE',
    'UserReqID': requestId,
    'UserReqTyp': '3',
    'Username': username,
    'Password': password,
    'NewPassword': new_password
  };

  if (goog.isDefAndNotNull(opt_second_factor)) {
    msg['SecondFactor'] = opt_second_factor;
  }

  this.sendMessage(msg);
};

/**
 * @param {number} market_depth
 * @param {Array.<string>} symbols
 * @param {Array.<string>} entries
 * @param {string} opt_requestId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.subscribeMarketData = function(market_depth, symbols, entries, opt_requestId ){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'V',
    'MDReqID': requestId,
    'SubscriptionRequestType': '1',
    'MarketDepth': market_depth,
    'MDUpdateType': '1',   // Incremental refresh
    'MDEntryTypes': entries,
    'Instruments': symbols
  };
  this.sendMessage(msg);

  return requestId;
};

/**
 * @param {number} market_data_id
 */
bitex.api.BitEx.prototype.unSubscribeMarketData = function(market_data_id){
  var msg = {
    'MsgType': 'V',
    'MDReqID': market_data_id,
    'MarketDepth' : 0,
    'SubscriptionRequestType': '2'
  };
  this.sendMessage(msg);
};

/**
 * @param {number} market_depth
 * @param {Array.<string>} symbols
 * @param {Array.<string>} entries
 * @param {string} opt_requestId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.subscribeSecurityStatus = function(symbols, opt_requestId ){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'e',
    'SecurityStatusReqID': requestId,
    'SubscriptionRequestType': '1',
    'Instruments': symbols
  };
  this.sendMessage(msg);

  return requestId;
};

/**
 * @param {number} market_data_id
 */
bitex.api.BitEx.prototype.unSubscribeSecurityStatus = function(market_data_id){
  var msg = {
    'MsgType': 'e',
    'SecurityStatusReqID': market_data_id,
    'SubscriptionRequestType': '2'
  };
  this.sendMessage(msg);
};


/**
 * @param {string} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.requestSecurityList = function(opt_requestId){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'x',
    'SecurityReqID': requestId,
    'SecurityListRequestType': 0, // Symbol
    'SecurityRequestResult': 0
  };
  this.sendMessage(msg);
};


/**
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {string} state
 * @param {string} country_code
 * @param {number} broker
 * @param {number=} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.signUp = function(username, password, email, state, country_code, broker, opt_requestId) {
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var msg = {
    'MsgType': 'U0',
    'UserReqID': requestId,
    'Username': username,
    'Password': password,
    'Email': email,
    'State': state,
    'CountryCode': country_code,
    'BrokerID': broker
  };
  this.sendMessage(msg);
};

/**
 * Request a list of closed orders
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {Array.<string>=} opt_status. Defaults to ['0','1'] ( open orders )
 */
bitex.api.BitEx.prototype.requestOrderList = function(opt_requestId, opt_page, opt_limit, opt_status){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || ['0', '1'];

  var msg = {
    'MsgType': 'U4',
    'OrdersReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };
  this.sendMessage(msg);

  return requestId;
};

/**
 * Generate a deposit for the client
 * @param {string=} opt_depositOptionId
 * @param {number=} opt_value
 * @param {number=} opt_depositID
 * @param {string=} opt_currency
 * @param {string=} opt_client_order_id
 * @param {Array.<Object> =} opt_instructions
 */
bitex.api.BitEx.prototype.requestDeposit = function( opt_requestId, opt_depositOptionId, opt_value, opt_depositID, opt_currency, opt_client_order_id, opt_instructions ) {
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'U18',
    'DepositReqID': requestId
  };
  if (goog.isDefAndNotNull(opt_depositOptionId)) {
    msg['DepositMethodID'] = opt_depositOptionId;
  }
  if (goog.isDefAndNotNull(opt_value)) {
    msg['Value'] = parseInt(opt_value, 10) ;
  }
  if (goog.isDefAndNotNull(opt_depositID)) {
    msg['DepositID'] = opt_depositID;
  }
  if (goog.isDefAndNotNull(opt_currency)) {
    msg['Currency'] = opt_currency;
  }
  if (goog.isDefAndNotNull(opt_client_order_id)) {
    msg['ClOrdID'] = '' + opt_client_order_id;
  }
  if (goog.isDefAndNotNull(opt_instructions)) {
    msg['Instructions'] = opt_instructions;
  }

  this.sendMessage(msg);
};

/**
 * Request Deposit Options
 * @param {number=} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.requestDepositMethods = function( opt_requestId ) {
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var msg = {
    'MsgType': 'U20',
    'DepositMethodReqID': requestId
  };
  this.sendMessage(msg);
};


/**
 *
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string} side
 * @param {number} broker_id
 * @param {string|number=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @param {string=} opt_orderType Defaults to Limited Order
 * @return {number}
 *
 */
bitex.api.BitEx.prototype.sendOrder_ = function( symbol, qty, price, side, broker_id, opt_client_id, opt_clientOrderId, opt_orderType ){
  var clientOrderId = opt_clientOrderId || parseInt( 1e7 * Math.random() , 10 );
  var orderType = '' + opt_orderType || '2';

  var msg = {
    'MsgType': 'D',
    'ClOrdID': '' + clientOrderId,
    'Symbol': symbol,
    'Side': side,
    'OrdType': orderType,
    'Price': price,
    'OrderQty': qty,
    'BrokerID': broker_id
  };

  if (goog.isDefAndNotNull(opt_client_id) && !goog.string.isEmpty(opt_client_id)) {
    msg['ClientID'] = opt_client_id;
  }

  this.sendMessage(msg);

  return clientOrderId;
};

/**
 * @param {string} opt_clientOrderId
 * @param {number} opt_OrderId
 */
bitex.api.BitEx.prototype.cancelOrder = function( opt_clientOrderId, opt_OrderId  ) {
  var msg = {
    'MsgType': 'F'
  };

  if (opt_OrderId) {
    msg['OrderID'] = opt_OrderId;
  } else if (opt_clientOrderId) {
    msg['OrigClOrdID'] = opt_clientOrderId;
  }

  this.sendMessage( msg );
};

/**
 * @param {string} msg
 */
bitex.api.BitEx.prototype.sendRawMessage  = function(msg) {
  /**
   * @desc error message when sending raw message
   */
  var MSG_SEND_MSG_ERROR_TITLE = goog.getMsg('Error');


  /**
   * @desc not connected error when sending a message
   */
  var MSG_SEND_MSG_ERROR_NOT_CONNECTED_CONTENT = goog.getMsg('Not connected to the server');

  if (!this.ws_.isOpen()) {
    var error_msg = {
      'MsgType': 'ERROR',
      'Description': MSG_SEND_MSG_ERROR_TITLE,
      'Detail': MSG_SEND_MSG_ERROR_NOT_CONNECTED_CONTENT
    };
    this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ERROR_MESSAGE, error_msg ) );
    return;
  }

  /**
   * @desc exception message when sending raw message
   */
  var MSG_SEND_MSG_EXCEPTION_TITLE = goog.getMsg('Exception');

  try {
    this.ws_.send(msg);

    this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SENT_RAW_MESSAGE, msg ) );
  } catch( s ) {
    var excep_msg = {
      'MsgType': 'ERROR',
      'Description': MSG_SEND_MSG_EXCEPTION_TITLE,
      'Detail': s.toLocaleString()
    };
    this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ERROR_MESSAGE, excep_msg ) );
  }
};

/**
 * @param {Object} msg
 */
bitex.api.BitEx.prototype.sendMessage  = function(msg) {
  this.sendRawMessage(JSON.stringify( msg ));
};


/**
 * Send a buy order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {number} broker_id
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendBuyLimitedOrder = function( symbol, qty, price, broker_id,opt_client_id, opt_clientOrderId ){
  return this.sendOrder_(symbol, qty, price, '1', broker_id,opt_client_id, opt_clientOrderId, '2');
};

/**
 * Send a sell order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {number} broker_id
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendSellLimitedOrder = function( symbol, qty, price, broker_id,opt_client_id, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, '2', broker_id,opt_client_id, opt_clientOrderId, '2');
};

/**
 * Send a sell order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string} side
 * @param {number} broker_id
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendLimitedOrder = function( symbol, qty, price, side, broker_id, opt_client_id, opt_clientOrderId){
  return this.sendOrder_(symbol, qty, price, side,broker_id, opt_client_id, opt_clientOrderId, '2');
};


/**
 * Send a test request message, to test the connection
 * @param {number|string=} opt_requestId
 */
bitex.api.BitEx.prototype.testRequest = function(opt_requestId){
  var d = new Date();
  var requestId = opt_requestId || d.getTime();

  var msg = {
    'MsgType': '1',
    'TestReqID': requestId,
    'SendTime': d.getTime()
  };
  this.sendMessage( msg );
};

/**
 *
 * @param {string} type
 * @param {Object=} opt_data
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.api.BitExEvent = function(type, opt_data) {
  goog.events.Event.call(this, type);

  /**
   * The new message from the web socket.
   * @type {Object|null|undefined}
   */
  this.data = opt_data;
};
goog.inherits(bitex.api.BitExEvent, goog.events.Event);


goog.exportSymbol('BitEx', bitex.api.BitEx);
goog.exportProperty(BitEx.prototype, 'open', bitex.api.BitEx.prototype.open);
goog.exportProperty(BitEx.prototype, 'close', bitex.api.BitEx.prototype.close);
goog.exportProperty(BitEx.prototype, 'login', bitex.api.BitEx.prototype.login);
goog.exportProperty(BitEx.prototype, 'isLogged', bitex.api.BitEx.prototype.isLogged);
goog.exportProperty(BitEx.prototype, 'isConnected', bitex.api.BitEx.prototype.isConnected);

goog.exportProperty(BitEx.prototype, 'changePassword', bitex.api.BitEx.prototype.changePassword);
goog.exportProperty(BitEx.prototype, 'enableTwoFactor', bitex.api.BitEx.prototype.enableTwoFactor);
goog.exportProperty(BitEx.prototype, 'resetPassword', bitex.api.BitEx.prototype.resetPassword);

goog.exportProperty(BitEx.prototype, 'subscribeMarketData', bitex.api.BitEx.prototype.subscribeMarketData);
goog.exportProperty(BitEx.prototype, 'unSubscribeMarketData', bitex.api.BitEx.prototype.unSubscribeMarketData);
goog.exportProperty(BitEx.prototype, 'signUp', bitex.api.BitEx.prototype.signUp);
goog.exportProperty(BitEx.prototype, 'forgotPassword', bitex.api.BitEx.prototype.forgotPassword);
goog.exportProperty(BitEx.prototype, 'requestBalances', bitex.api.BitEx.prototype.requestBalances);

goog.exportProperty(BitEx.prototype, 'requestSecurityList', bitex.api.BitEx.prototype.requestSecurityList);
goog.exportProperty(BitEx.prototype, 'requestDepositMethods', bitex.api.BitEx.prototype.requestDepositMethods);
goog.exportProperty(BitEx.prototype, 'requestLedgerList', bitex.api.BitEx.prototype.requestLedgerList);

goog.exportProperty(BitEx.prototype, 'requestDeposit', bitex.api.BitEx.prototype.requestDeposit);
goog.exportProperty(BitEx.prototype, 'processDeposit', bitex.api.BitEx.prototype.processDeposit);
goog.exportProperty(BitEx.prototype, 'requestDepositList', bitex.api.BitEx.prototype.requestDepositList);


goog.exportProperty(BitEx.prototype, 'requestWithdraw', bitex.api.BitEx.prototype.requestWithdraw);
goog.exportProperty(BitEx.prototype, 'processWithdraw', bitex.api.BitEx.prototype.processWithdraw);
goog.exportProperty(BitEx.prototype, 'requestWithdrawList', bitex.api.BitEx.prototype.requestWithdrawList);
goog.exportProperty(BitEx.prototype, 'confirmWithdraw', bitex.api.BitEx.prototype.confirmWithdraw);

goog.exportProperty(BitEx.prototype, 'requestCustomerList', bitex.api.BitEx.prototype.requestCustomerList);
goog.exportProperty(BitEx.prototype, 'requestCustomerDetails', bitex.api.BitEx.prototype.requestCustomerDetails);
goog.exportProperty(BitEx.prototype, 'verifyCustomer', bitex.api.BitEx.prototype.verifyCustomer);


goog.exportProperty(BitEx.prototype, 'requestBrokerList', bitex.api.BitEx.prototype.requestBrokerList );


goog.exportProperty(BitEx.prototype, 'requestOrderList', bitex.api.BitEx.prototype.requestOrderList);
goog.exportProperty(BitEx.prototype, 'cancelOrder', bitex.api.BitEx.prototype.cancelOrder);
goog.exportProperty(BitEx.prototype, 'sendRawMessage', bitex.api.BitEx.prototype.sendRawMessage);
goog.exportProperty(BitEx.prototype, 'sendBuyLimitedOrder', bitex.api.BitEx.prototype.sendBuyLimitedOrder);
goog.exportProperty(BitEx.prototype, 'sendSellLimitedOrder', bitex.api.BitEx.prototype.sendSellLimitedOrder);

goog.exportProperty(BitEx.prototype, 'testRequest', bitex.api.BitEx.prototype.testRequest);
goog.exportProperty(BitEx.prototype, 'addEventListener', bitex.api.BitEx.prototype.addEventListener);
goog.exportProperty(BitEx.prototype, 'removeEventListener', bitex.api.BitEx.prototype.removeEventListener);
