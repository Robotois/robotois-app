import { connect } from 'react-redux';
import Workspace from '../components/main-panel/workspace';

const mapStateToProps = ({ toolbar: { workspace }, appMenu: { key } }) => ({
  workspace,
  currentApp: key,
});

const WorkspaceContainer = connect(
  mapStateToProps,
  null,
)(Workspace);

export default WorkspaceContainer;
