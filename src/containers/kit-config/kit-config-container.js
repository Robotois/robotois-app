import { connect } from 'react-redux';
import KitConfig from '../../apps/kit-config';

const mapStateToProps = ({ kitConfig: { selectedKit } }) => ({
  selectedKit,
});

const KitConfigContainer = connect(
  mapStateToProps,
  null,
)(KitConfig);

export default KitConfigContainer;
