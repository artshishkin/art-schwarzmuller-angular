export class AccountsService {

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

  constructor() {
    const id = Math.floor(Math.random() * 1_000_000);
    console.log(`Accounts Service created with id ${id}`)
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
  }
}
