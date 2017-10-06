import { connect } from 'react-redux';
import CodeHelper from '../components/sidebar/code-helper';
import { codeEditorAppendCode, codeEditorChangeCode } from '../actions/code-editor';
import { CodeGenerator } from '../CodeGenerator/CodeGenerator';

const mapStateToProps = ({ eventList, usedTois }) => ({
  eventList,
  usedTois,
});

const mapDispatchToProps = dispatch => ({
  generateCode: (eventList, usedTois) =>
    () => dispatch(codeEditorAppendCode(CodeGenerator(eventList, usedTois, false))),
  resetCodeEditor: () => dispatch(codeEditorChangeCode('')),
});

const CodeHelperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeHelper);

export default CodeHelperContainer;
