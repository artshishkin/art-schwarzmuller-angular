import {Component} from "@angular/core";

@Component({
  selector: 'app-warning-alert',
  template: `<h5>Warning message</h5>`,
  styles: [
      `
      h5 {
        background-color: rosybrown;
        color: aliceblue;
        padding: 20px;
        border: 1px solid red;
      }
    `
  ]
})
export class WarningAlertComponent {
}
