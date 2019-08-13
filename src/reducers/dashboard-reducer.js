import moment from 'moment';

import {
  GET_TOI_STATE,
  ACCEPTED_GET_TOI_STATE,
  RECEIVE_UPDATE_STATE,
  REQUEST_AVAILABLE_TOPICS,
  RECEIVE_AVAILABLE_TOPICS,
  RECEIVE_TOPIC_DATA,
  SELECT_TOI,
  END_LOADING,
} from '../actions/dashboard-actions';
import { updateToiState, getTopicInfo } from '../containers/dashboard/transformer'
import {
  isSensor,
  isDigitalOutput,
  isDigitalInput,
  isMechanical,
} from '../components/shared/tois-by-function';

const ioStatus = ['off', 'on'];

const formatData = (data, toiType) => {
  switch (true) {
    case isSensor(toiType):
      return Number(data);
    case isDigitalOutput(toiType):
      return data !== 'blink' ? ioStatus[parseInt(data, 10)] : 'blink';
    case isDigitalInput(toiType):
      return ioStatus[parseInt(data, 10)];
    case isMechanical(toiType):
      return Number(data);
    default:
      return undefined;
  }
};

const initialState = {
  topics: [],
  showTois: [],
  isFetching: false,
  toiState: {},
};

const debugState = {
  topics: [
    {
      topic: 'motors/motor101',
      data: [-50, 50, 100, 25, 75],
      timestamps: [
        moment().subtract(20, 'seconds').format('HH:mm:ss'),
        moment().subtract(15, 'seconds').format('HH:mm:ss'),
        moment().subtract(10, 'seconds').format('HH:mm:ss'),
        moment().subtract(5, 'seconds').format('HH:mm:ss'),
        moment().format('HH:mm:ss'),
      ],
      selected: false,
    },
    {
      topic: 'servos/servo101',
      data: [-50, 50, 100, 25, 75],
      timestamps: [
        moment().subtract(20, 'seconds').format('HH:mm:ss'),
        moment().subtract(15, 'seconds').format('HH:mm:ss'),
        moment().subtract(10, 'seconds').format('HH:mm:ss'),
        moment().subtract(5, 'seconds').format('HH:mm:ss'),
        moment().format('HH:mm:ss'),
      ],
      selected: false,
    },
  ],
  isFetching: false,
  toiState: {
    'sensors': {
      'distance1': [
        { value: 20, timestamp: moment().subtract(20, 'seconds').format('HH:mm:ss') },
        { value: 23, timestamp: moment().subtract(15, 'seconds').format('HH:mm:ss') },
        { value: 22, timestamp: moment().subtract(10, 'seconds').format('HH:mm:ss') },
        { value: 19, timestamp: moment().subtract(5, 'seconds').format('HH:mm:ss') },
        { value: 22, timestamp: moment().subtract(20, 'seconds').format('HH:mm:ss') },
      ]
    }
  },
  showTois: [],
};

const mergeData = (data, value) => {
  const newData = data.concat(value)
  // console.log('value:', value);
  if (newData.length > 30) {
    return newData.slice(1, newData.length)
  }
  return newData
}

const mergeTimestamps = momentData => mergeData(momentData, moment().format('HH:mm:ss'));

const mergeTopicData = (topics, topic, data) => {
  const index = topics.findIndex(to => to.topic === topic);
  if (index === -1) {
    return [...topics];
  }
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

const buildTopicsData = (topics, prevTopics) => {
  return topics.reduce(
    (result, topic) => (
      result.findIndex(prevTopic => prevTopic.topic === topic) === -1 ?
        result.concat({
          topic,
          data: [],
          timestamps: [],
          selected: false,
        }) :
        result),
    prevTopics,
  );
};

const selectToi = (showTois, toi) => {
  const index = showTois.findIndex(item => item === toi);
  if (index !== -1) {
    showTois.splice(index, 1);
    return [...showTois];
  }
  return showTois.concat(toi);
};

// const dashboardReducer = (state = initialState, action) => {
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOI_STATE:
      return {
        ...state,
        isFetching: true,
      }
    case ACCEPTED_GET_TOI_STATE:
      return {
        ...state,
        isFetching: false,
      }
    case RECEIVE_UPDATE_STATE:
      return {
        ...state,
        toiState: updateToiState(state.toiState, action.data),
      }
    case REQUEST_AVAILABLE_TOPICS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_AVAILABLE_TOPICS:
      return {
        topics: action.topics ? buildTopicsData(action.topics, state.topics) : [],
        isFetching: false,
      };
    case RECEIVE_TOPIC_DATA:
      return {
        topics: mergeTopicData(state.topics, action.topic, action.data),
        isFetching: false,
      };
    case SELECT_TOI:
      return {
        ...state,
        showTois: selectToi(state.showTois, action.toi),
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
