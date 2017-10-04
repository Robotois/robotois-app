import React from 'react';
import Wifi from './wifi';

const RenderNetworks = ({ networks, selectNetwork }) => (
  <table className="table table-striped table-hover mx-2">
    <thead>
      <tr>
        <th>Red</th>
        <th>Calidad</th>
        <th className="col-3 text-center">Opciones</th>
      </tr>
    </thead>
    <tbody>
      {
        networks.map(network => (
          <Wifi
            key={network.address}
            ssid={network.ssid}
            quality={network.quality}
            openModal={selectNetwork(network.ssid)}
          />
        ))
      }
    </tbody>
  </table>
);

const Networks = ({ networks, selectNetwork }) => (
  networks.length > 0 ?
    <RenderNetworks networks={networks} selectNetwork={selectNetwork} /> :
    <div className="toast toas-warning">
      No hay redes disponibles...
    </div>
);

export default Networks;
