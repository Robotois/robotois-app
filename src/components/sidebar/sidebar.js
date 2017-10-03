import React from 'react';
import ToisListContainer from '../../containers/tois-list-conatiner';
import ItemDetailContainer from '../../containers/item-detail-container';

const SideBar = ({ currentSelection }) => (
  <div className="column col-3 tois-panel">
    {currentSelection ? <ItemDetailContainer /> : <ToisListContainer />}
  </div>
);

export default SideBar;
