import {Attribute, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  layout: 'horizontal',
  type: 'solid',
};

@Component({
  selector: 'cl-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
})
export class ClDividerComponent implements OnInit {
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() type: 'solid' | 'dashed' | 'dotted' = 'solid';
  @Input() color: string = '';

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  get classes(): string {
    return `cl-divider
      ${this.type ? `cl-divider-${this.type}` : ''}
      ${this.layout ? `cl-divider-${this.layout}` : ''}
      ${this.styleClasses}`;
  }

}
