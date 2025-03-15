import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ClRegexStr } from "@sadad/component-lib/src/enums";
import { ClSharedService } from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  mode: 'num'
};

@Component({
  selector: 'cl-input-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClInputNumberComponent,
      multi: true
    }]
})
export class ClInputNumberComponent implements OnInit, ControlValueAccessor {

  @Input() disabled?: boolean = false;
  @Input({ transform:booleanAttribute }) readonly?: boolean = false;
  @Input() placeholder?: string = '';
  @Input() styleClasses?: string = '';
  @Input() useGrouping?: boolean = false;
  @Input() mode?: 'num' | 'pnum' | 'int' | 'pint' = 'num';
  @Input() suffix?: string = '';
  @Input() prefix?: string = '';
  @Input() min?: number;
  @Input() max?: number;
  @Input() maxFractionDigits?: number;
  @Output() onInputChange = new EventEmitter<number | null>();
  @Output() onEnter = new EventEmitter<any>();
  inputValue: string = '';
  inputText: string = '';
  selectionText: string = '';
  selectionStart: number = 0;
  selectionEnd: number = 0;
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  constructor(private _elRef: ElementRef,
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    this.selectionText = '';
  }

  @HostListener('select', ['$event']) onSelect(event: any) {
    if (this.inputText?.length) {
      let target = event.target;
      const prefixLength = this.prefix ? this.prefix?.length : 0;

      if ((this.prefix && target.selectionStart <= prefixLength && target.selectionEnd <= prefixLength) || (this.suffix && target.selectionStart >= prefixLength + this.inputText.length && target.selectionEnd >= prefixLength + this.inputText.length)) {
        this.selectionText = '';
        return
      }
      this.selectionStart = target.selectionStart <= prefixLength ? 0 : target.selectionStart - prefixLength;
      this.selectionEnd = target.selectionEnd >= prefixLength + this.inputText.length ? this.inputText.length : target.selectionEnd - prefixLength;
    }
    this.selectionText = this.inputText.substring(this.selectionStart, this.selectionEnd);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this.disabled && !this._elRef.nativeElement.contains(event.target) && this.inputValue && (!this.hasCorrectNumFormat(this.inputValue) || isNaN(+this.inputValue) || this.hasMinError())) {
      this.inputValue = this.inputText = '';
      this.setInputValue();
    }
    this.selectionText = '';
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    if (this.readonly) return;

    const key = event?.key;
    const allowedCharacters = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Control', 'Alt', 'Shift', 'Escape'];
    if (!allowedCharacters.includes(key)) {
      let nextValue = this.inputValue;
      if (key == ' ' || key == 'Backspace') {
        nextValue = this.erase();
      } else if (this.checkNumberMode(key)) {
        let tempVal = this.selectionText ? this.replaceKeyWithSelectedText(key) : this.inputValue? this.inputValue + key: key;
        nextValue =
          this.hasCorrectNumFormat(tempVal) &&
          !this.hasMaxError(tempVal) &&
          this.checkMaxFraction(tempVal) ? tempVal : this.inputValue;
      }

      if (this.inputValue !== nextValue) {
        this.inputValue = nextValue;
        this.setInputValue();
        this.setInputText();
        this.selectionText = '';
      }
      return false;
    } else {
      return true;
    }
  }

  erase(): string {
    return this.selectionText ? this.replaceKeyWithSelectedText('') : this.inputValue?.slice(0, -1);
  }

  checkNumberMode(key: string) {
    return this.mode && new RegExp(ClRegexStr[this.mode]).test(key);
  }

  replaceKeyWithSelectedText(key: string) {
    return (this.inputText.slice(0, this.selectionStart) + key + this.inputText.slice(this.selectionEnd)).replace(/,/g, "");
  }

  hasCorrectNumFormat(num: string) {
    return new RegExp(/^(-|0|-?[1-9][0-9]*|[0-9]+\.\d*)$/).test(num);
  }

  hasMinError() {
    return this.min ? +this.inputValue < this.min : false;
  }

  hasMaxError(num: string) {
    return this.max ? +num > this.max : false;
  }

  checkMaxFraction(num: string) {
    if (this.maxFractionDigits) {
      const dotIndex = num.split('').findIndex(x => x === '.');
      return dotIndex === -1 ? true : num.slice(dotIndex + 1)?.length ? num.slice(dotIndex + 1).length <= this.maxFractionDigits : true;
    }
    return true
  }

  addThousandSeparator(num: string) {
    const dotIndex = num.split('').findIndex(x => x === '.');
    const numberCorrectPart = dotIndex === -1 ? num : num.slice(0, dotIndex);
    return numberCorrectPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dotIndex !== -1 ? '.' + num.slice(dotIndex + 1) : '')
  }

  setInputText() {
    this.inputText = this.inputValue ? (this.useGrouping && this.inputValue?.length > 3 ? this.addThousandSeparator(this.inputValue) : this.inputValue) : '';
  }


  setInputValue() {
    const value = this.inputValue == '0' ? 0 : +this.inputValue || null;
    this.onChange(value);
    this.onInputChange.emit(value);
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: any) {
    if (value || value == 0) {
      if (isNaN(+value)) {
        throw Error(`${value} is not a  valid number`);
      }
      this.inputValue =  this.maxFractionDigits && value % 1 !== 0 ? value.toFixed(this.maxFractionDigits).toString() : value.toString();
      this.setInputText();
    } else {
      this.inputText = this.inputValue = '';
    }
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

  get classes() {
    return `${this.suffix ? '' : 'cl-input-number'} ${this.readonly ? 'cl-readonly' : ''} ${this.disabled ? 'cl-disabled' : ''}${this.styleClasses ? this.styleClasses : ''} `;
  }

}
