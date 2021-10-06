import {Component} from '@angular/core';
import {CounterService} from "./services/counter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  get activeToInactiveCount(): number {
    return this.counterService.activeToInactiveCounter;
  }

  get inactiveToActiveCount(): number {
    return this.counterService.inactiveToActiveCounter;
  }

  get totalTransitions(): number {
    return this.counterService.totalTransitions;
  }

  constructor(private counterService: CounterService) {
  }
}
