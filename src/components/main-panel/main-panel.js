import React from 'react';
import TabMenu from './tab-menu';
import VisualEditor from './VisualEditor';

const MainPanel = () => (
  <div className="column">
    <TabMenu />
    <div className="workspace">
      <VisualEditor visible />
    </div>
  </div>
);

export default MainPanel;
