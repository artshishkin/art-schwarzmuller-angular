import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800)),
    ]),

    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('* <=> shrunken', [
          style({'background-color': 'orange', borderRadius: 0}),
          animate(1000, style({borderRadius: '50px'})),
          animate(500)
        ]
      ),
    ]),
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];

  state = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }


  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    // this.state = (this.state === 'normal') ? 'highlighted' : 'normal';
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState = (this.wildState === 'normal') ? 'highlighted' : 'normal'
  }

  onShrink() {
    this.wildState = 'shrunken';
  }
}
