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

goog.provide('scottlogic.chart.rendering.DateTimeAxis');

goog.require('goog.date.Interval');
goog.require('goog.date.UtcDateTime');
goog.require('scottlogic.chart.rendering.AbstractAxis');

/**
 * A Date Time axis should be used on the X Axis to plot dates and times. To
 * avoid time zone problems, it's best to use UTC and then adjust it yourself.
 *
 * @inheritDoc
 * @extends {scottlogic.chart.rendering.AbstractAxis}
 * @constructor
 */
scottlogic.chart.rendering.DateTimeAxis = function() {
  scottlogic.chart.rendering.AbstractAxis.call(this);

  /**
   * The minimum date on the axis
   *
   * @type {goog.date.UtcDateTime}
   * @public
   */
  this.min = new goog.date.UtcDateTime(new Date());
  this.min.add(new goog.date.Interval(0, 0, -1));

  /**
   * The maximum date on the axis
   *
   * @type {goog.date.UtcDateTime}
   * @public
   */
  this.max = new goog.date.UtcDateTime(new Date());
};
goog.inherits(scottlogic.chart.rendering.DateTimeAxis,
    scottlogic.chart.rendering.AbstractAxis);

/**
 * @override
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.padLeft =
    function(obj, opt_range) {
  return obj;
};

/**
 * @override
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.padRight =
    function(obj, opt_range) {
  return obj;
};

/**
 * @inheritDoc
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.normalize = function(input) {
  return input.getTime();
};

/**
 * @inheritDoc
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.getFirstLabelTick =
    function() {

  /** @type {goog.date.UtcDateTime} */
  var tempDate = new goog.date.UtcDateTime(this.min);

  /** @type {goog.date.Interval} */
  var interval;

  // Round the date to the next whole date, judged on the Interval
  if (this.intervalStep.years > 0) {
    tempDate = new goog.date.UtcDateTime(this.min.getFullYear(), 0, 1, 0, 0, 0,
        0);
    interval = new goog.date.Interval(1, 0, 0, 0, 0, 0);
  } else if (this.intervalStep.months > 0) {
    tempDate = new goog.date.UtcDateTime(this.min.getFullYear(), this.min
        .getMonth(), 1, 0, 0, 0, 0);
    interval = new goog.date.Interval(0, 1, 0, 0, 0, 0);
  } else if (this.intervalStep.days > 0) {
    tempDate = new goog.date.UtcDateTime(this.min.getFullYear(), this.min
        .getMonth(), this.min.getDate(), 0, 0, 0, 0);
    interval = new goog.date.Interval(0, 0, 1, 0, 0, 0);
  } else if (this.intervalStep.hours > 0) {
    tempDate = new goog.date.UtcDateTime(this.min.getFullYear(), this.min
        .getMonth(), this.min.getDate(), this.min.getHours(), 0, 0, 0);
    interval = new goog.date.Interval(0, 0, 0, 1, 0, 0);
  } else if (this.intervalStep.minutes > 0) {
    tempDate = new goog.date.UtcDateTime(this.min.getFullYear(), this.min
        .getMonth(), this.min.getDate(), this.min.getHours(), this.min
        .getMinutes(), 0, 0);
    interval = new goog.date.Interval(0, 0, 0, 0, 1, 0);
  }

  // If the date is not changed (i.e. the min was the beginning of the
  // year/month etc.) then do nothing, the min is ok
  if (!(this.min.equals(tempDate))) {
    tempDate.add(interval);
  }

  return this.normalize(tempDate);
};

/**
 * Number of milliseconds in an hour
 *
 * @type {number}
 * @const
 */
scottlogic.chart.rendering.DateTimeAxis.MILLISECONDS_IN_AN_HOUR = 3600000;

/**
 * @override
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.estimateWidestLabel =
    function() {
  var longLabel = new goog.date.UtcDateTime(8888, goog.date.month.DEC, 30, 10,
      10, 10, 888);

  return this.normalize(longLabel);
};

/**
 * @override
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.setIntervalStep = function(
    input) {
  /** @type {number} */
  var effectiveInterval = (this.max.getTime() - this.min.getTime()) / input;

  /** @type {number} */
  var daysInInterval = Math.floor(effectiveInterval /
          (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
              MILLISECONDS_IN_AN_HOUR * 24));

  effectiveInterval -= daysInInterval *
                       (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                           MILLISECONDS_IN_AN_HOUR * 24);

  /** @type {number} */
  var hoursInInterval = Math
      .floor(effectiveInterval /
             (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                 MILLISECONDS_IN_AN_HOUR));
  effectiveInterval -= hoursInInterval *
                       (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                           MILLISECONDS_IN_AN_HOUR);

  /** @type {number} */
  var minutesInInterval = Math
      .floor(effectiveInterval /
             ((scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
                 MILLISECONDS_IN_AN_HOUR) / 60));

  /** @type {goog.date.Interval} */
  var manipulateStep = new goog.date.Interval(0);

  /**
   * The algorithm has a concept of milestones. Values will be rounded up to the
   * next milestone. This prevents things like 7 hours & 34 minutes being
   * rounded to 8 hours, when really it may want to be a day.
   *
   * The flaw in this strategy is that the "sensible" times below may never be
   * precise enough.
   */
  // 5 years
  if (daysInInterval > scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
      DAYS_IN_A_MONTH * 12 ||
      (daysInInterval === scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
          DAYS_IN_A_MONTH * 12 && hoursInInterval > 0)) {
    manipulateStep.days = (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
        DAYS_IN_A_MONTH * 12) * 5;
    // year
  } else if (daysInInterval >
      (scottlogic.chart.rendering.DiscontinuousDateTimeAxis.
          DAYS_IN_A_MONTH * 6) ||
             (daysInInterval === (30.4375 * 6) && hoursInInterval > 0)) {
    manipulateStep.days = scottlogic.chart.rendering.
        DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH * 12;
    // 6 months
  } else if (daysInInterval > scottlogic.chart.rendering.
      DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH ||
             (daysInInterval === scottlogic.chart.rendering.
                 DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH &&
                 hoursInInterval > 0)) {
    manipulateStep.days = scottlogic.chart.rendering.
        DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH * 6;
    // month
  } else if (daysInInterval > 14 ||
      (daysInInterval === 14 && hoursInInterval > 0)) {
    manipulateStep.days = scottlogic.chart.rendering.
        DiscontinuousDateTimeAxis.DAYS_IN_A_MONTH;
    // 2 weeks
  } else if (daysInInterval > 7 ||
      (daysInInterval === 7 && hoursInInterval > 0)) {
    manipulateStep.days = 14;
  } else if (daysInInterval > 5 ||
      (daysInInterval === 5 && hoursInInterval > 0)) {
    manipulateStep.days = 7;
    // 1 week
  } else if (daysInInterval > 2 ||
      (daysInInterval === 2 && hoursInInterval > 0)) {
    manipulateStep.days = 5;
  } else if (daysInInterval > 1 ||
      (daysInInterval === 1 && hoursInInterval > 0)) {
    manipulateStep.days = 2;
  } else {
    // days are 0 here - so look at hours
    // 12 hours+ = 1 day
    if (hoursInInterval > 12 ||
        (hoursInInterval === 12 &&
            minutesInInterval > 0) || daysInInterval === 1) {
      manipulateStep.days = 1;
      // 12 hours
    } else if (hoursInInterval > 6 ||
        (hoursInInterval === 6 && minutesInInterval > 0)) {
      manipulateStep.hours = 12;
      // 6 hours
    } else if (hoursInInterval > 2 ||
        (hoursInInterval === 2 && minutesInInterval > 0)) {
      manipulateStep.hours = 6;
      // 2 hours
    } else if (hoursInInterval > 1 ||
        (hoursInInterval === 1 && minutesInInterval > 0)) {
      manipulateStep.hours = 2;
    } else {
      // hours are 0 here
      // 1 hour
      if (minutesInInterval > 30 || hoursInInterval === 1) {
        manipulateStep.hours = 1;
        // 30 minutes
      } else if (minutesInInterval > 20 || minutesInInterval === 30) {
        manipulateStep.minutes = 30;
        // 20 minutes
      } else if (minutesInInterval > 15 || minutesInInterval === 20) {
        manipulateStep.minutes = 20;
        // 15 minutes
      } else if (minutesInInterval > 10 || minutesInInterval === 15) {
        manipulateStep.minutes = 15;
        // 10 minutes
      } else if (minutesInInterval > 5 || minutesInInterval === 10) {
        manipulateStep.minutes = 10;
        // 5 minutes
      } else if (minutesInInterval > 1 || minutesInInterval === 5) {
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
 * @inheritDoc
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.denormalize = function(
    input) {
  /** @type {Date} */
  var date = new Date(input);
  date = new goog.date.UtcDateTime(date);
  return date;
};

/**
 * @inheritDoc
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.increment = function(input) {
  /** @type {goog.date.UtcDateTime} */
  var date = /** @type {goog.date.UtcDateTime} */
      (this.denormalize(input));
  date.add(this.intervalStep);

  return this.normalize(date);
};

/**
 * @override
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.compare =
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
 */
scottlogic.chart.rendering.DateTimeAxis.prototype.getDefaultBounds = 
    function() {
  /** @type {goog.date.UtcDateTime} */
  var yester = new goog.date.UtcDateTime(new Date());
  yester.add(new goog.date.Interval(0, 0, -1));
  
  // Returning this time yesterday and current time
  return [yester, new goog.date.UtcDateTime(new Date())]; 
};
