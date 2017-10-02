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
