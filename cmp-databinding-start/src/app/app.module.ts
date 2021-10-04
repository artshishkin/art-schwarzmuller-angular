import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import {ServerElementComponent} from './server-element/server-element.component';
import {Assignment4Component} from './assignment4/assignment4.component';
import {GameControlComponent} from './assignment4/game-control/game-control.component';
import {OddComponent} from './assignment4/odd/odd.component';
import {EvenComponent} from './assignment4/even/even.component';

@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    ServerElementComponent,
    Assignment4Component,
    GameControlComponent,
    OddComponent,
    EvenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
