goog.provide('bootstrap.TabRenderer');

goog.require('goog.ui.TabRenderer');
goog.require('goog.ui.registry');

/**
 * @constructor
 * @extends {goog.ui.TabRenderer}
 */
bootstrap.TabRenderer = function() {
    goog.ui.TabRenderer.call(this);
};
goog.inherits(bootstrap.TabRenderer, goog.ui.TabRenderer);
goog.addSingletonGetter(bootstrap.TabRenderer);

goog.ui.registry.setDecoratorByClassName('tab',
    function() {
        return new goog.ui.Tab(null, bootstrap.TabRenderer.getInstance());
    });

/**
 * @const
 * @type string
 */
bootstrap.TabRenderer.CSS_CLASS = '';
/**
 * @const
 * @type Object.<goog.ui.Component.State, string>
 */
bootstrap.TabRenderer.CLASS_BY_STATE = goog.object.create(
    goog.ui.Component.State.DISABLED, 'disabled',
    goog.ui.Component.State.HOVER, '-hov',
    goog.ui.Component.State.ACTIVE, '-act',
    goog.ui.Component.State.SELECTED, 'active',
    goog.ui.Component.State.CHECKED, '-chk',
    goog.ui.Component.State.FOCUSED, '-fcs',
    goog.ui.Component.State.OPENED, '-opnd');

/**
 * @const
 * @type Object.<string, goog.ui.Component.State>
 */
bootstrap.TabRenderer.STATE_BY_CLASS = goog.object.transpose(bootstrap.TabRenderer.CLASS_BY_STATE);

/**
 * @inheritDoc
 */
bootstrap.TabRenderer.prototype.getCssClass = function() {
    return bootstrap.TabRenderer.CSS_CLASS;
};

/**
 * @inheritDoc
 */
bootstrap.TabRenderer.prototype.getClassForState = function(state) {
    return bootstrap.TabRenderer.CLASS_BY_STATE[state];
};

/**
 * @inheritDoc
 */
bootstrap.TabRenderer.prototype.getStateFromClass = function(className) {
    var state = parseInt(bootstrap.TabRenderer.STATE_BY_CLASS[className], 10);
    return /** @type {goog.ui.Component.State} */ (isNaN(state) ? 0x00 : state);
};


/**
 * @inheritDoc
 */
bootstrap.TabRenderer.prototype.createDom = function(tab) {
    // Create and return DIV wrapping contents.
    var element = tab.getDomHelper().createDom('li', this.getClassNames(tab).join(' '),
        tab.getDomHelper().createDom('a', {'href':'javascript:;'}, tab.getContent()));

    this.setAriaStates(tab, element);

    var tooltip = tab.getTooltip();
    if (tooltip) {
        // Only update the element if the tab has a tooltip.
        this.setTooltip(element, tooltip);
    }

    return element;
};

/**
 * @inheritDoc
 */
bootstrap.TabRenderer.prototype.getContentElement = function(element) {
    return (/** @type Element */ element.firstChild);
};
