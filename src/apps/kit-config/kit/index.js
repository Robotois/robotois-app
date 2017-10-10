import React from 'react';
import AvailableWifis from './available-wifis';
import WifiModal from './wifi-modal';

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

class App extends React.Component {
  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
  }

  componentDidMount() {
    const { fetchWifis, selectedKit: { ip } } = this.props;
    fetchWifis(ip);
  }

  handleConnect() {
    const { selectedWifi, connectWifi, selectedKit: { ip } } = this.props;
    connectWifi(ip, selectedWifi);
  }

  render() {
    const {
      wifis,
      isFetching,
      selectedWifi,
      selectWifi,
      changePwd,
      selectedKit,
      resetWifi,
    } = this.props;
    // console.log('Kit:', this.props);
    return (
      <div className="col-9 my-2 centered">
        <Header
          ip={selectedKit.ip}
          hostname={selectedKit.hostname}
          // handleCreateAP={this.handleCreateAP}
          // handleShutdown={this.handleShutdown}
        />
        <AvailableWifis
          wifis={wifis}
          loading={isFetching}
          selectWifi={selectWifi}
        />
        {
          selectedWifi && <WifiModal
            selectedWifi={selectedWifi}
            changePwd={changePwd}
            handleConnect={this.handleConnect}
            handleClose={resetWifi}
          />
        }
      </div>
    );
  }
}

export default App;
