import React from 'react';
// import { deleteInstance, updateInstace } from './EventConfig/manage-events';

// const deleteFromUsedTois = (figureId, itemType) => {
//   const usedTois = Session.get('usedTois') || [];
//   // Remove the selected Toi
//   const remainingTois = usedTois.filter(toi => toi.figureId !== figureId);
//   // Filter the Tois that are of different type than the current one
//   const otherTypes = remainingTois.filter(toi => toi.type !== itemType);
//   // Filter the same type of Tois, this will be used to stablish the new instance order
//   const sameType = remainingTois.filter(toi => toi.type === itemType);
//
//   sameType.sort((a, b) => a.instance - b.instance);
//   const newOrder = sameType.reduce(
//     (result, toi, index) => {
//       updateInstace(toi.type, toi.figureId, index + 1);
//       return result.concat({
//         ...toi,
//         instance: index + 1
//       });
//     },
//     []
//   );
//   const newUsedTois = newOrder.concat(otherTypes);
//   Session.set('usedTois', newUsedTois);
//   console.log('newUsedTois: ', newUsedTois);
// };

export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem() {
    const { type, instance, deleteInstance, deleteToi } = this.props;
    const figureId = window.Robotois.selectedFigure.id;
    const command = new window.draw2d.command.CommandDelete(window.Robotois.selectedFigure);
    window.Robotois.CANVAS.getCommandStack().execute(command);
    deleteInstance(type, instance);
    deleteToi(figureId, type);
    // deleteFromUsedTois(figureId, type);
  }

  render() {
    return (
      <button className="btn btn-lg btn-link" onClick={this.deleteItem}>
        <span className="text-error">Borrar</span>
      </button>
    );
  }
}
