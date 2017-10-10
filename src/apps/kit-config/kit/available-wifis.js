import React from 'react';
import WifisList from './wifis-list';

const AvailableWifis = ({ wifis, loading, selectWifi }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h4">Redes WiFi Disponibles</div>
      <div className="divider" />
    </div>
    <div className="card-body">
      {
        !loading ?
          <WifisList wifis={wifis} selectWifi={selectWifi} /> :
          <div className="loading loading-lg" />
      }
    </div>
  </div>
);

export default AvailableWifis;
