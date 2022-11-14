import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoringScreen } from './scoring.screen';

const routes: Routes = [
  {
    path: '',
    component: ScoringScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule { }
