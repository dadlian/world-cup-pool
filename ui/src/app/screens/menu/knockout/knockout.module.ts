import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KnockoutRoutingModule } from './knockout-routing.module';
import { KnockoutScreen } from './knockout.screen';

@NgModule({
  declarations: [
    KnockoutScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    KnockoutRoutingModule
  ],
  providers: [],
  bootstrap: [KnockoutScreen]
})
export class KnockoutModule { }
