import { Component } from "@angular/core"
import { ScheduleService } from '../../../../services/schedule.service'
import { EntryService } from '../../../../services/entry.service'

@Component({
  templateUrl:"./bracket.screen.html",
  styleUrls:["./bracket.screen.scss"]
})
export class BracketScreen{
  public entries: Array<any>;
  public entryMap: any;
  public activeEntry: string;
  public matches: {[key: string]: Array<any>};
  public rounds: Array<string>
  public flags: {[key: string]: string};
  public thirdPlace: any;

  constructor(private _schedule: ScheduleService, private _entry: EntryService){
    this.entries = []
    this.entryMap = {}
    this.activeEntry = "Sven"
    this.matches = {}
    this.rounds = []
    this.flags = {}
    this.thirdPlace = {
      gameId: 63
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

    this._entry.listAll().then(entries => {
      this.entries = entries

      for(let entry of this.entries){
        this.entryMap[entry.name] = entry

        for(let i=0; i<16; i++){
          if(entry.knockout[i]){
            entry.knockout[i] = entry.knockout[i]
          }else{
            entry.knockout[i] = {
              awayScore: 0,
              homeScore: 0,
              matchId: i+49,
              winner: "",
              loser: ""
            }
          }
        }
      }
    })
  }

  getParticipants(gameId: number){
    let entry = this.entryMap[this.activeEntry]

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
      let matches = this.matches["Q"].concat(this.matches["S"])
      let index = ((gameId - 49) - 8)*2

      participants = {
        home: {
          name: matches[gameId-57].homeTeam!="TBD"?matches[gameId-57].homeTeam:entry?entry.knockout[index].winner:"",
          flag: matches[gameId-57].homeFlag?matches[gameId-57].homeFlag:this.flags[entry?entry.knockout[index].winner:""]
        },
        away: {
          name: matches[gameId-57].awayTeam!="TBD"?matches[gameId-57].awayTeam:entry?entry.knockout[index+1].winner:"",
          flag: matches[gameId-57].awayFlag?matches[gameId-57].awayFlag:this.flags[entry?entry.knockout[index+1].winner:""]
        }
      }
    }else if(gameId == 63){
      let index = 12

      participants = {
        home: {
          name: entry?entry.knockout[index].loser:"",
          flag: this.flags[entry?entry.knockout[index].loser:""]
        },
        away: {
          name: entry?entry.knockout[index+1].loser:"",
          flag: this.flags[entry?entry.knockout[index+1].loser:""]
        }
      }
    }else if(gameId == 64){
      let index = 12

      participants = {
        home: {
          name: entry?entry.knockout[index].winner:"",
          flag: this.flags[entry?entry.knockout[index].winner:""]
        },
        away: {
          name: entry?entry.knockout[index+1].winner:"",
          flag: this.flags[entry?entry.knockout[index+1].winner:""]
        }
      }
    }

    return participants
  }
}
