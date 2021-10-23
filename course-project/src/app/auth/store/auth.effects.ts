import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap} from "rxjs/operators";

import * as AuthActions from './auth.actions';
import {Login} from './auth.actions';
import {environment} from "../../../environments/environment";
import {of} from "rxjs";
import {Injectable} from "@angular/core";

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
          map((authResponse: AuthResponseData) => {

            const expirationDate: Date = new Date(new Date().getTime() + 1000 * (+authResponse.expiresIn));

            const loginAction = new Login({
              email: authResponse.email,
              id: authResponse.localId,
              token: authResponse.idToken,
              expirationDate: expirationDate
            });

            return of(loginAction);
          }),
          catchError(error => {
            //...
            return of(); //just for now
          })
        );
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }


}
