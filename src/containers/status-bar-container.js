import { connect } from 'react-redux';
import StatusBar from '../components/main-panel/StatusBar';


const mapStateToProps = ({ status: { success, message } }) => ({
  success,
  message,
});


const StatusBarContainer = connect(
  mapStateToProps,
  null,
)(StatusBar);

export default StatusBarContainer;
