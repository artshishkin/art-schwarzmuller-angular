export class LoggingService {

  private serviceId: number;

  constructor() {
    this.serviceId = Math.floor(Math.random() * 1_000_000);
    console.log(`Created LoggingService with id: ${this.serviceId}`);
  }

  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
