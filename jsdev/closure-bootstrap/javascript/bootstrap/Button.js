goog.provide('bootstrap.Button');

goog.require('goog.ui.Button');
goog.require('bootstrap.ButtonRenderer');

/**
 * A button control, rendered as a native browser button styled with Twitter Bootstrap.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM structure to display as the button's caption.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or decorate the button; defaults to {@link bootstrap.ButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for document interaction.
 * @constructor
 * @extends {goog.ui.Button}
 */
bootstrap.Button = function(content, opt_renderer, opt_domHelper) {
    goog.ui.Button.call(this, content, opt_renderer || bootstrap.ButtonRenderer.getInstance(), opt_domHelper)
};
goog.inherits(bootstrap.Button, goog.ui.Button);

/**
 * Button sizes
 * @enum {string}
 */
bootstrap.Button.Size = {
    LARGE: 'large',
    NORMAL: '',
    SMALL: 'small'
};

/**
 * Button kinds
 * @enum {string}
 */
bootstrap.Button.Kind = {
    PRIMARY: 'primary',
    DEFAULT: '',
    INFO: 'info',
    SUCCESS: 'success',
    DANGER: 'danger'
};

/**
 * @param {Array.<string>} classNames
 * @protected
 */
bootstrap.Button.prototype.removeClassNames = function(classNames) {
    for (var i = 0; i < classNames.length; i++) {
        this.removeClassName(classNames[i]);
    }
};

/**
 * @param {bootstrap.Button.Size} size
 */
bootstrap.Button.prototype.setSize = function(size) {
    this.removeClassNames(goog.object.getValues(bootstrap.Button.Size));
    this.addClassName(size);
};

/**
 * @param {bootstrap.Button.Kind} kind
 */
bootstrap.Button.prototype.setKind = function(kind) {
    this.removeClassNames(goog.object.getValues(bootstrap.Button.Kind));
    this.addClassName(kind);
};