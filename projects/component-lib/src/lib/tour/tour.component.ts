import {
  ChangeDetectorRef,
  Component, HostListener, Input, OnInit,
  ViewChild,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ClSharedService, ClTourService} from "@sadad/component-lib/src/services";
import {ClTourState, ClButtonTypes} from "@sadad/component-lib/src/enums";
import {ClTourOption} from "@sadad/component-lib/src/models";
import {ClDialogComponent} from "@sadad/component-lib/src/lib/dialog";
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";

const INITIAL_VALUE: { [key: string]: any } = {
  showStartBtn: true,
};

@Component({
  selector: 'cl-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  standalone: true,
  imports: [CommonModule, ClDialogComponent, ClTemplateDirective, ClButtonComponent],
})
export class ClTourComponent implements OnInit {
  @Input() prevBtnTitle: string = '';
  @Input() nextBtnTitle: string = '';
  @Input() endBtnTitle: string = '';
  @Input() showStartBtn: boolean = true;
  @ViewChild('dialogComponent') dialogComponent?: ClDialogComponent;
  step?: ClTourOption;
  buttonType: typeof ClButtonTypes;
  steps?: ClTourOption[];

  constructor(private _sharedService: ClSharedService,
              public _tourService: ClTourService,
              private _cdRef: ChangeDetectorRef) {
    this.buttonType = ClButtonTypes;
    this._tourService.stepListOnChange().subscribe(x => {
      this.steps = x;
    });

    this._tourService.currentStepOnChange().subscribe(x => {
      this.step = x;
      this._cdRef.detectChanges();

      if (this.dialogComponent) {
        this._tourService.tourDialog = this.dialogComponent;
      }
    });
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  start() {
    this._tourService.start();
  }

  @HostListener('window:keydown.Escape')
  public onEscapeKey(): void {
    if (this._tourService.status === ClTourState.ON) {
      this._tourService.end();
    }
  }

  @HostListener('window:keydown.ArrowRight')
  public onArrowRightKey(): void {
    if (
      this._tourService.currentStep &&
      this._tourService.status === ClTourState.ON &&
      this._tourService.hasNext(this._tourService.currentStep)) {
      this._tourService.next();
    }
  }

  @HostListener('window:keydown.ArrowLeft')
  public onArrowLeftKey(): void {
    if (
      this._tourService.currentStep &&
      this._tourService.status === ClTourState.ON &&
      this._tourService.hasPrev(this._tourService.currentStep)) {
      this._tourService.prev();
    }
  }

}
