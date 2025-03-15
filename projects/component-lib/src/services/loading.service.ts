import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {LoadingMode} from "@sadad/component-lib/src/models";

@Injectable({
  providedIn:'root'
})
export class ClLoadingService {
  _interval: any;
  progressValue$ = new Subject<number>();
  loading$ = new Subject<boolean>();

  constructor() {}

  show(mode: LoadingMode) {
    if (mode == 'determinate') {
      let val: number = 0;
      this._interval = setInterval(() => {
        if (val < 100) {
          val++;
          this.progressValue$.next(val);
        }
      }, 1000);
    }

    if (mode == 'indeterminate') {
      this.loading$.next(true);
    }
  }

  hide(mode: LoadingMode) {
    if (mode == 'determinate') {
      this.progressValue$.next(100);
      clearInterval(this._interval);
    }

    if (mode == 'indeterminate') {
      this.loading$.next(false);
    }

  }
}
