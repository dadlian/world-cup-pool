import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { EntryService } from '../services/entry.service';

@Injectable()
export class EntryGuard implements CanActivate, CanActivateChild{
  constructor(private _router: Router, private _entry: EntryService){}

  canActivate(): Promise<boolean>{
    return new Promise((resolve)=>{
      if(this._entry.getSecret()){
        resolve(true)
      }else{
        this._router.navigate(["/secret"]);
        resolve(false)
      }
    })
  }

  canActivateChild(): Promise<boolean>{
    return this.canActivate();
  }

}
