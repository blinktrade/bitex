goog.provide('bitex.view.View');
goog.provide('bitex.view.View.EventType');

goog.require('bitex.model.Model');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');
goog.require('goog.debug.Logger');
goog.require('goog.events.Event');


/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.View = function(app, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  this.is_active_ = false;
  this.app_ = app;
};
goog.inherits(bitex.view.View, goog.ui.Component);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.View.EventType = {
  CONNECT_BITEX: 'connect_bitex',

  CHANGE_BROKER: 'change_broker',

  CHANGE_PASSWORD: 'change_password',

  MARKET_DATA_SUBSCRIBE: 'md_subscribe',
  MARKET_DATA_UNSUBSCRIBE: 'md_unsubscribe',

  SECURITY_STATUS_SUBSCRIBE: 'sec_subscribe',
  SECURITY_STATUS_UNSUBSCRIBE: 'sec_unsubscribe',

  SEND_ORDER: 'send_order',
  CANCEL_ORDER: 'cancel_order',

  REQUEST_WITHDRAW: 'request_withdraw',
  CONFIRM_WITHDRAW: 'confirm_withdraw',
  PROCESS_WITHDRAW: 'process_withdraw',

  DEPOSIT_REQUEST: 'request_deposit',
  PROCESS_DEPOSIT: 'process_deposit',

  SHOW_QR: 'show_qr',
  UPLOAD_RECEIPT: 'upload_receipt',
  SHOW_RECEIPT: 'show_receipt' ,

  UPDATE_PROFILE: 'update_profile',
  SET_VERIFIED: 'set_verified',
  SET_WITHDRAW_EMAIL: 'set_withdraw_email',

  FILE_VIEW: 'file_view',

  ENABLE_TWOFACTOR: 'two_factor_enable',
  DISABLE_TWOFACTOR: 'two_factor_disable'
};


/**
 * @type {*}
 */
bitex.view.View.prototype.app_;

/**
 * @type {boolean}
 */
bitex.view.View.prototype.is_active_;


/**
 * @type {string}
 */
bitex.view.View.CSS_CLASS = goog.getCssName('bitex-view');

/** @inheritDoc */
bitex.view.View.prototype.getCssClass = function() {
  return bitex.view.View.CSS_CLASS;
};

/** @inheritDoc */
bitex.view.View.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var topEl;
  topEl = dom.createDom('div',this.getCssClass());
  return topEl;
};


/** @inheritDoc */
bitex.view.View.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  var dom = this.getDomHelper();
  return element;
};

bitex.view.View.prototype.getApplication = function() {
  return this.app_;
};


bitex.view.View.prototype.enterView = function() {
  this.is_active_ = true;
};

bitex.view.View.prototype.exitView = function() {
  this.is_active_ = false;
};

bitex.view.View.prototype.isActiveView = function() {
  return this.is_active_;
};

bitex.view.View.prototype.getContentElement = function() {
  var element = goog.dom.getElementByClass('bitex-view-content', this.getElement());
  return element || this.getElement();
};



/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
bitex.view.View.prototype.logger_ =
    goog.debug.Logger.getLogger('bitex.view.View');


/** @inheritDoc */
bitex.view.View.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


goog.ui.registry.setDecoratorByClassName(
    bitex.view.View.CSS_CLASS,
    function() {
      return new bitex.view.View();
    });

