import {Component, EventEmitter, Input, Optional, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  ControlValueAccessor, FormGroupDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
  selector: 'cl-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClCheckboxComponent,
      multi: true
    },
  ]
})
export class ClCheckboxComponent implements  ControlValueAccessor {


  @Input() formControlName?: string;
  @Input() disabled?: boolean = false;
  @Input() binary?: boolean = false;
  @Input() styleClasses?: string;
  @Input() value!: any;
  @Input() label?: string;
  @Output() onCheck = new EventEmitter<any>();
  options: any[] = [];
  checked: boolean = false;

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  constructor(@Optional() private _formGroupDirective?: FormGroupDirective) {
  }



  onClick() {

    if (!this.disabled) {
      this.checked = !this.checked;
      this.options = this.binary ? [] : this.checked ?  [this.value].concat(this.options || []) : this.options?.filter((x: any) => x !== this.value);

      // prevent losing previous checked options in formControl
      if (!this.binary && this.formControlName && this._formGroupDirective?.form) {
        this._formGroupDirective?.form.get(this.formControlName)?.setValue(this.options)
        this._formGroupDirective?.form.get(this.formControlName)?.updateValueAndValidity();
      }

      this.onCheck.emit(this.binary ? this.checked : this.options);
      this.onChange(this.binary ? this.checked :this.options);

    }
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: boolean | any[]) {
   if (!this.binary && value && !Array.isArray(value)) {
      throw Error('If the checkbox is not binary , The bound value must be an array');
    }

    this.options = this.binary ? [] : value as any[];
    this.checked = this.binary ? !!value : this.options?.includes(this.value);
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

}
