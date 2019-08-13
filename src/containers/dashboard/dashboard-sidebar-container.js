import { connect } from 'react-redux';
import DashboardSidebar from '../../apps/dashboard/sidebar/dashboard-sidebar';
import {
  fetchAvailableTopics,
  // buildTopicCategories,
  selectToi,
} from '../../actions/dashboard-actions';
import { buildTopicCategories, getCategories } from './transformer'

const mapStateToProps = ({
  dashboard: { topics, isFetching, toiState, showTois },
}) => ({
  // categories: buildTopicCategories(topics),
  isFetching,
  categories: getCategories(toiState, showTois)
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: () => dispatch(fetchAvailableTopics()),
  selectToi: toi => () => dispatch(selectToi(toi)),
});

const DashboardSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardSidebar);

export default DashboardSidebarContainer;
