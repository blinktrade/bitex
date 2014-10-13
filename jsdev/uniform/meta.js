goog.provide('uniform.Meta');

goog.require('uniform.util');
goog.require('goog.structs.Map');
goog.require('goog.array');
goog.require('goog.dom.forms');

/**
 * @constructor
 */
uniform.Meta = function() {
  this.metaMap_ = new goog.structs.Map();


  this.metaMap_.set('display', this.display_);
  this.metaMap_.set('enable' , this.enable_);
  this.metaMap_.set('disable', this.disable_);
  this.metaMap_.set('hide'   , this.hide_);
  this.metaMap_.set('assign' , this.assign_);
};
goog.addSingletonGetter(uniform.Meta);

/**
 * @type {goog.structs.Map}
 */
uniform.Meta.prototype.metaMap_ = null;

/**
 * @param {string} className   CSS class name
 * @param {Array.<number,uniform.MetaFunction>} metaFn
 */
uniform.Meta.prototype.registerMetaFn = function(className,
                                                               metaFn){
  this.metaMap_.set(className,metaFn);
};


/**
 * @type {Element}
 */ 
uniform.Meta.prototype.runMeta = function(formElement) {
  uniform.util.executeFormMetaTags(formElement,
      'data-uniform-meta', this.metaMap_);
};

/**
 * @param {Element} el
 * @param {string} condition
 */
uniform.Meta.prototype.disable_ = function(el, condition) {
  if (eval(condition)) {
    el.disabled = true;
  } else {
    el.disabled = false;
  }
};


/**
 * @param {Element} el
 * @param {string} condition
 */
uniform.Meta.prototype.enable_ = function(el, condition) {
  if (eval(condition)) {
    el.disabled = false;
  } else {
    el.disabled = true;
  }
};

/**
 * @param {Element} el
 * @param {string} condition
 */
uniform.Meta.prototype.display_ = function(el, condition) {
  if (eval(condition)) {
    goog.style.showElement(el, true);
  } else { 
    goog.style.showElement(el, false);
  }
};

/**
 * @param {Element} el
 * @param {string} condition
 */ 
uniform.Meta.prototype.hide_ = function(el, condition) {
  if (eval(condition)) {
    goog.style.showElement(el, false);
  } else { 
    goog.style.showElement(el, true);
  }
};

/**
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 */
uniform.Meta.prototype.assign_ = function(el, condition, params) {
  if (eval(condition)) {
    goog.dom.forms.setValue(el, eval(params));
  }
};


