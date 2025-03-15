import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClSelectButtonOption } from '@sadad/component-lib/src/models';

@Component({
  selector: 'cl-select-button',
  standalone: true,
  templateUrl: 'select-button.component.html',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClSelectButtonComponent),
      multi: true,
    },
  ],
})
export class ClSelectButtonComponent implements OnInit, ControlValueAccessor {
  @Input() options!: ClSelectButtonOption[];
  @Input() separate = false;
  @Input() gap = '1rem';
  @Input() renderHtml = false;
  @Input() disabled = false;
  @Output() onSelect = new EventEmitter<ClSelectButtonOption>();

  sanitizer = inject(DomSanitizer);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  handleClick(option: ClSelectButtonOption, index: number) {
    if (this.disabled) {
      return;
    }

    if (option.action) {
      option.action(option);
    }

    this.onSelect.emit(option);

    this.options = this.options.map((opt, i) => ({
      ...opt,
      selected: i === index,
    }));

    option.selected = true;

    this.onChange(option);
    this.onTouched();
  }

  ngOnInit() {
    this.options = this.options.map((option) => {
      let { content } = option;

      if (this.renderHtml) {
        content = this.sanitizer.bypassSecurityTrustHtml(
          option.content as string,
        );
      }

      return {
        ...option,
        content,
      };
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(entry: ClSelectButtonOption): void {
    const selectedOptIndex = this.options.findIndex(
      (opt) => entry?.value === opt?.value,
    );

    this.options = this.options.map((option, index) => ({
      ...option,
      selected: selectedOptIndex === index,
    }));
  }
}
