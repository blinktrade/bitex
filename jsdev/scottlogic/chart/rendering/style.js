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

goog.provide('scottlogic.chart.rendering.Style');

goog.require('goog.graphics.Font');
goog.require('goog.graphics.Stroke');

/**
 * The style object represents a style that can be passed to a graphical
 * component. The Chart will maintain a default style, and thus any user-defined
 * style would overwrite only those specified fields.
 *
 * The style objects operate on a heirarchy system, whereby each Style has a
 * parent Style which it pulls values from if it itself does not have a value.
 *
 * The root Style should be the chart, which should be the default. The user
 * then calls applyStyle on individual components to change that style. However,
 * styles are pulled from the parent style in the event that the field of a
 * current style is null.
 *
 * So if the Graphical Axis has a Stroke, but no Font, the Font will be taken
 * from the parent (the Chart) but the Stroke will remain.
 *
 * This works similar to an HTML document.
 *
 * @param {?scottlogic.chart.rendering.Style} parent The parent style of this
 *        style, or null if root style.
 * @param {?goog.graphics.Stroke} stroke The stroke of this style.
 * @param {?goog.graphics.Font} font The font of this style.
 * @param {?string} fontColour The font colour of this style.
 * @constructor
 */
scottlogic.chart.rendering.Style = function(parent, stroke, font, fontColour) {
  /**
   * The parent style of the style
   *
   * @type {?scottlogic.chart.rendering.Style}
   * @private
   */
  this.parent_ = parent;

  /**
   * The stroke of the style
   *
   * @type {?goog.graphics.Stroke}
   * @private
   */
  this.stroke_ = (!parent && !stroke) ? new goog.graphics.Stroke(1, '#000000') :
                     stroke;

  /**
   * The font of the style
   *
   * @type {?goog.graphics.Font}
   * @private
   */
  this.font_ = (!parent && !font) ? new goog.graphics.Font(13, 'Arial') : font;

  /**
   * The colour of the font
   *
   * @type {?string}
   * @private
   */
  this.fontColour_ = (!parent && !fontColour) ? '#000000' : fontColour;
};

/**
 * Returns the stroke of the style, that of the parent, or the default
 *
 * @return {goog.graphics.Stroke} The stroke of the style.
 */
scottlogic.chart.rendering.Style.prototype.getStroke = function() {
  if (this.stroke_) { return this.stroke_; }

  return this.parent_.getStroke();
};

/**
 * Sets the stroke of the style
 *
 * @param {!goog.graphics.Stroke} stroke The stroke to set.
 */
scottlogic.chart.rendering.Style.prototype.setStroke = function(stroke) {
  this.stroke_ = stroke;
};

/**
 * Returns the font of the style, that of the parent, or the default
 *
 * @return {goog.graphics.Font} The font of the style.
 */
scottlogic.chart.rendering.Style.prototype.getFont = function() {
  if (this.font_) { return this.font_; }

  return this.parent_.getFont();
};

/**
 * Sets the font of the style
 *
 * @param {!goog.graphics.Font} font The font to set.
 */
scottlogic.chart.rendering.Style.prototype.setFont = function(font) {
  this.font_ = font;
};

/**
 * Returns the colour of the font, that of the parent, or the default
 *
 * @return {string} The colour of the font.
 */
scottlogic.chart.rendering.Style.prototype.getFontColour = function() {
  if (this.fontColour_) { return this.fontColour_; }

  return this.parent_.getFontColour();
};

/**
 * Sets the font colour of the style
 *
 * @param {string} colour The colour of the font.
 */
scottlogic.chart.rendering.Style.prototype.setFontColour = function(colour) {
  this.fontColour_ = colour;
};

/**
 * Overwrites the current Style object with any values in the parameter. Values
 * that are not present are not overwritten. Intended for use with JSON Objects
 *
 * @param {scottlogic.chart.rendering.Style} object The object to overwrite
 *        with.
 */
scottlogic.chart.rendering.Style.prototype.merge = function(object) {
  this.stroke_ = object.stroke_ || this.getStroke();
  this.font_ = object.font_ || this.getFont();
  this.fontColour_ = object.fontColour_ || this.getFontColour();
};
