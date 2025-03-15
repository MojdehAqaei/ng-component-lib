import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Subject} from "rxjs";

@Directive({
  selector: '[clUserInactivity]',
  standalone: true
})
export class ClUserInactivityDirective implements AfterViewInit {

  userActivity: any | undefined;
  userInactive: Subject<any> = new Subject();

  @Input('timeSpan') timeSpan: number = 0; // milliseconds

  @Output('onInactivate') onInactivate = new EventEmitter<boolean>();

  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setTimeout();
    this.userInactive.subscribe(val => {
      this._element.nativeElement.hidden = false;
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => {
      this.userInactive.next(undefined);
      this.onInactivate.emit(true);
    }, this.timeSpan);
  }

  @HostListener('window:mousemove')
  refreshUserStateAfterMousemove() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('window:keyup')
  refreshUserStateAfterKeyup() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('document:visibilitychange', ['$event'])
  refreshUserStateAfterVisibilityChange() {
    if (document.hidden){
      clearTimeout(this.userActivity);
      this.setTimeout();
    } else {
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }

}


