goog.provide('bitex.ui.WithdrawMethods');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.withdraw_methods.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');

goog.require('bootstrap.Dialog');
goog.require('goog.i18n.NumberFormat');

/**
 * @param {function} currencyFormatterFn
 * @param {function} currencyDescriptionFn
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawMethods = function(currencyFormatterFn, currencyDescriptionFn,  opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  this.currency_formatter_function_ = currencyFormatterFn;
  this.currency_description_function_ = currencyDescriptionFn;
};
goog.inherits(bitex.ui.WithdrawMethods, goog.ui.Component);


/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.CSS_CLASS = goog.getCssName('withdraw-methods');

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.currency_formatter_function_;

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.currency_description_function_;

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.selected_method_;

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.selected_currency_;

/**
 * @type {string}
 */
bitex.ui.WithdrawMethods.prototype.last_error_;

/**
 * @enum {string}
 */
bitex.ui.WithdrawMethods.EventType = {
  CHANGE: 'withdraw_structure_change',
  SAVE:   'withdraw_structure_save',
  CANCEL: 'withdraw_structure_cancel',
  VALIDATION_ERROR: 'withdraw_structure_validation_error'
};


/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.getCssClass = function() {
  return bitex.ui.WithdrawMethods.CSS_CLASS;
};


/**
 * @return {string}
 */
bitex.ui.WithdrawMethods.prototype.getLastError = function(){
  return this.last_error_;
};

/**
 * Convert the withdraw structure inside model to a list of methods to be used in the template
 * @return {Array.<Object>}
 * @private
 */
bitex.ui.WithdrawMethods.prototype.getMethodsArray_ = function(){
  var methods_array =  [];
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

  goog.object.forEach( this.getModel()['withdraw_methods'], function( withdraw_methods, currency) {
    goog.array.forEach(withdraw_methods, function(withdraw_method) {
      var obj = {
        'currency': currency,
        'currency_description': this.currency_description_function_(currency)
      };
      goog.object.extend(obj, withdraw_method);

      var percent_fee = obj['percent_fee'];
      obj['formatted_percent_fee']= fmt.format(percent_fee);

      var fixed_fee = obj['fixed_fee'];
      obj['has_fixed_fee'] = !(isNaN(fixed_fee) || fixed_fee <= 0 );
      obj['formatted_fixed_fee'] =  this.currency_formatter_function_(fixed_fee/1e8, currency, true );

      methods_array.push(obj);
    }, this);
  }, this);

  return methods_array;
};

/** @inheritDoc */
bitex.ui.WithdrawMethods.prototype.createDom = function() {
  var topEl = goog.soy.renderAsElement(bitex.ui.withdraw_methods.templates.WithdrawMethods, {
    id: this.makeId('form'),
    methods: this.getMethodsArray_(),
    currencies: this.getModel()['currencies']
  });
  this.setElementInternal(topEl);

  this.setDirty(false);
};

/**
 * @param {boolean} isDirty
 */
bitex.ui.WithdrawMethods.prototype.setDirty = function(isDirty) {
  this.getModel().is_dirty = isDirty;

  goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-dirty-state', this.getElement() ), function(el) {
    goog.style.showElement( el, isDirty );
  });

  goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-clean-state', this.getElement() ), function(el) {
    goog.style.showElement( el, !isDirty );
  });

  goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-saving-state', this.getElement() ), function(el) {
    goog.style.showElement( el, false );
  }, this);
};

/**
 * @param {boolean} saving
 */
bitex.ui.WithdrawMethods.prototype.setSavingStatus = function(saving) {
  if (saving) {
    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-dirty-state', this.getElement() ), function(el) {
      goog.style.showElement( el, false );
    }, this);
    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-clean-state', this.getElement() ), function(el) {
      goog.style.showElement( el, false );
    }, this);

    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-saving-state', this.getElement() ), function(el) {
      goog.style.showElement( el, true );
    }, this);

  } else {
    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-dirty-state', this.getElement() ), function(el) {
      goog.style.showElement( el, this.getModel().is_dirty );
    }, this);

    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-clean-state', this.getElement() ), function(el) {
      goog.style.showElement( el, !this.getModel().is_dirty );
    }, this);

    goog.array.forEach( goog.dom.getElementsByClass( 'withdraw-methods-show-when-saving-state', this.getElement() ), function(el) {
      goog.style.showElement( el, false );
    }, this);

  }
};

bitex.ui.WithdrawMethods.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( this.getElement(), goog.events.EventType.CLICK, this.onTableClick_);
  handler.listen( this.getElement(), goog.events.EventType.CLICK, this.onAddField_);
};


bitex.ui.WithdrawMethods.prototype.updateWindow = function(){
  this.getElement().innerHTML = bitex.ui.withdraw_methods.templates.WithdrawMethods({
    id: this.makeId('form'),
    methods: this.getMethodsArray_(),
    currencies: this.getModel()['currencies']
  });
};

bitex.ui.WithdrawMethods.prototype.onActionDelete_ = function() {
  var idx = goog.array.findIndex(this.getModel()['withdraw_methods'][this.selected_currency_], function(wm) {
    if (wm['method'] ==  this.selected_method_) {
      return true;
    }
  }, this);
  goog.array.removeAt(this.getModel()['withdraw_methods'][this.selected_currency_], idx);

  if (this.getModel()['withdraw_methods'][this.selected_currency_].length == 0) {
    goog.object.remove(this.getModel()['withdraw_methods'],this.selected_currency_ )
  }
  this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.CHANGE);
};

bitex.ui.WithdrawMethods.prototype.getWithdrawStructure = function(){
  return goog.object.unsafeClone( this.getModel()['withdraw_methods'] );

};

bitex.ui.WithdrawMethods.prototype.onActionEdit_ = function(){
  var idx = goog.array.findIndex(this.getModel()['withdraw_methods'][this.selected_currency_], function(wm) {
    if (wm['method'] ==  this.selected_method_) {
      return true;
    }
  }, this);

  var withdraw_method_editor = new  bitex.ui.WithdrawMethodEditor();
  var withdraw_method_editor_model = goog.object.unsafeClone(this.getModel()['withdraw_methods'][this.selected_currency_][idx]);
  withdraw_method_editor_model['currency'] = this.selected_currency_;
  withdraw_method_editor.setModel(withdraw_method_editor_model);

  /**
   * @desc Edit Method dialog title
   */
  var MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE = goog.getMsg('Edit withdraw method');


  var buttonSet = bootstrap.Dialog.ButtonSet.createOkCancel();

  var dialog_ = new bootstrap.Dialog();
  dialog_.setTitle(MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE);
  dialog_.addChild(withdraw_method_editor, true);
  dialog_.setButtonSet(buttonSet);
  dialog_.setVisible(true);
  goog.style.setWidth(dialog_.getElement(), 850);


  var handler = this.getHandler();

  handler.listen( dialog_, goog.ui.Dialog.EventType.SELECT, function(e) {
    if (e.key == 'ok') {
      var error_list = withdraw_method_editor.validate();
      if (error_list.length > 0) {

        goog.array.forEach(error_list, function(error_msg) {
          this.last_error_ = error_msg;
          this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.VALIDATION_ERROR);
        }, this );


        e.stopPropagation();
        e.preventDefault();
        return;
      }

      this.getModel()['withdraw_methods'][this.selected_currency_][idx] =
          withdraw_method_editor.getWithdrawMethodJSON();
      this.updateWindow();

      this.setDirty(true);
      this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.CHANGE);
    }
  }, this);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onTableClick_ = function(e){
  var tr_el ;
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-edit') )) {
    tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    e.preventDefault();
    e.stopPropagation();

    this.selected_method_ = tr_el.getAttribute('data-withdraw-method');
    this.selected_currency_ = tr_el.getAttribute('data-withdraw-currency');

    this.onActionEdit_();
  } else if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-delete') )) {
    tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    e.preventDefault();
    e.stopPropagation();

    this.selected_method_ = tr_el.getAttribute('data-withdraw-method');
    this.selected_currency_ = tr_el.getAttribute('data-withdraw-currency');

    goog.dom.removeNode(tr_el);

    this.setDirty(true);
    this.onActionDelete_();
  } else if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-save') )) {
    this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.SAVE);
  } else if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-cancel') )) {
    this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.CANCEL);
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethods.prototype.onAddField_ = function(e) {
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'action-add') )) {
    this.selected_currency_ = e.target.getAttribute('data-withdraw-currency');
    e.preventDefault();

    /**
     * @desc Edit Method dialog title
     */
    var MSG_ADD_WITHDRAW_METHOD_DIALOG_TITLE = goog.getMsg('Add withdraw method');

    var withdraw_method_editor = new  bitex.ui.WithdrawMethodEditor();
    withdraw_method_editor.setModel({
                                      'currency' : this.selected_currency_,
                                      'description': '',
                                      'disclaimer': '',
                                      'fields': [],
                                      'fixed_fee': '',
                                      'method': '',
                                      'percent_fee': ''
                                    });
    var buttonSet = bootstrap.Dialog.ButtonSet.createOkCancel();

    var dialog_ = new bootstrap.Dialog();
    dialog_.setTitle(MSG_ADD_WITHDRAW_METHOD_DIALOG_TITLE);
    dialog_.addChild(withdraw_method_editor, true);
    dialog_.setButtonSet(buttonSet);
    dialog_.setVisible(true);
    goog.style.setWidth(dialog_.getElement(), 850);


    var handler = this.getHandler();

    handler.listen( dialog_, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        var error_list = withdraw_method_editor.validate();
        if (error_list.length > 0) {

          goog.array.forEach(error_list, function(error_msg) {
            this.last_error_ = error_msg;
            this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.VALIDATION_ERROR);
          }, this );


          e.stopPropagation();
          e.preventDefault();
          return;
        }

        if ( goog.isDefAndNotNull(this.getModel()['withdraw_methods'][this.selected_currency_]) ) {
          this.getModel()['withdraw_methods'][this.selected_currency_].push(
              withdraw_method_editor.getWithdrawMethodJSON());
        } else {
          this.getModel()['withdraw_methods'][this.selected_currency_] = [
            withdraw_method_editor.getWithdrawMethodJSON()
          ];
        }
        this.updateWindow();

        this.setDirty(true);

        this.dispatchEvent(bitex.ui.WithdrawMethods.EventType.CHANGE);
      }
    }, this);
  }
};

