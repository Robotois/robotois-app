import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace } from '../actions/toolbar';
import { appMenuChangeApp } from '../actions/app-menu';

const mapStateToProps = ({ toolbar: { workspace } }) => ({
  workspace,
});

const mapDispatchToProps = dispatch => ({
  changeWorkspace: workspace => () => dispatch(toolbarChangeWorkspace(workspace)),
  changeApp: opt => () => dispatch(appMenuChangeApp(opt)),
});

const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar);

export default ToolbarContainer;
