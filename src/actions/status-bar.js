export const STATUS_UPDATE = 'STATUS_UPDATE';
export const MESSAGE_UPDATE = 'MESSAGE_UPDATE';

export const updateStatus = (online, message, runner) => ({
  type: STATUS_UPDATE,
  response: {
    online,
    message,
    runner,
  },
});

export const updateMessage = message => ({
  type: MESSAGE_UPDATE,
  message,
});
