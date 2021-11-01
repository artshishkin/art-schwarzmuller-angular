import {Component} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

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

    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-100px)'}),
        animate(500)
      ]),
      transition('* => void',
        animate(500, style({opacity: 0, transform: 'translateX(100px)'}))
      ),
    ]),

    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-50px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-20px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),
      transition('* => void', group([
          animate(200, style({color: 'red'})),
          animate(1000, style({opacity: 0, transform: 'translateX(100px)'})),
        ])
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
