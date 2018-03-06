import { connect } from 'react-redux';
import DashboardSidebar from '../../apps/dashboard/sidebar/dashboard-sidebar';
import {
  fetchAvailableTopics,
  buildTopicCategories,
  selectTopic,
} from '../../actions/dashboard-actions';

const mapStateToProps = ({
  dashboard: { topics, isFetching },
}) => ({
  categories: buildTopicCategories(topics),
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: () => dispatch(fetchAvailableTopics()),
  selectTopic: topic => () => dispatch(selectTopic(topic)),
});

const DashboardSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardSidebar);

export default DashboardSidebarContainer;
