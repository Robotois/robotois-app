import { connect } from 'react-redux';
import Dashboard from '../../apps/dashboard';
import { requestTopic } from '../../actions/dashboard-actions';

const getSelected = topics => topics.filter(to => to.selected);

const mapStateToProps = ({ dashboard: { topics } }) => ({
  selected: getSelected(topics),
});

const mapDispatchToProps = dispatch => ({
  requestTopic: topic => requestTopic(topic),
});

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
