import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import Layout from './components/layout';
import SelectKit from './components/kit/select-kit';
import WifiContainer from './containers/wifi-container';

const Routes = () => (
  <Layout>
    {window.location.pathname.includes('index.html') && <Redirect to="/" />}
    <Route exact path="/" component={SelectKit} />
    <Route path="/kit/:ip/:hostname" component={WifiContainer} />
  </Layout>
);

export default Routes;
