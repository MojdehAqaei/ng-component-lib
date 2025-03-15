import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  HostListener, OnDestroy, SimpleChanges
} from '@angular/core';
import {NgControl, ValidationErrors} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[clValidatorErrors]',
  standalone: true
})
export class ClValidatorErrorsDirective implements OnChanges, OnDestroy {
  @Input() showValidatorErrors: boolean = false;
  @Input() validationErrors?: any = {};

  statusChangeSubscription?: Subscription;
  errorElement!: HTMLElement | null;

  constructor(private _eleRef: ElementRef,
              private _renderer: Renderer2,
              private _control: NgControl) {

  }


  ngOnInit(): void {
    if (this._control && this._control.statusChanges) {
      this.statusChangeSubscription = this._control.statusChanges.subscribe(
        (status) => {
          if (this.showValidatorErrors) {
            if (status === 'INVALID') {
              this.createErrorElm();
            } else {
              this.removeErrorElm();
            }
          }
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showValidatorErrors']) {
      changes['showValidatorErrors']?.currentValue ? this.createErrorElm() : this.removeErrorElm();
    }
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    // This is needed to handle the case of clicking a required field and moving out
    if (this._control.errors && this.showValidatorErrors) {
      this.createErrorElm();
    } else {
      this.removeErrorElm();
    }
  }


  createErrorElm() {
    if (this._control.errors) {
      this.removeErrorElm();
      const valErrors: ValidationErrors = this._control.errors;
      this.errorElement = this._renderer.createElement("ul");
      this._renderer.addClass(this.errorElement ,"cl-validator-errors");
      Object.keys(valErrors).forEach(errorKey => {
        const errorMsg = this.getValidationMsg(errorKey);
        if (errorMsg){
          const li = this._renderer.createElement("li");
          li.innerHTML =errorMsg;
          this.errorElement?.appendChild(li);
        }
      });
      this._eleRef.nativeElement.parentElement.insertAdjacentElement('beforeend', this.errorElement);
      this._eleRef.nativeElement.classList.add('cl-invalid');
    }
  }

  getValidationMsg(errorKey: string) {
    let errorMsg = this.validationErrors ? this.validationErrors[errorKey]: undefined;
    if (!errorMsg) {
      switch (errorKey) {
        case 'whitespace':
        case 'required':
          errorMsg = 'این فیلد اجباری می باشد.';
          break;
        case 'minlength':
          errorMsg = `حداقل ${this._control.errors?.['minlength']?.requiredLength} کاراکتر مجاز است .`;
          break;
        case 'maxlength':
          errorMsg = `حداکثر ${this._control.errors?.['maxlength']?.requiredLength} کاراکتر مجاز است .`;
          break;
        case 'min':
          errorMsg = `حداقل مقدار مجاز ${this._control.errors?.['min']?.min} می باشد .`;
          break;
        case 'max':
          errorMsg = ` حداکثر مقدار مجاز ${this._control.errors?.['max']?.max} می باشد .`;
          break;
        case 'pattern':
          errorMsg = 'مقدار ورودی فرمت درستی ندارد.';
          break;
        default:
          break;
      }
    }
    return errorMsg;
  }

  removeErrorElm(): void {
    if (this.errorElement) {
      this.errorElement.remove();
      this._eleRef.nativeElement.classList.remove('cl-invalid');
    }
  }

  ngOnDestroy() {
    this.statusChangeSubscription?.unsubscribe();
  }


}
