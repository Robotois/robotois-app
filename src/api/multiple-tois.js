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

export const nonAvailable = () => {
  const usedTois = Session.get('usedTois') || [];
  // checar si ya se tiene el maximo permitido de los multiples
  const multiTois = Object.keys(multipleTois).reduce(
    (result, key) => {
      const items = usedTois.filter(toi => toi.type === key);
      return items.length >= multipleTois[key] ? result.concat(items[0].type) : result;
    },
    []
  );
  const singleTois = usedTois.reduce(
    (result, toi) => (!multipleTois[toi.type] ? result.concat(toi.type) : result),
    []
  );

  return multiTois.concat(singleTois);
};
