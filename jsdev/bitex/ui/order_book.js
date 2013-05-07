goog.provide('bitex.ui.OrderBook');
goog.provide('bitex.ui.OrderBook.Side');

goog.require('goog.ui.Component');
goog.require('goog.dom.classes');

goog.require('goog.Timer');

/**
 * @param {string} username
 * @param {bitex.ui.OrderBook.Side} side
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.OrderBook = function ( username, side, opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;

  this.username_ = username;
  this.side_ = side;
};
goog.inherits( bitex.ui.OrderBook, goog.ui.Component);

/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.OrderBook.Side = {
  BUY: '0',
  SELL: '1'
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
bitex.ui.OrderBook.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var dom = this.getDomHelper();

  this.bodyEl_ = dom.getElementsByTagNameAndClass('tbody', undefined, element)[0];

};


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

  var trEl = dom.getChildren(this.bodyEl_ )[index];

  var tdQtyEl = dom.getChildren( trEl )[1];
  dom.setTextContent(tdQtyEl, qty);

  var blink_class = goog.getCssName(this.getBaseCssClass(), 'blink');
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
 */
bitex.ui.OrderBook.prototype.insertOrder = function( index, id, price, qty, username ) {
  var dom = this.getDomHelper();

  var priceEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'price') , price);
  var qtyEl = dom.createDom( 'td', goog.getCssName(this.getBaseCssClass(), 'qty'), qty);

  var userNameEl;
  if (username === this.username_) {
    var td_column_properties = {
      'data-order-id':  id,
      'class': 'btn btn-mini btn-danger btn-cancel-order'
    };

    userNameEl = dom.createDom('td', undefined,
                   dom.createDom( 'button', td_column_properties , 'Cancelar'));
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


  var blink_class = goog.getCssName(this.getBaseCssClass(), 'blink');
  goog.dom.classes.add( rowEl,  blink_class );

  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( rowEl,  blink_class );
  }, this.blink_delay_ , this);
};

