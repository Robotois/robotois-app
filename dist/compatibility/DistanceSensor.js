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
