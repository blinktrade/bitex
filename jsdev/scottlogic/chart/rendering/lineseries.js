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

goog.provide('scottlogic.chart.rendering.LineSeries');
goog.provide('scottlogic.chart.rendering.Trackball');

goog.require('goog.Disposable');
goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.events');
goog.require('goog.graphics');
goog.require('scottlogic.chart.rendering.Style');
goog.require('scottlogic.chart.rendering.lineoptimization');

/**
 * Represents a line series on the graph. A line series is responsible for
 * converting its points into canvas points and plotting itself on the chart.
 *
 * @param {string} id A unique ID for the line series.
 * @param {Array.<[*, *]>} input The array of input absolute coordinates.
 * @extends {goog.Disposable}
 * @constructor
 * @export
 */
scottlogic.chart.rendering.LineSeries = function(id, input) {
  goog.Disposable.call(this);
  /**
   * Has the Line Series been initialized?
   *
   * @private
   * @type {boolean}
   */
  this.initialized_ = false;

  /**
   * Stores whether or not to display the trackball
   *
   * @private
   * @type {boolean}
   */
  this.renderTrackball_ = true;

  /**
   * Stores whether the series is visible
   *
   * @private
   * @type {boolean}
   */
  this.isVisible_ = true;

  /**
   * Decides whether to render the additional points
   *
   * @type {boolean}
   * @private
   */
  this.renderMarkerPoints_ = false;

  /**
   * The style of the line series
   *
   * @const
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.style_ = new scottlogic.chart.rendering.Style(null, null, null, null);

  /**
   * A unique ID for the LineSeries, given as a parameter
   *
   * @public
   * @type {string}
   */
  this.id = id;

  /**
   * The points on the Line Series.
   *
   * @public
   * @type {Array.<[*, *]>}
   */
  this.points = input;

  /**
   * Current trackball point
   * @type {[*, *]}
   * @private
   */
  this.currentTrackballPoint_ = this.points[this.points.length - 1];

  /**
   * @private
   * @type {?[*, *]}
   */
  this.min_;

  /**
   * @private
   * @type {[*, *]}
   */
  this.max_;

  /**
   * @private
   * @type {[*, *]}
   */
  this.latest_ = this.points[this.points.length - 1];

  /**
   * Flag to say whether the line series is highlighted or not
   *
   * @private
   * @type {boolean}
   */
  this.highlighted_ = false;

  /**
   * Flag to say whether the line series is dimmed or not
   *
   * @private
   * @type {boolean}
   */
  this.dimmed_ = false;
};
// Extend the Disposable class
goog.inherits(scottlogic.chart.rendering.LineSeries, goog.Disposable);
// Export as the method is called from the HTML.

/**
 * Sets whether or not to render the trackball
 *
 * @param {boolean} input whether or not to render the trackball.
 * @public
 * @export
 */
scottlogic.chart.rendering.LineSeries.prototype.setTrackballRender = function(
    input) {
  if (input !== this.renderTrackball_) {
    this.renderTrackball_ = input;
    if (this.initialized_) {
      this.drawTrackball_();
    }
  }
};

/**
 * Sets the stroke of the style
 *
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 * @public
 * @export
 */
scottlogic.chart.rendering.LineSeries.prototype.setStroke = function(stroke) {
  this.style_.setStroke(stroke);
};

/**
 * Sets the X Axis on the Series
 * @param {scottlogic.chart.rendering.GraphicalAxis} axis
 *    the axis to set.
 */
scottlogic.chart.rendering.LineSeries.prototype.setGraphicalAxisX = function(
    axis) {
  /**
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   * @private
   */
  this.graphicalAxisX_ = axis;
};

/**
 * Sets the Y Axis on the Series
 * @param {scottlogic.chart.rendering.GraphicalAxis} axis
 *    the axis to set.
 */
scottlogic.chart.rendering.LineSeries.prototype.setGraphicalAxisY = function(
    axis) {
  /**
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   * @private
   */
  this.graphicalAxisY_ = axis;
};

/**
 * Sets whether or not to render the marker points
 *
 * @param {boolean} input whether or not to render the points.
 * @public
 * @export
 */
scottlogic.chart.rendering.LineSeries.prototype.setMarkerPointsRender =
    function(input) {
  if (input !== this.renderMarkerPoints_) {
    this.renderMarkerPoints_ = input;
    if (this.initialized_) {
      this.drawMarkerPoints_();
    }
  }
};

/**
 * Returns the minimum value of the x axis
 *
 * @return {*} the minimum value on the x axis.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getMinimumX = function() {
	if (this.isVisible() && this.points.length > 0) {
		return this.points[0][0];
	} else {
		return null;
	}
};

/**
 * Returns the maximum value of the x axis
 *
 * @return {*} the maximum value on the x axis.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getMaximumX = function() {
	if (this.isVisible() && this.points.length > 0) {
		return this.points[this.points.length -1][0];
	} else {
		return null;
	}
};

/**
 * Returns the minimum value of the y axis
 *
 * You can supply bounds to this function to retrieve the minimum and maximum
 * Y between 2 specific x values.
 *
 * @return {*} the minimum value on the y axis.
 * @param {*=} opt_lowerBounds a lower bound to use.
 * @param {*=} opt_upperBounds an upper bound to use.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getMinimumY = function(
    opt_lowerBounds, opt_upperBounds) {
  return this.isVisible() ?
      this.getYBounds_(opt_lowerBounds, opt_upperBounds)[0] : null;
};

/**
 * Returns the maximum value of the y axis
 *
 * You can supply bounds to this function to retrieve the minimum and maximum
 * Y between 2 specific dates.
 *
 * @return {*} the maximum value on the y axis.
 * @param {*=} opt_lowerBounds a lower bound to use.
 * @param {*=} opt_upperBounds an upper bound to use.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getMaximumY = function(
    opt_lowerBounds, opt_upperBounds) {
  return this.isVisible() ?
      this.getYBounds_(opt_lowerBounds, opt_upperBounds)[1] : null;
};

/**
 * Returns the minimum and maximum values on the Y Axis in the form
 * [min, max]
 *
 * @return {Array.<?*>} the min and max in form [min, max].
 * @param {*=} opt_lowerBounds a lower bound to use.
 * @param {*=} opt_upperBounds an upper bound to use.
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.getYBounds_ = function(
    opt_lowerBounds, opt_upperBounds) {
  /** @type {*} */
  var min;

  /** @type {*} */
  var max;

  /** @type {number} */
  var lower = opt_lowerBounds ? this.getNearestPoint_(opt_lowerBounds, 0,
      this.points) - 1 : 0;

  /** @type {number} */
  var upper = opt_upperBounds ? this.getNearestPoint_(opt_upperBounds, 0,
      this.points) : this.points.length - 1;

  // Go between the lower and upper bounds of the array and get the min and max
  for (var i = (lower <= 0 ? 0 : (lower - 1)); i <= upper; i++) {
    var current = this.points[i][1];

    /* We have to separate the min and max statements here, in case there is
     * only one value between the bounds (and it has to be set as both min and
     * max) */
    if (!min || this.graphicalAxisY_.axis.compare(current, min) < 0) {
      min = current;
    }

    if (!max || this.graphicalAxisY_.axis.compare(current, max) > 0) {
      max = current;
    }
  }

  return [min, max];
};

/**
 * Redraws the Line Series (Will initialize if it has not already been
 * initialized)
 *
 * @param {goog.graphics.AbstractGraphics} graphics the graphics to draw on.
 * @param {scottlogic.chart.rendering.GraphicalAxis} graphicalAxisX
 *                                                    the X Axis to draw using.
 * @param {scottlogic.chart.rendering.GraphicalAxis} graphicalAxisY
 *                                                    the Y Axis to draw using.
 * @param {scottlogic.chart.rendering.Context} context the context to use when
 *        drawing.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.redraw = function(graphics,
    graphicalAxisX, graphicalAxisY, context) {
  if (!this.initialized_) {
    this.initialize_(graphics, graphicalAxisX, graphicalAxisY, context);
    this.initialized_ = true;
  }
  if (this.isVisible_ && this.points.length > 0) {
    this.drawTrackball_();

    // Clear the existing path
    this.path_.clear();

    /** @type {boolean} */
    var hasStarted = false;

    /** @type {Array.<goog.math.Coordinate>} */
    var convertedPoints = [];

    /** @type {Array.<*>} */
    var x = [];

    for (var i = 0, l = this.points.length; i < l; i++) {
      if(!this.min_) {
        this.min_ = this.points[i];
      }

      if(!this.max_) {
        this.max_ = this.points[i];
      }

      if (this.graphicalAxisY_.axis.compare(
            this.points[i][1], this.min_[1]) < 0) {
        this.min_ = this.points[i];
      } else if (this.graphicalAxisY_.axis.compare(
              this.points[i][1], this.max_[1]) > 0) {
        this.max_ = this.points[i];
      }

      x[i] = this.points[i][0];
    }

    x = this.graphicalAxisX_.convertArray(x);

    for (var i = 0; i < x.length; i++) {
      if (x[i]) {
        convertedPoints[convertedPoints.length] = new goog.math.Coordinate(
            x[i], this.graphicalAxisY_.convert(this.points[i][1]));
      }
    }

    this.path_ = this.context_.convertPoints(convertedPoints);

    this.drawnPath_.setPath(this.path_);
    this.drawMarkerPoints_();
  }
};

/**
 * Shows the Line Series
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.show_ = function() {
  this.drawnPath_.setPath(this.path_);
  this.latestPointTrackball_.show();
  this.lowestPointTrackball_.show();
  this.highestPointTrackball_.show();
  this.trackball_.show();
};

/**
 * Hides the Line Series
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.hide_ = function() {
  var emptyPath = new goog.graphics.Path();
  emptyPath.moveTo(0, 0);

  this.drawnPath_.setPath(emptyPath);
  this.latestPointTrackball_.hide();
  this.lowestPointTrackball_.hide();
  this.highestPointTrackball_.hide();
  this.trackball_.hide();
};

/**
 * Returns whether the series is visible
 * @public
 * @export
 * @return {boolean} whether the line series is visible.
 */
scottlogic.chart.rendering.LineSeries.prototype.isVisible = function() {
  return this.isVisible_;
};

/**
 * Sets the visibility of the line series (done before a redraw, unlike hide)
 * @public
 * @param {boolean} vis whether the line series should be visible.
 * @export
 */
scottlogic.chart.rendering.LineSeries.prototype.setVisible = function(vis) {
  this.isVisible_ = vis;

  if (this.initialized_) {
    if (this.isVisible()) {
      this.show_();
    } else {
      this.hide_();
    }
  }
};

/**
 * Draws the marker points
 *
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.drawMarkerPoints_ = function() {
  if (this.renderMarkerPoints_) {
    this.lowestPointTrackball_.redraw(this.graphicalAxisX_
        .convert(this.min_[0]), this.graphicalAxisY_.convert(this.min_[1]));

    this.highestPointTrackball_.redraw(this.graphicalAxisX_
        .convert(this.max_[0]), this.graphicalAxisY_.convert(this.max_[1]));

    this.latestPointTrackball_.redraw(
        this.graphicalAxisX_.convert(this.latest_[0]),
        this.graphicalAxisY_.convert(this.latest_[1]));
  }
};

/**
 * Draws the trackball
 *
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.drawTrackball_ = function() {
  if (this.renderTrackball_) {
    this.trackball_.redraw(this.graphicalAxisX_
        .convert(this.currentTrackballPoint_[0]), this.graphicalAxisY_
        .convert(this.currentTrackballPoint_[1]));
  }
};

/**
 * Toggles the highlight of the line series
 * @export
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.toggleHighlight = function() {
  if (this.highlighted_) {
    this.highlighted_ = false;
    this.drawnPath_.setStroke(this.style_.getStroke());
    this.trackball_.ball_.setStroke(this.trackball_.style_.getStroke());
  } else {
    this.highlighted_ = true;
    this.drawnPath_.setStroke(this.highlightedStroke_);
    this.trackball_.ball_.setStroke(this.trackball_.highlightedStroke_);
  }
};

/**
 * Toggles the dim of the line series
 * @export
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.toggleDim = function() {
  if (this.dimmed_) {
    this.dimmed_ = false;
    this.drawnPath_.setStroke(this.style_.getStroke());
    this.trackball_.ball_.setStroke(this.trackball_.style_.getStroke());
  } else {
    this.dimmed_ = true;
    this.drawnPath_.setStroke(this.dimmedStroke_);
    this.trackball_.ball_.setStroke(this.trackball_.dimmedStroke_);
  }
};

/**
 * Initializes the Line Series
 *
 * @param {goog.graphics.AbstractGraphics} graphics The graphics to draw upon.
 * @param {scottlogic.chart.rendering.GraphicalAxis} graphicalAxisX
 *    the x axis to use when drawing.
 * @param {scottlogic.chart.rendering.GraphicalAxis} graphicalAxisY
 *    the y axis to use when drawing.
 * @param {scottlogic.chart.rendering.Context} context
 *                                                the context of the series.
 * @private
 */
scottlogic.chart.rendering.LineSeries.prototype.initialize_ = function(
    graphics, graphicalAxisX, graphicalAxisY, context) {
  /**
   * The context to associate with this line series
   * @private
   * @type {scottlogic.chart.rendering.Context}
   */
  this.context_ = context;

  /**
   * The underlying path, started at the first points
   *
   * @private
   * @type {goog.graphics.Path}
   */
  this.path_ = new goog.graphics.Path();

  /**
   * The graphics that the Line Series can draw upon
   *
   * @private
   * @type {goog.graphics.AbstractGraphics}
   */
  this.graphics_ = graphics;

  /**
   * The stroke when the line is highlighted
   *
   * @private
   * @type {goog.graphics.Stroke}
   */
  this.highlightedStroke_ = new goog.graphics.Stroke(this.style_.getStroke()
      .getWidth() * 3, this.style_.getStroke().getColor());

  /** @type {Array.<number>} */
  var lightenedCol = goog.color.lighten(goog.color.hexToRgb(this.style_
      .getStroke().getColor()), 0.5);

  /**
   * The stroke when the line is dimmer
   *
   * @private
   * @type {goog.graphics.Stroke}
   */
  this.dimmedStroke_ = new goog.graphics.Stroke(this.style_.getStroke()
      .getWidth(), goog.color.rgbToHex(lightenedCol[0], lightenedCol[1],
      lightenedCol[2]));

  /**
   * The LineElement to draw the path
   *
   * @private
   * @type {goog.graphics.PathElement}
   */
  this.drawnPath_ = graphics
      .drawPath(this.path_, this.style_.getStroke(), null);

  /**
   * The trackball associated with this line series
   *
   * @type {scottlogic.chart.rendering.Trackball}
   * @private
   */
  this.trackball_ = new scottlogic.chart.rendering.Trackball(graphics,
      this.style_);
  this.trackball_.setStroke(new goog.graphics.Stroke(2, this.style_.getStroke()
      .getColor()));

  /**
   * The trackball on the highest point
   *
   * @type {scottlogic.chart.rendering.Trackball}
   * @private
   */
  this.highestPointTrackball_ = new scottlogic.chart.rendering.Trackball(
      graphics, this.style_);
  this.highestPointTrackball_.setStroke(new goog.graphics.Stroke(1, '#007F00'));

  /**
   * The trackball on the lowest point
   *
   * @type {scottlogic.chart.rendering.Trackball}
   * @private
   */
  this.lowestPointTrackball_ = new scottlogic.chart.rendering.Trackball(
      graphics, this.style_);
  this.lowestPointTrackball_.setStroke(new goog.graphics.Stroke(1, '#FA0B0B'));

  /**
   * The trackball for the latest point
   *
   * @type {scottlogic.chart.rendering.Trackball}
   * @private
   */
  this.latestPointTrackball_ = new scottlogic.chart.rendering.Trackball(
      graphics, this.style_);
  this.latestPointTrackball_.setStroke(new goog.graphics.Stroke(1, '#0000FF'));
};

/**
 * Returns the current co-ordinate that the trackball lies on
 * @export
 * @public
 * @return {[*, *]}
 *                        The value of the current trackball point.
 */
scottlogic.chart.rendering.LineSeries.prototype.getCurrentTrackballPoint =
    function() {
  return this.currentTrackballPoint_;
};

/**
 * Updates the trackball (not part of redraw as considered a separate graphical
 * component)
 *
 * @param {*} dataPoint
 *                    the data point to update the trackball onto.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.updateTrackball = function(
    dataPoint) {
  if (this.renderTrackball_) {
    this.currentTrackballPoint_ = this.points[(this.getNearestPoint_(
        dataPoint, 0, this.points))];

    if (this.isVisible_) {
      this.drawTrackball_();
    }
  }
};

/**
 * Returns the point that is nearest the given date (forward looking)
 *
 * @param {*} dataPoint the point to search for.
 * @return {[*, *]}
 *                 the point the param is closest to.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getNearestX =
    function(dataPoint) {

  return this.points[this.getNearestPoint_(dataPoint, 0, this.points)];
};

/**
 * Returns the point that is nearest the given value (forward looking)
 *
 * @param {*} dataPoint the point to search for.
 * @return {[*, *]}
 *                   the point the param is closest to.
 * @public
 */
scottlogic.chart.rendering.LineSeries.prototype.getNearestY =
    function(dataPoint) {
  return this.points[this.getNearestPoint_(dataPoint, 1, this.points)];
};


/**
 * Gets the nearest point, given an axis and a data point
 *
 * @param {*} dataPoint the point to search for.
 * @param {number} val the value of the axis (0 for x axis search, 1 for y).
 * @param {Array.<[*, *]>} points
 *                                    the array of points to look in.
 * @return {number} the index of the nearest point.
 * @private
 * TODO: should go to nearest point, not next
 */
scottlogic.chart.rendering.LineSeries.prototype.getNearestPoint_ = function(
    dataPoint, val, points) {
  /** @type {number} */
  var index = val;

  /** @type {scottlogic.chart.rendering.LineSeries} */
  var that = this;

  /** @type {number} */
  var pos = Math.abs(goog.array.binarySearch(points, dataPoint,
      function(a, b) {
        return that.graphicalAxisX_.axis.compare(a, b[index]);
      }) + 1);

  // Perform some out-of-range checks.
  pos = pos >= points.length ? points.length - 1 : pos;

  // Check the previous point to get the closest point.
  if (pos > 0) {
    /** @type {number} */
    var normalizedPoint = that.graphicalAxisX_.axis.normalize(dataPoint);

    /** @type {number} */
    var differenceFromPrevious = normalizedPoint -
        that.graphicalAxisX_.axis.normalize(points[pos - 1][index]);

    /** @type {number} */
    var differenceToNext =
        that.graphicalAxisX_.axis.normalize(points[pos][index]) -
        normalizedPoint;

    if (differenceFromPrevious < differenceToNext) {
      pos = pos - 1;
    }
  }

  return pos;
};

/**
 * Removes the LineSeries from the graphics canvas
 *
 * @protected
 * @override
 */
scottlogic.chart.rendering.LineSeries.prototype.disposeInternal = function() {
  scottlogic.chart.rendering.LineSeries.superClass_.disposeInternal.call(this);

  if (this.initialized_) {
    // Clear the path
    this.path_.clear();
    // Update the drawn path so it is not shown
    this.graphics_.removeElement(this.drawnPath_);
    // Remove the trackball
    this.trackball_.dispose();
  }

};

/**
 * Represents a trackball on a line series
 *
 * @param {goog.graphics.AbstractGraphics} graphics the graphics to draw upon.
 * @param {scottlogic.chart.rendering.Style} style the style to draw using.
 * @extends {goog.Disposable}
 * @constructor
 */
scottlogic.chart.rendering.Trackball = function(graphics, style) {
  goog.Disposable.call(this);

  /**
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.style_ = new scottlogic.chart.rendering.Style(style, null, null, null);

  /**
   * @type {goog.graphics.Stroke}
   * @private
   */
  this.highlightedStroke_ = new goog.graphics.Stroke(this.style_.getStroke()
      .getWidth() * 3, this.style_.getStroke().getColor());

  /** @type {Array.<number>} */
  var lightenedCol = goog.color.lighten(goog.color.hexToRgb(this.style_
      .getStroke().getColor()), 0.5);

  /**
   * The stroke when the line is dimmer
   *
   * @private
   * @type {goog.graphics.Stroke}
   */
  this.dimmedStroke_ = new goog.graphics.Stroke(this.style_.getStroke()
      .getWidth(), goog.color.rgbToHex(lightenedCol[0], lightenedCol[1],
      lightenedCol[2]));

  /**
   * @type {goog.graphics.AbstractGraphics}
   * @private
   */
  this.graphics_ = graphics;

  /**
   * @type {boolean}
   * @private
   */
  this.initialized_ = false;

  /**
   * Whether the trackball is visible
   * @private
   * @type {boolean}
   */
  this.isVisible_ = true;
};
goog.inherits(scottlogic.chart.rendering.Trackball, goog.Disposable);

/**
 * sets the stroke of the trackball
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 * @public
 */
scottlogic.chart.rendering.Trackball.prototype.setStroke = function(stroke) {
  this.style_.setStroke(stroke);
};

/**
 * Hides the trackball
 *
 * @public
 */
scottlogic.chart.rendering.Trackball.prototype.hide = function() {
  if (this.isVisible_ && this.initialized_) {
    this.isVisible_ = false;
    this.ball_.setRadius(0, 0);
  }
};

/**
 * Shows the trackball
 *
 * @public
 */
scottlogic.chart.rendering.Trackball.prototype.show = function() {
  if (!this.isVisible_ && this.initialized_) {
    this.isVisible_ = true;
    this.ball_.setRadius(Number(this.style_.getStroke().getWidth()),
        Number(this.style_.getStroke().getWidth()));
  }
};

/**
 * Redraw the trackball.
 *
 * @param {number} x the x co-ordinate to draw the ball at.
 * @param {number} y the y co-ordinate to draw the ball at.
 * @public
 */
scottlogic.chart.rendering.Trackball.prototype.redraw = function(x, y) {
  if (!this.initialized_) {
    this.initialize_();
    this.initialized_ = true;
  }

  // set the center of the trackball
  this.ball_.setCenter(x, y);
};

/**
 * Initializes the Trackball
 *
 * @private
 */
scottlogic.chart.rendering.Trackball.prototype.initialize_ = function() {
  /**
   * @type {goog.graphics.Fill}
   * @private
   */
  this.fill_ = new goog.graphics.SolidFill(this.style_.getStroke().getColor());

  /**
   * Store the ellipse element that is the trackball
   *
   * @type {goog.graphics.EllipseElement}
   * @private
   */
  this.ball_ = this.graphics_.drawEllipse(-10,
      -10,
      Number(this.style_.getStroke().getWidth()),
      Number(this.style_.getStroke().getWidth()),
      this.style_.getStroke(),
      this.fill_);
};

/**
 * Disposes of the trackball
 *
 * @override
 * @protected
 */
scottlogic.chart.rendering.Trackball.prototype.disposeInternal = function() {
  if (this.initialized_) {
    this.ball_.setRadius(0, 0);
    this.graphics_.removeElement(this.ball_);
  }
};
