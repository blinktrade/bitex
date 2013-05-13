goog.provide('bootstrap.Pills');

goog.require('goog.ui.TabBar');
goog.require('bootstrap.PillsRenderer');

/**
 * Tab bar UI component styled with Twitter Bootstrap
 * @param {goog.ui.TabBarRenderer=} opt_renderer Renderer used to render or decorate the container; defaults to {@link bootstrap.PillsRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document interaction.
 * @constructor
 * @extends {goog.ui.TabBar}
 */
bootstrap.Pills = function(opt_renderer, opt_domHelper) {
    goog.ui.TabBar.call(this, goog.ui.TabBar.Location.TOP, opt_renderer || bootstrap.PillsRenderer.getInstance(), opt_domHelper)
};
goog.inherits(bootstrap.Pills, goog.ui.TabBar);