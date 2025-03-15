import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClLoadingService} from '@sadad/component-lib/src/services';
import {Subject, Subscription} from "rxjs";
import {LoadingMode} from "@sadad/component-lib/src/models";

const INITIAL_VALUE: { [key: string]: any } = {
  mode: 'indeterminate'
}

@Component({
  selector: 'cl-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html'
})
export class ClLoadingComponent implements OnInit, OnDestroy {
  @Input() mode: LoadingMode = 'indeterminate';
  @Input() styleClass: string = '';

  private _loading: boolean = false;
  private _value: number = 0;
  subscription?: Subscription;

  constructor(private _loadingService: ClLoadingService) {
  }

  get loading(): boolean {
    return this._loading;
  }

  get value(): number {
    return this._value;
  }

  ngOnInit(): void {
    const subs: Subject<any> | null = this.mode == "indeterminate"
      ? this._loadingService.loading$
      : this.mode == "determinate"
        ? this._loadingService.progressValue$
        : null;
    this.subscription = subs?.pipe().subscribe(
      (val: any) => {
        this.mode == "indeterminate" ? this._loading = val : this._value = val;
      }
    );

    for (let property in this) {
      if (this[property] == undefined || this[property] == null) {
        this[property] = INITIAL_VALUE[property];
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
