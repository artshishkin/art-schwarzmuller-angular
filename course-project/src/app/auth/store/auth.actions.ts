import {Action} from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] SignUp Start';

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';

export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public  payload: { email: string, password: string }) {
  }
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: {
    email: string,
    id: string,
    token: string,
    expirationDate: Date
  }) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public  payload: string) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public  payload: { email: string, password: string }) {
  }
}

export type AuthActions =

  | LoginStart
  | SignUpStart

  | AuthenticateSuccess
  | AuthenticateFail

  | Logout
  ;
