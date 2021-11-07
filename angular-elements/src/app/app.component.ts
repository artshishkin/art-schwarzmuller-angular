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
      this.content = '<p>Data Fetched from server(simulation):<p><h3>I\'m OK</h3>';
    }, 1000);
  }
}
