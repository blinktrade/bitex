goog.provide('bitex.app.UrlRouter');
goog.provide('bitex.app.UrlRouter.EventType');
goog.provide('bitex.app.UrlRouterEvent');

goog.require('goog.events');
goog.require('goog.history.Html5History');
goog.require('goog.string');


/**
 * @param {string} baseUrl
 * @param {string} defaultView
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.UrlRouter = function(baseUrl, defaultView) {
  this.history_ = new goog.history.Html5History();
  this.history_.setUseFragment(false);

  this.base_url_ = baseUrl;
  this.default_view_ = defaultView;
  this.setViewInternal(defaultView);

  this.history_.addEventListener( goog.history.EventType.NAVIGATE, this.onNavigate_, undefined, this);
  this.history_.setEnabled(true);
};
goog.inherits(bitex.app.UrlRouter, goog.events.EventTarget);


/**
 * @type {string}
 * @private
 */
bitex.app.UrlRouter.prototype.base_url_;

/**
 * @type {string}
 * @private
 */
bitex.app.UrlRouter.prototype.default_view_;

/**
 * @type {string}
 * @private
 */
bitex.app.UrlRouter.prototype.current_view_;

/**
 * @type {goog.history.Html5History}
 * @private
 */
bitex.app.UrlRouter.prototype.history_;


/**
 * The events fired by the web socket.
 * @enum {string} The event types for the web socket.
 */
bitex.app.UrlRouter.EventType = {
  SET_VIEW: 'set_view'
};

/**
 * @param {string} view_name
 * @protected
 */
bitex.app.UrlRouter.prototype.setViewInternal = function(view_name){
  this.current_view_ = goog.string.remove(view_name, this.base_url_ );
  if  ( this.current_view_ === "" ) {
    this.current_view_ = this.default_view_;
  }
};

/**
 * @param {string} view_name
 */
bitex.app.UrlRouter.prototype.setView = function(view_name) {
  this.setViewInternal(view_name);
  this.history_.setToken( this.base_url_ + view_name);

  this.dispatchEvent( new bitex.app.UrlRouterEvent( bitex.app.UrlRouter.EventType.SET_VIEW, this.getCurrentView()));
};

/**
 * @return {string}
 */
bitex.app.UrlRouter.prototype.getCurrentView = function() {
  return this.current_view_;
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.app.UrlRouter.prototype.onNavigate_ = function(e){
  if (e.isNavigation) {
    this.setViewInternal(e.token);
    this.dispatchEvent( new bitex.app.UrlRouterEvent( bitex.app.UrlRouter.EventType.SET_VIEW, this.getCurrentView()));
  }
};

/**
 *
 * @param {bitex.app.UrlRouter.EventType} type
 * @param {string} view
 * @constructor
 */
bitex.app.UrlRouterEvent = function(type, view) {
  goog.events.Event.call(this, type);

  /**
   * @type {string}
   */
  this.view = view
};
goog.inherits(bitex.app.UrlRouterEvent, goog.events.Event);

