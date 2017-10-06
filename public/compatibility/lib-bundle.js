(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.AbstractComponent
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.AbstractComponent({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.robotois.AbstractComponent = draw2d.SVGFigure.extend({
  NAME: 'draw2d.shape.robotois.AbstractComponent',
  /**
     * the input port type that is going to be added at the bottom
     */
  inputPortType: 'input',
  // custom locator for the special design of the ResistorBridge Input area
  InputPortLocator: draw2d.layout.locator.PortLocator.extend({
    init() {
      this._super();
    },
    relocate(index, figure) {
      const p = figure.getParent();
      this.applyConsiderRotation(figure, p.getWidth() / 2, p.getHeight());
    },
  }),
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 64, height: 80 }, attr), setter, getter);
    if (!this.ignoreInputPort) {
      this.inputLocator = new this.InputPortLocator();
      this.createPort(this.inputPortType, this.inputLocator);
    }
    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    this.installEditPolicy(new draw2d.robotois.SelectionMenuPolicy());
  },
  /**
     * @method
     * Create a standard Port for this element. Inherited class can override this
     * method to create its own type of ports.
     *
     * @param {String} type the type of the requested port. possible ["input", "output"]
     * @param {draw2d.layout.locator.Locator} [locator] the layouter to use for this port
     * @template
     */
  createPort(type, locator, portName) {
    let newPort = null;
    let count = 0;

    switch (type) {
      case 'input':
        newPort = new draw2d.InputPort({
          bgColor: '#5764C6',
        });
        count = this.inputPorts.getSize();
        break;
      case 'output':
        newPort = new draw2d.OutputPort({
          bgColor: '#5764C6',
        });
        count = this.outputPorts.getSize();
        break;
      case 'hybrid':
        newPort = draw2d.Configuration.factory.createHybridPort(this);
        count = this.hybridPorts.getSize();
        break;
      case 'analogInput':
        newPort = new draw2d.robotois.AnalogInputPort({
          bgColor: '#FBB222',
        });
        count = this.inputPorts.getSize();
        break;
      case 'analogOutput':
        newPort = new draw2d.robotois.AnalogOutputPort({
          bgColor: '#FBB222',
        });
        count = this.outputPorts.getSize();
        break;
      case 'servoInput':
        newPort = new draw2d.robotois.AnalogInputPort({
          bgColor: '#1D7239',
        });
        count = this.inputPorts.getSize();
        break;
      case 'servoOutput':
        newPort = new draw2d.robotois.AnalogOutputPort({
          bgColor: '#1D7239',
        });
        count = this.outputPorts.getSize();
        break;
      case 'motorInput':
        newPort = new draw2d.robotois.AnalogInputPort({
          bgColor: '#25A2DC',
        });
        count = this.inputPorts.getSize();
        break;
      case 'motorOutput':
        newPort = new draw2d.robotois.AnalogOutputPort({
          bgColor: '#25A2DC',
        });
        count = this.outputPorts.getSize();
        break;
      case 'MInput':
        newPort = new draw2d.robotois.MotorInputPort();
        count = this.inputPorts.getSize();
        break;
      case 'MOutput':
        newPort = new draw2d.robotois.MotorOutputPort();
        count = this.outputPorts.getSize();
        break;
      default:
        throw new Error(`Unknown type [${type}] of port requested`);
    }
    // set port props
    newPort.setName(portName || type + count);
    newPort.setMaxFanOut(1);

    this.addPort(newPort, locator);
    // relayout the ports
    this.setDimension(this.width, this.height);
    return newPort;
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas1-rectangle" stroke="rgb(151, 151, 151)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<circle id="canvas1-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="36" r="5.5" />',
      '<circle id="canvas1-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="36" r="5.5" />',
      '<rect id="canvas1-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="45.5" width="35" height="39" />',
      '</svg>',
    ].join('');
  },
});

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/**
 * @class draw2d.robotois.AnalogInputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Armando Gonzalez
 * @manduks
 * @extend draw2d.InputPort
 */
draw2d.robotois.AnalogInputPort = draw2d.InputPort.extend({
  NAME: 'draw2d.robotois.AnalogInputPort',
});

},{}],4:[function(require,module,exports){
/**
 * @class draw2d.robotois.AnalogOutputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Armando Gonzalez
 * @manduks
 * @extend draw2d.OutputPort
 */
draw2d.robotois.AnalogOutputPort = draw2d.OutputPort.extend({
  NAME: 'draw2d.robotois.AnalogOutputPort',
});

},{}],5:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.AnalogSensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.AnalogSensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.robotois.AnalogSensor = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.AnalogSensor',
  /**
     * the input port type that is going to be added at the bottom
     */
  inputPortType: 'analogInput',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas1-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<rect id="canvas1-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="21.5" y="63.5" width="21" height="21" />',
      '<circle id="canvas1-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="25" cy="68" r="2.5" />',
      '<circle id="canvas1-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="68" r="2.5" />',
      '<circle id="canvas1-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="39" cy="68" r="2.5" />',
      '<circle id="canvas1-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<circle id="canvas1-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '</svg>',
    ].join('');
  },
});

},{}],6:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.Button
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Button({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Button = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Button',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas14-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64px" height="80px" rx="5" />',
      '<circle id="canvas14-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="36" r="5.5" />',
      '<circle id="canvas14-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="36" r="5.5" />',
      '<rect id="canvas14-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="45.5" width="35" height="39" />',
      '<rect id="canvas14-rectangle2" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(74, 74, 74)" x="18" y="3" width="28" height="28" rx="3" />',
      '<circle id="canvas14-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(74, 74, 74)" cx="32" cy="17" r="8" />',
      '</svg>',
    ].join('');
  },
});

},{}],7:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.DistanceSensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.DistanceSensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.DistanceSensor = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.DistanceSensor',
  /**
     * True if we need to ignore the port at the bottom
     */
  ignoreInputPort: true,
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 110, height: 53 }, attr), setter, getter);
    this.createPort('input');
    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas8-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="0" y="9" width="39" height="35" />',
      '<rect id="canvas8-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="5" y="0" width="110px" height="53px" rx="5" />',
      '<ellipse id="canvas8-oval" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="31" cy="27" rx="19" ry="20" />',
      '<ellipse id="canvas8-oval2" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="89" cy="27" rx="19" ry="20" />',
      '</svg>',
    ].join('');
  },
});

},{}],8:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.Lcd
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Lcd({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Lcd = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Lcd',
  /**
     * True if we need to ignore the port at the bottom
     */
  ignoreInputPort: true,
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 205, height: 71 }, attr), setter, getter);
    this.createPort('input');
    this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
  },
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas7-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="0" y="18" width="39" height="35" />',
      '<rect id="canvas7-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="5" y="0" width="200px" height="70px" rx="5" />',
      '<rect id="canvas7-rectangle2" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(149, 237, 249)" x="13" y="10" width="184" height="50" rx="0" />',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Medium, \'Operator Mono\', monospace" font-size="13" x="165" y="35"><tspan x="165" y="40">ABC</tspan></text>',
      '</svg>',
    ].join('');
  },
});

},{}],9:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.Led
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Led({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Led = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Led',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas1-rectangle" stroke="rgb(151, 151, 151)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<circle id="canvas1-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="36" r="5.5" />',
      '<circle id="canvas1-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="36" r="5.5" />',
      '<rect id="canvas1-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="45.5" width="35" height="39" />',
      '<circle id="canvas1-oval" stroke="none" fill="rgb(238, 183, 189)" cx="31.5" cy="12.5" r="7.5" />',
      '</svg>',
    ].join('');
  },
});

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.LightSensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.LightSensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.LightSensor = draw2d.shape.robotois.AnalogSensor.extend({
  NAME: 'draw2d.shape.robotois.LightSensor',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas2-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<rect id="canvas2-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="21.5" y="63.5" width="21" height="21" />',
      '<circle id="canvas2-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="25" cy="68" r="2.5" />',
      '<circle id="canvas2-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="68" r="2.5" />',
      '<circle id="canvas2-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="39" cy="68" r="2.5" />',
      '<circle id="canvas2-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<circle id="canvas2-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<rect id="canvas2-rectangle3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(254, 249, 188)" x="23.5" y="9" width="18" height="9" />',
      '<rect id="canvas2-rectangle4" stroke="none" fill="rgb(117, 132, 141)" x="30" y="10" width="5" height="7"/>',
      '</svg>',
    ].join('');
  },
});

},{}],12:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.Motion
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Motion({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.Motion = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Motion',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="sensorDeMovimiento-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="102" rx="5" />',
      '<rect id="sensorDeMovimiento-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="14.5" y="67.5" width="35" height="39" />',
      '<circle id="sensorDeMovimiento-oval15" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="55" cy="49" r="5.5" />',
      '<circle id="sensorDeMovimiento-oval16" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="9" cy="49" r="5.5" />',
      '<rect id="sensorDeMovimiento-rectangle2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(74, 74, 74)" x="21" y="36" width="23" height="12" />',
      '<circle id="sensorDeMovimiento-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="12" r="9.5" />',
      '</svg>',
    ].join('');
  },
});

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
/**
 * @class draw2d.robotois.MotorInputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Armando Gonzalez
 * @manduks
 * @extend draw2d.InputPort
 */
draw2d.robotois.MotorInputPort = draw2d.InputPort.extend({
  NAME: 'draw2d.robotois.MotorInputPort',
});

},{}],16:[function(require,module,exports){
/**
 * @class draw2d.robotois.MotorOutputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Armando Gonzalez
 * @manduks
 * @extend draw2d.OutputPort
 */
draw2d.robotois.MotorOutputPort = draw2d.OutputPort.extend({
  NAME: 'draw2d.robotois.MotorOutputPort'
});

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.RotarySensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.RotarySensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.RotarySensor = draw2d.shape.robotois.AnalogSensor.extend({
  NAME: 'draw2d.shape.robotois.RotarySensor',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas3-rectangle" stroke="rgb(151, 151, 151)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<rect id="canvas3-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="21.5" y="63.5" width="21" height="21" />',
      '<circle id="canvas3-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="25" cy="68" r="2.5" />',
      '<circle id="canvas3-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="68" r="2.5" />',
      '<circle id="canvas3-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="39" cy="68" r="2.5" />',
      '<circle id="canvas3-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<circle id="canvas3-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<rect id="canvas3-rectangle3" stroke="rgb(151, 151, 151)" stroke-width="1" stroke-miterlimit="10" fill="rgb(216, 216, 216)" x="20.5" y="8" width="24" height="29" />',
      '<circle id="canvas3-oval6" stroke="none" fill="rgb(74, 74, 74)" cx="33" cy="23" r="7.5" />',
      '<path id="canvas3-bezier" stroke="rgb(255, 255, 255)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" fill="none" d="M 32.5,16.5 L 32.5,23.5" />',
      '</svg>',
    ].join('');
  },
});

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.Shield
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.Shield({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.robotois.Shield = draw2d.shape.robotois.AbstractComponent.extend({
  NAME: 'draw2d.shape.robotois.Shield',
  /**
     * True if we need to ignore the port at the bottom
     */
  ignoreInputPort: true,

  // custom locator for the special design of the ResistorBridge Input area
  OutputPortLocator: draw2d.layout.locator.PortLocator.extend({
    init(config) {
      this._super();
      this.port = config.port;
    },
    relocate(index, figure) {
      let x = 0;
      let y = 0;
      switch (this.port) {
        case 1:
          x = 170;
          break;
        case 2:
          x = 130;
          break;
        case 3:
          x = 90;
          break;
        case 4:
          x = 35;
          break;
        case 5:
          y = 75;
          break;
        case 6:
          y = 116;
          break;
        case 'M1':
          x = 233;
          y = 75;
          break;
        case 'M2':
          x = 233;
          y = 116;
          break;
        default:
          break;

      }
      this.applyConsiderRotation(figure, x, y);
    },
  }),
  /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
  init(attr, setter, getter) {
    this._super($.extend({ width: 233, height: 156 }, attr), setter, getter);
    this.outputLocator = new this.OutputPortLocator({ port: 1 });

    this.createPort('output', this.outputLocator);
    this.createPort('output', new this.OutputPortLocator({ port: 2 }));
    this.createPort('output', new this.OutputPortLocator({ port: 3 }));
    this.createPort('output', new this.OutputPortLocator({ port: 4 }));
    this.createPort('output', new this.OutputPortLocator({ port: 5 }));
    this.createPort('output', new this.OutputPortLocator({ port: 6 }));
    this.createPort('MOutput', new this.OutputPortLocator({ port: 'M1' }));
    this.createPort('MOutput', new this.OutputPortLocator({ port: 'M2' }));
  },

  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas13-rectangle4" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="3.5" y="4.5" width="225px" height="150px" />',
      '<circle id="canvas13-oval91" stroke="rgb(225, 222, 253)" stroke-width="2" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="62.5" cy="17.5" r="5.5" />',
      '<circle id="canvas13-oval92" stroke="rgb(225, 222, 253)" stroke-width="2" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="113.5" cy="61.5" r="5.5" />',
      '<circle id="canvas13-oval93" stroke="rgb(225, 222, 253)" stroke-width="2" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="113.5" cy="98.5" r="5.5" />',
      '<circle id="canvas13-oval94" stroke="rgb(225, 222, 253)" stroke-width="2" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="62.5" cy="144.5" r="5.5" />',
      '<circle id="canvas13-oval95" stroke="rgb(225, 222, 253)" stroke-width="2" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="217" cy="17" r="5.5" />',
      '<rect id="canvas13-rectangle6" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="16" y="0" width="35" height="39" />',
      '<rect id="canvas13-rectangle9" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="72.5" y="0" width="35" height="39" />',
      '<rect id="canvas13-rectangle12" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="112.5" y="0" width="35" height="39" />',
      '<rect id="canvas13-rectangle15" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="152.5" y="0" width="35" height="39" />',
      '<rect id="canvas13-rectangle18" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="0" y="57.5" width="39" height="35" />',
      '<rect id="canvas13-rectangle21" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="0" y="99" width="39" height="35" />',
      '<rect id="canvas13-rectangle23" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="194" y="58" width="39" height="35" />',
      '<rect id="canvas13-rectangle25" stroke="rgb(87, 100, 198)" stroke-width="1" stroke-miterlimit="10" fill="rgb(225, 222, 253)" x="194" y="99" width="39" height="35" />',
      '<circle id="canvas13-oval96" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="80" cy="141" r="1.5" />',
      '<circle id="canvas13-oval97" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="85" cy="141" r="1.5" />',
      '<circle id="canvas13-oval98" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="90" cy="141" r="1.5" />',
      '<circle id="canvas13-oval99" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="95" cy="141" r="1.5" />',
      '<circle id="canvas13-oval100" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="100" cy="141" r="1.5" />',
      '<circle id="canvas13-oval101" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="105" cy="141" r="1.5" />',
      '<circle id="canvas13-oval102" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="110" cy="141" r="1.5" />',
      '<circle id="canvas13-oval103" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="115" cy="141" r="1.5" />',
      '<circle id="canvas13-oval104" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="120" cy="141" r="1.5" />',
      '<circle id="canvas13-oval105" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="125" cy="141" r="1.5" />',
      '<circle id="canvas13-oval106" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="130" cy="141" r="1.5" />',
      '<circle id="canvas13-oval107" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="135" cy="141" r="1.5" />',
      '<circle id="canvas13-oval108" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="140" cy="141" r="1.5" />',
      '<circle id="canvas13-oval109" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="145" cy="141" r="1.5" />',
      '<circle id="canvas13-oval110" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="150" cy="141" r="1.5" />',
      '<circle id="canvas13-oval111" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="155" cy="141" r="1.5" />',
      '<circle id="canvas13-oval112" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="160" cy="141" r="1.5" />',
      '<circle id="canvas13-oval113" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="165" cy="141" r="1.5" />',
      '<circle id="canvas13-oval114" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="170" cy="141" r="1.5" />',
      '<circle id="canvas13-oval115" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="175" cy="141" r="1.5" />',
      '<circle id="canvas13-oval116" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="80" cy="147" r="1.5" />',
      '<circle id="canvas13-oval117" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="85" cy="147" r="1.5" />',
      '<circle id="canvas13-oval118" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="90" cy="147" r="1.5" />',
      '<circle id="canvas13-oval119" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="95" cy="147" r="1.5" />',
      '<circle id="canvas13-oval120" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="100" cy="147" r="1.5" />',
      '<circle id="canvas13-oval121" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="105" cy="147" r="1.5" />',
      '<circle id="canvas13-oval122" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="110" cy="147" r="1.5" />',
      '<circle id="canvas13-oval123" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="115" cy="147" r="1.5" />',
      '<circle id="canvas13-oval124" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="120" cy="147" r="1.5" />',
      '<circle id="canvas13-oval125" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="125" cy="147" r="1.5" />',
      '<circle id="canvas13-oval126" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="130" cy="147" r="1.5" />',
      '<circle id="canvas13-oval127" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="135" cy="147" r="1.5" />',
      '<circle id="canvas13-oval128" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="140" cy="147" r="1.5" />',
      '<circle id="canvas13-oval129" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="145" cy="147" r="1.5" />',
      '<circle id="canvas13-oval130" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="150" cy="147" r="1.5" />',
      '<circle id="canvas13-oval131" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="155" cy="147" r="1.5" />',
      '<circle id="canvas13-oval132" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="160" cy="147" r="1.5" />',
      '<circle id="canvas13-oval133" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="165" cy="147" r="1.5" />',
      '<circle id="canvas13-oval134" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="170" cy="147" r="1.5" />',
      '<circle id="canvas13-oval135" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="175" cy="147" r="1.5" />',
      '<rect id="canvas13-rectangle28" stroke="rgb(241, 245, 247)" stroke-width="2" stroke-miterlimit="10" fill="rgb(74, 74, 74)" x="194" y="32" width="39" height="20" rx="6" />',
      '<text  fill="rgb(87, 100, 198)" font-family="BrandonGrotesque-Black, \'Brandon Grotesque\', sans-serif" font-weight="bold" font-size="13" x="87" y="52"><tspan x="87" y="75">ROBOTOIS</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="205" y="70"><tspan x="205" y="69">M1</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="205" y="111"><tspan x="205" y="110">M2</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="166" y="14"><tspan x="166" y="15">1</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="126" y="14"><tspan x="126" y="15">2</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="86" y="14"><tspan x="86" y="15">3</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="29" y="14"><tspan x="29" y="15">4</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="15" y="70"><tspan x="15" y="69">5</tspan></text>',
      '<text  fill="rgb(87, 100, 198)" font-family="OperatorMono-Book, \'Operator Mono\', monospace" font-size="14" x="15" y="111"><tspan x="15" y="110">6</tspan></text>',
      '</svg>',
    ].join('');
  },
});

},{}],22:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.SoundSensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.SoundSensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.SoundSensor = draw2d.shape.robotois.AnalogSensor.extend({
  NAME: 'draw2d.shape.robotois.SoundSensor',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="sensorDeSonido-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<rect id="sensorDeSonido-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="21.5" y="63.5" width="21" height="21" />',
      '<circle id="sensorDeSonido-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="25" cy="68" r="2.5" />',
      '<circle id="sensorDeSonido-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="68" r="2.5" />',
      '<circle id="sensorDeSonido-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="39" cy="68" r="2.5" />',
      '<circle id="sensorDeSonido-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<circle id="sensorDeSonido-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<circle id="sensorDeSonido-oval6" stroke="rgb(74, 74, 74)" stroke-width="1" stroke-miterlimit="10" fill="rgb(117, 132, 141)" cx="32" cy="12" r="10" />',
      '</svg>',
    ].join('');
  },
});

},{}],23:[function(require,module,exports){
/**
 * @class draw2d.shape.robotois.TemperatureSensor
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.robotois.TemperatureSensor({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */

draw2d.shape.robotois.TemperatureSensor = draw2d.shape.robotois.AnalogSensor.extend({
  NAME: 'draw2d.shape.robotois.TemperatureSensor',
  /**
     * @inheritdoc
     */
  getSVG() {
    return [
      '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">',
      '<rect id="canvas1-rectangle" stroke="rgb(117, 132, 141)" stroke-width="2" stroke-miterlimit="10" fill="rgb(241, 245, 247)" x="0" y="0" width="64" height="80" rx="5" />',
      '<rect id="canvas1-rectangle2" stroke="rgb(106, 230, 246)" stroke-width="1" stroke-miterlimit="10" fill="rgb(192, 245, 252)" x="21.5" y="63.5" width="21" height="21" />',
      '<circle id="canvas1-oval2" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="25" cy="68" r="2.5" />',
      '<circle id="canvas1-oval" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="32" cy="68" r="2.5" />',
      '<circle id="canvas1-oval3" stroke="rgb(117, 132, 141)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="39" cy="68" r="2.5" />',
      '<circle id="canvas1-oval4" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="11" cy="38" r="5.5" />',
      '<circle id="canvas1-oval5" stroke="rgb(225, 222, 253)" stroke-width="1" stroke-miterlimit="10" fill="rgb(255, 255, 255)" cx="53" cy="38" r="5.5" />',
      '<circle id="canvas6-oval6" stroke="none" fill="rgb(74, 74, 74)" cx="32" cy="17" r="7" />',
      '</svg>',
    ].join('');
  },
});

},{}],24:[function(require,module,exports){
// require('./lib/draw2d/dependencies/jquery-2.0.3.min');
// require('./lib/draw2d/dependencies/Class');
// require('./lib/draw2d/dependencies/raphael.min');
// require('./lib/draw2d/dependencies/json2');
// require('./lib/draw2d/dependencies/shifty');
// require('./lib/draw2d/draw2d');
require('./lib/draw2d/dependencies/canvg');
require('./lib/DragConnectionCreatePolicy');
require('./lib/SelectionMenuPolicy');

require('./AbstractComponent');
require('./AnalogConnector');
require('./AnalogInputPort');
require('./AnalogOutputPort');
require('./AnalogSensor');
require('./Button');
require('./DistanceSensor');
require('./Lcd');
require('./Led');
require('./LedRGB');
require('./LightSensor');
require('./Motion');
require('./Motor');
require('./MotorConnector');
require('./MotorInputPort');
require('./MotorOutputPort');
require('./Relay');
require('./RotarySensor');
require('./Servo');
require('./ServoConnector');
require('./Shield');
require('./SoundSensor');
require('./TemperatureSensor');

Robotois = {
  CANVAS: null,
  selectedFigure: null,
  dropCoordinates: {
    x: 100,
    y: 100,
  },
  canvasDOMRef: null,
};

addSelection = null;
currentSelection = null;

},{"./AbstractComponent":1,"./AnalogConnector":2,"./AnalogInputPort":3,"./AnalogOutputPort":4,"./AnalogSensor":5,"./Button":6,"./DistanceSensor":7,"./Lcd":8,"./Led":9,"./LedRGB":10,"./LightSensor":11,"./Motion":12,"./Motor":13,"./MotorConnector":14,"./MotorInputPort":15,"./MotorOutputPort":16,"./Relay":17,"./RotarySensor":18,"./Servo":19,"./ServoConnector":20,"./Shield":21,"./SoundSensor":22,"./TemperatureSensor":23,"./lib/DragConnectionCreatePolicy":25,"./lib/SelectionMenuPolicy":26,"./lib/draw2d/dependencies/canvg":27}],25:[function(require,module,exports){
/**
 * @class draw2d.robotois.DragConnectionCreatePolicy
 *
 * @extends draw2d.SVGFigure
 */
draw2d.robotois = {};
draw2d.shape.robotois = draw2d.shape.robotois || {};
draw2d.robotois.DragConnectionCreatePolicy =
  draw2d.policy.connection.DragConnectionCreatePolicy.extend({
    NAME: 'draw2d.robotois.DragConnectionCreatePolicy',
    createConnection() {
      const c = new draw2d.Connection({
        outlineColor: '#4A4A4A',
        outlineStroke: 1,
        color: '#5764C6',
        router: new draw2d.layout.connection.CircuitConnectionRouter(),
        stroke: 3,
        radius: 5,
      });
      const canvas = Robotois.CANVAS;
        // validate analog connections
      c.on('added', (connection) => {
        if (connection.sourcePort.name.indexOf('analog') !== -1) {
          if (connection.targetPort.name.indexOf('analog') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.targetPort.name.indexOf('analog') !== -1) {
          if (connection.sourcePort.name.indexOf('analog') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.sourcePort.name.indexOf('servo') !== -1) {
          if (connection.targetPort.name.indexOf('servo') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.targetPort.name.indexOf('servo') !== -1) {
          if (connection.sourcePort.name.indexOf('servo') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.sourcePort.name.indexOf('motor') !== -1) {
          if (connection.targetPort.name.indexOf('motor') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.targetPort.name.indexOf('motor') !== -1) {
          if (connection.sourcePort.name.indexOf('motor') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.sourcePort.name.indexOf('hybrid') !== -1) {
          if (connection.targetPort.name.indexOf('hybrid') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.targetPort.name.indexOf('hybrid') !== -1) {
          if (connection.sourcePort.name.indexOf('hybrid') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.sourcePort.name.indexOf('M') !== -1) {
          if (connection.targetPort.name.indexOf('M') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        if (connection.targetPort.name.indexOf('M') !== -1) {
          if (connection.sourcePort.name.indexOf('M') === -1) {
            canvas.remove(connection);
            return false;
          }
        }
        return true;
      });

      return c;
    }
  });


/*
Not used for now
 */
draw2d.robotois.KeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({
  NAME: 'draw2d.policy.canvas.DefaultKeyboardPolicy',
  /**
   * @constructor
   */
  // init: () => {
  //   this._super();
  // },
  /**
   * @method
   * Callback if the user press a key.<br>
   * This implementation checks only if the <b>DEL</b> has been pressed and creates an
   * CommandDelete if this happens.
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {Number} keyCode the pressed key
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @private
   **/
  onKeyDown: (canvas, keyCode, shiftKey, ctrlKey) => {
    console.log('keyCode: ', keyCode);
    //
    if (keyCode === 46 && canvas.getPrimarySelection() !== null) {
      // create a single undo/redo transaction if the user delete more than one element.
      // This happens with command stack transactions.
      //
      canvas.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
      const selection = canvas.getSelection();
      selection.each((index, figure) => {
        // don't delete a connection if the source or target figure is part of the selection.
        // In this case the connection is deleted by the DeleteCommand itself and
        // it is not allowed to delete a figure twice.
        //
        if (figure instanceof draw2d.Connection) {
          if (selection.contains(figure.getSource(), true)) {
            return;
          }
          if (selection.contains(figure.getTarget(), true)) {
            return;
          }
        }
        const cmd = figure.createCommand(
          new draw2d.command.CommandType(draw2d.command.CommandType.DELETE)
        );
        if (cmd !== null) {
          canvas.getCommandStack().execute(cmd);
        }
      });
      // execute all single commands at once.
      canvas.getCommandStack().commitTransaction();
    } else {
      this._super(canvas, keyCode, shiftKey, ctrlKey);
    }
  }
});

},{}],26:[function(require,module,exports){
draw2d.robotois.SelectionMenuPolicy = draw2d.policy.figure.SelectionPolicy.extend({
  NAME: 'SelectionMenuPolicy',
  init(attr, setter, getter) {
    this.overlay = null; // div DOM node
    this._super(attr, setter, getter);
  },

  /**
   * @method
   * @template
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the selected figure
   * @param {boolean} isPrimarySelection
   */
  onSelect(canvas, figure, isPrimarySelection) {
    this._super(canvas, figure, isPrimarySelection);
    addSelection({
      figureClass: figure.cssClass.replace('draw2d_shape_robotois_', ''),
      figureId: figure.id,
      isDragging: false,
    });
    Robotois.selectedFigure = figure;
  },

  /**
   * @method
   *
   * @param {draw2d.Canvas} canvas the related canvas
   * @param {draw2d.Figure} figure the unselected figure
   */
  onUnselect(canvas, figure) {
    this._super(canvas, figure);
    addSelection(null);
    Robotois.selectedFigure = null;
  },

  onDrag(canvas, figure) {
    this._super(canvas, figure);
    // const selection = currentSelection;
    if (!currentSelection.isDragging) {
      addSelection({
        figureClass: figure.cssClass.replace('draw2d_shape_robotois_', ''),
        figureId: figure.id,
        isDragging: true,
      });
    }
  },
  onDragEnd(canvas, figure) {
    this._super(canvas, figure);
    addSelection({
      figureClass: figure.cssClass.replace('draw2d_shape_robotois_', ''),
      figureId: figure.id,
      isDragging: false,
    });
  },
});

},{}],27:[function(require,module,exports){
/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
 */
(function ( global, factory ) {

    'use strict';

    // export as AMD...
    if ( typeof define !== 'undefined' && define.amd ) {
        define('canvgModule', [ 'rgbcolor', 'stackblur' ], factory );
    }

    // ...or as browserify
    else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = factory( require( './rgbcolor.js' ), require( './stackblur.min.js' ) );
    }

    global.canvg = factory( global.RGBColor, global.stackBlur );

}( typeof window !== 'undefined' ? window : this, function ( RGBColor, stackBlur ) {

    // canvg(target, s)
    // empty parameters: replace all 'svg' elements on page with 'canvas' elements
    // target: canvas element or the id of a canvas element
    // s: svg string, url to svg file, or xml document
    // opts: optional hash of options
    //		 ignoreMouse: true => ignore mouse events
    //		 ignoreAnimation: true => ignore animations
    //		 ignoreDimensions: true => does not try to resize canvas
    //		 ignoreClear: true => does not clear canvas
    //		 offsetX: int => draws at a x offset
    //		 offsetY: int => draws at a y offset
    //		 scaleWidth: int => scales horizontally to width
    //		 scaleHeight: int => scales vertically to height
    //		 renderCallback: function => will call the function after the first render is completed
    //		 forceRedraw: function => will call the function on every frame, if it returns true, will redraw
    var canvg = function (target, s, opts) {
        // no parameters
        if (target == null && s == null && opts == null) {
            var svgTags = document.querySelectorAll('svg');
            for (var i=0; i<svgTags.length; i++) {
                var svgTag = svgTags[i];
                var c = document.createElement('canvas');
                c.width = svgTag.clientWidth;
                c.height = svgTag.clientHeight;
                svgTag.parentNode.insertBefore(c, svgTag);
                svgTag.parentNode.removeChild(svgTag);
                var div = document.createElement('div');
                div.appendChild(svgTag);
                canvg(c, div.innerHTML);
            }
            return;
        }

        if (typeof target == 'string') {
            target = document.getElementById(target);
        }

        // store class on canvas
        if (target.svg != null) target.svg.stop();
        var svg = build(opts || {});
        // on i.e. 8 for flash canvas, we can't assign the property so check for it
        if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) target.svg = svg;

        var ctx = target.getContext('2d');
        if (typeof s.documentElement != 'undefined') {
            // load from xml doc
            svg.loadXmlDoc(ctx, s);
        }
        else if (s.substr(0,1) == '<') {
            // load from xml string
            svg.loadXml(ctx, s);
        }
        else {
            // load from url
            svg.load(ctx, s);
        }
    }

    // see https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
    var matchesSelector;
    if (typeof Element.prototype.matches != 'undefined') {
        matchesSelector = function(node, selector) {
            return node.matches(selector);
        };
    } else if (typeof Element.prototype.webkitMatchesSelector != 'undefined') {
        matchesSelector = function(node, selector) {
            return node.webkitMatchesSelector(selector);
        };
    } else if (typeof Element.prototype.mozMatchesSelector != 'undefined') {
        matchesSelector = function(node, selector) {
            return node.mozMatchesSelector(selector);
        };
    } else if (typeof Element.prototype.msMatchesSelector != 'undefined') {
        matchesSelector = function(node, selector) {
            return node.msMatchesSelector(selector);
        };
    } else if (typeof Element.prototype.oMatchesSelector != 'undefined') {
        matchesSelector = function(node, selector) {
            return node.oMatchesSelector(selector);
        };
    } else {
        // requires Sizzle: https://github.com/jquery/sizzle/wiki/Sizzle-Documentation
        // or jQuery: http://jquery.com/download/
        // or Zepto: http://zeptojs.com/#
        // without it, this is a ReferenceError

        if (typeof jQuery === 'function' || typeof Zepto === 'function') {
            matchesSelector = function (node, selector) {
                return $(node).is(selector);
            };
        }

        if (typeof matchesSelector === 'undefined') {
            matchesSelector = Sizzle.matchesSelector;
        }
    }

    // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
    var attributeRegex = /(\[[^\]]+\])/g;
    var idRegex = /(#[^\s\+>~\.\[:]+)/g;
    var classRegex = /(\.[^\s\+>~\.\[:]+)/g;
    var pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi;
    var pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi;
    var pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g;
    var elementRegex = /([^\s\+>~\.\[:]+)/g;
    function getSelectorSpecificity(selector) {
        var typeCount = [0, 0, 0];
        var findMatch = function(regex, type) {
            var matches = selector.match(regex);
            if (matches == null) {
                return;
            }
            typeCount[type] += matches.length;
            selector = selector.replace(regex, ' ');
        };

        selector = selector.replace(/:not\(([^\)]*)\)/g, '     $1 ');
        selector = selector.replace(/{[\s\S]*/gm, ' ');
        findMatch(attributeRegex, 1);
        findMatch(idRegex, 0);
        findMatch(classRegex, 1);
        findMatch(pseudoElementRegex, 2);
        findMatch(pseudoClassWithBracketsRegex, 1);
        findMatch(pseudoClassRegex, 1);
        selector = selector.replace(/[\*\s\+>~]/g, ' ');
        selector = selector.replace(/[#\.]/g, ' ');
        findMatch(elementRegex, 2);
        return typeCount.join('');
    }

    function build(opts) {
        var svg = { opts: opts };

        svg.FRAMERATE = 30;
        svg.MAX_VIRTUAL_PIXELS = 30000;

        svg.log = function(msg) {};
        if (svg.opts['log'] == true && typeof console != 'undefined') {
            svg.log = function(msg) { console.log(msg); };
        };

        // globals
        svg.init = function(ctx) {
            var uniqueId = 0;
            svg.UniqueId = function () { uniqueId++; return 'canvg' + uniqueId;	};
            svg.Definitions = {};
            svg.Styles = {};
            svg.StylesSpecificity = {};
            svg.Animations = [];
            svg.Images = [];
            svg.ctx = ctx;
            svg.ViewPort = new (function () {
                this.viewPorts = [];
                this.Clear = function() { this.viewPorts = []; }
                this.SetCurrent = function(width, height) { this.viewPorts.push({ width: width, height: height }); }
                this.RemoveCurrent = function() { this.viewPorts.pop(); }
                this.Current = function() { return this.viewPorts[this.viewPorts.length - 1]; }
                this.width = function() { return this.Current().width; }
                this.height = function() { return this.Current().height; }
                this.ComputeSize = function(d) {
                    if (d != null && typeof d == 'number') return d;
                    if (d == 'x') return this.width();
                    if (d == 'y') return this.height();
                    return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
                }
            });
        }
        svg.init();

        // images loaded
        svg.ImagesLoaded = function() {
            for (var i=0; i<svg.Images.length; i++) {
                if (!svg.Images[i].loaded) return false;
            }
            return true;
        }

        // trim
        svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); }

        // compress spaces
        svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); }

        // ajax
        svg.ajax = function(url) {
            var AJAX;
            if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();}
            else{AJAX=new ActiveXObject('Microsoft.XMLHTTP');}
            if(AJAX){
                AJAX.open('GET',url,false);
                AJAX.send(null);
                return AJAX.responseText;
            }
            return null;
        }

        // parse xml
        svg.parseXml = function(xml) {
            if (typeof Windows != 'undefined' && typeof Windows.Data != 'undefined' && typeof Windows.Data.Xml != 'undefined') {
                var xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
                var settings = new Windows.Data.Xml.Dom.XmlLoadSettings();
                settings.prohibitDtd = false;
                xmlDoc.loadXml(xml, settings);
                return xmlDoc;
            }
            else if (window.DOMParser)
            {
                var parser = new DOMParser();
                return parser.parseFromString(xml, 'text/xml');
            }
            else
            {
                xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
                var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                xmlDoc.async = 'false';
                xmlDoc.loadXML(xml);
                return xmlDoc;
            }
        }

        svg.Property = function(name, value) {
            this.name = name;
            this.value = value;
        }
        svg.Property.prototype.getValue = function() {
            return this.value;
        }

        svg.Property.prototype.hasValue = function() {
            return (this.value != null && this.value !== '');
        }

        // return the numerical value of the property
        svg.Property.prototype.numValue = function() {
            if (!this.hasValue()) return 0;

            var n = parseFloat(this.value);
            if ((this.value + '').match(/%$/)) {
                n = n / 100.0;
            }
            return n;
        }

        svg.Property.prototype.valueOrDefault = function(def) {
            if (this.hasValue()) return this.value;
            return def;
        }

        svg.Property.prototype.numValueOrDefault = function(def) {
            if (this.hasValue()) return this.numValue();
            return def;
        }

        // color extensions
        // augment the current color value with the opacity
        svg.Property.prototype.addOpacity = function(opacityProp) {
            var newValue = this.value;
            if (opacityProp.value != null && opacityProp.value != '' && typeof this.value == 'string') { // can only add opacity to colors, not patterns
                var color = new RGBColor(this.value);
                if (color.ok) {
                    newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacityProp.numValue() + ')';
                }
            }
            return new svg.Property(this.name, newValue);
        }

        // definition extensions
        // get the definition from the definitions table
        svg.Property.prototype.getDefinition = function() {
            var name = this.value.match(/#([^\)'"]+)/);
            if (name) { name = name[1]; }
            if (!name) { name = this.value; }
            return svg.Definitions[name];
        }

        svg.Property.prototype.isUrlDefinition = function() {
            return this.value.indexOf('url(') == 0
        }

        svg.Property.prototype.getFillStyleDefinition = function(e, opacityProp) {
            var def = this.getDefinition();

            // gradient
            if (def != null && def.createGradient) {
                return def.createGradient(svg.ctx, e, opacityProp);
            }

            // pattern
            if (def != null && def.createPattern) {
                if (def.getHrefAttribute().hasValue()) {
                    var pt = def.attribute('patternTransform');
                    def = def.getHrefAttribute().getDefinition();
                    if (pt.hasValue()) { def.attribute('patternTransform', true).value = pt.value; }
                }
                return def.createPattern(svg.ctx, e);
            }

            return null;
        }

        // length extensions
        svg.Property.prototype.getDPI = function(viewPort) {
            return 96.0; // TODO: compute?
        }

        svg.Property.prototype.getEM = function(viewPort) {
            var em = 12;

            var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
            if (fontSize.hasValue()) em = fontSize.toPixels(viewPort);

            return em;
        }

        svg.Property.prototype.getUnits = function() {
            var s = this.value+'';
            return s.replace(/[0-9\.\-]/g,'');
        }

        // get the length as pixels
        svg.Property.prototype.toPixels = function(viewPort, processPercent) {
            if (!this.hasValue()) return 0;
            var s = this.value+'';
            if (s.match(/em$/)) return this.numValue() * this.getEM(viewPort);
            if (s.match(/ex$/)) return this.numValue() * this.getEM(viewPort) / 2.0;
            if (s.match(/px$/)) return this.numValue();
            if (s.match(/pt$/)) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
            if (s.match(/pc$/)) return this.numValue() * 15;
            if (s.match(/cm$/)) return this.numValue() * this.getDPI(viewPort) / 2.54;
            if (s.match(/mm$/)) return this.numValue() * this.getDPI(viewPort) / 25.4;
            if (s.match(/in$/)) return this.numValue() * this.getDPI(viewPort);
            if (s.match(/%$/)) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
            var n = this.numValue();
            if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
            return n;
        }

        // time extensions
        // get the time as milliseconds
        svg.Property.prototype.toMilliseconds = function() {
            if (!this.hasValue()) return 0;
            var s = this.value+'';
            if (s.match(/s$/)) return this.numValue() * 1000;
            if (s.match(/ms$/)) return this.numValue();
            return this.numValue();
        }

        // angle extensions
        // get the angle as radians
        svg.Property.prototype.toRadians = function() {
            if (!this.hasValue()) return 0;
            var s = this.value+'';
            if (s.match(/deg$/)) return this.numValue() * (Math.PI / 180.0);
            if (s.match(/grad$/)) return this.numValue() * (Math.PI / 200.0);
            if (s.match(/rad$/)) return this.numValue();
            return this.numValue() * (Math.PI / 180.0);
        }

        // text extensions
        // get the text baseline
        var textBaselineMapping = {
            'baseline': 'alphabetic',
            'before-edge': 'top',
            'text-before-edge': 'top',
            'middle': 'middle',
            'central': 'middle',
            'after-edge': 'bottom',
            'text-after-edge': 'bottom',
            'ideographic': 'ideographic',
            'alphabetic': 'alphabetic',
            'hanging': 'hanging',
            'mathematical': 'alphabetic'
        };
        svg.Property.prototype.toTextBaseline = function () {
            if (!this.hasValue()) return null;
            return textBaselineMapping[this.value];
        }

        // fonts
        svg.Font = new (function() {
            this.Styles = 'normal|italic|oblique|inherit';
            this.Variants = 'normal|small-caps|inherit';
            this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

            this.CreateFont = function(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
                var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
                return {
                    fontFamily: fontFamily || f.fontFamily,
                    fontSize: fontSize || f.fontSize,
                    fontStyle: fontStyle || f.fontStyle,
                    fontWeight: fontWeight || f.fontWeight,
                    fontVariant: fontVariant || f.fontVariant,
                    toString: function () { return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ') }
                }
            }

            var that = this;
            this.Parse = function(s) {
                var f = {};
                var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
                var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false }
                var ff = '';
                for (var i=0; i<d.length; i++) {
                    if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontStyle = d[i]; set.fontStyle = true; }
                    else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontVariant = d[i]; set.fontStyle = set.fontVariant = true;	}
                    else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {	if (d[i] != 'inherit') f.fontWeight = d[i]; set.fontStyle = set.fontVariant = set.fontWeight = true; }
                    else if (!set.fontSize) { if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0]; set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true; }
                    else { if (d[i] != 'inherit') ff += d[i]; }
                } if (ff != '') f.fontFamily = ff;
                return f;
            }
        });

        // points and paths
        svg.ToNumberArray = function(s) {
            var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
            for (var i=0; i<a.length; i++) {
                a[i] = parseFloat(a[i]);
            }
            return a;
        }
        svg.Point = function(x, y) {
            this.x = x;
            this.y = y;
        }
        svg.Point.prototype.angleTo = function(p) {
            return Math.atan2(p.y - this.y, p.x - this.x);
        }

        svg.Point.prototype.applyTransform = function(v) {
            var xp = this.x * v[0] + this.y * v[2] + v[4];
            var yp = this.x * v[1] + this.y * v[3] + v[5];
            this.x = xp;
            this.y = yp;
        }

        svg.CreatePoint = function(s) {
            var a = svg.ToNumberArray(s);
            return new svg.Point(a[0], a[1]);
        }
        svg.CreatePath = function(s) {
            var a = svg.ToNumberArray(s);
            var path = [];
            for (var i=0; i<a.length; i+=2) {
                path.push(new svg.Point(a[i], a[i+1]));
            }
            return path;
        }

        // bounding box
        svg.BoundingBox = function(x1, y1, x2, y2) { // pass in initial points if you want
            this.x1 = Number.NaN;
            this.y1 = Number.NaN;
            this.x2 = Number.NaN;
            this.y2 = Number.NaN;

            this.x = function() { return this.x1; }
            this.y = function() { return this.y1; }
            this.width = function() { return this.x2 - this.x1; }
            this.height = function() { return this.y2 - this.y1; }

            this.addPoint = function(x, y) {
                if (x != null) {
                    if (isNaN(this.x1) || isNaN(this.x2)) {
                        this.x1 = x;
                        this.x2 = x;
                    }
                    if (x < this.x1) this.x1 = x;
                    if (x > this.x2) this.x2 = x;
                }

                if (y != null) {
                    if (isNaN(this.y1) || isNaN(this.y2)) {
                        this.y1 = y;
                        this.y2 = y;
                    }
                    if (y < this.y1) this.y1 = y;
                    if (y > this.y2) this.y2 = y;
                }
            }
            this.addX = function(x) { this.addPoint(x, null); }
            this.addY = function(y) { this.addPoint(null, y); }

            this.addBoundingBox = function(bb) {
                this.addPoint(bb.x1, bb.y1);
                this.addPoint(bb.x2, bb.y2);
            }

            this.addQuadraticCurve = function(p0x, p0y, p1x, p1y, p2x, p2y) {
                var cp1x = p0x + 2/3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
                var cp1y = p0y + 2/3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
                var cp2x = cp1x + 1/3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
                var cp2y = cp1y + 1/3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
                this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y,	cp2y, p2x, p2y);
            }

            this.addBezierCurve = function(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
                // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
                var p0 = [p0x, p0y], p1 = [p1x, p1y], p2 = [p2x, p2y], p3 = [p3x, p3y];
                this.addPoint(p0[0], p0[1]);
                this.addPoint(p3[0], p3[1]);

                for (i=0; i<=1; i++) {
                    var f = function(t) {
                        return Math.pow(1-t, 3) * p0[i]
                            + 3 * Math.pow(1-t, 2) * t * p1[i]
                            + 3 * (1-t) * Math.pow(t, 2) * p2[i]
                            + Math.pow(t, 3) * p3[i];
                    }

                    var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
                    var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
                    var c = 3 * p1[i] - 3 * p0[i];

                    if (a == 0) {
                        if (b == 0) continue;
                        var t = -c / b;
                        if (0 < t && t < 1) {
                            if (i == 0) this.addX(f(t));
                            if (i == 1) this.addY(f(t));
                        }
                        continue;
                    }

                    var b2ac = Math.pow(b, 2) - 4 * c * a;
                    if (b2ac < 0) continue;
                    var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
                    if (0 < t1 && t1 < 1) {
                        if (i == 0) this.addX(f(t1));
                        if (i == 1) this.addY(f(t1));
                    }
                    var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
                    if (0 < t2 && t2 < 1) {
                        if (i == 0) this.addX(f(t2));
                        if (i == 1) this.addY(f(t2));
                    }
                }
            }

            this.isPointInBox = function(x, y) {
                return (this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2);
            }

            this.addPoint(x1, y1);
            this.addPoint(x2, y2);
        }

        // transforms
        svg.Transform = function(v) {
            var that = this;
            this.Type = {}

            // translate
            this.Type.translate = function(s) {
                this.p = svg.CreatePoint(s);
                this.apply = function(ctx) {
                    ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
                }
                this.unapply = function(ctx) {
                    ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
                }
                this.applyToPoint = function(p) {
                    p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
                }
            }

            // rotate
            this.Type.rotate = function(s) {
                var a = svg.ToNumberArray(s);
                this.angle = new svg.Property('angle', a[0]);
                this.cx = a[1] || 0;
                this.cy = a[2] || 0;
                this.apply = function(ctx) {
                    ctx.translate(this.cx, this.cy);
                    ctx.rotate(this.angle.toRadians());
                    ctx.translate(-this.cx, -this.cy);
                }
                this.unapply = function(ctx) {
                    ctx.translate(this.cx, this.cy);
                    ctx.rotate(-1.0 * this.angle.toRadians());
                    ctx.translate(-this.cx, -this.cy);
                }
                this.applyToPoint = function(p) {
                    var a = this.angle.toRadians();
                    p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
                    p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
                    p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
                }
            }

            this.Type.scale = function(s) {
                this.p = svg.CreatePoint(s);
                this.apply = function(ctx) {
                    ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
                }
                this.unapply = function(ctx) {
                    ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
                }
                this.applyToPoint = function(p) {
                    p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
                }
            }

            this.Type.matrix = function(s) {
                this.m = svg.ToNumberArray(s);
                this.apply = function(ctx) {
                    ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
                }
                this.unapply = function(ctx) {
                    var a = this.m[0];
                    var b = this.m[2];
                    var c = this.m[4];
                    var d = this.m[1];
                    var e = this.m[3];
                    var f = this.m[5];
                    var g = 0.0;
                    var h = 0.0;
                    var i = 1.0;
                    var det = 1 / (a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g));
                    ctx.transform(
                        det*(e*i-f*h),
                        det*(f*g-d*i),
                        det*(c*h-b*i),
                        det*(a*i-c*g),
                        det*(b*f-c*e),
                        det*(c*d-a*f)
                    );
                }
                this.applyToPoint = function(p) {
                    p.applyTransform(this.m);
                }
            }

            this.Type.SkewBase = function(s) {
                this.base = that.Type.matrix;
                this.base(s);
                this.angle = new svg.Property('angle', s);
            }
            this.Type.SkewBase.prototype = new this.Type.matrix;

            this.Type.skewX = function(s) {
                this.base = that.Type.SkewBase;
                this.base(s);
                this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
            }
            this.Type.skewX.prototype = new this.Type.SkewBase;

            this.Type.skewY = function(s) {
                this.base = that.Type.SkewBase;
                this.base(s);
                this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
            }
            this.Type.skewY.prototype = new this.Type.SkewBase;

            this.transforms = [];

            this.apply = function(ctx) {
                for (var i=0; i<this.transforms.length; i++) {
                    this.transforms[i].apply(ctx);
                }
            }

            this.unapply = function(ctx) {
                for (var i=this.transforms.length-1; i>=0; i--) {
                    this.transforms[i].unapply(ctx);
                }
            }

            this.applyToPoint = function(p) {
                for (var i=0; i<this.transforms.length; i++) {
                    this.transforms[i].applyToPoint(p);
                }
            }

            var data = svg.trim(svg.compressSpaces(v)).replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g,') ').split(/\s(?=[a-z])/);
            for (var i=0; i<data.length; i++) {
                var type = svg.trim(data[i].split('(')[0]);
                var s = data[i].split('(')[1].replace(')','');
                var transformType = this.Type[type];
                if (typeof transformType != 'undefined') {
                    var transform = new transformType(s);
                    transform.type = type;
                    this.transforms.push(transform);
                }
            }
        }

        // aspect ratio
        svg.AspectRatio = function(ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
            // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
            aspectRatio = svg.compressSpaces(aspectRatio);
            aspectRatio = aspectRatio.replace(/^defer\s/,''); // ignore defer
            var align = aspectRatio.split(' ')[0] || 'xMidYMid';
            var meetOrSlice = aspectRatio.split(' ')[1] || 'meet';

            // calculate scale
            var scaleX = width / desiredWidth;
            var scaleY = height / desiredHeight;
            var scaleMin = Math.min(scaleX, scaleY);
            var scaleMax = Math.max(scaleX, scaleY);
            if (meetOrSlice == 'meet') { desiredWidth *= scaleMin; desiredHeight *= scaleMin; }
            if (meetOrSlice == 'slice') { desiredWidth *= scaleMax; desiredHeight *= scaleMax; }

            refX = new svg.Property('refX', refX);
            refY = new svg.Property('refY', refY);
            if (refX.hasValue() && refY.hasValue()) {
                ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
            }
            else {
                // align
                if (align.match(/^xMid/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0);
                if (align.match(/YMid$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height / 2.0 - desiredHeight / 2.0);
                if (align.match(/^xMax/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width - desiredWidth, 0);
                if (align.match(/YMax$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height - desiredHeight);
            }

            // scale
            if (align == 'none') ctx.scale(scaleX, scaleY);
            else if (meetOrSlice == 'meet') ctx.scale(scaleMin, scaleMin);
            else if (meetOrSlice == 'slice') ctx.scale(scaleMax, scaleMax);

            // translate
            ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);
        }

        // elements
        svg.Element = {}

        svg.EmptyProperty = new svg.Property('EMPTY', '');

        svg.Element.ElementBase = function(node) {
            this.attributes = {};
            this.styles = {};
            this.stylesSpecificity = {};
            this.children = [];

            // get or create attribute
            this.attribute = function(name, createIfNotExists) {
                var a = this.attributes[name];
                if (a != null) return a;

                if (createIfNotExists == true) { a = new svg.Property(name, ''); this.attributes[name] = a; }
                return a || svg.EmptyProperty;
            }

            this.getHrefAttribute = function() {
                for (var a in this.attributes) {
                    if (a == 'href' || a.match(/:href$/)) {
                        return this.attributes[a];
                    }
                }
                return svg.EmptyProperty;
            }

            // get or create style, crawls up node tree
            this.style = function(name, createIfNotExists, skipAncestors) {
                var s = this.styles[name];
                if (s != null) return s;

                var a = this.attribute(name);
                if (a != null && a.hasValue()) {
                    this.styles[name] = a; // move up to me to cache
                    return a;
                }

                if (skipAncestors != true) {
                    var p = this.parent;
                    if (p != null) {
                        var ps = p.style(name);
                        if (ps != null && ps.hasValue()) {
                            return ps;
                        }
                    }
                }

                if (createIfNotExists == true) { s = new svg.Property(name, ''); this.styles[name] = s; }
                return s || svg.EmptyProperty;
            }

            // base render
            this.render = function(ctx) {
                // don't render display=none
                if (this.style('display').value == 'none') return;

                // don't render visibility=hidden
                if (this.style('visibility').value == 'hidden') return;

                ctx.save();
                if (this.style('mask').hasValue()) { // mask
                    var mask = this.style('mask').getDefinition();
                    if (mask != null) mask.apply(ctx, this);
                }
                else if (this.style('filter').hasValue()) { // filter
                    var filter = this.style('filter').getDefinition();
                    if (filter != null) filter.apply(ctx, this);
                }
                else {
                    this.setContext(ctx);
                    this.renderChildren(ctx);
                    this.clearContext(ctx);
                }
                ctx.restore();
            }

            // base set context
            this.setContext = function(ctx) {
                // OVERRIDE ME!
            }

            // base clear context
            this.clearContext = function(ctx) {
                // OVERRIDE ME!
            }

            // base render children
            this.renderChildren = function(ctx) {
                for (var i=0; i<this.children.length; i++) {
                    this.children[i].render(ctx);
                }
            }

            this.addChild = function(childNode, create) {
                var child = childNode;
                if (create) child = svg.CreateElement(childNode);
                child.parent = this;
                if (child.type != 'title') { this.children.push(child);	}
            }

            this.addStylesFromStyleDefinition = function () {
                // add styles
                for (var selector in svg.Styles) {
                    if (selector[0] != '@' && matchesSelector(node, selector)) {
                        var styles = svg.Styles[selector];
                        var specificity = svg.StylesSpecificity[selector];
                        if (styles != null) {
                            for (var name in styles) {
                                var existingSpecificity = this.stylesSpecificity[name];
                                if (typeof existingSpecificity == 'undefined') {
                                    existingSpecificity = '000';
                                }
                                if (specificity > existingSpecificity) {
                                    this.styles[name] = styles[name];
                                    this.stylesSpecificity[name] = specificity;
                                }
                            }
                        }
                    }
                }
            };

            // Microsoft Edge fix
            var allUppercase = new RegExp("^[A-Z\-]+$");
            var normalizeAttributeName = function (name) {
                if (allUppercase.test(name)) {
                    return name.toLowerCase();
                }
                return name;
            };

            if (node != null && node.nodeType == 1) { //ELEMENT_NODE
                // add attributes
                for (var i=0; i<node.attributes.length; i++) {
                    var attribute = node.attributes[i];
                    var nodeName = normalizeAttributeName(attribute.nodeName);
                    this.attributes[nodeName] = new svg.Property(nodeName, attribute.value);
                }

                this.addStylesFromStyleDefinition();

                // add inline styles
                if (this.attribute('style').hasValue()) {
                    // Freegroup Patch
                    // canvg.js can't handle data:image/gif;base64,123NJABBGFR... data URL's
                    //           var styles = this.attribute('style').value.split(';');
                    var styles = this.attribute('style').value.split(new RegExp(";(?![^\\(]*\\))"));
                    // END PATCH
//                    var styles = this.attribute('style').value.split(';');
                    for (var i=0; i<styles.length; i++) {
                        if (svg.trim(styles[i]) != '') {
                            var style = styles[i].split(':');
                            // FreeGroup Patch
                            // a CSS style can contain more than one ":". e.g. "background-image:data:image/gif;base64,R0lGODlhFAAUAPAAAP///+Dg8CH5);"
                            if (style.length > 2) {
                                style[1] = style.slice(1).join(':');
                                style.length = 2;
                            }
                            // end patch

                            var name = svg.trim(style[0]);
                            var value = svg.trim(style[1]);
                            this.styles[name] = new svg.Property(name, value);
                        }
                    }
                }

                // add id
                if (this.attribute('id').hasValue()) {
                    if (svg.Definitions[this.attribute('id').value] == null) {
                        svg.Definitions[this.attribute('id').value] = this;
                    }
                }

                // add children
                for (var i=0; i<node.childNodes.length; i++) {
                    var childNode = node.childNodes[i];
                    if (childNode.nodeType == 1) this.addChild(childNode, true); //ELEMENT_NODE
                    if (this.captureTextNodes && (childNode.nodeType == 3 || childNode.nodeType == 4)) {
                        var text = childNode.value || childNode.text || childNode.textContent || '';
                        if (svg.compressSpaces(text) != '') {
                            this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
                        }
                    }
                }
            }
        }

        svg.Element.RenderedElementBase = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.setContext = function(ctx) {
                // fill
                if (this.style('fill').isUrlDefinition()) {
                    var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
                    if (fs != null) ctx.fillStyle = fs;
                }
                else if (this.style('fill').hasValue()) {
                    var fillStyle = this.style('fill');
                    if (fillStyle.value == 'currentColor') fillStyle.value = this.style('color').value;
                    if (fillStyle.value != 'inherit') ctx.fillStyle = (fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value);
                }
                if (this.style('fill-opacity').hasValue()) {
                    var fillStyle = new svg.Property('fill', ctx.fillStyle);
                    fillStyle = fillStyle.addOpacity(this.style('fill-opacity'));
                    ctx.fillStyle = fillStyle.value;
                }

                // stroke
                if (this.style('stroke').isUrlDefinition()) {
                    var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
                    if (fs != null) ctx.strokeStyle = fs;
                }
                else if (this.style('stroke').hasValue()) {
                    var strokeStyle = this.style('stroke');
                    if (strokeStyle.value == 'currentColor') strokeStyle.value = this.style('color').value;
                    if (strokeStyle.value != 'inherit') ctx.strokeStyle = (strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value);
                }
                if (this.style('stroke-opacity').hasValue()) {
                    var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
                    strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity'));
                    ctx.strokeStyle = strokeStyle.value;
                }
                if (this.style('stroke-width').hasValue()) {
                    var newLineWidth = this.style('stroke-width').toPixels();
                    ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
                }
                if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
                if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
                if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;
                if (this.style('stroke-dasharray').hasValue() && this.style('stroke-dasharray').value != 'none') {
                    var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);
                    if (typeof ctx.setLineDash != 'undefined') { ctx.setLineDash(gaps); }
                    else if (typeof ctx.webkitLineDash != 'undefined') { ctx.webkitLineDash = gaps; }
                    else if (typeof ctx.mozDash != 'undefined' && !(gaps.length==1 && gaps[0]==0)) { ctx.mozDash = gaps; }

                    var offset = this.style('stroke-dashoffset').numValueOrDefault(1);
                    if (typeof ctx.lineDashOffset != 'undefined') { ctx.lineDashOffset = offset; }
                    else if (typeof ctx.webkitLineDashOffset != 'undefined') { ctx.webkitLineDashOffset = offset; }
                    else if (typeof ctx.mozDashOffset != 'undefined') { ctx.mozDashOffset = offset; }
                }

                // font
                if (typeof ctx.font != 'undefined') {
                    ctx.font = svg.Font.CreateFont(
                        this.style('font-style').value,
                        this.style('font-variant').value,
                        this.style('font-weight').value,
                        this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '',
                        this.style('font-family').value).toString();
                }

                // transform
                if (this.style('transform', false, true).hasValue()) {
                    var transform = new svg.Transform(this.style('transform', false, true).value);
                    transform.apply(ctx);
                }

                // clip
                if (this.style('clip-path', false, true).hasValue()) {
                    var clip = this.style('clip-path', false, true).getDefinition();
                    if (clip != null) clip.apply(ctx);
                }

                // opacity
                if (this.style('opacity').hasValue()) {
                    ctx.globalAlpha = this.style('opacity').numValue();
                }
            }
        }
        svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase;

        svg.Element.PathElementBase = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.path = function(ctx) {
                if (ctx != null) ctx.beginPath();
                return new svg.BoundingBox();
            }

            this.renderChildren = function(ctx) {
                this.path(ctx);
                svg.Mouse.checkPath(this, ctx);
                if (ctx.fillStyle != '') {
                    if (this.style('fill-rule').valueOrDefault('inherit') != 'inherit') { ctx.fill(this.style('fill-rule').value); }
                    else { ctx.fill(); }
                }
                if (ctx.strokeStyle != '') ctx.stroke();

                var markers = this.getMarkers();
                if (markers != null) {
                    if (this.style('marker-start').isUrlDefinition()) {
                        var marker = this.style('marker-start').getDefinition();
                        marker.render(ctx, markers[0][0], markers[0][1]);
                    }
                    if (this.style('marker-mid').isUrlDefinition()) {
                        var marker = this.style('marker-mid').getDefinition();
                        for (var i=1;i<markers.length-1;i++) {
                            marker.render(ctx, markers[i][0], markers[i][1]);
                        }
                    }
                    if (this.style('marker-end').isUrlDefinition()) {
                        var marker = this.style('marker-end').getDefinition();
                        marker.render(ctx, markers[markers.length-1][0], markers[markers.length-1][1]);
                    }
                }
            }

            this.getBoundingBox = function() {
                return this.path();
            }

            this.getMarkers = function() {
                return null;
            }
        }
        svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase;

        // svg element
        svg.Element.svg = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.baseClearContext = this.clearContext;
            this.clearContext = function(ctx) {
                this.baseClearContext(ctx);
                svg.ViewPort.RemoveCurrent();
            }

            this.baseSetContext = this.setContext;
            this.setContext = function(ctx) {
                // initial values and defaults
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                if (typeof ctx.font != 'undefined' && typeof window.getComputedStyle != 'undefined') {
                    ctx.font = window.getComputedStyle(ctx.canvas).getPropertyValue('font');
                }

                this.baseSetContext(ctx);

                // create new view port
                if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
                if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
                ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));

                var width = svg.ViewPort.width();
                var height = svg.ViewPort.height();

                if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
                if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';
                if (typeof this.root == 'undefined') {
                    width = this.attribute('width').toPixels('x');
                    height = this.attribute('height').toPixels('y');

                    var x = 0;
                    var y = 0;
                    if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
                        x = -this.attribute('refX').toPixels('x');
                        y = -this.attribute('refY').toPixels('y');
                    }

                    if (this.attribute('overflow').valueOrDefault('hidden') != 'visible') {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(width, y);
                        ctx.lineTo(width, height);
                        ctx.lineTo(x, height);
                        ctx.closePath();
                        ctx.clip();
                    }
                }
                svg.ViewPort.SetCurrent(width, height);

                // viewbox
                if (this.attribute('viewBox').hasValue()) {
                    var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
                    var minX = viewBox[0];
                    var minY = viewBox[1];
                    width = viewBox[2];
                    height = viewBox[3];

                    svg.AspectRatio(ctx,
                        this.attribute('preserveAspectRatio').value,
                        svg.ViewPort.width(),
                        width,
                        svg.ViewPort.height(),
                        height,
                        minX,
                        minY,
                        this.attribute('refX').value,
                        this.attribute('refY').value);

                    svg.ViewPort.RemoveCurrent();
                    svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
                }
            }
        }
        svg.Element.svg.prototype = new svg.Element.RenderedElementBase;

        // rect element
        svg.Element.rect = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            this.path = function(ctx) {
                var x = this.attribute('x').toPixels('x');
                var y = this.attribute('y').toPixels('y');
                var width = this.attribute('width').toPixels('x');
                var height = this.attribute('height').toPixels('y');
                var rx = this.attribute('rx').toPixels('x');
                var ry = this.attribute('ry').toPixels('y');
                if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
                if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
                rx = Math.min(rx, width / 2.0);
                ry = Math.min(ry, height / 2.0);
                if (ctx != null) {
                    ctx.beginPath();
                    ctx.moveTo(x + rx, y);
                    ctx.lineTo(x + width - rx, y);
                    ctx.quadraticCurveTo(x + width, y, x + width, y + ry)
                    ctx.lineTo(x + width, y + height - ry);
                    ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height)
                    ctx.lineTo(x + rx, y + height);
                    ctx.quadraticCurveTo(x, y + height, x, y + height - ry)
                    ctx.lineTo(x, y + ry);
                    ctx.quadraticCurveTo(x, y, x + rx, y)
                    ctx.closePath();
                }

                return new svg.BoundingBox(x, y, x + width, y + height);
            }
        }
        svg.Element.rect.prototype = new svg.Element.PathElementBase;

        // circle element
        svg.Element.circle = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            this.path = function(ctx) {
                var cx = this.attribute('cx').toPixels('x');
                var cy = this.attribute('cy').toPixels('y');
                var r = this.attribute('r').toPixels();

                if (ctx != null) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
                    ctx.closePath();
                }

                return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
            }
        }
        svg.Element.circle.prototype = new svg.Element.PathElementBase;

        // ellipse element
        svg.Element.ellipse = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            this.path = function(ctx) {
                var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
                var rx = this.attribute('rx').toPixels('x');
                var ry = this.attribute('ry').toPixels('y');
                var cx = this.attribute('cx').toPixels('x');
                var cy = this.attribute('cy').toPixels('y');

                if (ctx != null) {
                    ctx.beginPath();
                    ctx.moveTo(cx, cy - ry);
                    ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
                    ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
                    ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
                    ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
                    ctx.closePath();
                }

                return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
            }
        }
        svg.Element.ellipse.prototype = new svg.Element.PathElementBase;

        // line element
        svg.Element.line = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            this.getPoints = function() {
                return [
                    new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')),
                    new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
            }

            this.path = function(ctx) {
                var points = this.getPoints();

                if (ctx != null) {
                    ctx.beginPath();
                    ctx.moveTo(points[0].x, points[0].y);
                    ctx.lineTo(points[1].x, points[1].y);
                }

                return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
            }

            this.getMarkers = function() {
                var points = this.getPoints();
                var a = points[0].angleTo(points[1]);
                return [[points[0], a], [points[1], a]];
            }
        }
        svg.Element.line.prototype = new svg.Element.PathElementBase;

        // polyline element
        svg.Element.polyline = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            this.points = svg.CreatePath(this.attribute('points').value);
            this.path = function(ctx) {
                var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);
                if (ctx != null) {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                }
                for (var i=1; i<this.points.length; i++) {
                    bb.addPoint(this.points[i].x, this.points[i].y);
                    if (ctx != null) ctx.lineTo(this.points[i].x, this.points[i].y);
                }
                return bb;
            }

            this.getMarkers = function() {
                var markers = [];
                for (var i=0; i<this.points.length - 1; i++) {
                    markers.push([this.points[i], this.points[i].angleTo(this.points[i+1])]);
                }
                if (markers.length > 0) {
                    markers.push([this.points[this.points.length-1], markers[markers.length-1][1]]);
                }
                return markers;
            }
        }
        svg.Element.polyline.prototype = new svg.Element.PathElementBase;

        // polygon element
        svg.Element.polygon = function(node) {
            this.base = svg.Element.polyline;
            this.base(node);

            this.basePath = this.path;
            this.path = function(ctx) {
                var bb = this.basePath(ctx);
                if (ctx != null) {
                    ctx.lineTo(this.points[0].x, this.points[0].y);
                    ctx.closePath();
                }
                return bb;
            }
        }
        svg.Element.polygon.prototype = new svg.Element.polyline;

        // path element
        svg.Element.path = function(node) {
            this.base = svg.Element.PathElementBase;
            this.base(node);

            var d = this.attribute('d').value;
            // TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
            d = d.replace(/,/gm,' '); // get rid of all commas
            // As the end of a match can also be the start of the next match, we need to run this replace twice.
            for(var i=0; i<2; i++)
                d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); // suffix commands with spaces
            d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // prefix commands with spaces
            d = d.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits on +- signs
            // Again, we need to run this twice to find all occurances
            for(var i=0; i<2; i++)
                d = d.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when they start with a comma
            d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
            d = svg.compressSpaces(d); // compress multiple spaces
            d = svg.trim(d);
            this.PathParser = new (function(d) {
                this.tokens = d.split(' ');

                this.reset = function() {
                    this.i = -1;
                    this.command = '';
                    this.previousCommand = '';
                    this.start = new svg.Point(0, 0);
                    this.control = new svg.Point(0, 0);
                    this.current = new svg.Point(0, 0);
                    this.points = [];
                    this.angles = [];
                }

                this.isEnd = function() {
                    return this.i >= this.tokens.length - 1;
                }

                this.isCommandOrEnd = function() {
                    if (this.isEnd()) return true;
                    return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
                }

                this.isRelativeCommand = function() {
                    switch(this.command)
                    {
                        case 'm':
                        case 'l':
                        case 'h':
                        case 'v':
                        case 'c':
                        case 's':
                        case 'q':
                        case 't':
                        case 'a':
                        case 'z':
                            return true;
                            break;
                    }
                    return false;
                }

                this.getToken = function() {
                    this.i++;
                    return this.tokens[this.i];
                }

                this.getScalar = function() {
                    return parseFloat(this.getToken());
                }

                this.nextCommand = function() {
                    this.previousCommand = this.command;
                    this.command = this.getToken();
                }

                this.getPoint = function() {
                    var p = new svg.Point(this.getScalar(), this.getScalar());
                    return this.makeAbsolute(p);
                }

                this.getAsControlPoint = function() {
                    var p = this.getPoint();
                    this.control = p;
                    return p;
                }

                this.getAsCurrentPoint = function() {
                    var p = this.getPoint();
                    this.current = p;
                    return p;
                }

                this.getReflectedControlPoint = function() {
                    if (this.previousCommand.toLowerCase() != 'c' &&
                        this.previousCommand.toLowerCase() != 's' &&
                        this.previousCommand.toLowerCase() != 'q' &&
                        this.previousCommand.toLowerCase() != 't' ){
                        return this.current;
                    }

                    // reflect point
                    var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
                    return p;
                }

                this.makeAbsolute = function(p) {
                    if (this.isRelativeCommand()) {
                        p.x += this.current.x;
                        p.y += this.current.y;
                    }
                    return p;
                }

                this.addMarker = function(p, from, priorTo) {
                    // if the last angle isn't filled in because we didn't have this point yet ...
                    if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length-1] == null) {
                        this.angles[this.angles.length-1] = this.points[this.points.length-1].angleTo(priorTo);
                    }
                    this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
                }

                this.addMarkerAngle = function(p, a) {
                    this.points.push(p);
                    this.angles.push(a);
                }

                this.getMarkerPoints = function() { return this.points; }
                this.getMarkerAngles = function() {
                    for (var i=0; i<this.angles.length; i++) {
                        if (this.angles[i] == null) {
                            for (var j=i+1; j<this.angles.length; j++) {
                                if (this.angles[j] != null) {
                                    this.angles[i] = this.angles[j];
                                    break;
                                }
                            }
                        }
                    }
                    return this.angles;
                }
            })(d);

            this.path = function(ctx) {
                var pp = this.PathParser;
                pp.reset();

                var bb = new svg.BoundingBox();
                if (ctx != null) ctx.beginPath();
                while (!pp.isEnd()) {
                    pp.nextCommand();
                    switch (pp.command) {
                        case 'M':
                        case 'm':
                            var p = pp.getAsCurrentPoint();
                            pp.addMarker(p);
                            bb.addPoint(p.x, p.y);
                            if (ctx != null) ctx.moveTo(p.x, p.y);
                            pp.start = pp.current;
                            while (!pp.isCommandOrEnd()) {
                                var p = pp.getAsCurrentPoint();
                                pp.addMarker(p, pp.start);
                                bb.addPoint(p.x, p.y);
                                if (ctx != null) ctx.lineTo(p.x, p.y);
                            }
                            break;
                        case 'L':
                        case 'l':
                            while (!pp.isCommandOrEnd()) {
                                var c = pp.current;
                                var p = pp.getAsCurrentPoint();
                                pp.addMarker(p, c);
                                bb.addPoint(p.x, p.y);
                                if (ctx != null) ctx.lineTo(p.x, p.y);
                            }
                            break;
                        case 'H':
                        case 'h':
                            while (!pp.isCommandOrEnd()) {
                                var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
                                pp.addMarker(newP, pp.current);
                                pp.current = newP;
                                bb.addPoint(pp.current.x, pp.current.y);
                                if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
                            }
                            break;
                        case 'V':
                        case 'v':
                            while (!pp.isCommandOrEnd()) {
                                var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
                                pp.addMarker(newP, pp.current);
                                pp.current = newP;
                                bb.addPoint(pp.current.x, pp.current.y);
                                if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
                            }
                            break;
                        case 'C':
                        case 'c':
                            while (!pp.isCommandOrEnd()) {
                                var curr = pp.current;
                                var p1 = pp.getPoint();
                                var cntrl = pp.getAsControlPoint();
                                var cp = pp.getAsCurrentPoint();
                                pp.addMarker(cp, cntrl, p1);
                                bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                                if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                            }
                            break;
                        case 'S':
                        case 's':
                            while (!pp.isCommandOrEnd()) {
                                var curr = pp.current;
                                var p1 = pp.getReflectedControlPoint();
                                var cntrl = pp.getAsControlPoint();
                                var cp = pp.getAsCurrentPoint();
                                pp.addMarker(cp, cntrl, p1);
                                bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                                if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                            }
                            break;
                        case 'Q':
                        case 'q':
                            while (!pp.isCommandOrEnd()) {
                                var curr = pp.current;
                                var cntrl = pp.getAsControlPoint();
                                var cp = pp.getAsCurrentPoint();
                                pp.addMarker(cp, cntrl, cntrl);
                                bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
                                if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
                            }
                            break;
                        case 'T':
                        case 't':
                            while (!pp.isCommandOrEnd()) {
                                var curr = pp.current;
                                var cntrl = pp.getReflectedControlPoint();
                                pp.control = cntrl;
                                var cp = pp.getAsCurrentPoint();
                                pp.addMarker(cp, cntrl, cntrl);
                                bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
                                if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
                            }
                            break;
                        case 'A':
                        case 'a':
                            while (!pp.isCommandOrEnd()) {
                                var curr = pp.current;
                                var rx = pp.getScalar();
                                var ry = pp.getScalar();
                                var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
                                var largeArcFlag = pp.getScalar();
                                var sweepFlag = pp.getScalar();
                                var cp = pp.getAsCurrentPoint();

                                // Conversion from endpoint to center parameterization
                                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                                // x1', y1'
                                var currp = new svg.Point(
                                    Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
                                    -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
                                );
                                // adjust radii
                                var l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
                                if (l > 1) {
                                    rx *= Math.sqrt(l);
                                    ry *= Math.sqrt(l);
                                }
                                // cx', cy'
                                var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
                                        ((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
                                        (Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
                                    );
                                if (isNaN(s)) s = 0;
                                var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
                                // cx, cy
                                var centp = new svg.Point(
                                    (curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
                                    (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
                                );
                                // vector magnitude
                                var m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); }
                                // ratio between two vectors
                                var r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) }
                                // angle between two vectors
                                var a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); }
                                // initial angle
                                var a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
                                // angle delta
                                var u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
                                var v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
                                var ad = a(u, v);
                                if (r(u,v) <= -1) ad = Math.PI;
                                if (r(u,v) >= 1) ad = 0;

                                // for markers
                                var dir = 1 - sweepFlag ? 1.0 : -1.0;
                                var ah = a1 + dir * (ad / 2.0);
                                var halfWay = new svg.Point(
                                    centp.x + rx * Math.cos(ah),
                                    centp.y + ry * Math.sin(ah)
                                );
                                pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
                                pp.addMarkerAngle(cp, ah - dir * Math.PI);

                                bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better
                                if (ctx != null) {
                                    var r = rx > ry ? rx : ry;
                                    var sx = rx > ry ? 1 : rx / ry;
                                    var sy = rx > ry ? ry / rx : 1;

                                    ctx.translate(centp.x, centp.y);
                                    ctx.rotate(xAxisRotation);
                                    ctx.scale(sx, sy);
                                    ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
                                    ctx.scale(1/sx, 1/sy);
                                    ctx.rotate(-xAxisRotation);
                                    ctx.translate(-centp.x, -centp.y);
                                }
                            }
                            break;
                        case 'Z':
                        case 'z':
                            if (ctx != null) ctx.closePath();
                            pp.current = pp.start;
                    }
                }

                return bb;
            }

            this.getMarkers = function() {
                var points = this.PathParser.getMarkerPoints();
                var angles = this.PathParser.getMarkerAngles();

                var markers = [];
                for (var i=0; i<points.length; i++) {
                    markers.push([points[i], angles[i]]);
                }
                return markers;
            }
        }
        svg.Element.path.prototype = new svg.Element.PathElementBase;

        // pattern element
        svg.Element.pattern = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.createPattern = function(ctx, element) {
                var width = this.attribute('width').toPixels('x', true);
                var height = this.attribute('height').toPixels('y', true);

                // render me using a temporary svg element
                var tempSvg = new svg.Element.svg();
                tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
                tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
                tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
                tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
                tempSvg.children = this.children;

                var c = document.createElement('canvas');
                c.width = width;
                c.height = height;
                var cctx = c.getContext('2d');
                if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
                    cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
                }
                // render 3x3 grid so when we transform there's no white space on edges
                for (var x=-1; x<=1; x++) {
                    for (var y=-1; y<=1; y++) {
                        cctx.save();
                        tempSvg.attributes['x'] = new svg.Property('x', x * c.width);
                        tempSvg.attributes['y'] = new svg.Property('y', y * c.height);
                        tempSvg.render(cctx);
                        cctx.restore();
                    }
                }
                var pattern = ctx.createPattern(c, 'repeat');
                return pattern;
            }
        }
        svg.Element.pattern.prototype = new svg.Element.ElementBase;

        // marker element
        svg.Element.marker = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.baseRender = this.render;
            this.render = function(ctx, point, angle) {
                ctx.translate(point.x, point.y);
                if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(angle);
                if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
                ctx.save();

                // render me using a temporary svg element
                var tempSvg = new svg.Element.svg();
                tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
                tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
                tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
                tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
                tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
                tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
                tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
                tempSvg.children = this.children;
                tempSvg.render(ctx);

                ctx.restore();
                if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(1/ctx.lineWidth, 1/ctx.lineWidth);
                if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(-angle);
                ctx.translate(-point.x, -point.y);
            }
        }
        svg.Element.marker.prototype = new svg.Element.ElementBase;

        // definitions element
        svg.Element.defs = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.render = function(ctx) {
                // NOOP
            }
        }
        svg.Element.defs.prototype = new svg.Element.ElementBase;

        // base for gradients
        svg.Element.GradientBase = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.stops = [];
            for (var i=0; i<this.children.length; i++) {
                var child = this.children[i];
                if (child.type == 'stop') this.stops.push(child);
            }

            this.getGradient = function() {
                // OVERRIDE ME!
            }

            this.gradientUnits = function () {
                return this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
            }

            this.attributesToInherit = ['gradientUnits'];

            this.inheritStopContainer = function (stopsContainer) {
                for (var i=0; i<this.attributesToInherit.length; i++) {
                    var attributeToInherit = this.attributesToInherit[i];
                    if (!this.attribute(attributeToInherit).hasValue() && stopsContainer.attribute(attributeToInherit).hasValue()) {
                        this.attribute(attributeToInherit, true).value = stopsContainer.attribute(attributeToInherit).value;
                    }
                }
            }

            this.createGradient = function(ctx, element, parentOpacityProp) {
                var stopsContainer = this;
                if (this.getHrefAttribute().hasValue()) {
                    stopsContainer = this.getHrefAttribute().getDefinition();
                    this.inheritStopContainer(stopsContainer);
                }

                var addParentOpacity = function (color) {
                    if (parentOpacityProp.hasValue()) {
                        var p = new svg.Property('color', color);
                        return p.addOpacity(parentOpacityProp).value;
                    }
                    return color;
                };

                var g = this.getGradient(ctx, element);
                if (g == null) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);
                for (var i=0; i<stopsContainer.stops.length; i++) {
                    g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
                }

                if (this.attribute('gradientTransform').hasValue()) {
                    // render as transformed pattern on temporary canvas
                    var rootView = svg.ViewPort.viewPorts[0];

                    var rect = new svg.Element.rect();
                    rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS/3.0);
                    rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS/3.0);
                    rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
                    rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);

                    var group = new svg.Element.g();
                    group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
                    group.children = [ rect ];

                    var tempSvg = new svg.Element.svg();
                    tempSvg.attributes['x'] = new svg.Property('x', 0);
                    tempSvg.attributes['y'] = new svg.Property('y', 0);
                    tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
                    tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
                    tempSvg.children = [ group ];

                    var c = document.createElement('canvas');
                    c.width = rootView.width;
                    c.height = rootView.height;
                    var tempCtx = c.getContext('2d');
                    tempCtx.fillStyle = g;
                    tempSvg.render(tempCtx);
                    return tempCtx.createPattern(c, 'no-repeat');
                }

                return g;
            }
        }
        svg.Element.GradientBase.prototype = new svg.Element.ElementBase;

        // linear gradient element
        svg.Element.linearGradient = function(node) {
            this.base = svg.Element.GradientBase;
            this.base(node);

            this.attributesToInherit.push('x1');
            this.attributesToInherit.push('y1');
            this.attributesToInherit.push('x2');
            this.attributesToInherit.push('y2');

            this.getGradient = function(ctx, element) {
                var bb = this.gradientUnits() == 'objectBoundingBox' ? element.getBoundingBox() : null;

                if (!this.attribute('x1').hasValue()
                    && !this.attribute('y1').hasValue()
                    && !this.attribute('x2').hasValue()
                    && !this.attribute('y2').hasValue()) {
                    this.attribute('x1', true).value = 0;
                    this.attribute('y1', true).value = 0;
                    this.attribute('x2', true).value = 1;
                    this.attribute('y2', true).value = 0;
                }

                var x1 = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.x() + bb.width() * this.attribute('x1').numValue()
                    : this.attribute('x1').toPixels('x'));
                var y1 = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.y() + bb.height() * this.attribute('y1').numValue()
                    : this.attribute('y1').toPixels('y'));
                var x2 = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.x() + bb.width() * this.attribute('x2').numValue()
                    : this.attribute('x2').toPixels('x'));
                var y2 = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.y() + bb.height() * this.attribute('y2').numValue()
                    : this.attribute('y2').toPixels('y'));

                if (x1 == x2 && y1 == y2) return null;
                return ctx.createLinearGradient(x1, y1, x2, y2);
            }
        }
        svg.Element.linearGradient.prototype = new svg.Element.GradientBase;

        // radial gradient element
        svg.Element.radialGradient = function(node) {
            this.base = svg.Element.GradientBase;
            this.base(node);

            this.attributesToInherit.push('cx');
            this.attributesToInherit.push('cy');
            this.attributesToInherit.push('r');
            this.attributesToInherit.push('fx');
            this.attributesToInherit.push('fy');

            this.getGradient = function(ctx, element) {
                var bb = element.getBoundingBox();

                if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
                if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
                if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';

                var cx = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.x() + bb.width() * this.attribute('cx').numValue()
                    : this.attribute('cx').toPixels('x'));
                var cy = (this.gradientUnits() == 'objectBoundingBox'
                    ? bb.y() + bb.height() * this.attribute('cy').numValue()
                    : this.attribute('cy').toPixels('y'));

                var fx = cx;
                var fy = cy;
                if (this.attribute('fx').hasValue()) {
                    fx = (this.gradientUnits() == 'objectBoundingBox'
                        ? bb.x() + bb.width() * this.attribute('fx').numValue()
                        : this.attribute('fx').toPixels('x'));
                }
                if (this.attribute('fy').hasValue()) {
                    fy = (this.gradientUnits() == 'objectBoundingBox'
                        ? bb.y() + bb.height() * this.attribute('fy').numValue()
                        : this.attribute('fy').toPixels('y'));
                }

                var r = (this.gradientUnits() == 'objectBoundingBox'
                    ? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue()
                    : this.attribute('r').toPixels());

                return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
            }
        }
        svg.Element.radialGradient.prototype = new svg.Element.GradientBase;

        // gradient stop element
        svg.Element.stop = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.offset = this.attribute('offset').numValue();
            if (this.offset < 0) this.offset = 0;
            if (this.offset > 1) this.offset = 1;

            var stopColor = this.style('stop-color', true);
            if (stopColor.value === '') stopColor.value = '#000';
            if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity'));
            this.color = stopColor.value;
        }
        svg.Element.stop.prototype = new svg.Element.ElementBase;

        // animation base element
        svg.Element.AnimateBase = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            svg.Animations.push(this);

            this.duration = 0.0;
            this.begin = this.attribute('begin').toMilliseconds();
            this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();

            this.getProperty = function() {
                var attributeType = this.attribute('attributeType').value;
                var attributeName = this.attribute('attributeName').value;

                if (attributeType == 'CSS') {
                    return this.parent.style(attributeName, true);
                }
                return this.parent.attribute(attributeName, true);
            };

            this.initialValue = null;
            this.initialUnits = '';
            this.removed = false;

            this.calcValue = function() {
                // OVERRIDE ME!
                return '';
            }

            this.update = function(delta) {
                // set initial value
                if (this.initialValue == null) {
                    this.initialValue = this.getProperty().value;
                    this.initialUnits = this.getProperty().getUnits();
                }

                // if we're past the end time
                if (this.duration > this.maxDuration) {
                    // loop for indefinitely repeating animations
                    if (this.attribute('repeatCount').value == 'indefinite'
                        || this.attribute('repeatDur').value == 'indefinite') {
                        this.duration = 0.0
                    }
                    else if (this.attribute('fill').valueOrDefault('remove') == 'freeze' && !this.frozen) {
                        this.frozen = true;
                        this.parent.animationFrozen = true;
                        this.parent.animationFrozenValue = this.getProperty().value;
                    }
                    else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
                        this.removed = true;
                        this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue;
                        return true;
                    }
                    return false;
                }
                this.duration = this.duration + delta;

                // if we're past the begin time
                var updated = false;
                if (this.begin < this.duration) {
                    var newValue = this.calcValue(); // tween

                    if (this.attribute('type').hasValue()) {
                        // for transform, etc.
                        var type = this.attribute('type').value;
                        newValue = type + '(' + newValue + ')';
                    }

                    this.getProperty().value = newValue;
                    updated = true;
                }

                return updated;
            }

            this.from = this.attribute('from');
            this.to = this.attribute('to');
            this.values = this.attribute('values');
            if (this.values.hasValue()) this.values.value = this.values.value.split(';');

            // fraction of duration we've covered
            this.progress = function() {
                var ret = { progress: (this.duration - this.begin) / (this.maxDuration - this.begin) };
                if (this.values.hasValue()) {
                    var p = ret.progress * (this.values.value.length - 1);
                    var lb = Math.floor(p), ub = Math.ceil(p);
                    ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
                    ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
                    ret.progress = (p - lb) / (ub - lb);
                }
                else {
                    ret.from = this.from;
                    ret.to = this.to;
                }
                return ret;
            }
        }
        svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;

        // animate element
        svg.Element.animate = function(node) {
            this.base = svg.Element.AnimateBase;
            this.base(node);

            this.calcValue = function() {
                var p = this.progress();

                // tween value linearly
                var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress;
                return newValue + this.initialUnits;
            };
        }
        svg.Element.animate.prototype = new svg.Element.AnimateBase;

        // animate color element
        svg.Element.animateColor = function(node) {
            this.base = svg.Element.AnimateBase;
            this.base(node);

            this.calcValue = function() {
                var p = this.progress();
                var from = new RGBColor(p.from.value);
                var to = new RGBColor(p.to.value);

                if (from.ok && to.ok) {
                    // tween color linearly
                    var r = from.r + (to.r - from.r) * p.progress;
                    var g = from.g + (to.g - from.g) * p.progress;
                    var b = from.b + (to.b - from.b) * p.progress;
                    return 'rgb('+parseInt(r,10)+','+parseInt(g,10)+','+parseInt(b,10)+')';
                }
                return this.attribute('from').value;
            };
        }
        svg.Element.animateColor.prototype = new svg.Element.AnimateBase;

        // animate transform element
        svg.Element.animateTransform = function(node) {
            this.base = svg.Element.AnimateBase;
            this.base(node);

            this.calcValue = function() {
                var p = this.progress();

                // tween value linearly
                var from = svg.ToNumberArray(p.from.value);
                var to = svg.ToNumberArray(p.to.value);
                var newValue = '';
                for (var i=0; i<from.length; i++) {
                    newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
                }
                return newValue;
            };
        }
        svg.Element.animateTransform.prototype = new svg.Element.animate;

        // font element
        svg.Element.font = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.horizAdvX = this.attribute('horiz-adv-x').numValue();

            this.isRTL = false;
            this.isArabic = false;
            this.fontFace = null;
            this.missingGlyph = null;
            this.glyphs = [];
            for (var i=0; i<this.children.length; i++) {
                var child = this.children[i];
                if (child.type == 'font-face') {
                    this.fontFace = child;
                    if (child.style('font-family').hasValue()) {
                        svg.Definitions[child.style('font-family').value] = this;
                    }
                }
                else if (child.type == 'missing-glyph') this.missingGlyph = child;
                else if (child.type == 'glyph') {
                    if (child.arabicForm != '') {
                        this.isRTL = true;
                        this.isArabic = true;
                        if (typeof this.glyphs[child.unicode] == 'undefined') this.glyphs[child.unicode] = [];
                        this.glyphs[child.unicode][child.arabicForm] = child;
                    }
                    else {
                        this.glyphs[child.unicode] = child;
                    }
                }
            }
        }
        svg.Element.font.prototype = new svg.Element.ElementBase;

        // font-face element
        svg.Element.fontface = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.ascent = this.attribute('ascent').value;
            this.descent = this.attribute('descent').value;
            this.unitsPerEm = this.attribute('units-per-em').numValue();
        }
        svg.Element.fontface.prototype = new svg.Element.ElementBase;

        // missing-glyph element
        svg.Element.missingglyph = function(node) {
            this.base = svg.Element.path;
            this.base(node);

            this.horizAdvX = 0;
        }
        svg.Element.missingglyph.prototype = new svg.Element.path;

        // glyph element
        svg.Element.glyph = function(node) {
            this.base = svg.Element.path;
            this.base(node);

            this.horizAdvX = this.attribute('horiz-adv-x').numValue();
            this.unicode = this.attribute('unicode').value;
            this.arabicForm = this.attribute('arabic-form').value;
        }
        svg.Element.glyph.prototype = new svg.Element.path;

        // text element
        svg.Element.text = function(node) {
            this.captureTextNodes = true;
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.baseSetContext = this.setContext;
            this.setContext = function(ctx) {
                this.baseSetContext(ctx);

                var textBaseline = this.style('dominant-baseline').toTextBaseline();
                if (textBaseline == null) textBaseline = this.style('alignment-baseline').toTextBaseline();
                if (textBaseline != null) ctx.textBaseline = textBaseline;
            }

            this.getBoundingBox = function () {
                var x = this.attribute('x').toPixels('x');
                var y = this.attribute('y').toPixels('y');
                var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
                return new svg.BoundingBox(x, y - fontSize, x + Math.floor(fontSize * 2.0 / 3.0) * this.children[0].getText().length, y);
            }

            this.renderChildren = function(ctx) {
                this.x = this.attribute('x').toPixels('x');
                this.y = this.attribute('y').toPixels('y');
                if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
                if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
                this.x += this.getAnchorDelta(ctx, this, 0);
                for (var i=0; i<this.children.length; i++) {
                    this.renderChild(ctx, this, this, i);
                }
            }

            this.getAnchorDelta = function (ctx, parent, startI) {
                var textAnchor = this.style('text-anchor').valueOrDefault('start');
                if (textAnchor != 'start') {
                    var width = 0;
                    for (var i=startI; i<parent.children.length; i++) {
                        var child = parent.children[i];
                        if (i > startI && child.attribute('x').hasValue()) break; // new group
                        width += child.measureTextRecursive(ctx);
                    }
                    return -1 * (textAnchor == 'end' ? width : width / 2.0);
                }
                return 0;
            }

            this.renderChild = function(ctx, textParent, parent, i) {
                var child = parent.children[i];
                if (child.attribute('x').hasValue()) {
                    child.x = child.attribute('x').toPixels('x') + textParent.getAnchorDelta(ctx, parent, i);
                    if (child.attribute('dx').hasValue()) child.x += child.attribute('dx').toPixels('x');
                }
                else {
                    if (child.attribute('dx').hasValue()) textParent.x += child.attribute('dx').toPixels('x');
                    child.x = textParent.x;
                }
                textParent.x = child.x + child.measureText(ctx);

                if (child.attribute('y').hasValue()) {
                    child.y = child.attribute('y').toPixels('y');
                    if (child.attribute('dy').hasValue()) child.y += child.attribute('dy').toPixels('y');
                }
                else {
                    if (child.attribute('dy').hasValue()) textParent.y += child.attribute('dy').toPixels('y');
                    child.y = textParent.y;
                }
                textParent.y = child.y;

                child.render(ctx);

                for (var i=0; i<child.children.length; i++) {
                    textParent.renderChild(ctx, textParent, child, i);
                }
            }
        }
        svg.Element.text.prototype = new svg.Element.RenderedElementBase;

        // text base
        svg.Element.TextElementBase = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.getGlyph = function(font, text, i) {
                var c = text[i];
                var glyph = null;
                if (font.isArabic) {
                    var arabicForm = 'isolated';
                    if ((i==0 || text[i-1]==' ') && i<text.length-2 && text[i+1]!=' ') arabicForm = 'terminal';
                    if (i>0 && text[i-1]!=' ' && i<text.length-2 && text[i+1]!=' ') arabicForm = 'medial';
                    if (i>0 && text[i-1]!=' ' && (i == text.length-1 || text[i+1]==' ')) arabicForm = 'initial';
                    if (typeof font.glyphs[c] != 'undefined') {
                        glyph = font.glyphs[c][arabicForm];
                        if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
                    }
                }
                else {
                    glyph = font.glyphs[c];
                }
                if (glyph == null) glyph = font.missingGlyph;
                return glyph;
            }

            this.renderChildren = function(ctx) {
                var customFont = this.parent.style('font-family').getDefinition();
                if (customFont != null) {
                    var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
                    var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
                    var text = this.getText();
                    if (customFont.isRTL) text = text.split("").reverse().join("");

                    var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
                    for (var i=0; i<text.length; i++) {
                        var glyph = this.getGlyph(customFont, text, i);
                        var scale = fontSize / customFont.fontFace.unitsPerEm;
                        ctx.translate(this.x, this.y);
                        ctx.scale(scale, -scale);
                        var lw = ctx.lineWidth;
                        ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
                        if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
                        glyph.render(ctx);
                        if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
                        ctx.lineWidth = lw;
                        ctx.scale(1/scale, -1/scale);
                        ctx.translate(-this.x, -this.y);

                        this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
                        if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
                            this.x += dx[i];
                        }
                    }
                    return;
                }

                if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
                if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
            }

            this.getText = function() {
                // OVERRIDE ME
            }

            this.measureTextRecursive = function(ctx) {
                var width = this.measureText(ctx);
                for (var i=0; i<this.children.length; i++) {
                    width += this.children[i].measureTextRecursive(ctx);
                }
                return width;
            }

            this.measureText = function(ctx) {
                var customFont = this.parent.style('font-family').getDefinition();
                if (customFont != null) {
                    var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
                    var measure = 0;
                    var text = this.getText();
                    if (customFont.isRTL) text = text.split("").reverse().join("");
                    var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
                    for (var i=0; i<text.length; i++) {
                        var glyph = this.getGlyph(customFont, text, i);
                        measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
                        if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
                            measure += dx[i];
                        }
                    }
                    return measure;
                }

                var textToMeasure = svg.compressSpaces(this.getText());
                if (!ctx.measureText) return textToMeasure.length * 10;

                ctx.save();
                this.setContext(ctx);
                var width = ctx.measureText(textToMeasure).width;
                ctx.restore();
                return width;
            }
        }
        svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase;

        // tspan
        svg.Element.tspan = function(node) {
            this.captureTextNodes = true;
            this.base = svg.Element.TextElementBase;
            this.base(node);

            this.text = svg.compressSpaces(node.value || node.text || node.textContent || '');
            this.getText = function() {
                // if this node has children, then they own the text
                if (this.children.length > 0) { return ''; }
                return this.text;
            }
        }
        svg.Element.tspan.prototype = new svg.Element.TextElementBase;

        // tref
        svg.Element.tref = function(node) {
            this.base = svg.Element.TextElementBase;
            this.base(node);

            this.getText = function() {
                var element = this.getHrefAttribute().getDefinition();
                if (element != null) return element.children[0].getText();
            }
        }
        svg.Element.tref.prototype = new svg.Element.TextElementBase;

        // a element
        svg.Element.a = function(node) {
            this.base = svg.Element.TextElementBase;
            this.base(node);

            this.hasText = node.childNodes.length > 0;
            for (var i=0; i<node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType != 3) this.hasText = false;
            }

            // this might contain text
            this.text = this.hasText ? node.childNodes[0].value : '';
            this.getText = function() {
                return this.text;
            }

            this.baseRenderChildren = this.renderChildren;
            this.renderChildren = function(ctx) {
                if (this.hasText) {
                    // render as text element
                    this.baseRenderChildren(ctx);
                    var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
                    svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));
                }
                else if (this.children.length > 0) {
                    // render as temporary group
                    var g = new svg.Element.g();
                    g.children = this.children;
                    g.parent = this;
                    g.render(ctx);
                }
            }

            this.onclick = function() {
                window.open(this.getHrefAttribute().value);
            }

            this.onmousemove = function() {
                svg.ctx.canvas.style.cursor = 'pointer';
            }
        }
        svg.Element.a.prototype = new svg.Element.TextElementBase;

        // image element
        svg.Element.image = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            var href = this.getHrefAttribute().value;
            if (href == '') { return; }
            var isSvg = href.match(/\.svg$/)

            svg.Images.push(this);
            this.loaded = false;
            if (!isSvg) {
                this.img = document.createElement('img');
                if (svg.opts['useCORS'] == true) { this.img.crossOrigin = 'Anonymous'; }
                var self = this;
                this.img.onload = function() { self.loaded = true; }
                this.img.onerror = function() { svg.log('ERROR: image "' + href + '" not found'); self.loaded = true; }
                this.img.src = href;
            }
            else {
                this.img = svg.ajax(href);
                this.loaded = true;
            }

            this.renderChildren = function(ctx) {
                var x = this.attribute('x').toPixels('x');
                var y = this.attribute('y').toPixels('y');

                var width = this.attribute('width').toPixels('x');
                var height = this.attribute('height').toPixels('y');
                if (width == 0 || height == 0) return;

                ctx.save();
                if (isSvg) {
                    ctx.drawSvg(this.img, x, y, width, height);
                }
                else {
                    ctx.translate(x, y);
                    svg.AspectRatio(ctx,
                        this.attribute('preserveAspectRatio').value,
                        width,
                        this.img.width,
                        height,
                        this.img.height,
                        0,
                        0);
                    ctx.drawImage(this.img, 0, 0);
                }
                ctx.restore();
            }

            this.getBoundingBox = function() {
                var x = this.attribute('x').toPixels('x');
                var y = this.attribute('y').toPixels('y');
                var width = this.attribute('width').toPixels('x');
                var height = this.attribute('height').toPixels('y');
                return new svg.BoundingBox(x, y, x + width, y + height);
            }
        }
        svg.Element.image.prototype = new svg.Element.RenderedElementBase;

        // group element
        svg.Element.g = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.getBoundingBox = function() {
                var bb = new svg.BoundingBox();
                for (var i=0; i<this.children.length; i++) {
                    bb.addBoundingBox(this.children[i].getBoundingBox());
                }
                return bb;
            };
        }
        svg.Element.g.prototype = new svg.Element.RenderedElementBase;

        // symbol element
        svg.Element.symbol = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.render = function(ctx) {
                // NO RENDER
            };
        }
        svg.Element.symbol.prototype = new svg.Element.RenderedElementBase;

        // style element
        svg.Element.style = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            // text, or spaces then CDATA
            var css = ''
            for (var i=0; i<node.childNodes.length; i++) {
                css += node.childNodes[i].data;
            }
            css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
            css = svg.compressSpaces(css); // replace whitespace
            var cssDefs = css.split('}');
            for (var i=0; i<cssDefs.length; i++) {
                if (svg.trim(cssDefs[i]) != '') {
                    var cssDef = cssDefs[i].split('{');
                    var cssClasses = cssDef[0].split(',');
                    var cssProps = cssDef[1].split(';');
                    for (var j=0; j<cssClasses.length; j++) {
                        var cssClass = svg.trim(cssClasses[j]);
                        if (cssClass != '') {
                            var props = svg.Styles[cssClass] || {};
                            for (var k=0; k<cssProps.length; k++) {
                                var prop = cssProps[k].indexOf(':');
                                var name = cssProps[k].substr(0, prop);
                                var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
                                if (name != null && value != null) {
                                    props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
                                }
                            }
                            svg.Styles[cssClass] = props;
                            svg.StylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
                            if (cssClass == '@font-face') {
                                var fontFamily = props['font-family'].value.replace(/"/g,'');
                                var srcs = props['src'].value.split(',');
                                for (var s=0; s<srcs.length; s++) {
                                    if (srcs[s].indexOf('format("svg")') > 0) {
                                        var urlStart = srcs[s].indexOf('url');
                                        var urlEnd = srcs[s].indexOf(')', urlStart);
                                        var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
                                        var doc = svg.parseXml(svg.ajax(url));
                                        var fonts = doc.getElementsByTagName('font');
                                        for (var f=0; f<fonts.length; f++) {
                                            var font = svg.CreateElement(fonts[f]);
                                            svg.Definitions[fontFamily] = font;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        svg.Element.style.prototype = new svg.Element.ElementBase;

        // use element
        svg.Element.use = function(node) {
            this.base = svg.Element.RenderedElementBase;
            this.base(node);

            this.baseSetContext = this.setContext;
            this.setContext = function(ctx) {
                this.baseSetContext(ctx);
                if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
                if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
            }

            var element = this.getHrefAttribute().getDefinition();

            this.path = function(ctx) {
                if (element != null) element.path(ctx);
            }

            this.getBoundingBox = function() {
                if (element != null) return element.getBoundingBox();
            }

            this.renderChildren = function(ctx) {
                if (element != null) {
                    var tempSvg = element;
                    if (element.type == 'symbol') {
                        // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
                        tempSvg = new svg.Element.svg();
                        tempSvg.type = 'svg';
                        tempSvg.attributes['viewBox'] = new svg.Property('viewBox', element.attribute('viewBox').value);
                        tempSvg.attributes['preserveAspectRatio'] = new svg.Property('preserveAspectRatio', element.attribute('preserveAspectRatio').value);
                        tempSvg.attributes['overflow'] = new svg.Property('overflow', element.attribute('overflow').value);
                        tempSvg.children = element.children;
                    }
                    if (tempSvg.type == 'svg') {
                        // if symbol or svg, inherit width/height from me
                        if (this.attribute('width').hasValue()) tempSvg.attributes['width'] = new svg.Property('width', this.attribute('width').value);
                        if (this.attribute('height').hasValue()) tempSvg.attributes['height'] = new svg.Property('height', this.attribute('height').value);
                    }
                    var oldParent = tempSvg.parent;
                    tempSvg.parent = null;
                    tempSvg.render(ctx);
                    tempSvg.parent = oldParent;
                }
            }
        }
        svg.Element.use.prototype = new svg.Element.RenderedElementBase;

        // mask element
        svg.Element.mask = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.apply = function(ctx, element) {
                // render as temp svg
                var x = this.attribute('x').toPixels('x');
                var y = this.attribute('y').toPixels('y');
                var width = this.attribute('width').toPixels('x');
                var height = this.attribute('height').toPixels('y');

                if (width == 0 && height == 0) {
                    var bb = new svg.BoundingBox();
                    for (var i=0; i<this.children.length; i++) {
                        bb.addBoundingBox(this.children[i].getBoundingBox());
                    }
                    var x = Math.floor(bb.x1);
                    var y = Math.floor(bb.y1);
                    var width = Math.floor(bb.width());
                    var	height = Math.floor(bb.height());
                }

                // temporarily remove mask to avoid recursion
                var mask = element.attribute('mask').value;
                element.attribute('mask').value = '';

                var cMask = document.createElement('canvas');
                cMask.width = x + width;
                cMask.height = y + height;
                var maskCtx = cMask.getContext('2d');
                this.renderChildren(maskCtx);

                var c = document.createElement('canvas');
                c.width = x + width;
                c.height = y + height;
                var tempCtx = c.getContext('2d');
                element.render(tempCtx);
                tempCtx.globalCompositeOperation = 'destination-in';
                tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
                tempCtx.fillRect(0, 0, x + width, y + height);

                ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
                ctx.fillRect(0, 0, x + width, y + height);

                // reassign mask
                element.attribute('mask').value = mask;
            }

            this.render = function(ctx) {
                // NO RENDER
            }
        }
        svg.Element.mask.prototype = new svg.Element.ElementBase;

        // clip element
        svg.Element.clipPath = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.apply = function(ctx) {
                var oldBeginPath = CanvasRenderingContext2D.prototype.beginPath;
                CanvasRenderingContext2D.prototype.beginPath = function () { };

                var oldClosePath = CanvasRenderingContext2D.prototype.closePath;
                CanvasRenderingContext2D.prototype.closePath = function () { };

                oldBeginPath.call(ctx);
                for (var i=0; i<this.children.length; i++) {
                    var child = this.children[i];
                    if (typeof child.path != 'undefined') {
                        var transform = null;
                        if (child.style('transform', false, true).hasValue()) {
                            transform = new svg.Transform(child.style('transform', false, true).value);
                            transform.apply(ctx);
                        }
                        child.path(ctx);
                        CanvasRenderingContext2D.prototype.closePath = oldClosePath;
                        if (transform) { transform.unapply(ctx); }
                    }
                }
                oldClosePath.call(ctx);
                ctx.clip();

                CanvasRenderingContext2D.prototype.beginPath = oldBeginPath;
                CanvasRenderingContext2D.prototype.closePath = oldClosePath;
            }

            this.render = function(ctx) {
                // NO RENDER
            }
        }
        svg.Element.clipPath.prototype = new svg.Element.ElementBase;

        // filters
        svg.Element.filter = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.apply = function(ctx, element) {
                // render as temp svg
                var bb = element.getBoundingBox();
                var x = Math.floor(bb.x1);
                var y = Math.floor(bb.y1);
                var width = Math.floor(bb.width());
                var	height = Math.floor(bb.height());

                // temporarily remove filter to avoid recursion
                var filter = element.style('filter').value;
                element.style('filter').value = '';

                var px = 0, py = 0;
                for (var i=0; i<this.children.length; i++) {
                    var efd = this.children[i].extraFilterDistance || 0;
                    px = Math.max(px, efd);
                    py = Math.max(py, efd);
                }

                var c = document.createElement('canvas');
                c.width = width + 2*px;
                c.height = height + 2*py;
                var tempCtx = c.getContext('2d');
                tempCtx.translate(-x + px, -y + py);
                element.render(tempCtx);

                // apply filters
                for (var i=0; i<this.children.length; i++) {
                    if (typeof this.children[i].apply == 'function') {
                        this.children[i].apply(tempCtx, 0, 0, width + 2*px, height + 2*py);
                    }
                }

                // render on me
                ctx.drawImage(c, 0, 0, width + 2*px, height + 2*py, x - px, y - py, width + 2*px, height + 2*py);

                // reassign filter
                element.style('filter', true).value = filter;
            }

            this.render = function(ctx) {
                // NO RENDER
            }
        }
        svg.Element.filter.prototype = new svg.Element.ElementBase;

        svg.Element.feMorphology = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.apply = function(ctx, x, y, width, height) {
                // TODO: implement
            }
        }
        svg.Element.feMorphology.prototype = new svg.Element.ElementBase;

        svg.Element.feComposite = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.apply = function(ctx, x, y, width, height) {
                // TODO: implement
            }
        }
        svg.Element.feComposite.prototype = new svg.Element.ElementBase;

        svg.Element.feColorMatrix = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            var matrix = svg.ToNumberArray(this.attribute('values').value);
            switch (this.attribute('type').valueOrDefault('matrix')) { // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
                case 'saturate':
                    var s = matrix[0];
                    matrix = [0.213+0.787*s,0.715-0.715*s,0.072-0.072*s,0,0,
                        0.213-0.213*s,0.715+0.285*s,0.072-0.072*s,0,0,
                        0.213-0.213*s,0.715-0.715*s,0.072+0.928*s,0,0,
                        0,0,0,1,0,
                        0,0,0,0,1];
                    break;
                case 'hueRotate':
                    var a = matrix[0] * Math.PI / 180.0;
                    var c = function (m1,m2,m3) { return m1 + Math.cos(a)*m2 + Math.sin(a)*m3; };
                    matrix = [c(0.213,0.787,-0.213),c(0.715,-0.715,-0.715),c(0.072,-0.072,0.928),0,0,
                        c(0.213,-0.213,0.143),c(0.715,0.285,0.140),c(0.072,-0.072,-0.283),0,0,
                        c(0.213,-0.213,-0.787),c(0.715,-0.715,0.715),c(0.072,0.928,0.072),0,0,
                        0,0,0,1,0,
                        0,0,0,0,1];
                    break;
                case 'luminanceToAlpha':
                    matrix = [0,0,0,0,0,
                        0,0,0,0,0,
                        0,0,0,0,0,
                        0.2125,0.7154,0.0721,0,0,
                        0,0,0,0,1];
                    break;
            }

            function imGet(img, x, y, width, height, rgba) {
                return img[y*width*4 + x*4 + rgba];
            }

            function imSet(img, x, y, width, height, rgba, val) {
                img[y*width*4 + x*4 + rgba] = val;
            }

            function m(i, v) {
                var mi = matrix[i];
                return mi * (mi < 0 ? v - 255 : v);
            }

            this.apply = function(ctx, x, y, width, height) {
                // assuming x==0 && y==0 for now
                var srcData = ctx.getImageData(0, 0, width, height);
                for (var y = 0; y < height; y++) {
                    for (var x = 0; x < width; x++) {
                        var r = imGet(srcData.data, x, y, width, height, 0);
                        var g = imGet(srcData.data, x, y, width, height, 1);
                        var b = imGet(srcData.data, x, y, width, height, 2);
                        var a = imGet(srcData.data, x, y, width, height, 3);
                        imSet(srcData.data, x, y, width, height, 0, m(0,r)+m(1,g)+m(2,b)+m(3,a)+m(4,1));
                        imSet(srcData.data, x, y, width, height, 1, m(5,r)+m(6,g)+m(7,b)+m(8,a)+m(9,1));
                        imSet(srcData.data, x, y, width, height, 2, m(10,r)+m(11,g)+m(12,b)+m(13,a)+m(14,1));
                        imSet(srcData.data, x, y, width, height, 3, m(15,r)+m(16,g)+m(17,b)+m(18,a)+m(19,1));
                    }
                }
                ctx.clearRect(0, 0, width, height);
                ctx.putImageData(srcData, 0, 0);
            }
        }
        svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase;

        svg.Element.feGaussianBlur = function(node) {
            this.base = svg.Element.ElementBase;
            this.base(node);

            this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
            this.extraFilterDistance = this.blurRadius;

            this.apply = function(ctx, x, y, width, height) {
                if (typeof stackBlur.canvasRGBA == 'undefined') {
                    svg.log('ERROR: StackBlur.js must be included for blur to work');
                    return;
                }

                // StackBlur requires canvas be on document
                ctx.canvas.id = svg.UniqueId();
                ctx.canvas.style.display = 'none';
                document.body.appendChild(ctx.canvas);
                stackBlur.canvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
                document.body.removeChild(ctx.canvas);
            }
        }
        svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase;

        // title element, do nothing
        svg.Element.title = function(node) {
        }
        svg.Element.title.prototype = new svg.Element.ElementBase;

        // desc element, do nothing
        svg.Element.desc = function(node) {
        }
        svg.Element.desc.prototype = new svg.Element.ElementBase;

        svg.Element.MISSING = function(node) {
            svg.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
        }
        svg.Element.MISSING.prototype = new svg.Element.ElementBase;

        // element factory
        svg.CreateElement = function(node) {
            var className = node.nodeName.replace(/^[^:]+:/,''); // remove namespace
            className = className.replace(/\-/g,''); // remove dashes
            var e = null;
            if (typeof svg.Element[className] != 'undefined') {
                e = new svg.Element[className](node);
            }
            else {
                e = new svg.Element.MISSING(node);
            }

            e.type = node.nodeName;
            return e;
        }

        // load from url
        svg.load = function(ctx, url) {
            svg.loadXml(ctx, svg.ajax(url));
        }

        // load from xml
        svg.loadXml = function(ctx, xml) {
            svg.loadXmlDoc(ctx, svg.parseXml(xml));
        }

        svg.loadXmlDoc = function(ctx, dom) {
            svg.init(ctx);

            var mapXY = function(p) {
                var e = ctx.canvas;
                while (e) {
                    p.x -= e.offsetLeft;
                    p.y -= e.offsetTop;
                    e = e.offsetParent;
                }
                if (window.scrollX) p.x += window.scrollX;
                if (window.scrollY) p.y += window.scrollY;
                return p;
            }

            // bind mouse
            if (svg.opts['ignoreMouse'] != true) {
                ctx.canvas.onclick = function(e) {
                    var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
                    svg.Mouse.onclick(p.x, p.y);
                };
                ctx.canvas.onmousemove = function(e) {
                    var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
                    svg.Mouse.onmousemove(p.x, p.y);
                };
            }

            var e = svg.CreateElement(dom.documentElement);
            e.root = true;
            e.addStylesFromStyleDefinition();

            // render loop
            var isFirstRender = true;
            var draw = function() {
                svg.ViewPort.Clear();
                if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);

                if (svg.opts['ignoreDimensions'] != true) {
                    // set canvas size
                    if (e.style('width').hasValue()) {
                        ctx.canvas.width = e.style('width').toPixels('x');
                        ctx.canvas.style.width = ctx.canvas.width + 'px';
                    }
                    if (e.style('height').hasValue()) {
                        ctx.canvas.height = e.style('height').toPixels('y');
                        ctx.canvas.style.height = ctx.canvas.height + 'px';
                    }
                }
                var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
                var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
                if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
                    cWidth = e.style('width').toPixels('x');
                    cHeight = e.style('height').toPixels('y');
                }
                svg.ViewPort.SetCurrent(cWidth, cHeight);

                if (svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
                if (svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];
                if (svg.opts['scaleWidth'] != null || svg.opts['scaleHeight'] != null) {
                    var xRatio = null, yRatio = null, viewBox = svg.ToNumberArray(e.attribute('viewBox').value);

                    if (svg.opts['scaleWidth'] != null) {
                        if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth'];
                        else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts['scaleWidth'];
                    }

                    if (svg.opts['scaleHeight'] != null) {
                        if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight'];
                        else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts['scaleHeight'];
                    }

                    if (xRatio == null) { xRatio = yRatio; }
                    if (yRatio == null) { yRatio = xRatio; }

                    e.attribute('width', true).value = svg.opts['scaleWidth'];
                    e.attribute('height', true).value = svg.opts['scaleHeight'];
                    e.style('transform', true, true).value += ' scale('+(1.0/xRatio)+','+(1.0/yRatio)+')';
                }

                // clear and render
                if (svg.opts['ignoreClear'] != true) {
                    ctx.clearRect(0, 0, cWidth, cHeight);
                }
                e.render(ctx);
                if (isFirstRender) {
                    isFirstRender = false;
                    if (typeof svg.opts['renderCallback'] == 'function') svg.opts['renderCallback'](dom);
                }
            }

            var waitingForImages = true;
            if (svg.ImagesLoaded()) {
                waitingForImages = false;
                draw();
            }
            svg.intervalID = setInterval(function() {
                var needUpdate = false;

                if (waitingForImages && svg.ImagesLoaded()) {
                    waitingForImages = false;
                    needUpdate = true;
                }

                // need update from mouse events?
                if (svg.opts['ignoreMouse'] != true) {
                    needUpdate = needUpdate | svg.Mouse.hasEvents();
                }

                // need update from animations?
                if (svg.opts['ignoreAnimation'] != true) {
                    for (var i=0; i<svg.Animations.length; i++) {
                        needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
                    }
                }

                // need update from redraw?
                if (typeof svg.opts['forceRedraw'] == 'function') {
                    if (svg.opts['forceRedraw']() == true) needUpdate = true;
                }

                // render if needed
                if (needUpdate) {
                    draw();
                    svg.Mouse.runEvents(); // run and clear our events
                }

                // FREEGROUP Patch
                // canvg didn't stop the interval is we didn't need the animation. In this case
                // the DOM tree isn't cleanup correct. Memory Leak
                // Reported by Michael Norgate 16.04.2015
                //
                if (svg.opts['ignoreAnimation']===true || isFirstRender===false && waitingForImages===false) {
                    svg.stop();
                }
            }, 1000 / svg.FRAMERATE);
        }

        svg.stop = function() {
            if (svg.intervalID) {
                clearInterval(svg.intervalID);
            }
        }

        svg.Mouse = new (function() {
            this.events = [];
            this.hasEvents = function() { return this.events.length != 0; }

            this.onclick = function(x, y) {
                this.events.push({ type: 'onclick', x: x, y: y,
                    run: function(e) { if (e.onclick) e.onclick(); }
                });
            }

            this.onmousemove = function(x, y) {
                this.events.push({ type: 'onmousemove', x: x, y: y,
                    run: function(e) { if (e.onmousemove) e.onmousemove(); }
                });
            }

            this.eventElements = [];

            this.checkPath = function(element, ctx) {
                for (var i=0; i<this.events.length; i++) {
                    var e = this.events[i];
                    if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
                }
            }

            this.checkBoundingBox = function(element, bb) {
                for (var i=0; i<this.events.length; i++) {
                    var e = this.events[i];
                    if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
                }
            }

            this.runEvents = function() {
                svg.ctx.canvas.style.cursor = '';

                for (var i=0; i<this.events.length; i++) {
                    var e = this.events[i];
                    var element = this.eventElements[i];
                    while (element) {
                        e.run(element);
                        element = element.parent;
                    }
                }

                // done running, clear
                this.events = [];
                this.eventElements = [];
            }
        });

        return svg;
    };

    if (typeof CanvasRenderingContext2D  != 'undefined') {
        CanvasRenderingContext2D.prototype.drawSvg = function(s, dx, dy, dw, dh, opts) {
            var cOpts = {
                ignoreMouse: true,
                ignoreAnimation: true,
                ignoreDimensions: true,
                ignoreClear: true,
                offsetX: dx,
                offsetY: dy,
                scaleWidth: dw,
                scaleHeight: dh
            }

            for(var prop in opts) {
                if(opts.hasOwnProperty(prop)){
                    cOpts[prop] = opts[prop];
                }
            }
            canvg(this.canvas, s, cOpts);
        }
    }

    return canvg;

}));

},{"./rgbcolor.js":28,"./stackblur.min.js":29}],28:[function(require,module,exports){
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}


},{}],29:[function(require,module,exports){
(function (global){
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.StackBlur=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a,b,c,d){if("string"==typeof a)var a=document.getElementById(a);else if("undefined"!=typeof HTMLImageElement&&!a instanceof HTMLImageElement)return;var e=a.naturalWidth,g=a.naturalHeight;if("string"==typeof b)var b=document.getElementById(b);else if("undefined"!=typeof HTMLCanvasElement&&!b instanceof HTMLCanvasElement)return;b.style.width=e+"px",b.style.height=g+"px",b.width=e,b.height=g;var i=b.getContext("2d");i.clearRect(0,0,e,g),i.drawImage(a,0,0),isNaN(c)||c<1||(d?f(b,0,0,e,g,c):h(b,0,0,e,g,c))}function e(a,b,c,d,e){if("string"==typeof a)var a=document.getElementById(a);else if("undefined"!=typeof HTMLCanvasElement&&!a instanceof HTMLCanvasElement)return;var f,g=a.getContext("2d");try{try{f=g.getImageData(b,c,d,e)}catch(h){throw new Error("unable to access local image data: "+h)}}catch(h){throw new Error("unable to access image data: "+h)}return f}function f(a,b,c,d,f,h){if(!(isNaN(h)||h<1)){h|=0;var i=e(a,b,c,d,f);i=g(i,b,c,d,f,h),a.getContext("2d").putImageData(i,b,c)}}function g(a,b,c,d,e,f){var g,h,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H=a.data,I=f+f+1,J=d-1,K=e-1,L=f+1,M=L*(L+1)/2,N=new j,O=N;for(i=1;i<I;i++)if(O=O.next=new j,i==L)var P=O;O.next=N;var Q=null,R=null;p=o=0;var S=k[f],T=l[f];for(h=0;h<e;h++){for(y=z=A=B=q=r=s=t=0,u=L*(C=H[o]),v=L*(D=H[o+1]),w=L*(E=H[o+2]),x=L*(F=H[o+3]),q+=M*C,r+=M*D,s+=M*E,t+=M*F,O=N,i=0;i<L;i++)O.r=C,O.g=D,O.b=E,O.a=F,O=O.next;for(i=1;i<L;i++)m=o+((J<i?J:i)<<2),q+=(O.r=C=H[m])*(G=L-i),r+=(O.g=D=H[m+1])*G,s+=(O.b=E=H[m+2])*G,t+=(O.a=F=H[m+3])*G,y+=C,z+=D,A+=E,B+=F,O=O.next;for(Q=N,R=P,g=0;g<d;g++)H[o+3]=F=t*S>>T,0!=F?(F=255/F,H[o]=(q*S>>T)*F,H[o+1]=(r*S>>T)*F,H[o+2]=(s*S>>T)*F):H[o]=H[o+1]=H[o+2]=0,q-=u,r-=v,s-=w,t-=x,u-=Q.r,v-=Q.g,w-=Q.b,x-=Q.a,m=p+((m=g+f+1)<J?m:J)<<2,y+=Q.r=H[m],z+=Q.g=H[m+1],A+=Q.b=H[m+2],B+=Q.a=H[m+3],q+=y,r+=z,s+=A,t+=B,Q=Q.next,u+=C=R.r,v+=D=R.g,w+=E=R.b,x+=F=R.a,y-=C,z-=D,A-=E,B-=F,R=R.next,o+=4;p+=d}for(g=0;g<d;g++){for(z=A=B=y=r=s=t=q=0,o=g<<2,u=L*(C=H[o]),v=L*(D=H[o+1]),w=L*(E=H[o+2]),x=L*(F=H[o+3]),q+=M*C,r+=M*D,s+=M*E,t+=M*F,O=N,i=0;i<L;i++)O.r=C,O.g=D,O.b=E,O.a=F,O=O.next;for(n=d,i=1;i<=f;i++)o=n+g<<2,q+=(O.r=C=H[o])*(G=L-i),r+=(O.g=D=H[o+1])*G,s+=(O.b=E=H[o+2])*G,t+=(O.a=F=H[o+3])*G,y+=C,z+=D,A+=E,B+=F,O=O.next,i<K&&(n+=d);for(o=g,Q=N,R=P,h=0;h<e;h++)m=o<<2,H[m+3]=F=t*S>>T,F>0?(F=255/F,H[m]=(q*S>>T)*F,H[m+1]=(r*S>>T)*F,H[m+2]=(s*S>>T)*F):H[m]=H[m+1]=H[m+2]=0,q-=u,r-=v,s-=w,t-=x,u-=Q.r,v-=Q.g,w-=Q.b,x-=Q.a,m=g+((m=h+L)<K?m:K)*d<<2,q+=y+=Q.r=H[m],r+=z+=Q.g=H[m+1],s+=A+=Q.b=H[m+2],t+=B+=Q.a=H[m+3],Q=Q.next,u+=C=R.r,v+=D=R.g,w+=E=R.b,x+=F=R.a,y-=C,z-=D,A-=E,B-=F,R=R.next,o+=d}return a}function h(a,b,c,d,f,g){if(!(isNaN(g)||g<1)){g|=0;var h=e(a,b,c,d,f);h=i(h,b,c,d,f,g),a.getContext("2d").putImageData(h,b,c)}}function i(a,b,c,d,e,f){var g,h,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=a.data,E=f+f+1,F=d-1,G=e-1,H=f+1,I=H*(H+1)/2,J=new j,K=J;for(i=1;i<E;i++)if(K=K.next=new j,i==H)var L=K;K.next=J;var M=null,N=null;p=o=0;var O=k[f],P=l[f];for(h=0;h<e;h++){for(w=x=y=q=r=s=0,t=H*(z=D[o]),u=H*(A=D[o+1]),v=H*(B=D[o+2]),q+=I*z,r+=I*A,s+=I*B,K=J,i=0;i<H;i++)K.r=z,K.g=A,K.b=B,K=K.next;for(i=1;i<H;i++)m=o+((F<i?F:i)<<2),q+=(K.r=z=D[m])*(C=H-i),r+=(K.g=A=D[m+1])*C,s+=(K.b=B=D[m+2])*C,w+=z,x+=A,y+=B,K=K.next;for(M=J,N=L,g=0;g<d;g++)D[o]=q*O>>P,D[o+1]=r*O>>P,D[o+2]=s*O>>P,q-=t,r-=u,s-=v,t-=M.r,u-=M.g,v-=M.b,m=p+((m=g+f+1)<F?m:F)<<2,w+=M.r=D[m],x+=M.g=D[m+1],y+=M.b=D[m+2],q+=w,r+=x,s+=y,M=M.next,t+=z=N.r,u+=A=N.g,v+=B=N.b,w-=z,x-=A,y-=B,N=N.next,o+=4;p+=d}for(g=0;g<d;g++){for(x=y=w=r=s=q=0,o=g<<2,t=H*(z=D[o]),u=H*(A=D[o+1]),v=H*(B=D[o+2]),q+=I*z,r+=I*A,s+=I*B,K=J,i=0;i<H;i++)K.r=z,K.g=A,K.b=B,K=K.next;for(n=d,i=1;i<=f;i++)o=n+g<<2,q+=(K.r=z=D[o])*(C=H-i),r+=(K.g=A=D[o+1])*C,s+=(K.b=B=D[o+2])*C,w+=z,x+=A,y+=B,K=K.next,i<G&&(n+=d);for(o=g,M=J,N=L,h=0;h<e;h++)m=o<<2,D[m]=q*O>>P,D[m+1]=r*O>>P,D[m+2]=s*O>>P,q-=t,r-=u,s-=v,t-=M.r,u-=M.g,v-=M.b,m=g+((m=h+H)<G?m:G)*d<<2,q+=w+=M.r=D[m],r+=x+=M.g=D[m+1],s+=y+=M.b=D[m+2],M=M.next,t+=z=N.r,u+=A=N.g,v+=B=N.b,w-=z,x-=A,y-=B,N=N.next,o+=d}return a}function j(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var k=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],l=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];b.exports={image:d,canvasRGBA:f,canvasRGB:h,imageDataRGBA:g,imageDataRGB:i}},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[24]);
