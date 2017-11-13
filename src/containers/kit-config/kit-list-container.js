import { connect } from 'react-redux';
import { fetchAvailableKits, kitSelection } from '../../actions/kit-config/kit-config';
import KitList from '../../apps/kit-config/kit-list';

const mapStateToProps = ({ kitConfig: { isFetching, kits } }) => ({
  isFetching,
  kits,
});

const mapDispatchToProps = dispatch => ({
  fetchKits: () => dispatch(fetchAvailableKits()),
  selectKit: kit => () => dispatch(kitSelection(kit)),
});

const KitListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KitList);

export default KitListContainer;
