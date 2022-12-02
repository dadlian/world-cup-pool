import { Component } from "@angular/core"
import { ScheduleService } from '../../../services/schedule.service'
import { EntryService } from '../../../services/entry.service'

@Component({
  templateUrl:"./knockout.screen.html",
  styleUrls:["./knockout.screen.scss"]
})
export class KnockoutScreen{
  public matches: {[key: string]: Array<any>};
  public rounds: Array<string>
  public entry: any;
  public flags: {[key: string]: string};
  public message: string;
  public thirdPlace: any;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.matches = {}
    this.rounds = []
    this.message = ""
    this.flags = {}
    this.entry = {
      name: "",
      locked: false,
      group: [],
      knockout: []
    }
    this.thirdPlace = {
      gameId: 63
    }

    for(let i=0; i<16; i++){
      this.entry.knockout[i] = {
        awayScore: 0,
        homeScore: 0,
        matchId: i+49,
        winner: "",
        loser: ""
      }
    }
  }

  ngOnInit(){
    this._schedule.matches().then((matches: any) => {
      for(let match of matches){
        if(match.type == "knockout"){
          if(match.groupName == "T"){
              this.thirdPlace = match
          }else{
            if(Object.keys(this.matches).indexOf(match.groupName) < 0){
              this.matches[match.groupName] = []
              this.rounds.push(match.groupName)
            }

            this.matches[match.groupName].push(match)
          }

          this.flags[match.homeTeam] = match.homeFlag
          this.flags[match.awayTeam] = match.awayFlag
        }
      }

      for(let group in this.matches){
        this.matches[group].sort((a, b) => {
          return a.gameId - b.gameId
        })
      }
    })

    this._entry.getBySecret(this._entry.getSecret()).then((entry: any) => {
      this.entry.name = entry.name
      this.entry.locked = entry.locked
      this.entry.group = entry.group

      for(let i=0; i<16; i++){
        if(entry.knockout[i]){
          this.entry.knockout[i] = entry.knockout[i]
        }
      }
    })
  }

  pickWinner(match: number, winner: string, loser: string = ""){
    let oldWinner = this.entry.knockout[match].winner;

    this.entry.knockout[match].winner = winner
    this.entry.knockout[match].loser = loser

    for(let i=match+1; i < 16; i++){
      if(this.entry.knockout[i].winner == oldWinner){
        this.entry.knockout[i].winner = winner
      }

      if(this.entry.knockout[i].loser == oldWinner){
        this.entry.knockout[i].loser = winner
      }
    }
  }

  getParticipants(gameId: number){
    let participants = {
      home: {
        name: "TBD",
        flag: ""
      },
      away: {
        name: "TBD",
        flag: ""
      }
    }

    if(gameId <= 56){
      let match = this.matches["R16"][gameId-49]
      participants = {
        home: {
          name: match.homeTeam,
          flag: match.homeFlag
        },
        away: {
          name: match.awayTeam,
          flag: match.awayFlag
        }
      }
    }else if(gameId <= 62){
      let index = ((gameId - 49) - 8)*2

      participants = {
        home: {
          name: this.entry.knockout[index].winner,
          flag: this.flags[this.entry.knockout[index].winner]
        },
        away: {
          name: this.entry.knockout[index+1].winner,
          flag: this.flags[this.entry.knockout[index+1].winner]
        }
      }
    }else if(gameId == 63){
      let index = 12

      participants = {
        home: {
          name: this.entry.knockout[index].loser,
          flag: this.flags[this.entry.knockout[index].loser]
        },
        away: {
          name: this.entry.knockout[index+1].loser,
          flag: this.flags[this.entry.knockout[index+1].loser]
        }
      }
    }else if(gameId == 64){
      let index = 12

      participants = {
        home: {
          name: this.entry.knockout[index].winner,
          flag: this.flags[this.entry.knockout[index].winner]
        },
        away: {
          name: this.entry.knockout[index+1].winner,
          flag: this.flags[this.entry.knockout[index+1].winner]
        }
      }
    }

    return participants
  }

  saveBracket(){
    if(this.entry.locked){
      return
    }

    this._entry.update(this._entry.getSecret(), this.entry.knockout).then(result => {
      if(result){
        this.message = "Your bracket was saved."
      }
    })
  }
}
