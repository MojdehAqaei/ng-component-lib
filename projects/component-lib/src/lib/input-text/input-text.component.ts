import {booleanAttribute, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClickOutsideDirective} from "@sadad/component-lib/src/lib/click-outside";

const INITIAL_VALUE: { [key: string]: any } = {
  type: 'text',
  iconPosition: 'right',
};

@Component({
  selector: 'cl-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ClickOutsideDirective],
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClInputTextComponent,
      multi: true
    }]
})
export class ClInputTextComponent implements  OnInit,  ControlValueAccessor {


  @Input() disabled?: boolean = false;
  @Input({ transform:booleanAttribute }) readonly?: boolean = false;
  @Input() type?: 'text' | 'password' | 'email' | 'time' = 'text';
  @Input() placeholder?: string = '';
  @Input() maxLength?: number;
  @Input() icon?: string;
  @Input() size?: 'sm' | 'lg'  ;
  @Input() iconPosition?: 'left' | 'right' = 'right';
  @Input() styleClasses?: string = '';
  @Output() onInputChange = new EventEmitter<any>();
  @Output() onEnter = new EventEmitter<any>();
  inputValue: string = '';

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  constructor(private _sharedService:ClSharedService) {
  }

  ngOnInit() {
      this._sharedService.resetObjectValues(this,INITIAL_VALUE);
  }
  @HostListener('focusout', ['$event']) onFocusOut(event: any) {
    if (this.type =='email' && this.inputValue && !(new RegExp(/^[a-zA-Z0-9.!#$&_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/).test(this.inputValue))) {
      this.inputValue = '';
    }
  }
  change() {
    this.onChange(this.inputValue);
    this.onInputChange.emit(this.inputValue);
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: any) {
    this.inputValue = value;
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any) {
    this.onChange = fn
  }

  // When the element is touched, this method will get called
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get styles(){
    return `${this.styleClasses} ${this.icon ? `cl-input-icon-${this.iconPosition}` : ''} cl-inputtext-${this.size}`
  }

}
