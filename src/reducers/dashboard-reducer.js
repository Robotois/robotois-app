import moment from 'moment';

import {
  REQUEST_AVAILABLE_TOPICS,
  RECEIVE_AVAILABLE_TOPICS,
  RECEIVE_TOPIC_DATA,
  SELECT_TOPIC,
  END_LOADING,
  getTopicInfo,
} from '../actions/dashboard-actions';
import { isSensor, isDigitalOutput, isDigitalInput } from '../components/shared/tois-by-function';

const ioStatus = ['off', 'on'];

const formatData = (data, toiType) => {
  // console.log('toiType:', toiType);
  switch (true) {
    case isSensor(toiType):
      return Number(data);
    case isDigitalOutput(toiType):
      return data !== 'blink' ? ioStatus[parseInt(data, 10)] : 'blink';
    case isDigitalInput(toiType):
      return ioStatus[parseInt(data, 10)];
    default:
      return undefined;
  }
};

const initialState = {
  topics: [],
  isFetching: false,
};

const mergeData = (data, value) => {
  const newData = data.concat(value);
  // console.log('value:', value);
  if (newData.length > 30) {
    return newData.slice(1, newData.length);
  }
  return newData;
};

const mergeTimestamps = momentData => mergeData(momentData, moment().format('HH:mm:ss'));

const mergeTopicData = (topics, topic, data) => {
  const index = topics.findIndex(to => to.topic === topic);
  const prevTopic = topics[index];
  const topicInfo = getTopicInfo(topic);
  const newTopic = {
    ...prevTopic,
    timestamps: mergeTimestamps(prevTopic.timestamps),
    data: mergeData(prevTopic.data, formatData(data, topicInfo[1])),
  };
  // console.log('newTopic:', newTopic);
  topics.splice(index, 1, newTopic);

  return [...topics];
};

const buildTopicsData = topics => topics.map(topic => ({
  topic,
  data: [],
  timestamps: [],
  selected: false,
}));

const selectTopic = (topics, topic) => {
  const index = topics.findIndex(to => to.topic === topic);
  const prevTopic = topics[index];
  topics.splice(index, 1, {
    ...prevTopic,
    selected: !prevTopic.selected,
  });
  return [...topics];
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AVAILABLE_TOPICS:
      return {
        ...initialState,
        isFetching: true,
      };
    case RECEIVE_AVAILABLE_TOPICS:
      return {
        topics: action.topics ? buildTopicsData(action.topics) : [],
        isFetching: false,
      };
    case RECEIVE_TOPIC_DATA:
      return {
        topics: mergeTopicData(state.topics, action.topic, action.data),
        isFetching: false,
      };
    case SELECT_TOPIC:
      return {
        topics: selectTopic(state.topics, action.topic, action.data),
        isFetching: false,
      };
    case END_LOADING:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
