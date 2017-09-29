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
    Session.set('currentSelection', {
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
    Session.set('currentSelection', null);
    Robotois.selectedFigure = null;
  },

  onDrag(canvas, figure) {
    this._super(canvas, figure);
    const currentSelection = Session.get('currentSelection');
    if (!currentSelection.isDragging) {
      Session.set('currentSelection', {
        figureClass: figure.cssClass.replace('draw2d_shape_robotois_', ''),
        figureId: figure.id,
        isDragging: true,
      });
    }
  },
  onDragEnd(canvas, figure) {
    this._super(canvas, figure);
    Session.set('currentSelection', {
      figureClass: figure.cssClass.replace('draw2d_shape_robotois_', ''),
      figureId: figure.id,
      isDragging: false,
    });
  },
});
