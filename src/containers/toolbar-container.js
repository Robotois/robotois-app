import { connect } from 'react-redux';
import Toolbar from '../components/main-panel/Toolbar';
import { toolbarChangeWorkspace } from '../actions/toolbar';

const mapStateToProps = ({ toolbar: { workspace } }) => ({
  workspace,
});

const mapDispatchToProps = dispatch => ({
  changeWorkspace: workspace => () => dispatch(toolbarChangeWorkspace(workspace)),
});

const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar);

export default ToolbarContainer;
