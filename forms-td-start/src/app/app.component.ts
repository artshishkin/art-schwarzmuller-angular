import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form: NgForm;

  defaultQuestion: string = 'pet';

  answer: string;

  genders: string[] = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    secretAnswer: '',
    gender: ''
  };

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    this.form.form.patchValue({userData: {username: suggestedName}});

  }

  // onSubmit(form: NgForm) {
  //   console.log("Submitted!");
  //   console.log(form);
  //
  // }

  onSubmit() {
    const userFormData = this.form.value;
    this.user.username = userFormData['userData']['username'];
    //or
    this.user.email = userFormData.userData.email;
    this.user.secretQuestion = userFormData.secret;
    this.user.secretAnswer = userFormData['questionAnswer'];
    this.user.gender = userFormData.gender;
    console.log(this.user);
    this.submitted = true;

    this.form.reset();
  }
}
