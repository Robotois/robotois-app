import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace, toolbarChangeApp } from '../actions/toolbar';
import { udpateStatus } from '../actions/status-bar';
import { runCode, stopCode } from '../actions/kit-config/kit-config';
// import { appMenuChangeApp } from '../actions/app-menu';

const mapStateToProps = ({
  toolbar: { workspace, currentApp },
  kitConfig: { selectedKit, response },
  codeEditor: { code },
  eventList,
  usedTois,
}) => ({
  workspace,
  selectedKit,
  eventList,
  usedTois,
  response,
  code,
  currentApp,
});

const mapDispatchToProps = dispatch => ({
  changeWorkspace: workspace => () => dispatch(toolbarChangeWorkspace(workspace)),
  changeApp: app => () => dispatch(toolbarChangeApp(app)),
  runCode: (hostIp, data) => dispatch(runCode(hostIp, data)),
  stopCode: hostIp => dispatch(stopCode(hostIp)),
  udpateStatus: (success, message) => dispatch(udpateStatus(success, message)),
});

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default ToolbarContainer;
