import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StandingsRoutingModule } from './standings-routing.module';
import { StandingsScreen } from './standings.screen';

@NgModule({
  declarations: [
    StandingsScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    StandingsRoutingModule
  ],
  providers: [],
  bootstrap: [StandingsScreen]
})
export class StandingsModule { }
