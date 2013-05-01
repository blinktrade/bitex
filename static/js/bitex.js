var WEB_SOCKET_NOT_AVAILABLE_EXCEPTION = "WebSockets are not available";

var goog = goog || {}; // Identifies this file as the Closure base.

/**
 * A native implementation of goog.bind.
 * @param {Function} fn A function to partially apply.
 * @param {Object|undefined} selfObj Specifies the object which |this| should
 *     point to when the function is run.
 * @param {...*} var_args Additional arguments that are partially
 *     applied to the function.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 * @private
 * @suppress {deprecated} The compiler thinks that Function.prototype.bind
 *     is deprecated because some people have declared a pure-JS version.
 *     Only the pure-JS version is truly deprecated.
 */
goog.bindNative_ = function(fn, selfObj, var_args) {
  return /** @type {!Function} */ (fn.call.apply(fn.bind, arguments));
};


/**
 * A pure-JS implementation of goog.bind.
 * @param {Function} fn A function to partially apply.
 * @param {Object|undefined} selfObj Specifies the object which |this| should
 *     point to when the function is run.
 * @param {...*} var_args Additional arguments that are partially
 *     applied to the function.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 * @private
 */
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error();
  }

  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      // Prepend the bound arguments to the current arguments.
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };

  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};

/**
 * Partially applies this function to a particular 'this object' and zero or
 * more arguments. The result is a new function with some arguments of the first
 * function pre-filled and the value of |this| 'pre-specified'.<br><br>
 *
 * Remaining arguments specified at call-time are appended to the pre-
 * specified ones.<br><br>
 *
 * Also see: {@link #partial}.<br><br>
 *
 * Usage:
 * <pre>var barMethBound = bind(myFunction, myObj, 'arg1', 'arg2');
 * barMethBound('arg3', 'arg4');</pre>
 *
 * @param {Function} fn A function to partially apply.
 * @param {Object|undefined} selfObj Specifies the object which |this| should
 *     point to when the function is run.
 * @param {...*} var_args Additional arguments that are partially
 *     applied to the function.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 * @suppress {deprecated} See above.
 */
goog.bind = function(fn, selfObj, var_args) {
  // TODO(nicksantos): narrow the type signature.
  if (Function.prototype.bind &&
    // NOTE(nicksantos): Somebody pulled base.js into the default
    // Chrome extension environment. This means that for Chrome extensions,
    // they get the implementation of Function.prototype.bind that
    // calls goog.bind instead of the native one. Even worse, we don't want
    // to introduce a circular dependency between goog.bind and
    // Function.prototype.bind, so we have to hack this to make sure it
    // works correctly.
      Function.prototype.bind.toString().indexOf('native code') != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};



/**
 * @param {string} url
 * @param {function(*)=}  opt_onOpenCallback
 * @param {function(*)=}  opt_onCloseCallback
 * @param {function(*)=}  opt_onErrorCallback
 * @constructor
 */
var BitEx = function(url , opt_onOpenCallback, opt_onCloseCallback, opt_onErrorCallback ){

  if ("WebSocket" in window) {
    console.log("creating new websocket");
    this.ws_ = new WebSocket(url);
  } else if ("MozWebSocket" in window) {
    console.log("creating new mozwebsocket");
    this.ws_ = new MozWebSocket(url);
  } else {
    console.log("no websocket");
    throw WEB_SOCKET_NOT_AVAILABLE_EXCEPTION;
  }

  this.ws_.onopen =  opt_onOpenCallback || this.onopen;
  this.ws_.onerror = opt_onErrorCallback || this.onerror;
  this.ws_.onclose = opt_onCloseCallback || this.onclose;

  this.ws_.onmessage = goog.bind(  this.onMessage_, this);


};


/**
 * @type {!WebSocket}
 * @private
 */
BitEx.prototype.ws_ = null;


BitEx.prototype.onopen = function(e) {};
BitEx.prototype.onerror = function(e) {};
BitEx.prototype.onclose = function(e) {};


BitEx.prototype.onLoginResponseOk = function(msg) {};
BitEx.prototype.onLoginResponseError = function(msg) {};

BitEx.prototype.onHeartBeat = function(msg) {};
BitEx.prototype.onExecutionReport = function(msg) {};

BitEx.prototype.onMarketDataFullRefresh = function(msg) {};
BitEx.prototype.onMarketDataIncrementalRefresh = function(msg) {};
BitEx.prototype.onMarketDataRequestReject = function(msg) {};

BitEx.prototype.onTrade = function( msg ){};
BitEx.prototype.onTradeClear = function( msg ){};

BitEx.prototype.onOrderBookClear = function(  ){};
BitEx.prototype.onOrderBookDeleteOrdersThru = function( msg ){};
BitEx.prototype.onOrderBookDeleteOrder = function( msg ){};
BitEx.prototype.onOrderBookNewOrder = function( msg ){};
BitEx.prototype.onOrderBookUpdateOrder = function( msg ){};

/**
 * @param {*} e
 * @private
 */
BitEx.prototype.onMessage_ = function(e) {
  var msg = JSON.parse(e.data);

  switch( msg.MsgType ) {
    case '0':  //Heartbeat
      this.onHeartBeat(msg);
      break;

    case 'BF': // Login response:
      if (msg.UserStatus == 1 ) {
        this.onLoginResponseOk(msg);
      } else {
        this.onLoginResponseError(msg);
      }
      break;

    case 'W':
      if ( msg.MarketDepth != 1 ) { // Has Market Depth
        this.onOrderBookClear();
        this.onTradeClear();

        for ( var x in msg.MDFullGrp) {
          var entry = msg.MDFullGrp[x];

          switch (entry.MDEntryType) {
            case '0': // Bid
            case '1': // Offer
              this.onOrderBookNewOrder(entry);
              break;
            case '2': // Trade
              this.onTrade(entry);
              break;
          }
        }
      }
      this.onMarketDataFullRefresh(msg);
      break;
    case 'X':
      if (msg.MDBkTyp == '3') {  // Order Depth
        for ( var x in msg.MDIncGrp) {
          var entry = msg.MDIncGrp[x];

          switch (entry.MDEntryType) {
            case '0': // Bid
            case '1': // Offer
              switch( entry.MDUpdateAction ) {
                case '0':
                  this.onOrderBookNewOrder(entry);
                  break;
                case '1':
                  this.onOrderBookUpdateOrder(entry);
                  break;
                case '2':
                  this.onOrderBookDeleteOrder(entry);
                  break;
                case '3':
                  this.onOrderBookDeleteOrdersThru(entry);
                  break;
              }
              break;
            case '2': // Trade
              this.onTrade(entry);
              break;
          }
        }
      } else {
        // TODO:  Top of the book handling.
      }
      this.onMarketDataIncrementalRefresh(msg);
      break;
    case 'Y':
      this.onMarketDataRequestReject(msg);
      break;

    case '8':  //Execution Report
      this.onExecutionReport(msg);
      break;

    default:
      console.log( 'Unknow message ... ' + e.data);
  }
};


BitEx.prototype.close = function(){
  this.ws_.close();
  this.ws_ = null; // dereference the WebSocket
};

/**
 * @param {string} username
 * @param {string} password
 */
BitEx.prototype.login = function(username, password){
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
BitEx.prototype.changePassword = function(password, new_password ){
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
BitEx.prototype.subscribeMarketData = function(market_depth, symbols, entries ){
  var reqId = parseInt(Math.random() * 1000000);
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
BitEx.prototype.unSubscribeMarketData = function(market_data_id){
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
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} email
 */
BitEx.prototype.signUp = function(username, password, first_name, last_name, email ){
  var msg = {
    'MsgType': 'U0',
    'Username': username,
    'Password': password,
    'FirstName': first_name,
    'LastName': last_name,
    'Email': email
  };
  this.ws_.send(JSON.stringify( msg ));
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
BitEx.prototype.sendOrder_ = function( symbol, qty, price, side, opt_clientOrderId, opt_orderType  ){
  var clientOrderId = opt_clientOrderId || parseInt( 1e7 * Math.random() );
  var orderType = '' + opt_orderType || '2';
  price = parseInt(price * 1e5);
  qty = parseInt(qty * 1e8);

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
 * Send a buy order
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @param {number=} opt_clientOrderId. Defaults to random generated number
 * @return {number}
 */
BitEx.prototype.sendBuyLimitedOrder = function( symbol, qty, price, opt_clientOrderId  ){
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
BitEx.prototype.sendSellLimitedOrder = function( symbol, qty, price, opt_clientOrderId  ){
  return this.sendOrder_(symbol, qty, price, '2', opt_clientOrderId, '2');
};

/**
 * Send a test request message, to test the connection
 */
BitEx.prototype.testRequest = function(){
  var msg = {
    'MsgType': '1',
    'TestReqID': Math.random()
  };
  this.ws_.send(JSON.stringify( msg ));
};

