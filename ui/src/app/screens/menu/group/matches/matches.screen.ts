import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./matches.screen.html",
  styleUrls:["./matches.screen.scss"]
})
export class MatchesScreen{
  public matches: Array<any>;
  public entry: any;
  public message: string;
  public groups: Array<string>;
  public activeGroup: string;

  private scores: any;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.matches = []
    this.entry = {
      name: "",
      locked: false,
      group: []
    }

    this.groups = ['A','B','C','D','E','F','G','H']
    this.activeGroup = ''

    for(let i=0; i < 48; i++){
      this.entry.group[i] = {
        matchId: i+1,
        homeScore: 0,
        awayScore: 0
      }
    }

    this.scores = {}
    this.message = ""
  }

  ngOnInit(){
      this._schedule.matches().then((matches: any) => {
        for(let match of matches){
          if(match.type !== "group"){
            continue
          }

          this.matches.push(match)

          this.scores[match.gameId] = {
            "finished": match.finished,
            "homeTeam": match.homeTeam,
            "homeScore": match.homeScore,
            "awayScore": match.awayScore,
            "awayTeam": match.awayTeam
          }
        }
      })

      this._entry.getBySecret(this._entry.getSecret()).then((entry: any) => {
        this.entry.name = entry.name
        this.entry.locked = entry.locked

        for(let prediction of entry.group){
          this.entry.group[prediction.matchId - 1] = prediction
        }
      })
  }

  updateWinner(match: any){
    if(this.entry.locked){
      return
    }

    let matchId = match.gameId - 1

    this.entry.group[matchId].winner = ""
    if(this.entry.group[matchId].homeScore > this.entry.group[matchId].awayScore){
      this.entry.group[matchId].winner = match.homeTeam
    }else if(this.entry.group[matchId].awayScore > this.entry.group[matchId].homeScore){
      this.entry.group[matchId].winner = match.awayTeam
    }
  }

  updateEntry(){
    if(this.entry.locked){
      return
    }

    this._entry.update(this._entry.getSecret(), this.entry.group).then(result => {
      if(result){
        this.message = "Your predictions were saved."
      }
    })
  }

  scoreMatch(id: number): number{
    let score: number = 0

    if(this.scores[id] && this.scores[id].finished){
      if(
        (this.scores[id].homeTeam == this.entry.group[id-1].winner &&
          this.scores[id].homeScore > this.scores[id].awayScore) ||
        (this.scores[id].awayTeam == this.entry.group[id-1].winner &&
          this.scores[id].awayScore > this.scores[id].homeScore) ||
        (!this.entry.group[id-1].winner &&
          this.scores[id].awayScore == this.scores[id].homeScore)
      ){
        score += 1
      }

      if(
        this.scores[id].homeScore  == this.entry.group[id-1].homeScore &&
        this.scores[id].awayScore  == this.entry.group[id-1].awayScore
      ){
        score += 1
      }
    }

    return score
  }

  filterGroup(group: string = ""){
    this.activeGroup = group
  }
}
