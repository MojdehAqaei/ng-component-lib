import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'cl-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule ],
  templateUrl: './text-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClTextAreaComponent,
      multi: true
    }]
})
export class ClTextAreaComponent implements ControlValueAccessor{
  @Input() placeholder?: string = '';
  @Input({ transform:booleanAttribute }) readonly?: boolean = false;
  @Input() rows?: number;
  @Input() maxLength?: number;
  @Input() showLength?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() styleClasses?: string = '';
  @Output() onInputChange = new EventEmitter<any>();
  value: string = '';

  onChange: any = (el: any) => {
  }
  onTouch: any = () => {
  }


  change(event: any){
    const textVal = event.target.value;
    this.onChange(textVal);
    this.onInputChange.emit(textVal);
  }

  writeValue(value: any) {
      this.value = value || '';
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
