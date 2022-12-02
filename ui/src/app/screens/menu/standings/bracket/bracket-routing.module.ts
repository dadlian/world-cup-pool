import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BracketScreen } from './bracket.screen';

const routes: Routes = [
  {
    path: '',
    component: BracketScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BracketRoutingModule { }
