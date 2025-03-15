import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'cl-input-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClInputSwitchComponent,
      multi: true
    }]
})
export class ClInputSwitchComponent implements  ControlValueAccessor  {
  @Input() disabled: boolean = false;
  @Input() styleClasses: string = '';
  @Output() onInputChange = new EventEmitter<any>();

  isChecked: boolean = false;

  constructor(){}

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  toggleChecked(){
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.onChange(this.isChecked);
      this.onInputChange.emit(this.isChecked);
    }
  }

  writeValue(value: any){
    this.isChecked = value;
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
