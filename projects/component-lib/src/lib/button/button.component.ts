import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClButtonType} from '@sadad/component-lib/src/enums';
import {CommonModule} from "@angular/common";

const INITIAL_VALUE: { [key: string]: any } = {
  iconPosition: 'right',
  stopPropagation: true,
};

@Component({
  selector: 'cl-button',
  standalone: true,
  templateUrl: 'button.component.html',
  imports: [CommonModule],
})
export class ClButtonComponent {


  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() rounded: boolean = false;
  @Input() outlined: boolean = false;
  @Input() stopPropagation: boolean = true;
  @Input() icon?: string;
  @Input() label?: string;
  @Input() styleClasses?: string;
  @Input() type?: ClButtonType;
  @Input() size?: 'sm' | 'lg';
  @Input() iconPosition: 'left' | 'right' = INITIAL_VALUE['iconPosition'];
  @Output() onClick = new EventEmitter<Event>();

 constructor() {
  }

  ngOnInit() {
    this.resetObjectValues(this, INITIAL_VALUE);
  }

  resetObjectValues(object:any , values:any){
    for (let property in object) {
      if (object[property] == undefined || object[property] == null) {
        object[property] = values[property];
      }
    }
  }

  get iconClasses(): string {
    return `${this.loading ? 'cl-button-icon-spin':''}  cl-button-icon-${this.iconPosition}`
  }

  get classes(): string {
    return `cl-button cl-component'
      ${this.disabled ? 'cl-disabled cl-button-disabled' : ''}
      ${this.outlined ? 'cl-button-outlined' : ''}
      ${this.icon && !this.label ? 'cl-button-icon-only' : ''}
      ${this.rounded ? 'cl-button-rounded' : ''}
      ${this.type ? `cl-button-${this.type}` :''}
      ${this.size ?`cl-button-${this.size}` :''}
      ${this.styleClasses}`;
  }


  click(event:any){
    if(this.stopPropagation)
      event.stopPropagation();
     this.onClick.emit(event)
  }
}

