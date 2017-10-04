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
