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

goog.provide('scottlogic.chart.rendering.Gridlines');

goog.require('goog.graphics');

/**
 * Represents the grid lines on the chart. This object is responsible for both
 * the grid lines and the zero grid line. It is only intelligent enough to draw
 * based on the position of the labels, rather than computing the points itself.
 *
 * The entire grid lines component is based on one path. The zero line is a
 * separate path.
 *
 * @param {scottlogic.chart.rendering.Style} style The parent style of the
 *        gridlines style.
 * @constructor
 */
scottlogic.chart.rendering.Gridlines = function(style) {

  /**
   * The style of the gridlines
   *
   * @const
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.style_ = new scottlogic.chart.rendering.Style(style, null, null, null);

  /**
   * The 'path' that is the collective grid lines component
   *
   * @private
   * @type {goog.graphics.Path}
   */
  this.path_ = new goog.graphics.Path();

  /**
   * The zero line path
   *
   * @private
   * @type {goog.graphics.Path}
   */
  this.zeroPath_ = new goog.graphics.Path();

  /**
   * Hold the style of the zero line
   *
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.zeroLineStyle_ = new scottlogic.chart.rendering.Style(style, null, null,
      null);
};

/**
 * Sets the stroke of the style
 *
 * @public
 * @export
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 */
scottlogic.chart.rendering.Gridlines.prototype.setGridlineStroke = function(
    stroke) {
  this.style_.setStroke(stroke);
};

/**
 * Sets the stroke of the style
 *
 * @public
 * @export
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 */
scottlogic.chart.rendering.Gridlines.prototype.setZeroLineStroke = function(
    stroke) {
  this.zeroLineStyle_.setStroke(stroke);
};

/**
 * Redraws the object
 *
 * @param {goog.math.Rect} rect the rectangle in which to draw the grid lines.
 * @param {scottlogic.chart.rendering.GraphicalAxis} xAxis
 *                                                          the x Axis to use.
 * @param {scottlogic.chart.rendering.GraphicalAxis} yAxis
 *                                                          the y Axis to use.
 * @public
 */
scottlogic.chart.rendering.Gridlines.prototype.redraw = function(
    rect, xAxis, yAxis) {
  
  /**
   * The rectangle in which to draw the lines
   *
   * @public
   * @type {goog.math.Rect}
   */
  this.rect = rect;

  /**
   * @private
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   */
  this.xAxis = xAxis;

  /**
   * @private
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   */
  this.yAxis = yAxis;

  this.path_.clear();
  this.zeroPath_.clear();

  // Add the x Axis grid lines to the path
  for (var i = 0; i < this.xAxis.labels.length; i++) {
	 this.path_.moveTo(this.xAxis.labels[i].center[0],
		     this.rect.top);
	 this.path_.lineTo(this.xAxis.labels[i].center[0],
		     this.rect.top + this.rect.height);
  }

  // Add the y Axis grid lines to the path, and check for the zero line
  for (var j = 0; j < this.yAxis.labels.length; j++) {
    if (!(this.yAxis.zeroLineLabel === this.yAxis.labels[j])) {
      this.path_.moveTo(this.rect.left, this.yAxis.labels[j].center[1]);
      this.path_.lineTo(this.rect.left + this.rect.width, this.yAxis.labels[j].center[1]);
    } else {
      this.zeroPath_.moveTo(this.rect.left,
        this.yAxis.zeroLineLabel.center[1]);
      this.zeroPath_.lineTo(this.rect.left + this.rect.width,
        this.yAxis.zeroLineLabel.center[1]);
    }
  }

  // Draw the paths
  this.gridlineGraphic_.setPath(this.path_);

  /* this will make sure the path is erased (any calls to an empty path being
   * drawn are ignored in the SVG) */
  if (this.zeroPath_.isEmpty()) {
    this.zeroPath_.moveTo(0, 0);
  }

  this.zeroLineGraphic_.setPath(this.zeroPath_);
};

/**
 * Adds graphics to the Gridlines object
 *
 * @param {goog.graphics.AbstractGraphics} graphics The graphics to draw the
 *        path upon.
 * @public
 */
scottlogic.chart.rendering.Gridlines.prototype.addGraphics = function(
		graphics) {
  /**
   * The graphical path of the gridlines
   *
   * @private
   * @type {goog.graphics.PathElement}
   */
  this.gridlineGraphic_ = graphics.drawPath(this.path_,
	    this.style_.getStroke(), null);

  /**
   * The graphical path of the zero line
   *
   * @private
   * @type {goog.graphics.PathElement}
   */
   this.zeroLineGraphic_ = graphics.drawPath(this.zeroPath_, this.zeroLineStyle_
     .getStroke(), null);
};

/**
 * Hides the Gridlines
 * @public
 */
scottlogic.chart.rendering.Gridlines.prototype.hide = function() {
  if (this.gridlineGraphic_) {
    this.gridlineGraphic_.setStroke(new goog.graphics.Stroke(0, '#000000'));
    this.zeroLineGraphic_.setStroke(new goog.graphics.Stroke(0, '#000000'));
  }
};

/**
 * Shows the Gridlines
 * @public
 */
scottlogic.chart.rendering.Gridlines.prototype.show = function() {
  if (this.gridlineGraphic_) {
    this.gridlineGraphic_.setStroke(this.style_.getStroke());
    this.zeroLineGraphic_.setStroke(this.zeroLineStyle_.getStroke());
  }
};
