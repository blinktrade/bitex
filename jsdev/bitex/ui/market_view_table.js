goog.provide('bitex.ui.MarketViewTable');
goog.require('goog.ui.Component');

goog.require('bitex.model.Model');
goog.require('bitex.ui.market_view_table.templates');
goog.require('goog.style');

goog.require('goog.dom.classes');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.MarketViewTable = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(bitex.ui.MarketViewTable, goog.ui.Component);

/**
 * @type {string}
 */
bitex.ui.MarketViewTable.CSS_CLASS = goog.getCssName('market-view-table');

/** @inheritDoc */
bitex.ui.MarketViewTable.prototype.getCssClass = function() {
  return bitex.ui.MarketViewTable.CSS_CLASS;
};

/** @inheritDoc */
bitex.ui.MarketViewTable.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var topEl = goog.soy.renderAsElement(bitex.ui.market_view_table.templates.MarketViewTable, {
    id: this.makeId('form'),
    instruments: this.getModel().instruments
  });

  this.setElementInternal(topEl);
};

bitex.ui.MarketViewTable.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  handler.listen( goog.dom.getElement(this.makeId('form_table')), goog.events.EventType.CLICK, this.onTableClick_);

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.MarketViewTable.prototype.onTableClick_ = function(e){
    if (goog.dom.classes.has( e.target, goog.getCssName(this.getCssClass() ,  'field-action-select') )) {
        var tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );


        e.preventDefault();
        e.stopPropagation();
    }
};

