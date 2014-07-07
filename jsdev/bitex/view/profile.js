goog.provide('bitex.view.ProfileView');
goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawMethods');
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


    var withdraw_methods = new bitex.ui.WithdrawMethods();

    var withdraw_methods_model = [];
    goog.object.forEach(model.get('Profile')['WithdrawStructure'], function( withdraw_methods, currency) {
      var obj = { 'currency': currency };

      goog.array.forEach(withdraw_methods, function(withdraw_method) {
        goog.object.extend( obj, withdraw_method );
      });

      withdraw_methods_model.push(obj);
    });

    console.log( goog.debug.deepExpose(withdraw_methods_model) );

    withdraw_methods.setModel(withdraw_methods_model);

    this.addChild(withdraw_methods, true);
  }
};

bitex.view.ProfileView.prototype.exitView = function() {
  this.removeChildren(true);
};


