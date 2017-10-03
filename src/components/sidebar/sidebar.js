import React from 'react';
import ToisListContainer from '../../containers/tois-list-conatiner';
import ItemDetailContainer from '../../containers/item-detail-container';

const MenuItem = ({ item, changeSelection }) => (
  <li className="menu-item">
    <a href="#dropdowns" onClick={changeSelection(item)}>{item}</a>
  </li>
);

const Menu = ({ menuSelection, changeSelection }) => (
  <div className="text-center">
    <div className="dropdown">
      <a className="btn btn-primary dropdown-toggle" tabIndex="0">
        {menuSelection} <i className="icon icon-caret" />
      </a>
      <ul className="menu text-left">
        <MenuItem item="Tois" changeSelection={changeSelection} />
        <MenuItem item="Configuraciones" changeSelection={changeSelection} />
      </ul>
    </div>
  </div>
);

const SideBar = ({ menuSelection, changeSelection }) => (
  <div className="column col-3 bg-secondary sidebar">
    <Menu menuSelection={menuSelection} changeSelection={changeSelection} />
    {menuSelection === 'Tois' && <ToisListContainer />}
    {menuSelection === 'Configuraciones' && <ItemDetailContainer />}
  </div>
);

export default SideBar;
