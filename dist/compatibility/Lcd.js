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
