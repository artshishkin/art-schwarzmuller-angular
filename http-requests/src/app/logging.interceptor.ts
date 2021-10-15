import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`Outgoing request to ${request.url}`);
    return next.handle(request)
      .pipe(tap(responseEvent => {
        if (responseEvent.type === HttpEventType.Response) {
          console.log(`Incoming response:`);
          console.log(responseEvent.body);
        }
      }));
  }
}
