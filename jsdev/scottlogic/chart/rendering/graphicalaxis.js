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

goog.provide('scottlogic.chart.rendering.GraphicalAxis');

goog.require('goog.dom');
goog.require('goog.graphics');
goog.require('goog.math');
goog.require('scottlogic.chart.rendering.Label');

goog.require('goog.Disposable');

/**
 * A Graphical Axis that will render itself on the Chart
 *
 * @extends {goog.Disposable}
 * @param {scottlogic.chart.rendering.AbstractAxis} axis
 * 		the underlying axis data.
 * @param {scottlogic.chart.rendering.Style} style
 * 		the parent style of this style.
 * @param {!scottlogic.chart.rendering.GraphicalAxis.Alignment} alignment 
 * 		the alignment of the axis. 
 * @param {boolean} render
 * 		whether to render this axis. 
 * @constructor
 */
scottlogic.chart.rendering.GraphicalAxis = function(axis,
    style, alignment, render) {
	
	goog.Disposable.call(this);
	
	 /**
   * The alignment of the axis
   *
   * @protected
   * @type {!scottlogic.chart.rendering.GraphicalAxis.Alignment}
   */
  this.alignment = alignment;

  /**
   * The axis to draw / pull data from
   *
   * @public
   * @type {scottlogic.chart.rendering.AbstractAxis}
   */
  this.axis = axis;

  /**
   * Array storing the labels
   *
   * @public
   * @type {Array.<scottlogic.chart.rendering.Label>}
   */
  this.labels = [];
	
  //scottlogic.chart.rendering.AbstractGraphicalAxis.call(this,
  //    axis, style, alignment);
  /**
   * The style of the graphical axis
   *
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.style_ = new scottlogic.chart.rendering.Style(style, null, null, null);
  
  /**
   * The style of the label
   *
   * @private
   * @type {scottlogic.chart.rendering.Style}
   */
  this.labelStyle_ = new scottlogic.chart.rendering.Style(this.style_, null,
      null, null);

  /**
   * The length of the tick
   *
   * @public
   * @type {number}
   */
  if (render) {
  	this.tickLength = 7;
  } else {
  	this.tickLength = 0;
  }
  
  /**
   * Determines whether or not to render the Axis
   * @private
   * @type {boolean}
   */
  this.renderAxis_ = render;

  /**
   * Beginning co-ordinate.
   *
   * @private
   * @type {Array.<number>}
   */
  this.begin_ = [];

  /**
   * Ending co-ordinate.
   *
   * @private
   * @type {Array.<number>}
   */
  this.ending_ = [];

  /**
   * Hold the zero line label
   *
   * @public
   * @type {scottlogic.chart.rendering.Label}
   */
  this.zeroLineLabel = null;

  /**
   * Defined the size of a label. This is either the height or width, depending
   * on the axis
   *
   * @private
   * @type {number}
   */
  this.labelSize_ = 0;
  
  /**
   * The labels tick path
   *
   * @private
   * @type {goog.graphics.Path}
   */
  this.labelTicks_ = new goog.graphics.Path();

};
goog.inherits(
    scottlogic.chart.rendering.GraphicalAxis, goog.Disposable);

/**
 * Sets the alignment of the axis
 *
 * @param {!scottlogic.chart.rendering.GraphicalAxis.Alignment} alignment The alignment to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setAlignment =
    function(alignment) {
  this.alignment = alignment;
};

/**
 * Gets the alignment of the axis
 *
 * @return {!scottlogic.chart.rendering.GraphicalAxis.Alignment} alignment The alignment to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.getAlignment =
    function() {
  return this.alignment;
};

/**
 * Gets property specifying whether or not to render the Axis
 *
 * @return {boolean} renderAxis_ The render property
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.getRender =
    function() {
			return this.renderAxis_;
};

/**
 * Sets the stroke of the axis
 *
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setAxisStroke =
    function(stroke) {
  this.style_.setStroke(stroke);
};

/**
 * Sets the font of the label style
 *
 * @param {!goog.graphics.Font} font The font to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setLabelFont =
    function(font) {
  this.labelStyle_.setFont(font);
};

/**
 * Sets the font colour of the label style
 *
 * @param {string} fontColour The font colour to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setLabelFontColour =
    function(fontColour) {
  this.labelStyle_.setFontColour(fontColour);
};

/**
 * Sets the label stroke
 *
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setLabelStroke =
    function(stroke) {
  this.labelStyle_.setStroke(stroke);
};

/**
 * Sets property specifying whether or not to render the Axis
 *
 * @param {boolean} render The render to set.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.setRender =
		function(render) {
			this.renderAxis_ = render;
};

/**
 * Sets the graphics
 *
 * @param {goog.graphics.AbstractGraphics} graphics The graphics to use whilst
 *        rendering.
 * @export
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.addGraphics = function (graphics) {
	/**
	   * The graphics of the object
	   *
	   * @type {goog.graphics.AbstractGraphics}
	   * @private
	   */
	this.graphics = graphics;
	/**
	   * Height of the canvas
	   *
	   * @private
	   * @type {number}
	   */
	this.height = this.graphics.getPixelSize().height;
	
	 /**
	   * The drawn path for the label ticks
	   *
	   * @private
	   * @type {goog.graphics.PathElement}
	   */
	this.drawnLabelTicks_ = this.graphics.drawPath(this.labelTicks_,
	      this.style_.getStroke(), null);
	  
	/**
     * The path that represents the axis
     *
     * @private
     * @type {goog.graphics.Path}
     */
	this.path_ = new goog.graphics.Path();
	
	 /**
     * Create the drawn path to match the underlying path
     *
     * @private
     * @type {goog.graphics.PathElement}
     */
	 this.drawnPath_ = this.graphics.drawPath(this.path_,
	      this.style_.getStroke(), null);
};

/**
 * Redraw for axis
 * @param {goog.math.Rect} boundingBox the bounding box to use when drawing the
 *        axis.
 * @public
 * @export
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.redraw = function(
	    boundingBox) {
	  this.rebuild(boundingBox);
	  this.redrawInternal();
	};

/**
 * If the Graphical Axis has not been intialized, this function will initialize
 * it. Either way, rebuilds the Graphical Axis.
 *
 * @private
 * @param {goog.math.Rect} boundingBox the bounding box to use when drawing the
 *        axis.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.rebuild = function(
    boundingBox) {
 
  /**
   * The bounding box of the axis.
   *
   * @protected
   * @type {goog.math.Rect}
   */
  this.boundingBox = boundingBox;

  // Reassign the beginning and ending with new bounding box
  this.assignBeginAndEnd();

  /**
   * Store the normalized minimum value (used in conversion)
   *
   * @private
   * @type {number}
   */
  this.normalizedMin_ = this.axis.normalize(this.axis.min);

  /**
   * Store the normalized maximum value (used in conversion)
   *
   * @private
   * @type {number}
   */
  this.normalizedMax_ = this.axis.normalize(this.axis.max);

  this.rebuildInternal();
};

/**
 * Rebuild the labels for this axis.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.rebuildInternal =
    function() {
	// only do something if the axis is rendered
	if (!this.renderAxis_) return;
  // Reset the labels
  for (var i = 0; i < this.labels.length; i++) {
    this.labels[i].dispose();
  }

  // Clear the labels store
  this.labels.length = 0;
  this.zeroLineLabel = null;

  if (this.isXAxis()) {
    this.labelSize_ = this.getLabelWidth() * 1.1;
  } else if (this.isYAxis()) {
    this.labelSize_ = this.getLabelHeight() * 1.1;
  } else {
    throw 'INVALID_ORIENTATION ' + this.alignment;
  }

  // Set the interval on the axis
  this.axis.setIntervalStep(Math.floor(this.axisLength / this.labelSize_));

  /**
   * The rectangle in which to draw the label
   *
   * @type {goog.math.Rect}
   */
  var labelArea = null;

  // Start at the beginning of the axis, and finish at the end, letting the
  // axis handle incrementing

  /** @type {Array.<number>} */
  var labelValues = this.generateLabelValues_();

  for (var j = 0; j < labelValues.length; j++) {
    if (this.isXAxis()) {
      // Create the label area. Rectangle in which to draw the label
      
    	labelArea = new goog.math.Rect(
          this.convertNormalized(labelValues[j]) - (this.labelSize_ / 2),
          this.boundingBox.top,
          this.labelSize_,
          this.boundingBox.height);

      // Create a new label with the appropriate dimensions and add to the
      // array of Labels
      this.labels[j] = new scottlogic.chart.rendering.Label(this.axis
          .getLabel(labelValues[j]), labelArea,
          scottlogic.chart.Chart.Orientation.X, this.tickLength,
          this.labelStyle_, this.alignment);

      // Try to assign the zero line
      if (goog.math.nearlyEquals(Math.abs(labelValues[j]), Number(0),
          0.0000000000001)) {
        this.zeroLineLabel = this.labels[this.labels.length - 1];
      }
    } else if (this.isYAxis()) {
      // Create the label area. Rectangle in which to draw the label.
    	
	      if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE) {
		      labelArea = new goog.math.Rect(
		   		  	  this.boundingBox.left ,
		   	          this.convertNormalized(labelValues[j]) - (this.labelSize_ / 2),
		   	          this.boundingBox.width, this.labelSize_);
	      } 
	      
	      if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE) {
		      labelArea = new goog.math.Rect(
		          0,
		          this.convertNormalized(labelValues[j]) - (this.labelSize_ / 2),
		          this.boundingBox.width, this.labelSize_);
	      }
	      
	      if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTINSIDE) {
		      labelArea = new goog.math.Rect(
		          this.boundingBox.left,
		          this.convertNormalized(labelValues[j]) - (this.labelSize_ / 2),
		          this.boundingBox.width, this.labelSize_);
	      }
	      
	      if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTINSIDE) {
	    	  labelArea = new goog.math.Rect(
		   		  	  this.boundingBox.left,
		   	          this.convertNormalized(labelValues[j]) - (this.labelSize_ / 2),
		   	          this.boundingBox.width, this.labelSize_);
	      }

	      this.labels[j] = new scottlogic.chart.rendering.Label(this.axis
	          .getLabel(labelValues[j]), labelArea,
	          scottlogic.chart.Chart.Orientation.Y, this.tickLength,
	          this.labelStyle_, this.alignment);
	
	      // Try to assign the zero line
	      if (goog.math.nearlyEquals(Math.abs(labelValues[j]), Number(0),
	          0.0000000000001)) {
	        this.zeroLineLabel = this.labels[this.labels.length - 1];
	      }

    } else {
      throw 'INVALID_ORIENTATION ' + this.alignment;
    }
  }

  //
};

/**
 * Assigns the beginning and ending co-ordinates. Also assigns the axis length
 *
 * @protected
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.assignBeginAndEnd =
    function() {
  /**
   * Length of the axis in pixels
   *
   * @protected
   * @type {number}
   */
  this.axisLength = 0;

  // Assign the beginning and ending co-ordinates of the axis
 
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE) {
	  this.begin_ = [this.boundingBox.left, this.boundingBox.top];
	  this.ending_ = [(this.boundingBox.left + this.boundingBox.width),
	                  this.boundingBox.top];
	  this.axisLength = this.ending_[0] - this.begin_[0];
  } 
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPINSIDE) {
	  this.begin_ = [this.boundingBox.left, this.boundingBox.top];
	  this.ending_ = [(this.boundingBox.left + this.boundingBox.width),
	                  this.boundingBox.top];
	  this.axisLength = this.ending_[0] - this.begin_[0];
  } 
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPOUTSIDE) {
	  this.begin_ = [this.boundingBox.left, this.boundingBox.top + this.boundingBox.height];
	  this.ending_ = [(this.boundingBox.left + this.boundingBox.width),
	                  this.boundingBox.top + this.boundingBox.height];
	  this.axisLength = this.ending_[0] - this.begin_[0];
  }
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMINSIDE) {
	  this.begin_ = [this.boundingBox.left, this.boundingBox.top + this.boundingBox.height];
	  this.ending_ = [(this.boundingBox.left + this.boundingBox.width),
	                  this.boundingBox.top + this.boundingBox.height];
	  this.axisLength = this.ending_[0] - this.begin_[0];
  }
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE) {
    this.begin_ = [this.boundingBox.left,
		       	      this.boundingBox.top];
    this.ending_ = [this.boundingBox.left,
		       	      this.boundingBox.top + this.boundingBox.height];
    this.axisLength = this.ending_[1] - this.begin_[1];
  }
  
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE) {
	  this.begin_ = [this.boundingBox.left + this.boundingBox.width,
	       	      this.boundingBox.top];
	  this.ending_ = [this.boundingBox.left + this.boundingBox.width,
	       	      this.boundingBox.top + this.boundingBox.height];
	  this.axisLength = this.ending_[1] - this.begin_[1];
  }
  
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTINSIDE) {
	  this.begin_ = [this.boundingBox.left + this.boundingBox.width,
		       	      this.boundingBox.top];
		  this.ending_ = [this.boundingBox.left + this.boundingBox.width,
		       	      this.boundingBox.top + this.boundingBox.height];
		  this.axisLength = this.ending_[1] - this.begin_[1];
  }
  
  if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTINSIDE) {
	  this.begin_ = [this.boundingBox.left,
		       	      this.boundingBox.top];
	  this.ending_ = [this.boundingBox.left,
		       	      this.boundingBox.top + this.boundingBox.height];
	  this.axisLength = this.ending_[1] - this.begin_[1];
  }

};

/**
 * Performs just a redraw of the axis and of the labels. 
 * 
 */

scottlogic.chart.rendering.GraphicalAxis.prototype.redrawInternal = 
	function() {
		this.path_.clear();
		this.labelTicks_.clear();
		this.path_.moveTo(this.begin_[0], this.begin_[1]);
		// Draw just one line to the end of the path
		this.path_.lineTo(this.ending_[0], this.ending_[1]);
		this.drawnPath_.setPath(this.path_);
		
		// now draw the labels and ticks
		for (var k = 0; k < this.labels.length; k++) {
		    // Draw the label
		    this.labels[k].addGraphics(this.graphics);
		    var labelArea = this.labels[k].getLabelArea();
		    //draw tick for label
		   
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE) {
	    		this.labelTicks_.moveTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top);
	    		this.labelTicks_.lineTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + this.tickLength);
	    	}
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPINSIDE) {
	    		this.labelTicks_.moveTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top);
	    		this.labelTicks_.lineTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + this.tickLength);
	    	}
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPOUTSIDE) {
	    		this.labelTicks_.moveTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + labelArea.height);
	    		this.labelTicks_.lineTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + labelArea.height - this.tickLength);
	    	}
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMINSIDE) {
	    		this.labelTicks_.moveTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + labelArea.height);
	    		this.labelTicks_.lineTo(labelArea.left + (labelArea.width / 2),
	    				labelArea.top + labelArea.height - this.tickLength);
	    	}
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE) {
		      this.labelTicks_.moveTo(labelArea.left,
		        labelArea.top + (labelArea.height / 2));

		      this.labelTicks_.lineTo(
		        labelArea.left  + (this.tickLength),
		        labelArea.top + (labelArea.height / 2));
	    	} 
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTINSIDE) {
			      this.labelTicks_.moveTo(labelArea.left,
			        labelArea.top + (labelArea.height / 2));

			      this.labelTicks_.lineTo(
			        labelArea.left  + (this.tickLength),
			        labelArea.top + (labelArea.height / 2));
		    	} 
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE) {
	    	  this.labelTicks_.moveTo(labelArea.left + (labelArea.width),
	    	    labelArea.top + (labelArea.height / 2));
		
			  this.labelTicks_.lineTo(
			    (labelArea.left + labelArea.width) - (this.tickLength),
				 labelArea.top + (labelArea.height / 2));   
	    	}  
	    	if (this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTINSIDE) {
		    	  this.labelTicks_.moveTo(labelArea.left + (labelArea.width),
		    	    labelArea.top + (labelArea.height / 2));
			
				  this.labelTicks_.lineTo(
				    (labelArea.left + labelArea.width) - (this.tickLength),
					 labelArea.top + (labelArea.height / 2));   
		    }
	    	
		}
		
		this.drawnLabelTicks_.setPath(this.labelTicks_);
		
};

/**
 * Returns an array of the normalized values of each Label
 *
 * @return {Array.<number>} the array of normalized values for each label.
 * @private
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.
    generateLabelValues_ = function() {
  /** @type {Array.<number>} */
  var result = [];

  /**
     * The starting point for label creation (normalized)
     *
     * @type {number}
     */
  var labelStartingPoint = this.axis.getFirstLabelTick();

  /**
     * The ending point for label creation (normalized)
     *
     * @type {?number}
     */
  var labelEndingPoint = this.axis.normalize(this.axis.max);

  for (var i = labelStartingPoint; i <= labelEndingPoint; i = this.axis
        .increment(i)) {
    result[result.length] = i;
  }

  return result;
};

/**
 * Returns the pixel size of the label width.
 *
 * @public
 * @return {number} the width in pixels.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.getLabelWidth =
    function() {
			
			if (!this.renderAxis_) return 0;
			
		  /** @type {Array.<number>} */
		  var labelValues = [];
		
		  // Use the actual labels if initialized, otherwise, use the Axis to "guess"
		  // what the widest String may be
		  if (this.axis.intervalStep) {
		    labelValues = this.generateLabelValues_();
		  } else {
		    labelValues = [this.axis.estimateWidestLabel()];
		  }
		
		  /** @type {number} */
		  var maximum = this.graphics.getTextWidth(
		      this.axis.getLabel(labelValues[0]), this.labelStyle_.getFont());
		
		  for (var i = 1; i < labelValues.length; i++) {
		    /** @type {number} */
		    var current = this.graphics.getTextWidth(
		        this.axis.getLabel(labelValues[i]), this.labelStyle_.getFont());
		
		    if (current > maximum) {
		      maximum = current;
		    }
		  }
		
		  return maximum;
};

/**
 * Returns the pixel size of the label height
 *
 * @public
 * @return {number} the height in pixels.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.getLabelHeight =
	function() {
		if (this.renderAxis_) {
			return this.style_.getFont().size;
		} else {
			return 0;
		}
};

/**
 * Shows the Axis. Note this differs from the Axis being rendered, as when an
 * Axis is hidden, the underlying structure remains.
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.show = function() {
  if (this.drawnPath_) {
    this.drawnPath_.setStroke(this.style_.getStroke());
  }

  for (var i = 0; i < this.labels.length; i++) {
    this.labels[i].show();
  }
};

/**
 * Hides the Axis. Note this differs from the Axis being rendered, as when an
 * Axis is hidden, the underlying structure remains.
 * @public
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.hide = function() {
  if (this.drawnPath_) {
    this.drawnPath_.setStroke(new goog.graphics.Stroke(0, '#000000'));
  }

  for (var i = 0; i < this.labels.length; i++) {
    this.labels[i].hide();
  }
};

/**
 * @public
 * @export
 * @return {boolean} if the chart is an x axis
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.isXAxis =
    function() {
  return this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPOUTSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.TOPINSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMOUTSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.BOTTOMINSIDE;
};

/**
 * @public
 * @export
 * @return {boolean} if the chart is a y axis
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.isYAxis =
    function() {
  return this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTOUTSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.RIGHTINSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTOUTSIDE
	|| this.alignment === scottlogic.chart.rendering.GraphicalAxis.Alignment.LEFTINSIDE;
};

/**
 * Converts a canvas point into a data point
 *
 * @public
 * @param {number} input the canvas point to convert.
 * @return {*} the data object represented.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.convertCanvasToData =
    function(input) {
  /** @type {number} */
  var tempMax = this.normalizedMax_ - this.normalizedMin_;

  /** @type {number} */
  var relative;

  // Get the relative value
  if (this.isXAxis()) {
    relative = (input - this.boundingBox.left) / this.axisLength;
  } else if (this.isYAxis()) {
    relative = (this.height -
            (input +
            (this.height -
            (this.boundingBox.top + this.boundingBox.height)))) /
               this.axisLength;
  } else {
    throw 'INVALID_ORIENTATION ' + this.alignment;
  }

  if (relative < 0) {
    relative = 0;
  } else if (relative > 1) {
    relative = 1;
  }
  
  return this.axis.denormalize(this.normalizedMin_ + (relative * tempMax));
};

/**
 * Converts an array of data points into an array of canvas points
 *
 * Applies filtering, so only the values between the min and max plus a padding
 * value are normalized, the rest have their index filled as undefined
 * @param {Array.<number>} input the points to convert.
 * @return {Array.<number>} the converted points.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.convertArray =
    function(input) {
  /** @type {Array.<number>} */
  var result = [];

  /** @type {scottlogic.chart.rendering.GraphicalAxis} */
  var that = this;

  /** @type {number} */
  var minPos = Math.abs(goog.array.binarySearch(input, this.axis.min,
      function(a, b) {
        return that.axis.compare(a, b);
      }) + 1);

  // we need to go to the one before the min position
  minPos = minPos <= 0 ? 0 : minPos - 1;

  /** @type {number} */
  var maxPos = Math.abs(goog.array.binarySearch(
      input.slice(minPos, input.length),
      this.axis.max,
      function(a, b) {
        return that.axis.compare(a, b);
      }) + 1) + minPos;

  // we need to go to the one after the max position
  maxPos = maxPos >= input.length - 1 ? input.length - 1 : maxPos + 1;

  for (var i = minPos; i <= maxPos; i++) {
    /* this will fill the array in the correct places, leaving all other
     * values as undefined */
    result[i] = this.convert(input[i]);
  }

  return result;
};

/**
 * Converts a data point into a canvas point
 *
 * @public
 * @param {*} input the point to convert.
 * @return {number} the converted point.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.convert = function(
    input) {
  return this.convertNormalized(this.axis.normalize(input));
};

/**
 * Converts a normalized value into a relative one
 *
 * @public
 * @param {number} input the value to convert.
 * @return {number} the new co-ordinate.
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.convertNormalized =
    function(input) {
  /** @type {number} */
  var tempMax = this.normalizedMax_ - this.normalizedMin_;

  /** @type {number} */
  var tempVal = input - this.normalizedMin_;

  // finally get a value between 0 and 1 which is the relative position
  input = tempMax === 0 ? 0 : tempVal / tempMax;

  // Now convert relative position into a canvas point
  if (this.isXAxis()) {
    return Math.floor(
        (this.axisLength * input) + this.boundingBox.left);
  } else if (this.isYAxis()) {
    return Math
        .floor((this.height -
               (this.axisLength * input)) -
               (this.height -
               (this.boundingBox.top + this.boundingBox.height)));
  } else {
    // Throw an exception if an unrecognised orientation appears
    throw 'INVALID_ORIENTATION ' + this.alignment;
  }
};

/**
 * @override
 */
scottlogic.chart.rendering.GraphicalAxis.prototype.disposeInternal =
    function() {
  scottlogic.chart.rendering.GraphicalAxis.superClass_.disposeInternal
      .call(this);

  if (this.initialized) {
    this.path_.clear();
    this.graphics.removeElement(this.drawnPath_);
    for (var i = 0; i < this.labels.length; i++) {
      this.labels[i].dispose();
    }
  }
};

/**
 * Enumerated type to represent axis alignment.
 *
 * @enum {number}
 */
scottlogic.chart.rendering.GraphicalAxis.Alignment = {
  TOPOUTSIDE: 0,
  TOPINSIDE: 1,
  RIGHTOUTSIDE: 2,
  RIGHTINSIDE: 3,
  BOTTOMOUTSIDE: 4,
  BOTTOMINSIDE: 5,
  LEFTOUTSIDE: 6,
  LEFTINSIDE: 7
};
