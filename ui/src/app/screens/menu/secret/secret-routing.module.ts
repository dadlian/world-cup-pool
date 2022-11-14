import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecretScreen } from './secret.screen';

const routes: Routes = [
  {
    path: '',
    component: SecretScreen
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretRoutingModule { }
