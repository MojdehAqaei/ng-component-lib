import {AfterViewChecked, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  matchHeightClass: 'matchHeight',
  minWidth: 601,
};

@Directive({
  selector: '[clMatchHeight]',
  standalone: true
})
export class ClMatchHeightDirective implements OnInit, AfterViewChecked {
// class name to match height
  @Input() matchHeightClass: string = 'matchHeight';
  @Input() maxWidth?: number;
  @Input() minWidth?: number = 601;

  constructor(private el: ElementRef,
              private  _sharedService:ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngAfterViewChecked() {
    if ((this.minWidth != undefined && window.innerWidth >= this.minWidth) || (this.maxWidth != undefined && window.innerWidth < this.maxWidth)) {
      this.matchHeight(this.el.nativeElement, this.matchHeightClass);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if ((this.minWidth != undefined && event.target.innerWidth >= this.minWidth) || (this.maxWidth != undefined && event.target.innerWidth < this.maxWidth)) {
      this.matchHeight(this.el.nativeElement, this.matchHeightClass);
    }
  }

  matchHeight(parent: HTMLElement, className: string) {

    if (!parent) {
      return;
    }
    const children = parent.getElementsByClassName(className);

    if (!children) {
      return;
    }

    // reset all children height
    Array.from(children).forEach((x: Element) => {
      //@ts-ignore
      x.style.height = 'initial';
    });

    // gather all height
    const itemHeights = Array.from(children)
      .map(x => x.getBoundingClientRect().height);

    // find max height
    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);

    // apply max height
    Array.from(children)
      //@ts-ignore
      .forEach((x: Element) => x.style.height = `${maxHeight}px`);
  }
}
