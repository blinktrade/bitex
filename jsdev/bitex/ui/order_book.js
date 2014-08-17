goog.provide('bitex.ui.OrderBook');
goog.provide('bitex.ui.OrderBook.Side');
goog.provide('bitex.ui.OrderBook.EventType');
goog.provide('bitex.ui.OrderBookEvent');

goog.require('bitex.ui.OrderBook.templates');
goog.require('goog.i18n.NumberFormat');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.object');

goog.require('goog.Timer');
goog.require('bitex.model.OrderBookCurrencyModel');


/**
 * @param {string} username
 * @param {bitex.ui.OrderBook.Side} side
 * @param {bitex.model.OrderBookCurrencyModel} qtyCurrencyDef
 * @param {bitex.model.OrderBookCurrencyModel} priceCurrencyDef
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.OrderBook = function ( username, side, qtyCurrencyDef, priceCurrencyDef , opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;

  this.qtyCurrencyDef_ = qtyCurrencyDef;
  this.priceCurrencyDef_ = priceCurrencyDef;

  this.username_ = username;
  this.side_ = side;
};
goog.inherits( bitex.ui.OrderBook, goog.ui.Component);

/**
 * @enum {string}
 */
bitex.ui.OrderBook.Side = {
  BUY: '0',
  SELL: '1'
};

/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.OrderBook.EventType = {
  CANCEL: 'cancel'
};


/**
 * @type {string}
 * @private
 */
bitex.ui.OrderBook.prototype.username_;


/**
 * @type {bitex.ui.OrderBook.Side}
 * @private
 */
bitex.ui.OrderBook.prototype.side_;

/**
 * @type {bitex.model.OrderBookCurrencyModel}
 * @private
 */
bitex.ui.OrderBook.prototype.qtyCurrencyDef_;

/**
 * @type {bitex.model.OrderBookCurrencyModel}
 * @private
 */
bitex.ui.OrderBook.prototype.priceCurrencyDef_;


/**
 * @type {number}
 * @private
 */
bitex.ui.OrderBook.prototype.blink_delay_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderBook.prototype.bodyEl_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.OrderBook.BASE_CSS_CLASS_ = goog.getCssName('order-book');

bitex.ui.OrderBook.prototype.getBaseCssClass = function() {
  return bitex.ui.OrderBook.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.OrderBook.prototype.createDom = function() {
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

  var title = MSG_ORDER_BOOK_BID_TITLE;
  var columns = [MSG_ORDER_BOOK_BUYER_COLUMN, MSG_ORDER_BOOK_AMOUNT_COLUMN, MSG_ORDER_BOOK_PRICE_COLUMN];

  if (this.side_ == bitex.ui.OrderBook.Side.SELL ) {
    title = MSG_ORDER_BOOK_ASK_TITLE;
    columns = [MSG_ORDER_BOOK_PRICE_COLUMN, MSG_ORDER_BOOK_AMOUNT_COLUMN, MSG_ORDER_BOOK_SELLER_COLUMN];
  }

  var el = goog.soy.renderAsElement(bitex.ui.OrderBook.templates.OrderBook, {
    title: title,
    columns: columns
  });

  this.decorateInternal(el);
};


/** @override */
bitex.ui.OrderBook.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var dom = this.getDomHelper();

  this.bodyEl_ = dom.getElementsByTagNameAndClass('tbody', undefined, element)[0];
};

/** @override */
bitex.ui.OrderBook.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen( this.getElement(), goog.events.EventType.CLICK, this.onClick_ );
};

/**
 * @param {goog.events.Event} e
 */
bitex.ui.OrderBook.prototype.onClick_  = function(e){
  var cxlEl = e.target;
  if (cxlEl.tagName == goog.dom.TagName.A || cxlEl.tagName == goog.dom.TagName.I ) {
    var orderId = cxlEl.getAttribute('data-order-id');
    if ( goog.isDefAndNotNull(orderId)  ) {
      this.dispatchEvent( new bitex.ui.OrderBookEvent (bitex.ui.OrderBook.EventType.CANCEL, orderId) );

      e.preventDefault();
      e.stopPropagation();
    }
  }
};


/**
 *
 * @param {string} type
 * @param {string} orderId
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.OrderBookEvent = function(type, orderId) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.order_id = orderId;
};
goog.inherits(bitex.ui.OrderBookEvent, goog.events.Event);




bitex.ui.OrderBook.prototype.clear  = function(){
  var dom = this.getDomHelper();

  goog.dom.removeChildren(this.bodyEl_);
};


/**
 * @param {number} index
 */
bitex.ui.OrderBook.prototype.deleteOrderThru = function( index) {
  var dom = this.getDomHelper();

  var child;
  while ((child = this.bodyEl_.firstChild) && index>0 ) {
    this.bodyEl_.removeChild(child);
    index--;
  }
};

/**
 * @param {number} index
 */
bitex.ui.OrderBook.prototype.deleteOrder = function( index) {
  var dom = this.getDomHelper();
  var trEl = dom.getChildren(this.bodyEl_ )[index];
  dom.removeNode(trEl );
};

/**
 * @param {number} index
 * @param {number} qty
 */
bitex.ui.OrderBook.prototype.updateOrder = function( index, qty) {
  var dom = this.getDomHelper();
  
  var formatter = new goog.i18n.NumberFormat( this.qtyCurrencyDef_.format, this.qtyCurrencyDef_.code );
  qty = formatter.format(qty);
  
  var trEl = dom.getChildren(this.bodyEl_ )[index];

  var tdQtyEl = dom.getChildren( trEl )[1];
  dom.setTextContent(tdQtyEl, qty);

  var blink_class = 'warning'; //goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( tdQtyEl,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( tdQtyEl,  blink_class );
  }, this.blink_delay_ , this);
};


/**
 * @param {number} index
 * @param {string} id
 * @param {number} price
 * @param {number} qty
 * @param {string} username
 * @param {string} broker
 */
bitex.ui.OrderBook.prototype.insertOrder = function( index, id, price, qty, username, broker ) {
  var dom = this.getDomHelper();

  var formatter = new goog.i18n.NumberFormat( this.qtyCurrencyDef_.format, this.qtyCurrencyDef_.code );
  qty = formatter.format(qty);

  formatter = new goog.i18n.NumberFormat( this.priceCurrencyDef_.format, this.priceCurrencyDef_.code );
  price = formatter.format(price);

  var priceEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'price') , price);
  var qtyEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'qty'), qty);

  var userNameEl;
  if (username === this.username_ || broker === this.username_ ){
    userNameEl = dom.createDom('td', undefined,
                   dom.createDom( 'a', { 'class':'btn-cancel-order text-error', 'href':'', 'data-order-id':id },
                     dom.createDom( 'i', { 'class':'icon-remove', 'style':'line-height: 2px;', 'data-order-id':id}, '  ' + username )));
  } else {
    userNameEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'username'), username);
  }

  var td_list;
  if (this.side_ ==  bitex.ui.OrderBook.Side.BUY) {
    goog.dom.classes.add( userNameEl, goog.getCssName(this.getBaseCssClass(), 'left') );
    goog.dom.classes.add( priceEl   , goog.getCssName(this.getBaseCssClass(), 'right') );

    td_list = [ userNameEl, qtyEl, priceEl ];

  } else {
    goog.dom.classes.add( userNameEl, goog.getCssName(this.getBaseCssClass(), 'right') );
    goog.dom.classes.add( priceEl   , goog.getCssName(this.getBaseCssClass(), 'left') );

    td_list = [ priceEl, qtyEl, userNameEl];
  }

  var tr_properties = {
    'data-order-id':  id,
    'class': goog.getCssName(this.getBaseCssClass(), 'row')
  };

  var rowEl = dom.createDom( 'tr', tr_properties , td_list );
  dom.insertChildAt( this.bodyEl_, rowEl, index );


  var blink_class  = 'warning'; // goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( rowEl,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( rowEl,  blink_class );
  }, this.blink_delay_ , this);
};

