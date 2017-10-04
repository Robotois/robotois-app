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
