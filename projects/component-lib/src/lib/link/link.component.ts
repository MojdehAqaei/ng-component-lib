import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClButtonType} from '@sadad/component-lib/src/enums';
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClImageComponent} from "@sadad/component-lib/src/lib/image";
import {RouterLink} from "@angular/router";


const INITIAL_VALUE: { [key: string]: any } = {
  underline: 'always',
};

@Component({
  selector: 'cl-link',
  standalone: true,
  imports: [CommonModule, ClImageComponent, RouterLink],
  templateUrl: './link.component.html',
})
export class ClLinkComponent implements OnInit {
  @Input() routerLink: string = '';
  @Input() href: string = '';
  @Input() title: string = '';
  @Input() target?: '_self' | '_blank' | '_parent' | '_top';
  @Input() imageSrc: string = '';
  @Input() color?: ClButtonType;
  @Input() underline: 'none' | 'hover' | 'always' = 'always';
  @Input() icon = '';
  @Input() styleClasses: string = '';
  @Output() onClick = new EventEmitter();

  constructor(private _sharedService: ClSharedService) {
  }

  get classes(): string {
    return `cl-link
      ${this.color ? `cl-link-${this.color}` : ''}
      ${this.underline ? `cl-link-underline-${this.underline}` : ''}
      ${this.styleClasses}`;
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

}
