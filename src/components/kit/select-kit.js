import React from 'react';
import { Redirect } from 'react-router';
import { getConnected } from './networking';

const Kit = ({ info, selectKit }) => (
  <div>
    <li className="menu-item">
      <a className="h6" href="#" onClick={selectKit}>
        <i className="icon icon-link" /> {info.hostname}
      </a>
      <p className="text-gray h7">ip: {info.ip}</p>
    </li>
    <li className="divider" />
  </div>
);

class SelectKit extends React.Component {
  constructor() {
    super();
    this.state = {
      connected: [],
      selected: undefined,
      loading: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.selectKit = this.selectKit.bind(this);
    this.doneLoading = this.doneLoading.bind(this);
    this.findKits = this.findKits.bind(this);
  }

  componentWillMount() {
    // console.log(this.state);
    this.setState({
      connected: [],
      selected: undefined,
      loading: true,
    });
  }

  componentDidMount() {
    this.findKits();
  }

  findKits() {
    this.setState({ loading: true });
    getConnected().then(connected => this.setState({ connected }, this.doneLoading));
  }

  selectKit(hostInfo) {
    console.log('Selected:', hostInfo);

    this.setState({
      selected: hostInfo,
    });
  }

  handleSelect(hostInfo) {
    return () => this.selectKit(hostInfo);
  }

  doneLoading() {
    this.setState({ loading: false });
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const { loading, connected, selected } = this.state;
    // console.log(this.state);
    return (
      <ul className="menu">
        <li className="menu-item">
          <div className="tile">
            <div className="tile-content">
              <p className="tile-title h4">Selecciona el Kit a configurar</p>
              <p className="tile-subtitle text-gray">Presiona {'"Buscar"'} para recargar la lista</p>
            </div>
            <div className="tile-action">
              <button className="btn btn-primary" onClick={this.findKits}>Buscar</button>
            </div>
          </div>
        </li>
        <li className="divider" data-content="Kits conectados" />
        {
          !loading ?
            connected.map(
              info => (<Kit
                key={info.ip}
                info={info}
                selectKit={this.handleSelect(info)}
              />),
            ) :
            <div className="loading loading-lg" />
        }
        {
          selected && <Redirect to={`/kit/${selected.ip}/${selected.hostname}`} />
        }
      </ul>
    );
  }
}

export default SelectKit;
