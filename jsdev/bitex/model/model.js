goog.provide('bitex.model.Model');


goog.require('goog.structs.Map');
goog.require('goog.array');
goog.require('goog.dom');

goog.require('goog.Timer');
goog.require('goog.dom.classes');

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
  goog.base(this,opt_map, var_args);

  this.element_ = element;
};
goog.inherits(bitex.model.Model, goog.structs.Map);


/**
 * @type {Element}
 */
bitex.model.Model.prototype.element_;


/**
 * Adds a key-value pair to the map.
 * @param {*} key The key.
 * @param {*} value The value to add.
 */
bitex.model.Model.prototype.set = function(key, value) {
  bitex.model.Model.superClass_.set.call(this, key, value);

  var elements = goog.dom.getElementsByClass('bitex-model', this.element_);

  goog.array.forEach( elements, function(el) {
    var model_key = el.getAttribute('data-model-key');
    if (model_key === key) {
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
};

