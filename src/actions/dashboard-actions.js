import mqtt from 'mqtt';
import Enums from '../utils/Enums';

export const REQUEST_AVAILABLE_TOPICS = 'REQUEST_AVAILABLE_TOPICS';
export const RECEIVE_AVAILABLE_TOPICS = 'RECEIVE_AVAILABLE_TOPICS';
export const RECEIVE_TOPIC_DATA = 'RECEIVE_TOPIC_DATA';
export const SELECT_TOPIC = 'SELECT_TOPIC';

let allTopics;
let mqttClient;
let prevHost;

/*
Action creators
 */
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
      // console.log('MQTT Message:', message);
  }
};

const connectClient = hostIp => new Promise((resolve, reject) => {
  mqttClient = mqtt.connect({ host: hostIp, port: 1884 });
  setTimeout(() => {
    if (!mqttClient.connected) {
      reject(`Host with IP: ${hostIp} unreachable`);
      mqttClient.end();
    }
  }, 1500);
  mqttClient.on('connect', () => {
    resolve(`MQTT Client Connected to: ${hostIp}`);
  });
});

const initializeClient = (hostIp) => {
  // it is the first time
  allTopics = undefined;
  if (!mqttClient) {
    prevHost = hostIp;
    return connectClient(hostIp);
  }
  if (prevHost !== hostIp) {
    prevHost = hostIp;
    if (mqttClient.connected) {
      return new Promise((resolve) => {
        mqttClient.end(true, resolve(connectClient(hostIp)));
      });
    }
    return connectClient(hostIp);
  }

  return new Promise((resolve) => {
    mqttClient.end(true, resolve(connectClient(hostIp)));
  });
};

const requestAllTopics = (dispatch) => {
  mqttClient.subscribe('allTopics');
  mqttClient.on('message', (topic, message) => processMessage(topic, message, dispatch));
  mqttClient.publish('requestTopic', 'all');
};

export const fetchAvailableTopics = hostIp => (dispatch) => {
  dispatch(requestAvailableTopics());
  return initializeClient(hostIp)
    .then((message) => {
      console.log(message);
      requestAllTopics(dispatch);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!allTopics) {
            reject('No topics to show');
            return;
          }
          resolve('allTopics Available');
        }, 1000);
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch(receiveAvailableTopics(undefined));
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
