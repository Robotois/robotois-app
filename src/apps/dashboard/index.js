import React from 'react';
import { getTopicInfo } from '../../actions/dashboard-actions';
import { isSensor, isIo } from '../../components/shared/tois-by-function';
import Enums from '../../utils/Enums';
import SensorChart from './components/sensor-chart';

const ioMap = {
  0: 'Inactivo',
  1: ' Activo ',
};

const DiditalIo = ({ topic, data }) => {
  const topicInfo = getTopicInfo(topic);
  const length = data.length;
  const lastState = length > 0 ? data[length - 1].toUpperCase() : 'OFF';
  const color = lastState === 'OFF' ? '#EF8A8A' : '#5f93F9';
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title h5">Estado Digital de: {`${Enums[topicInfo[1]]} ${topicInfo[2]}`}</div>
        <div className="card-subtitle text-gray">Se registra el estado actual del Toi</div>
      </div>
      <div className="card-body">
        <figure
          className="avatar avatar-xl"
          data-initial={lastState}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const getTopicComponent = (topic) => {
  const toiType = getTopicInfo(topic)[1];
  switch (true) {
    case isSensor(toiType):
      return SensorChart;
    case isIo(toiType):
      return DiditalIo;
    default:
      return false;
  }
};

const RenderTopic = ({ topic }) => {
  const TopicComponent = getTopicComponent(topic.topic);
  return (
    <div className="column col-5 col-xs-12 m-1">
      {TopicComponent && <TopicComponent {...topic} />}
    </div>
  );
};

const Dashboard = ({ selected }) => {
  return (
    <div className="columns">
      {selected.map(topic => <RenderTopic key={topic.topic} topic={topic} />)}
    </div>
  );
};
export default Dashboard;
