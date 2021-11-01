import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Store} from "@ngrx/store";

import * as fromApp from "./store/app.reducer";
import {LoggingService} from "./logging.service";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-project';

  constructor(private loggingService: LoggingService,
              private store: Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.store.dispatch(new AuthActions.AutoLogin());

    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
