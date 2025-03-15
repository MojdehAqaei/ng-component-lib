import {Component, Input, HostListener, SimpleChanges, OnChanges, Attribute, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClButtonComponent} from '@sadad/component-lib/src/lib/button'
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClButtonType} from "@sadad/component-lib/src/enums";

const INITIAL_VALUE: { [key: string]: any } = {
  scrollTo:'top',
  type: 'info',
};

@Component({
  selector: 'cl-scroll-top-bottom',
  standalone: true,
  imports: [CommonModule, ClButtonComponent],
  templateUrl: './scroll-top-bottom.component.html',
})
export class ScrollTopBottomComponent implements OnInit, OnChanges {
  @Input() scrollTo: 'top' | 'bottom' = 'top';
  @Input() type?: ClButtonType = 'info';

  windowScrolled: boolean = false;
  showBtn: boolean = false;

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (window.innerHeight < (document.documentElement.scrollHeight || document.body.scrollHeight)) {
      this.showBtn = changes['type'].currentValue != 'top'
    }
  }

  onScrollTo() {
    if (this.scrollTo == 'top') {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scroll({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }


  @HostListener('window:scroll', ['$event'])
  scrolled(event: any): void {
    const offset = 100;
    const windowHeight = window.innerHeight + offset;
    const scroll = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollBottom = scrollTop + windowHeight - offset;

    this.showBtn = this.scrollTo == 'top' ? scroll > windowHeight && scrollTop > 10 : scroll > scrollBottom;
  }

  get classes(): string {
    return `cl-scroll-button
      ${this.scrollTo == 'top' ? 'cl-scroll-button-top' : 'cl-scroll-button-bottom'}
      ${this.styleClasses}`;
  }

}

