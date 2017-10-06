import { connect } from 'react-redux';
import MainPanel from '../components/main-panel/main-panel';

const mapStateToProps = ({ toolbar: { workspace } }) => ({
  workspace,
});

const MainPanelContainer = connect(
  mapStateToProps,
  null,
)(MainPanel);

export default MainPanelContainer;
