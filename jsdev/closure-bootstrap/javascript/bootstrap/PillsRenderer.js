goog.provide('bootstrap.PillsRenderer');

goog.require('bootstrap.TabBarRenderer');
goog.require('goog.ui.registry');

/**
 * @constructor
 * @extends {bootstrap.TabBarRenderer}
 */
bootstrap.PillsRenderer = function() {
    bootstrap.TabBarRenderer.call(this, bootstrap.PillsRenderer.CSS_CLASS);
};
goog.inherits(bootstrap.PillsRenderer, bootstrap.TabBarRenderer);
goog.addSingletonGetter(bootstrap.PillsRenderer);


/**
 * @const
 * @type {string}
 */
bootstrap.PillsRenderer.CSS_CLASS = 'pills';

goog.ui.registry.setDecoratorByClassName(bootstrap.PillsRenderer.CSS_CLASS,
    function() {
        return new goog.ui.TabBar(goog.ui.TabBar.Location.TOP, bootstrap.PillsRenderer.getInstance());
    });