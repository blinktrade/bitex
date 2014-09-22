goog.provide('bitex.ui.WithdrawMethodEditor');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.withdraw_method_editor.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');
goog.require('uniform.Uniform');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.WithdrawMethodEditor = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.form_ = new uniform.Uniform();
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

/**
 * @type {uniform.Uniform}
 */
bitex.ui.WithdrawMethodEditor.prototype.form_;


/**
 * Sets the model associated with the UI component.
 * @param {*} obj The model.
 */
bitex.ui.WithdrawMethodEditor.prototype.setModel = function(obj) {
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);
  fmt.setMaximumFractionDigits(8);
  fmt.setMinimumFractionDigits(2);

  obj['percent_fee'] = fmt.format(obj['percent_fee'] );
  obj['fixed_fee'] = fmt.format( obj['fixed_fee']/1e8 );


  if (goog.isDefAndNotNull(obj['limits'])) {
    goog.object.forEach(obj['limits'], function(limit, verification_level ) {
      if (goog.isDefAndNotNull( limit['min'])) {
        limit['min'] = fmt.format(limit['min']/1e8 );
      }
      if (goog.isDefAndNotNull( limit['max'])) {
        limit['max'] = fmt.format(limit['max']/1e8);
      }
    }, this);
  }

  goog.base(this, 'setModel', obj);
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

  this.form_.decorate( goog.dom.getElement(this.makeId('form')) );


  handler.listen( goog.dom.getElement(this.makeId('form_table')), goog.events.EventType.CLICK, this.onTableClick_);

  handler.listen( goog.dom.getElement(this.makeId('form_add')), goog.events.EventType.CLICK, this.onAddField_);
};

/**
 * @return {Array.<string>}
 */
bitex.ui.WithdrawMethodEditor.prototype.validate = function() {
  if (goog.isDefAndNotNull(this.form_)) {
    this.form_.dispose();
  }
  this.form_ = new uniform.Uniform();
  this.form_.decorate( goog.dom.getElement(this.makeId('form')) );

  return this.form_.validate();
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
      ],
     limits : {
        "0": {enabled:false},
        "1": {enabled:false},
        "2": {enabled:true, min:10, max:1500}
     }
     fixed_fee: "0"
     method: "paypal"
     percent_fee: "3"
  }
  */
  var fmt = new goog.i18n.NumberFormat( goog.i18n.NumberFormat.Format.DECIMAL);

  var result = {};
  result['method']      = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_name')) );
  result['description'] = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_description')) );
  result['disclaimer']  = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_placeholder')) );
  result['percent_fee'] = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_percent_fee')) );
  result['fixed_fee']   = goog.dom.forms.getValue( goog.dom.getElement(this.makeId('form_fixed_fee')) );

  var pos = [0];
  var tmp = result['percent_fee'];
  result['percent_fee'] = fmt.parse(tmp , pos );
  if (pos[0] != tmp.length || isNaN(result['percent_fee']) || result['percent_fee'] <= 0 ) {
    result['percent_fee'] = 0;
  }

  pos = [0];
  tmp = result['fixed_fee'];
  result['fixed_fee'] = fmt.parse(tmp , pos );
  if (pos[0] != tmp.length || isNaN(result['fixed_fee']) || result['fixed_fee'] <= 0 ) {
    result['fixed_fee'] = 0;
  }
  result['fixed_fee'] =  result['fixed_fee'] * 1e8;

  var fields_limits_tbody_element = goog.dom.getNextElementSibling(
      goog.dom.getFirstElementChild(
          goog.dom.getElement( this.makeId('form_limits') ))) ;
  result['limits'] = {};
  var limit_row = goog.dom.getFirstElementChild(fields_limits_tbody_element);
  var verification_level = 0;
  while ( goog.isDefAndNotNull(limit_row) ) {
    var enabled = goog.dom.forms.getValue( goog.dom.getElement( this.makeId('form_level_' + verification_level + '_enabled')));

    var limit_record = {
      'enabled': goog.isDefAndNotNull(enabled)
    };
    if (enabled) {
      var limit_min = goog.dom.forms.getValue( goog.dom.getElement( this.makeId('form_level_' + verification_level + '_min')));
      if (limit_min) {
        pos = [0];
        limit_record['min'] = fmt.parse(limit_min, pos );
        if (pos[0] != limit_min.length || isNaN(limit_record['min']) || limit_record['min'] <= 0 ) {
          delete limit_record['min'];
        } else {
          limit_record['min'] =  limit_record['min'] * 1e8;
        }
      }

      var limit_max = goog.dom.forms.getValue( goog.dom.getElement( this.makeId('form_level_' + verification_level + '_max')));
      if (limit_max) {
        pos = [0];
        limit_record['max'] = fmt.parse(limit_max, pos );
        if (pos[0] != limit_max.length || isNaN(limit_record['max']) || limit_record['max'] <= 0 ) {
          delete limit_record['max'];
        } else{
          limit_record['max'] =  limit_record['max'] * 1e8;
        }
      }
    }

    result['limits']['' + verification_level] = limit_record ;

    verification_level++;
    limit_row = goog.dom.getNextElementSibling(limit_row);
  }


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
