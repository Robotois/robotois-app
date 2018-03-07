import mqtt from 'mqtt';
import Enums from '../utils/Enums';
import { updateStatus } from './status-bar';
import { resetSelectedKit } from './kit-config/kit-config';

export const MQTT_CLIENT_INITIALIZE = 'MQTT_CLIENT_INITIALIZE';
export const MQTT_CLIENT_STATUS = 'MQTT_CLIENT_STATUS';
export const REQUEST_AVAILABLE_TOPICS = 'REQUEST_AVAILABLE_TOPICS';
export const RECEIVE_AVAILABLE_TOPICS = 'RECEIVE_AVAILABLE_TOPICS';
export const RECEIVE_TOPIC_DATA = 'RECEIVE_TOPIC_DATA';
export const SELECT_TOPIC = 'SELECT_TOPIC';
export const END_LOADING = "END_LOADING";
let allTopics;
let mqttClient;
let prevHost;

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

export const receiveTopicData = (topic, data) => ({
  type: RECEIVE_TOPIC_DATA,
  topic,
  data,
});

export const selectTopic = topic => ({
  type: SELECT_TOPIC,
  topic,
});

const connectClient = (hostIp, dispatch) => new Promise((resolve, reject) => {
  mqttClient = mqtt.connect({ host: hostIp, port: 1884 });
  mqttClient.on('connect', () => {
    resolve(`MQTT Client Connected to: ${hostIp}`);
  });

  setTimeout(() => {
    if (!mqttClient.connected) {
      dispatch(resetSelectedKit());
      mqttClient.end();
      reject(new Error(`[Super Toi] La IP "${hostIp}" no se encontró`));
    }
  }, 1500);

  mqttClient.on('offline', () => {
    // console.log('offline');
    dispatch(resetSelectedKit('[Super Toi] Desconectado'));
  });
  mqttClient.on('error', () => {
    // console.log('error');
    dispatch(resetSelectedKit('[Super Toi] Error de Comunicación'));
  });
});

const initializeClient = (hostIp, dispatch) => new Promise((resolve) => {
  // it is the first time
  allTopics = undefined;
  if (!mqttClient) {
    prevHost = hostIp;
    resolve(connectClient(hostIp, dispatch));
    return;
  }
  if (prevHost !== hostIp) {
    prevHost = hostIp;
    if (mqttClient.connected) {
      mqttClient.end(true, () => resolve(connectClient(hostIp, dispatch)));
      return;
    }
    resolve(connectClient(hostIp, dispatch));
    return;
  }

  mqttClient.end(true, () => resolve(connectClient(hostIp, dispatch)));
});

export const connectMqttClient = hostIp => dispatch => initializeClient(hostIp, dispatch)
  .then(message => console.log(message))
  .catch((err) => {
    // console.log(err)
    dispatch(updateStatus(false, err.message, false));
  });

const subscribeAll = topics => topics.map(topic => mqttClient.subscribe(topic));

const processMessage = (topic, message, dispatch) => {
  let topics;
  switch (topic) {
    case 'allTopics':
      topics = message.toString().split(';');
      topics.pop();
      allTopics = topics;
      subscribeAll(allTopics);
      dispatch(receiveAvailableTopics(allTopics));
      break;
    default:
      dispatch(receiveTopicData(topic, message.toString()));
  }
};

const requestAllTopics = dispatch => new Promise((resolve, reject) => {
  if (mqttClient && mqttClient.connected) {
    mqttClient.subscribe('allTopics');
    mqttClient.on('message', (topic, message) => processMessage(topic, message, dispatch));
    mqttClient.publish('requestTopic', 'all');
    setTimeout(() => {
      dispatch(endLoading());
    }, 2000);
    resolve(true);
  } else {
    reject(new Error('[Super Toi] Error de Comunicación'));
  }
});

export const fetchAvailableTopics = () => (dispatch) => {
  dispatch(requestAvailableTopics());
  return requestAllTopics(dispatch)
    .catch((err) => {
      dispatch(receiveAvailableTopics(undefined));
      dispatch(updateStatus(false, err.message, false));
    });
};

export const getTopicInfo = (topic) => {
  const re = /([a-zA-Z]+)\/([a-zA-Z]+)([0-9]+)/g;
  const result = re.exec(topic);
  return result.slice(1, 4);
};

const addToi = (category, toiInfo) => {
  // console.log('addToi:', toiInfo);
  const newCategory = {
    ...category,
    tois: category.tois.concat(toiInfo),
  };
  return newCategory;
};

const requestTopic = (topic) => {
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish('requestTopic', topic);
  }
};

export const buildTopicCategories = topics => topics.reduce((result, topic) => {
  const topicInfo = getTopicInfo(topic.topic);
  const category = Enums[topicInfo[0]];
  const toiInfo = {
    title: Enums[topicInfo[1]],
    instance: topicInfo[2],
    topic: topic.topic,
    selected: topic.selected,
  };
  const index = result.findIndex(cat => cat.title === category);
  if (topic.data.length === 0) {
    requestTopic(topic.topic);
  }

  return index !== -1 ?
    result.slice(0, index).concat(addToi(result[index], toiInfo), result.slice(index + 1)) :
    result.concat({
      title: category,
      tois: [toiInfo],
    });
},
[]);
