import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

import * as AuthActions from './auth.actions';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {User} from "../user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  @Effect()
  authSighUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      const requestBody = {
        email: signUpAction.payload.email,
        password: signUpAction.payload.password,
        returnSecureToken: true
      };
      return this.http.post<AuthResponseData>(environment.signUpUrl, requestBody)
        .pipe(
          map(this.handleAuthenticationSuccess.bind(this)),
          catchError(this.handleError.bind(this))
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const requestBody = {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      };
      return this.http.post<AuthResponseData>(environment.loginUrl, requestBody)
        .pipe(
          map(this.handleAuthenticationSuccess.bind(this)),
          catchError(this.handleError.bind(this))
        );
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => this.clearLoggedInUserData())
  );


  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = localStorage.getItem('loggedInUser');

      if (!userData) return {type: 'DUMMY'};

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
        return new AuthActions.AuthenticateSuccess({
          email: loggedInUser.email,
          id: loggedInUser.id,
          token: loggedInUser.token,
          expirationDate: expirationDate
        });
        // this.autoLogout(expirationDate.getTime() - new Date().getTime());
      }
      return {type: 'DUMMY'};
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<AuthActions.AuthenticateFail> {
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  private handleAuthenticationSuccess = (authResponse: AuthResponseData) => {

    const email = authResponse.email;
    const localId = authResponse.localId;
    const idToken = authResponse.idToken;
    const expirationDate: Date = new Date(new Date().getTime() + 1000 * (+authResponse.expiresIn));

    this.storeLoggedInUserData(email, localId, idToken, expirationDate);

    return new AuthActions.AuthenticateSuccess({
      email: email,
      id: localId,
      token: idToken,
      expirationDate: expirationDate
    });
  };

  private storeLoggedInUserData(email: string, localId: string, idToken: string, expirationDate: Date) {
    const loggedInUser = new User(email, localId, idToken, expirationDate);
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }

  private clearLoggedInUserData() {
    localStorage.removeItem('loggedInUser');
  }
}
