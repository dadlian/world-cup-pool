import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuScreen } from './menu.screen';

@NgModule({
  declarations: [
    MenuScreen
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  providers: [],
  bootstrap: [MenuScreen]
})
export class MenuModule { }
