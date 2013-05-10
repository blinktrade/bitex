goog.provide('bitex.ui.OrderManager');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.OrderManager = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(bitex.ui.OrderManager, goog.ui.Component);

/**
 * @type {Element}
 */
bitex.ui.OrderManager.prototype.tbody_ ;

/**
 * @enum {string}
 */
bitex.ui.OrderManager.Status = {
  '-': 'pendente',
  '0': 'nova',
  '1': 'exec. parcial',
  '2': 'executada',
  '4': 'cancelada'
};

/**
 * @type {string}
 */
bitex.ui.OrderManager.CSS_CLASS = goog.getCssName('order-manager');

/** @inheritDoc */
bitex.ui.OrderManager.prototype.getCssClass = function() {
  return bitex.ui.OrderManager.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.OrderManager.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  var dom = this.getDomHelper();


  this.tbody_ = goog.dom.getElementsByTagNameAndClass( goog.dom.TagName.TBODY,
                                                       undefined,
                                                       this.getElement())[0];

  return element;
};

/**
 *
 * @param {string} clientOrderId
 * @param {string} status
 * @param {string} side
 * @param {number} orderQty
 * @param {number} price
 * @param {number} leavesQty
 * @param {number} opt_cumQty
 * @param {number} opt_avgPrice
 * @param {string=} opt_orderId
 */
bitex.ui.OrderManager.prototype.insertOrder = function(clientOrderId,
                                                       status,
                                                       side,
                                                       orderQty,
                                                       price,
                                                       leavesQty,
                                                       opt_cumQty,
                                                       opt_avgPrice,
                                                       opt_orderId) {


  var tr_element_id = 'client_order_id_' + clientOrderId;

  var status_class;
  switch( status) {
    case '-':
      status_class = goog.getCssName(this.getCssClass(), 'pending' );
      break;
    case '0':
      status_class = goog.getCssName(this.getCssClass(), 'new' );
      break;
    case '1':
      status_class = goog.getCssName(this.getCssClass(), 'partial' );
      break;
    case '2':
      status_class = goog.getCssName(this.getCssClass(), 'fill' );
      break;
    case '4':
      status_class = goog.getCssName(this.getCssClass(), 'cancel' );
      break;
  }

  var tr_attributes = {
    'id': tr_element_id,
    'class': status_class
  };


  // Let's update the order
  orderQty   = (orderQty/1e8).toFixed(8);
  price      = (price/1e5).toFixed(5);
  leavesQty  = (leavesQty/1e8).toFixed(8);
  var cumQty = (opt_cumQty|0/1e8).toFixed(8);
  var avgPx  = (opt_avgPrice|0/1e5).toFixed(5);
  var orderId = opt_orderId|'';

  var status_desc = bitex.ui.OrderManager.Status[status];

  var dom = this.getDomHelper();
  var tr = dom.createDom( 'tr', tr_attributes ,
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'id' ),      ''+  orderId  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'status' ),  ''+  status_desc  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'side' ),    ''+  side  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'order-qty' ),''+ orderQty  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'price' ),    ''+price  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'leaves-qty' ),''+ leavesQty  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'cum-qty' ), ''+ cumQty  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'avg-px' ),  ''+avgPx  ),
    dom.createDom('td', goog.getCssName(this.getCssClass(), 'actions' ),
      dom.createDom('button' , ['btn', 'btn-mini','btn-danger'], 'Cancelar'))
  );

  dom.appendChild(this.tbody_, tr );
};


/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
bitex.ui.OrderManager.prototype.logger_ =
    goog.debug.Logger.getLogger('bitex.ui.OrderManager');


/** @inheritDoc */
bitex.ui.OrderManager.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
};


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.OrderManager.CSS_CLASS,
    function() {
      return new bitex.ui.OrderManager();
    });
