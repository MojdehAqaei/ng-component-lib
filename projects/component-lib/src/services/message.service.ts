import {Injectable, OnDestroy, Renderer2, RendererFactory2} from '@angular/core';
import {ClMessage} from "@sadad/component-lib/src/models";


@Injectable({
  providedIn: 'root'
})
export class ClMessageService implements OnDestroy {

  messagesPassedTime: number[] = [];
  container: HTMLElement;
  renderer: Renderer2;
  hideTransition = 500;

  constructor(private _rendererFactory: RendererFactory2) {
    // Get an instance of Angular Renderer2
    this.renderer = this._rendererFactory.createRenderer(null, null);
    this.container = this.renderer.createElement('div');
    this.container!.className += 'cl-toast-container';
  }

  add(message: ClMessage) {
    message.id = this.messagesPassedTime.length;
    this.messagesPassedTime.push(0);
    const messageEl = this.renderer.createElement('div');
    this.renderer.setStyle(messageEl, 'id', message.id);
    messageEl!.className += `cl-toast cl-toast-${message.type} ${message.styleClasses}`;
    messageEl!.style.transition = `opacity ${this.hideTransition}ms`;


    const messageIcon = this.renderer.createElement('span');
    messageIcon.className += 'material-icons cl-toast-icon';
    messageIcon.innerHTML = message.type == 'info' ? 'info' :
      message.type == 'error' ? 'cancel' :
        message.type == 'success' ? 'check_circle' :
          message.type == 'warning' ? 'warning' :
            message.type == 'help' ? 'help' : '';
    this.renderer.appendChild(messageEl, messageIcon);


    if (message.summary) {
      const messageSummary = this.renderer.createElement('span');
      messageSummary.innerHTML = message.summary;
      messageSummary.className += 'cl-toast-summary';
      this.renderer.appendChild(messageEl, messageSummary);
    }


    const messageDetail = this.renderer.createElement('span');
    messageDetail.className += 'cl-toast-detail';
    messageDetail.innerHTML = message.detail;
    this.renderer.appendChild(messageEl, messageDetail);


    if (message.closeable) {
      const closeBtn = this.renderer.createElement('button');
      closeBtn.className += 'cl-toast-close';
      closeBtn.addEventListener('click', () => {
        this.close(message, messageEl);
      });

      const closeIcon = this.renderer.createElement('i');
      closeIcon.className += 'material-icons';
      closeIcon.innerHTML = 'close';
      this.renderer.setStyle(closeIcon, 'font-size', '20px');

      this.renderer.appendChild(closeBtn, closeIcon);
      this.renderer.appendChild(messageEl, closeBtn);
    }


    if (message.lifeTime) {
      const progressEl = this.renderer.createElement('div');
      progressEl.className += `cl-toast-progress  cl-toast-progress-active cl-toast-progress-${message.type}`;
      this.renderer.appendChild(messageEl, progressEl);

      let progressTimeOut = this.startTimeOut(message, messageEl);
      let progressTimer = this.startTimer(message, messageEl,progressEl);

      messageEl.addEventListener('mouseover', () => {
        clearInterval(progressTimer);
        clearTimeout(progressTimeOut);
      });

      messageEl.addEventListener('mouseleave', () => {
        progressTimeOut = this.startTimeOut(message, messageEl);
        progressTimer = this.startTimer(message, messageEl, progressEl);
      });
    }

    this.renderer.appendChild(this.container, messageEl);
    this.renderer.appendChild(document.body, this.container);

  }

  startTimeOut(message:ClMessage, messageEl:HTMLElement){
   return setTimeout(() => {
      this.close(message, messageEl);
    }, (message.lifeTime! - this.messagesPassedTime[message.id!] ));
  }

  startTimer(message:ClMessage, messageEl:HTMLElement,progressEl:HTMLElement){
    let progressTimer = setInterval(() => {
      this.messagesPassedTime[message.id!] += 10;
      let progressPercent = 100 - (this.messagesPassedTime[message.id!] * (100 / message.lifeTime!));
      progressEl.style.width = `${progressPercent}%`;

      if (progressPercent <= 0) {
        this.close(message, messageEl);
      }
      if (this.messagesPassedTime[message.id!] >= message.lifeTime!) {
        clearInterval(progressTimer);
      }
    }, 10);

    return progressTimer;
  }

  close(message: ClMessage, messageEl: HTMLElement) {
    messageEl.style.opacity = '0';
    setTimeout(() => {
      if (messageEl && message.id != undefined) {
        this.messagesPassedTime.splice(message.id, 1);
        messageEl?.remove();
      }
    }, this.hideTransition);
  }

  ngOnDestroy() {
    this.renderer.removeChild(document.body, this.container);
    this.messagesPassedTime = [];
  }


}
