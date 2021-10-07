import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("EditServerComponent: ngOnInit");
    const id: number = +this.route.snapshot.params['id'];
    const allowEdit: boolean = this.route.snapshot.queryParams['allowEdit'];
    const fragment = this.route.snapshot.fragment;
    console.log(`Server ID: ${id}. Allow Edit - ${allowEdit}. Fragment: ${fragment}`);

    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(`Query Params in Subscription: ${JSON.stringify(queryParams)}`);
    }); //no need to unsubscribe - this is Angular build-in Observable and Angular will handle it for us

    this.route.fragment.subscribe(fr => console.log(`Fragment in Subscription: ${fr}`));

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
