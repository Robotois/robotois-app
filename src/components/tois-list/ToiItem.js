import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import ItemTypes from './ItemTypes';
import ShapeTypes from './ShapeTypes';

let offsetX = 0;

const getMousePos = function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.x - rect.left) + offsetX,
    y: evt.y - rect.top,
  };
};

const toiItemSource = {
  beginDrag(props) {
    return props.toi;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    let position;
    // console.log('endDrag-component:', props);
    if (dropResult) {
      position = getMousePos(Robotois.canvasDOMRef, Robotois.dropCoordinates);
      const figure = new ShapeTypes[item.type]();
      Robotois.CANVAS.add(figure, position.x, position.y);
      props.addUsedToi({ ...item, figureId: figure.id });
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class ToiItem extends React.Component {
  onMouseDown(e) {
    offsetX = e.nativeEvent.clientX - 32;
  }
  render() {
    const { toi, connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        role="presentation"
        className="tile toi-item"
        onMouseDown={this.onMouseDown}
      >
        <div className="tile-icon">
          <img
            src={toi.image}
            alt={toi.title}
            className="img-responsive"
          />
        </div>
        <div className="tile-content">
          <p className="tile-title">{toi.title}</p>
          <p className="tile-subtitle">{toi.description}</p>
        </div>
      </div>,
    );
  }
}

ToiItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  toi: PropTypes.object.isRequired,
};

export default DragSource(ItemTypes.TOIITEM, toiItemSource, collect)(ToiItem);
