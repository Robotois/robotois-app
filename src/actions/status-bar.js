import { STATUS_UPDATE } from './action-types';

const udpateStatus = (success, message) => ({
  type: STATUS_UPDATE,
  response: {
    success,
    message,
  },
});
export default udpateStatus;
