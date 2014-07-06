//  Copyright 2010 Scott Logic Ltd.
//  http://www.scottlogic.co.uk
//
//  This file is part of Closure Charts.
//
//  Closure Charts is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  Closure Charts is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with Closure Charts.  If not, see <http://www.gnu.org/licenses/>.

goog.provide('scottlogic.chart.rendering.DiscontinuousDateTimeAxis');

goog.require('goog.date.Interval');
goog.require('goog.date.UtcDateTime');
goog.require('scottlogic.chart.rendering.AbstractAxis');
goog.require('scottlogic.chart.rendering.DiscontinuousDateTimeCache');

/**
 * A Discontinuous Time Axis is similar to the Date Time axis, with the
 * exception that it omits any time periods inside of weekends, or outside the
 * working hours specified.
 *
 * Currently does not support public holidays.
 *
 * To specify the start and end of hours, use a UtcDateTime object. The years,
 * months etc. are not used.
 *
 * @inheritDoc
 * @extends {scottlogic.chart.rendering.AbstractAxis}
 * @constructor
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis = function() {
  // Call the superclass constructor
  scottlogic.chart.rendering.AbstractAxis.call(this);

  /**
   * Store the start of hours date(though only the time is important)
   *
   * @type {goog.date.UtcDateTime}
   * @private
   */
  this.startOfHours_ = new goog.date.UtcDateTime(1990, 6, 22, 8, 0, 0, 0);
  this.calculateValuesForStart_();

  /**
   * Store the end of hours date (only the time is important)
   *
   * @type {goog.date.UtcDateTime}
   * @private
   */
  this.endOfHours_ = new goog.date.UtcDateTime(1990, 6, 22, 17, 0, 0, 0);
  this.calculateValuesForEnd_();

  /**
   * Minimum value of the axis - defaults to this time yesterday
   *
   * @type {goog.date.UtcDateTime}
   * @public
   */
  this.min = new goog.date.UtcDateTime(new Date());
  this.min.add(new goog.date.Interval(0, 0, -1));

  /**
   * Maximum value of the axis - defaults to the current time
   *
   * @type {goog.date.UtcDateTime}
   * @public
   */
  this.max = new goog.date.UtcDateTime(new Date());

  /**
   * @type {scottlogic.chart.rendering.DiscontinuousDateTimeCache}
   * @private
   */
  this.cache_ = new scottlogic.chart.rendering.DiscontinuousDateTimeCache(this);
};
goog.inherits(scottlogic.chart.rendering.DiscontinuousDateTimeAxis,
    scottlogic.chart.rendering.AbstractAxis);

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    initializeInternal = function() {
  this.cache_.generate();
};

/**
 * @type {number}
 * @const
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
    MILLISECONDS_IN_AN_HOUR = 3600000;

/**
 * @type {number}
 * @const
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH = 30.4375;

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.setMinimum =
    function(input) {
  /** @type {goog.date.UtcDateTime} */
  var moved = new goog.date.UtcDateTime(/** @type {goog.date.UtcDateTime} */
      (input));

  if (!this.isInWorkingHours(moved)) {
    moved = this.moveForward_(moved);
  }

  scottlogic.chart.rendering.DiscontinuousDateTimeAxis.superClass_.setMinimum
      .call(this, moved);

  this.calculateValuesForMin_();
};

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.setMaximum =
    function(input) {
  /** @type {goog.date.UtcDateTime} */
  var moved = new goog.date.UtcDateTime(/** @type {goog.date.UtcDateTime} */
      (input));

  if (!this.isInWorkingHours(moved)) {
    moved = this.moveForward_(moved);
  }

  scottlogic.chart.rendering.DiscontinuousDateTimeAxis.superClass_.setMaximum
      .call(this, moved);
};

/**
 * Sets the starting hours on the axis
 *
 * @param {goog.date.UtcDateTime} input the new start time.
 * @public
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.setStartOfHours =
    function(input) {
  this.startOfHours_ = input;
  this.calculateValuesForStart_();
  this.initialized_ = false;
};

/**
 * Gets the starting hours on the axis
 *
 * @return {goog.date.UtcDateTime} the start time.
 * @public
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getStartOfHours =
    function() {
  return this.startOfHours_;
};

/**
 * Sets the end of hours on the axis
 *
 * @param {goog.date.UtcDateTime} input the new end time.
 * @public
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.setEndOfHours =
    function(input) {
  this.endOfHours_ = input;
  this.calculateValuesForEnd_();
  this.initialized = false;
};

/**
 * Gets the ending hours on the axis
 *
 * @return {goog.date.UtcDateTime} the end time.
 * @public
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getEndOfHours =
    function() {
  return this.endOfHours_;
};

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    estimateWidestLabel = function() {
  /** @type {goog.date.UtcDateTime} */
  var longLabel = new goog.date.UtcDateTime(8888, goog.date.month.DEC, 30, 12,
      0, 0, 333);

  return this.normalize(longLabel);
};

/**
 * Updates the values for the minimum
 *
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    calculateValuesForMin_ = function() {
  /**
   * Calculate the number of milliseconds in a working day
   *
   * @type {number}
   * @private
   */
  this.millisecondsInAWorkingDay_ =
      ((this.endOfHours_.getHours() - this.startOfHours_.getHours()) +
      ((this.endOfHours_.getMinutes() -
          this.startOfHours_.getMinutes()) / 60)) *
      scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
      MILLISECONDS_IN_AN_HOUR;

  /**
   * Calculate the number of milliseconds in a working week
   * @private
   * @type {number}
   */
  this.millisecondsInAWorkingWeek_ = this.millisecondsInAWorkingDay_ * 5;

  /**
   * The end of the min day
   *
   * @type {goog.date.UtcDateTime}
   * @private
   */
  this.endOfMinDay_ = this.getEndOfDay_(this.min);

  /**
   * Calculate the milliseconds from the min to the end of the min day
   *
   * @type {number}
   * @private
   */
  this.toEndOfMinDay_ = this.getMsToEndOfDay_(this.min);

  /**
   * The end of the Min week
   *
   * @type {goog.date.UtcDateTime}
   * @private
   */
  this.endOfMinWeek_ = this.getEndOfWeek_(this.min);

  /**
   * Calculate the working milliseconds from the end of the min day to the end
   * of the min week This is done by getting the number of days between the end
   * of the week and end of the day (guaranteed to be a whole number) and
   * multiplying by the number of ms in a day
   *
   * @type {number}
   * @private
   */
  this.toEndOfMinWeek_ = this.getMsToEndOfWeek_(this.min);

  /**
   * The week number for min
   * @private
   * @type {number}
   */
  this.minWeek_ = this.min.getWeekNumber();

  /**
   * The date for min
   * @private
   * @type {number}
   */
  this.minDate_ = this.min.getDate();

  /**
   * The year for min
   * @private
   * @type {number}
   */
  this.minYear_ = this.min.getFullYear();

  /**
   * The month for min
   * @private
   * @type {number}
   */
  this.minMonth_ = this.min.getMonth();

  /**
   * The time for min
   * @private
   * @type {number}
   */
  this.minTime_ = this.min.getTime();
};

/**
 * Calculate the values for the start date
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    calculateValuesForStart_ = function() {
  /**
   * The hours of the start date
   * @private
   * @type {number}
   */
  this.startHours_ = this.startOfHours_.getHours();

  /**
   * The minutes of the start date
   * @private
   * @type {number}
   */
  this.startMinutes_ = this.startOfHours_.getMinutes();

  /**
   * The seconds of the start date
   * @private
   * @type {number}
   */
  this.startSeconds_ = this.startOfHours_.getSeconds();
};

/**
 * Calculate values for the end date
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    calculateValuesForEnd_ = function() {
  /**
   * The hours of the start date
   * @private
   * @type {number}
   */
  this.endHours_ = this.endOfHours_.getHours();

  /**
   * The minutes of the start date
   * @private
   * @type {number}
   */
  this.endMinutes_ = this.endOfHours_.getMinutes();

  /**
   * The seconds of the start date
   * @private
   * @type {number}
   */
  this.endSeconds_ = this.endOfHours_.getSeconds();
};

/**
 * Returns the start of business on the monday on the week of a given date
 *
 * @param {goog.date.UtcDateTime} input the date to get the start of the week
 *        from.
 * @return {goog.date.UtcDateTime} start of business on monday of that week.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getStartOfWeek_ =
    function(input) {
  /** @type {goog.date.Interval} */
  var moveToMonday = new goog.date.Interval(
      0, 0, (1 - input.getDay()), 0, 0, 0);

  /** @type {goog.date.UtcDateTime} */
  var result = new goog.date.UtcDateTime(input.getFullYear(), input.getMonth(),
      input.getDate(), this.startHours_,
      this.startMinutes_, this.startSeconds_, 0);
  result.add(moveToMonday);

  return result;
};

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.setIntervalStep =
    function(input) {
  /**
   * Compute the effective interval. This is the lowest sensible interval given
   * the number of labels. Note that, if this interval is used, the labels would
   * have no space between them. Also note that we are using the actual time of
   * the values, not the normalized time. This is because the interval is not a
   * normalized value, and doesn't need to know whether it is the the interval
   * for a Discontinuous Axis or a regular Axis.
   *
   * @type {number}
   */
  var effectiveInterval = (this.normalize(this.max) - 
      this.normalize(this.min)) / input;

  /** @type {number} */
  var years = Math.floor(effectiveInterval /
      ((scottlogic.chart.rendering.DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH *
          (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
              MILLISECONDS_IN_AN_HOUR * 24)) * 12));
  effectiveInterval -= years *
      ((scottlogic.chart.rendering.DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH *
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
          MILLISECONDS_IN_AN_HOUR * 24)) * 12);

  /** @type {number} */
  var months = Math.floor(effectiveInterval /
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH *
          (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
              MILLISECONDS_IN_AN_HOUR * 24)));
  effectiveInterval -= months *
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH *
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
      MILLISECONDS_IN_AN_HOUR * 24));

  /** @type {number} */
  var days = Math.floor(effectiveInterval / (scottlogic.chart.rendering.
      DiscontinuousDateTimeAxis.MILLISECONDS_IN_AN_HOUR * 24));
  effectiveInterval -= days *
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
      MILLISECONDS_IN_AN_HOUR * 24);

  /** @type {number} */
  var hours = Math.floor(effectiveInterval / (scottlogic.chart.rendering.
      DiscontinuousDateTimeAxis.MILLISECONDS_IN_AN_HOUR));
  effectiveInterval -= hours *
                       (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                           MILLISECONDS_IN_AN_HOUR);

  /** @type {number} */
  var minutes = Math.floor(effectiveInterval / ((scottlogic.chart.rendering.
      DiscontinuousDateTimeAxis.MILLISECONDS_IN_AN_HOUR) / 60));

  /** @type {goog.date.Interval} */
  var manipulateStep = new goog.date.Interval(0);

  /*
   * Months and years need to be static values.
   *
   * Days or more precise measurements must be discontinuous
   *
   * For example, if the effective step is 7 days, the interval step should be
   * set to 5 days. (5 working days in a week)
   */
  if (years > 1) {
    manipulateStep.years = years + 1;
  } else if (years > 1 || (years === 1 && months > 0)) {
    manipulateStep.months = 18;
  } else if (months > 6 || (months === 6 && days > 0)) {
    manipulateStep.years = 1;
  } else if (months > 3 || (months === 3 && days > 0)) {
    manipulateStep.months = 6;
  } else if (months > 1 || (months === 1 && days > 0)) {
    manipulateStep.months = 3;
  } else if (days > 14 || (days === 14 && hours > 0) || months > 0) {
    manipulateStep.months = 1;
  } else if (days > 5 || (days === 5 && hours > 0)) {
    // 2 weeks
    manipulateStep.days = 10;
  } else if (days > 2 || (days === 2 && hours > 0)) {
    // 1 week
    manipulateStep.days = 5;
  } else if (days > 1 || (days === 1 && hours > 0)) {
    manipulateStep.days = 2;
  } else {
    // days are 0 here - so look at hours
    // 12 hours+ = 1 day
    if (hours > 6 || (hours === 6 && minutes > 0) || days === 1) {
      manipulateStep.days = 1;
    } else if (hours > 3 || (hours === 3 && minutes > 0)) {
      manipulateStep.hours = 6;
    } else if (hours > 2 || (hours === 2 && minutes > 0)) {
      manipulateStep.hours = 3;
      // 2 hours
    } else if (hours > 1 || (hours === 1 && minutes > 0)) {
      manipulateStep.hours = 2;
    } else {
      // 1 hour
      if (minutes >= 30 || hours === 1) {
        manipulateStep.hours = 1;
        // 30 minutes
      } else if (minutes >= 15) {
        manipulateStep.minutes = 30;
        // 20 minutes
      } else if (minutes >= 10) {
        manipulateStep.minutes = 15;
        // 10 minutes
      } else if (minutes >= 5) {
        manipulateStep.minutes = 10;
        // 5 minutes
      } else if (minutes >= 1) {
        manipulateStep.minutes = 5;
        // 1 minute
      } else {
        manipulateStep.minutes = 1;
      }
    }
  }

  this.intervalStep = manipulateStep;
};

/**
 * Returns the close of business on friday of a given date
 *
 * @param {goog.date.UtcDateTime} input the date to get the end of the week of.
 * @return {goog.date.UtcDateTime} close of business on friday of the week.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getEndOfWeek_ =
    function(input) {
  /** @type {goog.date.Interval} */
  var moveToFriday = new goog.date.Interval(0, 0, (5 - input.getDay()));

  /** @type {goog.date.UtcDateTime} */
  var result = new goog.date.UtcDateTime(input);
  result.add(moveToFriday);
  result.setHours(this.endOfHours_.getHours());
  result.setMinutes(this.endOfHours_.getMinutes());
  result.setSeconds(this.endOfHours_.getSeconds());
  result.setMilliseconds(this.endOfHours_.getMilliseconds());

  return result;
};

/**
 * Returns the start of the day on a given date
 *
 * @param {goog.date.UtcDateTime} input the date to get the start of day from.
 * @return {goog.date.UtcDateTime} start of business that day.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getStartOfDay_ =
    function(input) {
  return new goog.date.UtcDateTime(input.getFullYear(), input.getMonth(), input
      .getDate(), this.startHours_, this.startOfHours_
      .getMinutes(), this.startSeconds_, 0);
};

/**
 * Returns the end of the day of a given date
 *
 * @param {goog.date.UtcDateTime} input the date to get the end of day from.
 * @return {goog.date.UtcDateTime} close of business that day.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getEndOfDay_ =
    function(input) {
  return new goog.date.UtcDateTime(input.getFullYear(), input.getMonth(), input
      .getDate(), this.endHours_, this.endMinutes_,
      this.endSeconds_, this.endOfHours_.getMilliseconds());
};

/**
 * Returns the number of ms to the end of the day
 *
 * @param {goog.date.UtcDateTime} date the day to get the ms to the end of.
 * @param {goog.date.UtcDateTime=} opt_endOfDay optional, the end of day to use.
 * @return {number} number of ms to the end of that day.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    getMsToEndOfDay_ = function(date, opt_endOfDay) {
  /** @type {goog.date.UtcDateTime} */
  var end = opt_endOfDay || this.getEndOfDay_(date);

  return end.getTime() - date.getTime();
};

/**
 * Returns the number of ms to the end of the week, from the end of the day
 *
 * @param {goog.date.UtcDateTime} date the day to get the ms to the end of.
 * @param {goog.date.UtcDateTime=} opt_endOfWeek optional, the end of week use.
 * @return {number} number of ms to the end of that week.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    getMsToEndOfWeek_ = function(date, opt_endOfWeek) {
  /** @type {goog.date.UtcDateTime} */
  var eow = opt_endOfWeek || this.getEndOfWeek_(date);
  return Math.floor((eow.getTime() - date.getTime()) /
          (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
              MILLISECONDS_IN_AN_HOUR * 24)) *
      this.millisecondsInAWorkingDay_;
};

/**
 * Returns true if the given input is before working hours
 *
 * @param {goog.date.UtcDateTime} input the date to check against.
 * @return {boolean} true if time is before working hours.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    isBeforeWorkingHours_ = function(input) {
  /** @type {number} */
  var inputHours = input.getHours();

  return inputHours < this.startHours_ ||
         (inputHours === this.startHours_ && input
             .getMinutes() < this.startMinutes_) ? true : false;
};

/**
 * Returns true if the given input is after working hours
 *
 * @param {goog.date.UtcDateTime} input the date to check against.
 * @return {boolean} true if time is after working hours.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    isAfterWorkingHours_ = function(input) {
  var inputHours = input.getHours();

  return inputHours > this.endHours_ ||
         (inputHours === this.endHours_ && input
             .getMinutes() > this.endMinutes_) ? true : false;
};

/**
 * Returns true or false depending on whether the input is within working hours
 *
 * @param {goog.date.UtcDateTime} input date to check.
 * @return {boolean} true if in working hours, false otherwise.
 * @public
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    isInWorkingHours = function(input) {
  return !(this.isBeforeWorkingHours_(input) ||
      this.isAfterWorkingHours_(input) ||
      this.isWeekend(input));
};

/**
 * Returns true if the input is on a weekend
 *
 * @public
 * @param {goog.date.UtcDateTime} input The date to check.
 * @return {boolean} true if on a weekend.
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.isWeekend =
    function(input) {
  /** @type {number} */
  var day = input.getDay();

  return (day === 6 || day === 0);
};

/**
 * Moves a date forward to the next working day / hour
 *
 * @param {goog.date.UtcDateTime} dateToMove the date to move forward.
 * @return {goog.date.UtcDateTime} the valid date.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.moveForward_ =
    function(dateToMove) {
  // Safeguard against values that are already in working hours : just return
  // input.
  if (this.isInWorkingHours(dateToMove)) { return dateToMove; }

  /** @type {goog.date.UtcDateTime} */
  var input = new goog.date.UtcDateTime(dateToMove);

  /** @type {boolean} */
  var hasMoved = false;

  if (this.isWeekend(input) ||
      (input.getDay() === 5 && this.isAfterWorkingHours_(input))) {
    /** @type {goog.date.Interval} */
    var moveToMon = new goog.date.Interval(0, 0, 0, 0, 0, 0);

    if (input.getDay() === 0) {
      moveToMon.days = 1;
    } else {
      moveToMon.days = (7 - Math.abs(1 - input.getDay()));
    }

    input.add(moveToMon);
    hasMoved = true;
  }

  // Move forward a day if required
  if (this.isAfterWorkingHours_(input) && !hasMoved) {
    /** @type {goog.date.Interval} */
    var nextDay = new goog.date.Interval(0, 0, 1, 0, 0, 0);
    input.add(nextDay);
  }

  // Set to the beginning of the working day
  input.setHours(this.startHours_);
  input.setMinutes(this.startMinutes_);
  input.setSeconds(0);
  input.setMilliseconds(0);

  return input;
};

/**
 * Gets the number of working ms from a given date
 * @param {goog.date.UtcDateTime} date The date to get the normalized value of.
 * @param {goog.date.UtcDateTime} baseDate The date to normalize from.
 * @return {number} the normalized value.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.normalizeFrom_ =
    function(date, baseDate) {
  /** @type {goog.date.UtcDateTime} */
  var input = date;

  /** @type {number} */
  var baseTime = baseDate.getTime();

  /** @type {number} */
  var inputTime = input.getTime();

  /** @type {number} */
  var result;

  //Does the input equal the minimum time? If so, return 0
  if (inputTime === baseTime) { return 0; }

  // Does the input fall on the same day as the base?
  if (goog.date.isSameDay(input, baseDate)) {
    // If so, simply return the difference in time (No working day
    // dependencies need to be considered)
    result = inputTime - baseTime;
  } else {
    /** @type {goog.date.UtcDateTime} */
    var endOfBaseDay = this.getEndOfDay_(baseDate);

    /** @type {number} */
    var toEndOfBaseDay = this.getMsToEndOfDay_(baseDate, endOfBaseDay);

    /** @type {goog.date.UtcDateTime} */
    var endOfBaseWeek = this.getEndOfWeek_(baseDate);

    /** @type {number} */
    var toEndOfBaseWeek = this.getMsToEndOfWeek_(baseDate, endOfBaseWeek);

    /** @type {goog.date.UtcDateTime} */
    var beginningOfInputDay = this.getStartOfDay_(input);

    /** @type {number} */
    var beginningTime = beginningOfInputDay.getTime();

    /** @type {number} */
    var toInput = inputTime - beginningTime;

    if (input.getWeekNumber() === baseDate.getWeekNumber() &&
        input.getFullYear() === baseDate.getFullYear()) {
      /** @type {number} */
      var daysBetweenEndOfMinDayAndIn = Math.floor(
          (beginningTime - endOfBaseDay.getTime()) /
              (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                  MILLISECONDS_IN_AN_HOUR * 24));

      // Total the values up and return
      result = toEndOfBaseDay +
          (this.millisecondsInAWorkingDay_ * daysBetweenEndOfMinDayAndIn) +
          toInput;
    } else {
      /** @type {goog.date.UtcDateTime} */
      var beginningOfInputWeek = this.getStartOfWeek_(beginningOfInputDay);

      /** @type {number} */
      var daysBetweenLastWeekEndAndIn = Math.floor(
          (beginningTime - beginningOfInputWeek.getTime()) /
              (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                  MILLISECONDS_IN_AN_HOUR * 24));

      var toBeginningOfInputDay = daysBetweenLastWeekEndAndIn *
                                  this.millisecondsInAWorkingDay_;

      /** @type {number} */
      var weeksBetween = Math.floor(
          (beginningTime - endOfBaseWeek.getTime()) /
              (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                  MILLISECONDS_IN_AN_HOUR * 24 * 7));

      // Total values up and return
      result = toEndOfBaseDay + toEndOfBaseWeek +
          (weeksBetween * this.millisecondsInAWorkingWeek_) +
          toBeginningOfInputDay + toInput;
    }
  }

  return result;
};

/**
 * Will return the number of working milliseconds between the min and the input.
 *
 * The function works incrementally: it will decide how far away input is from
 * the min, and then begin computation. It works on a 'milestone' basis. It will
 * total the number of ms between each milestone and add it to the result.
 *
 * The algorithm then uses the largest common time period to shorten the
 * process.
 *
 * For example, if the min and the input are in 2 different weeks: min ->
 * endOfMinDay_ -> endOfMinWeek_ -> ** weeks between ** ->
 * toInputDayFromStartOfInputWeek -> toInputFromStartOfInputDay Whereby weeks
 * between is the largest common time. The algorithm will compute the number of
 * weeks between and multiply by the number of ms in a week. This is where the
 * algorithm gains its scalability.
 *
 * Normalize will also move the date forward if it is not a valid date, and then
 * compute the valid date.
 *
 * The checks occur in the following order: - Valid Date? (If not, move
 * forward.) - Same as the min? (If so, return 0). - Same day? (If so, no
 * discontinuous period between the 2 values, so just return the difference) -
 * Same week? (If so, common time period is days. Calculate to the end of the
 * min day + beginning of input day, and add it to the number of days between *
 * ms in a day) - Else - See above.
 *
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.normalize =
    function(inputObj) {

  // Check whether the working ms has been assigned already
  if (inputObj.workingMs > -1) {
    return inputObj.workingMs;
  }

  // We check the cache to get the normalized value of the beginning of the
  // input day

  /** @type {goog.date.UtcDateTime} */
  var input = new goog.date.UtcDateTime(new Date(inputObj));

  if (!this.isInWorkingHours(/** @type {goog.date.UtcDateTime} */ (inputObj))) {
    input = this.moveForward_(input);
  }
  /** @type {number} */
  var index = this.cache_.findKey(input);

  /** @type {goog.date.UtcDateTime} */
  var start = this.cache_.getKey(index);

  /** @type {?number} */
  var baseNormalized = this.cache_.getVal(index);

  var result;

  // If we don't have a beginning day value, normalize from the epoch
  if (!(baseNormalized > -1)) {
    result = this.normalizeFrom_(input,
        new goog.date.UtcDateTime(new Date(0)));
  } else {
    // Otherwise we normalize from the base
    result = baseNormalized + this.normalizeFrom_(input, start);
  }

  // Assign the normalized value to the original object and return the result
  inputObj.workingMs = result;
  return result;
};

/**
 * Getting the first label tick will return the following, depending on the
 * interval specified by the user: Years - January 1st on the first year after
 * the min. Months - The first of the next month after the min. Days - The start
 * of business (e.g. 8am) on the day after the min Hours - The next whole hour
 * after the min Minutes - See hours Seconds - See hours
 *
 * Note that the min itself can be a valid point. So if you select years, and
 * the min is the 1st Jan 2010, the first label tick will be the 1st Jan 2010.
 * However, if the min is 2nd Jan 2010, the first tick will round forward to be
 * 1st Jan 2011.
 *
 * @inheritDoc
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.
    getFirstLabelTick = function() {

  // We hold a temporary date, which is the beginning of the working day.
  var tempDate = this.denormalize(this.normalize(this.min));

  /** @type {goog.date.Interval} */
  var interval = new goog.date.Interval(0, 0, 0, 0, 0, 0);

  /* We now need to decide how much to increase the min by to get a 'nice'
   * value for the first tick. */
  if (this.intervalStep.years > 0) {
    // Year case, we want to move the date to the first of January.
    tempDate.setMonth(goog.date.month.JAN);
    tempDate.setDate(1);
    interval.years = 1;
  } else if (this.intervalStep.months > 0) {
    // Month case, we want to move the date to the first of the month
    tempDate.setDate(1);
    interval.months = 1;
  } else if (this.intervalStep.days > 0) {
    /* Day case, we don't move the Date at all because it's already at the
     * start of the working day at initialisation */
    interval.days = 1;
  } else if (this.intervalStep.hours > 0) {
    // Hour case, move the date to minimum's hour, and set the minutes to 0
    tempDate.setHours(this.min.getHours());
    tempDate.setMinutes(0);
    interval.hours = 1;
  } else {
    /* And in the minute case, (which is the default), we move the date to the
     * next multiple of the interval step's minutes.
     *
     * So if we have an interval step of 5 minutes, the date would be moved to
     * something like 5.10, or 5.25 */
    tempDate.setMinutes((this.intervalStep.minutes *
        Math.round(this.min.getMinutes() / this.intervalStep.minutes)));
    interval.minutes = this.intervalStep.minutes;
  }

  if (!tempDate.equals(this.min)) {
    tempDate.add(interval);
  }

  return this.normalize(tempDate);
};

/**
 * Incrementing in a discontinuous manner is slightly different.
 *
 * The interval is added to the Date as you'd expect, but there is a remainder
 * value that must be considered. For example:
 *
 * Close of business = 17.30 Start of business = 08.15 Interval = 1 hour
 * increment(17:20) -> 18:20 normalize(18:20) -> null 18:20.add(1 hour) -> 19:20
 * normalize(19:20) -> null 19:20.add(1 hour) -> 20:20 normalize(20:20) -> null
 * and so on, until 07:20.add(1 hour) -> 08:20 normalize(08:20) -> valid,
 * normalized value given return the normalized value of 8:20 INCORRECT - should
 * have returned 8:15!
 *
 * Solution is to hold the remainder, which is what increment does. So:
 *
 * increment(17:20) -> 18:20 Increment must now compute what WASN'T used in the
 * interval step, as it will need to add it on the following day. Because it
 * took us 10 minutes to get the to the end of the day from 17:20, the remainder
 * is 50 minutes. normalize(18:20) -> 08:15 Increment then adds on the remainder
 * that it computed return 09:05
 *
 * @inheritDoc
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.increment =
    function(input) {
  /** @type {goog.date.UtcDateTime} */
  var date = /** @type {goog.date.UtcDateTime} */
      (this.denormalize(input));

  /** @type {goog.date.UtcDateTime} */
  var inputDate = new goog.date.UtcDateTime(date);

  /** @type {number} */
  var remainder = 0;

  /* In the year / month case - we don't care about discontinuous, as we want
   * to increment by a static value each time (The first of every month / Jan).
   *
   * We also want to make sure we stay at that date, so if the 1st Jan is a Sat,
   * the 3rd of Jan is returned, but when the 3rd of Jan is incremented, the 1st
   * of Feb is returned
   */
  if (this.intervalStep.years > 0 || this.intervalStep.months > 0) {
    if (this.intervalStep.years > 0) {
      date.setMonth(0);
    }

    date.setDate(1);
    date.add(this.intervalStep);
    return this.normalize(this.moveForward_(date));
  }

  // Otherwise, just a regular increment, so add it to the date
  return this.normalize(
      this.add_(date, this.intervalStep));
};

/**
 * Denormalize will convert a normalized value into a Date object.
 *
 * @inheritDoc
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.denormalize =
    function(input) {
  /** @type {number} */
  var index = this.cache_.findVal(input);

  /** @type {goog.date.UtcDateTime} */
  var baseDate = this.cache_.getKey(index);

  /** @type {number} */
  var baseNormalized = /** @type {number} */(this.cache_.getVal(index));

  /** @type {number} */
  var inter = input - baseNormalized;

  // Return the minimum if the remaining is 0
  if (input === 0) {
    return baseDate;
  }

  return this.addNormalized_(baseDate, inter);
};

/**
 * Adds an interval to a date in a discontinuous manner
 * @param {goog.date.UtcDateTime} date the date to add to.
 * @param {goog.date.Interval} interval the interval to add.
 * @return {goog.date.UtcDateTime} the result.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.add_ = function(
    date, interval) {
  var discontMs = (interval.days * this.millisecondsInAWorkingDay_) +
                  ((interval.getTotalSeconds() * 1000) -
                      ((scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                      MILLISECONDS_IN_AN_HOUR * 24) * interval.days));

  return this.addNormalized_(date, discontMs);
};

/**
 * Adds a number of normalized ms to a date
 * @param {goog.date.UtcDateTime} date the date to add to.
 * @param {number} ms the normalized ms to add.
 * @return {goog.date.UtcDateTime} the result.
 * @private
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.addNormalized_ =
    function(date, ms) {

  /** @type {number} */
  var dateMs = date.getTime();

  /** @type {number} */
  var toEndOfDay = this.getMsToEndOfDay_(date);

  /** @type {number} */
  var toEndOfWeek = this.getMsToEndOfWeek_(date);

  // move result to the end of the week (close of business on friday)
  dateMs += toEndOfDay + ((toEndOfWeek / this.millisecondsInAWorkingDay_)) *
            (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                MILLISECONDS_IN_AN_HOUR * 24);
  ms -= toEndOfDay + toEndOfWeek;

  // add on the number of weeks * ms in a week, and subtract that from the
  // remaining
  dateMs += Math.floor(ms / this.millisecondsInAWorkingWeek_) *
            ((scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                MILLISECONDS_IN_AN_HOUR * 24) * 7);
  ms -= Math.floor(ms / this.millisecondsInAWorkingWeek_) *
      this.millisecondsInAWorkingWeek_;

  // result is currently at the end of the week, with not enough ms to
  // take it further another week
  // add on the weekend to bring us to the starting hour on monday
  dateMs += (((24 - (this.endHours_ +
      (this.endMinutes_ / 60))) *
      scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
      MILLISECONDS_IN_AN_HOUR) + (2 *
          (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
              MILLISECONDS_IN_AN_HOUR * 24)) + ((this.startHours_ +
                  (this.startMinutes_ / 60)) *
                  scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                  MILLISECONDS_IN_AN_HOUR));

  // so result is now at the start of hours on monday morning
  // now add the number of days * ms in a day
  dateMs += Math.floor(ms / this.millisecondsInAWorkingDay_) *
            (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                MILLISECONDS_IN_AN_HOUR * 24);

  ms -= Math.floor(ms / this.millisecondsInAWorkingDay_) *
      this.millisecondsInAWorkingDay_;

  // result is currently at the start of business and there isn't enough
  // remaining to move another day. Add the remainder
  dateMs += ms;

  return new goog.date.UtcDateTime(new Date(dateMs));
};

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.compare =
    function(obj1, obj2) {
  if (obj1.getTime() > obj2.getTime()) {
    return 1;
  } else if (obj1.getTime() < obj2.getTime()) {
    return -1;
  } else {
    return 0;
  }
};

/**
 * @override
 * TODO: implement
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.padLeft =
    function(obj, opt_rangeMin, opt_rangeMax) {
  return obj;
};

/**
 * @override
 * TODO: implement
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.padRight =
    function(obj, opt_rangeMin, opt_rangeMax) {
  return obj;
};

/**
 * @override
 */
scottlogic.chart.rendering.DiscontinuousDateTimeAxis.prototype.getDefaultBounds =
    function() {
  // TODO(shall): should this be Discontinuous?
  /** @type {goog.date.UtcDateTime} */
  var yester = new goog.date.UtcDateTime(new Date());
  yester.add(new goog.date.Interval(0, 0, -1));
  
  // Returning this time yesterday and current time
  return [yester, new goog.date.UtcDateTime(new Date())];  
}
