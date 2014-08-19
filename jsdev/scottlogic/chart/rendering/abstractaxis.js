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

goog.provide('scottlogic.chart.rendering.AbstractAxis');

/**
 * This AbstractAxis object will contain the data underlying the graphical
 * representation of the AbstractAxis.
 *
 * The axis is responsible for the conversion of all
 * points to normalized values and vice versa. So, the axis will convert a Date
 * object to some normalized value depending on the implementation.
 *
 * An AbstractAxis should never be instantiated, but should be extended.
 *
 * Extend the AbstractAxis into a data format you wish to use,
 * and ensure that all the functions carry
 * out their means.
 *
 * @constructor
 */
scottlogic.chart.rendering.AbstractAxis = function() {
  /**
   * @type {?function(*):string}
   * @private
   */
  this.formatter_ = null;

  /**
   * A flag to show whether the min has been given by the user or not
   *
   * @public
   * @type {boolean}
   */
  this.userHasDefinedMin = false;

  /**
   * A flag to show whether the max has been given by the user or not
   *
   * @type {boolean}
   * @public
   */
  this.userHasDefinedMax = false;

  /**
   * Whether the axis is initialized
   * @type {boolean}
   * @protected
   */
  this.initialized = false;
};

/**
 * Will convert an object type into a normalized value
 *
 * @param {*} input the object to normalize.
 * @public
 * @return {number} the normalized value.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.normalize =
    goog.abstractMethod;

/**
 * Sets the maximum on the axis
 *
 * @param {*} input The time to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.AbstractAxis.prototype.setMinimum = function(input) {
  this.min = input;
  this.userHasDefinedMin = true;
};

/**
 * Sets the maximum on the axis
 *
 * @param {*} input The time to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.AbstractAxis.prototype.setMaximum = function(input) {
  this.max = input;
  this.userHasDefinedMax = true;
};

/**
 * Returns the normalized value of an estimation of the widest label
 *
 * @public
 * @return {number} An estimation of the widest label.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.estimateWidestLabel =
    goog.abstractMethod;

/**
 * Converts a normalized value into an object representation
 *
 * @public
 * @param {number} input the normalized value to denormalize.
 * @return {*} The object representing the normalized value.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.denormalize =
    goog.abstractMethod;

/**
 * Sets the formatter of this AbstractAxis
 *
 * @public
 * @export
 * @param {function(*):string} formatter the normalized value to denormalize.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.setFormatter =
    function(formatter) {
  this.formatter_ = formatter;
};

/**
 * Sets the interval step based on a normalized value given
 *
 * @public
 * @param {number} input The number of labels that will effectively fit on the
 *        axis.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.setIntervalStep =
    goog.abstractMethod;

/**
 * Performs any Axis initialization
 *
 * @public
 */
scottlogic.chart.rendering.AbstractAxis.prototype.initialize = function() {
  if (!this.initialized_) {
    this.initialized_ = true;
    this.initializeInternal();
  }
};

/**
 * Performs any internal initialization
 * @protected
 */
scottlogic.chart.rendering.AbstractAxis.prototype.initializeInternal =
    goog.abstractMethod;

/**
 * Will convert a normalized value into a String format to be printed as a Label
 *
 * @public
 * @param {number} normalizedVal the object to get the label of.
 * @return {string} the label text.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.getLabel =
    function(normalizedVal) {
  return this.formatter_ ? this.formatter_(this.denormalize(normalizedVal)) :
      String(this.denormalize(normalizedVal));
};

/**
 * Returns the normalized value of the first label tick
 *
 * @public
 * @return {number} normalized value of first label tick.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.getFirstLabelTick =
    goog.abstractMethod;

/**
 * Applies padding to the left of a value
 * @public
 * @param {*} obj the value to pad.
 * @param {?*} opt_rangeMin optionally, can specify the range.
 * @param {?*} opt_rangeMax optionally, can specify the range.
 * @return {*} the padded value.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.padLeft = goog.abstractMethod;

/**
 * Applies padding to the right of a value
 * @public
 * @param {*} obj the value to pad.
 * @param {?*} opt_rangeMin optionally, can specify the range.
 * @param {?*} opt_rangeMax optionally, can specify the range.
 * @return {*} the padded value.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.padRight =
    goog.abstractMethod;

/**
 * Compares 2 objects. Should return:
 * positive number if obj1 is greater than obj2
 * negative number if obj1 is less than obj2
 * 0 if obj1 is equal to obj2
 * @public
 * @param {*} obj1 the first parameter object.
 * @param {*} obj2 the second parameter object.
 * @return {number} the result (see above).
 */
scottlogic.chart.rendering.AbstractAxis.prototype.compare = goog.abstractMethod;

/**
 * Returns true if the 2 parameter objects are equal.
 * @public
 * @param {*} obj1 the left hand side of the equals
 * @param {*} obj2 the right hand side of the equals
 * @return {boolean} whether obj1 === obj2
 */
scottlogic.chart.rendering.AbstractAxis.prototype.equals = function(obj1, obj2) {
  return this.compare(obj1, obj2) === 0;
};

/**
 * Returns an array of 2 objects, one being the default minimum value, and the
 * other the default maximum value.
 *
 * @public
 * @return {Array.<*>} the minimum and maximum default values.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.getDefaultBounds = goog.abstractMethod;

/**
 * Will increment a normalized value and return the new normalized value
 *
 * @public
 * @param {number} input the normalized input to increment.
 * @return {number} the normalized incremented value.
 */
scottlogic.chart.rendering.AbstractAxis.prototype.increment =
    goog.abstractMethod;
