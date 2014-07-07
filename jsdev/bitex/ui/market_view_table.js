goog.provide('bitex.ui.MarketViewTable');
goog.provide('bitex.ui.MarketViewTable.EventType');
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
 * The events fired
 * @enum {string} The event types
 */
bitex.ui.MarketViewTable.EventType = {
  SELECT_SYMBOL: 'select_symbol'
};

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

bitex.ui.MarketViewTable.prototype.selectFirst = function(e){
  var tbody = goog.dom.getElementsByTagNameAndClass(
        goog.dom.TagName.TBODY, undefined, goog.dom.getElement(this.makeId('form_table')))[0];

  var first_tr_element = goog.dom.getFirstElementChild(tbody);

  if (goog.isDefAndNotNull(first_tr_element)) {

    var selected_tr_elements = goog.dom.getElementsByClass(goog.getCssName(this.getCssClass() ,  'selected'),
                                                           goog.dom.getElement(this.makeId('form_table'))  );

    goog.array.forEach(selected_tr_elements, function(selected_tr_el) {
        goog.dom.classes.remove( selected_tr_el, goog.getCssName(this.getCssClass() ,  'selected') );
    },this);

    goog.dom.classes.add( first_tr_element, goog.getCssName(this.getCssClass() ,  'selected') );
    this.dispatchEvent(bitex.ui.MarketViewTable.EventType.SELECT_SYMBOL);
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.MarketViewTable.prototype.onTableClick_ = function(e){
    var tr_el = goog.dom.getAncestorByTagNameAndClass(e.target, goog.dom.TagName.TR );
    if (goog.isDefAndNotNull(tr_el)) {

        if (goog.dom.classes.has( tr_el, goog.getCssName(this.getCssClass() ,  'selected') )) {
            return;
        } else {
            var selected_tr_elements = goog.dom.getElementsByClass(goog.getCssName(this.getCssClass() ,  'selected'),
            goog.dom.getElement(this.makeId('form_table'))  );

            goog.array.forEach(selected_tr_elements, function(selected_tr_el) {
                goog.dom.classes.remove( selected_tr_el, goog.getCssName(this.getCssClass() ,  'selected') );
            },this);

            goog.dom.classes.add( tr_el, goog.getCssName(this.getCssClass() ,  'selected') );
            this.dispatchEvent(bitex.ui.MarketViewTable.EventType.SELECT_SYMBOL);
        }

        e.preventDefault();
        e.stopPropagation();
    }

};

/**
 * @return {string}
 */
bitex.ui.MarketViewTable.prototype.getSelectedSymbol = function() {
  var selected_tr_el= goog.dom.getElementByClass(goog.getCssName(this.getCssClass() ,  'selected'),
                goog.dom.getElement(this.makeId('form_table'))  );

  if (goog.isDefAndNotNull(selected_tr_el)) {
    return selected_tr_el.getAttribute('data-symbol');
  }
};
