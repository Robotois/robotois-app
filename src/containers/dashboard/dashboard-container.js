import { connect } from 'react-redux';
import Dashboard from '../../apps/dashboard';
import { getTopicInfo } from '../../actions/dashboard-actions';

const getSelected = topics => topics.filter(to => to.selected);

const buildChartData = data => data.map(d => ({ Valor: d }));

const mapStateToProps = ({ dashboard: { topics } }) => ({
  selected: getSelected(topics),
});

// {
//   const selected = getSelected(topics);
//   if (selected) {
//     const info = getTopicInfo(selected.topic);
//     const title = `${info[1]} ${info[2]}`;
//     return {
//       data: buildChartData(selected.data),
//       title,
//     };
//   }
//   return {};
// };

const DashboardContainer = connect(
  mapStateToProps,
  null,
)(Dashboard);

export default DashboardContainer;
