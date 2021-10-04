import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-assignment4',
  templateUrl: './assignment4.component.html',
  styleUrls: ['./assignment4.component.css']
})
export class Assignment4Component implements OnInit {

  gameScores: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onGameEvent(event: number) {
    this.gameScores.push(event);
  }
}
