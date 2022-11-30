import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./tables.screen.html",
  styleUrls:["./tables.screen.scss"]
})
export class TablesScreen{
  public entries: Array<any>;
  public table: any;
  public groups: Array<string>;
  public activeEntry: string;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.table = {}
    this.groups = []
    this.entries = []
    this.activeEntry = "Sven"
  }

  ngOnInit(){
    this._entry.listAll().then(entries => {
      this.entries = entries

      this._getGroupTable().then(table => {
        this.table = table
        this.groups = Object.keys(this.table)
      })
    })
  }

  getTable(group: string, type: string, entry: string = ""): Array<any>{
    let table = this.table[group][type]

    if(entry){
      table = this.table[group][type][entry]
    }

    table = Object.values(table).sort((a: any, b: any) => {
      let aRank = a.points + ((a.goalsFor - a.goalsAgainst)/100) + (a.goalsFor / 1000)
      let bRank = b.points + ((b.goalsFor - b.goalsAgainst)/100) + (b.goalsFor / 1000)

      return bRank - aRank
    })

    if(type == "predictions"){
        let actual = this.getTable(group, "actual")
        for(let i=0; i < actual.length; i++){
          if(table[i].team == actual[i].team){
            table[i].correct = true
          }

          if(actual[i].wins + actual[i].losses + actual[i].draws == 3){
            table[i].final = true
          }
        }
    }

    return table
  }

  private _getGroupTable(){
    return new Promise<any>((resolve, reject) => {
      let table: any = {}

      this._schedule.matches().then(schedule => {
        let matches: any = {}

        for(let match of schedule){
          if(match.type !== "group"){
            continue;
          }
          
          matches[match.gameId] = match

          if(Object.keys(table).indexOf(match.groupName) < 0){
            table[match.groupName] = {
              actual: {},
              predictions: {}
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

            for(let entry of this.entries){
              if(Object.keys(table[match.groupName].predictions).indexOf(entry.name) < 0){
                table[match.groupName].predictions[entry.name] = {}
              }

              table[match.groupName].predictions[entry.name][match.homeTeam] = {
                  flag: match.homeFlag,
                  team: match.homeTeam,
                  wins: 0,
                  losses: 0,
                  draws: 0,
                  goalsFor: 0,
                  goalsAgainst: 0,
                  points: 0,
                  correct: false,
                  final: false
              }
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

            for(let entry of this.entries){
              table[match.groupName].predictions[entry.name][match.awayTeam] = {
                flag: match.awayFlag,
                team: match.awayTeam,
                wins: 0,
                losses: 0,
                draws: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0,
                correct: false,
                final: false
              }
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

        for(let entry of this.entries){
          for(let prediction of entry.group){
            let match = matches[prediction.matchId]

            if(prediction.homeScore > prediction.awayScore){
              table[match.groupName].predictions[entry.name][match.homeTeam].wins += 1
              table[match.groupName].predictions[entry.name][match.awayTeam].losses += 1
              table[match.groupName].predictions[entry.name][match.homeTeam].points += 3
            }

            if(prediction.awayScore > prediction.homeScore){
              table[match.groupName].predictions[entry.name][match.homeTeam].losses += 1
              table[match.groupName].predictions[entry.name][match.awayTeam].wins += 1
              table[match.groupName].predictions[entry.name][match.awayTeam].points += 3
            }

            if(prediction.awayScore == prediction.homeScore){
              table[match.groupName].predictions[entry.name][match.homeTeam].draws += 1
              table[match.groupName].predictions[entry.name][match.awayTeam].draws += 1
              table[match.groupName].predictions[entry.name][match.homeTeam].points += 1
              table[match.groupName].predictions[entry.name][match.awayTeam].points += 1
            }

            table[match.groupName].predictions[entry.name][match.homeTeam].goalsFor += prediction.homeScore
            table[match.groupName].predictions[entry.name][match.awayTeam].goalsAgainst += prediction.homeScore
            table[match.groupName].predictions[entry.name][match.awayTeam].goalsFor += prediction.awayScore
            table[match.groupName].predictions[entry.name][match.homeTeam].goalsAgainst += prediction.awayScore
          }
        }

        resolve(table)
      })
    })
  }
}
