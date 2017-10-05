import { connect } from 'react-redux';
import ToisList from '../components/sidebar/ToisList';
import { getVisibleTois } from '../reducers/used-tois';
import { addUsedToi } from '../actions';

const mapStateToProps = ({ usedTois, form: { searchForm } }) => {
  const query = searchForm && searchForm.values ? searchForm.values.query : '';
  return ({
    visibleTois: getVisibleTois(usedTois, query),
  });
};

const mapDispatchToProps = dispatch => ({
  addUsedToi: toi => dispatch(addUsedToi(toi)),
});

const ToisContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToisList);

export default ToisContainer;
