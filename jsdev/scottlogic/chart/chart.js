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

goog.provide('scottlogic.chart.Chart');
goog.provide('scottlogic.chart.Chart.ChartClicked');
goog.provide('scottlogic.chart.Chart.Orientation');

goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.graphics');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.math.Rect');
goog.require('goog.math.Coordinate');
goog.require('scottlogic.chart.rendering.Context');
goog.require('scottlogic.chart.rendering.DiscontinuousDateTimeAxis');
goog.require('scottlogic.chart.rendering.Gridlines');
goog.require('scottlogic.chart.rendering.LineSeries');
goog.require('scottlogic.chart.rendering.NumericalAxis');
goog.require('scottlogic.chart.rendering.GraphicalAxis');
goog.require('scottlogic.chart.rendering.Style');

/**
 * The Chart object is the manager of the Chart, instantiating all components
 * and allowing the user the redraw, edit the components directly etc.
 *
 * @export
 * @extends {goog.events.EventTarget}
 * @param {string|Element} id Element ID or a DOM node.
 * @param {Array.<number>} size The size to draw.
 * @param {scottlogic.chart.rendering.AbstractAxis=} opt_xAxis the x data axis to use.
 * @param {scottlogic.chart.rendering.AbstractAxis=} opt_yAxis the y data axis to use.
 * @param {boolean=} opt_renderXAxis whether to render the x axis
 * @param {boolean=} opt_renderYAxis whether to render the y axis
 *
 * @constructor
 */
scottlogic.chart.Chart = function(id, size, opt_xAxis, opt_yAxis, opt_renderXAxis, opt_renderYAxis) {
  goog.events.EventTarget.call(this);
  /**
   * Has the Chart been initialized?
   *
   * @private
   * @type {boolean}
   */
  this.initialized_ = false;

  /**
   * Get the canvas element from the HTML file, given as a parameter.
   *
   * @private
   * @type {Element}
   */
  this.canvas_ = goog.dom.getElement(id);

  /**
   * Create the graphics to be manipulated
   *
   * @private
   * @type {goog.graphics.AbstractGraphics}
   */
  this.graphics_ = goog.graphics.createGraphics(size[0], size[1]);
  // ensure that we draw in the middle of pixels and not on boundaries 
  this.graphics_.getCanvasElement().setTransformation(0.5, 0.5, 0, 0, 0);

  /**
   * The style of the line series
   *
   * @const
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.style_ = new scottlogic.chart.rendering.Style(null, null, null, null);
  
  /**
   * The Data Axis of the Chart (X)
   *
   * @public
   * @type {scottlogic.chart.rendering.AbstractAxis} 
   */
  this.xAxisData = opt_xAxis ? opt_xAxis : 
      new scottlogic.chart.rendering.DiscontinuousDateTimeAxis();

  /**
   * The Data Axis of the Chart (Y)
   *
   * @public
   * @type {scottlogic.chart.rendering.AbstractAxis}
   */
  this.yAxisData = opt_yAxis ? opt_yAxis :
      new scottlogic.chart.rendering.NumericalAxis();

  /**
   * The array of Line Series that the chart contains
   *
   * @private
   * @type {Array.<scottlogic.chart.rendering.LineSeries>}
   */
  this.series_ = [];

  this.generateGraphicalAxis_(opt_renderXAxis, opt_renderYAxis);

  /**
   * Gridlines of the chart
   *
   * @public
   * @type {scottlogic.chart.rendering.Gridlines}
   */
  this.gridlines = new scottlogic.chart.rendering.Gridlines(this.style_);

};
goog.inherits(scottlogic.chart.Chart, goog.events.EventTarget);

/**
 * Returns the Data X Axis of the Chart.
 * @see abstractaxis.js
 * @public
 * @return {scottlogic.chart.rendering.AbstractAxis} the data x Axis.
 * @export
 */
scottlogic.chart.Chart.prototype.getXAxisData = function() {
  return this.xAxisData;
};

/**
 * Returns the Data Y Axis of the Chart.
 * @see abstractaxis.js
 * @public
 * @return {scottlogic.chart.rendering.AbstractAxis} the data y Axis.
 * @export
 */
scottlogic.chart.Chart.prototype.getYAxisData = function() {
  return this.yAxisData;
};

/**
 * Returns the Graphical X Axis of the Chart.
 * @see abstractaxis.js
 * @public
 * @return {scottlogic.chart.rendering.GraphicalAxis}
 *    the graphical x Axis.
 * @export
 */
scottlogic.chart.Chart.prototype.getXAxis = function() {
  return this.xAxis;
};

/**
 * Returns the Graphical Y Axis of the Chart.
 * @see graphicalaxis.js
 * @public
 * @return {scottlogic.chart.rendering.GraphicalAxis}
 *    the graphical y Axis.
 * @export
 */
scottlogic.chart.Chart.prototype.getYAxis = function() {
  return this.yAxis;
};

/**
 * Returns the Gridlines object of the Chart.
 * @public
 * @return {scottlogic.chart.rendering.Gridlines} the gridlines object.
 * @export
 */
scottlogic.chart.Chart.prototype.getGridlines = function() {
  return this.gridlines;
};

/**
 * Generates the graphical axis
 * @param {boolean=} opt_renderXAxis whether to render the x axis
 * @param {boolean=} opt_renderYAxis whether to render the y axis
 * @private
 */
scottlogic.chart.Chart.prototype.generateGraphicalAxis_ = function(opt_renderXAxis, opt_renderYAxis) {
	
	// render axis unless told not to. 
	
	opt_renderXAxis = opt_renderXAxis === undefined ? true : opt_renderXAxis;
	opt_renderYAxis = opt_renderYAxis === undefined ? true : opt_renderYAxis;
	
  /**
   * The X Axis of the Chart
   *
   * @private
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   */
	
  this.xAxis = new scottlogic.chart.rendering.GraphicalAxis(this.xAxisData, this.style_,
  		scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE, opt_renderXAxis);

  /**
   * The Y Axis of the Chart
   *
   * @private
   * @type {scottlogic.chart.rendering.GraphicalAxis}
   */
  
  this.yAxis = new scottlogic.chart.rendering.GraphicalAxis(this.yAxisData, this.style_,
  		scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE, opt_renderYAxis);
};

/**
 * Returns the Array of Line Series associated with the chart
 * @export
 * @return {Array.<scottlogic.chart.rendering.LineSeries>} all the series.
 * @public
 */
scottlogic.chart.Chart.prototype.getAllLineSeries = function() {
  return this.series_;
};

/**
 * Returns the number of line series on the chart
 * @export
 * @return {number} number of line series.
 * @public
 */
scottlogic.chart.Chart.prototype.getSeriesCount = function() {
  return this.series_.length;
};

/**
 * Initializes and redraws the Chart
 * @export
 * @public
 */
scottlogic.chart.Chart.prototype.redraw = function() {
  /* Only skip the boundary computation if the user has defined both a min
   * AND a max, and they do not equal one another */
  
  this.graphics_.suspend();
  /** @type {boolean} */
  var invalidX = this.xAxisData.equals(this.xAxisData.max, this.xAxisData.min);
  
  /** @type {boolean} */
  var invalidY = this.yAxisData.equals(this.yAxisData.min, this.yAxisData.max);
  
  if (!(this.xAxisData.userHasDefinedMin && this.xAxisData.userHasDefinedMax) ||
      invalidX) {

    /** @type {Array.<goog.date.UtcDateTime>} */
    var xbounds = this.getXBounds_();

    if (!this.xAxisData.userHasDefinedMin || invalidX) {
      this.xAxisData.setMinimum(xbounds[0]);
      this.xAxisData.userHasDefinedMin = false;
    }

    if (!this.xAxisData.userHasDefinedMax || invalidX) {
      this.xAxisData.setMaximum(xbounds[1]);
      this.xAxisData.userHasDefinedMax = false;
    }
  }

  if (!(this.yAxisData.userHasDefinedMin && this.yAxisData.userHasDefinedMax) ||
      invalidY) {

    /** @type {Array.<number>} */
    var ybounds = this.getYBounds_();

    if (!this.yAxisData.userHasDefinedMin || invalidY) {
      this.yAxisData.setMinimum(ybounds[0]);
      this.yAxisData.userHasDefinedMin = false;
    }

    if (!this.yAxisData.userHasDefinedMax || invalidY) {
      this.yAxisData.setMaximum(ybounds[1]);
      this.yAxisData.userHasDefinedMax = false;
    }
  }

  this.yAxisData.initialize();
  this.xAxisData.initialize();
 
  if (!this.initialized_) {
    // initialize_
    this.initialize_();
    this.initialized_ = true;
  }
 
  // Redraw 
  this.calculateBoundingBoxes_();
  this.context_.plotArea = this.plottingArea;
  
  this.yAxis.redraw(this.boundingboxY);
  this.xAxis.redraw(this.boundingboxX);
  this.gridlines.redraw(this.plottingArea, this.xAxis, this.yAxis);

  // Draw each Line Series onto the canvas.
  for (var i = 0; i < this.series_.length; i++) {
    this.series_[i].redraw(this.graphics_, this.xAxis, this.yAxis,
        this.context_);
  } 
  this.graphics_.resume();
};

/**
 * Applies the given style to this style
 *
 * @param {scottlogic.chart.rendering.Style} inputStyle The style object to
 *        merge with the Chart.
 * @export
 * @public
 */
scottlogic.chart.Chart.prototype.applyStyle = function(inputStyle) {
  // Protect against an incorrect parent being passed by the user
  this.style_.merge(new scottlogic.chart.rendering.Style(null, inputStyle
      .getStroke(), inputStyle.getFont(), inputStyle.getFontColour()));
};

/**
 * Calculate the bounding boxes and plotting area
 *
 * @private
 */
scottlogic.chart.Chart.prototype.calculateBoundingBoxes_ = function() {
 
  // Force an estimation (To avoid previous data of the chart influencing
  // padding values)
  this.xAxisData.intervalStep = null;
  this.yAxisData.intervalStep = null;

  /** @type {number}   */
  var xAxisHeight = Math.floor( 
      (this.xAxis.getLabelHeight() + this.xAxis.tickLength) * 1.05);

  /** @type {number}   */
  var yAxisWidth = Math.floor( 
      (this.yAxis.getLabelWidth() + this.yAxis.tickLength) * 1.1);

  /** @type {number}   */
  var yAxisVerticalMargin = Math.floor( 
      (this.yAxis.getLabelHeight() * 1.05) / 2);

  /** @type {number}   */
  var xAxisHorizontalMargin = Math.floor( 
      (this.xAxis.getLabelWidth() * 1.05) / 2);

 /** @type {goog.math.Coordinate} */
  var plottingOffset = new goog.math.Coordinate();
  
  /** @type {goog.math.Coordinate} */
  var boundingboxXoffset = new goog.math.Coordinate();
  
  /** @type {goog.math.Coordinate} */
  var boundingboxYoffset = new goog.math.Coordinate();
 
  /** @type {number} */
  var plottingAreaWidth = this.graphics_.getPixelSize().width - (2 * xAxisHorizontalMargin);
  if (this.yAxis.getAlignment() === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE
      || this.yAxis.getAlignment() === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE) {
    plottingAreaWidth -= yAxisWidth;
  }
  
  /** @type {number} */
  var plottingAreaHeight = this.graphics_.getPixelSize().height - (2 * yAxisVerticalMargin);
  if (this.xAxis.getAlignment() === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPOUTSIDE
      || this.xAxis.getAlignment() === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE) {
    plottingAreaHeight -= xAxisHeight;
  }
  
  switch (this.yAxis.getAlignment()) {
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE:
  		plottingOffset.x = xAxisHorizontalMargin;
  	  plottingOffset.y = yAxisVerticalMargin;
  	  boundingboxYoffset.x = plottingAreaWidth + xAxisHorizontalMargin;
  	  boundingboxXoffset.x = xAxisHorizontalMargin;
  	  break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE:
  		plottingOffset.x = yAxisWidth;
			plottingOffset.y = yAxisVerticalMargin;
			boundingboxYoffset.x = 0;
			boundingboxXoffset.x = yAxisWidth;
			break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTINSIDE:
  		plottingOffset.x = xAxisHorizontalMargin;
  	  plottingOffset.y = yAxisVerticalMargin;
  	  boundingboxYoffset.x = xAxisHorizontalMargin + plottingAreaWidth - yAxisWidth;
  	  boundingboxXoffset.x = xAxisHorizontalMargin;
  	  break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTINSIDE:
  		plottingOffset.x = xAxisHorizontalMargin;
		  plottingOffset.y = yAxisVerticalMargin;
		  boundingboxYoffset.x = xAxisHorizontalMargin;
		  boundingboxXoffset.x = xAxisHorizontalMargin;
		  break;
  }
  
  switch (this.xAxis.getAlignment()) {
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE:
	  	boundingboxXoffset.y = plottingAreaHeight + yAxisVerticalMargin;
		  boundingboxYoffset.y = yAxisVerticalMargin;
		  plottingOffset.y = yAxisVerticalMargin;
		  break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPOUTSIDE:
  		boundingboxXoffset.y = 0;
  	  boundingboxYoffset.y = xAxisHeight;
  	  plottingOffset.y = xAxisHeight;
  	  break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPINSIDE:
  		boundingboxXoffset.y = 0;
  	  boundingboxYoffset.y = 0;
  	  plottingOffset.y = 0;
  	  break;
  	case scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMINSIDE:
  		boundingboxXoffset.y = plottingAreaHeight - xAxisHeight + yAxisVerticalMargin;
  	  boundingboxYoffset.y = yAxisVerticalMargin;
  	  plottingOffset.y = yAxisVerticalMargin;
  	  break;
  }
  	
  /**
   * Store the plotting area in a Rectangle (Used for gridlines and context)
   *
   * @private
   * @type {goog.math.Rect}
   */
 
  this.plottingArea = new goog.math.Rect(plottingOffset.x, plottingOffset.y,
	      plottingAreaWidth,
	      plottingAreaHeight);

  /**
   * Bounding boxes are supplied by the Chart for the GraphicalAxis. These will
   * be computed automatically based on the padding values entered above.
   *
   * @private
   * @type {goog.math.Rect}
   */
  this.boundingboxY = new goog.math.Rect(boundingboxYoffset.x, boundingboxYoffset.y, 
		  yAxisWidth,
	      plottingAreaHeight);
  /**
  * @private
  * @type {goog.math.Rect}
  */ 
  this.boundingboxX = new goog.math.Rect(boundingboxXoffset.x,
		  boundingboxXoffset.y,
		  plottingAreaWidth,
		  xAxisHeight);
};


/**
 * initializes the chart
 *
 * @private
 */
scottlogic.chart.Chart.prototype.initialize_ = function() {
  /** @type {scottlogic.chart.Chart} */
  var that = this;

  // Render the graphics onto the canvas
 
  this.graphics_.render(this.canvas_);

  // Add graphics for to gridlines and axes. 
  this.gridlines.addGraphics(this.graphics_);
  this.xAxis.addGraphics(this.graphics_);
  this.yAxis.addGraphics(this.graphics_);
  
  /**
   * Defines the context in which lines can be drawn
   *
   * @private
   * @type {scottlogic.chart.rendering.Context}
   */
  this.context_ = new scottlogic.chart.rendering.Context(this.plottingArea);

  goog.events.listen(this.canvas_, 
        [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE],
        function(e) {
          e.preventDefault();

          /** @type {number} */
          var clientPos = e.type === goog.events.EventType.TOUCHMOVE ?
            e.getBrowserEvent().changedTouches[0].clientX : e.clientX;

          /** @type {number} */
          var relativeMousePosition = clientPos - goog.style.getClientPosition(e.currentTarget).x;

          that.updateTrackballs(/** @type {goog.date.UtcDateTime} */
              (that.xAxis.convertCanvasToData(relativeMousePosition)));

          that.dispatchEvent(new scottlogic.chart.TrackballChangeEvent(e));
        }, true);
};

/**
 * Updates the trackballs on all line series
 *
 * @param {goog.date.UtcDateTime} dataPoint
 *                          the data point to update the trackballs against.
 * @public
 */
scottlogic.chart.Chart.prototype.updateTrackballs = function(dataPoint) {
  // suspend the graphics whilst drawing takes place
  this.graphics_.suspend();

  for (var i = 0; i < this.series_.length; i++) {
    this.series_[i].updateTrackball(dataPoint);
  }
  
  this.graphics_.resume();
};

/**
 * Returns the minimum y value on the chart by analysing each line series
 *
 * @private
 * @return {Array.<number>} the y bounds.
 */
scottlogic.chart.Chart.prototype.getYBounds_ = function() {
  /** @type {*} */
  var min;

  /** @type {*} */
  var max;

  /** @type {*} */
  var currentMin;

  /** @type {*} */
  var currentMax;

  // for every line series
  for (var i = 0; i < this.series_.length; i++) {
    currentMin = this.series_[i].getMinimumY(
        this.xAxisData.min, this.xAxisData.max);
    currentMax = this.series_[i].getMaximumY(
        this.xAxisData.min, this.xAxisData.max);

    if (currentMin !== null &&
        (this.yAxisData.compare(currentMin, min) < 0 || min === undefined)) {
      min = currentMin;
    }

    if (currentMax !== null &&
        (this.yAxisData.compare(currentMax, max) > 0 || max === undefined)) {
      max = currentMax;
    }
  }

  // TODO(shall): Get the default values from the Data axis.
  return min === undefined || max === undefined || 
    this.yAxisData.equals(min, max) ? this.yAxisData.getDefaultBounds() :
      [this.yAxisData.padRight(min, min, max),
       this.yAxisData.padLeft(max, min, max)];
};

/**
 * Returns the computed minimum and maximum x bounds
 *
 * @private
 * @return {Array.<goog.date.UtcDateTime>} the x bounds.
 */
scottlogic.chart.Chart.prototype.getXBounds_ = function() {
  /** @type {*} */
  var min;

  /** @type {*} */
  var max;

  /** @type {*} */
  var currentMin;

  /** @type {*} */
  var currentMax;

  // for every line series
  for (var i = 0; i < this.series_.length; i++) {
    currentMin = this.series_[i].getMinimumX();
    currentMax = this.series_[i].getMaximumX();

    if (currentMin !== null &&
        (min === undefined || this.xAxisData.compare(currentMin, min) < 0)) {
      min = currentMin;
    }

    if (currentMax !== null &&
        (max === undefined || this.xAxisData.compare(currentMax, max) > 0)) {
      max = currentMax;
    }
  }

  // TODO(shall) : Get the default values from the Data axis.
  if (min === undefined || max === undefined || 
        this.xAxisData.equals(min, max)) {
    return this.xAxisData.getDefaultBounds();
  } else {
    return [min, max];
  }
};

/**
 * Removes all the Line Series' from the Chart
 *
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.removeAllLineSeries = function() {
  for (var i = 0; i < this.series_.length; i++) {
    this.series_[i].dispose();
  }
  this.series_.length = 0;
};

/**
 * Adds a Line Series to the Chart Will remove any previous Line Series with the
 * same ID (overwrite)
 *
 * @param {scottlogic.chart.rendering.LineSeries} lineSeriesIn The input values.
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.addLineSeries = function(lineSeriesIn) {
  // Add the Line Series to the inner reference
  this.removeLineSeriesById(lineSeriesIn.id);
  lineSeriesIn.setGraphicalAxisX(this.xAxis);
  lineSeriesIn.setGraphicalAxisY(this.yAxis);
  this.series_[this.series_.length] = lineSeriesIn;
};

/**
 * Removes a Line Series from the Chart, by its Index
 *
 * @param {number} indexToRemove The index of the Line Series to remove.
 * @return {scottlogic.chart.rendering.LineSeries} the removed line series.
 * @private
 */
scottlogic.chart.Chart.prototype.removeLineSeriesByIndex_ = function(
    indexToRemove) {
  // Destroy the first matched element
  this.series_[indexToRemove].dispose();
  return /** @type {scottlogic.chart.rendering.LineSeries} */ (goog.array.
      splice(this.series_, indexToRemove, 1)[0]);
};

/**
 * Removes a line series by its Id
 *
 * @param {string} idToRemove The line series to remove.
 * @return {scottlogic.chart.rendering.LineSeries} the removed line series.
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.removeLineSeriesById = function(idToRemove) {
  // Find the Line Series to remove
  for (var i = 0; i < this.series_.length; i++) {
    if (this.series_[i].id === idToRemove) {
      return this.removeLineSeriesByIndex_(i);
    }
  }
  return null;
};

/**
 * Returns a line series matching the given id
 *
 * @param {string} id the id to search for.
 * @return {scottlogic.chart.rendering.LineSeries} The matched line series.
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.getLineSeriesById = function(id) {
  for (var i = 0; i < this.series_.length; i++) {
    if (this.series_[i].id === id) { return this.getLineSeriesByIndex(i); }
  }
  return null;
};

/**
 * Returns the Line Series at the given index.
 * @param {number} index the index to get the line series of
 * @return {?scottlogic.chart.rendering.LineSeries} the matching line series.
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.getLineSeriesByIndex = function(index) {
  return this.series_[index];
};

/**
 * Removes a line series
 *
 * @param {scottlogic.chart.rendering.LineSeries} lineSeriesToRemove the line
 *        series to remove.
 * @return {scottlogic.chart.rendering.LineSeries} the removed line series.
 * @public
 * @export
 */
scottlogic.chart.Chart.prototype.removeLineSeries = function(
    lineSeriesToRemove) {
  // Find the Line Series to remove
  for (var i = 0; i < this.series_.length; i++) {
    if (this.series_[i] === lineSeriesToRemove) {
      return this.removeLineSeriesByIndex_(i);
    }
  }
  return null;
};

/**
 * Enumerated type to represent orientation.
 *
 * @enum {number}
 */
scottlogic.chart.Chart.Orientation = {
  X: 0,
  Y: 1
};

/** @enum {string} */
scottlogic.chart.Chart.EventType = {
  TRACKBALL_CHANGE : goog.events.getUniqueId('trackball_change')
};

/**
 * An event that represents a change to the trackballs.
 * This is generated through either a mousemove or a touchmove.
 * @constructor
 * @param {Event|goog.events.Event} e 
 *                  the Event that caused the trackball change
 * @extends {goog.events.Event}
 */
scottlogic.chart.TrackballChangeEvent = function(e) {
  goog.base(this, scottlogic.chart.Chart.EventType.TRACKBALL_CHANGE, e);
};
goog.inherits(scottlogic.chart.TrackballChangeEvent, goog.events.Event);