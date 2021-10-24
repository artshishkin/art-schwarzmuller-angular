import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
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

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.auth(environment.signUpUrl, email, password);
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.auth(environment.loginUrl, email, password);
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.storage.removeItem('loggedInUser');
    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogin() {

    const userData = this.storage.getItem('loggedInUser');

    if (!userData) return;

    const data: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userData);

    const expirationDate = new Date(data._tokenExpirationDate);
    const loggedInUser: User =
      new User(data.email, data.id, data._token, expirationDate);

    if (loggedInUser.token) {
      // this.user.next(loggedInUser);
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loggedInUser.email,
        id: loggedInUser.id,
        token: loggedInUser.token,
        expirationDate: expirationDate
      }));
      this.autoLogout(expirationDate.getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {

    console.log(`Token expiration duration: ${expirationDuration}`);

    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  };

  private auth(url: string, email: string, password: string): Observable<AuthResponseData> {

    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(url, requestBody)
      .pipe(
        catchError(this.handleError),
        tap(this.storeLoggedInUserData.bind(this))
      );
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
    this.autoLogout(+authResponse.expiresIn * 1000);
    this.storage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    switch (errorResponse.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
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
