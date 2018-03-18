import React from 'react';
import { getTopicInfo } from '../../actions/dashboard-actions';
import { isSensor, isIo } from '../../components/shared/tois-by-function';
import Enums from '../../utils/Enums';
import SensorChart from './components/sensor-chart';
import { getChartProps, colors } from '../../api/tois';

const DiditalIo = ({ topic, data }) => {
  const topicInfo = getTopicInfo(topic);
  const length = data.length;
  const lastState = length > 0 ? data[length - 1].toUpperCase() : 'OFF';
  const color = lastState === 'OFF' ? colors.purpleText : colors.green;
  return (
    <div className="column col-3 col-lg-6 my-1 dashboard-item">
      <div className="card">
        <div className="card-header">
          <div className="card-title h5">
            {`${Enums[topicInfo[1]]} #${topicInfo[2]}`}
          </div>
        </div>
        <div className="card-body text-center">
          <figure
            className="avatar avatar-xl"
            data-initial={lastState}
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
};

const getTopicComponent = toiType => {
  switch (true) {
    case isSensor(toiType):
      return SensorChart;
    case isIo(toiType):
      return DiditalIo;
    default:
      return false;
  }
};

const RenderTopic = props => {
  const topicInfo = getTopicInfo(props.topic);
  const TopicComponent = getTopicComponent(topicInfo[1]);
  return (
    <TopicComponent
      {...props}
      topicInfo={topicInfo}
      chartProps={getChartProps(topicInfo[1])}
    />
  );
};

/*
// FOR DEBUGGING
const topics = [
  {
    topic: 'turnOn/led1',
    data: ['on'],
  },
  {
    topic: 'on/distance10',
    data: [1, 2, 3, 4, 5],
    timestamps: [1, 2, 3, 4, 5],
  },
];*/

const EmptyState = ({ topic, data }) => {
  return (
    <div className="column col-6 my-1 dashboard-item">
      <div className="card">
        <div className="card-header">
          <div className="card-title h5">
            OOPS!
          </div>
        </div>
        <div className="card-body">
          Intenta conectar algun TOI para visualizar su estado
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ selected, requestTopic }) => {
  return (
    <div className="columns m-0 dashboard">
      {selected.length ? selected.map(topic => (
        <RenderTopic key={topic.topic} {...topic} requestTopic={requestTopic} />
      )) : <EmptyState />}
    </div>
  );
};
export default Dashboard;
