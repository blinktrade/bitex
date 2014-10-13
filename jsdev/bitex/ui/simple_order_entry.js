goog.provide('bitex.ui.SimpleOrderEntry');
goog.provide('bitex.ui.SimpleOrderEntry.EventType');
goog.provide('bitex.ui.SimpleOrderEntry.Side');

goog.require('bitex.ui.SimpleOrderEntry.templates');
goog.require('goog.ui.Component');

goog.require('goog.i18n.NumberFormat');

goog.require('goog.string');
goog.require('bitex.util');
goog.require('bitex.util.PriceAmountCalculatorVerb');

goog.require('uniform.Uniform');


/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.SimpleOrderEntry = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.order_depth_ = [];
  this.uniform_ = new uniform.Uniform( { 'control_holder_class' : 'uniform-control-holder' } );
};
goog.inherits(bitex.ui.SimpleOrderEntry, goog.ui.Component);

/**
 * @type {uniform.Uniform}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.uniform_;


/**
 * @type {.Array<.Array<Object>>}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.order_depth_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.qty_element_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.total_element_;

/**
 * @type {string}
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.last_changed_field_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.SimpleOrderEntry.BASE_CSS_CLASS_ = goog.getCssName('simple-order-entry');


/**
 * @enum {string}
 */
bitex.ui.SimpleOrderEntry.EventType = {
  SUBMIT: 'simple_order_entry_submitted'
};


/**
 * @enum {string}
 */
bitex.ui.SimpleOrderEntry.Side = {
  BUY: '1',
  SELL: '2'
};

/**
 * @enum {number}
 */
bitex.ui.SimpleOrderEntry.OrderDepthIndex = {
  PRICE: 0,
  SIZE: 1,
  USERNAME: 2
};


/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.SimpleOrderEntry.prototype.getBaseCssClass = function() {
  return bitex.ui.SimpleOrderEntry.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.SimpleOrderEntry.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.SimpleOrderEntry.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(bitex.ui.SimpleOrderEntry.templates.SimpleOrderEntry, {
    id: this.makeId('order_entry'),
    symbol:this.getModel().symbol,
    crypto_currency_symbol:this.getModel().crypto_currency_symbol,
    cryptocurrencydescription:this.getModel().crypto_currency_description,
    currency_symbol:this.getModel().currency_symbol,
    currency_description:this.getModel().currency_description,
    side:this.getModel().side,
    type:this.getModel().type,
    broker_id:this.getModel().broker_id,
    formatted_fee: this.getModel().formatted_fee,
    client_id:this.getModel().client_id
  });
  this.setElementInternal(el);
};

/** @override */
bitex.ui.SimpleOrderEntry.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  this.uniform_.decorate( goog.dom.getElement( this.makeId('order_entry') ) );

  this.qty_element_ = goog.dom.getElement( this.makeId('order_entry_qty') );
  this.total_element_ = goog.dom.getElement( this.makeId('order_entry_total') );
  /*
  handler.listen(new goog.events.KeyHandler( this.total_element_ ),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);
  handler.listen(new goog.events.KeyHandler( this.qty_element_ ),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);
  */

  handler.listen( new goog.events.InputHandler( this.total_element_ ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeTotal_ );
  handler.listen( new goog.events.InputHandler( this.qty_element_ ),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeQty_ );


  handler.listen( goog.dom.getElement( this.makeId('order_entry_action_simple') ),
                  goog.events.EventType.CLICK,
                  this.onActionSimple_ );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.onBlockNonNumberKeys_ = function(e) {
  var inputEl = e.target;
  var inputValue = goog.dom.forms.getValue(inputEl);

  if (!goog.events.KeyCodes.isTextModifyingKeyEvent(e)) {
    if (e.keyCode == goog.events.KeyCodes.UP  || e.keyCode == goog.events.KeyCodes.DOWN ) {
      var value_to_change;
      var startPos = inputEl.selectionStart;
      var endPos = inputEl.selectionEnd;
      if (startPos === endPos && startPos === 0) {
        value_to_change = inputValue;
        endPos = inputValue.length;
      } else {
        if (inputValue.substr(startPos-1,1) === '.') {
          --endPos;
        }
        startPos = 0;
        value_to_change = inputValue.substr(0,endPos);
      }
      var number_of_decimal_places = bitex.util.decimalPlaces(value_to_change);
      var value_to_add = 1 / Math.pow(10,number_of_decimal_places);
      value_to_change = goog.string.toNumber(value_to_change);
      if (isNaN(value_to_change)) {
        return;
      }

      var new_value;
      if  (e.keyCode == goog.events.KeyCodes.UP) {
        new_value = (value_to_change + value_to_add);
      } else {
        new_value = (value_to_change - value_to_add);
      }
      new_value = (Math.round(new_value * Math.pow(10,number_of_decimal_places)) / Math.pow(10,number_of_decimal_places)).toFixed(number_of_decimal_places);
      new_value = '' +  new_value + inputValue.substr(endPos);

      if (goog.string.toNumber(new_value) < 0 ) {
        new_value = 0;
        new_value = new_value.toFixed(number_of_decimal_places)
      }

      var originalStartPos = inputEl.selectionStart;
      var originalEndPos = inputEl.selectionEnd;
      goog.dom.forms.setValue(inputEl, new_value);

      if (inputValue.length == new_value.length ) {
        inputEl.selectionStart = originalStartPos;
        inputEl.selectionEnd = originalEndPos;
      } else if (inputValue.length > new_value.length ) {
        inputEl.selectionStart = originalStartPos-1;
        inputEl.selectionEnd = originalEndPos-1;
      } else {
        inputEl.selectionStart = originalStartPos+1;
        inputEl.selectionEnd = originalEndPos+1;
      }

      if (e.target == this.qty_element_) {
        this.onChangeQty_(e);
      } else if (e.target == this.total_element_ ) {
        this.onChangeTotal_(e);
      }
      e.preventDefault();
    }
  }

  if (e.ctrlKey ||
      !e.shiftKey && (
          (e.keyCode >= goog.events.KeyCodes.ZERO && e.keyCode <= goog.events.KeyCodes.NINE) ||
              (e.keyCode >= goog.events.KeyCodes.NUM_ZERO && e.keyCode <= goog.events.KeyCodes.NUM_NINE ) ) ||
      !goog.events.KeyCodes.isTextModifyingKeyEvent(e)) {
    return;
  }

  switch (e.keyCode) {
    // Allow these
    case goog.events.KeyCodes.DELETE:
    case goog.events.KeyCodes.BACKSPACE:
    case goog.events.KeyCodes.TAB:
      return;

    case goog.events.KeyCodes.NUM_PERIOD:
    case goog.events.KeyCodes.PERIOD: {
      inputEl = e.target;
      inputValue = goog.dom.forms.getValue(inputEl);
      if (inputValue.indexOf('.') < 0) {
        return;
      }
    }
  }

  // prevent default for the rest
  e.preventDefault();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.onActionSimple_ = function(e) {
  e.preventDefault();

  var error_list = this.uniform_.validate();
  if (error_list.length > 0) {
    e.stopPropagation();
  } else {
    this.dispatchEvent( bitex.ui.SimpleOrderEntry.EventType.SUBMIT);
  }
};

bitex.ui.SimpleOrderEntry.prototype.disableActions_ = function(enabled) {
  var action_button = new goog.ui.Button();
  action_button.decorate(goog.dom.getElement( this.makeId('order_entry_action_simple')));
  action_button.setEnabled(enabled);

  if ( enabled ) {
      goog.dom.setTextContent(  goog.dom.getElement( this.makeId('order_entry_avg_price') ), "" );
  }
  else {
      /**
       * @desc no orders available to provide market liquidity ( simple order entry )
      */
      var MSG_NO_LIQUIDITY_ERROR = goog.getMsg('  ** No liquidity to complete this transaction **');

      goog.dom.setTextContent(  goog.dom.getElement( this.makeId('order_entry_avg_price') ), MSG_NO_LIQUIDITY_ERROR );
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.onChangeQty_ = function(e) {
  this.last_changed_field_ = 'qty';

  this.disableActions_(true);

  if (!goog.isDefAndNotNull(this.order_depth_)) {
    this.disableActions_(false);
    return;
  }

  if (!this.order_depth_.length) {
    this.disableActions_(false);
    return;
  }

  var value_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  value_fmt.setMaximumFractionDigits(8);
  value_fmt.setMinimumFractionDigits(2);

  var form_values = this.uniform_.getAsJSON();
  var pos = [0];
  var value = value_fmt.parse(form_values['qty'], pos);
  if (pos[0] != form_values['qty'].length || isNaN(value) || value <= 0 ) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
  value = value * 1e8;


  var price_amount_fee;
  price_amount_fee = bitex.util.calculatePriceAmountAndFee( value,
                                                            bitex.util.PriceAmountCalculatorVerb.GET,
                                                            this.order_depth_,
                                                            this.getModel().username,
                                                            this.getModel().fee);

  if (!goog.isDefAndNotNull(price_amount_fee)) {
    this.disableActions_(false);
    return;
  }
  this.getModel().price = price_amount_fee[0];
  this.getModel().amount = value;

  var order_fee =  price_amount_fee[2];
  var vwap = price_amount_fee[3];

  var currency_formatter = new goog.i18n.NumberFormat( this.getModel().currency_format,
                                                       this.getModel().currency_code );
  currency_formatter.setMaximumFractionDigits(8);
  currency_formatter.setMinimumFractionDigits(2);


  var crypto_currency_formatter = new goog.i18n.NumberFormat( this.getModel().crypto_currency_format,
                                                              this.getModel().crypto_currency_code );
  crypto_currency_formatter.setMaximumFractionDigits(8);
  crypto_currency_formatter.setMinimumFractionDigits(2);

  goog.dom.forms.setValue( this.total_element_, currency_formatter.format(price_amount_fee[1]/1e8) );


  var formatted_fee = crypto_currency_formatter.format(order_fee/1e8);
  goog.dom.setTextContent( goog.dom.getElement( this.makeId('order_entry_fee') ), formatted_fee );

  var human_average_price = currency_formatter.format(vwap);
  if (this.getModel().side == bitex.ui.SimpleOrderEntry.Side.SELL) {
    human_average_price = crypto_currency_formatter.format(vwap);
  }
  goog.dom.setTextContent(  goog.dom.getElement( this.makeId('order_entry_avg_price') ), human_average_price );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.SimpleOrderEntry.prototype.onChangeTotal_ = function(e) {
  this.last_changed_field_ = 'total';

  this.disableActions_(true);

  if (!goog.isDefAndNotNull(this.order_depth_)) {
    this.disableActions_(false);
    return;
  }

  if (!this.order_depth_.length) {
    this.disableActions_(false);
    return;
  }

  var value_fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  value_fmt.setMaximumFractionDigits(8);
  value_fmt.setMinimumFractionDigits(2);

  var form_values = this.uniform_.getAsJSON();
  var pos = [0];
  var value = value_fmt.parse(form_values['total'], pos);
  if (pos[0] != form_values['total'].length || isNaN(value) || value <= 0 ) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
  value = value * 1e8;

  var price_amount_fee;
  price_amount_fee = bitex.util.calculatePriceAmountAndFee(value,
                                                           bitex.util.PriceAmountCalculatorVerb.SPEND,
                                                           this.order_depth_ ,
                                                           this.getModel().username,
                                                           this.getModel().fee);

  if (!goog.isDefAndNotNull(price_amount_fee)) {
    this.disableActions_(false);
    return;
  }
  this.getModel().price = price_amount_fee[0];
  this.getModel().amount = price_amount_fee[1];
  var order_fee =  price_amount_fee[2];
  var vwap = price_amount_fee[3];

  var spend_formatter;
  var receive_formatter;
  if (this.getModel().side == bitex.ui.SimpleOrderEntry.Side.BUY) {
    spend_formatter = new goog.i18n.NumberFormat( this.getModel().currency_format,
                                                  this.getModel().currency_code );

    receive_formatter = new goog.i18n.NumberFormat( this.getModel().crypto_currency_format,
                                                    this.getModel().crypto_currency_code );
  } else {
    spend_formatter = new goog.i18n.NumberFormat( this.getModel().crypto_currency_format ,
                                                  this.getModel().crypto_currency_code);

    receive_formatter = new goog.i18n.NumberFormat( this.getModel().currency_format,
                                                    this.getModel().currency_code );
  }
  spend_formatter.setMaximumFractionDigits(8);
  receive_formatter.setMinimumFractionDigits(2);


  goog.dom.forms.setValue( this.qty_element_, value_fmt.format(this.getModel().amount/1e8) );

  var formatted_fee = spend_formatter.format(order_fee/1e8);
  goog.dom.setTextContent( goog.dom.getElement( this.makeId('order_entry_fee') ), formatted_fee );

  var human_average_price = spend_formatter.format(vwap);
  if (this.getModel().side == bitex.ui.SimpleOrderEntry.Side.SELL) {
    human_average_price = receive_formatter.format(vwap);
  }
  goog.dom.setTextContent(  goog.dom.getElement( this.makeId('order_entry_avg_price') ), human_average_price );
};

/**
 * @param {.Array<.Array>} order_depth
 */
bitex.ui.SimpleOrderEntry.prototype.setOrderDepth = function(order_depth) {
  this.order_depth_ = order_depth;

  if (this.last_changed_field_ == 'total') {
    this.onChangeTotal_();
  } else if (this.last_changed_field_ == 'qty') {
    this.onChangeQty_();
  }
};

/**
 * @return {string}
 */
bitex.ui.SimpleOrderEntry.prototype.getSymbol = function(){
  return this.getModel().symbol;
};

/**
 * @return {string}
 */
bitex.ui.SimpleOrderEntry.prototype.getSide = function(){
  return this.getModel().side;
};


/**
 * @return {string}
 */
bitex.ui.SimpleOrderEntry.prototype.getType = function(){
  return this.getModel().type;
};

/**
 * @return {number}
 */
bitex.ui.SimpleOrderEntry.prototype.getBrokerID = function(){
  return this.getModel().broker_id;
};

/**
 * @param {number}
 */
bitex.ui.SimpleOrderEntry.prototype.setBrokerID = function(broker_id){
  this.getModel().broker_id = broker_id;
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_broker_id')));
};


/**
 * @return {number}
 */
bitex.ui.SimpleOrderEntry.prototype.getClientID = function(){
  return this.getModel().client_id;
};

/**
 * @param {number}
    */
bitex.ui.SimpleOrderEntry.prototype.setClientID = function(client_id){
  this.getModel().client_id = client_id;
  goog.dom.forms.setValue(goog.dom.getElement( this.makeId('order_entry_client_id')));
};


/**
 * @return {number}
 */
bitex.ui.SimpleOrderEntry.prototype.getPrice = function(){
  return this.getModel().price;
};

/**
 * @return {number}
 */
bitex.ui.SimpleOrderEntry.prototype.getAmount = function(){
  return this.getModel().amount;
};


