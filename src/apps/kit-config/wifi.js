import React from 'react';

const Wifi = ({ ssid, quality, openModal }) => (
  <tr>
    <td className="h6">{ssid}</td>
    <td className="h6">{quality}</td>
    <td className="col-3 text-center">
      <button
        className="btn btn-primary mx-1 tooltip"
        data-tooltip="Conectarse"
        onClick={openModal}
      >
        <i className="icon icon-link" />
      </button>
    </td>
  </tr>
);

export default Wifi;
