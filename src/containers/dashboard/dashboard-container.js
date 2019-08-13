import { connect } from 'react-redux';
import Dashboard from '../../apps/dashboard';
import { requestTopic } from '../../actions/dashboard-actions';
import { getChartData } from './transformer'

const getSelected = (toiState, showTois) => Object.keys(toiState).reduce(
  (result, categoryKey) => {
    const category = toiState[categoryKey]
    const tois = Object.keys(category).reduce(
      (res, toiKey) => showTois.find(item => toiKey === item)
        ? res.concat({ id: toiKey, ...getChartData(category[toiKey]) })
        : res,
      []
    )
    return result.concat(tois)
  },
  []
)

const mapStateToProps = ({ dashboard: { toiState, showTois } }) => ({
  selected: getSelected(toiState, showTois),
});

const mapDispatchToProps = dispatch => ({
  requestTopic: topic => requestTopic(topic),
});

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
