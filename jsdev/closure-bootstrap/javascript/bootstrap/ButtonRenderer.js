goog.provide('bootstrap.ButtonRenderer');

goog.require('goog.ui.NativeButtonRenderer');
goog.require('goog.ui.registry');

/**
 * @constructor
 * @extends {goog.ui.NativeButtonRenderer}
 */
bootstrap.ButtonRenderer = function() {
    goog.ui.NativeButtonRenderer.call(this);
};
goog.inherits(bootstrap.ButtonRenderer, goog.ui.NativeButtonRenderer);
goog.addSingletonGetter(bootstrap.ButtonRenderer);

/**
 * @const
 * @type string
 */
bootstrap.ButtonRenderer.CSS_CLASS = 'btn';

goog.ui.registry.setDecoratorByClassName(bootstrap.ButtonRenderer.CSS_CLASS,
    function() {
        return new goog.ui.Button(null, bootstrap.ButtonRenderer.getInstance());
    });

/**
 * @inheritDoc
 */
bootstrap.ButtonRenderer.prototype.getClassForState = function(state) {
    return bootstrap.ButtonRenderer.CSS_CLASS;
};

/**
 * @inheritDoc
 */
bootstrap.ButtonRenderer.prototype.getCssClass = function() {
  return bootstrap.ButtonRenderer.CSS_CLASS;
};
