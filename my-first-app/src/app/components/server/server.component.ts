import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  success: boolean = Math.random() >= 0.5;

  constructor() {
  }

  ngOnInit(): void {
  }

}
