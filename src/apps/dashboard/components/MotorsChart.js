import React from 'react';
import Chart from 'chart.js';
import Enums from '../../../utils/Enums';
import { colors } from '../../../api/tois';

const ChartLayout = ({ chartTitle, children, chartProps, value }) => (
  <div className="card">
    <div className="card-header" style={{ paddingTop: 5 }}>
      <div className="card-title h5">
        {chartTitle}
        <span style={{ color: chartProps.chartColor }}>
          {chartProps.toText(value)}
        </span>
      </div>
    </div>
    <div className="card-image" style={{ paddingTop: 5 }}>
      {children}
    </div>
  </div>
);

class MotorsChart extends React.Component {
  componentWillMount() {
    const { data, topic, requestTopic } = this.props;
    if (data.length === 0) {
      requestTopic(topic);
    }
  }

  componentDidMount() {
    const {
      timestamps,
      data,
      topic,
      chartProps
    } = this.props;

    this.ctx = document.getElementById(topic);
    const config = {
      type: 'bar',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Medición',
            backgroundColor: chartProps.chartColor,
            borderColor: chartProps.chartColor,
            data,
            // fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: colors.dashboardText,
          },
        },
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
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Valor Medido',
                fontColor: colors.dashboardText,
                padding: 10,
              },
              gridLines: {
                color: '#343355',
              },
              ticks: {
                fontColor: colors.dashboardText,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: '#343355',
              },
              ticks: {
                fontColor: colors.dashboardText,
              },
            },
          ],
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

  componentWillUnmount() {
    this.myChart.destroy();
  }

  render() {
    const { topic, topicInfo, chartProps, data } = this.props;
    const value = data.length > 0 ? data[data.length - 1] : undefined;
    // const topicInfo = getTopicInfo(topic);
    return (
      <div className="column col-6 col-lg-6 my-1">
        <ChartLayout
          chartTitle={`${Enums[topicInfo[1]]} #${topicInfo[2]}`}
          chartProps={chartProps}
          value={value}
        >
          <canvas id={`${topic}`} height="150" />
        </ChartLayout>
      </div>
    );
  }
}

export default MotorsChart;
