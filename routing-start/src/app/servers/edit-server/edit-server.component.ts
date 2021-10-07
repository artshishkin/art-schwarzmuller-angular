import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "../../can-deactivate.guard";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;

  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return !this.allowEdit ||
      !this.serverModified() ||
      this.serverModified() && this.changesSaved ||
      confirm("Do you want to discard the changes?");
  }

  serverModified(): boolean {
    return this.serverName !== this.server.name || this.serverStatus !== this.server.status;
  }

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    // this.allowEdit = this.route.snapshot.queryParams['allowEdit'];
    // const fragment = this.route.snapshot.fragment;
    // console.log(`Server ID: ${id}. Allow Edit - ${this.allowEdit}. Fragment: ${fragment}`);

    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(`Query Params in Subscription: ${JSON.stringify(queryParams)}`);
      this.allowEdit = queryParams['allowEdit'] === 'true';
    }); //no need to unsubscribe - this is Angular build-in Observable and Angular will handle it for us

    this.route.fragment.subscribe(fr => console.log(`Fragment in Subscription: ${fr}`));

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
