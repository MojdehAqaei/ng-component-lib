import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { ClStepItem } from '@sadad/component-lib/src/models';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { ClButtonType } from '@sadad/component-lib/src/enums';
import { ClSharedService } from '@sadad/component-lib/src/services';

const INITIAL_VALUE: { [key: string]: any } = {
  editable: true,
  backBtnLabel: 'مرحله قبل',
  backBtnType: 'danger',
  nextBtnLabel: 'مرحله بعد',
  nextBtnType: 'info',
  confirmBtnLabel: 'تایید',
  confirmBtnType: 'success',
};

@Component({
  selector: 'cl-steps',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClButtonComponent,
    ClAlertMessagesComponent,
  ],
  templateUrl: './steps.component.html',
})
export class ClStepsComponent implements OnInit, OnChanges {
  @Input() activeIndex: number = 0;
  @Input() steps: ClStepItem[] = [];
  @Input() readonly: boolean = false;
  @Input() prevAllowed: boolean = true;
  @Input() backBtnLabel: string = 'مرحله قبل';
  @Input() backBtnType: ClButtonType = 'danger';
  @Input() backBtnSize?: 'sm' | 'lg';
  @Input() nextBtnLabel: string = 'مرحله بعد';
  @Input() nextBtnType: ClButtonType = 'info';
  @Input() nextBtnSize?: 'sm' | 'lg';
  @Input() confirmBtnLabel: string = 'تایید';
  @Input() confirmBtnType: ClButtonType = 'success';
  @Input() confirmBtnSize?: 'sm' | 'lg';
  @Output() onNext = new EventEmitter<number>();
  @Output() onBack = new EventEmitter<number>();
  @Output() onConfirm = new EventEmitter<number>();
  @Output() activeIndexChange = new EventEmitter<number>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _sharedService: ClSharedService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeIndex']) {
      this.activeIndexChange.emit(this.activeIndex);
      this.setUrl();
    }
  }

  ngOnInit(): void {
    this.setUrl();
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  nextClicked() {
    this.onNext.emit(this.activeIndex);
    if (this.steps[this.activeIndex].status) {
      this.activeIndex++;
      this.activeIndexChange.emit(this.activeIndex);
      this.setUrl();
    }
  }

  backClicked() {
    this.onBack.emit(this.activeIndex);
    this.activeIndex--;
    this.activeIndexChange.emit(this.activeIndex);
    this.setUrl();
  }

  confirmClicked() {
    this.onConfirm.emit(this.activeIndex);
    this.activeIndexChange.emit(this.activeIndex);
  }

  setUrl() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        ...this._route.snapshot.queryParams,
        step: this.activeIndex,
      },
    });
  }

  selectStep(step: ClStepItem, index: number) {
    if (
      index != this.activeIndex &&
      !this.readonly &&
      this.steps[index].status &&
      ((this.activeIndex > index && this.prevAllowed) ||
        (this.activeIndex < index && this.steps[this.activeIndex].status))
    ) {
      this.activeIndex = index;
      this.activeIndexChange.emit(this.activeIndex);
    }
  }
}
