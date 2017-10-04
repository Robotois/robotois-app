import React from 'react';
import axios from 'axios';
import AvailableNetworks from './available-networks';
import WifiModal from './wifi-modal';
// import HOSTNAME from '../../hostname';

const Header = ({ ip, hostname, handleCreateAP, handleShutdown }) => (
  <div className="tile">
    <div className="tile-content">
      <p className="tile-title h5">Nombre del Kit: <em>{hostname}</em></p>
      <p className="tile-subtitle text-gray h6">La dirección IP del kit es: {ip}</p>
    </div>
    <div className="tile-action">
      <button className="btn btn-primary m-1" onClick={handleCreateAP}>Crear Access Point</button>
      <button className="btn btn-link label label-warning m-1" onClick={handleShutdown}>apagar</button>
    </div>
  </div>
);

const defaultWifi = {
  ssid: '',
  pwd: '',
};

/**
 * [state description]
 * @type {Object}
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wifi: undefined,
      modal: false,
    };
    this.modalClose = this.modalClose.bind(this);
    this.selectNetwork = this.selectNetwork.bind(this);
    this.openModal = this.openModal.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleCreateAP = this.handleCreateAP.bind(this);
    this.handleShutdown = this.handleShutdown.bind(this);
  }
  componentWillMount() {
    this.setState({
      wifi: defaultWifi,
    });
  }
  modalClose() {
    this.setState({
      wifi: defaultWifi,
      modal: false,
    });
  }
  selectNetwork(ssid) {
    return () => this.openModal(ssid);
  }
  openModal(ssid) {
    this.setState({
      wifi: { ssid, pwd: '' },
      modal: true,
    });
  }
  changePwd(ev) {
    const pwd = ev.target.value;
    const { wifi } = this.state;
    this.setState({ wifi: { ...wifi, pwd } });
  }

  handleCreateAP() {
    const { match } = this.props;
    axios({
      method: 'get',
      url: `http://${match.params.ip}:8082/wifi/start-ap`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleShutdown() {
    const { match } = this.props;
    axios({
      method: 'get',
      url: `http://${match.params.ip}:8082/shutdown`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleConnect() {
    // console.log('wifi:', this.state.wifi);
    const { match } = this.props;
    axios({
      method: 'post',
      // baseURL: 'http://192.168.1.75:8082',
      url: `http://${match.params.ip}:8082/wifi/connect`,
      data: { ...this.state.wifi },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.modalClose();
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { networks, loading, match } = this.props;
    console.log('match:', match);
    return (
      <div>
        <Header
          ip={match.params.ip}
          hostname={match.params.hostname}
          handleCreateAP={this.handleCreateAP}
          handleShutdown={this.handleShutdown}
        />
        <AvailableNetworks
          networks={networks}
          loading={loading}
          selectNetwork={this.selectNetwork}
        />
        <WifiModal
          {...this.state}
          changePwd={this.changePwd}
          handleConnect={this.handleConnect}
          modalClose={this.modalClose}
        />
      </div>
    );
  }
}

export default App;
