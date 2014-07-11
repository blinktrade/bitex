goog.provide('bitex.view.ProfileView');
goog.require('bitex.view.View');

goog.require('bitex.ui.WithdrawMethods');
goog.require('bitex.ui.WithdrawMethodEditor');

goog.require('goog.date.UtcDateTime');
goog.require('goog.graphics.Stroke');
goog.require('goog.i18n.DateTimeFormat');


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
  goog.base(this, 'enterView');
  var model = this.getApplication().getModel();
  if (model.get('IsBroker') ) {


    var withdraw_methods = new bitex.ui.WithdrawMethods();
    var valueFormatter = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.DECIMAL);

    var broker_currencies = [];
    goog.array.forEach (model.get('Profile')['BrokerCurrencies'], function(currency) {
      var obj = {
        'code': currency,
        'description': this.getApplication().getCurrencyDescription(currency)
      };
      broker_currencies.push(obj);
    }, this );

    var withdraw_methods_model = [];
    goog.object.forEach(model.get('Profile')['WithdrawStructure'], function( withdraw_methods, currency) {
      goog.array.forEach(withdraw_methods, function(withdraw_method) {
        var obj = {
          'currency': currency,
          'currency_description': this.getApplication().getCurrencyDescription(currency)
        };
        goog.object.extend(obj, withdraw_method);

        var pos = [0];
        var fixed_fee = valueFormatter.parse(obj['fixed_fee'], pos);

        obj['has_fixed_fee'] = !(pos[0] != obj['fixed_fee'].length || isNaN(fixed_fee) || fixed_fee <= 0 );


        obj['formatted_fixed_fee'] = this.getApplication().formatCurrency(fixed_fee, currency, true );

        withdraw_methods_model.push(obj);
      }, this);
    }, this);
    withdraw_methods.setModel( { 'withdraw_methods':withdraw_methods_model, 'currencies':broker_currencies } );

    this.addChild(withdraw_methods, true);
    withdraw_methods.enterDocument();
  } else {



  }
};

bitex.view.ProfileView.prototype.exitView = function() {
  goog.base(this, 'exitView');
  this.removeChildren(true);
};

/** @override */
bitex.view.ProfileView.prototype.enterDocument = function() {
  var handler = this.getHandler();

  handler.listen(this, bitex.ui.WithdrawMethods.EventType.DELETE_WITHDRAW_METHOD, this.onDeleteMethod_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.EDIT_WITHDRAW_METHOD, this.onEditMethod_);
  handler.listen(this, bitex.ui.WithdrawMethods.EventType.ADD_WITHDRAW_METHOD, this.onAddMethod_);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onDeleteMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  var withdraw_method = e.target.getSelectedMethod();
  var model = this.getApplication().getModel();

  var idx = goog.array.findIndex(model.get('Profile')['WithdrawStructure'][currency], function(wm) {
    if (wm['method'] ==  withdraw_method) {
      return true;
    }
  } );


  console.log('deleted ' + currency + ',' + withdraw_method  );
  delete model.get('Profile')['WithdrawStructure'][currency][idx];
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onEditMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  var withdraw_method = e.target.getSelectedMethod();
  var model = this.getApplication().getModel();

  var idx = goog.array.findIndex(model.get('Profile')['WithdrawStructure'][currency], function(wm) {
    if (wm['method'] ==  withdraw_method) {
      return true;
    }
  });

  var withdraw_method_editor = new  bitex.ui.WithdrawMethodEditor();
  withdraw_method_editor.setModel(model.get('Profile')['WithdrawStructure'][currency][idx]);

  /**
   * @desc Edit Method dialog title
   */
  var MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE = goog.getMsg('Edit withdraw method');
  var title = MSG_EDIT_WITHDRAW_METHOD_DIALOG_TITLE;

  var buttonSet = bootstrap.Dialog.ButtonSet.createOkCancel();

  var dialog_ = new bootstrap.Dialog();
  dialog_.setTitle(title);
  dialog_.addChild(withdraw_method_editor, true);
  dialog_.setButtonSet( buttonSet);
  dialog_.setVisible(true);
  goog.style.setWidth(dialog_.getElement(), 700);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.ProfileView.prototype.onAddMethod_ = function(e) {
  var currency = e.target.getSelectedCurrency();
  console.log('adding withdraw method for ' + currency )
};



