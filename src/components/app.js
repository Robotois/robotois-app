import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import ToisContainer from '../containers/tois-list-conatiner';
import Layout from './layout';
import MainPanel from './main-panel/main-panel';
import SidebarContainer from '../containers/sidebar-container';
// import ConfigPanelContainer from '../containers/config-panel-container';

const App = () => (
  <Layout>
    <SidebarContainer />
    <MainPanel />
  </Layout>
);

export default DragDropContext(HTML5Backend)(App);
