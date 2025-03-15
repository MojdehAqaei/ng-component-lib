import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ClRegexStr,ClRegexStrType} from "@sadad/component-lib/src/enums";
import {ClKeyFilterDirective} from "@sadad/component-lib/src/lib/key-filter";
import {ClSharedService} from "@sadad/component-lib/src/services";
const INITIAL_VALUE: { [key: string]: any } = {
  iconPosition: 'right',
};
@Component({
  selector: 'cl-input-mask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ClKeyFilterDirective],
  templateUrl: './input-mask.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClInputMaskComponent,
      multi: true
    }]
})
export class ClInputMaskComponent implements  OnInit,ControlValueAccessor {

  @Input() disabled?: boolean = false;
  @Input() keyFilter?: ClRegexStrType;
  @Input() mask?: string = '';
  @Input() icon?: string;
  @Input() size?: 'sm' | 'lg';
  @Input() iconPosition?: 'left' | 'right' = 'right';
  @Input() styleClasses?: string = '';
  @Output() onInputChange = new EventEmitter<any>();
  inputText: string = '';
  inputValue: string = '';
  reservedChar = ['9', 'a', '*'];

  /***
   Mask format can be a combination of the following built-in definitions.

   a - Alpha character (A-Z,a-z)
   9 - Numeric character (0-9)
   * - Alpha numberic character (A-Z,a-z,0-9)

   ***/
  constructor(private  _sharedService:ClSharedService) {
  }
  ngOnInit() {
      this._sharedService.resetObjectValues(this,INITIAL_VALUE);
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }


  onFocus() {
    this.inputText = this.mask && !this.isCompleted ? this.applyMask() : this.inputText;
  }
  @HostListener('focusout', ['$event']) onFocusOut(event: any) {
    if (this.mask && !this.isCompleted) {
      this.change('');
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    if (!this.mask) {
      throw Error('mask is undefined');
    }
    this.inputText = this.inputText ? this.inputText : this.applyMask();
    const maskKey = this.mask[this.inputText?.indexOf('_')];
    if (event?.key == 'Backspace') {
      this.change(this.inputValue?.slice(0, -1));
    } else if (!this.isCompleted && event.key.length === 1 &&
      ((maskKey === '9' && new RegExp(ClRegexStr.pint).test(event?.key)) ||
        (maskKey === 'a' && new RegExp(ClRegexStr.alpha).test(event?.key)) ||
        (maskKey === '*' && new RegExp(ClRegexStr.alphanum).test(event?.key)))) {
      this.change((this.inputValue ? this.inputValue: '') + event?.key);
    }
    return false;
  }

  get isCompleted() {
    return this.inputText && this.inputText.indexOf('_') == -1;
  }


  applyMask(str= '') {
    const strArray = str?.split('');
    return this.mask ? this.mask?.split('').map((char) => this.reservedChar.includes(char) ? (strArray?.length ? strArray?.shift() : '_') : char).join('') : str;
  }

  change(value: string) {
    this.inputText = this.mask && value ? this.applyMask(value) : value;
    if (this.inputValue != value) {
      this.inputValue = value;
      this.onChange(value);
      this.onInputChange.emit(value);
    }
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: any) {
    this.inputValue = value;
    this.inputText = this.mask && value ? this.applyMask(value) : value;
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

  get styles() {
    return `${this.styleClasses} ${this.icon ? `cl-input-icon-${this.iconPosition}` : ''} cl-inputtext-${this.size}`
  }

}
