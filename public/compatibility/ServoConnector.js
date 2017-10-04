/**
 * @class draw2d.shape.robotois.ServoConnector
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.ServoConnector({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.ServoConnector = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.ServoConnector',
  /**
     * the input port type that is going to be added at the bottom
     */
  inputPortType: 'MInput',
  // custom locator for the special design of the ResistorBridge Input area
  ServoOutput: draw2d.layout.locator.PortLocator.extend({
    init() {
      this._super();
    },
    relocate(index, figure) {
      this.applyConsiderRotation(figure, 16 + (index * 16), 0);
    },
  }),
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 64, height: 102 }, attr), setter, getter);
    this.servoOutput = new this.ServoOutput();
    this.createPort('servoOutput', this.servoOutput, 'servoOutput2');
    this.createPort('servoOutput', this.servoOutput, 'servoOutput1');
    this.createPort('servoOutput', this.servoOutput, 'servoOutput0');
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas9-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="102" rx="5" />',
      '<circle id="canvas9-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<circle id="canvas9-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<rect id="canvas9-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="10.5" y="3.5" width="11" height="23" />',
      '<circle id="canvas9-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="16" cy="8" r="2.5" />',
      '<circle id="canvas9-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="16" cy="15" r="2.5" />',
      '<circle id="canvas9-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="16" cy="22" r="2.5" />',
      '<rect id="canvas9-rectangle3" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="26.5" y="3.5" width="11" height="23" />',
      '<circle id="canvas9-oval6" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="8" r="2.5" />',
      '<circle id="canvas9-oval7" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="15" r="2.5" />',
      '<circle id="canvas9-oval8" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="22" r="2.5" />',
      '<rect id="canvas9-rectangle4" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="42.5" y="3.5" width="11" height="23" />',
      '<circle id="canvas9-oval9" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="48" cy="8" r="2.5" />',
      '<circle id="canvas9-oval10" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="48" cy="15" r="2.5" />',
      '<circle id="canvas9-oval11" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="48" cy="22" r="2.5" />',
      '<rect id="canvas9-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="67.5" width="35" height="39" />',
      '<circle id="canvas9-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="57" r="5.5" />',
      '<circle id="canvas9-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="57" r="5.5" />',
      '</svg>',
    ].join('');
  },
});
