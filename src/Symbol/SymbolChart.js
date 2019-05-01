import React, { Component } from 'react';
import './SymbolChart.css';

const google = window.google;

class SymbolChart extends Component {

  static COLUMN_TICK_INDEX() { return 'TICKINDEX'; }
  static COLUMN_TICK_TOOLTIP() { return 'TICKTOOLTIP'; }
  static COLUMN_LOW() { return 'LOW'; }
  static COLUMN_OPEN() { return 'OPEN'; }
  static COLUMN_CLOSE() { return 'CLOSE'; }
  static COLUMN_HIGH() { return 'HIGH'; }
  static COLUMN_PRICE_STYLE() { return 'PRICESTYLE'; } // useless, but keep
  static COLUMN_INFORMATION() { return 'INFORMATION'; }
  static COLUMN_INFORMATION_ANNOTATION() { return 'INFORMATIONANNOTATION'; }
  // static COLUMN_INFORMATION_ANNOTATION_TEXT() { return 'INFORMATIONANNOTATIONTEXT'; }
  static COLUMN_VOLUME() { return 'VOLUME'; }
  static COLUMN_VOLUME_STYLE() { return 'VOLUMESTYLE'; }
  static COLUMN_INDICATOR_SMA0005() { return 'SMA0005'; }
  static COLUMN_INDICATOR_SMA0010() { return 'SMA0010'; }
  static COLUMN_INDICATOR_SMA0020() { return 'SMA0020'; }
  static COLUMN_INDICATOR_SMA0060() { return 'SMA0060'; }
  static COLUMN_INDICATOR_SMA0120() { return 'SMA0120'; }
  static COLUMN_INDICATOR_SMA0240() { return 'SMA0240'; }

  static getColumnIndex(name) {

    let index = -1;
  
    if (name === SymbolChart.COLUMN_TICK_INDEX()) { index = 0; }
    else if (name === SymbolChart.COLUMN_TICK_TOOLTIP()) { index = 1; }
    else if (name === SymbolChart.COLUMN_LOW()) { index = 2; }
    else if (name === SymbolChart.COLUMN_OPEN()) { index = 3; }
    else if (name === SymbolChart.COLUMN_CLOSE()) { index = 4; }
    else if (name === SymbolChart.COLUMN_HIGH()) { index = 5; }
    else if (name === SymbolChart.COLUMN_PRICE_STYLE()) { index = 6; }
    else if (name === SymbolChart.COLUMN_INFORMATION()) { index = 7; }
    else if (name === SymbolChart.COLUMN_INFORMATION_ANNOTATION()) { index = 8; }
    // else if (name === SymbolChart.COLUMN_INFORMATION_ANNOTATION_TEXT()) { index = 17; }
    else if (name === SymbolChart.COLUMN_VOLUME()) { index = 9; }
    else if (name === SymbolChart.COLUMN_VOLUME_STYLE()) { index = 10; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0005()) { index = 11; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0010()) { index = 12; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0020()) { index = 13; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0060()) { index = 14; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0120()) { index = 15; }
    else if (name === SymbolChart.COLUMN_INDICATOR_SMA0240()) { index = 16; }
  
    return index;
  }

  static getColumnIndexes(names) { return names.map(x => SymbolChart.getColumnIndex(x)); }

  static getDateString(datetime) { return (new Date(parseInt(datetime, 10))).toISOString().substring(0, 10); }

  static getPriceStyle(open, close) { return open <= close ? 'fill-color: #1b5e20; stroke-width: 0' : 'fill-color: #b71c1c; stroke-width: 0'; }
    
  static getVolumeStyle(open, close) { return open <= close ? 'color: #388e3c' : 'color: #d32f2f'; }

  static getTickTooltip(tick) {

    let tooltip = '';

    tooltip += '<div style="padding:5px 5px 5px 5px;">';

    tooltip += '<table class="tick">';

    tooltip += '<tr><td style="text-align:left;"><b>Date:</b></td><td>' + SymbolChart.getDateString(tick.datetime) + '</td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>&nbsp;</b></td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>Open:</b></td><td>' + tick.record.open + '</td></tr>';
    tooltip += '<tr><td style="text-align:left;"><b>High:</b></td><td>' + tick.record.high + '</td></tr>';
    tooltip += '<tr><td style="text-align:left;"><b>Low:</b></td><td>' + tick.record.low + '</td></tr>';
    tooltip += '<tr><td style="text-align:left;"><b>Close:</b></td><td>' + tick.record.close + '</td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>&nbsp;</b></td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>Volume:</b></td><td>' + parseInt(tick.record.volume, 10).toLocaleString('en-US') + '</td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>&nbsp;</b></td></tr>';

    tooltip += '<tr><td style="text-align:left;"><b>SSMA:</b></td><td>' + (tick.strategy.ssma === undefined ? '' : tick.strategy.ssma) + '</td></tr>';
    tooltip += '<tr><td style="text-align:left;"><b>LSMA:</b></td><td>' + (tick.strategy.lsma === undefined ? '' : tick.strategy.lsma) + '</td></tr>';

    tooltip += '</table>';

    tooltip += '</div>';

    return tooltip;
  }

  static getInformationAnnotation(tick) {

    let ssma = tick.strategy.ssma === undefined ? '' : 'SSMA: ' + tick.strategy.ssma + '\n';
    let lsma = tick.strategy.lsma === undefined ? '' : 'LSMA: ' + tick.strategy.lsma + '\n';

    let annotation = tick.strategy.ssma === undefined && tick.strategy.lsma === undefined ? undefined : ssma + lsma;

    return annotation;
  }

  componentDidUpdate() {
    google.charts.load('current', {'packages':['corechart', 'controls']});
    google.charts.setOnLoadCallback(this.drawVisualization);
  }

  drawVisualization = () => {

    const { ticks } = this.props;

    let dataLength = 0;

    ticks.map(
      tick => {
        tick.index = dataLength++;
        return undefined;
      }
    )

    const dataTable = google.visualization.arrayToDataTable([[
        {'role': 'domain', 'type': 'number', 'label': SymbolChart.COLUMN_TICK_INDEX()},
        {'role': 'tooltip', 'type': 'string', 'p': {'html': true}},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_LOW()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_OPEN()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_CLOSE()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_HIGH()},
        {'role': 'style', 'type': 'string'},
        {'role': 'data', 'type': 'number'},
        {'role': 'annotation', 'type': 'string'},
        // {'role': 'annotationText', 'type': 'string'},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_VOLUME()},
        {'role': 'style', 'type': 'string'},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0005()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0010()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0020()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0060()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0120()},
        {'role': 'data', 'type': 'number', 'label': SymbolChart.COLUMN_INDICATOR_SMA0240()},
      ],]
      .concat(
        ticks.map(
          tick => [
            tick.index,
            SymbolChart.getTickTooltip(tick),
            tick.record.low,
            tick.record.open,
            tick.record.close,
            tick.record.high,
            SymbolChart.getPriceStyle(tick.record.open, tick.record.close),
            tick.record.close,
            SymbolChart.getInformationAnnotation(tick),
            // "yy",
            tick.record.volume,
            SymbolChart.getVolumeStyle(tick.record.open, tick.record.close),
            tick.indicator.sma0005 === '0' ? undefined : tick.indicator.sma0005,
            tick.indicator.sma0010 === '0' ? undefined : tick.indicator.sma0010,
            tick.indicator.sma0020 === '0' ? undefined : tick.indicator.sma0020,
            tick.indicator.sma0060 === '0' ? undefined : tick.indicator.sma0060,
            tick.indicator.sma0120 === '0' ? undefined : tick.indicator.sma0120,
            tick.indicator.sma0240 === '0' ? undefined : tick.indicator.sma0240,
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
        'height': '400',
        'legend': {
          'position': 'top',
        },
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
          'height':'90%',
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
          SymbolChart.COLUMN_TICK_INDEX(),
          SymbolChart.COLUMN_TICK_TOOLTIP(),
          SymbolChart.COLUMN_LOW(),
          SymbolChart.COLUMN_OPEN(),
          SymbolChart.COLUMN_CLOSE(),
          SymbolChart.COLUMN_HIGH(),
          // SymbolChart.COLUMN_PRICE_STYLE(),
          SymbolChart.COLUMN_INFORMATION(),
          SymbolChart.COLUMN_INFORMATION_ANNOTATION(),
          // SymbolChart.COLUMN_INFORMATION_ANNOTATION_TEXT(),
          SymbolChart.COLUMN_INDICATOR_SMA0005(),
          SymbolChart.COLUMN_INDICATOR_SMA0010(),
          SymbolChart.COLUMN_INDICATOR_SMA0020(),
          SymbolChart.COLUMN_INDICATOR_SMA0060(),
          SymbolChart.COLUMN_INDICATOR_SMA0120(),
          SymbolChart.COLUMN_INDICATOR_SMA0240(),
        ]),
      },
    });

    google.visualization.events.addListener(candlestick, 'select', () => { candlestick.getChart().setSelection(); } );

    var volume = new google.visualization.ChartWrapper({
      'chartType': 'ColumnChart',
      'containerId': 'symbol-volume',
      'options': {
        'width': '100%',
        'height': '100',
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
          'height':'90%',
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
          SymbolChart.COLUMN_TICK_INDEX(),
          SymbolChart.COLUMN_TICK_TOOLTIP(),
          SymbolChart.COLUMN_VOLUME(),
          SymbolChart.COLUMN_VOLUME_STYLE(),
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
        'filterColumnIndex': SymbolChart.getColumnIndex(SymbolChart.COLUMN_TICK_INDEX()),
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'width': '100%',
            'height': '100',
            'chartArea': {
              'width': '80%',
              'height':'90%',
            },
            'hAxis': {
              'baselineColor': 'none',
              'ticks': ticks.filter(tick => (tick.index % 60) === 0).map(tick => { return {'v': tick.index, 'f': SymbolChart.getDateString(tick.datetime)}; }),
            },
          },
          'chartView': {
            'columns': SymbolChart.getColumnIndexes([
              SymbolChart.COLUMN_TICK_INDEX(),
              SymbolChart.COLUMN_CLOSE(),
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
          'height':'90%',
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
          SymbolChart.COLUMN_TICK_INDEX(),
          SymbolChart.COLUMN_INFORMATION(),
          // SymbolChart.COLUMN_TICK_TOOLTIP(),
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
