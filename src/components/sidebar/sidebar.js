import React from 'react';
import CodeHelperContainer from '../../containers/code-helper-container';
import ToisListContainer from '../../containers/tois-list-conatiner';
import ToiDetailContainer from '../../containers/toi-detail-container';

import ConfigSidebarContainer from '../../containers/kit-config/config-sidebar-container';
import DashboardSidebarContainer from '../../containers/dashboard/dashboard-sidebar-container';

const AppsSidebar = ({ currentApp }) => {
  switch (currentApp) {
    case 'kitConfig':
      return <ConfigSidebarContainer />;
    case 'dashboard':
      return <DashboardSidebarContainer />;
    default:
      return false;
  }
};

const MainContent = ({ currentSelection, workspace }) => {
  switch (true) {
    case workspace === 'JavaScript':
      return <CodeHelperContainer />;
    case currentSelection !== null:
      return <ToiDetailContainer />;
    default:
      return <ToisListContainer />;
  }
};

const Sidebar = ({ currentSelection, workspace, currentApp, hide }) => {
  return hide ? null : (
    <div className="column col-3 side-bar">
      <AppsSidebar currentApp={currentApp} />
      {currentApp === 'main' && (
        <MainContent
          currentSelection={currentSelection}
          workspace={workspace}
        />
      )}
    </div>
  );
};

export default Sidebar;
