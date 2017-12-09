export const USED_TOIS_ADD_TOI = 'USED_TOIS_ADD_TOI';
export const USED_TOIS_UPDATE = 'USED_TOIS_UPDATE';

export const addUsedToi = toi => ({
  type: USED_TOIS_ADD_TOI,
  toi,
});

export const updateUsedTois = usedTois => ({
  type: USED_TOIS_UPDATE,
  usedTois,
});
