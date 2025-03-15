import {ElementRef, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ClTourState} from "@sadad/component-lib/src/enums";
import {ClTourOption} from "@sadad/component-lib/src/models";
import {ClDialogComponent} from "@sadad/component-lib/src/lib/dialog";


@Injectable({
  providedIn: 'root'
})
export class ClTourService {
  private _tourDialog?: ClDialogComponent;
  private _status: ClTourState = ClTourState.OFF;
  private currentStepSubject: Subject<ClTourOption | undefined> = new Subject();
  private stepListSubject: Subject<ClTourOption[]> = new Subject();
  anchors: { [anchorId: string]: ElementRef<any> } = {};
  steps: ClTourOption[] = [];
  currentStep?: ClTourOption = undefined;


  currentStepOnChange(): Observable<ClTourOption | undefined> {
    return this.currentStepSubject.asObservable();
  }

  stepListOnChange(): Observable<ClTourOption[]> {
    return this.stepListSubject.asObservable();
  }

  get status() {
    return this._status;
  }

  set tourDialog(value: ClDialogComponent) {
    this._tourDialog = value;
  }

  initialize(steps: ClTourOption[]) {
    this._status = ClTourState.OFF;
    this.steps = steps && steps.length > 0 ? steps.map((s, i) => {
      return {...s, stepId: ++i}
    }) : [];

    this.stepListSubject.next(this.steps);
  }

  start(stepId = 1) {
    const step = this.loadStep(stepId);
    if (!step) {
      return;
    }
    this._status = ClTourState.ON;
    this.goToStep(step);
  }

  loadAnchor(step: ClTourOption): ElementRef | undefined {
    return step && step.anchorId && this.anchors ? this.anchors[step.anchorId] : undefined
  }

  end() {
    if (!this._tourDialog) {
      return
    }
    this._status = ClTourState.OFF;
    this.setCurrentStep(undefined);
  }

  setCurrentStep(step: ClTourOption | undefined) {
    if (this.currentStep){
      const anchor = this.loadAnchor(this.currentStep);
      if (!anchor) {
        return;
      }
      anchor.nativeElement.classList.remove("cl-tour-anchor");
    }
    this.currentStep = step;
    this.currentStepSubject.next(step);
  }

  next() {
    if (this.currentStep && this.currentStep.stepId && this.hasNext(this.currentStep)) {
      const step = this.loadStep(this.currentStep.stepId + 1);
      if (step) {
        this.goToStep(step);
      }
    }
  }

  hasNext(step: ClTourOption) {
    return step ? this.steps?.length && step.stepId && step.stepId < this.steps.length : false;
  }

  hasPrev(step: ClTourOption) {
    return step ? this.steps?.length && step.stepId && step.stepId > 1 : false;
  }

  prev() {
    if (this.currentStep && this.currentStep.stepId && this.hasPrev(this.currentStep)) {
      const step = this.loadStep(this.currentStep.stepId - 1);
      if (step) {
        this.goToStep(step);
      }
    }
  }


  register(anchorId: string, anchor: ElementRef) {
    if (!anchorId) return;
    if (this.anchors && this.anchors[anchorId]) {
      throw new Error('anchorId ' + anchorId + ' already registered!');
    }
    this.anchors[anchorId] = anchor;
  }

  unregister(anchorId: string) {
    if (this.anchors && anchorId) {
      delete this.anchors[anchorId];
    }
  }


  goToStep(step: ClTourOption) {
    if (!step) {
      return;
    }
    this.setCurrentStep(step);
    this.showStep(this.currentStep!);
  }

  loadStep(stepId: number) {
    return this.steps?.find(step => step.stepId === stepId) || null;
  }

  showStep(step: ClTourOption) {
    if (this._tourDialog){
      this._tourDialog.visible = false;
    }
    const anchor = this.loadAnchor(step);
    if (!anchor) {
      return;
    }
    window.scroll({
      top: anchor.nativeElement?.offsetTop || anchor.nativeElement?.getBoundingClientRect()?.top,
      left: anchor.nativeElement?.offsetLeft || anchor.nativeElement?.getBoundingClientRect()?.left,
      behavior: 'smooth'
    });

    anchor.nativeElement.classList.add("cl-tour-anchor");
    anchor.nativeElement.addEventListener('click', (e: Event) => {
      this._tourDialog?.show(e);
    });

    anchor.nativeElement.click();
  }


}
