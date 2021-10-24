import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

import * as AuthActions from './auth.actions';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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

    const expirationDate: Date = new Date(new Date().getTime() + 1000 * (+authResponse.expiresIn));

    return new AuthActions.AuthenticateSuccess({
      email: authResponse.email,
      id: authResponse.localId,
      token: authResponse.idToken,
      expirationDate: expirationDate
    });
  };

}
