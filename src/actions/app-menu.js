export const APP_MENU_CHANGE_APP = 'APP_MENU_CHANGE_APP';
export const APP_MENU_RESET = 'APP_MENU_RESET';

export const appMenuChangeApp = app => ({
  type: APP_MENU_CHANGE_APP,
  app,
});

export const appMenuReset = () => ({
  type: APP_MENU_RESET,
});
