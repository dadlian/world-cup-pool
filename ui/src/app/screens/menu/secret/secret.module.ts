import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SecretRoutingModule } from './secret-routing.module';
import { SecretScreen } from './secret.screen';

@NgModule({
  declarations: [
    SecretScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    SecretRoutingModule
  ],
  providers: [],
  bootstrap: [SecretScreen]
})
export class SecretModule { }
