import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClFormControlSchema, ClMessage} from "@sadad/component-lib/src/models";
import {Injectable} from "@angular/core";
import {ClValidatorService} from "./validator.service";

@Injectable()
export class ClFormService {
  form?: FormGroup;
  formSchema?: ClFormControlSchema[];
  errors?:ClMessage[];

  create(form: ClFormControlSchema[], formData: any) {
    this.formSchema = form;

    const group: any = {};

    form.forEach(control => {
      group[control.name] = new FormControl({
        value: formData && formData[control.name] !== undefined ? formData[control.name] : control.value,
        disabled: control.disabled
      } || null, control?.validators?.length ? control.validators.concat(control.required ? [Validators.required, ClValidatorService.noWhitespace] : []) : control.required ? [Validators.required,ClValidatorService.noWhitespace] : []);
    });
    this.form = new FormGroup(group);
    return this.form;
  }

  clear() {
    if (this.form) {
      this.formSchema?.forEach((field) => {
        const control = this.form!.controls[field.name];
        control.reset();
        control.setValue(field.value);
        control.updateValueAndValidity();
      });
    }
    this.errors = [];
    return this.form;
  };


  validate(): ClMessage[] | undefined {
    let validatorsError: ClMessage[] = [];
    if (this.form && this.formSchema) {
      this.formSchema.forEach((formControl: ClFormControlSchema) => {
        if (this.form && formControl.validatorsError && this.form.controls[formControl.name] && this.form.controls[formControl.name].errors) {
          Object.keys(this.form.controls[formControl.name].errors || {}).forEach(err => {
            formControl.validatorsError ? validatorsError.push({type:'error',detail:formControl.validatorsError[err],icon:'highlight_off',closeable:true}) : '';
          });
        }
      })
    }
    this.errors = validatorsError.filter((message, index, self) => message.detail && self.indexOf(message) === index);
    return this.errors;

  }

}
