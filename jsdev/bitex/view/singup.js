goog.provide('bitex.view.SignupView');
goog.provide('bitex.view.SignupView.EventType');
goog.require('bitex.view.View');

goog.require('bitex.util');

goog.require('goog.dom.forms');
goog.require('goog.style');
goog.require('bitex.model.Model');
goog.require('bitex.templates');

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
  var model = this.getApplication().getModel();

  var signup_country_el = goog.dom.getElement('id_signup_country');
  var signup_state_el = goog.dom.getElement('id_signup_state');
  var broker_el = goog.dom.getElement('id_signup_broker');

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
  handler.listen(broker_el, goog.events.EventType.CHANGE, this.onChangeBroker_);

  handler.listen( this.getApplication().getModel(), bitex.model.Model.EventType.SET + "BrokerList", this.onBrokerList_ );

  var button_signup = new goog.ui.Button();
  button_signup.decorate(goog.dom.getElement('id_btn_signup'));
  handler.listen(goog.dom.getElement('user_agreed_tos'),goog.events.EventType.CLICK,function(e) {
    button_signup.setEnabled(e.target.checked);
  });


  if (goog.isDefAndNotNull(model.get('DefaultCountry'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), model.get('DefaultCountry') );
    this.onSelectCountry_(model.get('DefaultCountry'));
  }

  if (goog.isDefAndNotNull(model.get('DefaultState'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), model.get('DefaultState') );
    this.onSelectState_(model.get('DefaultState'));
  }


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
  return goog.string.toNumber(goog.dom.forms.getValue( goog.dom.getElement("id_signup_broker")));
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

    this.getApplication().showDialog(MSG_INVALID_USERNAME);
    return;
  }

  if (!email.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
    /**
     * @desc Validation erro on SignUp view
     */
    var MSG_INVALID_EMAIL = goog.getMsg('Invalid email');

    this.getApplication().showDialog(MSG_INVALID_EMAIL );
    return;
  }

  if ( goog.string.isEmpty(password)  || password.length < 8) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_INVALID_PASSWORD = goog.getMsg('Password must have at least 8 characters');

    this.getApplication().showDialog(MSG_INVALID_PASSWORD );
    return;
  }

  if ( password !== password2 ) {
    /**
     * @desc Validation error on SignUp view
     */
    var MSG_PASSWORDS_DOES_NOT_MATCH = goog.getMsg('Passwords does not match');

    this.getApplication().showDialog(MSG_PASSWORDS_DOES_NOT_MATCH );
    return;
  }

  this.dispatchEvent( bitex.view.SignupView.EventType.SIGNUP );
};


bitex.view.SignupView.prototype.onBrokerList_ = function(e) {
  //
  // auto select the country/state in case there is only one broker
  //
  var model = this.getApplication().getModel();

  var broker_list = model.get("BrokerList");
  if (!goog.isDefAndNotNull(broker_list)) {
    return;
  }

  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));


  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    var broker_info = goog.array.find(broker_list, function(broker_info) {
      if (broker_info['BrokerID'] === model.get('DefaultBrokerID')) {
        return true;
      }
    });
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }

  goog.object.forEach(this.getApplication().getBrokersByCountry(''), function(broker_info) {
    if (model.get('DefaultBrokerID') != broker_info['BrokerID']) {
      var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
      goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
    }
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'),  '' + model.get('DefaultBrokerID') );
    this.onChangeBroker_();
  }


  var last_country_code = "";
  var number_of_countries = 0;
  var brokers_by_country = {};
  goog.array.forEach(broker_list, function( broker_info )  {
    if (!broker_info['IsBrokerHub']) {
      if (broker_info['CountryCode'] in brokers_by_country) {
        brokers_by_country[broker_info['CountryCode'] ].push(broker_info);
      } else {
        brokers_by_country[broker_info['CountryCode'] ] = [broker_info];

        if (broker_info['CountryCode'].length > 0) {
          last_country_code = broker_info['CountryCode'];
          ++number_of_countries ;
        }
      }
    }
  }, this );


  if (goog.isDefAndNotNull(model.get('DefaultCountry'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), model.get('DefaultCountry') );
    this.onSelectCountry_(model.get('DefaultCountry'));
  } else if (number_of_countries === 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_country'), last_country_code );
    this.onSelectCountry_(last_country_code);
  } else {
    this.onChangeBroker_();
  }

};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.SignupView.prototype.onChangeCountry_ = function(e){
  var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
  this.onSelectCountry_(selected_country);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.SignupView.prototype.onChangeState_ = function(e){
  var selected_country = goog.dom.forms.getValue(goog.dom.getElement('id_signup_country') ) ;
  var selected_state = goog.dom.forms.getValue(goog.dom.getElement('id_signup_state') ) ;
  this.onSelectState_(selected_country, selected_state);
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.view.SignupView.prototype.onChangeBroker_ = function(e){
  var model = this.getApplication().getModel();
  var selected_broker = goog.dom.forms.getValue(goog.dom.getElement('id_signup_broker') ) ;

  var broker_list = model.get('BrokerList');
  if (goog.isDefAndNotNull(broker_list)) {
    var broker = goog.array.find(broker_list, function(broker){
      if (broker['BrokerID'] == selected_broker) {
        return true;
      }
    });

    if (goog.isDefAndNotNull( broker )) {
      var fmt = new goog.i18n.NumberFormat(goog.i18n.NumberFormat.Format.PERCENT);
      fmt.setMaximumFractionDigits(2);
      fmt.setMinimumFractionDigits(2);

      broker['FormattedTransactionFeeBuy'] = fmt.format(broker['TransactionFeeBuy'] / 10000);
      broker['FormattedTransactionFeeSell'] = fmt.format(broker['TransactionFeeSell'] / 10000);

      goog.soy.renderElement(goog.dom.getElement('signup_broker_details'), bitex.templates.BrokerView, {
        show_title: false,
        msg_broker:broker,
        broker_list: broker_list
      });
    }
  }
};

/**
 * @param {string} selected_country
 * @private
 */
bitex.view.SignupView.prototype.onSelectCountry_ = function(selected_country) {
  var signup_state_el = goog.dom.getElement('id_signup_state');
  var model = this.getApplication().getModel();
  var countries = bitex.util.getCountries();

  goog.dom.removeChildren(signup_state_el);
  var country_info = countries[selected_country];
  goog.style.showElement( goog.dom.getElement('id_signup_state_group'), goog.isArrayLike(country_info) );

  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));

  if ( goog.isArrayLike(country_info)) {
    var states_code_array = country_info[1].split('|');
    var states_name_array = country_info[2].split('|');

    var number_of_states_with_brokers = 0;
    var last_state_with_broker = '';
    goog.array.forEach(states_code_array, function(state_code, index) {
      var state_name = states_name_array[index];
      var el = goog.dom.createDom('option', {'value': state_code }, state_name);
      goog.dom.appendChild( goog.dom.getElement('id_signup_state'), el );

      var stateIndex = goog.array.findIndex( this.getApplication().getBrokersByCountry(selected_country), function(broker_info){
        if (broker_info['IsBrokerHub']) {
          return false;
        }
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
      return;
    } else if (goog.isDefAndNotNull(model.get('DefaultState'))) {
      goog.dom.forms.setValue( goog.dom.getElement('id_signup_state'), model.get('DefaultState') );
      this.onSelectState_(selected_country, model.get('DefaultState'));
    }
  }


  var number_of_available_brokers = 0;
  var number_of_brokers_in_same_country = 0;
  var last_available_broker = "";

  goog.object.forEach(this.getApplication().getBrokersByCountry(selected_country), function(broker_info) {
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );

    if (!broker_info['IsBrokerHub']) {
      ++number_of_available_brokers;

      if (broker_info['CountryCode'] === selected_country ) {
        ++number_of_brokers_in_same_country;
        last_available_broker = broker_info['BrokerID'];
      }
    }
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + model.get('DefaultBrokerID') );
  } else if (number_of_brokers_in_same_country == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  }
  this.onChangeBroker_();
};

/**
 * @param {string} selected_country
 * @param {string} selected_state
 * @private
 */
bitex.view.SignupView.prototype.onSelectState_ = function( selected_country, selected_state ) {
  goog.dom.removeChildren(goog.dom.getElement('id_signup_broker'));
  var model = this.getApplication().getModel();

  var number_of_available_brokers = 0;
  var number_of_brokers_in_same_country_state = 0;
  var last_available_broker = "";
  goog.array.forEach(this.getApplication().getBrokersByCountry(selected_country, selected_state), function(broker_info){
    if (!broker_info['IsBrokerHub']) {
      ++number_of_available_brokers;

      if (broker_info['CountryCode'] === selected_country && broker_info['State'] === selected_state ) {
        ++number_of_brokers_in_same_country_state;
        last_available_broker = broker_info['BrokerID'];
      }
    }
    var el = goog.dom.createDom('option', {'value': broker_info['BrokerID'] }, broker_info['SignupLabel']);
    goog.dom.appendChild( goog.dom.getElement('id_signup_broker'), el );
  }, this);

  if (goog.isDefAndNotNull(model.get('DefaultBrokerID'))) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + model.get('DefaultBrokerID') );
  } else if (number_of_brokers_in_same_country_state == 1) {
    goog.dom.forms.setValue( goog.dom.getElement('id_signup_broker'), '' + last_available_broker );
  }
  this.onChangeBroker_();
};
