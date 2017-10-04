const initialState = {
  menuSelection: 'Tois',
};

const menuSelection = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTION':
      return {
        menuSelection: action.menuSelection,
      };
    default:
      return state;
  }
};

export default menuSelection;
