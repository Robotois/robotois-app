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
