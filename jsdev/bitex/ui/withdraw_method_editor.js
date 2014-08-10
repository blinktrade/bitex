goog.provide('bitex.ui.WithdrawMethodEditor');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.withdraw_method_editor.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawMethodEditor = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(bitex.ui.WithdrawMethodEditor, goog.ui.Component);


/**
 * @type {string}
 */
bitex.ui.WithdrawMethodEditor.CSS_CLASS = goog.getCssName('withdraw-method-editor');

/** @inheritDoc */
bitex.ui.WithdrawMethodEditor.prototype.getCssClass = function() {
  return bitex.ui.WithdrawMethodEditor.CSS_CLASS;
};


/** @inheritDoc */
bitex.ui.WithdrawMethodEditor.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var topEl = goog.soy.renderAsElement(bitex.ui.withdraw_method_editor.templates.WithdrawMethodEditor, {
    id: this.makeId('form'),
    model: this.getModel()
  });

  this.setElementInternal(topEl);
};


bitex.ui.WithdrawMethodEditor.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement(this.makeId('form_table')), goog.events.EventType.CLICK, this.onTableClick_);

  handler.listen( goog.dom.getElement(this.makeId('form_add')), goog.events.EventType.CLICK, this.onAddField_);
};

/**
 * @return {Object}
 */
bitex.ui.WithdrawMethodEditor.prototype.getWithdrawMethodJSON = function() {
  /*
  {
     description: "paypal"
     disclaimer: "You still might have to pay PayPal fees"
     fields: [
         {                             {                         {
           label: "Email"               label: "TransactionID"    label: "Link"
           name: "Email"                name: "TransactionID"     name: "Link"
           placeholder: ""              placeholder: ""           placeholder: ""
           side: "client"               side: "broker"            side: "broker"
           type: "text"                 type: "text"              type: "text"
           validator: "validateEmail"   validator: ""             validator: ""
           value: ""                    value: ""                 value: ""
         },                            },                        }
      ]
     fixed_fee: "0"
     method: "paypal"
     percent_fee: "3"
  }
  */

  var result = {};
  result['method']      = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_name')) );
  result['description'] = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_description')) );
  result['disclaimer']  = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_placeholder')) );
  result['percent_fee'] = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_percent_fee')) );
  result['fixed_fee']   = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_fixed_fee')) );

  var fields_table_tbody_element = goog.dom.getNextElementSibling(
      goog.dom.getFirstElementChild(
            goog.dom.getElement( this.makeId('form_table') ))) ;

  result['fields'] = [];
  var field_row = goog.dom.getFirstElementChild(fields_table_tbody_element);
  var row_number = 0;
  while ( goog.isDefAndNotNull(field_row) ) {
    var field_record = {
      'side'       : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-side', field_row)  ),
      'name'       : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-name', field_row) ),
      'label'      : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-label', field_row) ),
      'placeholder': goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-placeholder', field_row) ),
      'type'       : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-type', field_row) ),
      'validator'  : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-validator', field_row) ),
      'value'      : goog.dom.forms.getValue( goog.dom.getElementByClass('withdraw-method-editor-field-value', field_row) )
    };
    result['fields'].push( field_record );

    row_number++;
    field_row = goog.dom.getNextElementSibling(field_row);
  }
  return result;
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethodEditor.prototype.onTableClick_ = function(e){
  if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'field-action-delete') )) {
    var tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    goog.dom.removeNode(tr_el );
    e.preventDefault();
    e.stopPropagation();
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.WithdrawMethodEditor.prototype.onAddField_ = function(e) {
  e.preventDefault();
  e.stopPropagation();

  var table_tbody_el =
    goog.dom.getElementsByTagNameAndClass( goog.dom.TagName.TBODY, undefined, goog.dom.getElement(this.makeId('form_table')))[0];

  var wrapper = this.getDomHelper().createElement('tbody');
  wrapper.innerHTML = bitex.ui.withdraw_method_editor.templates.WithdrawMethodFieldLineEditor({
    id: this.makeId('form'),
    idx: '',
    data: { 'side': 'client', 'name':'', 'validator':'', 'label':'', 'placeholder':'', 'type':'', 'value':'' }
  });
  goog.dom.appendChild( table_tbody_el, wrapper.firstChild );
};
