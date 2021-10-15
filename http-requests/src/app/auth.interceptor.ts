import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`Request to url ${request.url}`);
    const modifiedRequest = request.clone(
      {
        setHeaders: {
          FakeAuthorization: 'Some-Fake-Value'
        }
      }
    );
    return next.handle(modifiedRequest)
      .pipe(
        // tap(responseEvent => console.log(responseEvent)), // tap - just for monitoring
        map(responseEvent => {                     // map - for modifying
          if (responseEvent.type === HttpEventType.Response) {
            // responseEvent.headers.set('FakeResponseHeader', 'FakeResponseValue');
            return responseEvent.clone({
              headers: responseEvent.headers.append('FakeResponseHeader', 'FakeResponseValue')
            });
          }
          return responseEvent;
        }),
        // tap(response => console.log(response))
      );
  }
}
