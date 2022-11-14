import { Component } from "@angular/core"
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  templateUrl:"./menu.screen.html",
  styleUrls:["./menu.screen.scss"]
})
export class MenuScreen{
  public route: string
  constructor(private _router: Router){
    this.route = ""

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
    })
  }

  ngOnInit(){
  }
}
