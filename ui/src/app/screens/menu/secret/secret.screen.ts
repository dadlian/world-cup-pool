import { Component } from "@angular/core"
import { Router } from '@angular/router'
import { EntryService } from '../../../services/entry.service'

@Component({
  templateUrl:"./secret.screen.html",
  styleUrls:["./secret.screen.scss"]
})
export class SecretScreen{
  public secret: string;
  public message: string;

  constructor(private _entry: EntryService, private _router: Router){
    this.secret = ""
    this.message = ""
  }

  ngOnInit(){
  }

  setSecret(){
    this._entry.getBySecret(this.secret).then(entry => {
      this._entry.setSecret(this.secret)
      this._router.navigate(["/group"])
    }).catch(error => {
      this.message = "The code you entered is invalid"
    })
  }
}
