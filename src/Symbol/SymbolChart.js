import React, { Component } from 'react';
import './SymbolChart.css';

const google = window.google;

class SymbolChart extends Component {

  static COLUMN_DATE() { return 'date'; }
  static COLUMN_LOW() { return 'low'; }
  static COLUMN_OPEN() { return 'open'; }
  static COLUMN_CLOSE() { return 'close'; }
  static COLUMN_HIGH() { return 'high'; }
  static COLUMN_CANDLESTICK_TOOLTIP() { return 'candlestickTooltip'; }
  static COLUMN_VOLUME() { return 'volume'; }
  static COLUMN_VOLUME_STYLE() { return 'volumeStyle'; }
  static COLUMN_VOLUME_TOOLTIP() { return 'volumeTooltip'; }
  static COLUMN_SOMETHING() { return 'something'; }
  static COLUMN_SOMETHING_TOOLTIP() { return 'somethingTooltip'; }
  static COLUMN_SOMETHING_ANNOTATION() { return 'somethingAnnotation'; }
  // static COLUMN_SOMETHING_ANNOTATION_TEXT() { return 'somethingAnnotationText'; }

  static getColumnIndex(name) {

    let index = -1;
  
    if (name === SymbolChart.COLUMN_DATE) { index = 0; }
    else if (name === SymbolChart.COLUMN_LOW) { index = 1; }
    else if (name === SymbolChart.COLUMN_OPEN) { index = 2; }
    else if (name === SymbolChart.COLUMN_CLOSE) { index = 3; }
    else if (name === SymbolChart.COLUMN_HIGH) { index = 4; }
    else if (name === SymbolChart.COLUMN_CANDLESTICK_TOOLTIP) { index = 5; }
    else if (name === SymbolChart.COLUMN_VOLUME) { index = 6; }
    else if (name === SymbolChart.COLUMN_VOLUME_STYLE) { index = 7; }
    else if (name === SymbolChart.COLUMN_VOLUME_TOOLTIP) { index = 8; }
    else if (name === SymbolChart.COLUMN_SOMETHING) { index = 9; }
    else if (name === SymbolChart.COLUMN_SOMETHING_TOOLTIP) { index = 10; }
    else if (name === SymbolChart.COLUMN_SOMETHING_ANNOTATION) { index = 11; }
    // else if (name === SymbolChart.COLUMN_SOMETHING_ANNOTATION_TEXT) { index = 12; }
  
    return index;
  }

  static getColumnIndexes(names) { return names.map(x => SymbolChart.getColumnIndex(x)); }
    
  static getVolumeStyle(open, close) { return open < close ? '#0f9d58' : '#a52714'; }

  componentDidUpdate() {
    google.charts.load('current', {'packages':['corechart', 'controls']});
    google.charts.setOnLoadCallback(this.drawVisualization);
  }

  drawVisualization = () => {

    const { records } = this.props;

    let dataLength = 0;

    const data = records.map(
      record => {
        return {
          index: dataLength++,
          datetime: record.datetime,
          date: new Date(parseInt(record.datetime, 10)),
          open: record.open,
          high: record.high,
          low: record.low,
          close: record.close,
          volume: record.volume,
          indicator: dataLength % 100 === 0 ? 'up' : (dataLength % 80 === 0 ? 'down' : undefined),
        };
      }
    )

    const dataTable = google.visualization.arrayToDataTable([[
        {type: 'number', label: SymbolChart.COLUMN_DATE},
        {type: 'number', label: SymbolChart.COLUMN_LOW},
        {type: 'number', label: SymbolChart.COLUMN_OPEN},
        {type: 'number', label: SymbolChart.COLUMN_CLOSE},
        {type: 'number', label: SymbolChart.COLUMN_HIGH},
        {role: 'tooltip', type: 'string'},
        {type: 'number', label: SymbolChart.COLUMN_VOLUME},
        {role: 'style', type: 'string'},
        {role: 'tooltip', type: 'string'},
        {type: 'number', label: SymbolChart.COLUMN_SOMETHING},
        {role: 'tooltip', type: 'string'},
        {role: 'annotation', type: 'string'},
        // {role: 'annotationText', type: 'string'},
      ],]
      .concat(
        data.map(
          datum => [
            datum.index,
            datum.low,
            datum.open,
            datum.close,
            datum.high,
            'Date: ' + datum.date.toISOString().substring(0, 10) + '\n\nOpen: ' + datum.open + '\nHigh: ' + datum.high + '\nLow: ' + datum.low + '\nClose: ' + datum.close,
            datum.volume,
            SymbolChart.getVolumeStyle(datum.open, datum.close),
            datum.volume,
            datum.close, //(datum.high - datum.low) * Math.random(),
            datum.close,
            datum.indicator,
            // "yy",
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
        'height': '500',
        'legend': 'none',
        'chartArea': {
          'width': '80%',
        },
        'hAxis': {
          'textPosition': 'none',
        },
        'bar': {
          'groupWidth': '95%',
        },
        'candlestick': {
          'risingColor': {
             'strokeWidth': 1,
             'stroke': '#0b6e3e',
             'fill': '#0f9d58', 
          }, // green
          'fallingColor': {
            'strokeWidth': 1, 
            'stroke': '#781c0e', 
            'fill': '#a52714', 
          }, // red
        },
        'curveType': 'function',
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
        'columns': SymbolChart.getColumnIndexes([
          SymbolChart.COLUMN_DATE,
          SymbolChart.COLUMN_LOW,
          SymbolChart.COLUMN_OPEN,
          SymbolChart.COLUMN_CLOSE,
          SymbolChart.COLUMN_HIGH,
          SymbolChart.COLUMN_CANDLESTICK_TOOLTIP,
          SymbolChart.COLUMN_SOMETHING,
          SymbolChart.COLUMN_SOMETHING_TOOLTIP,
          SymbolChart.COLUMN_SOMETHING_ANNOTATION,
          // SymbolChart.COLUMN_SOMETHING_ANNOTATION_TEXT,
        ]),
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
        'hAxis': {
          'textPosition': 'none',
        },
        'bar': {
          'groupWidth': '80%',
        },
      },
      'view': {
        'columns': SymbolChart.getColumnIndexes([
          SymbolChart.COLUMN_DATE,
          SymbolChart.COLUMN_VOLUME,
          SymbolChart.COLUMN_VOLUME_STYLE,
          SymbolChart.COLUMN_VOLUME_TOOLTIP,
        ]),
      },
    });

    var control = new google.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'symbol-control',
      'state': {
        'range': {
          'start': dataLength - 100,
          'end': dataLength,
        },
      },
      'options': {
        'filterColumnIndex': SymbolChart.getColumnIndex(SymbolChart.COLUMN_DATE),
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'width': '100%',
            'height': '100',
            'chartArea': {
              'width': '80%',
            },
            'hAxis': {
              'baselineColor': 'none',
              'ticks': data.filter(datum => (datum.index % 120) === 0).map(datum => { return {'v': datum.index, 'f': datum.date.toISOString().substring(0, 10)}; }),
            },
          },
          'chartView': {
            'columns': SymbolChart.getColumnIndexes([
              SymbolChart.COLUMN_DATE,
              SymbolChart.COLUMN_CLOSE,
            ]),
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
        'hAxis': {
          'textPosition': 'none',
        },
        'bar': {
          'groupWidth': '80%',
        },
      },
      'view': {
        'columns': SymbolChart.getColumnIndexes([
          SymbolChart.COLUMN_DATE,
          SymbolChart.COLUMN_SOMETHING,
          SymbolChart.COLUMN_SOMETHING_TOOLTIP,
        ]),
      },
    });

    dashboard.bind(control, candlestick);
    dashboard.bind(control, volume);
    dashboard.bind(control, column);

    dashboard.draw(dataTable);
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
