import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

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

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(form.value.email, form.value.password)
        .subscribe(
          data => {
            console.log(data);
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.log(error);
            this.error = 'An error occurred!';
          }
        );
    }
    form.reset();
  }
}
