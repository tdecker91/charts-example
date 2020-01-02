import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputGraphComponent } from './highcharts/highcharts.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import * as ItemSeries from 'highcharts/modules/item-series.src';
import * as NetworkGraph from 'highcharts/modules/networkgraph.src';
import * as Sankey from 'highcharts/modules/sankey.src';
import * as Organization from 'highcharts/modules/organization.src';
import * as PareTo from 'highcharts/modules/pareto.src';
import * as Funnel from 'highcharts/modules/funnel.src';
import * as SolidGauge from 'highcharts/modules/solid-gauge.src';
import * as more from 'highcharts/highcharts-more.src';
import * as annotations from 'highcharts/modules/annotations.src';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { RoundProgressComponent } from './round-progress/round-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputGraphComponent,
    ChartjsComponent,
    RoundProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartModule,
    RoundProgressModule,
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [
      more,
      ItemSeries,
      NetworkGraph,
      Sankey,
      Organization,
      PareTo,
      Funnel,
      SolidGauge,
      annotations
    ]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
