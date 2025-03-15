import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClImageComponent} from "@sadad/component-lib/src/lib/image";

const INITIAL_VALUE: { [key: string]: any } = {
  type: 'label',
  shape: 'square',
  size: 'md'
};

@Component({
  selector: 'cl-avatar',
  standalone: true,
    imports: [CommonModule, ClImageComponent],
  templateUrl: './avatar.component.html',
})
export class ClAvatarComponent implements OnInit {
  @Input() value: string = '';
  @Input() styleClasses: string = '';
  @Input() type: 'label' | 'icon' | 'img' = INITIAL_VALUE['type'];
  @Input() shape: 'square' | 'circle' = INITIAL_VALUE['shape'];
  @Input() size: 'xl' | 'lg' | 'md' | 'sm' = INITIAL_VALUE['size'];

  constructor(private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  get classes() {
    return `${this.styleClasses} cl-avatar-${this.shape} cl-avatar-${this.size}`;
  }
}
