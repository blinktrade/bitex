goog.provide('bitex.view.DepositView');
goog.provide('bitex.view.DepositView.EventType');

goog.require('bitex.view.View');



/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {bitex.view.View}
 */
bitex.view.DepositView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.DepositView, bitex.view.View);


/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.DepositView.EventType = {
  GEN_BOLETO: 'gen_boleto'
};

/**
 * @type {number}
 */
bitex.view.DepositView.prototype.amount_;

/**
 * @type {number}
 */
bitex.view.DepositView.prototype.boleto_id_;

/**
 * @return {number}
 */
bitex.view.DepositView.prototype.getAmount = function() {
  return this.amount_;
};

/**
 * @return {string}
 */
bitex.view.DepositView.prototype.getBoletoId = function() {
  return this.boleto_id_;
};


bitex.view.DepositView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  var model = this.getApplication().getModel();

  var boleto_buttons = goog.dom.getElementsByClass('boleto-options-group');
  goog.array.forEach(boleto_buttons, function(boleto_button) {
    handler.listen( model, bitex.model.Model.EventType.SET + "BoletoOptions", function(e) {
      var boleto_options = model.get('BoletoOptions');

      goog.array.forEach(boleto_options, function(boleto_option){
        var boleto_btn_attributes = {
          "data-boleto-id": boleto_option.id,
          "class" : "btn btn-primary btn-boleto"
        };
        var buttonElement = goog.dom.createDom( goog.dom.TagName.BUTTON, boleto_btn_attributes, boleto_option.description);

        goog.dom.appendChild(boleto_button, buttonElement);
      }, this);
    }, this);
  }, this);


  goog.array.forEach( boleto_buttons, function( boleto_button ) {
    handler.listen( boleto_button, 'click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var element = e.target;

      var value = goog.dom.forms.getValue( goog.dom.getElement("id_boleto_value") );
      var boleto_id = element.getAttribute('data-boleto-id');

      if (goog.isDefAndNotNull(boleto_id)) {
        if (goog.string.isEmpty(value) || !goog.string.isNumeric(value) || parseInt(value,10) <= 0 ) {
          /**
           * @desc message shown to the user when he enter an invalid amount to generate a boleto
           */
          var MSG_GENERATE_BOLETO_INVALID_AMOUNT = goog.getMsg('Por favor, preencha o valor do boleto a ser gerado');

          this.getApplication().showDialog(MSG_GENERATE_BOLETO_INVALID_AMOUNT );

          return;
        }

        this.amount_ = parseInt(value, 10);
        this.boleto_id_ = boleto_id;
        this.dispatchEvent(bitex.view.DepositView.EventType.GEN_BOLETO);
      }
    }, this);
  }, this);
};
