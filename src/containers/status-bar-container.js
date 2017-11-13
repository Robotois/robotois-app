import { connect } from 'react-redux';
import StatusBar from '../components/main-panel/StatusBar';

const mapStateToProps = ({ statusBar: { online, message } }) => ({
  online,
  message,
});

const StatusBarContainer = connect(
  mapStateToProps,
  null,
)(StatusBar);

export default StatusBarContainer;
