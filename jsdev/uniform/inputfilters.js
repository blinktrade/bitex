goog.provide('uniform.InputFilters');
goog.provide('uniform.InputFilterFunction');

goog.require('goog.structs.Map');
goog.require('goog.array');
goog.require('goog.dom.forms');

goog.require('goog.i18n.NumberFormatSymbols');

/**
 * @type {function(goog.events.KeyEvent, Array.<string>)}
 * InputFilter function. It expects the goog.events.KeyEvent to be vaidated,
 * and the necessary arguments to validate
 */
uniform.InputFilterFunction;

/**
 * Handle all uniform validations
 * @constructor
 */
uniform.InputFilters = function() {
  this.InputFilters_ = new goog.structs.Map();

  //register all default InputFilters
  this.registerInputFilter( 'number',
                          [this.filterNumber_,0 ] );

  //register all default InputFilters
  this.registerInputFilter( 'positive_number',
                            [this.filterPositiveNumber_,0 ] );

  this.registerInputFilter( 'integer',
                          [this.filterInteger_,0 ] );

  this.registerInputFilter( 'non_space',
                          [this.filterNonSpace_,0 ] );



};
goog.addSingletonGetter(uniform.InputFilters);


/**
 * @type {goog.structs.Map}
 */
uniform.InputFilters.prototype.InputFilters_ = null;

/**
 * @param {string} className   CSS class name
 * @param {Array.<number,uniform.InputFilterFunction>} InputFilterFn
 */
uniform.InputFilters.prototype.registerInputFilter = function(
    className, InputFilterFn){
  this.InputFilters_.set(className,InputFilterFn);
};

/**
 * @param {goog.events.KeyEvent} e
 */
uniform.InputFilters.prototype.filter = function(e) {
  var element = e.target;

  var InputFilterAttribute = element.getAttribute('data-uniform-filters');
  var elClassesArray = InputFilterAttribute && 
    typeof InputFilterAttribute.split == 'function' ? 
      InputFilterAttribute.split(/\s+/) : [];

  for (var i =0; i<elClassesArray.length; ++i) {
    var cls = elClassesArray[i];

    var InputFilterRecord = this.InputFilters_.get(cls,[goog.nullFunction,0 ]);

    var InputFilterFn         = InputFilterRecord[0];
    var number_of_parameters  = 0;
    if (goog.isDefAndNotNull(InputFilterRecord[1] )) {
      number_of_parameters  = InputFilterRecord[1];
    }

    var params = [];
    if (number_of_parameters) {
      for (var j=1+i, k=0; j<=elClassesArray.length && k < number_of_parameters; ++k, ++j , ++i ) {
        params.push(elClassesArray[j]);
      }
      if (params.length < number_of_parameters){
        // TODO: generate a error log "wrong number of parameters."
        continue;
      }
    }

    // execute the InputFilter function only if its a text modifier key
    if (goog.events.KeyCodes.isTextModifyingKeyEvent(e)) {

      switch( e.keyCode ){
        // do not filter those
        case goog.events.KeyCodes.NUM_CENTER:
        case goog.events.KeyCodes.MAC_ENTER:
        case goog.events.KeyCodes.ENTER:
        case goog.events.KeyCodes.NUMPAD_ENTER:
        case goog.events.KeyCodes.DELETE:
        case goog.events.KeyCodes.BACKSPACE:
        case goog.events.KeyCodes.TAB:
          return;
          break;

        default:
        InputFilterFn(e, params);
      }
    }
  }
};

/**
 * Number is only valid value (integers and floats)
 * @param {goog.events.KeyEvent} e
 */
uniform.InputFilters.prototype.filterNumber_ = function(e) {
  var inputEl = e.target;

  var inputValue = goog.dom.forms.getValue(inputEl);

  if ( e.ctrlKey ) {
    return;  // allowed
  }

  if ( (!e.shiftKey && e.keyCode >= goog.events.KeyCodes.ZERO && e.keyCode <= goog.events.KeyCodes.NINE) ||
       (e.keyCode >= goog.events.KeyCodes.NUM_ZERO && e.keyCode <= goog.events.KeyCodes.NUM_NINE)) {
    if (inputEl.selectionStart == 0 && inputEl.selectionEnd == 0 && inputValue.indexOf('-') >= 0 ) {
      e.preventDefault();
      return;
    }
    return;  // allowed
  }

  switch(e.keyCode) {
    case goog.events.KeyCodes.DASH:
    case goog.events.KeyCodes.NUM_MINUS:
      if (inputEl.selectionStart == 0 ) {
        if (inputValue.indexOf('-') < 0) {
          return;
        }
      }
      break;
    case goog.events.KeyCodes.NUM_PERIOD:
    case goog.events.KeyCodes.PERIOD:
      if (goog.i18n.NumberFormatSymbols.DECIMAL_SEP == '.') {
        if (inputValue.indexOf('.') < 0) {
          return;
        }
      }
      break;

    case goog.events.KeyCodes.COMMA:
      if (goog.i18n.NumberFormatSymbols.DECIMAL_SEP == ',') {
        if (inputValue.indexOf(',') < 0) {
          return;
        }
      }
      break;

    case goog.events.KeyCodes.E:
      if (inputValue.indexOf('e') >= 0 || inputValue.indexOf('E') >= 0 ) {
        break;
      }
      return;
    default:
      break;
  }


  e.preventDefault();
};


/**
 * Number is only valid value (integers and floats)
 * @param {goog.events.KeyEvent} e
 */
uniform.InputFilters.prototype.filterPositiveNumber_ = function(e) {
  var inputEl = e.target;

  var inputValue = goog.dom.forms.getValue(inputEl);

  if ( e.ctrlKey ||
      (!e.shiftKey && e.keyCode >= goog.events.KeyCodes.ZERO && e.keyCode <= goog.events.KeyCodes.NINE) ||
      (e.keyCode >= goog.events.KeyCodes.NUM_ZERO && e.keyCode <= goog.events.KeyCodes.NUM_NINE)) {
    return;  // allowed
  }

  switch(e.keyCode) {
    case goog.events.KeyCodes.NUM_PERIOD:
    case goog.events.KeyCodes.PERIOD:
      if (goog.i18n.NumberFormatSymbols.DECIMAL_SEP == '.') {
        if (inputValue.indexOf('.') < 0) {
          return;
        }
      }
      break;

    case goog.events.KeyCodes.COMMA:
      if (goog.i18n.NumberFormatSymbols.DECIMAL_SEP == ',') {
        if (inputValue.indexOf(',') < 0) {
          return;
        }
      }
      break;

    case goog.events.KeyCodes.E:
      if (inputValue.indexOf('e') >= 0 || inputValue.indexOf('E') >= 0 ) {
        break;
      }
      return;
    default:
      break;
  }

  e.preventDefault();
};


/**
 * Number is only valid integer
 * @param {goog.events.KeyEvent} e
 */
uniform.InputFilters.prototype.filterInteger_ = function(e) {
  var inputEl = e.target;
  var inputValue = goog.dom.forms.getValue(inputEl);

  if ( e.ctrlKey) {
    return;
  }

  if ( !e.shiftKey && e.keyCode >= goog.events.KeyCodes.ZERO && e.keyCode <= goog.events.KeyCodes.NINE ||
       e.keyCode == goog.events.KeyCodes.DASH  ||
       e.keyCode >= goog.events.KeyCodes.NUM_ZERO && e.keyCode <= goog.events.KeyCodes.NUM_NINE) {

    if (inputEl.selectionStart == 0 && inputEl.selectionEnd == 0 && inputValue.indexOf('-') >= 0 ) {
      e.preventDefault();
      return;
    }
    return;  // allowed
  }


  e.preventDefault();
};


/**
 * Block spacebar. Usefull for forcing people entering the first and last names only.
 * @param {goog.events.KeyEvent} e
 */
uniform.InputFilters.prototype.filterNonSpace_ = function(e) {
  if ( e.keyCode == goog.events.KeyCodes.SPACE ) {
    e.preventDefault();
  }
};


