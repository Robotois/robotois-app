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
