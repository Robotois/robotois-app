import { connect } from 'react-redux';
import CodeEditor from '../components/main-panel/code-editor';
import { codeEditorChangeCode } from '../actions/code-editor';

const mapStateToProps = ({
  codeEditor: { code },
  toolbar: { workspace, currentApp: { key } },
}) => ({
  active: workspace === 'Javascript' && key === 'main',
  code,
});

const mapDispatchToProps = dispatch => ({
  changeCode: newCode => dispatch(codeEditorChangeCode(newCode)),
});

const CodeEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeEditor);

export default CodeEditorContainer;
