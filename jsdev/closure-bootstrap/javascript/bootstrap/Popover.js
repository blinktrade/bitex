goog.provide('bootstrap.Popover');

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.debug.Logger');
goog.require('goog.events.Event');


/**
 * @param {string=} opt_title
 * @param {string=} opt_content
 * @param {string=} opt_placement. Defaults to right
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bootstrap.Popover = function(opt_title, opt_content, opt_placement, opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  
  this.title_ = opt_title;
  this.content_ = opt_content ;
  this.placement_ = opt_placement || 'right';
};
goog.inherits(bootstrap.Popover, goog.ui.Component);

/**
 * @type {string}
 */
bootstrap.Popover.CSS_CLASS = 'popover';

/**
 * @type {string}
 */
bootstrap.Popover.prototype.title_;

/**
 * @type {string}
 */
bootstrap.Popover.prototype.content_;

/**
 * @type {string}
 */
bootstrap.Popover.prototype.placement_;

/** @inheritDoc */
bootstrap.Popover.prototype.getCssClass = function() {
  return bootstrap.Popover.CSS_CLASS;
};


bootstrap.Popover.install = function(){
  goog.events.listen(document.body, goog.events.EventType.CLICK , function(e) {
    var element = e.target;

    var is_popover = false;
    if (element.getAttribute('data-toggle') == bootstrap.Popover.CSS_CLASS) {
      is_popover = true;
    } else {
      while( goog.isDefAndNotNull(element)) {
        element = goog.dom.getParentElement(element);

        if (goog.isDefAndNotNull(element) && element.getAttribute('data-toggle') == bootstrap.Popover.CSS_CLASS) {
          is_popover = true;
          break;
        }
      }
    }
    if (!is_popover) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    var placement = element.getAttribute('data-placement');
    var content =  element.getAttribute('data-content');
    var title =  element.getAttribute('data-original-title') || element.getAttribute('title');

    var next_sibling = goog.dom.getNextElementSibling(element);
    if (goog.isDefAndNotNull(next_sibling)) {
      if (goog.dom.classes.has(next_sibling, bootstrap.Popover.CSS_CLASS)) {
        goog.dom.removeNode(next_sibling);
      } else {
        var popover = new bootstrap.Popover(title, content, placement);
        popover.renderBefore(next_sibling);
      }
    } else {
      console.log('text');
    }
  });
};

/** @inheritDoc */
bootstrap.Popover.prototype.createDom = function() {
  var dom = this.getDomHelper();
  var topEl;
  topEl = dom.createDom('div',[ this.getCssClass(), 'fade', this.placement_, 'in' ],
    dom.createDom('div', 'arrow'),
    dom.createDom('h3', goog.getCssName(this.getCssClass(), 'title'), this.title_ ),
    dom.createDom('h3', goog.getCssName(this.getCssClass(), 'content'), this.content_ )
  );

  this.setElementInternal(topEl);
};


/** @inheritDoc */
bootstrap.Popover.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  var dom = this.getDomHelper();
  return element;
};
