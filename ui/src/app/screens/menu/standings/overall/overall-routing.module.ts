import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverallScreen } from './overall.screen';

const routes: Routes = [
  {
    path: '',
    component: OverallScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverallRoutingModule { }
