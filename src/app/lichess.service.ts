import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { take, filter, map } from 'rxjs/operators'

interface Perf {
  games: number
  rating: number
  rd: number
  prog: number
}

interface LichessUser {
  username: string
  perfs: {
    blitz: Perf
    bullet: Perf
    correspondence?: Perf
    classical: Perf
    rapid: Perf
  }
}

export interface Board {
  winnerName: string
  looserName: string
  winnerScore: number
  looserScore: number
  gameType: string
}

@Injectable({ providedIn: 'root' })
export class LichessService {

  constructor(
    private http: HttpClient
  ) { }

  public getProfile(username: string): Observable<LichessUser> {
    return this.http.get<LichessUser>(`https://lichess.org/api/user/${username}`)
  }

  public getBoard() {
    return combineLatest(
      this.getProfile('aherve'),
      this.getProfile('demission'),
    ).pipe(
      filter(([u1, u2]) => !!u1 && !!u2),
      map(([aherve, demission]) => this.getBoardFromProfiles(aherve, demission)),
      take(1),
    )
  }


  private getBoardFromProfiles(aherve: LichessUser, demission: LichessUser) {
    const winK = ['blitz', 'classical', 'rapid'].find((k: 'blitz' | 'classical' | 'rapid') => {
      return this.isWinning(aherve, demission, k)
    })

    if (winK) {
      return {
        winnerName: 'Aurélien Hervé',
        looserName: 'Alexandre Hervé',
        winnerScore: aherve.perfs[winK]['rating'],
        looserScore: demission.perfs[winK]['rating'],
        gameType: winK,
      }
    } else {
      return {
        winnerName: 'Alexandre Hervé',
        looserName: 'Aurélien Hervé',
        winnerScore: demission.perfs['blitz']['rating'],
        looserScore: aherve.perfs['blitz']['rating'],
        gameType: 'blitz',
      }
    }
  }

  private isWinning(u1: LichessUser, u2: LichessUser, key: 'blitz' | 'classical' | 'rapid') {
    console.log('u1 perf', key, u1.perfs[key].rating, u2.perfs[key].rating)
    console.log('returning', u1.perfs[key].rating > u2.perfs[key].rating)
    return u1.perfs[key].rating > u2.perfs[key].rating
  }

}
