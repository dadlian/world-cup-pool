import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BracketRoutingModule } from './bracket-routing.module';
import { BracketScreen } from './bracket.screen';

@NgModule({
  declarations: [
    BracketScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    BracketRoutingModule
  ],
  providers: [],
  bootstrap: [BracketScreen]
})
export class BracketModule { }
