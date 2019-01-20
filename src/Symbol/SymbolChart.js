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

    const DATE = 'date';
    const LOW = 'low';
    const OPEN = 'open';
    const CLOSE = 'close';
    const HIGH = 'high';
    const VOLUME = 'volume';
    const VOLUMESTYLE = 'volumeStyle';
    const SOMETHING = 'something';

    const getDataIndex = (name) => {

      let index = -1;
    
      if (name === DATE) { index = 0; }
      else if (name === LOW) { index = 1; }
      else if (name === OPEN) { index = 2; }
      else if (name === CLOSE) { index = 3; }
      else if (name === HIGH) { index = 4; }
      else if (name === VOLUME) { index = 5; }
      else if (name === VOLUMESTYLE) { index = 6; }
      else if (name === SOMETHING) { index = 7; }
    
      return index;
    };

    const getDataIndexes = (names) => names.map(x => getDataIndex(x))
    
    const getVolumeStyle = (open, close) => open < close ? '#0f9d58' : '#a52714';

    const data = google.visualization.arrayToDataTable([[
        {type: 'date', label: DATE},
        {type: 'number', label: LOW},
        {type: 'number', label: OPEN},
        {type: 'number', label: CLOSE},
        {type: 'number', label: HIGH},
        {type: 'number', label: VOLUME},
        {role: 'style'},
        {type: 'number', label: SOMETHING},
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
            record.volume,
            getVolumeStyle(record.open, record.close),
            22 + Math.random() * 3,
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
        'chartArea': {
          'width': '80%',
        },
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
        'seriesType': 'candlesticks',
        'series': {
          '0': {
            'type': 'candlesticks',
            'color': 'black', 
          }, 
          '1': {
            'type': 'line',
            'color': 'blue',
          },
        },
      },
      'view': {
        'columns': getDataIndexes([DATE, LOW, OPEN, CLOSE, HIGH, SOMETHING]),
      },
    });

    var volume = new google.visualization.ChartWrapper({
      'chartType': 'ColumnChart',
      'containerId': 'symbol-volume',
      'options': {
        'width': '100%',
        'height': '150',
        'legend': 'none',
        'chartArea': {
          'width': '80%',
        },
        'bar': {
          'groupWidth': '80%',
        },
      },
      'view': {
        'columns': getDataIndexes([DATE, VOLUME, VOLUMESTYLE]),
      },
    });

    var control = new google.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'symbol-control',
      'options': {
        'filterColumnIndex': getDataIndex('date'),
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'width': '100%',
            'height': '100',
            'chartArea': {
              'width': '80%',
            },
            'hAxis': { 'baselineColor': 'none' },
          },
          'chartView': {
            'columns': getDataIndexes([DATE, CLOSE]),
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
        'chartArea': {
          'width': '80%',
        },
        'bar': {
          'groupWidth': '80%',
        },
      },
      'view': {
        'columns': getDataIndexes([DATE, SOMETHING]),
      },
    });

    dashboard.bind(control, candlestick);
    dashboard.bind(control, volume);
    dashboard.bind(control, column);

    dashboard.draw(data);
  }

  render() {
    return (
      <div id='symbol-chart' className='Symbol-chart'>
        <div id='symbol-candlestick'></div>
        <div id='symbol-volume'></div>
        <div id='symbol-control'></div>
        <div id='symbol-column'></div>
      </div>
    );
  }
}

export default SymbolChart;
