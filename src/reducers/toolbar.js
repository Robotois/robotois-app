import {
  TOOLBAR_CHANGE_WORKSPACE,
  TOOLBAR_CHANGE_APP,
  TOOLBAR_APP_RESET,
} from '../actions/toolbar';

const mainApp = {
  title: 'Principal',
  key: 'main',
};

const initialState = {
  kitStatus: false,
  workspace: 'Visual',
  currentApp: mainApp,
};

const appMenuReducer = (state, action) => {
  switch (action.type) {
    case TOOLBAR_CHANGE_APP:
      return {
        ...action.app,
      };
    case TOOLBAR_APP_RESET:
      return {
        ...mainApp,
      };
    default:
      return state;
  }
};

const toolbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOLBAR_CHANGE_WORKSPACE:
      return {
        ...state,
        workspace: action.workspace,
      };
    case TOOLBAR_CHANGE_APP:
    case TOOLBAR_APP_RESET:
      return {
        ...state,
        currentApp: appMenuReducer(state.currentApp, action),
      };
    default:
      return state;
  }
};

export default toolbarReducer;
