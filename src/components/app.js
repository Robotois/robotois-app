import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Layout from './layout';
import MainPanelContainer from '../containers/main-panel-container';
import SidebarContainer from '../containers/sidebar-container';

const App = () => (
  <Layout>
    <SidebarContainer />
    <MainPanelContainer />
  </Layout>
);

export default DragDropContext(HTML5Backend)(App);
