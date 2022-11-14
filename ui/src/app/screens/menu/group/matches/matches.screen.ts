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

  private scores: any;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.matches = []
    this.entry = {
      name: "",
      locked: false,
      group: []
    }

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
        this.matches = matches

        for(let match of this.matches){
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

  toggleWinner(match: number, winner: string){
    if(this.entry.locked){
      return
    }

    if(this.entry.group[match - 1].winner == winner){
      this.entry.group[match - 1].winner = ""
    }else{
      this.entry.group[match - 1].winner = winner
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
}
