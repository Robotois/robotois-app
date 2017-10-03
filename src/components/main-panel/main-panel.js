import React from 'react';
import Toolbar from './Toolbar';
import VisualEditor from './VisualEditor';

const MainPanel = () => (
  <div className="column">
    <Toolbar />
    <div className="workspace">
      <VisualEditor visible />
    </div>
  </div>
);

export default MainPanel;
