const Konami = function konami() {
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
  const length = code.length;
  let listenerTarget = null;
  let onSuccess = null;
  let next = 0;
  const keydownListener = function keydownListener(e) {
    if (e.keyCode === code[next]) {
      next += 1;
      if (next === length) {
        onSuccess();
        next = 0;
      }
    } else {
      next = 0;
    }
  };
  const addEventListeners = function addEventListeners() {
    if (listenerTarget.addEventListener) {
      listenerTarget.addEventListener('keydown', keydownListener, false);
    } else if (listenerTarget.attachEvent) {
      listenerTarget.attachEvent('onkeydown', keydownListener);
    } else if (typeof listenerTarget.onkeydown === 'function') {
      const preservedListenerTargetFunction = listenerTarget.onkeydown;

      listenerTarget.onkeydown = function onkeydown(e) {
        preservedListenerTargetFunction(e);
        keydownListener(e);
      };
    } else {
      listenerTarget.onkeydown = keydownListener;
    }
  };

  return {
    onSuccess() {},
    listenerTarget: window,
    init() {
      onSuccess = this.onSuccess;
      listenerTarget = this.listenerTarget;
      addEventListeners();
    },
  };
};
export default Konami;
