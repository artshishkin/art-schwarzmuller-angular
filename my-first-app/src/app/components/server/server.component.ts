import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverId: number = Math.round(Math.random() * 1_000_000);
  private serverStatus: string = Math.random() > 0.5 ? 'ONLINE' : 'OFFLINE';

  constructor() {
  }

  ngOnInit(): void {
  }

  getServerStatus(): string {
    return this.serverStatus;
  }

  getColor() {
    return (this.serverStatus === 'ONLINE') ? 'green' : 'red';
  }
}
