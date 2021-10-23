import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {AuthResponseData, AuthService} from "./auth.service";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import * as AuthActions from "./store/auth.actions";
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  subs: Subscription[] = [];

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private  authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;

    if (this.isLoginMode) {

      this.store.dispatch(new AuthActions.LoginStart({email: form.value.email, password: form.value.password}));

    } else {

      let authObs: Observable<AuthResponseData> =
        this.authService.signUp(form.value.email, form.value.password);

      authObs
        .subscribe(
          data => {
            console.log(data);
            this.isLoading = false;
            this.router.navigate(["/recipes"]);
          },
          errorMessage => {
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
          }
        );
    }
    form.reset();
  }

  onClearError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    const subscription = componentRef.instance.close.subscribe(() => {
      subscription.unsubscribe();
      hostViewContainerRef.clear();
      this.onClearError();
    });
    this.subs.push(subscription);
  }
}
