import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  SimpleChanges,
  OnChanges,
  HostBinding,
  Attribute,
  OnInit
} from '@angular/core';
import {ClMessageType} from '@sadad/component-lib/src/enums'
import {ButtonTypeToColorMapper} from '@sadad/component-lib/src/mappers';
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  messageType: 'error',
};

@Directive({
  selector: '[clFormAlert]',
  standalone: true
})
export class ClFormMessageDirective implements OnInit, OnChanges {
  @Input() messageType?: ClMessageType = 'error';
  @Input() messageText?: string = '';
  @Input() messageShow?: boolean = false;

  @HostBinding(`class.cl-form-message-boarder-${'messageType'}`) get show() {
    return this.messageShow
  };


  messageElement!: HTMLElement | null;

  constructor(private _sharedService: ClSharedService,
              public eleRef: ElementRef,
              public renderer: Renderer2,
              @Attribute("styleClasses") public styleClasses: string = '') {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {

    const strClass = this.messageType ? ButtonTypeToColorMapper.get(this.messageType) : '';

    if (this.messageShow && this.messageType && this.messageText) {
      this.updateMessage(this.messageText);

      const beforeClass = ButtonTypeToColorMapper.get(changes['messageType']?.previousValue);
      if (beforeClass)
        this.renderer.removeClass(this.eleRef.nativeElement, beforeClass);

      if (strClass) {
        this.renderer.addClass(this.eleRef.nativeElement, strClass);
      }

    } else {
      if (strClass)
        this.renderer.removeClass(this.eleRef.nativeElement, strClass);

      if (this.messageElement)
        this.renderer.removeChild(this.eleRef.nativeElement, this.messageElement);
      this.messageElement = null;
    }

  }

  updateMessage(txt: string) {
    if (!this.messageElement) {
      this.createMessage(txt);
    } else {
      this.messageElement.textContent = txt;
    }
  }

  createMessage(txt: string) {
    this.messageElement = this.renderer.createElement("small");
    this.addClass(this.messageElement);
    this.messageElement ? this.messageElement.textContent = txt : '';
    if (this.eleRef.nativeElement.childNodes.length == 0) {
      this.eleRef.nativeElement.insertAdjacentElement("afterend", this.messageElement);
    } else {
      this.eleRef.nativeElement.appendChild(this.messageElement);
    }

    return this.messageElement;
  }


  addClass(element: HTMLElement | null) {
    element?.classList.add('cl-form-message', `cl-form-message-text-${this.messageType}`);
    if (this.styleClasses) {
      const customClasses = this.styleClasses.split(" ");
      element?.classList.add(...customClasses);
    }
  }

}
