goog.provide('bootstrap.TabBarRenderer');

goog.require('goog.ui.TabBarRenderer');

/**
 * @constructor
 * @extends {goog.ui.TabBarRenderer}
 * @param {string} tabBarCssClass
 */
bootstrap.TabBarRenderer = function(tabBarCssClass) {
    goog.ui.TabBarRenderer.call(this);
    /**
     * @private
     * @type string
     */
    this.tabBarCssClass_ = tabBarCssClass;
};
goog.inherits(bootstrap.TabBarRenderer, goog.ui.TabBarRenderer);

/**
 * @inheritDoc
 */
bootstrap.TabBarRenderer.prototype.getCssClass = function() {
    return this.tabBarCssClass_;
};

/**
 * @inheritDoc
 */
bootstrap.TabBarRenderer.prototype.setStateFromClassName = function(tabBar, className, baseClass) {
    tabBar.setLocation(goog.ui.TabBar.Location.TOP);
};


/**
 * @inheritDoc
 */
bootstrap.TabBarRenderer.prototype.getClassNames = function(tabBar) {
    return [this.tabBarCssClass_];
};

/**
 * @inheritDoc
 */
bootstrap.TabBarRenderer.prototype.createDom = function(container) {
  return container.getDomHelper().createDom('ul',
      this.getClassNames(container).join(' '));
};

/**
 * @inheritDoc
 */
bootstrap.TabBarRenderer.prototype.canDecorate = function(element) {
  return element.tagName == 'UL';
};
