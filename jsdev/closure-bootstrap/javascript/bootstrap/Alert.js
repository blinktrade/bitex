goog.provide('bootstrap.Alert');

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');
goog.require('goog.debug.Logger');
goog.require('goog.events.Event');


/**
 * @param {string=} opt_type
 * @param {string|Element=} opt_content
 * @param {boolean=} opt_close. Defaults to true
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bootstrap.Alert = function(opt_type, opt_content, opt_close , opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  this.type_ = opt_type;
  this.content_ = opt_content;
  this.has_close_ = true;

  if ( goog.isDefAndNotNull(opt_close) && opt_close === false ) {
    this.has_close_ = false;
  }
};
goog.inherits(bootstrap.Alert, goog.ui.Component);

/**
 * @type {string}
 */
bootstrap.Alert.CSS_CLASS = 'alert';

/**
 * @type {string}
 */
bootstrap.Alert.prototype.type_;

/**
 * @type {string|Element}
 */
bootstrap.Alert.prototype.content_;

/**
 * @type {boolean}
 */
bootstrap.Alert.prototype.has_close_;

/** @inheritDoc */
bootstrap.Alert.prototype.getCssClass = function() {
  return bootstrap.Alert.CSS_CLASS;
};

/** @inheritDoc */
bootstrap.Alert.prototype.createDom = function() {
  var dom = this.getDomHelper();

  var element;
  if (this.has_close_) {
    element = dom.createDom('div', [ this.getCssClass() , this.getCssClass() + '-' + this.type_  ],
                         dom.createDom('button', ['close', 'pull-right'], '×'),
                         this.content_);
  } else {
    element = dom.createDom('div', [this.getCssClass(), this.getCssClass() + '-' + this.type_  ], this.content_);
  }

  this.setElementInternal(element);
  return element;
};


/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
bootstrap.Alert.prototype.logger_ =
    goog.debug.Logger.getLogger('bootstrap.Alert');


/** @inheritDoc */
bootstrap.Alert.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var dom = this.getDomHelper();

  var handler = this.getHandler();

  var closeBtn = dom.getElementByClass('close', this.getElement()) ;
  if (goog.isDefAndNotNull(closeBtn)) {
    handler.listenOnce(closeBtn, goog.events.EventType.CLICK, function(e){
      this.dispose();
    });
  }
};


