goog.provide('bitex.ui.Withdraw');
goog.provide('bitex.ui.WithdrawModel');
goog.provide('bitex.ui.Withdraw.EventType');

goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');
goog.require('goog.debug.Logger');
goog.require('goog.events.Event');


/**
 * @typedef {{ parent_id:String, currency:String ,type:String, button_label:String, title:String, description:String, controls:Array.<Array.<string>>  }}
 */
bitex.ui.WithdrawModel;


/**
 * @param {bitex.ui.WithdrawModel=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.ui.Withdraw = function(opt_model,opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  this.setModel(opt_model);
};
goog.inherits(bitex.ui.Withdraw, goog.ui.Component);

/**
 * @type {string}
 */
bitex.ui.Withdraw.CSS_CLASS = goog.getCssName('bitex-withdraw');


/**
 * @enum {string}
 */
bitex.ui.Withdraw.EventType = {
  WITHDRAW: 'withdraw_event'
};


/** @inheritDoc */
bitex.ui.Withdraw.prototype.getCssClass = function() {
  return bitex.ui.Withdraw.CSS_CLASS;
};


/** @override */
bitex.ui.Withdraw.prototype.makeId = function(idFragment) {
  return this.getId() + '_' + idFragment;
};

/** @override */
bitex.ui.Withdraw.prototype.getId = function() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId().substring(1));
};


/** @inheritDoc */
bitex.ui.Withdraw.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /*
  <div class="accordion-group">
    <div class="accordion-heading">
      <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#withdraw_accordion" href="#bitcoin">
        Retirada em Bitcoin
      </a>
    </div>
    <div id="bitcoin" class="accordion-body collapse" style="height: 0;">
      <div class="accordion-inner">
        <p>Utilize o formulário abaixo para iniciar a sua retirada.</p>
        <div class="well" >
          <div class="control-group">
            <label class="control-label" name="amount">Quantidade</label>
            <div class="controls">
              <div class="input-prepend"><span class="add-on">฿</span><input type="text" name="amount" class="btc-withdraw-qty input-xlarge" placeholder="Digite a quantidade"></div>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" name="address">Endereço Bitcoin</label>
            <div class="controls">
              <input type="text" name="address" class="input-xlarge btc-withdraw-address" placeholder="Digite o endereço bitcoin">
            </div>
          </div>
          <div class="input">
            <input type="submit" value="Retirada em BTC" class="btn btn-primary btc-withdraw-submit">
          </div>
        </div>
      </div>
    </div>
  </div>
  */

  var controlsEls = [] ;
  goog.array.forEach( this.getModel().controls, function(control) {
    // control = [ name, label, place_holder, prepend ]

    var controlsEl;
    var prepend = control[3];
    if (goog.isDefAndNotNull(prepend)) {
      controlsEl = dom.createDom('div', 'control-group',
                     dom.createDom('label', 'control-label', control[1] ),
                     dom.createDom('div', 'controls',
                       dom.createDom('div', 'input-prepend',
                         dom.createDom('span', 'add-on', prepend),
                         dom.createDom('input', {'type':'text', 'id': this.makeId('id_'+control[0]), 'name':control[0], 'class':'input-xlarge', 'placeholder': control['2'] })
                       )
                     )
                  );


    } else {
      controlsEl = dom.createDom('div', 'control-group',
                      dom.createDom('label', 'control-label', control[1] ),
                      dom.createDom('div', 'controls',
                        dom.createDom('input', {'type':'text', 'id': this.makeId('id_'+control[0]) , 'name':control[0], 'class':'input-xlarge', 'placeholder': control['2'] })
                      )
                    );

    }


    controlsEls.push( controlsEl );
  }, this);

  var topEl;
  topEl = dom.createDom('div',[ this.getCssClass(), 'accordion-group' ],
            dom.createDom('div', 'accordion-heading',
              dom.createDom('a', { 'class':'accordion-toggle collapsed', 'data-toggle':'collapse', 'data-parent': '#' + this.getModel().parent_id, 'href': '#' + this.makeId('body')   }, this.getModel().title)
            ),
            dom.createDom('div', { 'class': 'accordion-body collapse', 'id':this.makeId('body') , 'style':"height: 0;"  },
              dom.createDom('div', 'accordion-inner',
                dom.createDom('p', undefined, this.getModel().description ),
                dom.createDom('div', 'well',
                  controlsEls,
                  dom.createDom('div', 'input',
                    dom.createDom('input', {'type':'submit', 'class':'btn btn-primary', 'id':this.makeId('btn') ,'value':this.getModel().button_label } )
                  )
                )
              )
            )
          );
  this.setElementInternal(topEl);
};

/** @override */
bitex.ui.Withdraw.prototype.canDecorate = function() {
  return false;
};


/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
bitex.ui.Withdraw.prototype.logger_ =
    goog.debug.Logger.getLogger('bitex.ui.Withdraw');


/** @inheritDoc */
bitex.ui.Withdraw.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();

  var submitBtn = this.getElementByFragment("btn");
  handler.listen(submitBtn,goog.events.EventType.CLICK,this.onAction_ );
};

/**
 * @param {Event} e
 */
bitex.ui.Withdraw.prototype.onAction_ = function(e) {
  var data = {};

  goog.array.forEach( this.getModel().controls, function(control) {
    data[ control[0] ] = goog.dom.forms.getValue(this.getElementByFragment('id_' + control[0])) ;
  }, this);

  data['Type'] = this.getModel().type;
  data['Currency'] = this.getModel().currency;

  this.getModel().data = data;

  this.dispatchEvent(bitex.ui.Withdraw.EventType.WITHDRAW);
};

goog.ui.registry.setDecoratorByClassName(
    bitex.ui.Withdraw.CSS_CLASS,
    function() {
      return new bitex.ui.Withdraw();
    });

