goog.provide('bitex.ui.AdvancedOrderEntry');
goog.provide('bitex.ui.AdvancedOrderEntry.EventType');
goog.provide('bitex.ui.AdvancedOrderEntry.Side');

goog.require('bitex.ui.AdvancedOrderEntry.templates');
goog.require('goog.ui.Component');

goog.require('goog.i18n.NumberFormat');

goog.require('goog.string');
goog.require('goog.dom.forms');

goog.require('bitex.util');
goog.require('bitex.util.PriceAmountCalculatorVerb');

goog.require('uniform.Uniform');


/**
 * @param {Object} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.AdvancedOrderEntry = function(opt_model, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.setModel(opt_model || {});

  this.uniform_ = new uniform.Uniform( { 'control_holder_class' : 'uniform-control-holder' } );

  this.last_changed_field_ = "amount";
  this.factor_amount_ = 1e8;
  this.factor_price_ = 1e8;
};
goog.inherits(bitex.ui.AdvancedOrderEntry, goog.ui.Component);

/**
 * @type {uniform.Uniform}
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.uniform_;

/**
 * @type {string}
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.last_changed_field_;

/**
 * @type {string}
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.factor_amount_;

/**
 * @type {string}
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.factor_price_;

/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.AdvancedOrderEntry.BASE_CSS_CLASS_ = goog.getCssName('advanced-order-entry');


/**
 * @enum {string}
 */
bitex.ui.AdvancedOrderEntry.EventType = {
  SUBMIT: 'advanced_order_entry_submitted'
};


/**
 * @enum {string}
 */
bitex.ui.AdvancedOrderEntry.Side = {
  BUY: '1',
  SELL: '2'
};


/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.AdvancedOrderEntry.prototype.getBaseCssClass = function() {
  return bitex.ui.AdvancedOrderEntry.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.AdvancedOrderEntry.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.AdvancedOrderEntry.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(bitex.ui.AdvancedOrderEntry.templates.AdvancedOrderEntry, {
    id                        : this.makeId( 'order_entry' ),
    symbol                    : this.getModel().symbol,
    side                      : this.getModel().side,
    type                      : this.getModel().type,
    is_broker                 : this.getModel().is_broker,
    broker_id                 : this.getModel().broker_id,
    amount_currency_symbol    : this.getModel().amount_currency_symbol,
    price_currency_symbol     : this.getModel().price_currency_symbol,
    client_id                 : this.getModel().client_id
  });
  this.setElementInternal(el);
};

/** @override */
bitex.ui.AdvancedOrderEntry.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  this.uniform_.decorate( goog.dom.getElement( this.makeId('order_entry') ) );


  handler.listen( new goog.events.InputHandler( goog.dom.getElement( this.makeId('order_entry_amount') ) ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeAmount_ );
  handler.listen( new goog.events.InputHandler( goog.dom.getElement( this.makeId('order_entry_price')  ) ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangePrice_ );
  handler.listen( new goog.events.InputHandler( goog.dom.getElement( this.makeId('order_entry_total') ) ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeTotal_ );
  handler.listen( new goog.events.InputHandler( goog.dom.getElement( this.makeId('order_entry_client_id') ) ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeClientID_ );

  handler.listen( goog.dom.getElement( this.makeId('order_entry_action') ),
                  goog.events.EventType.CLICK,
                  this.onAction_ );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.onAction_ = function(e) {
  e.preventDefault();

  var error_list = this.uniform_.validate();
  if (error_list.length > 0) {
    e.stopPropagation();
  } else {
    this.dispatchEvent( bitex.ui.AdvancedOrderEntry.EventType.SUBMIT);
  }
};

/**
 * @param {boolean} enabled
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.disableAction_ = function(enabled) {
  if (this.isBrokerMode()) {
    var client_id = this.getClientID();
    if (!goog.isDefAndNotNull(client_id) || goog.string.isEmpty( goog.string.trim(client_id) ) ) {
      goog.dom.getElement( this.makeId('order_entry_action')).disabled = true;
    } else {
      goog.dom.getElement( this.makeId('order_entry_action')).disabled = enabled;
    }
  } else {
    goog.dom.getElement( this.makeId('order_entry_action')).disabled = enabled;
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.onChangeAmount_ = function(e) {
  var total = (this.getPrice() * this.getAmount()) / 1e8;
  this.setTotal(total);

  this.last_changed_field_ = "amount";

  this.disableAction_( this.getTotal()<=0 );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.onChangeTotal_ = function(e) {
  var amount = this.getTotal() / this.getPrice() * 1e8;
  this.setAmount(amount);
  this.last_changed_field_ = "total";

  this.disableAction_( this.getTotal()<=0 );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.onChangePrice_ = function(e) {
  if (this.last_changed_field_ === "amount") {
    var total = (this.getPrice() * this.getAmount()) / 1e8;
    this.setTotal(total);
  } else {
    if (this.getPrice() > 0) {
      var amount = this.getTotal() / this.getPrice() * 1e8;
      this.setAmount(amount);
    }
  }

  this.disableAction_( this.getTotal()<=0 );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.AdvancedOrderEntry.prototype.onChangeClientID_ = function(e) {
  this.disableAction_( this.getTotal()<=0 );
};


/**
 * @param {string} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setAmountCurrencySign = function(value){
  var dom  = this.getDomHelper();
  var elements = dom.getElementsByClass(goog.getCssName(this.getBaseCssClass(), 'amount-sign'), this.getElement());
  goog.array.forEach(elements, function(el){
    goog.dom.setTextContent(el, value);
  });
};

/**
 * @param {string} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setPriceCurrencySign = function(value){
  var dom  = this.getDomHelper();
  var elements = dom.getElementsByClass(goog.getCssName(this.getBaseCssClass(), 'price-sign'), this.getElement());
  goog.array.forEach(elements, function(el){
    goog.dom.setTextContent(el, value);
  });
};


/**
 * @param {boolean} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setBrokerMode = function(value) {
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_is_broker')), value);
  goog.style.showElement( goog.dom.getElement( this.makeId('order_entry_client_id')) , value );
  goog.dom.getElement( this.makeId('order_entry_client_id')).disabled = !value;
};

/**
 * @return {boolean}
 */
bitex.ui.AdvancedOrderEntry.prototype.isBrokerMode = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_is_broker'))) == 'true';
};


/**
 * @return {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.getSymbol = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_symbol')));
};

/**
 * @param {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.setSymbol = function(symbol) {
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_symbol')), symbol);
};

/**
 * @return {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.getSide = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_side')));
};

/**
 * @return {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.getType = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_type')));
};

/**
 * @param {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.setType = function(type){
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_broker_id')), type );
};

/**
 * @return {number}
 */
bitex.ui.AdvancedOrderEntry.prototype.getBrokerID = function(){
  return goog.string.toNumber(goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_broker_id'))));
};

/**
 * @param {number}
 */
bitex.ui.AdvancedOrderEntry.prototype.setBrokerID = function(broker_id){
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_broker_id')), broker_id );
};


/**
 * @return {string}
 */
bitex.ui.AdvancedOrderEntry.prototype.getClientID = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_client_id')));
};

/**
 * @param {number}
    */
bitex.ui.AdvancedOrderEntry.prototype.setClientID = function(client_id){
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_client_id')), client_id );
};



/**
 * @return {number}
 */
bitex.ui.AdvancedOrderEntry.prototype.getPrice = function(){
  var value_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  value_fmt.setMaximumFractionDigits(8);
  value_fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_price'));
  var inputValue = goog.dom.forms.getValue(el);

  var pos = [0];
  var value = value_fmt.parse(inputValue, pos);
  if (pos[0] != inputValue.length || isNaN(value) || value <= 0 ) {
    return 0;
  }
  return parseInt(value * this.factor_price_, 10);
};


/**
 * @param  {number} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setPrice = function(value){
  var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_price'));
  goog.dom.forms.setValue( el, fmt.format(value/this.factor_price_) );
};

/**
 * @return {number}
 */
bitex.ui.AdvancedOrderEntry.prototype.getAmount = function(){
  var value_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  value_fmt.setMaximumFractionDigits(8);
  value_fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_amount'));
  var inputValue = goog.dom.forms.getValue(el);

  var pos = [0];
  var value = value_fmt.parse(inputValue, pos);
  if (pos[0] != inputValue.length || isNaN(value) || value <= 0 ) {
    return 0;
  }
  return parseInt(value * this.factor_amount_, 10);
};

/**
 * @param  {number} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setAmount = function(value){
  var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_amount'));
  goog.dom.forms.setValue( el, fmt.format(value/this.factor_amount_) );
};



/**
 * @return {number}
 */
bitex.ui.AdvancedOrderEntry.prototype.getTotal = function(){
  var value_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  value_fmt.setMaximumFractionDigits(8);
  value_fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_total'));
  var inputValue = goog.dom.forms.getValue(el);

  var pos = [0];
  var value = value_fmt.parse(inputValue, pos);
  if (pos[0] != inputValue.length || isNaN(value) || value <= 0 ) {
    return 0;
  }
  return parseInt(value * this.factor_price_, 10);

};


/**
 * @param  {number} value
 */
bitex.ui.AdvancedOrderEntry.prototype.setTotal = function(value){
  var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  var el  = goog.dom.getElement( this.makeId('order_entry_total'));
  goog.dom.forms.setValue( el, fmt.format(value/this.factor_price_) );
};
