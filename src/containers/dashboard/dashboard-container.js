import { connect } from 'react-redux';
import Dashboard from '../../apps/dashboard';
import { getTopicInfo } from '../../actions/dashboard-actions';

const getSelected = topics => topics.filter(to => to.selected);

const buildChartData = data => data.map(d => ({ Valor: d }));

const mapStateToProps = ({ dashboard: { topics } }) => ({
  selected: getSelected(topics),
});

const DashboardContainer = connect(
  mapStateToProps,
  null,
)(Dashboard);

export default DashboardContainer;
