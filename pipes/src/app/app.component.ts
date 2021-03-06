import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appStatus = new Promise((resolve => {
    setTimeout(() => resolve('stable'), 2000);
  }));

  order = 'DESC';

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(2021, 10, 13)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(2021, 10, 13)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(2021, 10, 13)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(2021, 10, 13)
    }
  ];
  filteredStatus: string = '';

  getStatusClasses(server: { instanceType: string, name: string, status: string, started: Date }) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddNewServer() {
    this.servers.push(
      {
        instanceType: 'small',
        name: 'New Server',
        status: 'stable',
        started: new Date(2021, 10, 13)
      }
    );
  }

  orderToggle(ascending: Event) {
    this.order = (ascending.srcElement as HTMLInputElement).checked ? 'ASC' : 'DESC';
    console.log(this.order);
  }
}
