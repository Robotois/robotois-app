import { APP_MENU_CHANGE_APP, APP_MENU_RESET } from '../actions/app-menu';

const initialState = {
  title: 'Principal',
  key: 'main',
};

const appMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_MENU_CHANGE_APP:
      return {
        ...action.app,
      };
    case APP_MENU_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default appMenuReducer;
