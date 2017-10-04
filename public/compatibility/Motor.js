/**
 * @class draw2d.shape.robotois.Motor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Motor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Motor = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Motor',
  inputPortType: 'motorInput',
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 40, height: 114 }, attr), setter, getter);
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<path id="canvas11-bezier6" stroke="rgb(243, 200, 130)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 32.19,97.21 L 32.19,80.19" />',
      '<path id="canvas11-bezier5" stroke="rgb(243, 236, 136)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 27.4,97.21 L 27.4,80.19" />',
      '<path id="canvas11-bezier4" stroke="rgb(225, 222, 253)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 21.61,97.21 L 21.61,80.19" />',
      '<path id="canvas11-bezier3" stroke="rgb(180, 240, 167)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 17.27,97.21 L 17.27,80.19" />',
      '<path id="canvas11-bezier2" stroke="rgb(238, 183, 189)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 11.49,97.21 L 11.49,80.19" />',
      '<path id="canvas11-bezier" stroke="rgb(74, 74, 74)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 6.7,97.21 L 6.7,80.19" />',
      '<rect id="canvas11-rectangle4" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="15" y="0" width="10" height="31" rx="4" />',
      '<rect id="canvas11-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="27" width="39px" height="53px" rx="8" />',
      '<rect id="canvas11-rectangle2" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(117, 132, 141)" x="2" y="34" width="35" height="3" />',
      '<rect id="canvas11-rectangle3" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="3.5" y="97.5" width="32" height="16" />',
      '<circle id="canvas11-oval8" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="7" cy="110" r="1.5" />',
      '<circle id="canvas11-oval10" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="12" cy="110" r="1.5" />',
      '<circle id="canvas11-oval11" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="110" r="1.5" />',
      '<circle id="canvas11-oval12" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="17" cy="110" r="1.5" />',
      '<circle id="canvas11-oval13" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="22" cy="110" r="1.5" />',
      '<circle id="canvas11-oval14" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="27" cy="110" r="1.5" />',
      '</svg>',
    ].join('');
  },
});
