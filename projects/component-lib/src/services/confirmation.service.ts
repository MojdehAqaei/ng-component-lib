import {
  ApplicationRef, ComponentRef, EmbeddedViewRef,
  Injectable, Injector, Renderer2, RendererFactory2, ViewContainerRef
} from '@angular/core';
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ClButtonTypes} from "@sadad/component-lib/src/enums";
import {ClConfirmation} from "@sadad/component-lib/src/models";



@Injectable({
  providedIn: 'root'
})
export class ClConfirmationService {

  renderer: Renderer2;
  rejectBtnRef: ComponentRef<ClButtonComponent> | undefined;
  acceptBtnRef: ComponentRef<ClButtonComponent> | undefined;
  viewContainerRef: ViewContainerRef | undefined;

  constructor(
    private _appRef: ApplicationRef,
    private _injector: Injector,
    private _rendererFactory: RendererFactory2) {
    // Get an instance of Angular Renderer2
    this.renderer = this._rendererFactory.createRenderer(null, null);

  }


  confirm(viewRef: ViewContainerRef, confirmation: ClConfirmation) {
    this.viewContainerRef = viewRef;
    const temp = { acceptVisible: true , rejectVisible: true , acceptLabel: 'بله' , rejectLabel: 'خیر' , closable: true , baseZIndex: 1101,...confirmation };
    this.renderer.appendChild(document.body, this.generateTemplate(temp));
  }

  generateTemplate(confirmation: ClConfirmation) {
    const dialogMask = this.renderer.createElement('div');
    this.renderer.setProperty(dialogMask, 'id', 'cl-dialog-mask');
    dialogMask.className += 'cl-dialog-mask';
    this.renderer.setStyle(dialogMask ,'z-index' , confirmation.baseZIndex);

    const dialog = this.renderer.createElement('div');
    dialog.className += 'cl-dialog cl-confirm-dialog cl-component';
    this.renderer.setStyle(dialog ,'z-index' , confirmation.baseZIndex ? confirmation.baseZIndex + 1 : 'auto');


    if (confirmation.closable) {

      const closeBtn = this.renderer.createElement('button');
      closeBtn.className += 'cl-dialog-icon-close';
      closeBtn.addEventListener('click', () => {
        this.close();
      });

      const closeIcon = this.renderer.createElement('span');
      closeIcon.className += 'pi pi-times';


      this.renderer.appendChild(closeBtn, closeIcon);
      this.renderer.appendChild(dialog, closeBtn);

    }



    //header
    const dialogHeader = this.renderer.createElement('div');
    dialogHeader.className += 'cl-dialog-header';

    if (confirmation.header) {
      const dialogTitle = this.renderer.createElement('span');
      dialogTitle.className += 'cl-dialog-title';
      dialogTitle.innerHTML = confirmation.header;
      this.renderer.appendChild(dialogHeader, dialogTitle);
    }


    this.renderer.appendChild(dialog, dialogHeader);

    // content
    const dialogContent = this.renderer.createElement('div');
    dialogContent.className += 'cl-dialog-content';

    if (confirmation.icon) {
      const dialogIcon = this.renderer.createElement('i');
      dialogIcon.className += 'material-icons cl-confirm-dialog-icon ';
      dialogIcon.innerHTML = confirmation.icon;
      this.renderer.appendChild(dialogContent, dialogIcon);
    }

    const dialogMessage = this.renderer.createElement('span');
    dialogMessage.className += 'cl-confirm-dialog-message';
    dialogMessage.innerHTML = confirmation.message;
    this.renderer.appendChild(dialogContent, dialogMessage);

    this.renderer.appendChild(dialog, dialogContent);


    //footer
    const dialogFooter = this.renderer.createElement('div');
    dialogFooter.className += 'cl-dialog-footer';


    if (confirmation.rejectVisible) {
      this.rejectBtnRef = this.createComponent(ClButtonComponent, {
        label: confirmation.rejectLabel,
        icon: confirmation.rejectIcon,
        styleClasses: `cl-dialog-reject ${confirmation.rejectStyleClasses}`,
        type: ClButtonTypes.danger,
        size: 'sm',
      }) as ComponentRef<ClButtonComponent>;

      this.rejectBtnRef.instance.onClick.subscribe(() => {
        if (confirmation && confirmation.reject != undefined) {
          confirmation.reject();

        }
        this.close();
      });
      this.attachComponent(this.rejectBtnRef, dialogFooter)
    }
    if (confirmation && confirmation.acceptVisible) {
      this.acceptBtnRef = this.createComponent(ClButtonComponent, {
        label: confirmation.acceptLabel,
        icon: confirmation.acceptIcon,
        styleClasses: `cl-dialog-accept ${confirmation.acceptStyleClasses}`,
        type: ClButtonTypes.success,
        size: 'sm',
      }) as ComponentRef<ClButtonComponent>;

      this.acceptBtnRef.instance.onClick.subscribe(() => {
        if (confirmation && confirmation.accept != undefined) {
          confirmation.accept();
        }
        this.close();

      });

      this.attachComponent(this.acceptBtnRef, dialogFooter)

    }

    this.renderer.appendChild(dialog, dialogFooter);

    this.renderer.appendChild(dialogMask, dialog);

    return dialogMask;
  }

  createComponent(component: any, componentProps ?: object) {
    let componentRef;
    //  Create a component reference from the component
    if (this.viewContainerRef) {
      componentRef = this.viewContainerRef.createComponent(component, {injector: this._injector});
      if (componentProps && typeof componentRef.instance === 'object') {
        Object.assign(componentRef.instance as object, componentProps);
      }
    }
    return componentRef;
  }

  attachComponent(componentRef: ComponentRef<unknown>, appendTo: Element) {
    //  Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    appendTo.appendChild(domElem);
    return;
  }

  close() {
    const dialog: HTMLElement = document.getElementById('cl-dialog-mask') as HTMLElement;
    if (dialog) {
      this.renderer.removeChild(document.body, dialog);

      if (this.acceptBtnRef) {
        this._appRef.detachView(this.acceptBtnRef.hostView);
        this.acceptBtnRef.destroy();
      }
      if (this.rejectBtnRef) {
        this._appRef.detachView(this.rejectBtnRef.hostView);
        this.rejectBtnRef.destroy();
      }
    }

  }


}
