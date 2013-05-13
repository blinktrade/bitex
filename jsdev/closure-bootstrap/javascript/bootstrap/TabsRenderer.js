goog.provide('bootstrap.TabsRenderer');

goog.require('bootstrap.TabBarRenderer');
goog.require('goog.ui.registry');

/**
 * @constructor
 * @extends {bootstrap.TabBarRenderer}
 */
bootstrap.TabsRenderer = function() {
    bootstrap.TabBarRenderer.call(this, bootstrap.TabsRenderer.CSS_CLASS);
};
goog.inherits(bootstrap.TabsRenderer, bootstrap.TabBarRenderer);
goog.addSingletonGetter(bootstrap.TabsRenderer);


/**
 * @const
 * @type {string}
 */
bootstrap.TabsRenderer.CSS_CLASS = 'nav nav-tabs';

goog.ui.registry.setDecoratorByClassName(bootstrap.TabsRenderer.CSS_CLASS,
    function() {
        return new goog.ui.TabBar(goog.ui.TabBar.Location.TOP, bootstrap.TabsRenderer.getInstance());
    });