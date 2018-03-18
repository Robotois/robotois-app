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
export const END_LOADING = 'END_LOADING';
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

export const selectTopic = topic => ({
  type: SELECT_TOPIC,
  topic,
});

const connectClient = (hostIp, dispatch) =>
  new Promise((resolve, reject) => {
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

const processMessage = (topic, message, dispatch) => {
  let topics;
  switch (topic) {
    case 'allTopics':
      topics = message.toString().split(';');
      topics.pop();
      allTopics = topics;
      subscribeAll(allTopics);
      // console.log('allTopics:', allTopics);
      dispatch(receiveAvailableTopics(allTopics));
      break;
    default:
      dispatch(receiveTopicData(topic, message.toString()));
  }
};

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

/*
Build Topic Categories that will be rendered at the Dashboard Sidebar.
If there is a topic that has no data yet, it will request that the MQTT broker
forces to update the Toi state.
 */
export const getTopicInfo = topic => {
  const re = /([a-zA-Z]+)\/([a-zA-Z]+)([0-9]+)/g;
  const result = re.exec(topic);
  return result.slice(1, 4);
};

const addToi = (category, toiInfo) => {
  const newCategory = {
    ...category,
    tois: category.tois.concat(toiInfo),
  };
  return newCategory;
};

export const requestTopic = topic => {
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish('requestTopic', topic);
  }
};

export const buildTopicCategories = topics =>
  topics.reduce((result, topic) => {
    const topicInfo = getTopicInfo(topic.topic);
    const category = Enums[topicInfo[0]];
    const toiInfo = {
      title: Enums[topicInfo[1]],
      instance: topicInfo[2],
      topic: topic.topic,
      selected: topic.selected,
    };
    const index = result.findIndex(cat => cat.title === category);

    return index !== -1
      ? result
          .slice(0, index)
          .concat(addToi(result[index], toiInfo), result.slice(index + 1))
      : result.concat({
          title: category,
          tois: [toiInfo],
        });
  }, []);
