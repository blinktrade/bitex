goog.provide('bitex.view.OfferBookView');
goog.provide('bitex.view.OfferBookView.EventType');

goog.require('bitex.view.View');
goog.require('bitex.view.View.EventType');

goog.require('bitex.ui.OrderEntryX');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.OfferBookView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

  this.order_book_bid_ = null;
  this.order_book_offer_ = null;

  this.market_data_subscription_id_ = null;
  this.market_data_subscription_symbol_ = null;

  this.order_id_ = null;
  this.client_order_id = null;
};
goog.inherits(bitex.view.OfferBookView, bitex.view.View);


/**
 * @type {bitex.ui.OrderBook}
 */
bitex.view.OfferBookView.prototype.order_book_bid_;

/**
 * @type {bitex.ui.OrderBook}
 */
bitex.view.OfferBookView.prototype.order_book_offer_;

/**
 * @type {number}
 */
bitex.view.OfferBookView.prototype.market_data_subscription_id_;

/**
 * @type {string}
 */
bitex.view.OfferBookView.prototype.market_data_subscription_symbol_;

/**
 * @type {number}
 */
bitex.view.OfferBookView.prototype.order_id_;

/**
 * @type {number}
 */
bitex.view.OfferBookView.prototype.client_order_id;

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.OfferBookView.EventType = {
};

bitex.view.OfferBookView.prototype.enterView = function() {
  var model = this.getApplication().getModel();
  var selected_symbol = model.get('SelectedSymbol');
  if (goog.isDefAndNotNull(selected_symbol)) {
    this.recreateOrderBookComponents_(selected_symbol);
  }
};

bitex.view.OfferBookView.prototype.exitView = function() {
  this.destroyOrderBookComponents_();
};


/**
 * @param {Element} element Element to decorate.
 * @protected
 */
bitex.view.OfferBookView.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var buy_order_entry = new bitex.ui.OrderEntryX();
  var sell_order_entry = new bitex.ui.OrderEntryX();

  this.addChild(buy_order_entry);
  this.addChild(sell_order_entry);


  buy_order_entry.decorate(goog.dom.getElement('id_order_entry_buy'));
  sell_order_entry.decorate(goog.dom.getElement('id_order_entry_sell'));


};

/**
 * @private
 */
bitex.view.OfferBookView.prototype.destroyOrderBookComponents_ = function( ) {
  var handler = this.getHandler();

  if (goog.isDefAndNotNull(this.order_book_bid_) ) {
    handler.unlisten(this.order_book_bid_ ,bitex.ui.OrderBook.EventType.CANCEL, this.onCancelOrder_ );
    this.order_book_bid_.dispose();
  }
  if (goog.isDefAndNotNull(this.order_book_offer_) ) {
    handler.unlisten(this.order_book_offer_ ,bitex.ui.OrderBook.EventType.CANCEL, this.onCancelOrder_ );
    this.order_book_offer_.dispose();
  }
  if (goog.isDefAndNotNull(this.market_data_subscription_id_)) {
    var conn = this.getApplication().getBitexConnection() ;
    handler.unlisten( conn, bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR + '.' + this.market_data_subscription_id_, this.onOBClear_);
    handler.unlisten( conn, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU + '.' + this.market_data_subscription_id_, this.onOBDeleteOrdersThru_);
    handler.unlisten( conn, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER + '.' + this.market_data_subscription_id_, this.onOBDeleteOrder_);
    handler.unlisten( conn, bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER + '.' + this.market_data_subscription_id_, this.onOBUpdateOrder_);
    handler.unlisten( conn, bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER + '.' + this.market_data_subscription_id_, this.onOBNewOrder_);

    this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_UNSUBSCRIBE);
    this.market_data_subscription_id_ = null;
    this.market_data_subscription_symbol_ = null;
  }

  this.order_book_bid_ = null;
  this.order_book_offer_ = null;
};

/**
 * @param {*} selected_symbol
 * @private
 */
bitex.view.OfferBookView.prototype.recreateOrderBookComponents_ = function( selected_symbol ) {
  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  if (this.market_data_subscription_symbol_ === selected_symbol.symbol) {
    return;
  }

  this.destroyOrderBookComponents_();

  this.order_book_bid_ =  new bitex.ui.OrderBook(model.get('Username'),
                                                 bitex.ui.OrderBook.Side.BUY,
                                                 selected_symbol.qty_currency,
                                                 selected_symbol.price_currency);

  this.order_book_offer_ =  new bitex.ui.OrderBook(model.get('Username'),
                                                   bitex.ui.OrderBook.Side.SELL,
                                                   selected_symbol.qty_currency,
                                                   selected_symbol.price_currency);

  this.order_book_bid_.decorate( goog.dom.getElement('order_book_bid') );
  this.order_book_offer_.decorate( goog.dom.getElement('order_book_offer') );

  handler.listen(this.order_book_bid_ ,bitex.ui.OrderBook.EventType.CANCEL, this.onCancelOrder_ );
  handler.listen(this.order_book_offer_ ,bitex.ui.OrderBook.EventType.CANCEL, this.onCancelOrder_ );

  this.market_data_subscription_id_ = parseInt( 1e7 * Math.random() , 10 );
  this.market_data_subscription_symbol_ = selected_symbol.symbol;

  var conn = this.getApplication().getBitexConnection() ;
  handler.listen( conn, bitex.api.BitEx.EventType.ORDER_BOOK_CLEAR + '.' + this.market_data_subscription_id_, this.onOBClear_);
  handler.listen( conn, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDERS_THRU + '.' + this.market_data_subscription_id_, this.onOBDeleteOrdersThru_);
  handler.listen( conn, bitex.api.BitEx.EventType.ORDER_BOOK_DELETE_ORDER + '.' + this.market_data_subscription_id_, this.onOBDeleteOrder_);
  handler.listen( conn, bitex.api.BitEx.EventType.ORDER_BOOK_UPDATE_ORDER + '.' + this.market_data_subscription_id_, this.onOBUpdateOrder_);
  handler.listen( conn, bitex.api.BitEx.EventType.ORDER_BOOK_NEW_ORDER + '.' + this.market_data_subscription_id_, this.onOBNewOrder_);


  this.dispatchEvent(bitex.view.View.EventType.MARKET_DATA_SUBSCRIBE);
};

/**
 * @override
 * @protected
 */
bitex.view.OfferBookView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();


  handler.listen( model,  bitex.model.Model.EventType.SET + 'SelectedSymbol', function(e) {
    var selected_symbol = model.get('SelectedSymbol');
    var symbol = selected_symbol.symbol;

    var buy_order_entry = this.getChildAt(0);
    var sell_order_entry = this.getChildAt(1);

    buy_order_entry.setSymbol(symbol);
    buy_order_entry.setAmountCurrencySign( selected_symbol.qty_currency.sign );
    buy_order_entry.setPriceCurrencySign( selected_symbol.price_currency.sign );

    sell_order_entry.setSymbol(symbol);
    sell_order_entry.setAmountCurrencySign( selected_symbol.qty_currency.sign );
    sell_order_entry.setPriceCurrencySign( selected_symbol.price_currency.sign );

    var market = null;
    if (goog.isDefAndNotNull(model.get('AllowedMarkets'))) {
      market = model.get('AllowedMarkets')[symbol] ;
    }

    goog.style.showElement( sell_order_entry.getElement(), goog.isDefAndNotNull( market));
    goog.style.showElement( buy_order_entry.getElement(), goog.isDefAndNotNull( market));

    this.recreateOrderBookComponents_(selected_symbol);
  }, this);
};


bitex.view.OfferBookView.prototype.onOBClear_ = function(e){
  if (!goog.isDefAndNotNull(this.order_book_offer_)) {
    return;
  }
  this.order_book_bid_.clear();
  this.order_book_offer_.clear();
};

bitex.view.OfferBookView.prototype.onOBDeleteOrdersThru_ = function(e){
  if (!goog.isDefAndNotNull(this.order_book_offer_)) {
    return;
  }

  var msg   = e.data;
  var index = msg['MDEntryPositionNo'];
  var side  = msg['MDEntryType'];

  if (side == '0') {
    this.order_book_bid_.deleteOrderThru(index);
  } else if (side == '1') {
    this.order_book_offer_.deleteOrderThru(index);
  }
};

bitex.view.OfferBookView.prototype.onOBDeleteOrder_ = function(e){
  if (!goog.isDefAndNotNull(this.order_book_offer_)) {
    return;
  }

  var msg   = e.data;
  var index = msg['MDEntryPositionNo'] - 1;
  var side  = msg['MDEntryType'];

  if (side == '0') {
    this.order_book_bid_.deleteOrder(index);
  } else if (side == '1') {
    this.order_book_offer_.deleteOrder(index);
  }
};

bitex.view.OfferBookView.prototype.onOBUpdateOrder_ = function(e){
  if (!goog.isDefAndNotNull(this.order_book_offer_)) {
    return;
  }

  var msg   = e.data;
  var index = msg['MDEntryPositionNo'] - 1;
  var qty   = msg['MDEntrySize']/1e8;
  var side  = msg['MDEntryType'];

  if (side == '0') {
    this.order_book_bid_.updateOrder(index, qty);
  } else if (side == '1') {
    this.order_book_offer_.updateOrder(index, qty);
  }
};

bitex.view.OfferBookView.prototype.onOBNewOrder_ = function(e){
  if (!goog.isDefAndNotNull(this.order_book_offer_)) {
    return;
  }

  var msg       = e.data;
  var index     = msg['MDEntryPositionNo'] - 1;
  var price     = msg['MDEntryPx']/1e8;
  var qty       = msg['MDEntrySize']/1e8;
  var username  = msg['Username'];
  var broker    = msg['Broker'];
  var orderId   = msg['OrderID'];
  var side      = msg['MDEntryType'];

  if (side == '0') {
    this.order_book_bid_.insertOrder(index, orderId, price, qty, username, broker );
  } else if (side == '1') {
    this.order_book_offer_.insertOrder(index, orderId, price, qty, username, broker );
  }
};



/**
 * @return {number}
 */
bitex.view.OfferBookView.prototype.getMDSubscriptionId = function(){
  return this.market_data_subscription_id_;
};

/**
 * @return {Array.<string>}
 */
bitex.view.OfferBookView.prototype.getMDInstruments = function(){
  return [this.market_data_subscription_symbol_];
};

/**
 * @return {number}
 */
bitex.view.OfferBookView.prototype.getMDMarketDepth = function(){
  return 0;
};

/**
 * @return {Array.<string>}
 */
bitex.view.OfferBookView.prototype.getMDEntries = function(){
  return ['0', '1'];
};

bitex.view.OfferBookView.prototype.getOrderId = function() {
  return this.order_id_;
};

bitex.view.OfferBookView.prototype.getClientOrderId = function() {
  return this.client_order_id_;
};

bitex.view.OfferBookView.prototype.onCancelOrder_ = function(e) {
  this.order_id_        = e.order_id;
  this.client_order_id_ = e.client_order_id;

  this.dispatchEvent(bitex.view.View.EventType.CANCEL_ORDER);
};




/**
 * @override
 * @protected
 */
bitex.view.OfferBookView.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.destroyOrderBookComponents_();
};