import React from 'react';
import { getTopicInfo } from '../../../actions/dashboard-actions';
import Enums from '../../../utils/Enums';
import { colors } from '../../../api/tois';

const DigitalIo = ({ topic, data, topicInfo }) => {
  // const topicInfo = getTopicInfo(topic);
  const { length } = data;
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

export default DigitalIo;
