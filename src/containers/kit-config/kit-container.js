import { connect } from 'react-redux';
import Kit from '../../apps/kit-config/kit';
import { fetchAvailableWifis, selectWifi, connectWifi, resetWifi } from '../../actions/kit-config/kit-config';

const mapStateToProps = ({ kitConfig: { wifiConfig, selectedKit } }) => ({
  ...wifiConfig,
  selectedKit,
});

const mapDispatchToProps = dispatch => ({
  fetchWifis: hostIp => dispatch(fetchAvailableWifis(hostIp)),
  selectWifi: wifi => () => dispatch(selectWifi(wifi)),
  changePwd: wifi => dispatch(selectWifi(wifi)),
  connectWifi: (hostIp, wifi) => dispatch(connectWifi(hostIp, wifi)),
  resetWifi: () => dispatch(resetWifi()),
});

const KitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Kit);

export default KitContainer;
