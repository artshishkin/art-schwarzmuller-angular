import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated: boolean = false;
  subs: Subscription[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const sub = this.userService.activatedSubject.asObservable().subscribe(activated => this.userActivated = activated);
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
