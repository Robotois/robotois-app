import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace, toolbarChangeApp } from '../actions/toolbar';
import { updateMessage } from '../actions/status-bar';
import { runCode, stopCode } from '../actions/kit-config/kit-config';

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
  changeWorkspace: workspace => () => dispatch(toolbarChangeWorkspace(workspace)),
  changeApp: app => () => dispatch(toolbarChangeApp(app)),
  runCode: (hostIp, data) => dispatch(runCode(hostIp, data)),
  stopCode: hostIp => dispatch(stopCode(hostIp)),
  updateMessage: message => dispatch(updateMessage(message)),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;
