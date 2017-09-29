/**
 * @class draw2d.shape.robotois.AnalogConnector
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.AnalogConnector({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.robotois.AnalogConnector = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.AnalogConnector',
  // custom locator for the special design of the ResistorBridge Input area
  AnalogOutput: draw2d.layout.locator.PortLocator.extend({
    init() {
      this._super();
    },
    relocate(index, figure) {
      this.applyConsiderRotation(figure, 8 + (index * 16), 0);
    },
  }),
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 64, height: 102 }, attr), setter, getter);
    this.analogOutput = new this.AnalogOutput();
    this.createPort('analogOutput', this.analogOutput, 'analogOutput3');
    this.createPort('analogOutput', this.analogOutput, 'analogOutput2');
    this.createPort('analogOutput', this.analogOutput, 'analogOutput1');
    this.createPort('analogOutput', this.analogOutput, 'analogOutput0');
  },

  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas4-rectangle" stroke="rgb(151, 151, 151)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="102" rx="5" />',
      '<circle id="canvas4-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<circle id="canvas4-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<rect id="canvas4-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="2.5" y="2.5" width="11" height="23" />',
      '<circle id="canvas4-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="8" cy="7" r="2.5" />',
      '<circle id="canvas4-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="8" cy="14" r="2.5" />',
      '<circle id="canvas4-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="8" cy="21" r="2.5" />',
      '<rect id="canvas4-rectangle3" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="18.5" y="2.5" width="11" height="23" />',
      '<circle id="canvas4-oval6" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="24" cy="7" r="2.5" />',
      '<circle id="canvas4-oval7" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="24" cy="14" r="2.5" />',
      '<circle id="canvas4-oval8" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="24" cy="21" r="2.5" />',
      '<rect id="canvas4-rectangle4" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="34.5" y="2.5" width="11" height="23" />',
      '<circle id="canvas4-oval9" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="40" cy="7" r="2.5" />',
      '<circle id="canvas4-oval10" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="40" cy="14" r="2.5" />',
      '<circle id="canvas4-oval11" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="40" cy="21" r="2.5" />',
      '<rect id="canvas4-rectangle5" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="50.5" y="2.5" width="11" height="23" />',
      '<circle id="canvas4-oval12" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="7" r="2.5" />',
      '<circle id="canvas4-oval13" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="14" r="2.5" />',
      '<circle id="canvas4-oval14" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="21" r="2.5" />',
      '<rect id="canvas4-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="67.5" width="35" height="39" />',
      '<circle id="canvas4-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="57" r="5.5" />',
      '<circle id="canvas4-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="57" r="5.5" />',
      '</svg>',
    ].join('');
  },
});
