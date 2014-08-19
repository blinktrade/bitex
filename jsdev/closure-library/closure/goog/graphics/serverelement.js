/**
 * @fileoverview Objects representing shapes drawn using a server
 * @author shall@scottlogic.co.uk (Steven Hall)
 *
 */

goog.provide('goog.graphics.ServerEllipseElement');
goog.provide('goog.graphics.ServerGroupElement');
goog.provide('goog.graphics.ServerImageElement');
goog.provide('goog.graphics.ServerPathElement');
goog.provide('goog.graphics.ServerRectElement');
goog.provide('goog.graphics.ServerTextElement');


goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.graphics.EllipseElement');
goog.require('goog.graphics.GroupElement');
goog.require('goog.graphics.ImageElement');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.PathElement');
goog.require('goog.graphics.RectElement');
goog.require('goog.graphics.TextElement');


/**
 * Object representing a group of objects on a server
 * This is an implementation of the goog.graphics.GroupElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {goog.graphics.ServerGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {goog.graphics.GroupElement}
 */
goog.graphics.ServerGroupElement = function(graphics) {
  goog.graphics.GroupElement.call(this, null, graphics);


  /**
   * Children contained by this group.
   * @type {Array.<goog.graphics.Element>}
   * @private
   */
  this.children_ = [];
};
goog.inherits(goog.graphics.ServerGroupElement, goog.graphics.GroupElement);


/**
 * Remove all drawing elements from the group.
 */
goog.graphics.ServerGroupElement.prototype.clear = function() {
  if (this.children_.length) {
    this.children_.length = 0;
    this.getGraphics().redraw();
  }
};


/**
 * Set the size of the group element.
 * @param {number|string} width The width of the group element.
 * @param {number|string} height The height of the group element.
 */
goog.graphics.ServerGroupElement.prototype.setSize = function(width, height) {
  // Do nothing.
};


/**
 * Append a child to the group.  Does not draw it
 * @param {goog.graphics.Element} element The child to append.
 */
goog.graphics.ServerGroupElement.prototype.appendChild = function(element) {
  this.children_.push(element);
};


/**
 * Draw the group.
 * @param {ServerRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerGroupElement.prototype.draw = function(ctx) {
  for (var i = 0, len = this.children_.length; i < len; i++) {
    this.getGraphics().drawElement(this.children_[i]);
  }
};


/**
 * Thin wrapper for canvas ellipse elements.
 * This is an implementation of the goog.graphics.EllipseElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.ServerGraphics} graphics  The graphics creating
 *     this element.
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.EllipseElement}
 */
goog.graphics.ServerEllipseElement = function(element, graphics,
    cx, cy, rx, ry, stroke, fill) {
  goog.graphics.EllipseElement.call(this, element, graphics, stroke, fill);

  /**
   * X coordinate of the ellipse center.
   * @type {number}
   * @private
   */
  this.cx_ = cx;


  /**
   * Y coordinate of the ellipse center.
   * @type {number}
   * @private
   */
  this.cy_ = cy;


  /**
   * Radius length for the x-axis.
   * @type {number}
   * @private
   */
  this.rx_ = rx;


  /**
   * Radius length for the y-axis.
   * @type {number}
   * @private
   */
  this.ry_ = ry;


  /**
   * Internal path approximating an ellipse.
   * @type {goog.graphics.Path}
   * @private
   */
  this.path_ = new goog.graphics.Path();
  this.setUpPath_();

  /**
   * Internal path element that actually does the drawing.
   * @type {goog.graphics.ServerPathElement}
   * @private
   */
  this.pathElement_ = new goog.graphics.ServerPathElement(null, graphics,
      this.path_, stroke, fill);
};
goog.inherits(goog.graphics.ServerEllipseElement, goog.graphics.EllipseElement);


/**
 * Sets up the path.
 * @private
 */
goog.graphics.ServerEllipseElement.prototype.setUpPath_ = function() {
  this.path_.clear();
  this.path_.arc(this.cx_, this.cy_, this.rx_, this.ry_, 0, 360, false);
  this.path_.close();
};


/**
 * Update the center point of the ellipse.
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 */
goog.graphics.ServerEllipseElement.prototype.setCenter = function(cx, cy) {
  this.cx_ = cx;
  this.cy_ = cy;
  this.setUpPath_();
  this.pathElement_.setPath(/** @type {!goog.graphics.Path} */ (this.path_));
};


/**
 * Update the radius of the ellipse.
 * @param {number} rx Center X coordinate.
 * @param {number} ry Center Y coordinate.
 */
goog.graphics.ServerEllipseElement.prototype.setRadius = function(rx, ry) {
  this.rx_ = rx;
  this.ry_ = ry;
  this.setUpPath_();
  this.pathElement_.setPath(/** @type {!goog.graphics.Path} */ (this.path_));
};


/**
 * Draw the ellipse.  Should be treated as package scope.
 * @param {ServerRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerEllipseElement.prototype.draw = function(ctx) {
  this.pathElement_.draw(ctx);
};


/**
 * Thin wrapper for canvas rectangle elements.
 * This is an implementation of the goog.graphics.RectElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.ServerGraphics} graphics The graphics creating
 *     this element.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} w Width of rectangle.
 * @param {number} h Height of rectangle.
 * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.RectElement}
 */
goog.graphics.ServerRectElement = function(element, graphics, x, y, w, h,
    stroke, fill) {
  goog.graphics.RectElement.call(this, element, graphics, stroke, fill);

  /**
   * X coordinate of the top left corner.
   * @type {number}
   * @private
   */
  this.x_ = x;


  /**
   * Y coordinate of the top left corner.
   * @type {number}
   * @private
   */
  this.y_ = y;


  /**
   * Width of the rectangle.
   * @type {number}
   * @private
   */
  this.w_ = w;


  /**
   * Height of the rectangle.
   * @type {number}
   * @private
   */
  this.h_ = h;
};
goog.inherits(goog.graphics.ServerRectElement, goog.graphics.RectElement);


/**
 * Update the position of the rectangle.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 */
goog.graphics.ServerRectElement.prototype.setPosition = function(x, y) {
  this.x_ = x;
  this.y_ = y;
  if (this.drawn_) {
    this.getGraphics().redraw();
  }
};


/**
 * Whether the rectangle has been drawn yet.
 * @type {boolean}
 * @private
 */
goog.graphics.ServerRectElement.prototype.drawn_ = false;


/**
 * Update the size of the rectangle.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 */
goog.graphics.ServerRectElement.prototype.setSize = function(width, height) {
  this.w_ = width;
  this.h_ = height;
  if (this.drawn_) {
    this.getGraphics().redraw();
  }
};


/**
 * Draw the rectangle.  Should be treated as package scope.
 * @param {ServerRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerRectElement.prototype.draw = function(ctx) {
  this.drawn_ = true;
  ctx.beginPath();
  ctx.moveTo(this.x_, this.y_);
  ctx.lineTo(this.x_, this.y_ + this.h_);
  ctx.lineTo(this.x_ + this.w_, this.y_ + this.h_);
  ctx.lineTo(this.x_ + this.w_, this.y_);
  ctx.closePath();
};


/**
 * Thin wrapper for canvas path elements.
 * This is an implementation of the goog.graphics.PathElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.ServerGraphics} graphics The graphics creating
 *     this element.
 * @param {!goog.graphics.Path} path The path object to draw.
 * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.PathElement}
 */
goog.graphics.ServerPathElement = function(element, graphics, path, stroke,
    fill) {
  goog.graphics.PathElement.call(this, element, graphics, stroke, fill);

  this.setPath(path);
};
goog.inherits(goog.graphics.ServerPathElement, goog.graphics.PathElement);


/**
 * Whether the shape has been drawn yet.
 * @type {boolean}
 * @private
 */
goog.graphics.ServerPathElement.prototype.drawn_ = false;


/**
 * The path to draw.
 * @type {goog.graphics.Path}
 * @private
 */
goog.graphics.ServerPathElement.prototype.path_;


/**
 * Update the underlying path.
 * @param {!goog.graphics.Path} path The path object to draw.
 */
goog.graphics.ServerPathElement.prototype.setPath = function(path) {
  this.path_ = path.isSimple() ? path :
      goog.graphics.Path.createSimplifiedPath(path);
  if (this.drawn_) {
    this.getGraphics().redraw();
  }
};


/**
 * Draw the path.  Should be treated as package scope.
 * @param {ServerRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerPathElement.prototype.draw = function(ctx) {
  this.drawn_ = true;


  ctx.beginPath();
  this.path_.forEachSegment(function(segment, args) {
    switch (segment) {
      case goog.graphics.Path.Segment.MOVETO:
        ctx.moveTo(args[0], args[1]);
        break;
      case goog.graphics.Path.Segment.LINETO:
        for (var i = 0; i < args.length; i += 2) {
          ctx.lineTo(args[i], args[i + 1]);
        }
        break;
      case goog.graphics.Path.Segment.CURVETO:
        for (var i = 0; i < args.length; i += 6) {
          ctx.bezierCurveTo(args[i], args[i + 1], args[i + 2],
              args[i + 3], args[i + 4], args[i + 5]);
        }
        break;
      case goog.graphics.Path.Segment.ARCTO:
        throw Error('Server paths cannot contain arcs');
      case goog.graphics.Path.Segment.CLOSE:
        ctx.closePath();
        break;
    }
  });
};


/**
 * Thin wrapper for canvas text elements.
 * This is an implementation of the goog.graphics.TextElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {!goog.graphics.ServerGraphics} graphics The graphics creating
 *     this element.
 * @param {string} text The text to draw.
 * @param {number} x1 X coordinate of start of line.
 * @param {number} y1 Y coordinate of start of line.
 * @param {number} x2 X coordinate of end of line.
 * @param {number} y2 Y coordinate of end of line.
 * @param {?string} align Horizontal alignment: left (default), center, right.
 * @param {!goog.graphics.Font} font Font describing the font properties.
 * @param {goog.graphics.Stroke} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill} fill The fill to use for this element.
 * @constructor
 * @extends {goog.graphics.TextElement}
 */
goog.graphics.ServerTextElement = function(graphics, text, x1, y1, x2, y2,
    align, font, stroke, fill) {
  goog.graphics.TextElement.call(this, null, graphics, stroke, fill);

  /**
   * The text to draw.
   * @type {string}
   * @private
   */
  this.text_ = text;

  /**
   * X coordinate of the start of the line the text is drawn on.
   * @type {number}
   * @private
   */
  this.x1_ = x1;

  /**
   * Y coordinate of the start of the line the text is drawn on.
   * @type {number}
   * @private
   */
  this.y1_ = y1;

  /**
   * X coordinate of the end of the line the text is drawn on.
   * @type {number}
   * @private
   */
  this.x2_ = x2;

  /**
   * Y coordinate of the end of the line the text is drawn on.
   * @type {number}
   * @private
   */
  this.y2_ = y2;

  /**
   * Horizontal alignment: left (default), center, right.
   * @type {string}
   * @private
   */
  this.align_ = align || 'left';

  /**
   * Font object describing the font properties.
   * @type {goog.graphics.Font}
   * @private
   */
  this.font_ = font;
};
goog.inherits(goog.graphics.ServerTextElement, goog.graphics.TextElement);


/**
 * Update the displayed text of the element.
 * @param {string} text The text to draw.
 */
goog.graphics.ServerTextElement.prototype.setText = function(text) {
  this.text_ = text;
};

/**
 * Draw the text.  Should be treated as package scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerTextElement.prototype.draw = function(ctx) {
  ctx.drawText(this.text_, this.x1_, this.y1_, this.x2_, this.y2_,
      this.align_, this.font_.family, this.font_.size, this.stroke_.getColor());
};


/**
 * Thin wrapper for canvas image elements.
 * This is an implementation of the goog.graphics.ImageElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.ServerGraphics} graphics The graphics creating
 *     this element.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} w Width of rectangle.
 * @param {number} h Height of rectangle.
 * @param {string} src Source of the image.
 * @constructor
 * @extends {goog.graphics.ImageElement}
 */
goog.graphics.ServerImageElement = function(element, graphics, x, y, w, h,
    src) {
  goog.graphics.ImageElement.call(this, element, graphics);

  /**
   * X coordinate of the top left corner.
   * @type {number}
   * @private
   */
  this.x_ = x;


  /**
   * Y coordinate of the top left corner.
   * @type {number}
   * @private
   */
  this.y_ = y;


  /**
   * Width of the rectangle.
   * @type {number}
   * @private
   */
  this.w_ = w;


  /**
   * Height of the rectangle.
   * @type {number}
   * @private
   */
  this.h_ = h;


  /**
   * URL of the image source.
   * @type {string}
   * @private
   */
  this.src_ = src;
};
goog.inherits(goog.graphics.ServerImageElement, goog.graphics.ImageElement);


/**
 * Whether the image has been drawn yet.
 * @type {boolean}
 * @private
 */
goog.graphics.ServerImageElement.prototype.drawn_ = false;


/**
 * Update the position of the image.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 */
goog.graphics.ServerImageElement.prototype.setPosition = function(x, y) {
  this.x_ = x;
  this.y_ = y;
  if (this.drawn_) {
    this.getGraphics().redraw();
  }
};


/**
 * Update the size of the image.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 */
goog.graphics.ServerImageElement.prototype.setSize = function(width, height) {
  this.w_ = width;
  this.h_ = height;
  if (this.drawn_) {
    this.getGraphics().redraw();
  }
};


/**
 * Update the source of the image.
 * @param {string} src Source of the image.
 */
goog.graphics.ServerImageElement.prototype.setSource = function(src) {
  this.src_ = src;
  if (this.drawn_) {
    // TODO(robbyw): Probably need to reload the image here.
    this.getGraphics().redraw();
  }
};


/**
 * Draw the image.  Should be treated as package scope.
 * @param {ServerRenderingContext2D} ctx The context to draw the element in.
 */
goog.graphics.ServerImageElement.prototype.draw = function(ctx) {
  if (this.img_) {
    if (this.w_ && this.h_) {
      // If the image is already loaded, draw it.
      ctx.drawImage(this.img_, this.x_, this.y_, this.w_, this.h_);
    }
    this.drawn_ = true;

  } else {
    // Otherwise, load it.
    var img = new Image();
    img.onload = goog.bind(this.handleImageLoad_, this, img);
    // TODO(robbyw): Handle image load errors.
    img.src = this.src_;
  }
};


/**
 * Handle an image load.
 * @param {Element} img The image element that finished loading.
 * @private
 */
goog.graphics.ServerImageElement.prototype.handleImageLoad_ = function(img) {
  this.img_ = img;

  // TODO(robbyw): Add a small delay to catch batched images
  this.getGraphics().redraw();
};
