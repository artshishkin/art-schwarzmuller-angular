import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  constructor(private  authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData> = this.isLoginMode ?
      this.authService.login(form.value.email, form.value.password) :
      this.authService.signUp(form.value.email, form.value.password);

    authObs
      .subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
        },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );

    form.reset();
  }
}
