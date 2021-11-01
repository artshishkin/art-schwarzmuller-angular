// @Injectable({
//   providedIn: 'root'
// })
export class LoggingService {

  lastLog: string;
  loggerId: number;

  constructor() {
    this.loggerId = Math.round(Math.random() * 1000_000);
  }

  printLog(message: string) {

    // console.log(`---------${this.loggerId}------------------`);
    console.log(message);
    // console.log(this.lastLog);
    // console.log('----------------------------------');
    this.lastLog = message;
  }

}
