import {Component, Input} from '@angular/core';
import {LoggingService} from "../shared/logging.service";
import {AccountsService} from "../shared/accounts.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService, AccountsService]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {
  }

  onSetTo(status: string) {
    this.accountsService.updateAccount(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
