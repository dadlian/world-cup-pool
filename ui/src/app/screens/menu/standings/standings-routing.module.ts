import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandingsScreen } from './standings.screen';

const routes: Routes = [
  {
    path: '',
    component: StandingsScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingsRoutingModule { }
