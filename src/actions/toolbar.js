export const TOOLBAR_CHANGE_WORKSPACE = 'TOOLBAR_CHANGE_WORKSPACE';

export const TOOLBAR_CHANGE_APP = 'TOOLBAR_CHANGE_APP';
export const TOOLBAR_APP_RESET = 'TOOLBAR_APP_RESET';

export const toolbarChangeWorkspace = workspace => ({
  type: TOOLBAR_CHANGE_WORKSPACE,
  workspace,
});

export const toolbarChangeApp = app => ({
  type: TOOLBAR_CHANGE_APP,
  app,
});

export const toolbarAppReset = () => ({
  type: TOOLBAR_APP_RESET,
});
