import React from 'react';
import Wifi from './wifi';

const RenderWifis = ({ wifis, selectWifi }) => (
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
        wifis.map(wifi => (
          <Wifi
            key={wifi.address}
            ssid={wifi.ssid}
            quality={wifi.quality}
            openModal={selectWifi({ ssid: wifi.ssid, pwd: '' })}
          />
        ))
      }
    </tbody>
  </table>
);

const WifisList = ({ wifis, selectWifi }) => (
  wifis.length > 0 ?
    <RenderWifis wifis={wifis} selectWifi={selectWifi} /> :
    <div className="toast toas-warning">
      No hay redes disponibles...
    </div>
);

export default WifisList;
