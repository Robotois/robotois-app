export const addUsedToi = toi => ({
  type: 'ADD_USED_TOI',
  toi,
});

export const addCurrentSelection = currentSelection => ({
  type: 'ADD_CURRENT_SELECTION',
  currentSelection,
});

export const removeCurrentSelection = () => ({
  type: 'REMOVE_CURRENT_SELECTION',
});
