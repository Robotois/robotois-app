import Tois from '../api/tois';

const multipleTois = {
  distance: 6,
  button: 6,
  led: 6,
  ledRGB: 2,
  lcd: 2,
  relay: 6,
  motion: 6,
  analogConnector: 2,
  rotary: 8,
  temperature: 8,
  sound: 8,
  light: 8,
  servosConnector: 2,
  servo: 6,
  motorsConnector: 2,
  motor: 4,
};

const nonAvailable = (used) => {
  // const usedTois = Session.get('usedTois') || [];
  // checar si ya se tiene el maximo permitido de los multiples
  const multiTois = Object.keys(multipleTois).reduce(
    (result, key) => {
      const items = used.filter(toi => toi.type === key);
      return items.length >= multipleTois[key] ? result.concat(items[0].type) : result;
    },
    [],
  );
  const singleTois = used.reduce(
    (result, toi) => (!multipleTois[toi.type] ? result.concat(toi.type) : result),
    [],
  );

  return multiTois.concat(singleTois);
};

export const getVisibleTois = (used = [], queryStr = '') => {
  const noAv = nonAvailable(used);
  // const query = new RegExp(queryStr, 'i');
  const visibleTois = queryStr !== '' ?
    Tois.filter(toi =>
      noAv.findIndex(na => na.type === toi.type) === -1 &&
      toi.title.toLowerCase().search(queryStr) !== -1,
    )
    :
    Tois.filter(toi => noAv.findIndex(na => na.type === toi.type) === -1);
  return visibleTois;
};

const usedTois = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOI':
      return [...state, { ...action.toi }];
    default:
      return state;
  }
};


export default usedTois;
