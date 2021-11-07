import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-elements';

  content: any = null;

  constructor() {
    this.loadDataFromServer();
  }

  private loadDataFromServer() {
    setTimeout(() => {
      this.content = '<app-alert message="Rendered dynamically"></app-alert>';
    }, 1000);
  }
}
