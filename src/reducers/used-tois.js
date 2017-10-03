import Tois from '../api/tois';
import InputModules from '../api/input-modules';
import multipleTois from '../api/multiple-tois';

const nonAvailable = (used) => {
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
  const visibleTois = queryStr !== '' ?
    Tois.filter(toi =>
      noAv.findIndex(na => na === toi.type) === -1 &&
      toi.title.toLowerCase().search(queryStr) !== -1,
    )
    :
    Tois.filter(toi => noAv.findIndex(na => na === toi.type) === -1);
  return visibleTois;
};

const addUsedToi = (currentUsedTois, newToi) => {
  const lastInstance = currentUsedTois.reduce(
    (count, toi) => {
      if (toi.type === newToi.type) {
        if (toi.instance > count) {
          return toi.instance;
        }
      }
      return count;
    },
    0,
  );
  const newUsedTois = [
    ...currentUsedTois,
    {
      ...newToi,
      instance: lastInstance !== 0 ? lastInstance + 1 : 1,
    },
  ];
  return newUsedTois;
};

export const getInputModules = currentUsedTois => currentUsedTois.reduce(
  (result, toi) => (
    toi.hasEvents ? result.concat({
      ...InputModules.find(module => module.type === toi.type),
      ...toi,
    }) :
      result
  ),
  [],
);

export const multiModules = (currentUsedTois, itemType) => {
  const total = currentUsedTois.reduce(
    (count, toi) => (toi.type === itemType ? count + 1 : count),
    0,
  );

  return total > 1;
};

const usedTois = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USED_TOI':
      return addUsedToi(state, action.toi);
    default:
      return state;
  }
};


export default usedTois;
