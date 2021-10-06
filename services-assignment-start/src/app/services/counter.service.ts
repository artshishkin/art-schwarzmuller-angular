import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  constructor() {
  }

  get totalTransitions(): number {
    console.log(`CounterService totalTransitions getter is invoked: ${this.inactiveToActiveCounter} + ${this.activeToInactiveCounter}`);
    return this.activeToInactiveCounter + this.inactiveToActiveCounter;
  }

  incrementInactiveToActive(): number {
    return this.inactiveToActiveCounter++;
  }

  incrementActiveToInactive(): number {
    return this.activeToInactiveCounter++;
  }
}
