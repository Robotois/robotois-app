import { connect } from 'react-redux';
import ToisList from '../components/tois-list/ToisList';
import { getVisibleTois } from '../reducers/used-tois';

const mapStateToProps = ({ usedTois, form: { task } }) => {
  const query = task && task.values ? task.values.task : '';
  return ({
    visibleTois: getVisibleTois(usedTois, query),
  });
};

const ToisContainer = connect(
  mapStateToProps,
  null,
)(ToisList);

export default ToisContainer;
