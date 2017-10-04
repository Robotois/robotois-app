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
