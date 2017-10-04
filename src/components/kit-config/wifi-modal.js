import React from 'react';

const Header = ({ ssid, modalClose }) => (
  <div className="modal-header">
    <button className="btn btn-clear float-right" onClick={modalClose} />
    <div className="modal-title h5">Password para: {`"${ssid}"`}</div>
  </div>
);

const Body = ({ pwd, changePwd }) => (
  <div className="modal-body">
    <div className="content">
      <input
        className="form-input"
        type="password"
        id="wifi-pass"
        placeholder="Password de la Red"
        onChange={changePwd}
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

const WifiModal = ({ wifi, modal, changePwd, handleConnect, modalClose }) => (
  <div className={`modal ${modal ? 'active' : ''}`}>
    <div className="modal-overlay" />
    <div className="modal-container col-6">
      <Header ssid={wifi.ssid} modalClose={modalClose} />
      <Body pwd={wifi.pwd} changePwd={changePwd} />
      <Footer handleConnect={handleConnect} />
    </div>
  </div>
);

export default WifiModal;
