import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchesScreen } from './matches.screen';

const routes: Routes = [
  {
    path: '',
    component: MatchesScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
