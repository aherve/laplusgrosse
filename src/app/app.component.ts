import { Component } from '@angular/core';
import { LichessService } from './lichess.service';
import { map, shareReplay } from 'rxjs/operators'

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {


  public constructor (
    private lichessService: LichessService,
  ) { }

  public board$ = this.lichessService.getBoard().pipe(
    shareReplay()
  )

  public today = new Date()

  public gameType$ = this.board$.pipe(map(b => b.gameType))

  public winnerName$ = this.board$.pipe(map(b => b.winnerName))
  public winnerScore$ = this.board$.pipe(map(b => b.winnerScore))

  public looserName$ = this.board$.pipe(map(b => b.looserName))
  public looserScore$ = this.board$.pipe(map(b => b.looserScore))
  public diff$ = this.board$.pipe(map(b => b.winnerScore - b.looserScore))

}
