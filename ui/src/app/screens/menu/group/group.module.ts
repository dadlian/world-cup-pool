import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GroupRoutingModule } from './group-routing.module';
import { GroupScreen } from './group.screen';

@NgModule({
  declarations: [
    GroupScreen
  ],
  imports: [
    CommonModule,
    FormsModule,
    GroupRoutingModule
  ],
  providers: [],
  bootstrap: [GroupScreen]
})
export class GroupModule { }
