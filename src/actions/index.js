export const addCurrentSelection = currentSelection => ({
  type: 'ADD_CURRENT_SELECTION',
  currentSelection,
});

export const removeCurrentSelection = () => ({
  type: 'REMOVE_CURRENT_SELECTION',
});

export const changeInputToiSelection = selectedToi => ({
  type: 'CHANGE_INPUT_TOI_SELECTION',
  selectedToi,
});

export const changeInputToi = inputToi => ({
  type: 'CHANGE_INPUT_TOI',
  inputToi,
});
