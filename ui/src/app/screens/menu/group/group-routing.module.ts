import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupScreen } from './group.screen';

const routes: Routes = [
  {
    path: '',
    component: GroupScreen,
    children:[
      {
        path: 'matches',
        loadChildren: () => import(
          './matches/matches.module').then( m => m.MatchesModule)
      },
      {
        path: 'table',
        loadChildren: () => import(
          './table/table.module').then( m => m.TableModule)
      },
      {
        path: '**',
        redirectTo: 'matches',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
