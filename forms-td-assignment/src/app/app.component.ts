import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subscriptions: string[] = ["Basic", "Advanced", "Pro"];

  @ViewChild('f') subscriptionForm: NgForm;

  onSubmit(formContent: any) {
    console.log(formContent);
    this.subscriptionForm.reset();
  }
}
