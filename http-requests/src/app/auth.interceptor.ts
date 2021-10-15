import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`Request to url ${request.url}`);
    const modifiedRequest = request.clone(
      {
        headers: request.headers
          .append('FakeAuthorization', 'Some-Fake-Value')
      }
    );
    return next.handle(modifiedRequest);
  }
}
