import React from 'react';

const Layout = props => (
  <div id="app" className="columns col-gapless">
    {props.children}
  </div>
);

export default Layout;
