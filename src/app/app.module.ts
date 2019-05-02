import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LichessService } from './lichess.service';
moment.locale('fr');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [LichessService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
