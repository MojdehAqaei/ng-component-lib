import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ClTourService} from "@sadad/component-lib/src/services";



@Directive({
  selector: '[clTourAnchor]',
  standalone: true
})
export class ClTourAnchorDirective implements OnInit, OnDestroy, ClTourAnchorDirective {

  @Input('clTourAnchor') tourAnchor!: string;

  constructor(private _tourService: ClTourService, private _elRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.tourAnchor) {
      this._tourService.register(this.tourAnchor, this._elRef);
    }
  }

  ngOnDestroy(): void {
    if (this.tourAnchor) {
      this._tourService.unregister(this.tourAnchor);
    }
  }
}
