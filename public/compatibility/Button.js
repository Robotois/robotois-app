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
