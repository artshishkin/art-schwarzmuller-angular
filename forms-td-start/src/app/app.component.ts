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

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log("Submitted!");
  //   console.log(form);
  //
  // }

  onSubmit() {
    console.log("Submitted!");
    console.log(this.form);
  }
}
