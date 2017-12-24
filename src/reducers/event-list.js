import {
  EVENT_LIST_ADD_INSTANCE_EVENT,
  EVENT_LIST_REMOVE_EVENT_CASE,
  EVENT_LIST_UPDATE_INSTANCE,
  EVENT_LIST_DELETE_INSTANCE,
} from '../actions/event-list';
import { isInput, isEventListener } from '../components/shared/tois-by-function';

const noLoggers = eventType => (eventType !== 'log' && eventType !== 'ioLog');

const compareKeys = (key1, key2) => {
  if (key1 && key2) {
    return key1 !== key2;
  }
  return true;
};

const onlyDifferent = (event, eventCase) => {
  if (event.eventType !== eventCase.eventType) {
    return true;
  }

  if (event.eventParams && eventCase.eventParams) {
    let paramCompare = true;
    paramCompare = paramCompare &&
      compareKeys(event.eventParams.valor, eventCase.eventParams.valor);
    paramCompare = paramCompare &&
      compareKeys(event.eventParams.min, eventCase.eventParams.min);
    paramCompare = paramCompare &&
      compareKeys(event.eventParams.max, eventCase.eventParams.max);
    return paramCompare;
  }
  return false;
};


/**
 * Se obtiene el toiEvent de la lista toiEvents, en donde se realiza un filtro
 * considerando el modulo de entrada (del evento que se desea agregar) y el submodulo
 * del currentToi, si es que los tiene. Por el momento solo algunos modulos cuentan
 * con submodulos, LEDs RGB, Motores y Servos.
 * @param  {List} toiEvents  Lista de eventos del currentToi, o modulo seleccionado
 * @param  {String} inputModule Nombre del modulo de entrada el cual proporciona los eventos
 * @param  {Number} submodule   El numero del submodulo de salida al cual se le agrega el evento
 * @return {Object}             El toiEvent que coincide con los parametros de busqueda,
 *                                 si es que existe
 */
const getToiEvent = (toiEvents, inputModule, submodule) => {
  if (submodule) {
    return toiEvents.find(ev =>
      (ev.inputModule.type === inputModule.type &&
        ev.inputModule.instance === inputModule.instance) &&
      ev.submodule === submodule);
  }
  return toiEvents.find(ev =>
    ev.inputModule.type === inputModule.type &&
    ev.inputModule.instance === inputModule.instance);
};

/**
 * Construye el nuevo toiEvent a partir de un toiEvent previo, el nombre del modulo
 * que proporciona los eventos de entrada y la configuracion del evento de entrada
 * @param  {Object} toiEvent   El toiEvent previo, si existe
 * @param  {String} inputModule Nombre del modulo que proporciona los eventos de entrada
 * @param  {Object} eventCase   La configuracion del evento que se va a agregar
 * @return {Object}             El nuevo toiEvent
 */
const buildToiEvent = (toiEvent, inputModule, eventCase, submodule) => {
  if (toiEvent && noLoggers(eventCase.eventType)) {
    // Si el currentToi va a comportarse como logger, entonces este no puede escuchar
    // otros eventos, por ello se busca si hay un eventCase como logger y se elimina.
    // Se filtran los eventos que sean diferentes para evitar colsion.
    console.log('toiEvent:', toiEvent);
    const noLogEvents = toiEvent.events.filter(event =>
      noLoggers(event.eventType) && onlyDifferent(event, eventCase));
    noLogEvents.push(eventCase);
    // toiEvent.events = noLogEvents;
    return {
      ...toiEvent,
      events: noLogEvents,
    };
  }
  /*
  Cuanto el toiEvent no existe en la lista de eventos del currentToi, o el currentToi
  se va a comportar como logger, entonces solo puede haber un eventCase
   */
  return {
    inputModule: {
      type: inputModule.type,
      instance: inputModule.instance,
      figureId: inputModule.figureId,
    },
    events: [eventCase],
    submodule,
  };
};

/**
 * Agrega un toiEvent a la lista toiEvents considerando si el currentToi puede
 * tener submodulos o si el toiEvent aplica a todos los submodulos
 * @param  {List} toiEvents La lista de eventos configurados para el currentToi
 * @param  {Object} toiEvent  El evento nuevo que se va a agregar a la lista
 * @return {List}            La nueva lista con los eventos configurados
 */
const pushtoiEvents = (toiEvents, toiEvent) => {
  const { submodule } = toiEvent;
  if (submodule && submodule !== 'todos') {
    // console.log('toiEvents:', toiEvents);
    // Eliminar los toiEvents que tengan 'todos'
    const noAlltoiEvents = toiEvents.filter(toiEv => toiEv.submodule !== 'todos');
    const subExist = noAlltoiEvents.findIndex(toiEv => toiEv.submodule === submodule);
    if (subExist !== -1) {
      noAlltoiEvents[subExist] = toiEvent;
      return noAlltoiEvents;
    }
    noAlltoiEvents.push(toiEvent);
    return noAlltoiEvents;
  }
  return [toiEvent];
};

const addEventCase = (toiEvents, inputModule, eventCase, submodule) => {
  // let newtoiEvents = null;
  // let toiEvent = null;
  /*
  Si la lista toiEvents existe para el currentToi (modulo de salida seleccionado:
  LED, LCD, LEDs RGB), entonces se modifica el toiEvent actual para que se contenga
  el evento nuevo que se han configurado en la interfaz visual
   */
  if (toiEvents && toiEvents.length !== 0) {
    // obtener el toi Event actual
    const prevtoiEvent = getToiEvent(toiEvents, inputModule, submodule);
    // se actualiza el toiEvent actual para incluir el evento que se quiere agregar
    const toiEvent = buildToiEvent(prevtoiEvent, inputModule, eventCase, submodule);
    // se obtiene la nueva version del toiEvent y se agrega a la lista toiEvents

    // console.log('toiEvents:', toiEvents);
    return pushtoiEvents(toiEvents, toiEvent);
  }

  const toiEvent = buildToiEvent(null, inputModule, eventCase, submodule);
  return [toiEvent];
};

const replaceInstance = (eventList, newInstance) => {
  const index = eventList.findIndex(
    toi => toi.type === newInstance.type && toi.instance === newInstance.instance,
  );
  let newEventList;
  if (index !== -1) {
    newEventList = (eventList.slice(0, index)).concat(newInstance, eventList.slice(index + 1));
  } else {
    newEventList = eventList.concat(newInstance);
  }
  return newEventList;
};

const removeEventCases = (eventList, toiType, instance) => {
  const newEventList = eventList.reduce(
    (result, toi) => {
      const { toiEvents } = toi;
      const newtoiEvents = toiEvents.filter(
        ev => (ev.inputModule.type === toiType ? ev.inputModule.instance !== instance : true),
      );
      return newtoiEvents.length > 0 ? result.concat({
        type: toi.type,
        toiEvents: newtoiEvents,
        instance: toi.instance,
      }) :
        result;
    },
    [],
  );
  // console.log('newEventList', newEventList);
  return newEventList;
};

const removeInstance = (eventList, toiType, instance) => {
  const index = eventList.findIndex(
    toi => toi.type === toiType && toi.instance === instance,
  );
  if (index !== -1) {
    eventList.splice(index, 1);
    return [...eventList];
  }
  return eventList;
};

export const deleteInstance = (eventList, toiType, instance) => {
  if (isInput(toiType)) {
    return removeEventCases(eventList, toiType, instance);
  }
  if (isEventListener(toiType)) {
    return removeInstance(eventList, toiType, instance);
  }
  return eventList;
};

const updateEventCases = (eventList, figureId, instance) => {
  const newEventList = eventList.map((toi) => {
    const { toiEvents } = toi;
    const newtoiEvents = toiEvents.map(
      ev => (
        ev.inputModule.figureId === figureId ?
          {
            ...ev,
            inputModule: {
              ...ev.inputModule,
              instance,
            },
          } :
          ev
      ),
    );
    return {
      type: toi.type,
      toiEvents: newtoiEvents,
      instance: toi.instance,
      figureId: toi.figureId,
    };
  });
  // console.log('newEventList', newEventList);
  return newEventList;
};

const updateEventToi = (eventList, figureId, instance) => {
  const newEventList = eventList.map(
    toi => (
      toi.figureId === figureId ?
        {
          ...toi,
          instance,
        } :
        toi
    ),
  );
  // console.log('newEventList', newEventList);
  return newEventList;
};

export const updateInstace = (eventList, toiType, figureId, instance) => {
  if (isInput(toiType)) {
    return updateEventCases(eventList, figureId, instance);
  }
  if (isEventListener(toiType)) {
    return updateEventToi(eventList, figureId, instance);
  }
  return eventList;
};

export function removeEventCase(eventList, currentToi, index, caseIndex) {
  const toiIndex = eventList.findIndex(
    toi => toi.type === currentToi.type && toi.instance === currentToi.instance,
  );
  if (toiIndex === -1) {
    return eventList;
  }
  const { toiEvents } = eventList[toiIndex];
  toiEvents[index].events.splice(caseIndex, 1);
  if (toiEvents[index].events.length === 0) {
    toiEvents.splice(index, 1);
  }
  if (toiEvents.length === 0) {
    return removeInstance(eventList, currentToi.type, currentToi.instance);
  }

  return replaceInstance(
    eventList,
    {
      type: currentToi.type,
      toiEvents,
      instance: currentToi.instance,
    },
  );
}

export function getInstance(eventList, toiType, instance) {
  return eventList.find(
    toi => toi.type === toiType && toi.instance === instance,
  );
}

const addInstanceEvent = (eventList, currentToi, inputModule, eventCase, submodule) => {
  const toiInstance = getInstance(eventList, currentToi.type, currentToi.instance);
  // console.log('toiInstance: ', toiInstance);
  const toiEvents = toiInstance ? toiInstance.toiEvents : [];
  return replaceInstance(
    eventList,
    {
      figureId: currentToi.figureId,
      type: currentToi.type,
      toiEvents: addEventCase(toiEvents, inputModule, eventCase, submodule),
      instance: currentToi.instance,
    },
  );
};

const eventListReducer = (state = [], action) => {
  switch (action.type) {
    case EVENT_LIST_ADD_INSTANCE_EVENT:
      return addInstanceEvent(
        state,
        action.currentToi,
        action.inputToi,
        action.eventCase,
        action.subToi,
      );
    // case EVENT_LIST_GET_INSTANCE:
    //   return getInstance(state, action.toiType, action.instance);
    case EVENT_LIST_REMOVE_EVENT_CASE:
      return removeEventCase(state, action.currentToi, action.index, action.caseIndex);
    case EVENT_LIST_UPDATE_INSTANCE:
      return updateInstace(state, action.toiType, action.figureId, action.instance);
    case EVENT_LIST_DELETE_INSTANCE:
      return deleteInstance(state, action.toiType, action.instance);
    default:
      return state;
  }
};

export default eventListReducer;
