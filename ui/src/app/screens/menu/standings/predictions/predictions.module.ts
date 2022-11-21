import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PredictionsRoutingModule } from './predictions-routing.module';
import { PredictionsScreen } from './predictions.screen';

@NgModule({
  declarations: [
    PredictionsScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    PredictionsRoutingModule
  ],
  providers: [],
  bootstrap: [PredictionsScreen]
})
export class PredictionsModule { }
