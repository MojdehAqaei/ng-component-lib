import {DOCUMENT} from '@angular/common';
import {
  Directive,
  OnChanges,
  OnDestroy,
  Input,
  Inject,
  ElementRef,
  SimpleChanges,
  Attribute,
  OnInit
} from '@angular/core';
import {ClMessageType} from '@sadad/component-lib/src/enums';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  badgeType: 'info',
  badgePosition: 'left'
};

@Directive({
  selector: '[clBadge]',
  standalone: true
})
export class ClBadgeDirective implements OnInit, OnChanges, OnDestroy {
  @Input() badgeLabel?: string;
  @Input() badgeType: ClMessageType = INITIAL_VALUE['badgeType'];
  @Input() badgePosition: 'right' | 'left' = INITIAL_VALUE['badgePosition'];

  badgeElement: HTMLElement | null = null;

  constructor(
    private _sharedService: ClSharedService,
    @Inject(DOCUMENT) private document: Document,
    private _elRef: ElementRef<HTMLElement>,
    @Attribute("styleClasses") public badgeStyleClasses: string = ''
  ) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['badgeLabel'].currentValue) {
      const value = this.badgeLabel?.trim();
      if (value && value.length > 0) {
        this.updateBadgeText(value);
      }
    }
  }

  ngOnDestroy() {
    if (this.badgeElement) {
      this.badgeElement.remove();
    }
  }

  private updateBadgeText(value: string) {
    if (!this.badgeElement) {
      this.createBadge(value);
    } else {
      this.badgeElement.textContent = value;
    }
  }

  private createBadge(value: string): HTMLElement {
    const badgeElement = this.document.createElement("span");
    this.addClasses(badgeElement);
    badgeElement.textContent = value;
    this._elRef.nativeElement.classList.add("cl-badge-container");
    this._elRef.nativeElement.appendChild(badgeElement);
    return badgeElement;
  }

  private addClasses(badgeElement: HTMLElement) {
    badgeElement.classList.add("cl-badge", this.badgePosition);
    if (this.badgeStyleClasses) {
      const customClasses = this.badgeStyleClasses.split(" ");
      badgeElement.classList.add(...customClasses);
    }
    badgeElement.classList.add(`cl-badge-${this.badgeType}`);

  }

}
