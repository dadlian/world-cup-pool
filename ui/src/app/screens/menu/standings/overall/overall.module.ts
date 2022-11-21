import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverallRoutingModule } from './overall-routing.module';
import { OverallScreen } from './overall.screen';

@NgModule({
  declarations: [
    OverallScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverallRoutingModule
  ],
  providers: [],
  bootstrap: [OverallScreen]
})
export class OverallModule { }
