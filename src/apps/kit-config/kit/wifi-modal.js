import React from 'react';

const Header = ({ ssid, handleClose }) => (
  <div className="modal-header">
    <button className="btn btn-clear float-right" onClick={handleClose} />
    <div className="modal-title h5">Password para: {`"${ssid}"`}</div>
  </div>
);

const Body = ({ pwd, handleChangePwd }) => (
  <div className="modal-body">
    <div className="content">
      <input
        className="form-input"
        type="password"
        id="wifi-pass"
        placeholder="Password de la Red"
        onChange={handleChangePwd}
        value={pwd}
      />
    </div>
  </div>
);

const Footer = ({ handleConnect }) => (
  <div className="modal-footer">
    <button className="btn btn-primary" onClick={handleConnect}>
      Conectarse
    </button>
  </div>
);

class WifiModal extends React.Component {
  constructor() {
    super();
    this.handleChangePwd = this.handleChangePwd.bind(this);
  }

  handleChangePwd(ev) {
    const { selectedWifi, changePwd } = this.props;
    changePwd({ ...selectedWifi, pwd: ev.target.value });
  }

  render() {
    const { selectedWifi, handleConnect, handleClose } = this.props;
    return (
      <div className="modal active">
        <div className="modal-overlay" />
        <div className="modal-container col-6">
          <Header ssid={selectedWifi.ssid} handleClose={handleClose} />
          <Body pwd={selectedWifi.pwd} handleChangePwd={this.handleChangePwd} />
          <Footer handleConnect={handleConnect} />
        </div>
      </div>
    );
  }
}
export default WifiModal;
