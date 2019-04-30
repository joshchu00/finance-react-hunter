import React, { Component } from 'react';
import './SymbolChart.css';

const google = window.google;

class SymbolChart extends Component {

  static COLUMN_TICK_INDEX() { return 'tickIndex'; }
  static COLUMN_TICK_TOOLTIP() { return 'tickTooltip'; }
  static COLUMN_LOW() { return 'low'; }
  static COLUMN_OPEN() { return 'open'; }
  static COLUMN_CLOSE() { return 'close'; }
  static COLUMN_HIGH() { return 'high'; }
  static COLUMN_PRICE_STYLE() { return 'priceStyle'; } // useless, but keep
  static COLUMN_INFORMATION() { return 'information'; }
  static COLUMN_INFORMATION_ANNOTATION() { return 'informationAnnotation'; }
  // static COLUMN_INFORMATION_ANNOTATION_TEXT() { return 'informationAnnotationText'; }
  static COLUMN_VOLUME() { return 'volume'; }
  static COLUMN_VOLUME_STYLE() { return 'volumeStyle'; }
  static COLUMN_VOLUME_TOOLTIP() { return 'volumeTooltip'; }
  static COLUMN_INDICATOR_SMA0005() { return 'indicatorSMA0005'; }
  static COLUMN_INDICATOR_SMA0010() { return 'indicatorSMA0010'; }
  static COLUMN_INDICATOR_SMA0020() { return 'indicatorSMA0020'; }
  static COLUMN_INDICATOR_SMA0060() { return 'indicatorSMA0060'; }
  static COLUMN_INDICATOR_SMA0120() { return 'indicatorSMA0120'; }
  static COLUMN_INDICATOR_SMA0240() { return 'indicatorSMA0240'; }

  static getColumnIndex(name) {

    let index = -1;
  
    if (name === SymbolChart.COLUMN_TICK_INDEX) { index = 0; }
    else if (name === SymbolChart.COLUMN_TICK_TOOLTIP) { index = 1; }
    else if (name === SymbolChart.COLUMN_LOW) { index = 2; }
    else if (name === SymbolChart.COLUMN_OPEN) { index = 3; }
    else if (name === SymbolChart.COLUMN_CLOSE) { index = 4; }
    else if (name === SymbolChart.COLUMN_HIGH) { index = 5; }
    else if (name === SymbolChart.COLUMN_PRICE_STYLE) { index = 6; }
    else if (name === SymbolChart.COLUMN_INFORMATION) { index = 7; }
    else if (name === SymbolChart.COLUMN_INFORMATION_ANNOTATION) { index = 8; }
    // else if (name === SymbolChart.COLUMN_INFORMATION_ANNOTATION_TEXT) { index = 17; }
    else if (name === SymbolChart.COLUMN_VOLUME) { index = 9; }
    else if (name === SymbolChart.COLUMN_VOLUME_STYLE) { index = 10; }
    else if (name === SymbolChart.COLUMN_VOLUME_TOOLTIP) { index = 11; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0005) { index = 12; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0010) { index = 13; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0020) { index = 14; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0060) { index = 15; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0120) { index = 16; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0240) { index = 17; }
  
    return index;
  }

  static getColumnIndexes(names) { return names.map(x => SymbolChart.getColumnIndex(x)); }

  static getPriceStyle(open, close) { return open <= close ? 'fill-color: #1b5e20; stroke-width: 0' : 'fill-color: #b71c1c; stroke-width: 0'; }
    
  static getVolumeStyle(open, close) { return open <= close ? 'color: #388e3c' : 'color: #d32f2f'; }

  componentDidUpdate() {
    google.charts.load('current', {'packages':['corechart', 'controls']});
    google.charts.setOnLoadCallback(this.drawVisualization);
  }

  drawVisualization = () => {

    const { ticks } = this.props;

    let dataLength = 0;

    const data = ticks.map(
      tick => {
        return {
          index: dataLength++,
          datetime: tick.datetime,
          date: new Date(parseInt(tick.datetime, 10)),
          record: {
            open: tick.record.open,
            high: tick.record.high,
            low: tick.record.low,
            close: tick.record.close,
            volume: tick.record.volume,
          },
          indicator: {
            sma0005: tick.indicator.sma0005,
            sma0010: tick.indicator.sma0010, 
            sma0020: tick.indicator.sma0020, 
            sma0060: tick.indicator.sma0060, 
            sma0120: tick.indicator.sma0120, 
            sma0240: tick.indicator.sma0240, 
          },
          strategy: {
            ssma: tick.strategy.ssma,
            lsma: tick.strategy.lsma,
          }
        };
      }
    )

    const dataTable = google.visualization.arrayToDataTable([[
        {'role': 'domain', 'type': 'number', 'label': SymbolChart.COLUMN_TICK_INDEX},
        {'role': 'tooltip', 'type': 'string', 'p': {'html': true}},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_LOW},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_OPEN},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_CLOSE},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_HIGH},
        {'role': 'style', 'type': 'string'},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INFORMATION},
        {'role': 'annotation', 'type': 'string'},
        // {'role': 'annotationText', 'type': 'string'},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_VOLUME},
        {'role': 'style', 'type': 'string'},
        {'role': 'tooltip', 'type': 'string'},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0005},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0010},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0020},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0060},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0120},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0240},
      ],]
      .concat(
        data.map(
          datum => {

            let dateString = 'Date: ' + datum.date.toISOString().substring(0, 10);
            let openString = 'Open: ' + datum.record.open;
            let highString = 'High: ' + datum.record.high;
            let lowString = 'Low: ' + datum.record.low;
            let closeString = 'Close: ' + datum.record.close;

            let tickTooltip = dateString + '\n\n' + openString + '\n' + highString + '\n' + lowString + '\n' + closeString

            let ssmaString = datum.strategy.ssma === undefined ? '' : 'SSMA: ' + datum.strategy.ssma;
            let lsmaString = datum.strategy.lsma === undefined ? '' : 'LSMA: ' + datum.strategy.lsma;

            let informationAnnotation = datum.strategy.ssma === undefined && datum.strategy.lsma === undefined ? undefined : ssmaString + '\n' + lsmaString

            return [
              datum.index,
              tickTooltip,
              datum.record.low,
              datum.record.open,
              datum.record.close,
              datum.record.high,
              SymbolChart.getPriceStyle(datum.record.open, datum.record.close),
              datum.record.close,
              informationAnnotation,
              // "yy",
              datum.record.volume,
              SymbolChart.getVolumeStyle(datum.record.open, datum.record.close),
              datum.record.volume,
              datum.indicator.sma0005 === '0' ? undefined : datum.indicator.sma0005,
              datum.indicator.sma0010 === '0' ? undefined : datum.indicator.sma0010,
              datum.indicator.sma0020 === '0' ? undefined : datum.indicator.sma0020,
              datum.indicator.sma0060 === '0' ? undefined : datum.indicator.sma0060,
              datum.indicator.sma0120 === '0' ? undefined : datum.indicator.sma0120,
              datum.indicator.sma0240 === '0' ? undefined : datum.indicator.sma0240,
            ]
          }
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
        'tooltip': {
          'isHtml': true,
        },
        'focusTarget': 'category',
        'crosshair': {
          'trigger': 'focus',
          'orientation': 'vertical',
          'color': '#616161',
        },
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
             'stroke': '#2e7d32',
             'fill': '#388e3c', 
          }, // green
          'fallingColor': {
            'strokeWidth': 1, 
            'stroke': '#c62828', 
            'fill': '#d32f2f', 
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
            'color': 'transparent',
            'lineWidth': 1,
            'annotations': {
              'stem': {
                'color': '#424242',
                'length': 75,
              },
              'textStyle': {
                'fontSize': 12,
                'color': '#424242',
              },
            },
          },
          '2': {
            'type': 'line',
            'color': '#e57373',
            'lineWidth': 1,
          }, 
          '3': {
            'type': 'line',
            'color': '#ffb74d',
            'lineWidth': 1,
          }, 
          '4': {
            'type': 'line',
            'color': '#fff176',
            'lineWidth': 1,
          }, 
          '5': {
            'type': 'line',
            'color': '#81c784',
            'lineWidth': 1,
          }, 
          '6': {
            'type': 'line',
            'color': '#64b5f6',
            'lineWidth': 1,
          }, 
          '7': {
            'type': 'line',
            'color': '#ba68c8',
            'lineWidth': 1,
          }, 
        },
      },
      'view': {
        'columns': SymbolChart.getColumnIndexes([
          SymbolChart.COLUMN_TICK_INDEX,
          SymbolChart.COLUMN_TICK_TOOLTIP,
          SymbolChart.COLUMN_LOW,
          SymbolChart.COLUMN_OPEN,
          SymbolChart.COLUMN_CLOSE,
          SymbolChart.COLUMN_HIGH,
          // SymbolChart.COLUMN_PRICE_STYLE,
          SymbolChart.COLUMN_INFORMATION,
          SymbolChart.COLUMN_INFORMATION_ANNOTATION,
          // SymbolChart.COLUMN_INFORMATION_ANNOTATION_TEXT,
          SymbolChart.COLUMN_INDICATOR_SMA0005,
          SymbolChart.COLUMN_INDICATOR_SMA0010,
          SymbolChart.COLUMN_INDICATOR_SMA0020,
          SymbolChart.COLUMN_INDICATOR_SMA0060,
          SymbolChart.COLUMN_INDICATOR_SMA0120,
          SymbolChart.COLUMN_INDICATOR_SMA0240,
        ]),
      },
    });

    google.visualization.events.addListener(candlestick, 'select', () => { candlestick.getChart().setSelection(); } );

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
          SymbolChart.COLUMN_TICK_INDEX,
          SymbolChart.COLUMN_VOLUME,
          SymbolChart.COLUMN_VOLUME_STYLE,
          SymbolChart.COLUMN_VOLUME_TOOLTIP,
        ]),
      },
    });

    google.visualization.events.addListener(volume, 'select', () => { volume.getChart().setSelection(); } );

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
        'filterColumnIndex': SymbolChart.getColumnIndex(SymbolChart.COLUMN_TICK_INDEX),
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
              SymbolChart.COLUMN_TICK_INDEX,
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
          SymbolChart.COLUMN_TICK_INDEX,
          SymbolChart.COLUMN_INFORMATION,
          // SymbolChart.COLUMN_TICK_TOOLTIP,
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
