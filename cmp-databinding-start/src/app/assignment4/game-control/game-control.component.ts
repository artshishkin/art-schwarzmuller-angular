import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() gameEvent = new EventEmitter<number>();

  gameCounter: number = 0;
  gameStarted: boolean = false;
  private intervalRef: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  onStartTheGame() {
    if (this.gameStarted) return;

    this.intervalRef = setInterval(() => {
        this.gameCounter++;
        console.log(`Game counter: ${this.gameCounter}`);
        this.gameEvent.emit(this.gameCounter);
      },
      1000);

    this.gameStarted = true;
  }

  onStopTheGame() {
    if (!this.gameStarted) return;
    clearInterval(this.intervalRef);
    this.gameStarted = false;
  }
}
