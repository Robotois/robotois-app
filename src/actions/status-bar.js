export const STATUS_UPDATE = 'STATUS_UPDATE';

export const udpateStatus = (success, message) => ({
  type: STATUS_UPDATE,
  response: {
    success,
    message,
  },
});
