/**
 * @class draw2d.shape.robotois.Relay
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Relay({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Relay = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Relay',
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
      '<rect id="relevador-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="75" height="144" rx="5" />',
      '<circle id="relevador-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="40" r="5.5" />',
      '<circle id="relevador-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="9" cy="40" r="5.5" />',
      '<rect id="relevador-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="20.5" y="109.5" width="35" height="39" />',
      '<circle id="relevador-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="92" r="5.5" />',
      '<circle id="relevador-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="9" cy="92" r="5.5" />',
      '<rect id="relevador-rectangle2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(180, 240, 167)" x="18.5" y="3.5" width="40" height="16" rx="1" />',
      '<rect id="relevador-rectangle3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(68, 109, 246)" fill-opacity="0.65" x="18.5" y="30.5" width="38" height="60" />',
      '<circle id="relevador-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="24.5" cy="11.5" r="4" />',
      '<circle id="relevador-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="38.5" cy="11.5" r="4" />',
      '<circle id="relevador-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="52.5" cy="11.5" r="4" />',
      '</svg>',
    ].join('');
  },
});
