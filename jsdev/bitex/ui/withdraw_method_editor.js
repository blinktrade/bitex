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
