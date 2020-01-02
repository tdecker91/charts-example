import { D3ChartsComponent } from './d3-charts.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports : [
    RouterModule.forChild([{
      path: '',
      component: D3ChartsComponent
    }])
  ],
  declarations: [D3ChartsComponent],
  exports: []
})
export class D3ChartsModules {}
