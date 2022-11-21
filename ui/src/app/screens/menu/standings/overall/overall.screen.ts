import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./overall.screen.html",
  styleUrls:["./overall.screen.scss"]
})
export class OverallScreen{
  public entries: Array<any>;
  public scores: Array<any>;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.entries = []
    this.scores = []
  }

  ngOnInit(){
    this._schedule.matches().then((matches: any) => {
      let scores: any = {}

      for(let match of matches){
        scores[match.gameId] = {
          "finished": match.finished,
          "homeTeam": match.homeTeam,
          "homeScore": match.homeScore,
          "awayTeam": match.awayTeam,
          "awayScore": match.awayScore,
        }
      }

      this._entry.listAll().then(entries => {
        this.entries = entries;

        for(let id of Object.keys(this.entries)){
          let entry = this.entries[parseInt(id)]

          let groupResultsScore = 0
          let groupStandingsScore = 0
          let knockoutResultsScore = 0
          let knockoutStandingsScore = 0

          //Group Results
          for(let prediction of entry.group){
            let score = scores[prediction.matchId]

            if(score.finished){
              if(
                (score.homeTeam == prediction.winner &&
                  score.homeScore > score.awayScore) ||
                (score.awayTeam == prediction.winner &&
                  score.awayScore > score.homeScore) ||
                (!prediction.winner &&
                  score.awayScore == score.homeScore)
              ){
                groupResultsScore += 1
              }

              if(
                score.homeScore  == prediction.homeScore &&
                score.awayScore  == prediction.awayScore
              ){
                groupResultsScore += 1
              }
            }
          }

          //Group Table
          if(entry.locked){
            let table = this._getGroupTables(entry, matches)
            for(let group of Object.keys(table)){
              let score = 0
              let actual: Array<any> = Object.values(table[group].actual)
              let prediction: Array<any> = Object.values(table[group].prediction)

              actual.sort((a: any, b: any) => {
                let aRank = a.points + ((a.goalsFor - a.goalsAgainst)/100) + (a.goalsFor / 1000)
                let bRank = b.points + ((b.goalsFor - b.goalsAgainst)/100) + (b.goalsFor / 1000)

                return bRank - aRank
              })

              prediction.sort((a: any, b: any) => {
                let aRank = a.points + ((a.goalsFor - a.goalsAgainst)/100) + (a.goalsFor / 1000)
                let bRank = b.points + ((b.goalsFor - b.goalsAgainst)/100) + (b.goalsFor / 1000)

                return bRank - aRank
              })

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

              groupStandingsScore += score*2
            }
          }

          this.scores.push({
            name: entry.name,
            groupResults: groupResultsScore,
            groupStandings: groupStandingsScore,
            knockoutResults: knockoutResultsScore,
            knockoutStandings: knockoutStandingsScore,
            total: groupResultsScore+groupStandingsScore+knockoutResultsScore+knockoutStandingsScore
          })
        }

        this.scores.sort((a, b)=>{
          return b.total - a.total;
        })
      })
    })
  }

  private _getGroupTables(entry: any, schedule: any){
    let table: any = {}
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
          team: match.homeTeam,
          wins: 0,
          losses: 0,
          draws: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0
        }

        table[match.groupName].prediction[match.homeTeam] = {
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
          team: match.awayTeam,
          wins: 0,
          losses: 0,
          draws: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0
        }

        table[match.groupName].prediction[match.awayTeam] = {
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

    for(let prediction of entry.group){
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

    return table
  }
}
