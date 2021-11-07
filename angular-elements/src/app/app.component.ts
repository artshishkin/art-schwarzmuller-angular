import {Component, Injector} from '@angular/core';
import {createCustomElement} from "@angular/elements";
import {AlertComponent} from "./alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-elements';

  content: any = null;

  constructor(private injector: Injector) {
    const AlertElement = createCustomElement<AlertComponent>(AlertComponent, {injector: this.injector});
    customElements.define('my-alert', AlertElement);
    this.loadDataFromServer();
  }

  private loadDataFromServer() {
    setTimeout(() => {
      this.content = '<my-alert message="Rendered dynamically"></my-alert>';
    }, 1000);
  }
}
