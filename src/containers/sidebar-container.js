import { connect } from 'react-redux';
import Sidebar from '../components/sidebar/sidebar';

const mapStateToProps = ({ currentSelection, toolbar: { workspace } }) => ({
  currentSelection,
  workspace,
});

const SidebarContainer = connect(
  mapStateToProps,
  null,
)(Sidebar);

export default SidebarContainer;
