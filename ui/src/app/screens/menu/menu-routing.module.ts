import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuScreen } from './menu.screen';

import { EntryGuard } from '../../guards/entry.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuScreen,
    children:[
      {
        path: 'standings',
        loadChildren: () => import(
          './standings/standings.module').then( m => m.StandingsModule)
      },
      {
        path: 'group',
        loadChildren: () => import(
          './group/group.module').then( m => m.GroupModule),
        canActivate: [ EntryGuard ]
      },
      {
        path: 'knockout',
        loadChildren: () => import(
          './knockout/knockout.module').then( m => m.KnockoutModule),
        canActivate: [ EntryGuard ]
      },
      {
        path: 'scoring',
        loadChildren: () => import(
          './scoring/scoring.module').then( m => m.ScoringModule)
      },
      {
        path: 'secret',
        loadChildren: () => import(
          './secret/secret.module').then( m => m.SecretModule)
      },
      {
        path: '**',
        redirectTo: 'standings',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
