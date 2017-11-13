import React from 'react';
import CodeEditorContainer from '../../containers/code-editor-container';
import VisualEditor from './VisualEditor';
import KitConfigContainer from '../../containers/kit-config/kit-config-container';
import DashboardContainer from '../../containers/dashboard/dashboard-container';

const AppsWorkspace = ({ currentApp }) => {
  switch (currentApp) {
    case 'kitConfig':
      return <KitConfigContainer />;
    case 'dashboard':
      return <DashboardContainer />;
    default:
      return false;
  }
};

const Workspace = ({ workspace, currentApp }) => (
  <div className="workspace">
    <AppsWorkspace currentApp={currentApp} />
    <CodeEditorContainer />
    <VisualEditor visible={workspace === 'Visual' && currentApp === 'main'} />
  </div>
);

export default Workspace;
