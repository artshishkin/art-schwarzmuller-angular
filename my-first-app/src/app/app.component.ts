import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: ['h3 {color: aqua}',
      `
      h3 {
        background-color: black;
        padding: 20px;
      }`
  ]
})
export class AppComponent {
}
