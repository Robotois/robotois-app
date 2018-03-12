import React from 'react';
import Chart from 'chart.js';
import Enums from '../../../utils/Enums';

const ChartLayout = ({ chartTitle, children, chartProps, value }) => (
  <div className="card">
    <div className="card-header" style={{ paddingTop: 5 }}>
      <div className="card-title h5 is-bold">{chartTitle} : <span className="dark-bg is-medium rounded">{chartProps.toText(value)}</span></div>
    </div>
    <div className="card-image" style={{ paddingTop: 5 }}>
      {children}
    </div>
  </div>
);

class SensorChart extends React.Component {
  componentWillMount() {
    const { data, topic, requestTopic } = this.props;
    if (data.length === 0) {
      // console.log('requestTopic:', topic);
      requestTopic(topic);
    }
    // console.log('Chart.js:', Chart.defaults.global);
    // Chart.defaults.global.defaultFontColor = '#EAE8FF';
    // Chart.defaults.global.defaultColor = '#EAE8FF';
  }

  componentDidMount() {
    const { timestamps, data, topic, chartProps } = this.props;
    // console.log('data:', data);

    this.ctx = document.getElementById(topic);
    const config = {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          label: 'Medición',
          backgroundColor: chartProps.chartColor,
          borderColor: chartProps.chartColor,
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
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Valor Medido',
            },
          }],
        },
        animation: {
          duration: 100,
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
    const { topic, topicInfo, chartProps, data } = this.props;
    const value = data.length > 0 ? data[data.length - 1] : undefined;
    // const topicInfo = getTopicInfo(topic);
    return (
      <div className="column col-6 col-lg-6 my-1">
        <ChartLayout
          chartTitle={`${Enums[topicInfo[1]]} - ${topicInfo[2]}`}
          chartProps={chartProps}
          value={value}
        >
          <canvas id={`${topic}`} height="150" />
        </ChartLayout>
      </div>
    );
  }
}

export default SensorChart;
