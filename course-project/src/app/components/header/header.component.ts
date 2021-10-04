import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('navChanged') pageToShow = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onNavClick(componentToShow: string) {
    this.pageToShow.emit(componentToShow);
  }
}
