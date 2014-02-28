goog.provide('bitex.view.SignupView');
goog.provide('bitex.view.SignupView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.util');

goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('bitex.model.Model');

/**
 * @param {*} app
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
bitex.view.SignupView = function(app, opt_domHelper) {
  bitex.view.View.call(this, app, opt_domHelper);
};
goog.inherits(bitex.view.SignupView, bitex.view.View);

/**
 * The events fired
 * @enum {string} The event types
 */
bitex.view.SignupView.EventType = {
  SIGNUP: 'signup_click'
};

/**
 * @override
 */
bitex.view.SignupView.prototype.enterDocument = function(){
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  var signup_country_el = goog.dom.getElement('id_signup_country');
  var signup_state_el = goog.dom.getElement('id_signup_state');

  var countries = bitex.util.getCountries();
  goog.object.forEach( countries, function(country_info, country_code ) {
    var country = country_info;

    if (goog.isArrayLike(country)) {
      country = country[0];
    }

    var el = goog.dom.createDom('option', {'value': country_code }, country);
    goog.dom.appendChild( signup_country_el, el );
  },this);

  handler.listen(signup_country_el, goog.events.EventType.CHANGE, this.onChangeCountry_  );
  handler.listen(signup_state_el, goog.events.EventType.CHANGE, this.onChangeState_);

  handler.listen( this.getApplication().getModel(), bitex.model.Model.EventType.SET + "BrokerList", this.onBrokerList_ );


  var button_signup = new goog.ui.Button();
  button_signup.decorate(goog.dom.getElement('id_btn_signup'));
  handler.listen(goog.dom.getElement('user_agreed_tos'),goog.events.EventType.CLICK,function(e) {
    button_signup.setEnabled(e.target.checked);
  });


  this.onBrokerList_(null);

  handler.listen(button_signup, goog.ui.Component.EventType.ACTION, this.onSignupButtonClick_);
};

bitex.view.SignupView.prototype.getUsername = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_username") );
};

bitex.view.SignupView.prototype.getEmail = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_email") );
};

bitex.view.SignupView.prototype.getPassword = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_password") );
};

bitex.view.SignupView.prototype.getState = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_state") );
};

bitex.view.SignupView.prototype.getCountry = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_country") );
};

bitex.view.SignupView.prototype.getBroker = function() {
  return goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker") );
};


bitex.view.SignupView.prototype.onSignupButtonClick_ =  function(e){
  e.stopPropagation();
  e.preventDefault();

  // Perform client validation
  var username = goog.dom.forms.getValue( goog.dom.getElement("id_signup_username") );
  var email = goog.dom.forms.getValue( goog.dom.getElement("id_signup_email") );
  var password = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password") );
  var password2 = goog.dom.forms.getValue( goog.dom.getElement("id_signup_password2") );
  var state = goog.dom.forms.getValue( goog.dom.getElement("id_signup_state") );
  var country_code = goog.dom.forms.getValue( goog.dom.getElement("id_signup_country") );
  var broker = goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker")));


  if (goog.string.isEmpty(username) || !goog.string.isAlphaNumeric(username) ) {
    /**
     * @desc Validation erro on SignUp view
     */
    var MSG_INVALID_USERNAME = goog.getMsg('Invalid username');

    this.getApplication().showErrorDialog(MSG_INVALID_USERNAME);
    return;
  }

  if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
    /**
     * @desc Validation erro on SignUp view
     */
    var MSG_INVALID_EMAIL = goog.getMsg('Invalid email');

    this.getApplication().showErrorDialog(MSG_INVALID_EMAIL );
    return;
  }

  if ( goog.string.isEmpty(password)  || password.length < 8) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_INVALID_PASSWORD = goog.getMsg('Password must have at least 8 characters');

    this.getApplication().showErrorDialog(MSG_INVALID_PASSWORD );
    return;
  }

  if ( password !== password2 ) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_PASSWORDS_DOES_NOT_MATCH = goog.getMsg('Passwords does not match');

    this.getApplication().showErrorDialog(MSG_PASSWORDS_DOES_NOT_MATCH );
    return;
  }

  this.dispatchEvent( bitex.view.SignupView.EventType.SIGNUP );
};


bitex.view.SignupView.prototype.onBrokerList_ = function(e) {
  //
  // auto select the country/state in case there is only one broker
  //
  var broker_list = this.getApplication().getModel().get("BrokerList");
  if (!goog.isDefAndNotNull(broker_list)) {
    return;
  }

  var last_country_code = "";
  var number_of_countries = 0;
  var brokers_by_country = {};
  goog.array.forEach(broker_list['BrokerListGrp'], function( broker_array )  {
    var broker_info = {};
    goog.array.forEach(broker_list['Columns'], function( column, index )  {
      broker_info[column] = broker_array[index];
    }, this);
    if (broker_info['CountryCode'] in brokers_by_country) {
      brokers_by_country[broker_info['CountryCode'] ].push(broker_info);
    } else {
      brokers_by_country[broker_info['CountryCode'] ] = [broker_info];

      if (broker_info['CountryCode'].length > 0) {
        last_country_code = broker_info['CountryCode'];
        ++number_of_countries ;
      }
    }
  }, this );

  if (number_of_countries === 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), last_country_code );
    this.onSelectCountry_(last_country_code);
  }
};

bitex.view.SignupView.prototype.onChangeCountry_ = function(e){
  var selected_country = goog.dom.forms.getValue(e.target);
  this.onSelectCountry_(selected_country);
};

bitex.view.SignupView.prototype.onChangeState_ = function(e){
  var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
  var selected_state = goog.dom.forms.getValue(goog.dom.getElement('id_signup_state') ) ;
  this.onSelectState_(selected_country, selected_state);
};


/**
 * @param {string} selected_country
 * @private
 */
bitex.view.SignupView.prototype.onSelectCountry_ = function(selected_country) {
  console.log( 'selected country:' + selected_country);

  var signup_country_el = goog.dom.getElement('id_signup_country');
  var signup_state_el = goog.dom.getElement('id_signup_state');

  var countries = bitex.util.getCountries();

  goog.dom.removeChildren(signup_state_el);
  var country_info = countries[selected_country];
  goog.style.showElement( goog.dom.getElement('id_signup_state_group'), goog.isArrayLike(country_info) );

  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));


  if (goog.isDefAndNotNull( this.getApplication().getBrokerByCountry("")[0] )) {
    var broker_info = this.getApplication().getBrokerByCountry("")[0];
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }

  if ( goog.isArrayLike(country_info)) {
    var states_code_array = country_info[1].split('|');
    var states_name_array = country_info[2].split('|');

    var number_of_states_with_brokers = 0;
    var last_state_with_broker = '';
    goog.array.forEach(states_code_array, function(state_code, index) {
      var state_name = states_name_array[index];
      var el = goog.dom.createDom('option', {'value': state_code }, state_name);
      goog.dom.appendChild( goog.dom.getElement('id_signup_state'), el );

      var stateIndex = goog.array.findIndex( this.getApplication().getBrokerByCountry(selected_country), function(broker_info){
        if (broker_info['State'] === state_code ) {
          return true;
        }
      });
      if (stateIndex >= 0){
        ++number_of_states_with_brokers;
        last_state_with_broker = state_code;
      }

    }, this);

    if (number_of_states_with_brokers==1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), last_state_with_broker );
      this.onSelectState_(selected_country, last_state_with_broker);
    }
  } else {
    var number_of_available_brokers = 0;
    var last_available_broker = "";

    goog.object.forEach(this.getApplication().getBrokerByCountry(selected_country), function(broker_info) {
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );

      ++number_of_available_brokers;
      last_available_broker = broker_info['BrokerID'];
    }, this);

    if (number_of_available_brokers == 1) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
    } else {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
    }

    goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
    goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );
  }
};

/**
 * @param {string} selected_country
 * @param {string} selected_state
 * @private
 */
bitex.view.SignupView.prototype.onSelectState_ = function( selected_country, selected_state ) {
  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));

  if (goog.isDefAndNotNull(this.getApplication().getBrokerByCountry("")[0] )) {
    var broker_info = this.getApplication().getBrokerByCountry("")[0];
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }

  var number_of_available_brokers = 0;
  var last_available_broker = "";
  goog.array.forEach(this.getApplication().getBrokerByCountry(selected_country), function(broker_info) {
    if (broker_info['State'] === selected_state ) {
      ++number_of_available_brokers;
      last_available_broker = broker_info['BrokerID'];
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['BusinessName']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }
  }, this);
  if (number_of_available_brokers == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  } else {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), "0" );
  }
  goog.style.showElement( goog.dom.getElement('id_signup_broker') , number_of_available_brokers >=1 );
  goog.style.showElement( goog.dom.getElement('id_signup_broker_warning') , number_of_available_brokers == 0 );

};
