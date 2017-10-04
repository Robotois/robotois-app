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
