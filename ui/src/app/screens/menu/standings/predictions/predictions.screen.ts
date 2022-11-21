import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./predictions.screen.html",
  styleUrls:["./predictions.screen.scss"]
})
export class PredictionsScreen{
  public entries: Array<any>;
  public predictions: Array<any>;
  public matches: Array<any>;
  public flags: {[key: string]: string}

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.entries = []
    this.predictions = []
    this.matches = []
    this.flags = {}
  }

  ngOnInit(){
    this._schedule.matches().then((matches: any) => {
      for(let match of matches){
        this.matches[match.gameId] = {
          "id": match.gameId,
          "finished": match.finished,
          "homeTeam": match.homeTeam,
          "homeFlag": match.homeFlag,
          "homeScore": match.homeScore,
          "awayTeam": match.awayTeam,
          "awayFlag": match.awayFlag,
          "awayScore": match.awayScore,
          "date": match.localDate
        }

        this.flags[match.homeTeam] = match.homeFlag
        this.flags[match.awayTeam] = match.awayFlag
      }

      this.matches.sort((a: any, b: any) => {
        return a.date.localeCompare(b.date)
      })
    })

    this._entry.listAll().then(entries => {
      this.entries = entries

      for(let entry of entries){
        for(let prediction of entry.group){
          if(!Array.isArray(this.predictions[prediction.matchId])){
            this.predictions[prediction.matchId] = []
          }

          this.predictions[prediction.matchId].push(prediction)
        }
      }
    })
  }
}
