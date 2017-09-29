/**
 * @class draw2d.shape.robotois.Servo
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Servo({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Servo = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Servo',
  inputPortType: 'servoInput',
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 75, height: 105 }, attr), setter, getter);
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<path id="canvas12-bezier4" stroke="rgb(180, 240, 167)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 40.93,71.99 C 40.93,74.61 37.76,83.51 37.76,83.51" />',
      '<path id="canvas12-bezier3" stroke="rgb(238, 183, 189)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 37.76,71.46 C 36.71,76.18 40.93,83.51 40.93,83.51" />',
      '<path id="canvas12-bezier2" stroke="rgb(74, 74, 74)" stroke-width="3" stroke-miterlimit="10" fill="none" d="M 37.76,71.46 C 33.54,76.18 33.54,83.51 33.54,83.51" />',
      '<rect id="canvas12-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(117, 132, 141)" x="24" y="0" width="27px" height="72px" rx="5" />',
      '<circle id="canvas12-oval" stroke="none" fill="rgb(255, 255, 255)" cx="37.5" cy="2.5" r="1.5" />',
      '<circle id="canvas12-oval2" stroke="none" fill="rgb(255, 255, 255)" cx="37.5" cy="69.5" r="1.5" />',
      '<path id="canvas12-bezier" stroke="rgb(155, 155, 155)" stroke-width="1" stroke-miterlimit="10" fill="rgb(241, 245, 247)" d="M 71.18,48.67 C 72.85,48.81 74.25,49.98 74.78,51.5 74.92,52.04 75,52.61 75,53.2 75,53.9 74.89,54.58 74.68,55.22 74.1,56.61 72.76,57.65 71.2,57.78 71.2,57.78 48.27,59.68 37.5,59.68 26.73,59.68 3.79,57.78 3.79,57.78 2.24,57.65 0.9,56.61 0.32,55.23 0.11,54.59 0,53.9 0,53.2 0,52.61 0.08,52.04 0.22,51.5 0.75,49.98 2.15,48.81 3.79,48.67 3.79,48.67 26.8,46.6 37.5,46.6 48.2,46.6 71.21,48.67 71.21,48.67 L 71.18,48.67 Z M 71.18,48.67" />',
      '<rect id="canvas12-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="27.5" y="83.5" width="21" height="21" />',
      '<circle id="canvas12-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="31" cy="88" r="2.5" />',
      '<circle id="canvas12-oval4" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="38" cy="88" r="2.5" />',
      '<circle id="canvas12-oval5" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="45" cy="88" r="2.5" />',
      '<circle id="canvas12-oval6" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="37" cy="53" r="3" />',
      '<circle id="canvas12-oval7" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="30.5" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval8" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="26" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval9" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="49.5" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval10" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="44" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval11" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="54" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval12" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="60" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval13" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval14" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="70" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval15" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="5" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval16" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="10" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval17" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="15" cy="53.5" r="1.5" />',
      '<circle id="canvas12-oval18" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="21" cy="53.5" r="1.5" />',
      '</svg>',
    ].join('');
  },
});
