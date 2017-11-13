import { connect } from 'react-redux';
import DashboardSidebar from '../../apps/dashboard/sidebar/dashboard-sidebar';
import {
  fetchAvailableTopics,
  buildTopicCategories,
  selectTopic,
} from '../../actions/dashboard-actions';

const mapStateToProps = ({
  kitConfig: { selectedKit },
  dashboard: { topics, isFetching },
}) => ({
  hostIp: selectedKit ? selectedKit.ip : undefined,
  categories: buildTopicCategories(topics),
  isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: hostIp => dispatch(fetchAvailableTopics(hostIp)),
  selectTopic: topic => () => dispatch(selectTopic(topic)),
});

const DashboardSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardSidebar);

export default DashboardSidebarContainer;
