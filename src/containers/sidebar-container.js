import { connect } from 'react-redux';
import Sidebar from '../components/sidebar/sidebar';
import { changeMenuSelection } from '../actions';

const mapStateToProps = ({ currentSelection }) => ({
  currentSelection,
});

const mapDispatchToProps = dispatch => ({
  changeSelection: item => () => dispatch(changeMenuSelection(item)),
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;
