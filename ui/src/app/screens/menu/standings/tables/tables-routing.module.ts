import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesScreen } from './tables.screen';

const routes: Routes = [
  {
    path: '',
    component: TablesScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
