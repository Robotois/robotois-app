import React from 'react';
import Networks from './networks';

const AvailableNetworks = ({ networks, loading, selectNetwork }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h4">Redes WiFi Disponibles</div>
      <div className="divider" />
    </div>
    <div className="card-body">
      {
        !loading ?
          <Networks networks={networks} selectNetwork={selectNetwork} /> :
          <div className="loading loading-lg" />
      }
    </div>
  </div>
);

export default AvailableNetworks;
