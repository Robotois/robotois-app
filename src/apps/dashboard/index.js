import React from 'react';
// import { getTopicInfo } from '../../actions/dashboard-actions';
import { getToiInfo } from '../../containers/dashboard/transformer';
import { isSensor, isIo, isMechanical } from '../../components/shared/tois-by-function';
import { getChartProps } from '../../api/tois';

import EmptyState from './components/EmptyState';
import SensorChart from './components/sensor-chart';
import DigitalIo from './components/DigitalIo';
import MotorsChart from './components/MotorsChart';

const Motors = ({ data, topicInfo }) => {
  const { length } = data;
  const lastState = length > 0 ? data[length - 1] : 0;
  return (
    <div className="bar">
      <div
        className="bar-item"
        role="progressbar"
        style={{ width: `${lastState}%` }}
        aria-valuenow={lastState}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {lastState}
      </div>
    </div>
  );
};

const getTopicComponent = (toiType) => {
  switch (true) {
    case isSensor(toiType):
      return SensorChart;
    case isIo(toiType):
      return DigitalIo;
    case isMechanical(toiType):
      return MotorsChart;
    default:
      return false;
  }
};

const RenderToi = ({ id, ...rest }) => {
  const toiInfo = getToiInfo(id);
  const TopicComponent = getTopicComponent(toiInfo[0]);
  return TopicComponent && (
    <TopicComponent
      id={id}
      {...rest}
      toiInfo={toiInfo}
      chartProps={getChartProps(toiInfo[0])}
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

const Dashboard = ({ selected, requestTopic }) => {
  console.log(selected)
  return (
    <div className="columns m-0 dashboard">
      {selected.length ? selected.map(toi => (
        <RenderToi key={toi.id} {...toi} requestTopic={requestTopic} />
      )) : <EmptyState />}
    </div>
  );
};
export default Dashboard;
