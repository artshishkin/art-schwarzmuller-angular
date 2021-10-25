import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {

    const subscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) this.showErrorAlert(this.error);
    });
    this.subs.push(subscription);
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

      this.store.dispatch(new AuthActions.SignUpStart({email: form.value.email, password: form.value.password}));

    }
    form.reset();
  }

  onClearError() {
    this.store.dispatch(new AuthActions.ClearError());
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
