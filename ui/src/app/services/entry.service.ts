import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ScheduleService } from './schedule.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EntryService{
  private _secret: string;

  constructor(private _httpClient: HttpClient, private _schedule: ScheduleService){
    this._secret = ""
  }

  listAll(): Promise<any>{
    let params: HttpParams = new HttpParams()

    return new Promise<any>((resolve, reject) => {
      this._httpClient.get("/entries",{
        params: params, observe: 'response'
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          reject(500)

          return of(new HttpResponse<any>())
        })
      )
      .subscribe(response => {
        resolve(response.body.entries)
      })
    })
  }

  getBySecret(secret: string){
    let params: HttpParams = new HttpParams()

    return new Promise<any>((resolve, reject) => {
      this._httpClient.get(`/entries/${secret}?`+Date.now(),{
        params: params, observe: 'response'
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {switch(error.status){
            case 404:
              reject(404);
              break;
            default:
              reject(500);
          }

          return of(new HttpResponse<any>())
        })
      )
      .subscribe(response => {
        resolve(response.body)
      })
    })
  }

  update(secret: string, predictions: Array<any>): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this._httpClient.put(`/entries/${secret}`,
        { knockout: predictions },
        { observe: 'response' }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          reject(500)

          return of(new HttpResponse<any>());
        })
      )
      .subscribe((response: any) => {
        resolve(true);
      })
    })
  }

  getSecret(){
    return this._secret
  }

  setSecret(secret: string){
    this._secret = secret
  }
}
