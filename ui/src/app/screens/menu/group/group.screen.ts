import { Component } from "@angular/core"
import { Router, Event, NavigationEnd } from '@angular/router';
import { EntryService } from '../../../services/entry.service'

@Component({
  templateUrl:"./group.screen.html",
  styleUrls:["./group.screen.scss"]
})
export class GroupScreen{
  public route: string
  public entry: string

  constructor(private _router: Router, private _entry: EntryService){
    this.route = ""
    this.entry = ""

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
    })
  }

  ngOnInit(){
    this._entry.getBySecret(this._entry.getSecret()).then((entry: any) => {
      this.entry = entry.name
    })
  }
}
