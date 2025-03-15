import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  placement: 'bottom',
  delay: 2,
};

@Directive({
  selector: '[clTooltip]',
  standalone: true,
})
export class ClTooltipDirective implements OnInit, OnDestroy {

  @Input('clTooltip') tooltipText?: string = '';
  @Input() placement?: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() delay?: number = 2;
  tooltip?: HTMLElement | null;
  offset = 10;

  constructor(private _elRef: ElementRef, private _renderer: Renderer2,
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
      this.hide();
  }

  show() {
    if (this.tooltipText && this.placement) {
      this.tooltip = this._renderer.createElement('span');
      this._renderer.addClass(this.tooltip, 'cl-tooltip');
      this._renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
      this._renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
      this._renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
      this._renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
      this._renderer.appendChild(this.tooltip, this._renderer.createText(this.tooltipText));
      this._renderer.appendChild(document.body, this.tooltip);
      this.setPosition(this.placement);
      this._renderer.addClass(this.tooltip, 'cl-tooltip-show');
    }

  }


  setPosition(placement: string) {
    if (this.tooltip) {
      let top, left;
      const hostPos = this._elRef.nativeElement.getBoundingClientRect();
      const tooltipPos = this.tooltip.getBoundingClientRect();
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (placement === 'top') {
        top = hostPos.top - tooltipPos.height - this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
      } else if (placement === 'bottom') {
        top = hostPos.bottom + this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
      } else if (placement === 'left') {
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - this.offset;
      } else if (placement === 'right') {
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + this.offset;
      }

      //change placement if tooltip  is outside the window
      if (left < 0 || (tooltipPos.width + left) > (window.innerWidth || document.documentElement.clientWidth)) {
        this.setPosition('top');
        return;
      }

      this._renderer.addClass(this.tooltip, `cl-tooltip-${placement}`);
      this._renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
      this._renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = undefined;
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
