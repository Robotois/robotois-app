import React from 'react';
import { getTopicInfo } from '../../actions/dashboard-actions';
import { isSensor, isIo } from '../../components/shared/tois-by-function';
import Enums from '../../utils/Enums';
import SensorChart from './components/sensor-chart';
import { getChartProps, colors } from '../../api/tois';

const ioMap = {
  0: 'Inactivo',
  1: ' Activo ',
};

const DiditalIo = ({ topic, data }) => {
  const topicInfo = getTopicInfo(topic);
  const length = data.length;
  const lastState = length > 0 ? data[length - 1].toUpperCase() : 'OFF';
  const color = lastState === 'OFF' ? colors.purpleText : colors.green;
  return (
    <div className="column col-3 col-lg-6 my-1">
      <div className="card">
        <div className="card-header">
          <div className="card-title h5">Estado Digital de: {`${Enums[topicInfo[1]]} ${topicInfo[2]}`}</div>
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

const getTopicComponent = (toiType) => {
  switch (true) {
    case isSensor(toiType):
      return SensorChart;
    case isIo(toiType):
      return DiditalIo;
    default:
      return false;
  }
};

const RenderTopic = (props) => {
  const topicInfo = getTopicInfo(props.topic);
  const TopicComponent = getTopicComponent(topicInfo[1]);
  return (<TopicComponent
    {...props}
    topicInfo={topicInfo}
    chartProps={getChartProps(topicInfo[1])}
  />);
};

const Dashboard = ({ selected, requestTopic }) => {
  return (
    <div className="columns m-1">
      {selected.map(topic => (
        <RenderTopic
          key={topic.topic}
          {...topic}
          requestTopic={requestTopic}
        />))}
    </div>
  );
};
export default Dashboard;
