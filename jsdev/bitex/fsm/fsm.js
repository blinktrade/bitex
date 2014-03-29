goog.provide('bitex.fsm.Fsm');
goog.provide('bitex.fsm.Fsm.Error');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.debug.Logger');


/** @typedef  {*} */
bitex.fsm.Fsm.StateType;

/** @typedef  {*} */
bitex.fsm.Fsm.InputType;

/** @typedef {function(string,bitex.fsm.Fsm.InputType) } */
bitex.fsm.Fsm.ActionFunctionType;

/** @typedef {function(bitex.fsm.Fsm.InputType)} */
bitex.fsm.Fsm.GuardFunctionType;

/** @typedef {{ new_state:bitex.fsm.Fsm.StateType, action:bitex.fsm.Fsm.ActionFunctionType, guard: bitex.fsm.Fsm.GuardFunctionType }} */
bitex.fsm.Fsm.StateRecordType;

/** @typedef {{re:RegExp , new_state:bitex.fsm.Fsm.StateType, action:bitex.fsm.Fsm.ActionFunctionType, guard: bitex.fsm.Fsm.GuardFunctionType }} */
bitex.fsm.Fsm.StateRegexRecordType;


/**
 * @param {function(bitex.fsm.Fsm.StateType, boolean, bitex.fsm.Fsm.StateType)=} setState method
 * @constructor
 */
bitex.fsm.Fsm = function(setState) {
  if ( goog.isDefAndNotNull(setState)) {
    this.setStateFunction_ = setState;
  }
};

/**
 * A logger to help debugging 
 * @type {goog.debug.Logger}
 * @private
 */
bitex.fsm.Fsm.prototype.logger_ =
    goog.debug.Logger.getLogger('bitex.fsm.Fsm');

/**
 * @type {bitex.fsm.Fsm.StateType}
 */
bitex.fsm.Fsm.prototype.state_;

/**
 * @type {function(bitex.fsm.Fsm.StateType, boolean, bitex.fsm.Fsm.StateType)}
 */
bitex.fsm.Fsm.prototype.setStateFunction_;


/**
 * Errors thrown by the FSM.
 * @enum {string}
 */
bitex.fsm.Fsm.Error = {
  /**
   * Error when a invalid state is encountered
   */
  STATE_INVALID: 'Invalid FSM state',

  /**
   * Error when a invalid transition happen 
   */
  TRANSITION_INVALID: 'Invalid FSM transition'
};


/**
 * @type {Object.<Object.<bitex.fsm.Fsm.StateRecordType >> }
 */
bitex.fsm.Fsm.prototype.states_  = {};

/**
 * @type {Object.<Array.<bitex.fsm.Fsm.StateRegexRecordType>>}
 */
bitex.fsm.Fsm.prototype.states_regexes_ = {};

/**
 *
 * @param {bitex.fsm.Fsm.StateType} state
 * @param {bitex.fsm.Fsm.InputType} input
 * @param {bitex.fsm.Fsm.StateType} new_state
 * @param {bitex.fsm.Fsm.ActionType=} action
 * @param {bitex.fsm.Fsm.GuardType=}  guard
 */
bitex.fsm.Fsm.prototype.add = function( state, input, new_state, action, guard ) {
  goog.object.setIfUndefined( this.states_, state, {} );

  var record = null;

  if (input instanceof RegExp) {
    record =  {re:input, new_state: new_state, action:action, guard:guard };
    goog.object.setIfUndefined( this.states_regexes_, state, [] );
    this.states_regexes_[state].push( record );
  } else {
    record =  {new_state: new_state, action:action, guard:guard };
    goog.object.setIfUndefined( this.states_[state], input, [] );
    this.states_[state][input].push(record);
  }
};

/**
 *
 * @param {bitex.fsm.Fsm.StateType} state
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 */
bitex.fsm.Fsm.prototype.start = function(state, opt_obj) {
  this.setState_(state, opt_obj);
};

/**
 * @return {bitex.fsm.Fsm.StateType}
 */
bitex.fsm.Fsm.prototype.getState = function() {
  return this.state_;
};

/**
 * @return {boolean}
 */
bitex.fsm.Fsm.prototype.isStarted = function() {
  return goog.isDefAndNotNull(this.state_);
};


/**
 *
 * @param {bitex.fsm.Fsm.StateType} new_state
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 */
bitex.fsm.Fsm.prototype.setState_ = function( new_state, opt_obj ) {
  if (this.state_ === new_state) {
    return;
  }

  if (!goog.isDefAndNotNull(this.setStateFunction_)) {
    this.logger_.finest( "transition from " + this.state_  + " to " + new_state );
    this.state_ = new_state;
    return;
  }

  // invoke the exit state
  if (goog.isDefAndNotNull(this.state_)) {
    this.setStateFunction_.call(opt_obj, this.state_, false, new_state );
  }

  // do the state transition
  this.logger_.finest("transition from " + this.state_  + " to " + new_state );

  var old_state = this.state_;
  this.state_ = new_state;

  // invoke the entry state
  this.setStateFunction_.call(opt_obj, this.state_, true, old_state);
};

/**
 * @param {bitex.fsm.Fsm.StateRecordType} record 
 * @param {bitex.fsm.Fsm.InputType} input
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 * @return {boolean}
 * @private
 */ 
bitex.fsm.Fsm.prototype.doTransition_ = function( record, input, opt_obj ) {
  if (goog.isDefAndNotNull( record.action ) ) {
    if (! goog.isDefAndNotNull( record.guard) ) {
      record.action.call(opt_obj, this.state_, input );
      this.setState_(record.new_state, opt_obj);
      return true;
    } else if ( record.guard.call( opt_obj, input) ) {
      record.action.call(opt_obj, this.state_, input );
      this.setState_(record.new_state, opt_obj);
     return true;
    }
  } else if (!goog.isDefAndNotNull( record.guard ) ) {
    this.setState_(record.new_state, opt_obj);
    return true;
  } else if ( record.guard.call(opt_obj, input) ) {
    this.setState_(record.new_state, opt_obj);
    return true;
  }
  return false;
};


/**
 *
 * @param {bitex.fsm.Fsm.InputType} input
 * @param {Object=} opt_obj The object to be used as the value of 'this'
 * @throws {Error} If the state is invalid
 */
bitex.fsm.Fsm.prototype.execute = function(input, opt_obj) {
  this.logger_.finest("execute " + input );
  if ( !goog.isDefAndNotNull(this.state_) ) {
    throw Error(bitex.fsm.Fsm.Error.STATE_INVALID);
  }

  if (!( this.state_ in this.states_)) {
    throw Error(bitex.fsm.Fsm.Error.STATE_INVALID);
  }

  var state = goog.object.get(this.states_, this.state_);

  if (input in state) {
    var records = goog.object.get(state, input);
    for ( var record_index in records ) {
      var record = records[record_index];
      if (this.doTransition_( record, input, opt_obj )) {
        return;
      }
    }
  } else {
    var re_records = goog.object.get(this.states_regexes_, this.state_);
    if ( goog.isDefAndNotNull ( re_records )  ) {
      for ( var re_record_index in re_records ) {
        var re_record = re_records[re_record_index];
        if (re_record.re.test(input)) {
          if (this.doTransition_( re_record, input, opt_obj )) {
            return;
          }
        }
      }
    }
    if (null in state) {
      var null_records = goog.object.get(state, null);
      for ( var null_record_index in null_records ) {
        var null_record = null_records[null_record_index];
        if (this.doTransition_( null_record, input, opt_obj )) {
          return;
        }
      }
    } else {
      throw Error(bitex.fsm.Fsm.Error.TRANSITION_INVALID + 
          " - state:"  + this.state_  + ", input:" + input );
    }
  }
};

/*
var sm = new bitex.fsm.Fsm()
sm.add('start', null, 'start', function(state, input) { alert(state + "," + input); } );
sm.add('start', /goog/, 'start', function(state, input) { alert("/goog/" + state + "," + input); } );
sm.add('start', "rodrigo", 'start', function(state, input) { alert("rodrigo" + state + "," + input); } );
sm.start('start')
sm.execute(12);
sm.add('start', /rodrigo/i, 'rodrigo');
sm.add('rodrigo', null, 'start', function(state, input) { alert("transition to start: " + state + " - " + input ); } );
*/

