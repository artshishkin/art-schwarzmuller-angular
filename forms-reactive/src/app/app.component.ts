import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  forbiddenUsernames = ['Art', 'Kate'];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.notForbidden.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.notForbiddenEmails.bind(this))
      }),
      'gender': new FormControl(this.genders[0]),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  get hobbies(): AbstractControl[] {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  notForbidden(formControl: FormControl): ValidationErrors | null {
    const value = formControl.value;
    const userFound = this.forbiddenUsernames.indexOf(value);
    return (userFound === -1) ?
      null :
      {'username-forbidden': true};
  }

  notForbiddenEmails(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === 'test@test.com')
          resolve({'email-forbidden': true});
        else
          resolve(null);
      }, 1500);
    })
  }
}
