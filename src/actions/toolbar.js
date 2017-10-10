import { TOOLBAR_CHANGE_WORKSPACE } from './action-types';

const { remote } = window.require('electron');
const { BrowserWindow } = remote;
// const path = remote.require('path');
// const url = remote.require('url');

export const toolbarChangeWorkspace = workspace => ({
  type: TOOLBAR_CHANGE_WORKSPACE,
  workspace,
});

export const openApp = () => {
  // const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  // const startUrl = url.format({
  //   pathname: path.join(__dirname, '../build/index.html'),
  //   protocol: 'file:',
  //   slashes: true,
  // });
  let win = new BrowserWindow();
  win.on('close', () => { win = null; });
  win.loadURL('http://localhost:3001');
  win.show();
};
