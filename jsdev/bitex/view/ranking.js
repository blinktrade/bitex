goog.provide('bitex.view.RankingView');
goog.require('bitex.view.View');
goog.require('bitex.ui.RankingViewTable');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.RankingView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);

};
goog.inherits(bitex.view.RankingView, bitex.view.View);

/**
 * @type {bitex.ui.RankingViewTable}
 */
bitex.view.RankingView.prototype.ranking_table_;


bitex.view.RankingView.prototype.enterView = function() {
  goog.base(this, 'enterView');
  this.recreateComponents_();
};

bitex.view.RankingView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.destroyComponents_();
};

bitex.view.RankingView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

/**
 * @override
 * @protected
 */
bitex.view.RankingView.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.destroyComponents_();
};

bitex.view.RankingView.prototype.recreateComponents_ = function() {
    var handler = this.getHandler();

    this.ranking_table_ = new bitex.ui.RankingViewTable();
    handler.listen(this.ranking_table_,
                   bitex.ui.DataGrid.EventType.REQUEST_DATA,
                   this.onRankingTableRequestData_);

    handler.listen(this.getApplication().getBitexConnection(),
                 bitex.api.BitEx.EventType.TRADERS_RANK_RESPONSE, this.onTradeRankResponse_);

    this.addChild(this.ranking_table_, true);
};

bitex.view.RankingView.prototype.destroyComponents_ = function( ) {
    var handler = this.getHandler();

    if (goog.isDefAndNotNull(this.ranking_table_) ) {
      handler.unlisten(this.ranking_table_,
                       bitex.ui.DataGrid.EventType.REQUEST_DATA,
                       this.onRankingTableRequestData_);

      handler.unlisten(this.getApplication().getBitexConnection(),
                       bitex.api.BitEx.EventType.TRADERS_RANK_RESPONSE, this.onTradeRankResponse_);
    }

    this.removeChildren(true);
};

bitex.view.RankingView.prototype.onRankingTableRequestData_ = function(e) {
  var page = e.options['Page'];
  var limit = e.options['Limit'];
  var filter = e.options['Filter'];

  var conn = this.getApplication().getBitexConnection();
  conn.requestTradersRank(undefined, page, limit, undefined, filter );
};

/**
 * @param {goog.events.Event} e
 */
bitex.view.RankingView.prototype.onTradeRankResponse_ = function(e) {
  if (!goog.isDefAndNotNull(this.ranking_table_) ) {
    return
  }

  var msg = e.data;
  this.ranking_table_.setResultSet( msg['TradersRankGrp'], msg['Columns'] );
};
