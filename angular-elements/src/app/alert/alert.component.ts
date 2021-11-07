import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div>
      This is an alert! {{message}}
    </div>
  `,
  styles: [`
    div {
      border: 2px solid black;
      background: salmon;
      padding: 10px;
      font-family: sans-serif;

    }
  `]
})
export class AlertComponent implements OnInit {

  @Input() message: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
