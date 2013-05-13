goog.provide('bootstrap.Dialog');

goog.require('goog.a11y.aria');
goog.require('goog.ui.Dialog');

/**
 * It's not a great solution for overriding createDom like this
 * but looks like it's the only way
 * @constructor
 * @extends goog.ui.Dialog
 */
bootstrap.Dialog = function() {
    goog.ui.Dialog.call(this, 'modal');
};
goog.inherits(bootstrap.Dialog, goog.ui.Dialog);

/**
 * @suppress {accessControls}
 */
bootstrap.Dialog.prototype.createDom = function() {
    goog.ui.ModalPopup.prototype.createDom.call(this);
    var element = this.getElement();
    goog.asserts.assert(element, 'getElement() returns null');

    var dom = this.getDomHelper();
    this.titleEl_ = dom.createDom('div',
        {'className': 'modal-header', 'id': this.getId()},
        this.titleCloseEl_ = dom.createDom('a', {'className':'close', 'href':'javascript:;'}, '×'),
        this.titleTextEl_ = dom.createDom('h3', undefined, this.title_));
        goog.dom.append(element, this.titleEl_,
            this.contentEl_ = dom.createDom('div', 'modal-body'),
            this.buttonEl_ = dom.createDom('div', 'modal-footer'));

    this.titleId_ = this.titleEl_.id;
    goog.a11y.aria.setRole(element, 'dialog');
    goog.a11y.aria.setState(element, 'labelledby', this.titleId_ || '');
    // If setContent() was called before createDom(), make sure the inner HTML of
    // the content element is initialized.
    if (this.content_) {
        this.contentEl_.innerHTML = this.content_;
    }
    goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);

    // Render the buttons.
    if (this.buttons_) {
        this.buttons_.attachToElement(this.buttonEl_);
        var buttons = this.buttons_.getAllButtons();
        for (var i = 0; i < buttons.length; i++) {
            goog.dom.classes.add(buttons[i], 'btn');
        }
    }
    goog.style.showElement(this.buttonEl_, !!this.buttons_);
    this.setBackgroundElementOpacity(this.backgroundElementOpacity_);
};

/**
 * @suppress {accessControls}
 * @param {number} opacity
 */
bootstrap.Dialog.prototype.setBackgroundElementOpacity = function(opacity) {
    this.backgroundElementOpacity_ = opacity;

    if (this.getElement()) {
        var bgEl = this.getBackgroundElement();
        goog.dom.classes.add(bgEl, "modal-dialog-bg");
        if (bgEl) {
            goog.style.setOpacity(bgEl, this.backgroundElementOpacity_);
        }
    }
};
