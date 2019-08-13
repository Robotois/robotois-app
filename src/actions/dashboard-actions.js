import mqtt from 'mqtt';
import Enums from '../utils/Enums';
import { updateStatus } from './status-bar';
import { resetSelectedKit } from './kit-config/kit-config';
import { transformUpdateForUi } from '../containers/dashboard/transformer'

export const MQTT_CLIENT_INITIALIZE = 'MQTT_CLIENT_INITIALIZE';
export const MQTT_CLIENT_STATUS = 'MQTT_CLIENT_STATUS';
export const REQUEST_AVAILABLE_TOPICS = 'REQUEST_AVAILABLE_TOPICS';
export const RECEIVE_AVAILABLE_TOPICS = 'RECEIVE_AVAILABLE_TOPICS';
export const RECEIVE_TOPIC_DATA = 'RECEIVE_TOPIC_DATA';
export const SELECT_TOI = 'SELECT_TOI';
export const END_LOADING = 'END_LOADING';
export const GET_TOI_STATE = 'GET_TOI_STATE';
export const ACCEPTED_GET_TOI_STATE = 'ACCEPTED_GET_TOI_STATE';
export const RECEIVE_UPDATE_STATE = 'RECEIVE_UPDATE_STATE';
let allTopics;
let mqttClient;

/*
Action creators
 */
const endLoading = () => ({
  type: END_LOADING,
});

const requestAvailableTopics = () => ({
  type: REQUEST_AVAILABLE_TOPICS,
});

const receiveAvailableTopics = topics => ({
  type: RECEIVE_AVAILABLE_TOPICS,
  topics,
});

export const resetAvailableTopics = () => receiveAvailableTopics(undefined);

export const receiveTopicData = (topic, data) => ({
  type: RECEIVE_TOPIC_DATA,
  topic,
  data,
});

export const receiveUpdate = (data) => ({
  type: RECEIVE_UPDATE_STATE,
  data,
});

export const selectToi = toi => ({
  type: SELECT_TOI,
  toi,
});

const processMessage = (topic, message, dispatch) => {
  console.log(topic)
  // let topics;
  // switch (topic) {
  //   case 'allTopics':
  //     topics = message.toString().split(';');
  //     topics.pop();
  //     allTopics = topics;
  //     subscribeAll(allTopics);
  //     // console.log('allTopics:', allTopics);
  //     dispatch(receiveAvailableTopics(allTopics));
  //     break;
  //   default:
  //   }
  const data = transformUpdateForUi(message.toString())
  console.log(data)
  dispatch(receiveUpdate(data));
};

const connectClient = (hostIp, dispatch) =>
  new Promise((resolve, reject) => {
    mqttClient = mqtt.connect({ host: hostIp, port: 9001 });
    mqttClient.on('connect', () => {
      resolve(`MQTT Client Connected to: ${hostIp}`);
      mqttClient.subscribe('tois/SuperToi/update/accepted')
      mqttClient.subscribe('tois/SuperToi/get/accepted')
    });
    mqttClient.on('message', (topic, message) =>
      processMessage(topic, message, dispatch),
    )

    setTimeout(() => {
      if (!mqttClient.connected) {
        dispatch(resetSelectedKit());
        mqttClient.end();
        reject(new Error(`[Super Toi] La IP "${hostIp}" no se encontró`));
      }
    }, 1500);

    mqttClient.on('offline', () => {
      dispatch(resetSelectedKit('[Super Toi] Desconectado'));
    });
    mqttClient.on('error', () => {
      dispatch(resetSelectedKit('[Super Toi] Error de Comunicación'));
    });
  });

const initializeClient = (hostIp, dispatch) =>
  new Promise(resolve => {
    allTopics = [];
    if (mqttClient && mqttClient.connected) {
      mqttClient.end(true, () => {
        mqttClient = undefined;
        resolve(connectClient(hostIp, dispatch));
      });
      return;
    }
    mqttClient = undefined;
    resolve(connectClient(hostIp, dispatch));
  });

export const connectMqttClient = hostIp => dispatch =>
  initializeClient(hostIp, dispatch)
    .then(message => console.log(message))
    .catch(err => dispatch(updateStatus(false, err.message, false)));

export const unsubscribe = topicList => dispatch => {
  if (topicList.length !== 0) {
    mqttClient.unsubscribe(topicList);
  }
  dispatch(resetAvailableTopics());
};

export const disconnectMqttClient = () => dispatch => {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = undefined;
  }
  dispatch(resetAvailableTopics());
};

/*
Fetch all available topics in the MQTT broker, subscribes to the "allTopics" topic
and proccess the message from every topic.
 */
const subscribeAll = topics => topics.map(topic => mqttClient.subscribe(topic));

const requestAllTopics = dispatch =>
  new Promise((resolve, reject) => {
    if (mqttClient && mqttClient.connected) {
      mqttClient.subscribe('allTopics');
      if (mqttClient.listeners('message').length === 0) {
        mqttClient.on('message', (topic, message) =>
          processMessage(topic, message, dispatch),
        );
      }
      mqttClient.publish('requestTopic', 'all');
      setTimeout(() => {
        dispatch(endLoading());
        resolve(true);
      }, 1500);
    } else {
      dispatch(endLoading());
      reject(new Error('[Super Toi] Error de Comunicación'));
    }
  });

export const fetchAvailableTopics = () => dispatch => {
  dispatch(requestAvailableTopics());
  return requestAllTopics(dispatch).catch(err => {
    dispatch(updateStatus(false, err.message, false));
  });
};

export const requestTopic = topic => {
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish('requestTopic', topic);
  }
};

