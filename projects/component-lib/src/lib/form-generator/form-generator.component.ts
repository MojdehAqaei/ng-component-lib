import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { ClFormService } from '@sadad/component-lib/src/services';
import { ClInputTextComponent } from '@sadad/component-lib/src/lib/input-text';
import { ClInputMaskComponent } from '@sadad/component-lib/src/lib/input-mask';
import { ClInputNumberComponent } from '@sadad/component-lib/src/lib/input-number';
import { ClInputSwitchComponent } from '@sadad/component-lib/src/lib/input-switch';
import { ClInputGroupComponent } from '@sadad/component-lib/src/lib/input-group';
import { ClCheckboxComponent } from '@sadad/component-lib/src/lib/checkbox';
import { ClRadioButtonComponent } from '@sadad/component-lib/src/lib/radio-button';
import { ClSelectComponent } from '@sadad/component-lib/src/lib/select';
import { ClTextAreaComponent } from '@sadad/component-lib/src/lib/text-area';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { ClFormMessageDirective } from '@sadad/component-lib/src/lib/form-message';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { ClFileUploadComponent } from '@sadad/component-lib/src/lib/file-uploader';
import { ClValidatorErrorsDirective } from '@sadad/component-lib/src/lib/validator-errors';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClSelectButtonComponent } from '@sadad/component-lib/src/lib/select-button';

@Component({
  selector: 'cl-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClInputTextComponent,
    ClInputMaskComponent,
    ClInputNumberComponent,
    ClInputSwitchComponent,
    ClInputGroupComponent,
    ClCheckboxComponent,
    ClRadioButtonComponent,
    ClTextAreaComponent,
    ClSelectComponent,
    ClDatePickerComponent,
    ClChipsComponent,
    ClFormMessageDirective,
    ClButtonComponent,
    ClValidatorErrorsDirective,
    ClAlertMessagesComponent,
    ClFileUploadComponent,
    ClKeyFilterDirective,
    ClSelectButtonComponent,
  ],
  templateUrl: './form-generator.component.html',
  providers: [ClFormService],
})
export class ClFormGeneratorComponent implements OnChanges {
  @Input() formSchema!: ClFormControlSchema[];
  @Input() styleClasses: string = '';
  @Input() lazyValidation = false;
  @Input() submitted: boolean = false;
  @Input() formData: any;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild('formElement') formElement?: ElementRef<any>;

  constructor(public svc: ClFormService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] || changes['formSchema']) {
      this.svc.create(
        this.formSchema.sort((a, b) => a.order - b.order),
        this.formData,
      );
      this.onChange.emit(this.svc);
      this.formValueChanges();
    }
    if (
      changes['submitted'] &&
      changes['submitted'].currentValue &&
      this.formElement &&
      this.svc.errors?.length
    ) {
      window.scrollTo({
        top: this.formElement.nativeElement.offsetTop - 100,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  formValueChanges() {
    this.svc.form?.valueChanges.subscribe(() => {
      this.onChange.emit(this.svc);
    });
  }
}
