goog.provide('bitex.app.MerchantApp');

goog.require('bitex.api.BitEx');
goog.require('bitex.model.Model');

goog.require('goog.ui.Component');

goog.require('goog.structs.Map');
goog.require('goog.structs.Set');

goog.require('bitex.util');
goog.require('bitex.api.BitEx');
goog.require('goog.soy');

goog.require('goog.fx');
goog.require('goog.fx.dom');

goog.require('goog.events.InputHandler');

goog.require('goog.events');
goog.require('goog.dom.forms');
goog.require('goog.dom.classes');
goog.require('goog.dom.TagName');

goog.require('goog.ui.Button');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.object');


/**
 * @param {string=} opt_default_country
 * @param {number=} opt_default_broker_id
 * @constructor
 * @extends {goog.events.EventTarget}
 */
bitex.app.MerchantApp = function(opt_default_country, opt_default_broker_id) {

    goog.events.EventTarget.call(this);


    try{

        console.log(" MerchantApp ");

        this.model_ = new bitex.model.Model(document.body);
        this.conn_ = new bitex.api.BitEx();

        console.log(this.conn_);

        //this.views_ = new goog.ui.Component();

    }catch ( error){

        alert(error);
    }


     if (goog.isDefAndNotNull(opt_default_country)) {
        this.model_.set('DefaultCountry', opt_default_country);
      }

      if (goog.isDefAndNotNull(opt_default_broker_id)) {
        this.model_.set('DefaultBrokerID', opt_default_broker_id);
      }

};
goog.inherits(bitex.app.MerchantApp, goog.events.EventTarget);
goog.addSingletonGetter(bitex.app.MerchantApp);


/**
 *  @type {bitex.api.Bitex}
 *  @private
 */
bitex.app.MerchantApp.prototype.conn_;

/**
 * @type {bitex.model.Model}
 * @private
 */
bitex.app.MerchantApp.prototype.model_;

/**
 * @type {string}
 * @private
 */
bitex.app.MerchantApp.prototype.url_;

/**
 * @param {string=} opt_url
 */
bitex.app.MerchantApp.prototype.run = function(opt_url){

    console.log(" MerchantApp.prototype.run ");

    var url = 'wss://' + window.location.hostname + '/trade/';

    console.log("\n URL:" + url );
    console.log("\n isDef: opt_url:  " +  goog.isDefAndNotNull(opt_url) );

    if(goog.isDefAndNotNull(opt_url)){
        url = opt_url;
    }

    this.url_ = url;

    console.log(" URL_ : " + this.url_);

    var handler = this.getHandler();
    handler.listen( this.conn_, bitex.api.BitEx.EventType.OPENED, this.onConnectionOpen_);
    handler.listen( this.conn_, bitex.api.BitEx.EventType.CLOSED, this.onConnectionClose_ );
    handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR, this.onConnectionError_);
    handler.listen( this.conn_, bitex.api.BitEx.EventType.ERROR_MESSAGE, this.onConnectionErrorMessage_);

    try{

        this.conn_.open(this.url_);

      } catch( e ) {
           console.log(e);
    }


};

/**
 * @param {goog.events.Event} e
 * @protected
 */
bitex.app.MerchantApp.prototype.onConnectionOpen_ = function(e){

  console.log('open');
  goog.dom.classes.remove( document.body, 'ws-not-connected' );
  goog.dom.classes.add( document.body, 'ws-connected' );
  //goog.dom.classes.remove( document.body, 'bitex-broker' );
  //goog.dom.classes.remove( document.body, 'bitex-non-broker' );


  if (! goog.isDefAndNotNull(this.model_.get('SecurityList') )) {
    this.conn_.requestSecurityList();
  }

  if (! goog.isDefAndNotNull(this.model_.get('BrokerList') )) {
    this.conn_.requestBrokerList();
  }

  // auto login in case of the user reconnecting
  var username = this.getModel().get('Username');
  var password = this.getModel().get('Password');

  if (goog.isDefAndNotNull(username) && goog.isDefAndNotNull(password)) {
    if (!goog.string.isEmpty(username) && !goog.string.isEmpty(password) ) {
      if (password.length >= 8 ) {
        this.conn_.login(username, password);
      }
    }
  }

  var handler = this.getHandler();
  this.timer_ = new goog.Timer(30000);
  handler.listen( this.timer_, goog.Timer.TICK, this.onTimerHeartBeat_ );
  this.timer_.start();

};

bitex.app.MerchantApp.prototype.onConnectionClose_ = function(e){
console.log('close');
};
bitex.app.MerchantApp.prototype.onConnectionError_ = function(e){
console.log('error');
};
bitex.app.BlinkTrade.prototype.onConnectionErrorMessage_ = function(e) {
console.log('error message');
}
/**
 * @return {goog.events.EventHandler}
 */
bitex.app.MerchantApp.prototype.getHandler = function() {
  return this.handler_ ||
      (this.handler_ = new goog.events.EventHandler(this));

};


/**
 * return {bitex.model.Model}
 */
bitex.app.MerchantApp.prototype.getModel = function() {
  return this.model_;
};

/**
 * @param {string} username
 * @param {string} password
 * @param {string=} opt_second_factor
 */
bitex.api.BitEx.prototype.login = function(username, password, opt_second_factor ){
  var msg = {
    'MsgType': 'BE',
    'UserReqID': '1',
    'Username': username,
    'Password': password,
    'UserReqTyp': '1'
  };
  if (goog.isDefAndNotNull(opt_second_factor)) {
    msg['SecondFactor'] = opt_second_factor;
  }
  this.sendMessage(msg);
};


// End
goog.exportSymbol('MerchantApp', bitex.app.MerchantApp);
goog.exportProperty(MerchantApp.prototype, 'run', bitex.app.MerchantApp.prototype.run);

