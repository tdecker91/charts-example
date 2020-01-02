import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as ChartJs from 'chart.js';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.less']
})
export class ChartjsComponent implements OnInit, AfterViewInit, OnDestroy {

  private data: number[] = [];

  chartType: any = 'bar';
  num = 10;

  chart: any;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.randomizeData();
    this.draw();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }

  randomizeData() {
    this.data = [];
    for (let i = 0; i < this.num; i++) {
      this.data.push(Math.floor(Math.random() * 100));
    }
  }

  draw = () => {
    if (this.chart) {
      this.chart.destroy();
    }
    console.log(this.data);
    const ctx = (document.getElementById('mychart') as any).getContext('2d');
    this.chart = new ChartJs.Chart(ctx, {
      type: this.chartType,
      data: {
        labels: this.data.map((d) => d.toString()),
        datasets: [{
          label: 'My Data',
          data: [...this.data],
          backgroundColor: 'rgb(124,181,236)',
          fill: this.chartType !== 'line',
          lineTension: 0
        }]
      },
      options: {
        onClick: (c, i) => {
          console.log(c, i);
        }
      }
    });
  }

}
