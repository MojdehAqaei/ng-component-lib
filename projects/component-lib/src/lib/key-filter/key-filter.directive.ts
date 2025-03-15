import {Directive, HostListener, Input} from '@angular/core';
import {ClRegexStr, ClRegexStrType} from "@sadad/component-lib/src/enums";

@Directive({
  selector: '[clKeyFilter]',
  standalone: true
})
export class ClKeyFilterDirective {

  @Input('clKeyFilter') regexStr?: ClRegexStrType;

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    return  this.regexStr ? new RegExp(ClRegexStr[this.regexStr]).test(event.key) : true;
  }

}
