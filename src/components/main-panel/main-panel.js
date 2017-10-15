import React from 'react';
import ToolbarContainer from '../../containers/toolbar-container';
import WorkspaceContainer from '../../containers/workspace-container';
import StatusBarContainer from '../../containers/status-bar-container';
// import StatusBar from './StatusBar';

const MainPanel = () =>
  (<div className="column center-panel">
    <ToolbarContainer />
    <WorkspaceContainer />
    <StatusBarContainer />
  </div>);

export default MainPanel;
