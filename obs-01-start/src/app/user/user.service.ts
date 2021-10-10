import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activatedEmitter = new EventEmitter<boolean>();

  constructor() {
  }

  activate(): void {
    this.activatedEmitter.emit(true);
  }

  deactivate(): void {
    this.activatedEmitter.emit(false);
  }

}
