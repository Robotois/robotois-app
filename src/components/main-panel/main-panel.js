import React from 'react';
// import brace from 'brace';
// import AceEditor from 'react-ace';
// import 'brace/mode/javascript';
// import 'brace/theme/tomorrow';
import CodeEditorContainer from '../../containers/code-editor-container';
import ToolbarContainer from '../../containers/toolbar-container';
import VisualEditor from './VisualEditor';

const renderActiveComponent = (type) => {
  switch (type) {
    case 'JavaScript':
      return <CodeEditorContainer />;
    case 'Visual':
      return <VisualEditor visible />;
    default:
      return <div>Bloques</div>;
  }
};

const MainPanel = ({ workspace }) =>
  (<div className="column center-panel">
    <ToolbarContainer />
    <div className="workspace">
      {renderActiveComponent(workspace)}
    </div>
  </div>);

export default MainPanel;
