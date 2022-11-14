import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnockoutScreen } from './knockout.screen';

const routes: Routes = [
  {
    path: '',
    component: KnockoutScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnockoutRoutingModule { }
