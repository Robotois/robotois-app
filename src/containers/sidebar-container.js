import { connect } from 'react-redux';
import Sidebar from '../components/sidebar/sidebar';

const mapStateToProps = ({
  currentSelection,
  toolbar: { workspace, currentApp: { key } },
}) => ({
  currentSelection,
  workspace,
  currentApp: key,
  hide: ['Bloques', 'JavaScript'].includes(workspace),
});

const SidebarContainer = connect(mapStateToProps, null)(Sidebar);

export default SidebarContainer;
