import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class LoggingService {

  constructor() {
    console.log(`Created LoggingService with id: ${(Math.floor(Math.random() * 1_000_000))}`);
  }

  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
