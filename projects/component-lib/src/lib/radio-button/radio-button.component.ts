import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'cl-radio-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClRadioButtonComponent),
      multi: true
    }]
})
export class ClRadioButtonComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() label?: string = '';
  @Input() value: any;
  @Input() disabled: boolean = false;
  @Input() styleClasses: string = '';
  @Output() onInputChange = new EventEmitter<any>();

  checked: boolean = false;

  constructor( private _cdRef:ChangeDetectorRef){}

  onChange: any = () => {
  }
  onTouch: any = () => {
  }



  onSelect(event:any){
    const selectedVal = event.target.checked ? event.target.value : null;
    this.onChange(selectedVal);
    this.onInputChange.emit(selectedVal);
  }

  writeValue(value: any) {
    this.checked =value ?  value == this.value ? true : false: false;
    this._cdRef.detectChanges();
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(onTouched: Function) {
      this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
