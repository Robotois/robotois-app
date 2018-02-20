import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import '../assets/css/robotois.css';
// import Alerts from './alerts';
import Layout from './layout';
import MainPanel from '../components/main-panel/main-panel';
import SidebarContainer from '../containers/sidebar-container';

const mapStateToProps = ({ toolbar: { workspace, currentApp: { key } } }) => ({
  left: workspace === 'Visual',
});

const App = ({ left }) => (
  <Layout>
    {left ? <SidebarContainer /> : null}
    <MainPanel />
    {left ? null : <SidebarContainer />}
  </Layout>
);

const AppContainer = connect(mapStateToProps, null)(App);

export default DragDropContext(HTML5Backend)(AppContainer);
