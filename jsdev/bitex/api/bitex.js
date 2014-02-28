goog.provide('bitex.api.BitEx');
goog.provide('bitex.api.BitEx.EventType');
goog.provide('bitex.api.BitExEvent');

goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

var WEB_SOCKET_NOT_AVAILABLE_EXCEPTION = "WebSockets are not available";

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.api.BitEx = function(){
  goog.base(this);

};
goog.inherits(bitex.api.BitEx, goog.events.EventTarget);


/**
 * @type {WebSocket}
 * @private
 */
bitex.api.BitEx.prototype.ws_ = null;

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
 * The events fired by the web socket.
 * @enum {string} The event types for the web socket.
 */
bitex.api.BitEx.EventType = {
  CLOSED: 'closed',
  ERROR: 'error',
  OPENED: 'opened',

  RAW_MESSAGE: 'raw_message',
  ERROR_MESSAGE: 'error_message',
  LOGIN_OK: 'login_ok',
  LOGIN_ERROR: 'login_error',

  BOLETO_OPTIONS_RESPONSE:'boleto_options_response',
  GENERATE_BOLETO_RESPONSE : 'generate_boleto_response',

  TWO_FACTOR_SECRET: 'two_factor_secret',

  PASSWORD_CHANGED_OK: 'pwd_changed_ok',
  PASSWORD_CHANGED_ERROR: 'pwd_changed_error',

  /* Withdraws */
  CRYPTO_COIN_WITHDRAW_RESPONSE: 'crypto_coin_withdraw_response',
  BRL_BANK_TRANSFER_WITHDRAW_RESPONSE: 'brl_bank_transfer_withdraw_response',
  WITHDRAW_LIST_RESPONSE: 'withdraw_list_response',

  /* Trading */
  BALANCE_RESPONSE: 'balance_response',
  ORDER_LIST_RESPONSE: 'order_list_response',
  HEARTBEAT: 'heartbeat',
  EXECUTION_REPORT: 'execution_report',

  /* Securities */
  SECURITY_LIST: 'security_list',

  /* Brokers */
  BROKER_LIST_RESPONSE: 'broker_list',
  CUSTOMER_LIST_RESPONSE: 'customer_list',
  CUSTOMER_DETAIL_RESPONSE: 'customer_detail',

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
 * Open a connection with BitEx server * @param {string} url */
bitex.api.BitEx.prototype.open = function(url) {

  if ("WebSocket" in window) {
    this.ws_ = new WebSocket(url);
  } else if ("MozWebSocket" in window) {
    this.ws_ = new MozWebSocket(url);
  } else {
    throw WEB_SOCKET_NOT_AVAILABLE_EXCEPTION;
  }

  this.ws_.onopen = goog.bind(this.onOpen_, this);
  this.ws_.onclose = goog.bind(this.onClose_, this);
  this.ws_.onmessage = goog.bind(this.onMessage_, this);
  this.ws_.onerror = goog.bind(this.onError_, this);
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
bitex.api.BitEx.prototype.onClose_ = function() {
  this.dispatchEvent(bitex.api.BitEx.EventType.CLOSED);
  this.connected_ = false;
  this.logged_ = false;
};

/**
 * @private
 */
bitex.api.BitEx.prototype.onError_ = function() {
  this.dispatchEvent(bitex.api.BitEx.EventType.ERROR);
  this.connected_ = false;
  this.logged_ = false;
};

/**
 * @param {*} e
 * @private
 */
bitex.api.BitEx.prototype.onMessage_ = function(e) {
  var msg = JSON.parse(e.data);

  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.RAW_MESSAGE, msg ) );

  switch( msg['MsgType'] ) {
    case 'ERROR':
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ERROR_MESSAGE, msg ) );
      break;


    case '0':  //Heartbeat
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.HEARTBEAT, msg ) );
      break;

    case 'BF': // Login response:
      if (msg['UserStatus'] == 1 ) {
        this.logged_ = true;
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_OK, msg ) );

      } else {
        this.logged_ = false;
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.LOGIN_ERROR, msg ) );
      }
      break;

    case 'y': // Security List
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.SECURITY_LIST, msg));
      break;

    case 'U13': // Password change response
      if (msg['UserStatus'] == 1 ) {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_OK, msg ) );
      } else {
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.PASSWORD_CHANGED_ERROR, msg ) );
      }
      break;

    case 'U19': // Generate boleto response
     this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.GENERATE_BOLETO_RESPONSE, msg ) );
      break;

    case 'U7': // CryptoCoin Withdraw Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.CRYPTO_COIN_WITHDRAW_RESPONSE, msg ) );
      break;

    case 'U9': // BRL Bank Transfer Withdraw Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BRL_BANK_TRANSFER_WITHDRAW_RESPONSE, msg ) );
      break;

    case 'U3': // Balance Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BALANCE_RESPONSE, msg ) );
      break;

    case 'U5': // Order List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE, msg ) );
      break;

    case 'U17': // Enable Two Factor Secret Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TWO_FACTOR_SECRET, msg ) );
      break;

    case 'U21': // Request Boleto Options Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BOLETO_OPTIONS_RESPONSE, msg ) );
      break;

    case 'U27': // Withdraw List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.WITHDRAW_LIST_RESPONSE, msg ) );
      break;

    case 'U29': // Broker List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BROKER_LIST_RESPONSE, msg ) );
      break;

    case 'B3': // Customer List Response
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_LIST_RESPONSE, msg) );
      break;

    case 'B5': // Customer Detail Response
      this.dispatchEvent( new bitex.api.BitExEvent(bitex.api.BitEx.EventType.CUSTOMER_DETAIL_RESPONSE, msg) );
      break;

    case 'W':
      if ( msg['MarketDepth'] != 1 ) { // Has Market Depth
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR + '.' + msg['MDReqID']) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_CLEAR) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_CLEAR + '.' + msg['MDReqID']) );

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
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.EXECUTION_REPORT, msg) );
      break;
  }
};


bitex.api.BitEx.prototype.close = function(){
  this.connected_ = false;
  this.logged_ = false;

  this.ws_.close();
  this.ws_ = null; // dereference the WebSocket
};

/**
 * @param {string} username
 * @param {string} password
 * @param {string=} opt_second_factor
 */
bitex.api.BitEx.prototype.login = function(username, password, opt_second_factor ){
  var msg = {
    'MsgType': 'BE',
    'UserReqID': '1',
    'Username': username,
    'Password': password,
    'UserReqTyp': '1'
  };
  if (goog.isDefAndNotNull(opt_second_factor)) {
    msg['SecondFactor'] = opt_second_factor;
  }
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * @param {boolean} enable
 * @param {string=} opt_secret
 * @param {string=} opt_code
 * @param {number=} opt_clientID
 */
bitex.api.BitEx.prototype.enableTwoFactor = function(enable, opt_secret, opt_code, opt_clientID){
  var msg = {
    'MsgType': 'U16',
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

  this.ws_.send(JSON.stringify( msg ));
};


/**
 * @param {string} email
 */
bitex.api.BitEx.prototype.forgotPassword = function(email){
  var msg = {
    'MsgType': 'U10',
    'Email': email
  };
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * @param {number=} opt_clientID
 */
bitex.api.BitEx.prototype.requestBalances = function(opt_clientID) {
  var reqId = parseInt(Math.random() * 1000000, 10);

  var msg = {
    'MsgType': 'U2',
    'BalanceReqID': reqId
  };

  if (goog.isDefAndNotNull(opt_clientID) && goog.isNumber(opt_clientID))  {
    msg['ClientID'] = opt_clientID;
  }


  this.ws_.send(JSON.stringify( msg ));
};

/**
 * @param {number} amount 
 * @param {string} address
 * @param {string} currency
 */
bitex.api.BitEx.prototype.withdrawCryptoCoin = function( amount, address, currency  ) {
  var reqId = parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'U6',
    'WithdrawReqID': reqId,
    'Currency': currency,
    'Amount': parseInt(amount * 1e8, 10),
    'Wallet': address
  };
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * @param {number} amount
 * @param {string} bank_number
 * @param {string} bank_name
 * @param {string} account_name
 * @param {string} account_number
 * @param {string} account_branch
 * @param {string} cpf_cnpj
 */
bitex.api.BitEx.prototype.withdrawBRLBankTransfer = function( amount, bank_number, bank_name, account_name,
                                                              account_number, account_branch, cpf_cnpj) {
  var reqId = parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType'       : 'U8',
    'WithdrawReqID' : reqId,
    'Amount'        : parseInt(amount * 1e8, 10),
    'BankNumber'    : bank_number,
    'BankName'      : bank_name,
    'AccountName'   : account_name,
    'AccountNumber' : account_number,
    'AccountBranch' : account_branch,
    'CPFCNPJ'       : cpf_cnpj
  };
  this.ws_.send(JSON.stringify( msg ));
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
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * Request a withdraw list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {Array.<string>=} opt_status. Defaults to ['1', '2'] ( all operations )
 * @param {number=} opt_clientID
 */
bitex.api.BitEx.prototype.requestWithdrawList = function(opt_requestId, opt_page, opt_limit, opt_status, opt_clientID){
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

  this.ws_.send(JSON.stringify( msg ));

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

  this.ws_.send(JSON.stringify( msg ));

  return requestId;
};

/**
 * Request the Broker Customer's list
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {string=} opt_country.
 * @param {string=} opt_state.
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 * @param {string=} opt_sort_column
 * @param {string=} opt_sort_direction. Defaults to ASC
 * @param {Array.<string>=} opt_status. Defaults to ['1'] ( active brokers )
 */
bitex.api.BitEx.prototype.requestCustomerList = function(opt_requestId, opt_country, opt_state, opt_page, opt_limit, opt_status, opt_sort_column, opt_sort_direction){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;
  var status = opt_status || [0,1];

  var msg = {
    'MsgType': 'B2',
    'CustomerListReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': status
  };
  if (goog.isDefAndNotNull(opt_country)) {
    msg['Country'] = opt_country;
  }
  if (goog.isDefAndNotNull(opt_state)) {
    msg['State'] = opt_state;
  }
  if (goog.isDefAndNotNull(opt_sort_column)) {
    msg['Sort'] = opt_sort_column;
  }
  if (goog.isDefAndNotNull(opt_sort_direction)) {
    msg['SortOrder'] = opt_sort_direction;
  }

  this.ws_.send(JSON.stringify( msg ));
  return requestId;
};

/**
 * @param {number} clientId
 */
bitex.api.BitEx.prototype.requestCustomerDetails = function(clientId){
  var requestId = parseInt( 1e7 * Math.random() , 10 );

  var msg = {
    'MsgType': 'B4',
    'CustomerReqID': requestId,
    'ClientID': clientId
  };
  this.ws_.send(JSON.stringify( msg ));
  return requestId;
};



/**
 * @param {string} token
 * @param {string} new_password
 */
bitex.api.BitEx.prototype.resetPassword = function(token, new_password){
  var msg = {
    'MsgType': 'U12',
    'Token': token,
    'NewPassword': new_password
  };
  this.ws_.send(JSON.stringify( msg ));
};


/**
 * @param {string} password
 * @param {string} new_password
 */
bitex.api.BitEx.prototype.changePassword = function(password, new_password ){
  var msg = {
    'MsgType': 'BE',
    'UserReqID': '3',
    'Password': password,
    'NewPassword': new_password
  };
  this.ws_.send(JSON.stringify( msg ));
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
  this.ws_.send(JSON.stringify( msg ));

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
  this.ws_.send(JSON.stringify( msg ));
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
  this.ws_.send(JSON.stringify( msg ));
};


/**
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {string} state
 * @param {string} country_code
 * @param {number} broker
 */
bitex.api.BitEx.prototype.signUp = function(username, password, email, state, country_code, broker) {
  var msg = {
    'MsgType': 'U0',
    'Username': username,
    'Password': password,
    'Email': email,
    'State': state,
    'CountryCode': country_code,
    'BrokerID': broker
  };
  this.ws_.send(JSON.stringify( msg ));
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
  this.ws_.send(JSON.stringify( msg ));

  return requestId;
};

/**
 * Generate a boleto for the client
 * @param {string} boletoId
 * @param {number} value
 */
bitex.api.BitEx.prototype.generateBoleto = function( boletoId, value ) {
  var msg = {
    'MsgType': 'U18',
    'BoletoId': boletoId,
    'Value': value
  };
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * Request Boleto Options
 * @param {number=} opt_requestId. Defaults to random generated number
 */
bitex.api.BitEx.prototype.requestBoletoOptions = function( opt_requestId ) {
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var msg = {
    'MsgType': 'U20',
    'BoletoOptionReqId': requestId
  };
  this.ws_.send(JSON.stringify( msg ));
};


/**
 *
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string} side
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @param {string=} opt_orderType Defaults to Limited Order
 * @return {number}
 *
 */
bitex.api.BitEx.prototype.sendOrder_ = function( symbol, qty, price, side, opt_client_id, opt_clientOrderId, opt_orderType ){
  var clientOrderId = opt_clientOrderId || parseInt( 1e7 * Math.random() , 10 );
  var orderType = '' + opt_orderType || '2';
  price = parseInt(price * 1e8, 10);
  qty = parseInt(qty * 1e8, 10);

  var msg = {
    'MsgType': 'D',
    'ClOrdID': '' + clientOrderId,
    'Symbol': symbol,
    'Side': side,
    'OrdType': orderType,
    'Price': price,
    'OrderQty': qty
  };

  if (goog.isDefAndNotNull(opt_client_id) && !goog.string.isEmpty(opt_client_id)) {
    msg['ClientID'] = opt_client_id;
  }

  this.ws_.send(JSON.stringify( msg ));

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

  this.ws_.send(JSON.stringify( msg ));
};

/**
 * @param {Object} msg
 */
bitex.api.BitEx.prototype.sendRawMessage  = function(msg) {
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * Send a buy order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendBuyLimitedOrder = function( symbol, qty, price, opt_client_id, opt_clientOrderId ){
  return this.sendOrder_(symbol, qty, price, '1', opt_client_id, opt_clientOrderId, '2');
};

/**
 * Send a sell order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendSellLimitedOrder = function( symbol, qty, price, opt_client_id, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, '2', opt_client_id, opt_clientOrderId, '2');
};

/**
 * Send a sell order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string} side
 * @param {string=} opt_client_id
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendLimitedOrder = function( symbol, qty, price, side,  opt_client_id, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, side, opt_client_id, opt_clientOrderId, '2');
};


/**
 * Send a test request message, to test the connection
 */
bitex.api.BitEx.prototype.testRequest = function(){
  var msg = {
    'MsgType': '1',
    'TestReqID': Math.random()
  };
  this.ws_.send(JSON.stringify( msg ));
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
goog.exportProperty(BitEx.prototype, 'requestSecurityList', bitex.api.BitEx.prototype.requestSecurityList);
goog.exportProperty(BitEx.prototype, 'changePassword', bitex.api.BitEx.prototype.changePassword);
goog.exportProperty(BitEx.prototype, 'subscribeMarketData', bitex.api.BitEx.prototype.subscribeMarketData);
goog.exportProperty(BitEx.prototype, 'unSubscribeMarketData', bitex.api.BitEx.prototype.unSubscribeMarketData);
goog.exportProperty(BitEx.prototype, 'signUp', bitex.api.BitEx.prototype.signUp);
goog.exportProperty(BitEx.prototype, 'forgotPassword', bitex.api.BitEx.prototype.forgotPassword);
goog.exportProperty(BitEx.prototype, 'requestBalances', bitex.api.BitEx.prototype.requestBalances);
goog.exportProperty(BitEx.prototype, 'withdrawCryptoCoin', bitex.api.BitEx.prototype.withdrawCryptoCoin);
goog.exportProperty(BitEx.prototype, 'requestWithdrawList', bitex.api.BitEx.prototype.requestWithdrawList);
goog.exportProperty(BitEx.prototype, 'requestCustomerList', bitex.api.BitEx.prototype.requestCustomerList);
goog.exportProperty(BitEx.prototype, 'requestCustomerDetails', bitex.api.BitEx.prototype.requestCustomerDetails);
goog.exportProperty(BitEx.prototype, 'requestBrokerList', bitex.api.BitEx.prototype.requestBrokerList );
goog.exportProperty(BitEx.prototype, 'confirmWithdraw', bitex.api.BitEx.prototype.confirmWithdraw);
goog.exportProperty(BitEx.prototype, 'enableTwoFactor', bitex.api.BitEx.prototype.enableTwoFactor);
goog.exportProperty(BitEx.prototype, 'resetPassword', bitex.api.BitEx.prototype.resetPassword);
goog.exportProperty(BitEx.prototype, 'requestOrderList', bitex.api.BitEx.prototype.requestOrderList);
goog.exportProperty(BitEx.prototype, 'cancelOrder', bitex.api.BitEx.prototype.cancelOrder);
goog.exportProperty(BitEx.prototype, 'sendRawMessage', bitex.api.BitEx.prototype.sendRawMessage);
goog.exportProperty(BitEx.prototype, 'sendBuyLimitedOrder', bitex.api.BitEx.prototype.sendBuyLimitedOrder);
goog.exportProperty(BitEx.prototype, 'sendSellLimitedOrder', bitex.api.BitEx.prototype.sendSellLimitedOrder);
goog.exportProperty(BitEx.prototype, 'testRequest', bitex.api.BitEx.prototype.testRequest);
goog.exportProperty(BitEx.prototype, 'addEventListener', bitex.api.BitEx.prototype.addEventListener);
goog.exportProperty(BitEx.prototype, 'removeEventListener', bitex.api.BitEx.prototype.removeEventListener);
