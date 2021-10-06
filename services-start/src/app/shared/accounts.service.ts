import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class AccountsService {

  statusUpdated = new EventEmitter<string>();

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) {
    const id = Math.floor(Math.random() * 1_000_000);
    console.log(`Accounts Service created with id ${id}`)
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
    this.statusUpdated.emit(status);
  }
}
