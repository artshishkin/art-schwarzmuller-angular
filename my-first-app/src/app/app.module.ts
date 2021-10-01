import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServerComponent} from './components/server/server.component';
import {ServersComponent} from './components/servers/servers.component';
import {WarningAlertComponent} from "./components/warning-alert/warning-alert.component";
import {SuccessAlertComponent} from './components/success-alert/success-alert.component';
import {FormsModule} from "@angular/forms";
import {Assignment2Component} from './components/assignment2/assignment2.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    Assignment2Component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
