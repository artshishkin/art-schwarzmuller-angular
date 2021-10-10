import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    // const firstObsSubscription = interval(1000).subscribe(count => console.log(count));
    // this.subs.push(firstObsSubscription);

    const customIntervalObservable: Observable<number> = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5) observer.complete();
        if (count > 3) observer.error(new Error('Count is greater then 3!'));
        count++;
      }, 1000);
    });

    const subscription = customIntervalObservable.subscribe(
      count => console.log(count),
      error => {
        console.log(error);
        alert(error.message);
      },
      () => console.log("Complete")
    );
    this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
