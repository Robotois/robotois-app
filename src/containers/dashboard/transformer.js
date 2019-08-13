import moment from 'moment';
import Enums from '../../utils/Enums';

const getCategory = (toi) => {
  if (toi.includes('distance')) {
    return 'sensors'      
  }
}

export const transformUpdateForUi = (message) => {
  const { state: { reported } } = JSON.parse(message)
  if (!reported) {
    return {}
  }
  const data = Object.keys(reported).reduce(
    (res, toi) => {
      const category = getCategory(toi)
      return {
        ...res,
        [category]: res[category]
          ? {
            ...res[category],
            [toi]: [{ value: reported[toi], timestamp: moment().format('HH:mm:ss') }]
          }
          : {
            [toi]: [{ value: reported[toi], timestamp: moment().format('HH:mm:ss') }]
          }
      }
    },
    {}
  )
  return data
}

const mergeData = (data, value) => {
  const newData = data.concat(value)
  // console.log('value:', value);
  if (newData.length > 30) {
    return newData.slice(1, newData.length)
  }
  return newData
}

const buildCategory = (current, input) => Object.keys(input).reduce(
  (res, toi) => ({
      ...res,
      [toi]: res[toi]
        ? mergeData(res[toi], input[toi])
        : input[toi]
    }),
  current
)

export const updateToiState = (state, data) => Object.keys(data).reduce(
  (res, category) => ({
    ...res,
    [category]: buildCategory(res[category] || {}, data[category])
  }),
  { ...state }
)

/*
Build Topic Categories that will be rendered at the Dashboard Sidebar.
If there is a topic that has no data yet, it will request that the MQTT broker
forces to update the Toi state.
 */
export const getTopicInfo = topic => {
  const re = /([a-zA-Z-]+)\/([a-zA-Z]+)([0-9]+)/g;
  const result = re.exec(topic);
  return result.slice(1, 4);
};

export const getToiInfo = toi => {
  console.log(toi)
  const re = /([a-zA-Z\-]+)([0-9]+)/g;
  const result = re.exec(toi);
  return result.slice(1, 3);
};

const addToi = (category, toiInfo) => {
  const newCategory = {
    ...category,
    tois: category.tois.concat(toiInfo),
  };
  return newCategory;
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

export const getCategories = (toiState, showTois) =>
  Object.keys(toiState).reduce((result, key) => {
    const category = toiState[key]
    const tois = Object.keys(category).map(
      (toi) => {
        const toiInfo = getToiInfo(toi)
        return {
          title: Enums[toiInfo[0]],
          instance: toiInfo[1],
          id: toi,
          selected: showTois.findIndex(item => toi === item) !== -1
        }
      }
    )
    return result.concat({
      title: Enums[key],
      tois
    })
  }, []);

export const getChartData = (data) => data.reduce(
    (result, item) => ({ values: result.values.concat(item.value), timestamps: result.timestamps.concat(item.timestamp) }),
    { values: [], timestamps: [] }
  )
