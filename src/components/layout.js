import React from 'react';

const Layout = props => (
  <div>
    <div className="columns col-gapless" style={{ minHeight: '100vh' }}>
      {props.children}
    </div>
  </div>
);

export default Layout;
