import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {FakeAuthService} from "./fake-auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private fakeAuthService: FakeAuthService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fakeAuthService.isAuthenticated()
      .then((authenticated: boolean) => {
        if (authenticated)
          return true;
        else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.fakeAuthService.isAuthenticated();
  // }
}
