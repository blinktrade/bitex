goog.provide('bootstrap.Dialog');
goog.provide('bootstrap.Dialog.ButtonSet');

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



/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *    goog.ui.Component} for semantics.
 * @constructor
 * @extends goog.ui.Dialog.ButtonSet
 */
bootstrap.Dialog.ButtonSet = function(opt_domHelper) {
  goog.ui.Dialog.ButtonSet.call(this, opt_domHelper);
};
goog.inherits(bootstrap.Dialog.ButtonSet, goog.ui.Dialog.ButtonSet);


/**
 * Renders the button set inside its container element.
 */
bootstrap.Dialog.ButtonSet.prototype.render = function() {
  if (this.element_) {
    this.element_.innerHTML = '';
    var domHelper = goog.dom.getDomHelper(this.element_);
    goog.structs.forEach(this, function(caption, key) {
      var button = domHelper.createDom('button', {'name': key}, caption);
      if (key == this.defaultButton_) {
        button.className = 'btn btn-primary';
      } else {
        button.className = 'btn';
      }
      this.element_.appendChild(button);
    }, this);
  }
};



/**
 * Creates a new ButtonSet with a single 'OK' button, which is also set with
 * cancel button semantics so that pressing escape will close the dialog.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createOk = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, true, true);
};


/**
 * Creates a new ButtonSet with 'OK' (default) and 'Cancel' buttons.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createOkCancel = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, true).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true);
};

/**
 * Creates a new ButtonSet with 'Cancel' button.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createCancel = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true);
};


/**
 * Creates a new ButtonSet with 'Yes' (default) and 'No' buttons.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createYesNo = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES, true).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, false, true);
};


/**
 * Creates a new ButtonSet with 'Yes', 'No' (default), and 'Cancel' buttons.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createYesNoCancel = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, true).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true);
};


/**
 * Creates a new ButtonSet with 'Continue', 'Save', and 'Cancel' (default)
 * buttons.
 * @return {!bootstrap.Dialog.ButtonSet} The created ButtonSet.
 */
bootstrap.Dialog.ButtonSet.createContinueSaveCancel = function() {
  return new bootstrap.Dialog.ButtonSet().
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CONTINUE).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.SAVE).
      addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, true, true);
};

