import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../tois-list/ItemTypes';

const canvasTarget = {
  drop(props, monitor) {
    Robotois.dropCoordinates = monitor.getSourceClientOffset();
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isDragging: monitor,
  };
}

class VisualEditor extends React.Component {
  componentDidMount() {
    const shield = new draw2d.shape.robotois.Shield();
    const canvas = new draw2d.Canvas('canvas');
    canvas.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
    canvas.installEditPolicy(new draw2d.robotois.DragConnectionCreatePolicy());
    /*
    No keyboard events, this will disable deleting tois with DEL key
     */
    canvas.uninstallEditPolicy('draw2d.policy.canvas.DefaultKeyboardPolicy');
    // canvas.installEditPolicy(new draw2d.robotois.KeyboardPolicy());

    // canvas.on('figure:add', (emitter, event) => {
    //   console.log("figure id:", event.figure.id);
    // });
    console.log('width:', canvas.getWidth(), 'height:', canvas.getHeight());
    // we center canvas
    canvas.add(shield, (canvas.getWidth() / 2) - 213, (canvas.getHeight() / 2) - 75);
    Robotois.CANVAS = canvas;
    Robotois.canvasDOMRef = document.getElementById('canvas');
  }
  render() {
    const { connectDropTarget, isOver, visible } = this.props;
    return connectDropTarget(
      <div
        id="canvas"
        style={{
          border: isOver ? '1px solid #5764C6' : 'none',
          visibility: visible ? 'visible' : 'hidden',
          width: '100%',
        }}
      />,
    );
  }
}

VisualEditor.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.TOIITEM, canvasTarget, collect)(VisualEditor);
