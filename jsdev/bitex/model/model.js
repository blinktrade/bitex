goog.provide('bitex.model.Model');
goog.provide('bitex.model.Model.EventType');
goog.provide('bitex.model.ModelEvent');
goog.provide('bitex.model.OrderBookCurrencyModel');
goog.provide('bitex.model.OrderBookInstrumentModel');


goog.require('goog.structs.Map');
goog.require('goog.events.EventTarget');
goog.require('goog.array');
goog.require('goog.dom');

goog.require('goog.Timer');
goog.require('goog.dom.classes');


/**
 * @typedef {{ code:String, format:String, description:String, sign:String, pip:number, is_crypto:Boolean  }}
 */
bitex.model.OrderBookCurrencyModel;

/**
 * @typedef {{ symbol:String, currency:String, description:String }}
 */
bitex.model.OrderBookInstrumentModel;


/**
 * @param {Element} element
 * @param {*=} opt_map Map or Object to initialize the map with.
 * @param {...*} var_args If 2 or more arguments are present then they
 *     will be used as key-value pairs.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.model.Model = function(element, opt_map, var_args){
  this.element_ = element;

  this.map_ = new goog.structs.Map(opt_map, var_args);

};
goog.inherits(bitex.model.Model, goog.events.EventTarget);


/**
 * @type {Element}
 */
bitex.model.Model.prototype.element_;


/**
 * @type {goog.structs.Map}
 * @private
 */
bitex.model.Model.prototype.map_;


/**
 * Common events fired by Applications
 * @enum {string}
 */
bitex.model.Model.EventType = {
  /** dispatched after set */
  SET: 'model_set'
};



/**
 * Returns the value for the given key.  If the key is not found and the default
 * value is not given this will return {@code undefined}.
 * @param {*} key The key to get the value for.
 * @param {*=} opt_val The value to return if no item is found for the given
 *     key, defaults to undefined.
 * @return {*} The value for the given key.
 */
bitex.model.Model.prototype.get = function(key, opt_val) {
  return this.map_.get(key, opt_val);
};


bitex.model.Model.prototype.updateDom = function() {

  var elements = goog.dom.getElementsByClass('bitex-model', this.element_);

  goog.array.forEach( elements, function(el) {
    var model_key = el.getAttribute('data-model-key');
    if (goog.isDefAndNotNull(model_key)) {
      var current_value = goog.dom.getTextContent(el);

      var value = this.get(model_key);
      if (current_value !== value) {
        goog.dom.setTextContent( el, value );
      }
    }
  }, this);
};

/**
 * Adds a key-value pair to the map.
 * @param {*} key The key.
 * @param {*} value The value to add.
 */
bitex.model.Model.prototype.set = function(key, value) {
  var old_value = this.map_.get(key);
  this.map_.set(key, value);

  var elements = goog.dom.getElementsByClass('bitex-model', this.element_);
  goog.array.forEach( elements, function(el) {
    var model_key = el.getAttribute('data-model-key');
    if (model_key === key) {
      // TODO: make sure this also works with value attribute
      var current_value = goog.dom.getTextContent(el);

      if (current_value !== value) {

        goog.dom.setTextContent( el, value );

        var blink_class = el.getAttribute('data-blink-class');
        if (goog.isDefAndNotNull(blink_class)) {
          var blink_delay = el.getAttribute('data-blink-delay') || 700;
          blink_delay = parseInt(blink_delay, 10);

          goog.dom.classes.add( el,  blink_class );
          goog.Timer.callOnce( function(){
            goog.dom.classes.remove( el,  blink_class );
          }, blink_delay , this);

        }
      }
    }
  });

  this.dispatchEvent( new bitex.model.ModelEvent(
      bitex.model.Model.EventType.SET + key,
      key,
      value,
      old_value));

  this.dispatchEvent( new bitex.model.ModelEvent(
      bitex.model.Model.EventType.SET,
      key,
      value,
      old_value));

};



/**
 *
 * @param {string} type
 * @param {string} key
 * @param {Object|string|number|boolean} data
 * @constructor
 * @extends {goog.events.Event}
 */
bitex.model.ModelEvent = function( type, key, data, old_data){
  goog.events.Event.call(this, type);

  /** @type {string} */
  this.key = key;

  /** @type {Object|string|number|boolean} */
  this.data = data;

  /** @type {Object|string|number|boolean} */
  this.old_data = old_data;

};
goog.inherits(bitex.model.ModelEvent, goog.events.Event);

