import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictionsScreen } from './predictions.screen';

const routes: Routes = [
  {
    path: '',
    component: PredictionsScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionsRoutingModule { }
