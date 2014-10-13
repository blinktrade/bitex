goog.provide('uniform.Validators');
goog.require('uniform.MetaFunction');
goog.require('uniform.util');

goog.require('goog.structs.Map');
goog.require('goog.array');
goog.require('goog.dom.forms');
goog.require('goog.i18n.NumberFormat');


/**
 * Handle all uniform validations
 * @constructor
 */
uniform.Validators = function() {
  this.metaMap_ = new goog.structs.Map();

  this.metaMap_.set('required'         ,this.validateRequired_);
  this.metaMap_.set('validateMinLength',this.validateMinLength_);
  this.metaMap_.set('validateEmail'    ,this.validateEmail_);
  this.metaMap_.set('validateMaxLength',this.validateMaxLength_);
  this.metaMap_.set('validateMin'      ,this.validateMin_);
  this.metaMap_.set('validateMax'      ,this.validateMax_);
  this.metaMap_.set('validateNumber'   ,this.validateNumber_);
  this.metaMap_.set('validateInteger'  ,this.validateInteger_);
  this.metaMap_.set('validateAlpha'    ,this.validateAlpha_);
  this.metaMap_.set('validateAlphaNum' ,this.validateAlphaNum_);
  this.metaMap_.set('validatePhrase'   ,this.validatePhrase_);
  this.metaMap_.set('validateUsername' ,this.validateUsername_);

};
goog.addSingletonGetter(uniform.Validators);


/**
 * @type {goog.structs.Map}
 */
uniform.Validators.prototype.metaMap_ = null;

/**
 * @param {string} className   CSS class name
 * @param {Array.<number,uniform.MetaFunction>} validatorFn
 */
uniform.Validators.prototype.registerValidatorFn = function(className, validatorFn){
  this.metaMap_.set(className,validatorFn);
};

/**
 * @param {Element} el
 * @param {string} caption
 */
uniform.Validators.prototype.runValidation = function(el, caption){
  uniform.util.executeElementMetaTags(el,
                                      'data-uniform-validators',
                                      this.metaMap_,
                                      caption);
};

/**
 * Value of field is not empty, whitespace will be counted as empty
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 * @private
 */
uniform.Validators.prototype.validateRequired_ = function(el,condition,params,caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (!goog.isDefAndNotNull(elValue) || goog.string.isEmpty(elValue)) {
    /** @desc Error Validade Required in Validators*/
    var MSG_ERROR_VALIDATE_REQUIRED = goog.getMsg("{$c} is required", {c:caption});
    throw MSG_ERROR_VALIDATE_REQUIRED;
  }
};


/**
 * Value of field is not empty, whitespace will be counted as empty
 * @param {Element} el
 * @param {string} condition
 * @param {string} minLength minimum length
 * @param {string} caption
 * @private
 */
uniform.Validators.prototype.validateMinLength_ = function(el,condition,minLength,caption) {
  if (condition && !eval(condition)) {
    return;
  }
  minLength = parseInt(minLength,10);


  if (minLength> 0 && goog.dom.forms.getValue(el).length < minLength ){
    /** @desc Error validate min lenght*/
    var MSG_ERROR_VALIDATE_MIN_LENGTH =
        goog.getMsg("{$c} should be at least {$d} characters long", {c:caption, d:minLength });
    throw MSG_ERROR_VALIDATE_MIN_LENGTH;
  }
};


/**
 * Value email address
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateEmail_ = function(el,condition, params, caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (!elValue.match(
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {

    /** @desc Error validate email*/
    var MSG_ERROR_VALIDATE_EMAIL =
        goog.getMsg("{$c} is not a valid email address", {c:caption});
    throw MSG_ERROR_VALIDATE_EMAIL;
  }
};


/**
 * Value is longer than allowed
 * @param {Element} el
 * @param {string} condition
 * @param {string} maxLength
 * @param {string} caption
 */
uniform.Validators.prototype.validateMaxLength_ = function(el,condition,maxLength,caption){

  if (condition && !eval(condition)) {
    return;
  }

  maxLength = parseInt(maxLength,10);
  if (maxLength> 0 && goog.dom.forms.getValue(el).length > maxLength ){
    /** @desc Error Validate Max lenght*/
    var MSG_ERROR_VALIDATE_MAX_LENGTH =
        goog.getMsg("{$c} should not be longer than {$d} characters",{c:caption, d:maxLength });
    throw MSG_ERROR_VALIDATE_MAX_LENGTH;
  }
};


/**
 * Value is greater than max
 * @param {Element} el
 * @param {string} condition
 * @param {string} maxValue
 * @param {string} caption
 */
uniform.Validators.prototype.validateMax_ = function(el, condition,  maxValue, caption){

  if (condition && !eval(condition)) {
    return;
  }
  /** @desc Error Validate max*/
  var MSG_ERROR_VALIDATE_MAX =
      goog.getMsg("{$c} should be less than or equal to {$d}", {c:caption, d:maxValue });


  var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);

  maxValue = goog.string.trim(maxValue);

  var pos = [0];
  var maximum_value = valueFormatter.parse(maxValue, pos);

  if (isNaN(maximum_value) || pos[0] != maxValue.length || isNaN(maximum_value)) {
    // It is not a numeric.
    if ( goog.dom.forms.getValue(el) > maxValue ){
      throw MSG_ERROR_VALIDATE_MAX;
    }
    return;
  }

  pos = [0];
  var field_value = valueFormatter.parse(goog.dom.forms.getValue(el), pos);
  if (isNaN(field_value) || pos[0] != goog.dom.forms.getValue(el).length || isNaN(field_value)) {
    // Entered data it no a number :/
    throw MSG_ERROR_VALIDATE_MAX;
  }

  if ( field_value > maximum_value ){
    throw MSG_ERROR_VALIDATE_MAX;
  }
};


/**
 * Value is less than min
 * @param {Element} el
 * @param {string} condition
 * @param {string} minValue
 * @param {string} caption
 */
uniform.Validators.prototype.validateMin_ = function(el,condition, minValue, caption){
  if (condition && !eval(condition)) {
    return;
  }
  /** @desc Error validate min*/
  var MSG_ERROR_VALIDATE_MIN =
      goog.getMsg("{$c} should be greater than or equal to {$d}", {c:caption, d:minValue });

  var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);

  minValue = goog.string.trim(minValue);

  var pos = [0];
  var minimum_value = valueFormatter.parse(minValue, pos);

  if (isNaN(minimum_value) || pos[0] != minValue.length || isNaN(minimum_value)) {
    // It is not a numeric.
    if ( goog.dom.forms.getValue(el) < minValue ){
      throw MSG_ERROR_VALIDATE_MIN;
    }
    return;
  }

  pos = [0];
  var field_value = valueFormatter.parse(goog.dom.forms.getValue(el), pos);
  if (isNaN(field_value) || pos[0] != goog.dom.forms.getValue(el).length || isNaN(field_value)) {
    // Entered data it no a number :/
    throw MSG_ERROR_VALIDATE_MIN;
  }

  if ( field_value < minimum_value ){
    throw MSG_ERROR_VALIDATE_MIN;
  }
};


/**
 * Number is only valid value (integers and floats)
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateNumber_ = function(el,condition, params, caption) {
  if (condition && !eval(condition)) {
    return;
  }

  /** @desc Error validate number*/
  var MSG_ERROR_VALIDATE_NUMBER =
      goog.getMsg('{$c} needs to be a number', {c:caption});


  var elValue = goog.dom.forms.getValue(el);

  if (goog.string.isEmpty(elValue)) {
    return;
  }

  var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);
  var pos = [0];
  var value = valueFormatter.parse(elValue, pos);

  if (isNaN(value)) {
    throw MSG_ERROR_VALIDATE_NUMBER;
  }

  if (pos[0] != elValue.length || isNaN(value)) {
    throw MSG_ERROR_VALIDATE_NUMBER;
  }
};


/**
 * Number is only valid integer
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateInteger_ = function(el, condition, params, caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (!goog.string.isNumeric(elValue)) {
    /** @desc Error validate integer*/
    var MSG_ERROR_VALIDATE_INTEGER =
        goog.getMsg('{$c} needs to be a whole number', {c:caption});
    throw MSG_ERROR_VALIDATE_INTEGER;
  }
};

/**
 * Letters only
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateAlpha_ = function(el, condition, params, caption){

  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (!goog.string.isAlpha(elValue)) {
    /** @desc Error validate alpha*/
    var MSG_ERROR_VALIDATE_ALPHA =
        goog.getMsg('{$c} should contain only letters ' +
                    '(without special characters or numbers)', {c:caption});

    throw MSG_ERROR_VALIDATE_ALPHA;
  }
};

/**
 * Letters and numbers
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateAlphaNum_ = function(el, condition, params, caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (!goog.string.isAlphaNumeric(elValue)) {
    /** @desc Error validate alpha num*/
    var MSG_ERROR_VALIDATE_ALPHA_NUM =
        goog.getMsg('{$c} should contain only numbers and letters ' +
                    '(without special characters)', {c:caption});

    throw MSG_ERROR_VALIDATE_ALPHA_NUM;
  }
};

/**
 * Simple phrases
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validatePhrase_ = function(el, condition, params, caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);
  if (elValue.match(/^[\w\d\.\-_\(\)\*'# :,]+$/i) ||
      goog.string.isEmpty(elValue) ) {
      return;
  } else {
    /** @desc error validate phrase */
    var MSG_ERROR_VALIDATE_PHRASE =
        goog.getMsg('{$c} should contain only alphabetic ' +
                    'characters, numbers, spaces, and the ' +
                    'following: . , - _ () * # :', {c:caption});
    throw MSG_ERROR_VALIDATE_PHRASE;
  }
};

/**
 * Username
 * @param {Element} el
 * @param {string} condition
 * @param {string} params
 * @param {string} caption
 */
uniform.Validators.prototype.validateUsername_ = function(el, condition, params, caption){
  if (condition && !eval(condition)) {
    return;
  }

  var elValue = goog.dom.forms.getValue(el);

  if (elValue.match(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/) || goog.string.isEmpty(elValue) ) {
    return;
  } else {
    /** @desc error validate phrase */
    var MSG_ERROR_VALIDATE_USERNAME =
        goog.getMsg('{$c} should contain only alphabetic ' +
                        'characters, numbers, and the ' +
                        'following characters: . _ -', {c:caption});
    throw MSG_ERROR_VALIDATE_USERNAME;
  }
};


