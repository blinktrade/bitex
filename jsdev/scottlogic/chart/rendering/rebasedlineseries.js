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

goog.provide('scottlogic.chart.rendering.RebasedLineSeries');

goog.require('scottlogic.chart.rendering.LineSeries');

/**
 * @inheritDoc
 * @extends {scottlogic.chart.rendering.LineSeries}
 * @constructor
 */
scottlogic.chart.rendering.RebasedLineSeries = function(id, input) {
  scottlogic.chart.rendering.LineSeries.call(this, id, input);
  /**
   * Stores the original points, before any rebasing
   * @private
   * @type {Array.<[goog.date.UtcDateTime, number]>}
   */
  this.originalPoints_ = [];

  // TODO: tidy this up? put it elsewhere?
  for (var i in this.points) {
    this.originalPoints_[i] =
        [goog.object.clone(this.points[i][0]), this.points[i][1]];
  }

  /**
   * Hold the rebase value of the line series (the first value / parameter)
   *
   * @private
   * @type {number}
   */
  this.rebaseValue_ = this.points[0][1];

  this.rebase(this.rebaseValue_);
};
goog.inherits(scottlogic.chart.rendering.RebasedLineSeries,
    scottlogic.chart.rendering.LineSeries);

/**
 * Applies a rebase value to the points. It will apply it to the original
 * points, regardless if a rebase operation has already been performed
 * @param {number} rebaseVal the value to rebase against.
 */
scottlogic.chart.rendering.RebasedLineSeries.prototype.rebase =
    function(rebaseVal) {
  this.rebaseValue_ = rebaseVal;

  // Guard against divide against zero errors. If the rebase value is
  // zero, we do not need to apply any rebasing.
  if(rebaseVal !== 0) {
    // Convert all values to rebased values
    for (var i = 0, l = this.points.length; i < l; i++) {
      this.points[i][1] = ((this.originalPoints_[i][1] - this.rebaseValue_) /
        this.rebaseValue_) * 100;
    }
  }
};

/**
 * Returns the point that is nearest the given date (forward looking)
 * Looks in the original data points
 *
 * @param {*} dataPoint the point to search for.
 * @return {[*, *]}
 *                               the point the param is closest to.
 * @public
 */
scottlogic.chart.rendering.RebasedLineSeries.prototype.getNearestOriginalX =
    function(dataPoint) {
  return this.isVisible() ? this.originalPoints_[this.getNearestPoint_(
      dataPoint, 0, this.originalPoints_)] : null;
};

/**
 * Returns the point that is nearest the given value (forward looking)
 * Looks in the original data points
 *
 * @param {*} dataPoint the point to search for.
 * @return {[*, *]}
 *                           the point the param is closest to.
 * @public
 */
scottlogic.chart.rendering.RebasedLineSeries.prototype.getNearestOriginalY =
    function(dataPoint) {
  return this.isVisible() ? this.originalPoints_[this.getNearestPoint_(
      dataPoint, 1, this.originalPoints_)] : null;
};



