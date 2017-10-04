import Enums from '../utils/Enums';
import ToisDescription from '../api/tois';

export function getCurrentItem(currentSelection, usedTois) {
  if (!currentSelection) {
    return undefined;
  }
  const type = Enums[currentSelection.figureClass];
  // console.log('selectedFigure: ', selectedFigure);
  if (type === 'shield') {
    return {
      type,
      title: 'Tarjeta Robotois',
      image: 'img/tois/shield-robotois.svg',
      // isDragging: currentSelection.isDragging,
      description: 'Esta es la tarjeta robotois y nos sirve para conectar todos nuestros componentes',
    };
  }
  const toi = usedTois.find(item => item.figureId === currentSelection.figureId);
  const itemDescription = ToisDescription.find(element => element.type === type);
  return {
    ...itemDescription,
    ...toi,
    // isDragging: currentSelection.isDragging,
  };
}

const currentSelection = (state = '', action) => {
  switch (action.type) {
    case 'ADD_CURRENT_SELECTION':
      return action.currentSelection;
    case 'REMOVE_CURRENT_SELECTION':
      return undefined;
    default:
      return state;
  }
};

export default currentSelection;
