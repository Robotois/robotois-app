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

class SensorChart extends React.Component {
  componentWillMount() {
    // const { data, topic, requestTopic } = this.props;
    // if (data.length === 0) {
    //   requestTopic(topic);
    // }
  }

  componentDidMount() {
    const { values, timestamps, id, chartProps } = this.props;
    this.ctx = document.getElementById(id);
    const config = {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Medición',
            backgroundColor: chartProps.chartColor,
            borderColor: chartProps.chartColor,
            data: values,
            fill: false,
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
    const { timestamps, values } = props;
    this.myChart.data.datasets[0].data = values;
    this.myChart.data.labels = timestamps;
    this.myChart.update();
  }

  componentWillUnmount() {
    this.myChart.destroy();
  }

  render() {
    const { id, toiInfo, chartProps, values } = this.props;
    const lastValue = values.length > 0 ? values[values.length - 1] : undefined;
    // const topicInfo = getTopicInfo(topic);
    return (
      <div className="column col-6 col-lg-6 my-1">
        <ChartLayout
          chartTitle={`${Enums[toiInfo[0]]} #${toiInfo[1]}`}
          chartProps={chartProps}
          value={lastValue}
        >
          <canvas id={id} height="150" />
        </ChartLayout>
      </div>
    );
  }
}

export default SensorChart;
