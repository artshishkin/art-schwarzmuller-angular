import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activatedSubject = new Subject<boolean>();

  constructor() {
  }

  activate(): void {
    this.activatedSubject.next(true);
  }

  deactivate(): void {
    this.activatedSubject.next(false);
  }

}
