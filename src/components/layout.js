import React from 'react';
import { Link } from 'react-router-dom';

// const Header = () => (
//   <div className="section bg-primary text-light text-center">
//     <h2>Kit Robotois</h2>
//     <p>Configuracion del Kit</p>
//   </div>
// );
const Header = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link className="navbar-brand mr-2" to="/">Robotois</Link>
    </section>
    <section className="navbar-section" />
  </header>
);

const Layout = props => (
  <div className="container col-9">
    <Header />
    <br />
    {props.children}
  </div>
);

export default Layout;
