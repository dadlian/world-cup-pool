import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScoringRoutingModule } from './scoring-routing.module';
import { ScoringScreen } from './scoring.screen';

@NgModule({
  declarations: [
    ScoringScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    ScoringRoutingModule
  ],
  providers: [],
  bootstrap: [ScoringScreen]
})
export class ScoringModule { }
