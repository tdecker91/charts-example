import { Chart } from 'angular-highcharts';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as faker from 'faker';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.less']
})
export class OutputGraphComponent implements OnInit, AfterViewInit {

  private data: number[] = [];
  seriesType: any = 'bar';
  num = 10;

  chart: Chart;

  constructor() { }

  private generateNetworkSeriesData() {
    const words = [];
    const data = [];
    for (let i = 0; i < this.num; i++) {
      words.push(faker.random.word());
    }

    for (let i = 0; i < this.num; i++) {
      data.push({
        to: words[Math.floor(Math.random() * words.length)],
        from: words[Math.floor(Math.random() * words.length)]
      });
    }

    return data;
  }

  ngOnInit() {
    this.randomizeData();
  }

  randomizeData() {
    this.data = [];
    for (let i = 0; i < this.num; i++) {
      this.data.push(Math.floor(Math.random() * 100));
    }
    this.draw();
  }

  getTypeData(type: string) {
    if (type === 'networkgraph') {
      return this.generateNetworkSeriesData();
    }
    if (type === 'organization') {
      return this.generateNetworkSeriesData();
    }
    if (type === 'solidgauge') {
      return [{
        radius: '112%',
        innerRadius: '88%',
        y: Math.floor(Math.random() * 100)
      }];
    }

    return this.data;
  }

  getTypeOptions() {
    const options = {
      title: {
        text: 'My Chart'
      },
      subtitle: {
        text: 'My Chart\'s subtitle'
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          }
        },
      },
      series: [{
        name: 'My Series',
        data: this.getTypeData(this.seriesType) as any,
        type: this.seriesType,
        point: {
          events: {
            click: function(e) {
              console.log(e, this);
            }
          }
        }
      }]
    };

    switch (this.seriesType) {
      case 'solidgauge':
        return this.setGaugeOptions(options);
      default:
        return options;
    }
  }

  setGaugeOptions(options) {
    return {
      ...options,
      chart: {
        ...options.chart,
        events: {
          render: this.renderNumber
        }
      },
      plotOptions: {
        ...options.plotOptions,
        solidgauge: {
          dataLabels: {
              enabled: false
          },
          // linecap: 'round',
          stickyTracking: false,
          // rounded: true
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },
      pane: {
        startAngle: 0,
        endEngle: 360,
        background: [
          {
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(.3).get()
          }
        ]
      },
      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            display: 'none'
        },
        valueSuffix: '%',
        pointFormat: '{series.name}<br><span style="font-size:4em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
      },
    };
  }

  draw() {
    this.chart = new Chart(this.getTypeOptions());
  }

  ngAfterViewInit() {
    this.draw();
  }

  renderNumber() {
    const chart: Highcharts.Chart = this as any;
    const renderer = chart.renderer;
    const elem = renderer.text(`<span style="font-size:6em; color: ${chart.series[0].points[0].color}">${chart.series[0].points[0].y}</span>`,
      0,
      0, true
      );
    let bbox = elem.getBBox();
    console.log(chart.chartWidth, chart.chartHeight, bbox);
    elem.add();
    bbox = elem.getBBox();
    elem.align({x: (chart.chartWidth / 2) - bbox.width / 2, y: (chart.chartHeight / 2)});
    console.log(chart.chartWidth, chart.chartHeight, bbox);


    console.log(chart);
  }

}
