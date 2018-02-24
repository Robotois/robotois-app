import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace, toolbarChangeApp } from '../actions/toolbar';
import { codeEditorAppendCode, codeEditorChangeCode } from '../actions/code-editor';
import { updateMessage } from '../actions/status-bar';
import { runCode, stopCode } from '../actions/kit-config/kit-config';
import { CodeGenerator } from '../CodeGenerator/CodeGenerator';


const mapStateToProps = ({
  toolbar: { workspace, currentApp },
  kitConfig: { selectedKit },
  codeEditor: { code },
  eventList,
  usedTois,
  statusBar: { online, runner },
}) => ({
  workspace,
  selectedKit,
  eventList,
  usedTois,
  online,
  runner,
  code,
  currentApp,
});

const mapDispatchToProps = dispatch => ({
  changeWorkspace: workspace => () =>
    dispatch(toolbarChangeWorkspace(workspace)),
  changeApp: app => () => dispatch(toolbarChangeApp(app)),
  runCode: (hostIp, data) => dispatch(runCode(hostIp, data)),
  stopCode: hostIp => dispatch(stopCode(hostIp)),
  updateMessage: message => dispatch(updateMessage(message)),
  generateBlocklyCode: blocklyCode =>
    dispatch(codeEditorAppendCode(blocklyCode)),
  generateCode: (eventList, usedTois) => () =>
    dispatch(codeEditorAppendCode(CodeGenerator(eventList, usedTois, false))),
  resetCodeEditor: () => dispatch(codeEditorChangeCode('')),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;
