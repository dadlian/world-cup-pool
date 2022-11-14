import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesScreen } from './matches.screen';

@NgModule({
  declarations: [
    MatchesScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatchesRoutingModule
  ],
  providers: [],
  bootstrap: [MatchesScreen]
})
export class MatchesModule { }
