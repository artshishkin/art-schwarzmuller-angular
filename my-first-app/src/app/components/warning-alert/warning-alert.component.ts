import {Component} from "@angular/core";

@Component({
  selector:'app-warning-alert',
  template: `<h5>Warning message</h5>`,
  styles: [
      `
      h5 {
        background-color: red;
        color: aliceblue;
      }
    `
  ]
})
export class WarningAlertComponent {
}
