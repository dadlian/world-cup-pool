import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableScreen } from './table.screen';

const routes: Routes = [
  {
    path: '',
    component: TableScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
