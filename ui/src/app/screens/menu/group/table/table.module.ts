import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableRoutingModule } from './table-routing.module';
import { TableScreen } from './table.screen';

@NgModule({
  declarations: [
    TableScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableRoutingModule
  ],
  providers: [],
  bootstrap: [TableScreen]
})
export class TableModule { }
