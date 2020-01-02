import { ChartjsComponent } from './chartjs/chartjs.component';
import { OutputGraphComponent } from './highcharts/highcharts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'highcharts',
  component: OutputGraphComponent
}, {
  path: 'chartjs',
  component: ChartjsComponent
}, {
  path: 'd3',
  loadChildren: () => import('./d3/d3-charts.module').then(mod => mod.D3ChartsModules)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
