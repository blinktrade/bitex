goog.provide('bitex.view.ProfileView');
goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawMethodEditor');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.ProfileView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.ProfileView, bitex.view.View);


bitex.view.ProfileView.prototype.enterView = function() {
  var model = this.getApplication().getModel();

  if (model.get('IsBroker') ) {
    var editor = new bitex.ui.WithdrawMethodEditor();
    editor.setModel(model.get('Profile')['WithdrawStructure']['BTC'][0]);

    this.addChild(editor, true);

  }


};

bitex.view.ProfileView.prototype.exitView = function() {

};

