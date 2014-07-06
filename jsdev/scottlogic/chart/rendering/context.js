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

goog.provide('scottlogic.chart.rendering.Context');

goog.require('goog.math');

/**
 * Represents a Context. The context will allow a Line Series to plot a path in
 * the current drawing context (i.e. the plotting area).
 *
 * The context only handles canvas points, so call convertPath on a Path of
 * canvas points to receive a clipped path.
 *
 * @param {goog.math.Rect} context The context in which to draw.
 * @constructor
 */
scottlogic.chart.rendering.Context = function(context) {
  /**
   * The clipped rectangle
   *
   * @public
   * @type {goog.math.Rect}
   */
  this.plotArea = context;
};

/**
 * Converts an array of points into a path that will fit on the context
 * @param {Array.<goog.math.Coordinate>} pts the array of points to convert.
 * @return {goog.graphics.Path} the converted path.
 */
scottlogic.chart.rendering.Context.prototype.convertPoints = function(pts) {
  /** @type {goog.graphics.Path} */
  var newPath = new goog.graphics.Path();

  /**
   * The list of points on the path, which is assigned in the callback
   *
   * @type {Array.<goog.math.Coordinate>}
   */
  var points = pts;

  /** @type {goog.math.Coordinate} */
  var current;

  /** @type {boolean} */
  var hasStarted = false;

  /** @type {Array.<number>} */
  var clipped = [];

  /** @type {goog.math.Coordinate} */
  var previous = points[0];

  /** @type {boolean} */
  var previousWasOffScreen;

  // Calculate whether the first point was off screen or not.
  if (this.plotArea.contains(previous)) {
    previousWasOffScreen = false;
  } else {
    previousWasOffScreen = true;
  }

  // Now iterate through the rest of the points in 2 (i = x, i+1 = y)
  for (var i = 1; i < points.length; i++) {
    // Assign the current points
    current = points[i];

    if (this.plotArea.contains(current)) {
      if (previousWasOffScreen) {
        // Current point is in the context, but the previous point was
        // not
        clipped = this.clip_(current.x, current.y, previous.x, previous.y);

        // Move to the intersection
        newPath.moveTo(clipped[2], clipped[3]);

        // Draw to the current point
        newPath.lineTo(current.x, current.y);

        // Is no longer off screen
        previousWasOffScreen = false;

        // Path has begun
        hasStarted = true;
      } else {
        // Current point is in the context, as was the previous.
        if (!hasStarted) {
          // Move to the previous point
          newPath.moveTo(previous.x, previous.y);

          // Draw to the current point
          newPath.lineTo(current.x, current.y);

          // Path has begun
          hasStarted = true;
        } else {
          // Otherwise simply draw a line
          newPath.lineTo(current.x, current.y);
        }
      }
    } else {
      if (previousWasOffScreen) {
        // Current point is not in the context, and neither was previous
        clipped = this.clip_(previous.x, previous.y, current.x, current.y);

        // Move to the intersection of the starting point
        newPath.moveTo(clipped[0], clipped[1]);

        // Draw to the intersection of the ending point
        if (this.plotArea.contains(new goog.math.Coordinate(clipped[2],
            clipped[3]))) {
          newPath.lineTo(clipped[2], clipped[3]);
        } else {
          newPath.moveTo(clipped[2], clipped[3]);
        }

        hasStarted = true;
      } else {
        // Current point is not in context, but the previous was
        // Move to the previous point (Guards against not starting)
        newPath.moveTo(previous.x, previous.y);
        clipped = this.clip_(previous.x, previous.y, current.x, current.y);

        // Draw to the intersection
        newPath.lineTo(clipped[2], clipped[3]);

        // Move to the current point (off the context)
        newPath.moveTo(current.x, current.y);

        // Path has begun
        hasStarted = true;
      }
      previousWasOffScreen = true;
    }
    previous = current;
  }

  return newPath;
};

/**
 * Converts a path into a new path that will fit on the context.
 *
 * @public
 * @param {goog.graphics.Path} path the path of canvas points to convert.
 * @return {goog.graphics.Path} The clipped path.
 */
scottlogic.chart.rendering.Context.prototype.convertPath = function(path) {
  /** @type {scottlogic.chart.rendering.Context} */
  var that = this;

  /** @type {Array.<goog.math.Coordinate>} */
  var points = [];

  // Get the points from the input path
  path.forEachSegment(function(type, segments) {
    for (var i = 0; i < segments.length; i += 2) {
      if (segments[i]) {
        points.push(new goog.math.Coordinate(segments[i], segments[i + 1]));
      }
    }
  });

  return this.convertPoints(points);
};

/**
 * An implementation of the Liang-Barsky Line-clipping algorithm. Given 4 points
 * to represent 1 line, the algorithm will return another 4 points that is the
 * clipped line. A point that is entered and a valid point will not be edited.
 *
 * http://www.skytopia.com/project/articles/compsci/clipping.html
 *
 * @private
 * @param {number} x0src x coordinate of first point.
 * @param {number} y0src y coordinate of first point.
 * @param {number} x1src x coordinate of second point.
 * @param {number} y1src y coordinate of second point.
 * @return {Array.<number>} The clipped path.
 */
scottlogic.chart.rendering.Context.prototype.clip_ = function(x0src, y0src,
    x1src, y1src) {
  /** @type {number} */
  var edgeLeft = this.plotArea.left;

  /** @type {number} */
  var edgeRight = this.plotArea.left + this.plotArea.width;

  /** @type {number} */
  var edgeBottom = this.plotArea.top + this.plotArea.height;

  /** @type {number} */
  var edgeTop = this.plotArea.top;

  /** @type {number} */
  var t0 = 0.0;

  /** @type {number} */
  var t1 = 1.0;

  /** @type {number} */
  var xdelta = x1src - x0src;

  /** @type {number} */
  var ydelta = y1src - y0src;

  /** @type {number} */
  var p;

  /** @type {number} */
  var q;

  /** @type {number} */
  var r;

  // Clip the line on each edge
  for (var edge = 0; edge < 4; edge++) {
    if (edge === 0) {
      p = -xdelta;
      q = -(edgeLeft - x0src);
    }
    if (edge === 1) {
      p = xdelta;
      q = (edgeRight - x0src);
    }
    if (edge === 2) {
      p = ydelta;
      q = (edgeBottom - y0src);
    }
    if (edge === 3) {
      p = -ydelta;
      q = -(edgeTop - y0src);
    }
    r = q / p;
    if (p === 0 && q < 0) {
      break;
    }
    // Question if the line is parallel
    if (p < 0) {
      if (r > t1) {
        break;
      } else if (r > t0) {
        t0 = r;
      }
    } else if (p > 0) {
      if (r < t0) {
        break;
      } // Don't draw line at all.
      else if (r < t1) {
        t1 = r;
      } // Line is clipped!
    }
  }
  // Calculate the final positions
  /** @type {number} */
  var x0clip = x0src + t0 * xdelta;

  /** @type {number} */
  var y0clip = y0src + t0 * ydelta;

  /** @type {number} */
  var x1clip = x0src + t1 * xdelta;

  /** @type {number} */
  var y1clip = y0src + t1 * ydelta;

  // Return the array of the final positions
  return [x0clip, y0clip, x1clip, y1clip];
};
