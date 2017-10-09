// import { combineReducers } from 'redux';

const defaultInputToi = {
  inputToi: undefined,
};

const defaultSelectedToi = {
  selectedToi: 'none',
};

const initialState = {
  ...defaultSelectedToi,
  ...defaultInputToi,
};

const changeInputToiSelection = (state, action) => (action.selectedToi !== 'none' ?
  {
    ...state,
    selectedToi: action.selectedToi,
  } :
  {
    ...state,
    ...defaultInputToi,
    selectedToi: action.selectedToi,
  });

const inputToi = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT_TOI_SELECTION':
      return changeInputToiSelection(state, action);
    case 'CHANGE_INPUT_TOI':
      return {
        ...state,
        inputToi: action.inputToi,
      };
    default:
      return state;
  }
};

export default inputToi;
