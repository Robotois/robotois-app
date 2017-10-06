import Enums from '../utils/Enums';
import ToisDescription from '../api/tois';

export function getCurrentToi(currentSelection, usedTois) {
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
  const currentToi = usedTois.find(toi => toi.figureId === currentSelection.figureId);
  const toiDescription = ToisDescription.find(element => element.type === type);
  return {
    ...toiDescription,
    ...currentToi,
    // isDragging: currentSelection.isDragging,
  };
}

const currentSelection = (state = null, action) => {
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
