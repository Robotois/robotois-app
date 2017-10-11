import { connect } from 'react-redux';
import ConfigSidebar from '../../apps/kit-config/sidebar/config-sidebar';
import { resetSelectedKit } from '../../actions/kit-config/kit-config';
import { toolbarAppReset } from '../../actions/toolbar';

const mapStateToProps = ({ kitConfig: { selectedKit } }) => ({
  selectedKit,
});

const mapDispatchToProps = dispatch => ({
  resetSelectedKit: () => dispatch(resetSelectedKit()),
  appReset: () => dispatch(toolbarAppReset()),
});

const ConfigSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigSidebar);

export default ConfigSidebarContainer;
