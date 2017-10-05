import React from 'react';
import ToisListContainer from '../../containers/tois-list-conatiner';
import ToiDetailContainer from '../../containers/toi-detail-container';

const SideBar = ({ currentSelection }) => (
  <div className="column col-3 tois-panel">
    {currentSelection ? <ToiDetailContainer /> : <ToisListContainer />}
  </div>
);

export default SideBar;
