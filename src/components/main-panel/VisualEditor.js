import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../sidebar/ItemTypes';

const canvasTarget = {
  drop(props, monitor) {
    window.Robotois.dropCoordinates = monitor.getSourceClientOffset();
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
    const shield = new window.draw2d.shape.robotois.Shield();
    const canvas = new window.draw2d.Canvas('canvas');
    canvas.installEditPolicy(new window.draw2d.policy.canvas.ShowGridEditPolicy());
    canvas.installEditPolicy(new window.draw2d.robotois.DragConnectionCreatePolicy());
    /*
    No keyboard events, this will disable deleting tois with DEL key
     */
    canvas.uninstallEditPolicy('draw2d.policy.canvas.DefaultKeyboardPolicy');
    // canvas.installEditPolicy(new draw2d.robotois.KeyboardPolicy());

    // canvas.on('figure:add', (emitter, event) => {
    //   console.log("figure id:", event.figure.id);
    // });
    // console.log('width:', canvas.getWidth(), 'height:', canvas.getHeight());
    // we center canvas
    canvas.add(shield, (canvas.getWidth() / 2) - 213, (canvas.getHeight() / 2) - 75);
    window.Robotois.CANVAS = canvas;
    window.Robotois.canvasDOMRef = document.getElementById('canvas');
    // canvas.setDimension(1680, 1050);
    // setTimeout(() => canvas.setDimension(1680, 1050), 500);
  }

  componentWillReceiveProps({ width, height }) {
    console.log('receivedProps:', width, height);
    if (width !== undefined && height !== undefined) {
      window.Robotois.CANVAS.setDimension(width, height);
    }
  }

  render() {
    const { connectDropTarget, isOver, visible, height, width } = this.props;
    // console.log('dimensions:', height, width);
    return connectDropTarget((
      <div
        id="canvas"
        style={{
          border: isOver ? '2px solid #5764C6' : 'none',
          display: visible ? 'block' : 'none',
          width: '100%',
          height: '100%',
        }}
      />
    ));
  }
}

VisualEditor.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.TOIITEM, canvasTarget, collect)(VisualEditor);
