import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ClMessageType } from '@sadad/component-lib/src/enums';
import { ClSelectItem } from '@sadad/component-lib/src/models';

@Component({
  selector: 'cl-chips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chips.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClChipsComponent,
      multi: true,
    },
  ],
})
export class ClChipsComponent implements ControlValueAccessor {
  @Input() styleClasses?: string = '';
  @Input() disabled?: boolean = false;
  @Input() placeholder?: string = '';
  @Input() allowDuplicate?: boolean = false;
  @Input() maxLength?: number;
  @Input() showLength?: boolean = false;
  @Output() onAdd: EventEmitter<ClSelectItem[]> = new EventEmitter<
    ClSelectItem[]
  >();
  @Output() onRemove: EventEmitter<ClSelectItem[]> = new EventEmitter<
    ClSelectItem[]
  >();
  messageType: ClMessageType = 'error';
  inputValue: string = '';
  focused: boolean = false;
  errorMessage: string = '';
  items: ClSelectItem[] = [];

  constructor(private _elRef: ElementRef) {}

  onChange: any = () => {};

  onTouch: any = () => {};

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this.disabled) {
      if (this.focused && !this._elRef.nativeElement.contains(event.target)) {
        this.onChange(this.items);
      }

      // click outside of component
      this.focused = this._elRef.nativeElement.contains(event.target);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.errorMessage = '';
    if (event.key == 'Enter' && this.inputValue) {
      if (this.maxLength ? this.items?.length < this.maxLength : true) {
        this.addItem();
      } else {
        this.errorMessage = ` حداکثر${this.maxLength} مورد مجاز است. `;
      }
    } else if (event.key == 'Backspace' && !this.inputValue) {
      this.removeItem(this.items?.length - 1);
    }
  }

  addItem() {
    this.errorMessage = '';
    if (
      !this.allowDuplicate &&
      this.items?.find((x) => x.value == this.inputValue)
    ) {
      this.errorMessage = 'مورد تکراری مجاز نمی باشد.';
      return;
    }
    this.items.push({ label: this.inputValue, value: this.inputValue });
    this.inputValue = '';
    this.onChange(this.items);
    this.onAdd.emit(this.items);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.items = [...this.items];
    this.onChange(this.items);
    this.onRemove.emit(this.items);
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: ClSelectItem[]) {
    if (value && !Array.isArray(value)) {
      throw Error('The bound value must be an array');
    }
    this.items = value?.length ? value : [];
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // When the element is touched, this method will get called
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
