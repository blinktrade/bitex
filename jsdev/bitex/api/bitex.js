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
  LOGIN_OK: 'login_ok',
  LOGIN_ERROR: 'login_error',

  /* Trading */
  BALANCE_RESPONSE: 'balance_response',
  ORDER_LIST_RESPONSE: 'order_list_response',
  HEARTBEAT: 'heartbeat',
  EXECUTION_REPORT: 'execution_report',

  /* Market Data */
  MARKET_DATA_FULL_REFRESH : 'md_full_refresh',
  MARKET_DATA_INCREMENTAL_REFRESH: 'md_incremental_refresh',
  MARKET_DATA_REQUEST_REJECT: 'md_request_reject',
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
 * @param {string} url
 */
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

    case 'U3': // Balance Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.BALANCE_RESPONSE, msg ) );
      break;

    case 'U5': // Order List Response
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_LIST_RESPONSE, msg ) );
      break;

    case 'W':
      if ( msg['MarketDepth'] != 1 ) { // Has Market Depth
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR) );
        this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE_CLEAR) );

        for ( var x in msg['MDFullGrp']) {
          var entry = msg['MDFullGrp'][x];

          switch (entry['MDEntryType']) {
            case '0': // Bid
            case '1': // Offer
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER, entry) );
              break;
            case '2': // Trade
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE, entry) );
              break;
          }
        }
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_FULL_REFRESH, msg) );
      break;
    case 'X':
      if (msg['MDBkTyp'] == '3') {  // Order Depth
        for ( var x in msg['MDIncGrp']) {
          var entry = msg['MDIncGrp'][x];

          switch (entry['MDEntryType']) {
            case '0': // Bid
            case '1': // Offer
              switch( entry['MDUpdateAction'] ) {
                case '0':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER, entry) );
                  break;
                case '1':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER, entry) );
                  break;
                case '2':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER, entry) );
                  break;
                case '3':
                  this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU, entry) );
                  break;
              }
              break;
            case '2': // Trade
              this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.TRADE, entry) );
              break;
          }
        }
      } else {
        // TODO:  Top of the book handling.
      }
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_INCREMENTAL_REFRESH, msg) );
      break;
    case 'Y':
      this.dispatchEvent( new bitex.api.BitExEvent( bitex.api.BitEx.EventType.MARKET_DATA_REQUEST_REJECT, msg) );
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
 */
bitex.api.BitEx.prototype.login = function(username, password){
  var msg = {
    'MsgType': 'BE',
    'UserReqID': '1',
    'Username': username,
    'Password': password,
    'UserReqTyp': '1'
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
 * @return {number}
 */
bitex.api.BitEx.prototype.subscribeMarketData = function(market_depth, symbols, entries ){
  var reqId = parseInt(Math.random() * 1000000, 10);
  var msg = {
    'MsgType': 'V',
    'MDReqID': reqId,
    'SubscriptionRequestType': '1',
    'MarketDepth': market_depth,
    'MDUpdateType': '1',   // Incremental refresh
    'MDEntryTypes': entries,
    'Instruments': symbols
  };
  this.ws_.send(JSON.stringify( msg ));

  return reqId;
};

/**
 * @param {number} market_data_id
 */
bitex.api.BitEx.prototype.unSubscribeMarketData = function(market_data_id){
  var msg = {
    'MsgType': 'V',
    'MDReqID': market_data_id,
    'SubscriptionRequestType': '2'
  };
  this.ws_.send(JSON.stringify( msg ));
};



/**
 * @param {string} username
 * @param {string} password
 * @param {string} email
 */
bitex.api.BitEx.prototype.signUp = function(username, password, email){
  var msg = {
    'MsgType': 'U0',
    'Username': username,
    'Password': password,
    'Email': email
  };
  this.ws_.send(JSON.stringify( msg ));
};

/**
 * Request a list of open orders
 * @param {number=} opt_requestId. Defaults to random generated number
 * @param {number=} opt_page. Defaults to 0
 * @param {number=} opt_limit. Defaults to 100
 */
bitex.api.BitEx.prototype.requestOpenOrders = function(opt_requestId, opt_page, opt_limit){
  var requestId = opt_requestId || parseInt( 1e7 * Math.random() , 10 );
  var page = opt_page || 0;
  var limit = opt_limit || 100;

  var msg = {
    'MsgType': 'U4',
    'OpenOrdersReqID': requestId,
    'Page': page,
    'PageSize': limit,
    'StatusList': ['0', '1']
  };
  this.ws_.send(JSON.stringify( msg ));

  return requestId;
};

/**
 *
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {string} side
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @param {string=} opt_orderType Defaults to Limited Order
 * @return {number}
 */
bitex.api.BitEx.prototype.sendOrder_ = function( symbol, qty, price, side, opt_clientOrderId, opt_orderType  ){
  var clientOrderId = opt_clientOrderId || parseInt( 1e7 * Math.random() , 10 );
  var orderType = '' + opt_orderType || '2';
  price = parseInt(price * 1e5, 10);
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

  this.ws_.send(JSON.stringify( msg ));

  return clientOrderId;
};

/**
 * @param {string} opt_clientOrderId
 * @param {string} opt_OrderId
 */
bitex.api.BitEx.prototype.cancelOrder = function( opt_clientOrderId, opt_OrderId  ) {
  var msg = {
    'MsgType': 'F'
  };

  if (opt_clientOrderId) {
    msg['OrigClOrdID'] = opt_clientOrderId;
  } else if (opt_OrderId) {
    msg['OrderID'] = opt_OrderId;
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
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendBuyLimitedOrder = function( symbol, qty, price, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, '1', opt_clientOrderId, '2');
};

/**
 * Send a sell order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
bitex.api.BitEx.prototype.sendSellLimitedOrder = function( symbol, qty, price, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, '2', opt_clientOrderId, '2');
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
goog.exportProperty(BitEx.prototype, 'changePassword', bitex.api.BitEx.prototype.changePassword);
goog.exportProperty(BitEx.prototype, 'subscribeMarketData', bitex.api.BitEx.prototype.subscribeMarketData);
goog.exportProperty(BitEx.prototype, 'unSubscribeMarketData', bitex.api.BitEx.prototype.unSubscribeMarketData);
goog.exportProperty(BitEx.prototype, 'signUp', bitex.api.BitEx.prototype.signUp);
goog.exportProperty(BitEx.prototype, 'requestOpenOrders', bitex.api.BitEx.prototype.requestOpenOrders);
goog.exportProperty(BitEx.prototype, 'cancelOrder', bitex.api.BitEx.prototype.cancelOrder);
goog.exportProperty(BitEx.prototype, 'sendRawMessage', bitex.api.BitEx.prototype.sendRawMessage);
goog.exportProperty(BitEx.prototype, 'sendBuyLimitedOrder', bitex.api.BitEx.prototype.sendBuyLimitedOrder);
goog.exportProperty(BitEx.prototype, 'sendSellLimitedOrder', bitex.api.BitEx.prototype.sendSellLimitedOrder);
goog.exportProperty(BitEx.prototype, 'testRequest', bitex.api.BitEx.prototype.testRequest);
goog.exportProperty(BitEx.prototype, 'addEventListener', bitex.api.BitEx.prototype.addEventListener);
goog.exportProperty(BitEx.prototype, 'removeEventListener', bitex.api.BitEx.prototype.removeEventListener);
