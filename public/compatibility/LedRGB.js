/**
 * @class draw2d.shape.robotois.LedRGB
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.LedRGB({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.LedRGB = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.LedRGB',
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 70, height: 117 }, attr), setter, getter);
  },

  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="ledRGB-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="75" height="144" rx="5" />',
      '<circle id="ledRGB-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="59" cy="81" r="5.5" />',
      '<circle id="ledRGB-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="17" cy="81" r="5.5" />',
      '<rect id="ledRGB-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="20.5" y="109.5" width="35" height="39" />',
      '<circle id="ledRGB-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="59" cy="100" r="5.5" />',
      '<circle id="ledRGB-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="17" cy="100" r="5.5" />',
      '<circle id="ledRGB-oval" stroke="none" fill="rgb(238, 183, 189)" cx="25.5" cy="12.5" r="7.5" />',
      '<circle id="ledRGB-oval2" stroke="none" fill="rgb(248, 232, 28)" cx="37.5" cy="35.5" r="7.5" />',
      '<circle id="ledRGB-oval3" stroke="none" fill="rgb(180, 240, 167)" cx="17.5" cy="35.5" r="7.5" />',
      '<circle id="ledRGB-oval6" stroke="none" fill="rgb(149, 237, 249)" cx="59.5" cy="35.5" r="7.5" />',
      '<circle id="ledRGB-oval7" stroke="none" fill="rgb(68, 109, 246)" fill-opacity="0.65" cx="48.5" cy="12.5" r="7.5" />',
      '<circle id="ledRGB-oval8" stroke="none" fill="rgb(192, 237, 252)" cx="25.5" cy="56.5" r="7.5" />',
      '<circle id="ledRGB-oval9" stroke="none" fill="rgb(207, 18, 89)" fill-opacity="0.62" cx="48.5" cy="56.5" r="7.5" />',
      '</svg>',
    ].join('');
  },
});
