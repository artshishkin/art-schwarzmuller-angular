import {Component} from '@angular/core';
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      }))
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];

  state = 'normal';

  onAdd(item) {
    this.list.push(item);
  }


  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    // this.state = (this.state === 'normal') ? 'highlighted' : 'normal';
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
}
