import React from 'react';
// import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const CodeEditor = ({ active, code, changeCode }) =>
  (<div className={`code-editor col-12 ${active ? '' : 'd-hide'}`}>
    <AceEditor
      mode="javascript"
      theme={'tomorrow'}
      name="code-editor"
      height="100%"
      width="100%"
      fontSize={18}
      value={code}
      onChange={changeCode}
      wrapEnabled
      // readOnly
      // onChange={this.onChangeEditor}
      editorProps={{ $blockScrolling: true }}
    />

  </div>);

export default CodeEditor;
