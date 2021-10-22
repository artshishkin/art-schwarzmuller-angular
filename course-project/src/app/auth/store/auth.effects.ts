import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap} from "rxjs/operators";

import * as AuthActions from './auth.actions';
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {

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
          catchError(error => {
            //...
            of()
          }),
          map((authResponse: AuthResponseData) => {
            of();
          })
        );
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }


}
