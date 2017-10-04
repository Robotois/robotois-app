const Utils = {
  getPortsSelected(type, items) {
    const selections = [];
    let state;
    items.forEach((item) => {
      state = item.state || {};
      if (state.type !== type && state.portNumber) {
        selections.push(state.portNumber);
      }
    });
    return selections;
  },
  getFormStatusCSS(state, fields) {
    const isValid = fields.every(element => !!state[element]);
    return isValid ? 'icon-done' : 'loading';
  },
  getItemFromSession(type) {
    return Session.get('robotoisItems').find(element => element.type === type);
  },
};
export default Utils;
