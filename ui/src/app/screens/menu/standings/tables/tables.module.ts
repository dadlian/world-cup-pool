import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesScreen } from './tables.screen';

@NgModule({
  declarations: [
    TablesScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    TablesRoutingModule
  ],
  providers: [],
  bootstrap: [TablesScreen]
})
export class TablesModule { }
