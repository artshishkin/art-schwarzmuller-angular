import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.auth(environment.signUpUrl, email, password);
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.auth(environment.loginUrl, email, password);
  }

  private auth(url: string, email: string, password: string): Observable<AuthResponseData> {

    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(url, requestBody)
      .pipe(catchError(errorResp => {
        let errorMessage = 'An unknown error occurred';
        switch (errorResp.error?.error?.message) {
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
      }));
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
