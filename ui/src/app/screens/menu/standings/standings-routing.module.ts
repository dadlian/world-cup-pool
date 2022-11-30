import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandingsScreen } from './standings.screen';

const routes: Routes = [
  {
    path: '',
    component: StandingsScreen,
    children:[
      {
        path: 'overall',
        loadChildren: () => import(
          './overall/overall.module').then( m => m.OverallModule)
      },
      {
        path: 'predictions',
        loadChildren: () => import(
          './predictions/predictions.module').then( m => m.PredictionsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import(
          './tables/tables.module').then( m => m.TablesModule)
      },
      {
        path: '**',
        redirectTo: 'overall',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingsRoutingModule { }
