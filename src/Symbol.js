import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import './Symbol.css';

class Symbol extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      records: [],
      error: null,
    };
  }

  componentDidMount() {

    const { exchange, symbol, period } = this.props.match.params;

    fetch(`http://localhost:50080/porter/v1/exchange/${exchange}/symbol/${symbol}/period/${period}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => this.setState({ name: data.name, records: data.records }))
      .catch(error => this.setState({ error }));
  }

  render() {

    const { records, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    // const { exchange, symbol, period } = this.props.match.params;

    const data = [
      [
        {type: 'date', label: 'Date'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        // {type: 'number', role: 'data', label: 'Something'},
        // {type: 'string', role: 'annotation'},
        // {type: 'string', role: 'annotationText'},
      ],
    ].concat(
      records.map((record) => 
        [new Date(parseInt(record.datetime, 10)), record.low, record.open, record.close, record.high]
      )
    );

    return (
      <div className='Symbol'>
        <Chart
          width='100%'
          height='600px'
          chartType='ComboChart'
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            legend: 'none',
            bar: {
              groupWidth: '80%',
            }, // Remove space between bars.
            candlestick: {
              risingColor: {
                 strokeWidth: 2,
                 stroke: '#0b6e3e',
                 fill: '#0f9d58', 
              }, // green
              fallingColor: {
                strokeWidth: 2, 
                stroke: '#781c0e', 
                fill: '#a52714', 
              }, // red
            },
            seriesType: 'line',
            series: {
              0: {
                type: 'candlesticks',
                color: 'black', 
              }, 
              1: {
                type: 'line',
                color: 'black', 
              },
            },
          }}
          controls={[
            {
              controlType: 'ChartRangeFilter',
              options: {
                filterColumnIndex: 0,
                ui: {
                  chartType: 'LineChart',
                  chartOptions: {
                    chartArea: { width: '80%', height: '50%' },
                    hAxis: { baselineColor: 'none' },
                  },
                  chartView: {
                    columns: [0, 3]
                  },
                },
              },
              controlPosition: 'bottom',
            },
          ]}
        />
      </div>
    );
  }
}

export default Symbol;
