import React, { Component } from 'react';
import './SymbolChart.css';

const google = window.google;

class SymbolChart extends Component {

  componentDidMount() {
    google.charts.load('current', {'packages':['corechart', 'controls']});
    google.charts.setOnLoadCallback(this.drawVisualization);
  }

  drawVisualization = () => {

    const { records } = this.props;

    const data = google.visualization.arrayToDataTable([[
        {type: 'date', label: 'Date'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        {type: 'number', label: 'Something'},
        // {type: 'string', role: 'annotation'},
        // {type: 'string', role: 'annotationText'},
      ],]
      .concat(
        records.map(
          record => [
            new Date(parseInt(record.datetime, 10)), 
            record.low,
            record.open,
            record.close,
            record.high,
            22 + Math.random() * 3,
            20 + Math.random() * 10,
          ]
        )
      )
    );

    var dashboard = new google.visualization.Dashboard(
      document.getElementById('symbol-chart'),
    );

    var candlestick = new google.visualization.ChartWrapper({
      'chartType': 'ComboChart',
      'containerId': 'symbol-candlestick',
      'options': {
        'width': '100%',
        'height': '300',
        'legend': 'none',
        'bar': {
          'groupWidth': '80%',
        },
        'candlestick': {
          'risingColor': {
             'strokeWidth': 2,
             'stroke': '#0b6e3e',
             'fill': '#0f9d58', 
          }, // green
          'fallingColor': {
            'strokeWidth': 2, 
            'stroke': '#781c0e', 
            'fill': '#a52714', 
          }, // red
        },
        'seriesType': 'line',
        'series': {
          '0': {
            'type': 'candlesticks',
            'color': 'black', 
          }, 
          '1': {
            'type': 'line',
            'color': 'black', 
          },
        },
      },
      'view': {'columns': [0, 1, 2, 3, 4, 5]}
    });

    var control = new google.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'symbol-control',
      'options': {
        'filterColumnIndex': 0,
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'width': '100%',
            'height': '100',
            'hAxis': { 'baselineColor': 'none' },
          },
          'chartView': {
            'columns': [0, 3],
          },
        },  
      },
    });

    var column = new google.visualization.ChartWrapper({
      'chartType': 'ColumnChart',
      'containerId': 'symbol-column',
      'options': {
        'width': '100%',
        'height': '100',
        'legend': 'none',
        'bar': {
          'groupWidth': '80%',
        },
      },
      'view': {'columns': [0, 6]}
    });

    dashboard.bind(control, candlestick);
    dashboard.bind(control, column);

    dashboard.draw(data);
  }

  render() {
    return (
      <div id='symbol-chart' className='Symbol-chart'>
        <div id='symbol-candlestick'></div>
        <div id='symbol-control'></div>
        <div id='symbol-column'></div>
      </div>
    );
  }
}

export default SymbolChart;
