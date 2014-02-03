goog.provide('bitex.ui.OrderManager');
goog.provide('bitex.ui.OrderManager.Status');
goog.provide('bitex.ui.OrderManagerEvent');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('bitex.ui.DataGrid');
goog.require('goog.ui.registry');

goog.require('goog.dom.TagName');


/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.OrderManager = function(opt_blinkDelay, opt_domHelper) {
  var grid_columns = [
    {
      'property': 'OrderID',
      'label': 'ID',
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'order-id'); }
    },{
      'property': 'OrdStatus',
      'label': 'Status',
      'sortable': false,
      'formatter': function(s){ return bitex.ui.OrderManager.Status[s]; },
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'status'); }
    },{
      'property': 'Side',
      'label': 'C/V',
      'sortable': false,
      'formatter': function(s){
        switch(s){
          case '1': return 'C';
          case '2': return 'V';
        }
        return '';
      },
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'side'); }
    },{
      'property': 'OrderQty',
      'label': 'Vol. BTC',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(8);},
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'order-qty'); }
    },{
      'property': 'Price',
      'label': 'Preço R$',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(5);},
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'price'); }
    },{
      'property': 'LeavesQty',
      'label': 'BTC em aberto',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(8);},
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'leaves_qty'); }
    },{
      'property': 'CumQty',
      'label': 'BTC executado',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(8);},
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'cum-qty'); }
    },{
      'property': 'AvgPx',
      'label': 'Preço médio',
      'sortable': false,
      'formatter': function(s){return (s/1e8).toFixed(5);},
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'avg-price'); }
    },{
      'property': 'ClOrdID',
      'label': 'Ações',
      'sortable': false,
      'formatter': function(id, row_set_obj){
        var classes = "icon-remove";
        var attributes = { 'class':classes, 'data-client-order-id': id } ;

        if ( goog.isDefAndNotNull(row_set_obj) ) {
          attributes['data-order-id'] = row_set_obj["OrderID"];
        }

        var i =goog.dom.createDom( 'i', attributes );
        return goog.dom.createDom( 'a', { 'class':"text-error", "href":"#" }, i);
      },
      'classes': function() { return goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'actions'); }
    }
  ];

  this.blink_delay_ = opt_blinkDelay || 700;

  bitex.ui.DataGrid.call(this,  { 'rowClassFn':this.getRowClass, 'columns': grid_columns } , opt_domHelper);
};
goog.inherits(bitex.ui.OrderManager, bitex.ui.DataGrid);

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
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.OrderManager.EventType = {
  CANCEL: 'cancel'
};

/**
 * @type {number}
 * @private
 */
bitex.ui.OrderManager.prototype.blink_delay_;


/**
 * @type {string}
 */
bitex.ui.OrderManager.CSS_CLASS = goog.getCssName('order-manager');

/** @inheritDoc */
bitex.ui.OrderManager.prototype.getCssClass = function() {
  return bitex.ui.OrderManager.CSS_CLASS;
};

/**
 * @param {Object} row_set
 * @return {Array.<string>|string|Object}
 */
bitex.ui.OrderManager.prototype.getRowClass = function(row_set) {
  var status =  row_set['OrdStatus'];

  var class_id = 'client-order-id-' + row_set['ClOrdID'];
  var class_status;
  switch(status) {
    case '-':
      class_status = goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'pending');
      break;
    case '0':
      class_status = goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'new');
      break;
    case '1':
      class_status = goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'partial');
      break;
    case '2':
      class_status = goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'fill');
      break;
    case '4':
      class_status = goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'cancel');
      break;
  }

  return [class_id, class_status];
};

/**
 * @param  {Object} execution_report_msg
 */
bitex.ui.OrderManager.prototype.processExecutionReport = function(execution_report_msg){
  var class_id = 'client-order-id-' + execution_report_msg['ClOrdID'];

  var tr_element = goog.dom.getElementByClass(class_id, this.getElement());

  if (execution_report_msg['LeavesQty'] === 0 ) {
    // Remove order
    if (goog.isDefAndNotNull(tr_element)) {
      goog.dom.removeNode(tr_element);
    }
    return;
  }

  if (goog.isDefAndNotNull(tr_element)) {
    goog.object.forEach(execution_report_msg, function(value,column, obj) {
      var td_element = this.setColumnValue( tr_element, column, value  );
      if (goog.isDefAndNotNull( td_element)) {

        var blink_class = 'warning'; //goog.getCssName(bitex.ui.OrderManager.CSS_CLASS, 'blink');
        goog.dom.classes.add( td_element,  blink_class );
        goog.Timer.callOnce( function(){
          goog.dom.classes.remove( td_element,  blink_class );
        }, this.blink_delay_ , this);

      }
    }, this);

    var current_classes = goog.dom.classes.get(tr_element);
    var new_classes = this.getRowClass( execution_report_msg );

    goog.dom.classes.addRemove( tr_element, current_classes, new_classes );
    return;
  }


  var columns = goog.object.getKeys(execution_report_msg);
  var values = goog.object.getValues(execution_report_msg);

  var tr_elements = this.resultSetToElements( [ values ] , columns );
  goog.dom.insertChildAt(this.table_data_body_el_, tr_elements[0], 0);

  // TODO: call adjustSizes_ if this is the first row inserted
  //this.adjustSizes_(tr_elements[0]);
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
  price      = (price/1e8).toFixed(5);
  leavesQty  = (leavesQty/1e8).toFixed(8);
  var cumQty = (opt_cumQty|0/1e8).toFixed(8);
  var avgPx  = (opt_avgPrice|0/1e8).toFixed(5);
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
      dom.createDom( 'a', { 'class':"text-error", "href":"" }, dom.createDom( 'i', { 'class':"icon-remove" })) )
  );

  dom.appendChild(this.tbody_, tr );
};




/** @inheritDoc */
bitex.ui.OrderManager.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();

  handler.listen(this.getElement(), 'click', function(e){
    var order_id = e.target.getAttribute('data-order-id');
    if (goog.isDefAndNotNull(order_id)) {
      this.dispatchEvent( new bitex.ui.OrderManagerEvent (bitex.ui.OrderManager.EventType.CANCEL, order_id) );
    } else {
      var client_order_id = e.target.getAttribute('data-client-order-id');
      this.dispatchEvent( new bitex.ui.OrderManagerEvent (bitex.ui.OrderManager.EventType.CANCEL, undefined, client_order_id) );
    }
  });
};


/**
 *
 * @param {string} type
 * @param {=string} opt_order_id
 * @param {=string} opt_client_order_id
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.OrderManagerEvent = function(type, opt_order_id, opt_client_order_id) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.order_id = opt_order_id;

  /**
   * @type {string}
   */
  this.client_order_id = opt_client_order_id;

};
goog.inherits(bitex.ui.OrderManagerEvent, goog.events.Event);


goog.ui.registry.setDecoratorByClassName(
    bitex.ui.OrderManager.CSS_CLASS,
    function() {
      return new bitex.ui.OrderManager();
    });
