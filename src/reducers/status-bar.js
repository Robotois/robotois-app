import { STATUS_UPDATE, MESSAGE_UPDATE } from '../actions/status-bar';

const initialState = {
  online: false,
  message: 'Kit Desconectado',
  runner: undefined,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE:
      return { ...action.response };
    case MESSAGE_UPDATE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export default statusReducer;
