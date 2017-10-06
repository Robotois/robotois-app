import React from 'react';
import CodeHelperContainer from '../../containers/code-helper-container';
import ToisListContainer from '../../containers/tois-list-conatiner';
import ToiDetailContainer from '../../containers/toi-detail-container';

const renderer = (currentSelection, workspace) => {
  console.log('currentSelection:', currentSelection);
  switch (true) {
    case workspace === 'JavaScript':
      return <CodeHelperContainer />;
    case currentSelection !== null:
      return <ToiDetailContainer />;
    default:
      return <ToisListContainer />;
  }
};

const SideBar = ({ currentSelection, workspace }) => (
  <div className="column col-3 tois-panel">
    {renderer(currentSelection, workspace)}
  </div>
);

export default SideBar;
