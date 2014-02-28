goog.provide('bitex.ui.OrderEntryX');
goog.provide('bitex.ui.OrderEntryX.EventType');
goog.provide('bitex.ui.OrderEntryXEvent');

goog.require('goog.dom.forms');

goog.require('goog.ui.Component');
goog.require('goog.events.InputHandler');

goog.require('goog.string');
goog.require('bitex.util');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.OrderEntryX = function(opt_blinkDelay, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.marketPrice_ = 0;
  this.lastChangedField_ = "amount";
};
goog.inherits(bitex.ui.OrderEntryX, goog.ui.Component);


/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.OrderEntryX.BASE_CSS_CLASS_ = goog.getCssName('order-entry');


/**
 * @enum {string}
 */
bitex.ui.OrderEntryX.EventType = {
  SUBMIT: 'order_entry_submitted'
};

/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.OrderEntryX.prototype.getBaseCssClass = function() {
  return bitex.ui.OrderEntryX.BASE_CSS_CLASS_;
};

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.actionButtonEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.amountEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.priceEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.totalEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.feeEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.symbolEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.sideEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.typeEl_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.OrderEntryX.prototype.clientIdEl_;

/**
 * @type {number}
 * @private
 */
bitex.ui.OrderEntryX.prototype.marketPrice_;

/**
 * @type {string}
 * @private
 */
bitex.ui.OrderEntryX.prototype.lastChangedField_;


/** @override */
bitex.ui.OrderEntryX.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var dom  = this.getDomHelper();
  this.symbolEl_       = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'symbol'), this.getElement());
  this.sideEl_         = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'side'), this.getElement());
  this.typeEl_         = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'type'), this.getElement());
  this.actionButtonEl_ = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'action'), this.getElement());
  this.amountEl_       = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'amount'), this.getElement());
  this.priceEl_        = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'price'), this.getElement());
  this.totalEl_        = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'total'), this.getElement());
  this.feeEl_          = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'fee'), this.getElement());
  this.clientIdEl_     = dom.getElementByClass(goog.getCssName(this.getBaseCssClass(), 'client-id'), this.getElement());
};


/** @override */
bitex.ui.OrderEntryX.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  console.log('bitex.ui.OrderEntryX.prototype.enterDocument');

  var handler = this.getHandler();
  var dom  = this.getDomHelper();


  handler.listen(new goog.events.KeyHandler(this.amountEl_),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);
  handler.listen(new goog.events.KeyHandler(this.priceEl_),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);
  handler.listen(new goog.events.KeyHandler(this.totalEl_),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);
  handler.listen(new goog.events.KeyHandler(this.feeEl_),
                 goog.events.KeyHandler.EventType.KEY,
                 this.onBlockNonNumberKeys_);


  handler.listen( new goog.events.InputHandler(this.amountEl_),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeAmount_ );

  handler.listen( new goog.events.InputHandler(this.priceEl_),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangePrice_ );

  handler.listen( new goog.events.InputHandler(this.totalEl_),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeTotal_ );

  handler.listen( new goog.events.InputHandler(this.feeEl_),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeFee_ );


  handler.listen(this.actionButtonEl_, goog.events.EventType.CLICK, this.onAction_ );
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntryX.prototype.onBlockNonNumberKeys_ = function(e) {
  console.log('bitex.ui.OrderEntryX.prototype.onBlockNonNumberKeys_');

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

      switch( e.target) {
        case this.amountEl_:
          this.onChangeAmount_(e);
          break;
        case this.priceEl_:
          this.onChangePrice_(e);
          break;
        case this.totalEl_:
          this.onChangeTotal_(e);
          break;
        case this.feeEl_:
          this.onChangeFee_(e);
          break;
      }

      e.preventDefault();
    }
  }

  if (e.ctrlKey ||
      !e.shiftKey && e.keyCode >= goog.events.KeyCodes.ZERO &&
          e.keyCode <= goog.events.KeyCodes.NINE ||
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
 * @return {string}
 */
bitex.ui.OrderEntryX.prototype.getSymbol = function(){
  return goog.dom.forms.getValue(this.symbolEl_);
};

/**
 * @return {string}
 */
bitex.ui.OrderEntryX.prototype.getSide = function(){
  return goog.dom.forms.getValue(this.sideEl_);
};

/**
 * @param {string} value
 */
bitex.ui.OrderEntryX.prototype.setSymbol = function(value){
  goog.dom.forms.setValue(this.symbolEl_, value);
};



/**
 * @param {string} value
 */
bitex.ui.OrderEntryX.prototype.setAmountCurrencySign = function(value){
  var dom  = this.getDomHelper();
  var elements = dom.getElementsByClass(goog.getCssName(this.getBaseCssClass(), 'amount-sign'), this.getElement());
  goog.array.forEach(elements, function(el){
    goog.dom.setTextContent(el, value);
  });
};


/**
 * @param {string} value
 */
bitex.ui.OrderEntryX.prototype.setPriceCurrencySign = function(value){
  var dom  = this.getDomHelper();
  var elements = dom.getElementsByClass(goog.getCssName(this.getBaseCssClass(), 'price-sign'), this.getElement());
  goog.array.forEach(elements, function(el){
    goog.dom.setTextContent(el, value);
  });
};


/**
 * @return {string}
 */
bitex.ui.OrderEntryX.prototype.getClientID = function(){
  return goog.dom.forms.getValue(this.clientIdEl_);
};

/**
 * @param {string} value
 */
bitex.ui.OrderEntryX.prototype.setClientID = function(value){
  goog.dom.forms.setValue(this.clientIdEl_, value);
};



/**
 * @return {number}
 */
bitex.ui.OrderEntryX.prototype.getAmount = function(){
  var inputValue = goog.dom.forms.getValue(this.amountEl_);
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};

/**
 * @param {number} value
 */
bitex.ui.OrderEntryX.prototype.setAmount = function(value){
  if (!goog.isNumber(value)) {
    return;
  }

  goog.dom.forms.setValue(this.amountEl_, value);
};


/**
 * @return {number}
 */
bitex.ui.OrderEntryX.prototype.getPrice = function(){
  var inputValue = goog.dom.forms.getValue(this.priceEl_);
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};

/**
 * @param {number} value
 */
bitex.ui.OrderEntryX.prototype.setPrice = function(value){
  if (!goog.isNumber(value)) {
    return;
  }

  goog.dom.forms.setValue(this.priceEl_, value);
};


/**
 * @return {number}
 */
bitex.ui.OrderEntryX.prototype.getTotal = function(){
  var inputValue = goog.dom.forms.getValue(this.totalEl_);
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};

/**
 * @param {number} value
 */
bitex.ui.OrderEntryX.prototype.setTotal = function(value){
  if (!goog.isNumber(value)) {
    return;
  }

  goog.dom.forms.setValue(this.totalEl_, value);
};


/**
 * @return {number}
 */
bitex.ui.OrderEntryX.prototype.getFee = function(){
  var inputValue = goog.dom.forms.getValue(this.feeEl_);
  var res = goog.string.toNumber(inputValue);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};

/**
 * @param {number} value
 */
bitex.ui.OrderEntryX.prototype.setFee = function(value){
  if (!goog.isNumber(value)) {
    return;
  }

  goog.dom.forms.setValue(this.feeEl_, value);
};


/**
 * @return {number}
 */
bitex.ui.OrderEntryX.prototype.getMarketPrice = function(){
  var res = goog.string.toNumber(this.marketPrice_);
  if (isNaN(res)) {
    res = 0;
  }
  return res;
};


/**
 * @param {number} value
 */
bitex.ui.OrderEntryX.prototype.setMarketPrice = function(value) {
  if (!goog.isNumber(value)) {
    return;
  }

  if (this.getMarketPrice() === this.getPrice() ) {
    this.setPrice(this.marketPrice_);
  }
  this.marketPrice_ = value;
};

/**
 * @param {boolean} value
 */
bitex.ui.OrderEntryX.prototype.setBrokerMode = function(value) {
  goog.style.showElement(this.clientIdEl_, value );
};




/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntryX.prototype.onChangeAmount_ = function(e) {
  var total = (this.getPrice() * (this.getAmount() + this.getFee() ));
  this.setTotal(total);
  this.lastChangedField_ = "amount";


  this.actionButtonEl_.disabled = this.getTotal()<=0;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntryX.prototype.onChangePrice_ = function(e) {
  if (this.lastChangedField_ === "amount") {
    var total = (this.getPrice() * (this.getAmount() + this.getFee() ));
    this.setTotal(total);
  } else {
    if (this.getPrice() > 0) {
      var amount = (this.getTotal() / this.getPrice()) - this.getFee();
      this.setAmount(amount);
    }
  }

  this.actionButtonEl_.disabled = this.getTotal()<=0;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntryX.prototype.onChangeTotal_ = function(e) {
  var amount = (this.getTotal() / this.getPrice()) - this.getFee();
  this.setAmount(amount);
  this.lastChangedField_ = "total";

  this.actionButtonEl_.disabled = this.getTotal()<=0;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.OrderEntryX.prototype.onChangeFee_ = function(e) {
  if (this.lastChangedField_ === "amount") {
    var total = (this.getPrice() * (this.getAmount() + this.getFee() ));
    this.setTotal(total);
  } else {
    if (this.getPrice() > 0) {
      var amount = (this.getTotal() / this.getPrice()) - this.getFee();
      this.setAmount(amount);
    }
  }

  this.actionButtonEl_.disabled = this.getTotal()<=0;
};


/**
 * @param {goog.events.Event} e
 */
bitex.ui.OrderEntryX.prototype.onAction_ = function(e) {
  // TODO: Validate all the fields

  if (this.getTotal() > 0) {
    this.dispatchEvent(bitex.ui.OrderEntryX.EventType.SUBMIT );
  }
};



/**
 *
 * @param {string} type
 * @param {string} symbol
 * @param {number} qty
 * @param {number} price
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.OrderEntryXEvent = function(type, symbol, qty, price) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.symbol = symbol;

  /**
   * @type {number}
   */
  this.qty = qty;

  /**
   * @type {number}
   */
  this.price = price;


};
goog.inherits(bitex.ui.OrderEntryXEvent, goog.events.Event);

