import { STATUS_UPDATE } from '../actions/action-types';

const initialState = {
  success: true,
  message: '',
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE: {
      const { success, message } = action.response;
      return {
        ...state,
        success,
        message,
      };
    }
    default:
      return state;
  }
};

export default statusReducer;
