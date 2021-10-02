import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component implements OnInit {

  showPassword: boolean = false;
  clicks: Date[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleDisplaying() {
    this.showPassword = !this.showPassword;
    const clickDate = new Date();
    this.clicks.push(clickDate);
  }

  getBackColor(index: number): string {
    return index < (5-1) ? 'white' : 'blue';
  }
}
