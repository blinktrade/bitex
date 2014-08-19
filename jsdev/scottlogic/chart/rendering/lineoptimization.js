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

goog.provide('scottlogic.chart.rendering.lineoptimization');

goog.require('goog.math.Coordinate');

/**
 * Simplifies a line by reducing the number of points on the line
 * whilst retaining the general structure and curve
 *
 * Uses the Ramer-Douglas-Peucker algorithm
 * @param {Array.<goog.math.Coordinate>} pointList
 *  the list of co-ordinates to simplify.
 * @param {number} epsilon some constant to use when simplifying the line.
 * @return {Array.<goog.math.Coordinate>} the simplified line.
 * @this {Array.<goog.math.Coordinate>}
 */
scottlogic.chart.rendering.lineoptimization.simplify = function(
    pointList, epsilon) {
  //find the point with the maximum distance
  var points = pointList;

  /** @type {number} */
  var dmax = 0;

  /** @type {number} */
  var index = 0;

  for (var i = 1; i < points.length - 1; i++) {
    /** @type {number} */
    var d =
        scottlogic.chart.rendering.lineoptimization.orthogonalDistance_(
            points[i], [points[0], points[points.length - 1]]);

    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  /** @type {Array.<goog.math.Coordinate>} */
  var result = [];

  //If max distance is greater than epsilon, recursively simplify
  if (dmax >= epsilon) {
    /**
     * @type {Array.<goog.math.Coordinate>}
     */
    var recResults1 =
        scottlogic.chart.rendering.lineoptimization.simplify(
        points.slice(0, index + 1), epsilon);

    /** @type {Array.<goog.math.Coordinate>} */
    var recResults2 =
        scottlogic.chart.rendering.lineoptimization.simplify(
        points.slice(index, points.length), epsilon);

    recResults1 = recResults1.slice(0, recResults1.length - 1);

    result = recResults1.concat(recResults2);
  } else {
    result = [points[0], points[points.length - 1]];
  }

  return result;
};

/**
 * Returns the distance between a point and a line
 * @param {goog.math.Coordinate} point
 *  the point to measure the distance to.
 * @param {Array.<goog.math.Coordinate>} line
 *  the line to measure the points from in the form [p1, p2].
 * @return {number} the distance between the point and the line.
 * @private
 */
scottlogic.chart.rendering.lineoptimization.orthogonalDistance_ = function(
    point, line) {
  /** @type {goog.math.Coordinate} */
  var p1 = line[0];

  /** @type {goog.math.Coordinate} */
  var p2 = line[1];

  /** @type {goog.math.Coordinate} */
  var p3 = point;

  /** @type {number} */
  var xDelta = p2.x - p1.x;

  /** @type {number} */
  var yDelta = p2.y - p1.y;

  /** @type {number} */
  var u = ((p3.x - p1.x) * xDelta + (p3.y - p1.y) * yDelta) /
      (xDelta * xDelta + yDelta * yDelta);

  /** @type {goog.math.Coordinate} */
  var closestPoint;

  if (u < 0) {
    closestPoint = p1;
  } else if (u > 1) {
    closestPoint = p2;
  } else {
    closestPoint =
        new goog.math.Coordinate(p1.x + (u * xDelta), p1.y + (u * yDelta));
  }

  return goog.math.Coordinate.distance(closestPoint, p3);
};

