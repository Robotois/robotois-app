import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace, toolbarChangeApp } from '../actions/toolbar';
import { codeEditorAppendCode, codeEditorChangeCode } from '../actions/code-editor';
import { updateMessage } from '../actions/status-bar';
import { runCode, stopCode } from '../actions/kit-config/kit-config';
import { CodeGenerator } from '../CodeGenerator/CodeGenerator';

const topicList = topics => topics.map(topic => topic.topic);

const mapStateToProps = ({
  toolbar: { workspace, currentApp },
  kitConfig: { selectedKit },
  codeEditor: { code },
  eventList,
  usedTois,
  statusBar: { online, runner },
  dashboard: { topics },
}) => ({
  workspace,
  selectedKit,
  eventList,
  usedTois,
  online,
  runner,
  code,
  currentApp,
  topicList: topicList(topics),
});

const mapDispatchToProps = dispatch => ({
  changeWorkspace: workspace => () =>
    dispatch(toolbarChangeWorkspace(workspace)),
  changeApp: app => () => dispatch(toolbarChangeApp(app)),
  runCode: (hostIp, data) => dispatch(runCode(hostIp, data)),
  stopCode: (hostIp, topics) => dispatch(stopCode(hostIp, topics)),
  updateMessage: message => dispatch(updateMessage(message)),
  generateBlocklyCode: blocklyCode =>
    dispatch(codeEditorAppendCode(blocklyCode)),
  generateCode: (eventList, usedTois) => () =>
    dispatch(codeEditorAppendCode(CodeGenerator(eventList, usedTois, false))),
  resetCodeEditor: () => dispatch(codeEditorChangeCode('')),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;
