import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./table.screen.html",
  styleUrls:["./table.screen.scss"]
})
export class TableScreen{
  public table: any;
  public groups: Array<string>;
  public entry: any;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.table = {}
    this.groups = []
    this.entry = null
  }

  ngOnInit(){
    this._entry.getBySecret(this._entry.getSecret()).then(entry => {
      this.entry = entry

      this._getGroupTable().then(table => {
        this.table = table
        this.groups = Object.keys(this.table)
      })
    })
  }

  getTable(group: string, type: string): Array<any>{
    return Object.values(this.table[group][type]).sort((a: any, b: any) => {
      let aRank = a.points + ((a.goalsFor - a.goalsAgainst)/100) + (a.goalsFor / 1000)
      let bRank = b.points + ((b.goalsFor - b.goalsAgainst)/100) + (b.goalsFor / 1000)

      return bRank - aRank
    })
  }

  scoreGroup(group: string){
    if(!this.entry.locked){
      return 0
    }

    let actual = this.getTable(group, 'actual')
    let prediction = this.getTable(group, 'prediction')

    let score = 0
    for(let i=0; i < 4; i++){
      let actualGamesPlayed = (
        actual[i].wins + actual[i].losses + actual[i].draws
      )

      let predictedGamesPlayed = (
        prediction[i].wins + prediction[i].losses + prediction[i].draws
      )

      if(
        actual[i].team == prediction[i].team &&
        actualGamesPlayed == predictedGamesPlayed
      ){
        score++
      }
    }

    return score*2
  }

  private _getGroupTable(){
    return new Promise<any>((resolve, reject) => {
      let table: any = {}

      this._schedule.matches().then(schedule => {
        let matches: any = {}

        for(let match of schedule){
          matches[match.gameId] = match

          if(Object.keys(table).indexOf(match.groupName) < 0){
            table[match.groupName] = {
              actual: {},
              prediction: {}
            }
          }

          if(Object.keys(table[match.groupName].actual).indexOf(match.homeTeam) < 0){
            table[match.groupName].actual[match.homeTeam] = {
              flag: match.homeFlag,
              team: match.homeTeam,
              wins: 0,
              losses: 0,
              draws: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0
            }

            table[match.groupName].prediction[match.homeTeam] = {
              flag: match.homeFlag,
              team: match.homeTeam,
              wins: 0,
              losses: 0,
              draws: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0
            }
          }

          if(Object.keys(table[match.groupName].actual).indexOf(match.awayTeam) < 0){
            table[match.groupName].actual[match.awayTeam] = {
              flag: match.awayFlag,
              team: match.awayTeam,
              wins: 0,
              losses: 0,
              draws: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0
            }

            table[match.groupName].prediction[match.awayTeam] = {
              flag: match.awayFlag,
              team: match.awayTeam,
              wins: 0,
              losses: 0,
              draws: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              points: 0
            }
          }

          if(match.finished){
            if(match.homeScore > match.awayScore){
              table[match.groupName].actual[match.homeTeam].wins += 1
              table[match.groupName].actual[match.awayTeam].losses += 1
              table[match.groupName].actual[match.homeTeam].points += 3
            }

            if(match.awayScore > match.homeScore){
              table[match.groupName].actual[match.homeTeam].losses += 1
              table[match.groupName].actual[match.awayTeam].wins += 1
              table[match.groupName].actual[match.awayTeam].points += 3
            }

            if(match.awayScore == match.homeScore){
              table[match.groupName].actual[match.homeTeam].draws += 1
              table[match.groupName].actual[match.awayTeam].draws += 1
              table[match.groupName].actual[match.homeTeam].points += 1
              table[match.groupName].actual[match.awayTeam].points += 1
            }

            table[match.groupName].actual[match.homeTeam].goalsFor += match.homeScore
            table[match.groupName].actual[match.awayTeam].goalsAgainst += match.homeScore
            table[match.groupName].actual[match.awayTeam].goalsFor += match.awayScore
            table[match.groupName].actual[match.homeTeam].goalsAgainst += match.awayScore
          }
        }

        for(let prediction of this.entry.group){
          let match = matches[prediction.matchId]

          if(prediction.homeScore > prediction.awayScore){
            table[match.groupName].prediction[match.homeTeam].wins += 1
            table[match.groupName].prediction[match.awayTeam].losses += 1
            table[match.groupName].prediction[match.homeTeam].points += 3
          }

          if(prediction.awayScore > prediction.homeScore){
            table[match.groupName].prediction[match.homeTeam].losses += 1
            table[match.groupName].prediction[match.awayTeam].wins += 1
            table[match.groupName].prediction[match.awayTeam].points += 3
          }

          if(prediction.awayScore == prediction.homeScore){
            table[match.groupName].prediction[match.homeTeam].draws += 1
            table[match.groupName].prediction[match.awayTeam].draws += 1
            table[match.groupName].prediction[match.homeTeam].points += 1
            table[match.groupName].prediction[match.awayTeam].points += 1
          }

          table[match.groupName].prediction[match.homeTeam].goalsFor += prediction.homeScore
          table[match.groupName].prediction[match.awayTeam].goalsAgainst += prediction.homeScore
          table[match.groupName].prediction[match.awayTeam].goalsFor += prediction.awayScore
          table[match.groupName].prediction[match.homeTeam].goalsAgainst += prediction.awayScore
        }

        resolve(table)
      })
    })
  }
}
