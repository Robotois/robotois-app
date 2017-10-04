/**
 * @class draw2d.shape.robotois.MotorConnector
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.MotorConnector({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.robotois.MotorConnector = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.MotorConnector',
  /**
     * the input port type that is going to be added at the bottom
     */
  inputPortType: 'MInput',

  // custom locator for the special design of the ResistorBridge Input area
  MotorOutput: draw2d.layout.locator.PortLocator.extend({
    init() {
      this._super();
    },
    relocate(index, figure) {
      this.applyConsiderRotation(figure, 19 + (index * 35), 0);
    },
  }),
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 70, height: 117 }, attr), setter, getter);
    this.motorOutput = new this.MotorOutput();
    this.createPort('motorOutput', this.motorOutput, 'motorOutput1');
    this.createPort('motorOutput', this.motorOutput, 'motorOutput0');
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas10-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="4" width="70" height="117" rx="5" />',
      '<circle id="canvas10-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="42.5" r="5.5" />',
      '<circle id="canvas10-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="14" cy="42.5" r="5.5" />',
      '<rect id="canvas10-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="17.5" y="86.5" width="35" height="39" />',
      '<circle id="canvas10-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="79.5" r="5.5" />',
      '<circle id="canvas10-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="14" cy="79.5" r="5.5" />',
      '<rect id="canvas10-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="2.5" y="0" width="32" height="16" />',
      '<circle id="canvas10-oval9" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="6" cy="13" r="1.5" />',
      '<circle id="canvas10-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="13" r="1.5" />',
      '<circle id="canvas10-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="16" cy="13" r="1.5" />',
      '<circle id="canvas10-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="21" cy="13" r="1.5" />',
      '<circle id="canvas10-oval6" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="26" cy="13" r="1.5" />',
      '<circle id="canvas10-oval7" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="31" cy="13" r="1.5" />',
      '<rect id="canvas10-rectangle3" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="37.5" y="0" width="32" height="16" />',
      '<circle id="canvas10-oval8" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="41" cy="13" r="1.5" />',
      '<circle id="canvas10-oval10" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="46" cy="13" r="1.5" />',
      '<circle id="canvas10-oval11" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="51" cy="13" r="1.5" />',
      '<circle id="canvas10-oval12" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="56" cy="13" r="1.5" />',
      '<circle id="canvas10-oval13" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="61" cy="13" r="1.5" />',
      '<circle id="canvas10-oval14" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="66" cy="13" r="1.5" />',
      '<circle id="canvas10-oval17" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="5" cy="53" r="1.5" />',
      '<circle id="canvas10-oval18" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="10" cy="53" r="1.5" />',
      '<circle id="canvas10-oval19" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="5" cy="59" r="1.5" />',
      '<circle id="canvas10-oval20" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="10" cy="59" r="1.5" />',
      '<circle id="canvas10-oval21" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="5" cy="65" r="1.5" />',
      '<circle id="canvas10-oval22" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="10" cy="65" r="1.5" />',
      '<circle id="canvas10-oval23" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="47" r="1.5" />',
      '<circle id="canvas10-oval24" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="53" r="1.5" />',
      '<circle id="canvas10-oval25" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="59" r="1.5" />',
      '<circle id="canvas10-oval26" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="65" r="1.5" />',
      '<circle id="canvas10-oval27" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="71" r="1.5" />',
      '<circle id="canvas10-oval28" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="77" r="1.5" />',
      '<circle id="canvas10-oval29" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="60" cy="95" r="1.5" />',
      '<circle id="canvas10-oval30" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="65" cy="95" r="1.5" />',
      '</svg>',
    ].join('');
  },
});
