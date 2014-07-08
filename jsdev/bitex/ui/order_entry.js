goog.provide('bitex.ui.OrderEntry');
goog.provide('bitex.ui.OrderEntry.EventType');

goog.require('bitex.ui.order_entry.templates');
goog.require('goog.ui.Component');

goog.require('goog.i18n.NumberFormat');

goog.require('goog.string');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.OrderEntry = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.blink_delay_ = opt_blinkDelay || 700;
  this.order_depth_ = [];
};
goog.inherits(bitex.ui.OrderEntry, goog.ui.Component);


/**
 * @type {number}
 * @private
 */
bitex.ui.OrderEntry.prototype.blink_delay_;

/**
 * @type {.Array<.Array<Object>>}
 * @private
 */
bitex.ui.OrderEntry.prototype.order_depth_;


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.OrderEntry.BASE_CSS_CLASS_ = goog.getCssName('order-entry');


/**
 * @enum {string}
 */
bitex.ui.OrderEntry.EventType = {
  SUBMIT: 'order_entry_submitted'
};

/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.OrderEntry.prototype.getBaseCssClass = function() {
  return bitex.ui.OrderEntry.BASE_CSS_CLASS_;
};

/** @override */
bitex.ui.OrderEntry.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
};

/** @override */
bitex.ui.OrderEntry.prototype.createDom = function() {

  var el = goog.soy.renderAsElement(bitex.ui.order_entry.templates.OrderEntry, {
    id: this.makeId('order_entry'),
    symbol:this.getModel().symbol,
    crypto_currency_symbol:this.getModel().crypto_currency_symbol,
    crypto_currency_description:this.getModel().crypto_currency_description,
    currency_symbol:this.getModel().currency_symbol,
    currency_description:this.getModel().currency_description,
    side:this.getModel().side,
    type:this.getModel().type,
    broker_id:this.getModel().broker_id
  });
  this.setElementInternal( el )
};

/** @override */
bitex.ui.OrderEntry.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var dom  = this.getDomHelper();

  handler.listen(new goog.events.KeyHandler( this.getElement( this.makeId('order_entry_total') ) ),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);

  handler.listen( new goog.events.InputHandler(this.getElement( this.makeId('order_entry_total') )),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeTotal_ );

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntry.prototype.onBlockNonNumberKeys_ = function(e) {
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

      this.onChangeTotal_(e);
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
bitex.ui.OrderEntry.prototype.onChangeTotal_ = function(e) {
  var total = this.getTotal() * 1e8;

  // TODO: Based on the total amount to spend, calculate the amount of bitcoins that will be bought at market
  //       and the average price

  if (!goog.isDefAndNotNull(this.order_depth_)) {
    // TODO: Inform the user that he will have to use the advanced method
    return;
  }

  if (!this.order_depth_.length) {
    // TODO: Inform the user that he will have to use the advanced method
    return;
  }

  // simple math, use the best price
  var amount = total / this.order_depth_[0][0];


  var average_price = total / amount;

  var currency_formatter = new goog.i18n.NumberFormat( this.getModel().currency_format,
                                                       this.getModel().currency_code );
  var crypto_currency_formatter = new goog.i18n.NumberFormat( this.getModel().crypto_currency_format,
                                                              this.getModel().crypto_currency_code );
  var human_average_price = currency_formatter.format(average_price/1e8);
  var human_amount = crypto_currency_formatter.format(amount);

  goog.dom.setTextContent(  goog.dom.getElement( this.makeId('order_entry_avg_price') ), human_average_price );
  goog.dom.setTextContent( goog.dom.getElement( this.makeId('order_entry_amount') ), human_amount );

};

/**
 * @param {.Array<.Array>} order_depth
 */
bitex.ui.OrderEntry.prototype.setOrderDepth = function(order_depth) {
  // order_depth = [ [ price, size, username ], [price, size, username ] ... ]
  this.order_depth_ = order_depth;

  this.onChangeTotal_();
};


/**
 * @return {number|null}
 */
bitex.ui.OrderEntry.prototype.getTotal = function(){
  var inputValue = goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_total')));
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};


/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getSymbol = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_symbol') ));
};

/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getSide = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_side') ));
};


/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getType = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_type') ));
};

/**
 * @return {string}
 */
bitex.ui.OrderEntry.prototype.getBrokerID = function(){
  return goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_broker_id') ));
};


/**
 * @return {number}
 */
bitex.ui.OrderEntry.prototype.getAmount = function(){
  var inputValue = goog.dom.forms.getValue(goog.dom.getElement( this.makeId('order_entry_amount')));
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};

/**
 * @return {number}
 */
bitex.ui.OrderEntry.prototype.getPrice = function(){
  // TODO: max price on the book
  return 0;
};




