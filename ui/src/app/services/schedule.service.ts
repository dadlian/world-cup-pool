import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScheduleService{
  private _schedule: Array<any>;

  constructor(private _httpClient: HttpClient){
    this._schedule = []
  }

  matches(): Promise<Array<any>>{
    return new Promise<Array<any>>((resolve, reject) => {
      if(this._schedule.length == 0){
        this._httpClient.get(`/schedule`).subscribe((response: any) => {
          this._schedule = response

          this._schedule.sort((a, b)=>{
            return a.localDate.localeCompare(b.localDate)
          })

          resolve(this._schedule)
        })
      }else{
        resolve(this._schedule)
      }
    })
  }
}
