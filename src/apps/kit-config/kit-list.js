import React from 'react';

const Kit = ({ info, selectKit }) => (
  <div>
    <li className="menu-item">
      <a className="h6" href={`#${selectKit}`} onClick={selectKit}>
        <i className="icon icon-link" /> {info.hostname}
      </a>
      <p className="text-gray h7">ip: {info.ip}</p>
    </li>
    <li className="divider" />
  </div>
);

class KitsList extends React.Component {
  componentWillMount() {
    this.props.fetchKits();
  }

  render() {
    const { isFetching, kits, fetchKits, selectKit } = this.props;
    return (
      <ul className="menu col-9 centered my-2">
        <li className="menu-item">
          <div className="tile">
            <div className="tile-content">
              <p className="tile-title h4">Selecciona el Kit a configurar</p>
              <p className="tile-subtitle text-gray">Presiona {'"Buscar"'} para recargar la lista</p>
            </div>
            <div className="tile-action">
              <button className={`btn btn-primary ${isFetching ? 'loading' : ''}`} onClick={fetchKits}>Buscar Kits</button>
            </div>
          </div>
        </li>
        <li className="divider" data-content="Kits conectados" />
        {
          !isFetching ?
            kits.map(
              info => (<Kit
                key={info.ip}
                info={info}
                selectKit={selectKit(info)}
              />),
            ) :
            <div className="loading loading-lg" />
        }
      </ul>
    );
  }
}

export default KitsList;
