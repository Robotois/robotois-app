import React from 'react';
import Chart from 'chart.js';
import { getTopicInfo } from '../../actions/dashboard-actions';
import { isSensor } from '../../components/shared/tois-by-function';
import Enums from '../../utils/Enums';

const ChartLayout = props => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h5">{props.chartTitle}</div>
    </div>
    <div className="card-image">
      {props.children}
    </div>
    <div className="card-body">
      Este sensor detecta la posición de la perilla.
    </div>
  </div>
);

class SensorChart extends React.Component {
  componentDidMount() {
    const { timestamps, data, topic } = this.props;
    // console.log('data:', data);

    this.ctx = document.getElementById(topic);
    const chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
    };
    const config = {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          label: 'Medición',
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          data,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: 'Grafica del Sensor',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Línea de Tiempo',
            },
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Valor Medido',
            },
          }],
        },
      },
    };
    this.myChart = new Chart(this.ctx, config);
  }

  componentWillReceiveProps(props) {
    const { timestamps, data } = props;
    this.myChart.data.datasets[0].data = data;
    this.myChart.data.labels = timestamps;
    this.myChart.update();
  }

  render() {
    const { topic } = this.props;
    const topicInfo = getTopicInfo(topic);
    return (
      <ChartLayout chartTitle={`${Enums[topicInfo[1]]} ${topicInfo[2]}`}>
        <canvas id={`${topic}`} width="400" height="200" />
      </ChartLayout>
    );
  }
}

const getTopicComponent = (topic) => {
  const toiType = getTopicInfo(topic)[1];
  switch (true) {
    case isSensor(toiType):
      return SensorChart;
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
