import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[clAutoFocus]',
  standalone: true
})
export class ClAutofocusDirective implements AfterViewInit {

  constructor(private _elRef: ElementRef,
              private _cdRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    const tagName = this._elRef.nativeElement.tagName.toLowerCase();
    let input = this._elRef.nativeElement.querySelector(tagName == 'cl-chips'
                                                                              ? '.cl-chips-input-token-input'
                                                                              : tagName == 'cl-text-area'
                                                                                ? '.cl-text-area'
                                                                                : tagName == 'cl-date-picker'
                                                                                  ? '.dp-picker-input'
                                                                                  : '.cl-inputtext') || this._elRef.nativeElement;
    input.focus();
    this._cdRef.detectChanges();
  }
}
