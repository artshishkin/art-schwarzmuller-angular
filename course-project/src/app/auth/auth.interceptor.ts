import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {exhaustMap, map, take} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.startsWith(environment.firebaseUrl) && request.url.indexOf('/recipes') > 0) {
      return this.store.select('auth').pipe(
        take(1),
        map(state => state.user),
        exhaustMap(
          user => {
            const token = user?.token;
            const clone = request.clone({setParams: {auth: `${token}`}});
            return next.handle(clone);
          }
        )
      );
    } else {
      return next.handle(request);
    }
  }
}
