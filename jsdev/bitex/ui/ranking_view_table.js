goog.provide('bitex.ui.RankingViewTable');

goog.require('goog.dom.classes');
goog.require('goog.object');

goog.require('goog.Timer');

goog.require('bitex.ui.DataGrid');

/**
 * @desc Column Rank
 */
var MSG_RANKING_COLUMN_NO = goog.getMsg('#');

/**
 * @desc Column Trader
 */
var MSG_RANKING_COLUMN_TRADER = goog.getMsg('Trader');

/**
 * @desc Column Trader
 */
var MSG_RANKING_COLUMN_BROKER = goog.getMsg('Broker');

/**
 * @desc Column BTC Amount
 */
var MSG_RANKING_COLUMN_AMOUT = goog.getMsg('BTC Amount');

/**
 * @param {number} opt_blinkDelay. Defaults to 700 milliseconds
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.RankingViewTable = function (opt_domHelper) {

  var grid_columns = [
    {
      'property': 'Rank',
      'label': MSG_RANKING_COLUMN_NO,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.RankingViewTable.CSS_CLASS, 'rank'); }
    },{
      'property': 'Trader',
      'label': MSG_RANKING_COLUMN_TRADER,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.RankingViewTable.CSS_CLASS, 'trader'); }
    },{
      'property': 'Broker',
      'label': MSG_RANKING_COLUMN_BROKER,
      'sortable': false,
      'classes': function() { return goog.getCssName(bitex.ui.RankingViewTable.CSS_CLASS, 'broker'); }
    },{
      'property': 'Amount',
      'label': MSG_RANKING_COLUMN_AMOUT,
      'sortable': false,
      'formatter': function(value){ return app.formatCurrency(value/1e8, 'BTC', true); },
      'classes': function() { return goog.getCssName(bitex.ui.RankingViewTable.CSS_CLASS, 'amount'); }
    }
  ];

  this.selected_trade_ = null;


  var options = {
    'rowIDFn':this.getRowId,
    'columns': grid_columns,
    'show_search': false
  };
  bitex.ui.DataGrid.call(this,  options , opt_domHelper);

};
goog.inherits(bitex.ui.RankingViewTable, bitex.ui.DataGrid);

/**
 * @type {string}
 */
bitex.ui.RankingViewTable.CSS_CLASS = goog.getCssName('ranking');

/**
 * @param {Object} row_set
 * @return {string}
 */
bitex.ui.RankingViewTable.prototype.getRowId = function(row_set) {
  return this.makeId(row_set['rank'] );
};


goog.ui.registry.setDecoratorByClassName(
  bitex.ui.RankingViewTable.CSS_CLASS,
  function() {
    return new bitex.ui.RankingViewTable();
  });
