import Tois from '../api/tois';
import InputModules from '../api/input-modules';
import multipleTois from '../api/multiple-tois';

import { USED_TOIS_ADD_TOI, USED_TOIS_UPDATE } from '../actions/used-tois-actions';

const nonAvailable = (used) => {
  // checar si ya se tiene el maximo permitido de los multiples
  const multiTois = Object.keys(multipleTois).reduce(
    (result, key) => {
      const tois = used.filter(toi => toi.type === key);
      return tois.length >= multipleTois[key] ? result.concat(tois[0].type) : result;
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

export const multipleInstances = (currentUsedTois, toiType) => {
  const total = currentUsedTois.reduce(
    (count, toi) => (toi.type === toiType ? count + 1 : count),
    0,
  );

  return total > 1;
};

export const getInputModules = currentUsedTois => currentUsedTois.reduce(
  (result, toi) => (
    toi.hasEvents ? result.concat({
      ...InputModules.find(module => module.type === toi.type),
      ...toi,
      hasMultiple: multipleInstances(currentUsedTois, toi.type),
    }) :
      result
  ),
  [],
);

export const deleteUsedToi = (currentUsedTois, figureId, itemType, updateInstace) => {
  const remainingTois = currentUsedTois.filter(toi => toi.figureId !== figureId);
  const otherType = remainingTois.filter(toi => toi.type !== itemType);
  const sameType = remainingTois.filter(toi => toi.type === itemType);
  sameType.sort((a, b) => a.instance - b.instance);
  const newOrder = sameType.reduce(
    (result, toi, index) => {
      updateInstace(toi.type, toi.figureId, index + 1);
      return result.concat({
        ...toi,
        instance: index + 1,
      });
    },
    [],
  );
  const newUsedTois = newOrder.concat(otherType);
  return newUsedTois;
};

const usedTois = (state = [], action) => {
  switch (action.type) {
    case USED_TOIS_ADD_TOI:
      return addUsedToi(state, action.toi);
    case USED_TOIS_UPDATE:
      return [...action.usedTois];
    default:
      return state;
  }
};


export default usedTois;
