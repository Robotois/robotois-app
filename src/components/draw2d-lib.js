import React from 'react';

const Draw2d = ({ addCurrentSelection, selection }) => {
  window.addSelection = addCurrentSelection;
  window.currentSelection = selection;
  return (false);
};

export default Draw2d;
