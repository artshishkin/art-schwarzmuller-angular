import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";
import {AuthenticateSuccess} from "./store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storage: Storage = localStorage;

  private tokenExpirationTimer: number;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  setLogoutTimer(expirationDuration: number) {

    console.log(`Token expiration duration: ${expirationDuration}`);

    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  };

  clearLogoutTimer() {
    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }


  private storeLoggedInUserData(authResponse: AuthResponseData) {
    const expirationDate: Date = new Date(new Date().getTime() + 1000 * (+authResponse.expiresIn));
    const loggedInUser = new User(authResponse.email, authResponse.localId, authResponse.idToken, expirationDate);
    console.log(loggedInUser);
    // this.user.next(loggedInUser);
    this.store.dispatch(new AuthenticateSuccess({
      email: authResponse.email,
      id: authResponse.localId,
      token: authResponse.idToken,
      expirationDate: expirationDate
    }));
    this.setLogoutTimer(+authResponse.expiresIn * 1000);
    this.storage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }


}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
