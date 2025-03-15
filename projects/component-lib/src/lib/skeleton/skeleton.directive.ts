import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  width: '50%',
  height: '1rem',
};

@Directive({
  selector: '[clSkeleton]',
  standalone: true
})
export class ClSkeletonDirective implements OnInit, OnChanges {

  @Input('clSkeleton') visible!: boolean;
  @Input('width') width: string = '50%';
  @Input('height') height: string = '1em';

  constructor(private renderer: Renderer2,
              private _elRef: ElementRef,
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible) {
      const style = `
       width: ${this.width};
       height: ${this.height};`;
      this._elRef.nativeElement.setAttribute("style", style);
      this.renderer.addClass(this._elRef.nativeElement, 'cl-skeleton');
      this._elRef.nativeElement.innerHTML = ' ';
    } else {
      this.renderer.removeClass(this._elRef.nativeElement, 'cl-skeleton');
      this._elRef.nativeElement.width = 'auto';
      this._elRef.nativeElement.height = 'auto';

    }

  }
}
