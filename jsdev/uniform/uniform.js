goog.provide('uniform.Uniform');
goog.provide('uniform.Uniform.Events');



goog.require('uniform.Validators');
goog.require('uniform.InputFilters');
goog.require('uniform.Meta');
goog.require('goog.ui.Component');
goog.require('goog.ui.LabelInput');

goog.require('goog.debug.Logger');
goog.require('goog.events.Event');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.InputHandler');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.dom.TagName');
goog.require('goog.Timer');
goog.require('goog.ui.registry');



/** @type {{action:string, accept:string, acceptCharset:string, enctype:string, method:string, name:boolean, target:string}} */
uniform.UniformModel;

/**
 * @param {uniform.UniformModel} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
uniform.Uniform = function(opt_model, opt_domHelper){
  goog.ui.Component.call(this, opt_domHelper);

  var model =  opt_model || {};
  var controlModel = {};
  controlModel.action         =  goog.object.get(model, 'action',         '.');
  controlModel.accept         =  goog.object.get(model, 'accept',         null);
  controlModel.acceptCharset  =  goog.object.get(model, 'acceptCharset',  null);
  controlModel.enctype        =  goog.object.get(model, 'enctype',        null);
  controlModel.method         =  goog.object.get(model, 'method',         null);
  controlModel.name           =  goog.object.get(model, 'name',           null);
  controlModel.target         =  goog.object.get(model, 'target',         null);
  controlModel.control_holder_class =  goog.object.get(model, 'control_holder_class',uniform.Uniform.CTRLHOLDER_CLASS);
  this.setModel(controlModel);
};
goog.inherits(uniform.Uniform, goog.ui.Component);


/**
 * Constants for event names
 *
 * @enum {string}
 */
uniform.Uniform.Events = {
  /**
   * Dispatched after a field validation has passed
   */
  FIELD_VALIDATION_PASSED: 'field_validated',

  /**
   * Dispatched after a field validation has failed
   */
  FIELD_VALIDATION_FAILED: 'field_invalidated',

  /**
   * Dispached when the form validation has failed
   */
  VALIDATION_FAILED: 'uniform_invalidated',


  /**
   * Dispached when the form validation has passed
   */
  VALIDATION_PASSED: 'uniform_validated',

  /**
   * Dispached before the submission of a form
   */
  BEFORE_SUBMIT: 'uniform_submit',


  /**
   * Dispached only when there is unsubmited data before window close
   * returns false, to stop the window unload process.
   */
  WINDOW_UNLOAD: 'uniform_unload'

};


/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
uniform.Uniform.prototype.logger_ =
    goog.debug.Logger.getLogger('uniform.Uniform');

/**
 * @return {string}
 */
uniform.Uniform.prototype.getAction = function() {
  return this.getModel().action;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setAction = function(value) {
  this.getModel().action = value;
  this.getElement().setAttribute('action',value);
};


/**
 * @return {string}
 */
uniform.Uniform.prototype.getAccept = function() {
  return this.getModel().accept;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setAccept = function(value) {
  this.getModel().accept = value;
  this.getElement().setAttribute('accept',value);
};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getAcceptCharset = function() {
  return this.getModel().acceptCharset;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setAcceptCharset = function(value) {
  this.getModel().acceptCharset =  value;
  this.getElement().setAttribute('accept-charset',value);
};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getEncodingType = function() {
  return this.getModel().enctype;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setEncodingType = function(value) {
  this.getModel().enctype = value;
  this.getElement().setAttribute('enc-type',value);
};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getMethod = function() {
  return this.getModel().method;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setMethod = function(value) {
  this.getModel().method = value;
  this.getElement().setAttribute('method',value);
};


/**
 * @return {string}
 */
uniform.Uniform.prototype.getName = function() {
  return this.getModel().name;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setName = function(value) {
  this.getModel().name = value;
  this.getElement().setAttribute('name',value);
};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getTarget = function() {
  return this.getModel().target;
};

/**
 * @param {string} value
 */
uniform.Uniform.prototype.setTarget = function(value) {
  this.getModel().target = value;
  this.getElement().setAttribute('target',value);
};



/**
 * @type {string}
 */
uniform.Uniform.CSS_CLASS = goog.getCssName('uniForm');

/**
 * @type {string}
 */
uniform.Uniform.CTRLHOLDER_CLASS = goog.getCssName('ctrlHolder');

/**
 * @type {string}
 */
uniform.Uniform.CSS_STATE_FOCUSED = goog.getCssName('focused');

/**
 * @type {string}
 */
uniform.Uniform.CSS_STATE_INVALID = goog.getCssName('error');

/**
 * @type {string}
 */
uniform.Uniform.CSS_STATE_VALID = goog.getCssName('valid');

/**
 * @return {string}
 */
uniform.Uniform.prototype.getCssClass = function() {
  return uniform.Uniform.CSS_CLASS;
};


/**
 * @return {string}
 */
uniform.Uniform.prototype.getControlHolderClass = function() {
  return this.getModel().control_holder_class;
};


/**
 * @return {string}
 */
uniform.Uniform.prototype.getCssFocusedState = function() {
  return  uniform.Uniform.CSS_STATE_FOCUSED;

};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getCssInvalidState = function() {
  return  uniform.Uniform.CSS_STATE_INVALID;
};

/**
 * @return {string}
 */
uniform.Uniform.prototype.getCssValidState = function() {
  return  uniform.Uniform.CSS_STATE_VALID;
};

/**
 * @type {string}
 */
uniform.Uniform.prototype.initialFormValue_ = null;


/** @override */
uniform.Uniform.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var formAttributes = {};
  goog.object.set(formAttributes, 'action', this.getAction() );

  if (this.getAccept()) {
    goog.object.set(formAttributes, 'accept', this.getAccept() );
  }

  if (this.getAcceptCharset()) {
    goog.object.set(formAttributes, 'accept-charset', this.getAcceptCharset() );
  }

  if (this.getEncodingType()) {
    goog.object.set(formAttributes, 'enctype', this.getEncodingType() );
  }

  if (this.getMethod()) {
    goog.object.set(formAttributes, 'method', this.getMethod() );
  }

  if (this.getName()) {
    goog.object.set(formAttributes, 'name', this.getName() );
  }

  if (this.getTarget()) {
    goog.object.set(formAttributes, 'target', this.getTarget() );
  }

  goog.object.set(formAttributes, 'data-uniform-control-holder-class', this.getControlHolderClass() );


  
  var topEl = dom.createDom('form', formAttributes, this.getContent());
  goog.dom.classes.add(topEl, this.getCssClass());
  this.setElementInternal(topEl);

  this.decorateInternal(topEl);
};


/** @override */
uniform.Uniform.prototype.decorateInternal = function(element) {
  uniform.Uniform.superClass_.decorateInternal.call(this, element);

  var dom = this.getDomHelper();

  this.getModel().action        = element.getAttribute('action');
  this.getModel().accept        = element.getAttribute('accept');
  this.getModel().acceptCharset = element.getAttribute('accept-charset');
  this.getModel().enctype       = element.getAttribute('enctype');
  this.getModel().method        = element.getAttribute('method');
  this.getModel().name          = element.getAttribute('name');
  this.getModel().target        = element.getAttribute('target');
  this.getModel().control_holder_class = element.getAttribute('data-uniform-control-holder-class') || uniform.Uniform.CTRLHOLDER_CLASS;

  goog.dom.classes.add(element, this.getCssClass());


  // lets iterate across all input elements
  // and create a LabelInput component for them.
  var els = this.getElement().elements;
  for (var el, i = 0; el = els[i]; i++) {
    if (el.tagName === goog.dom.TagName.INPUT ) {
      var labelInput = new goog.ui.LabelInput();
      this.addChild(labelInput);
      labelInput.decorate(el);
    }
  }


  return element;
};


/**
 * @return {string|Node|Array.<Node>|NodeList}
 */
uniform.Uniform.prototype.getContent = function(){
  return this.content_;
};


/**
 * @param {string|Node|Array.<Node>|NodeList} content
 */
uniform.Uniform.prototype.setContent = function(content){
  this.setContentInternal(content);
};

/**
 * @param {string|Node|Array.<Node>|NodeList} content
 * @protected
 */
uniform.Uniform.prototype.setContentInternal = function(content){
  this.content_ = content;
};

/** override */
uniform.Uniform.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.initialFormValue_ = goog.dom.forms.getFormDataString(this.getElement());

  var handler = this.getHandler();

  if (goog.dom.classes.has(this.getElement(), goog.getCssName('askOnLeave'))){
    handler.listen( window, 'beforeunload', this.onWindowBeforeUnload_ );
  }

  handler.listen( this.getElement(),goog.events.EventType.SUBMIT,
      this.onFormSubmit_);

  // get all ctrlHolder sections
  var els = this.getElement().elements;
  for (var el, i = 0; el = els[i]; i++) {
    if (el.disabled ||
        el.tagName.toLowerCase() === goog.dom.TagName.INPUT.FIELDSET ) {
      continue;
    }

    handler.listen(el,goog.events.EventType.FOCUS,this.onFormElementFocus_);
    handler.listen(el,goog.events.EventType.BLUR,this.onFormElementBlur_);

    handler.listen(el,goog.events.EventType.CLICK,this.onFormElementClick_);

    if (el.tagName === goog.dom.TagName.SELECT ) {
      handler.listen(el,goog.events.EventType.CHANGE,this.onFormElementSelect_);
    }

    if (el.tagName === goog.dom.TagName.INPUT ) {
      var ih = new goog.events.KeyHandler();
      ih.attach(el);
      handler.listen(ih, goog.events.KeyHandler.EventType.KEY,
        this.handleKeyEvent_);
    }
  }

  try {
    // run the meta info
    uniform.Meta.getInstance().runMeta(this.getElement() );
  } catch (metaError) {
    this.logger_.info(metaError);
  }
};

/**
 * @return {Object}
 */
uniform.Uniform.prototype.getAsJSON = function(){
  var json_res = {};
  for (var el, i = 0; el = this.getElement().elements[i]; i++) {
    if (el.disabled || el.tagName.toLowerCase() == 'fieldset') {
      continue;
    }

    var name = el.name;
    if (goog.string.isEmpty(name)) {
      continue;
    }

    var type = el.type.toLowerCase();
    switch (type) {
      case 'file':
      case 'submit':
      case 'reset':
      case 'button':
        // don't submit these
        break;

      case 'select-multiple':
        var values = goog.dom.forms.getValue(el);
        if (values != null) {
          json_res[name] = [];
          for (var value, j = 0; value = values[j]; j++) {
            json_res[name].push(value);
          }
        }
        break;
      default:
        var form_value = goog.dom.forms.getValue(el);
        if (form_value != null) {
          json_res[name] = form_value;
        }
    }
  }
  return json_res;

};

/**
 * @param {Element} formElement
 * @param {string=} opt_control_holder_class. Defaults to CTRLHOLDER_CLASS
 * @return {Element}
 */
uniform.Uniform.prototype.findControlHolderEl_ = function(formElement, opt_control_holder_class) {
  var control_holder_class = opt_control_holder_class || this.getControlHolderClass();
  return goog.dom.getAncestorByClass(formElement, control_holder_class);
};


/**
 * @enum {number}
 */
uniform.Uniform.SmEvents = {
  FOCUS: 0,
  BLUR: 1,
  VALIDATED: 2,
  INVALIDATED: 3
};

/**
 * @param {string} event
 * @param {Element} fieldElement
 * @param {*=} param1
 */
uniform.Uniform.prototype.processFieldEvent_ = function(event, fieldElement, param1) {
  var controlHolderEl = this.findControlHolderEl_(fieldElement);
  if (!goog.isDefAndNotNull(controlHolderEl)) {
    return;
  }

  switch(event) {
    case uniform.Uniform.SmEvents.FOCUS:
      goog.dom.classes.add(controlHolderEl, this.getCssFocusedState());
      goog.dom.classes.remove(controlHolderEl, this.getCssInvalidState());
      goog.dom.classes.remove(controlHolderEl, this.getCssValidState());
      break;
    case uniform.Uniform.SmEvents.BLUR:
      goog.dom.classes.remove(controlHolderEl, this.getCssFocusedState());

      break;
    case uniform.Uniform.SmEvents.VALIDATED:

      goog.dom.classes.add(controlHolderEl, this.getCssValidState());

      this.dispatchEvent( new goog.events.Event(
          uniform.Uniform.Events.FIELD_VALIDATION_PASSED,
          fieldElement));

      break;
    case uniform.Uniform.SmEvents.INVALIDATED:

      goog.dom.classes.add(controlHolderEl, this.getCssInvalidState());

      this.dispatchEvent( new goog.events.Event(
          uniform.Uniform.Events.FIELD_VALIDATION_FAILED,
          fieldElement));

      break;

    case this.getCssInvalidState():
      break;
    break;
  }
};


/**
 *
 * @param  {goog.events.KeyEvent} e
 * @private
 */
uniform.Uniform.prototype.handleKeyEvent_ = function(e) {
  if (e.keyCode === goog.events.KeyCodes.ESC) {
    e.preventDefault();
    return;
  } else if  (e.keyCode === goog.events.KeyCodes.ENTER || e.keyCode === goog.events.KeyCodes.NUMPAD_ENTER) {

    // TODO: change the focus to the next element


    // TODO: only avoid the form submission if we have more than one input element.
    // e.preventDefault();
    return;
  }

  uniform.InputFilters.getInstance().filter(e);
  
};


/**
 * Remove any classes other than the focus class and hide the default label text
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onFormElementFocus_ = function(e){
  this.processFieldEvent_(uniform.Uniform.SmEvents.FOCUS, e.target);
};


/**
 * Validate a form field on the click event
 * 
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onFormElementClick_ = function(e) {
  try {
    // run the meta info
    uniform.Meta.getInstance().runMeta(this.getElement() );
  } catch (metaError) {
    this.logger_.info(metaError);
  }
};


/**
 * Validate a select
 *
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onFormElementSelect_ = function(e) {
  try {
    // run the meta info
    uniform.Meta.getInstance().runMeta(this.getElement() );
  } catch (metaError) {
    this.logger_.info(metaError);
  }
};


/**
 * Validate a form field on the blur event
 * 
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onFormElementBlur_ = function(e) {
  this.processFieldEvent_(uniform.Uniform.SmEvents.BLUR, e.target);

  var caption = this.getCaptionForElement(e.target);

  try {
    // run the meta info
    uniform.Meta.getInstance().runMeta(this.getElement());
  } catch (metaError) {
    this.logger_.info(metaError);
  }

  // lets run validation on the element.
  try {
    uniform.Validators.getInstance().runValidation(e.target, caption);
    this.processFieldEvent_(uniform.Uniform.SmEvents.VALIDATED, e.target);
  } catch (validationError) {
    this.logger_.info(validationError);

    this.processFieldEvent_(uniform.Uniform.SmEvents.INVALIDATED,
                            e.target, validationError);
  }

};


/**
 * If they changed things, and haven't submitted, we'll let them
 * know about it
 *
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onWindowBeforeUnload_ = function(e) {
   var finalFormValue = goog.dom.forms.getFormDataString(this.getElement());

  if(this.initialFormValue_ != finalFormValue &&
      goog.dom.classes.has(this.getElement(), goog.getCssName('askOnLeave'))){

    // TODO: confirmation dialog or dipatch an event.
    /** @desc Show exit confirmation message  */
    var MSG_CONFIRM = goog.getMsg(
        'Are you sure you want to leave this page without saving this form?');

    return confirm(MSG_CONFIRM);
  }
  return true;
};

/**
 * Focus the first form input element inside the form
 */  
uniform.Uniform.prototype.focus = function() {
  var els = this.getElement().elements;
  for (var el, i = 0; el = els[i]; i++) {
    if (el.disabled ||
        el.tagName.toLowerCase() === goog.dom.TagName.INPUT.FIELDSET ) {
      continue;
    }

    if (el.tagName === goog.dom.TagName.SELECT ) {
      goog.dom.forms.focusAndSelect(el);
      break;
    } else if (el.tagName === goog.dom.TagName.INPUT ) {
      goog.dom.forms.focusAndSelect(el);
      break;
    }
  }

};

/**
 * @param {string} title
 * @param {Array.<string>} messages
 * @param {boolean} opt_scroll. Defaults to true
 */
uniform.Uniform.prototype.showFormError = function(title,messages,opt_scroll) {
  var scroll = true;
  if (goog.isDefAndNotNull(opt_scroll)) { 
    scroll = opt_scroll;
  }

  var dom = this.getDomHelper();

  var currentErrorMsgEl = dom.getElement('errorMsg');
  if (currentErrorMsgEl) {
    goog.dom.removeNode(currentErrorMsgEl);
  }
  
  var errorMessagesList = dom.createDom('ol');
  goog.array.forEach(messages, function(message){
    errorMessagesList.appendChild(dom.createDom('li', undefined, message));
  });

  var newErrorMsgEl = dom.createDom('div', {id:'errorMsg' },
      dom.createDom('h3', undefined, title ),
      errorMessagesList  );

  dom.insertSiblingBefore(newErrorMsgEl,
    dom.getFirstElementChild( this.getElement()));

  /*
  if (scroll) {
    fx.createScrollToAnim(this.getElement(),200).play();
    fx.createSlideDownAnim(newErrorMsgEl, 200).play();
  }
  */
};



/**
 * @param {string} title
 * @param {Array.<string>} messages
 * @param {boolean} opt_scroll. Defaults to true
 */
uniform.Uniform.prototype.showFormSuccess = function(title,opt_scroll){
  var scroll = true;
  if (goog.isDefAndNotNull(opt_scroll)) { 
    scroll = opt_scroll;
  }

  var dom = this.getDomHelper();

  var el = dom.getElement('okMsg');
  if (el) {
    goog.dom.removeNode(el);
  }
  
  var el = dom.createDom('div', {id:'okMsg' },
      dom.createDom('h3', undefined, title ));

  dom.insertSiblingBefore(el,
    dom.getFirstElementChild( this.getElement()));

  /*
  fx.createScrollToAnim(this.getElement(),200).play();
  fx.createSlideDownAnim(el, 200).play();
  */
};

/**
 * @param {Element} el
 * @param {string=} opt_control_holder_class. Defaults to CTRLHOLDER_CLASS
 * @return {string}
 */ 
uniform.Uniform.prototype.getCaptionForElement = function(el, opt_control_holder_class) {
  if (goog.isDefAndNotNull(el.getAttribute('data-uniform-label'))) {
    return el.getAttribute('data-uniform-label');
  }

  var labelEl = goog.dom.getAncestorByTagNameAndClass(el, 'label');

  if (! goog.isDefAndNotNull(labelEl)) {
    var controlHolderEl = this.findControlHolderEl_(el, opt_control_holder_class);

    var allLabels = goog.dom.getElementsByTagNameAndClass('label',undefined, controlHolderEl);

    labelEl = goog.array.find(allLabels, function(lbEl) {
      if ( goog.dom.getNextElementSibling(lbEl) == el) {
        return true;
      }
    });

    if (!goog.isDefAndNotNull(labelEl)) {
      labelEl = allLabels[0];
    }

  }

  var caption = "";
  if (goog.isDefAndNotNull(labelEl)) {
    caption = goog.dom.getTextContent(labelEl);
  }

  return caption;
};

// TODO: provide a public method to remove the Errors Messages
// rational: The user can intercept the form submission and
// submit the data manually through ajax. So, he must be able to
// set the form.
/**
 * @param {string=} opt_control_holder_class. Defaults to CTRLHOLDER_CLASS
 * @return {Array.<string>}
 */ 
uniform.Uniform.prototype.validate = function(opt_control_holder_class) {
  var errors = [];

  // lets revalidate all inputs again
  // perhaps, some field was set through javascript, and
  // we didn't have blur event.
  var els = this.getElement().elements;
  for (var el, i = 0; el = els[i]; i++) {
    if (el.disabled || el.tagName.toLowerCase() == 'fieldset') {
      continue;
    }

    var caption = this.getCaptionForElement(el);

    try {
      uniform.Validators.getInstance().runValidation(el, caption);
    } catch (validationError) {
      this.logger_.info(validationError);

      var controlHolderEl = this.findControlHolderEl_(el, opt_control_holder_class);
      if (goog.isDefAndNotNull(controlHolderEl)) {
        goog.dom.classes.add(controlHolderEl, this.getCssInvalidState());
      }
      errors.push(validationError);
    }
  }

  return errors;  
};

/**
 *
 * @param {goog.events.Event} e
 */
uniform.Uniform.prototype.onFormSubmit_ = function(e) {
  var errors = this.validate();
  if (errors.length > 0){
    this.dispatchEvent( new goog.events.Event(
        uniform.Uniform.Events.VALIDATION_FAILED,
        this));

    /**
     * @desc for Message error
     */
    var MSG_FORM_ERROR_MSG = goog.getMsg("Sorry, this form needs corrections.");
    this.showFormError(MSG_FORM_ERROR_MSG, errors);

    goog.dom.classes.add(this.getElement(), goog.getCssName('failedSubmit') );
  
    e.preventDefault();

    //  prevent the form submission
    return false;
  }

  goog.dom.classes.remove(this.getElement(),
      goog.getCssName('failedSubmit') );


  // prevent the ask_on_leave from firing
  goog.dom.classes.remove(this.getElement(),
      goog.getCssName('askOnLeave'));


  var resSubmit = this.dispatchEvent( new goog.events.Event(
      uniform.Uniform.Events.BEFORE_SUBMIT,
      this));

  if (!resSubmit) {
    e.preventDefault();
  }

    // if the onSubmit return value is false, lets
    // prevent the submit.
  return resSubmit;
};

goog.ui.registry.setDecoratorByClassName(
    uniform.Uniform.CSS_CLASS,
    function() {
      return new uniform.Uniform();
    });
