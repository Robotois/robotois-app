import React from 'react';
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

const App = () => (
  <Layout>
    <SidebarContainer />
    <MainPanel />
  </Layout>
);

export default DragDropContext(HTML5Backend)(App);
