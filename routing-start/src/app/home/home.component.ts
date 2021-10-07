import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FakeAuthService} from "../fake-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private fakeAuthService: FakeAuthService) {
  }

  ngOnInit() {
  }

  onLoadServer(id: number) {
    // assume complex calculation
    this.router.navigate(
      ['/servers', id, 'edit'],
      {
        queryParams:
          {
            param2: 'value2',
            allowEdit: false
          },
        fragment: 'someFragment'
      }
    );
  }

  onLogin() {
    this.fakeAuthService.login();
  }

  onLogout() {
    this.fakeAuthService.logout();
  }
}
