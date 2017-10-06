import React from 'react';
// import brace from 'brace';
// import AceEditor from 'react-ace';
// import 'brace/mode/javascript';
// import 'brace/theme/tomorrow';
import CodeEditorContainer from '../../containers/code-editor-container';
import ToolbarContainer from '../../containers/toolbar-container';
import VisualEditor from './VisualEditor';

const MainPanel = ({ workspace }) => (
  <div className="column">
    <ToolbarContainer />
    <div className="workspace">
      <CodeEditorContainer />
      <VisualEditor visible={workspace === 'Visual'} />
    </div>
  </div>
);

export default MainPanel;
