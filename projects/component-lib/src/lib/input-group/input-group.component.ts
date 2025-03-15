import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ClAction} from "@sadad/component-lib/src/models";

@Component({
  selector: 'cl-input-group',
  standalone: true,
  imports: [CommonModule,ClButtonComponent,FormsModule],
  templateUrl: './input-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClInputGroupComponent,
      multi: true
    }]
})
export class ClInputGroupComponent implements  OnChanges ,ControlValueAccessor {


  @Input() disabled?: boolean = false;
  @Input() placeholder?: string = '';
  @Input() maxLength?: number;
  @Input() styleClasses?: string = '';
  @Input() addons?: ClAction[]=[];
  @Output() onInputChange = new EventEmitter<any>();
  inputValue: string = '';
  addonsStart: ClAction[] =[];
  addonsEnd: ClAction[] =[];


  onChange: any = () => {
  }
  onTouch: any = () => {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['addons'].currentValue && this.addons?.length){
      this.addonsStart = this.addons?.filter(x=>!x.position || x.position =='start');
      this.addonsEnd= this.addons?.filter(x=>x.position =='end');
    }
  }

  change() {
    this.onChange(this.inputValue);
    this.onInputChange.emit(this.inputValue)
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: any) {
   this.inputValue = value || '';
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
