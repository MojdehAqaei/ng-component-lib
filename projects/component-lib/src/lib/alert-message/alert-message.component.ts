import {Component, Input, Output, EventEmitter, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClMessage} from "@sadad/component-lib/src/models";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'cl-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
})
export class ClAlertMessagesComponent implements OnInit {
  @Input() messages: ClMessage[] = [];
  @Input() styleClasses?: string;
  @Output() onHide = new EventEmitter();
  hideTransition = 500;

  sanitizer = inject(DomSanitizer);

  sanitizeHtml(content: string | undefined) {
    return content ? this.sanitizer.bypassSecurityTrustHtml(content) : '';
  }

  ngOnInit() {
    this.messages = this.messages.map(message => (
      {
        ...message,
        detail: this.sanitizeHtml(message.detail as string),
        summary: this.sanitizeHtml(message.summary as string)
      }
      )
    )
  }

  onHideMessage(index: number, messageEl: HTMLElement) {
    messageEl.style.transition = `opacity ${this.hideTransition}ms`;
    messageEl.style.opacity = '0';
    setTimeout(() => {
      this.messages.splice(index, 1);
      this.onHide.emit(this.messages[index]);
    }, this.hideTransition);
  }


}
