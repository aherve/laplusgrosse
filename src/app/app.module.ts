import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LichessService } from './lichess.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
moment.locale('fr');
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    LichessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
