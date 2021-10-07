import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    const subscription = this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {

    this.subscriptions.forEach(sub => sub.unsubscribe());
    // because we use only Angular build-in observables (params), we do not need to do this. Angular will unsubscribe on its own
    // but for custom observables we need to do this
  }
}
