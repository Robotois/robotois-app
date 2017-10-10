import React from 'react';
import ToolbarContainer from '../../containers/toolbar-container';
import WorkspaceContainer from '../../containers/workspace-container';

const MainPanel = () => (
  <div className="column center-panel ">
    <ToolbarContainer />
    <WorkspaceContainer />
  </div>
);

export default MainPanel;
