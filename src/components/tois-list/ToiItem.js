import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import ItemTypes from './ItemTypes';
// import ShapeTypes from './ShapeTypes';

let offsetX = 0;

const addUsedTois = (item, figureId) => {
  const usedTois = Session.get('usedTois') || [];
  const lastInstance = usedTois.reduce(
    (count, toi) => {
      if (toi.type === item.type) {
        if (toi.instance > count) {
          return toi.instance;
        }
      }
      return count;
    },
    0
  );
  usedTois.push({
    type: item.type,
    hasEvents: item.hasEvents,
    instance: lastInstance !== 0 ? lastInstance + 1 : 1,
    figureId,
  });
  // console.log('usedTois: ', usedTois);
  Session.set('usedTois', usedTois);
};

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
    if (dropResult) {
      // position = getMousePos(Robotois.canvasDOMRef, Robotois.dropCoordinates);
      // const figure = new ShapeTypes[item.type]();
      // Robotois.CANVAS.add(figure, position.x, position.y);
      // addUsedTois(item, figure.id);
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
        role="link"
        className="card toi-item"
        onMouseDown={this.onMouseDown}
      >
        <div className="card-header">
          <div className="card-subtitle">{toi.title}</div>
        </div>
        <div className="card-image col-mx-auto">
          <img
            src={toi.image}
            alt={toi.title}
            className="img-responsive"
            style={{ transform: 'rotate(90deg)' }}
            width="50px"
          />
        </div>
      </div>,
    );
  }
}

ToiItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  toi: PropTypes.object.isRequired
};

export default DragSource(ItemTypes.TOIITEM, toiItemSource, collect)(ToiItem);
