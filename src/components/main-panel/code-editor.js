import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const CodeEditor = ({ active, code, changeCode }) => (
  <div className={`${active ? '' : 'd-hide'}`} style={{ width: '100%', height: '100%' }}>
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
      // value={'console.log("Hello Ace");'}
      // readOnly
      // onChange={this.onChangeEditor}
      editorProps={{ $blockScrolling: Infinity }}
    />
  </div>
);

export default CodeEditor;
