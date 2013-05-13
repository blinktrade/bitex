goog.provide('bootstrap.Tab');

goog.require('goog.ui.Tab');
goog.require('bootstrap.TabRenderer');

/**
 * Tab control, designed to be hosted in a {@link goog.ui.TabBar}.
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to display as the tab's caption (if any).
 * @param {goog.ui.TabRenderer=} opt_renderer Optional renderer used to render or decorate the tab.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for document interaction.
 * @constructor
 * @extends {goog.ui.Tab}
 */
bootstrap.Tab = function(content, opt_renderer, opt_domHelper) {
    goog.ui.Tab.call(this, content, opt_renderer || bootstrap.TabRenderer.getInstance(), opt_domHelper)
};
goog.inherits(bootstrap.Tab, goog.ui.Tab);