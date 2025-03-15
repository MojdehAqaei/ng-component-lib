import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ApplicationRef,
    Component,
    ComponentRef, createComponent,
    ElementRef,
    EnvironmentInjector,
    HostListener,
    inject, Injectable, Injector,
    OnInit,
    Renderer2,
    Type,
    ViewChild
} from "@angular/core";
import { ClDynamicDialogOptions } from '@sadad/component-lib/src/models';
import { ClDialogRef, DIALOG_DATA } from './dynamic-dialog-ref.service';

const INITIAL_VALUE: ClDynamicDialogOptions = {
    closeable: true,
    dismissible: false,
    width: '50vw',
    hideTransitionOptions: 200,
  };

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cl-dialog-mask">
    <div class="cl-dialog" [ngClass]="classes" [ngStyle]="{'width':options?.width}" #dialog>
      <div class="cl-dialog-header"  *ngIf=" options?.header || options?.closeable">
        <span class="cl-dialog-title">{{options?.header}}</span>
        <span class="cl-dialog-header-maximize-icon pi pi-window-minimize" *ngIf="options?.resizeable" [ngClass]="{'pi-window-minimize': fullPage,'pi-window-maximize': !fullPage}" (click)="goFullPage()"></span>
        <div class="cl-dialog-header-icon pi pi-times" *ngIf="options?.closeable" (click)="close()"></div>
      </div>
      <div class="cl-dialog-content">
        <ng-content></ng-content>
      </div>
    </div>
</div>

  `,
})
export class ClDynamicDialogComponent implements OnInit, AfterViewInit {
    dialogRefService!: ClDialogRef;
    _renderer = inject(Renderer2);
    @ViewChild('dialog') dialogRef!:ElementRef<HTMLDivElement>;
    @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
    options?: ClDynamicDialogOptions = INITIAL_VALUE;
    fullPage = false;
    offset = 15;
    lastPosition: any;

    @HostListener('document:keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        this.dialogRefService.close();
      }
    }

    ngOnInit() {
        for (let property in INITIAL_VALUE) {
            if (!(this.options as any)[property]) {
              (this.options as any)[property] = (INITIAL_VALUE as any)[property]
            }
          }
    }

    ngAfterViewInit() {
        this.show();
    }


    private show(host?: any) {
            host?.stopPropagation();
            const dialog = document.querySelector('.cl-dialog');
            if (dialog) {
              let top, left;
              const panelPos = dialog.getBoundingClientRect();
              const windowWidth = window.innerWidth || document.documentElement.clientWidth;
              const windowHeight = window.innerHeight || document.documentElement.clientHeight;
              if (this.options?.position) {
                const hostPos = host ? host.target.getBoundingClientRect() : null;

                if (this.options?.position === 'top') {
                  top = host ? hostPos.top - panelPos.height - this.offset : this.offset;
                  left = host ? hostPos.left + (hostPos.width - panelPos.width) / 2 : (windowWidth - panelPos.width - this.offset) / 2;
                } else if (this.options?.position === 'bottom') {
                  top = host ? hostPos.bottom + this.offset : windowHeight - panelPos.height - this.offset;
                  left = host ? hostPos.left + (hostPos.width - panelPos.width) / 2 : (windowWidth - panelPos.width - this.offset) / 2;
                } else if (this.options?.position === 'left') {
                  top = host ? hostPos.top + (hostPos.height - panelPos.height) / 2 : (windowHeight - panelPos.height - this.offset) / 2;
                  left = host ? hostPos.left - panelPos.width - this.offset : this.offset;
                } else if (this.options?.position === 'right') {
                  top = host ? hostPos.top + (hostPos.height - panelPos.height) / 2 : (windowHeight - panelPos.height - this.offset) / 2;
                  left = host ? hostPos.right + this.offset : windowWidth - panelPos.width - this.offset;
                } else if (this.options?.position === 'bottomLeft') {
                  top = windowHeight - panelPos.height - this.offset;
                  left = this.offset;
                } else if (this.options?.position === 'bottomRight') {
                  top = windowHeight - panelPos.height - this.offset;
                  left = windowWidth - panelPos.width - this.offset;
                } else if (this.options?.position === 'topLeft') {
                  top = this.offset;
                  left = this.offset;
                } else if (this.options?.position === 'topRight') {
                  top = this.offset;
                  left = windowWidth - panelPos.width - this.offset;
                }

                //change position if tooltip  is outside the window
                left = left < 0 ? this.offset : (panelPos.width + left) > windowWidth ? windowWidth - panelPos.width - this.offset : left;
                top = top < 0 ? this.offset : (panelPos.height + top) > windowHeight ? windowHeight - panelPos.height - this.offset : top;

                this._renderer.addClass(dialog, `cl-dialog-${this.options?.position}`);
              }

              this._renderer.setStyle(dialog, '-webkit-transition', `opacity ${this.options?.hideTransitionOptions}ms`);
              this._renderer.setStyle(dialog, '-moz-transition', `opacity ${this.options?.hideTransitionOptions}ms`);
              this._renderer.setStyle(dialog, '-o-transition', `opacity ${this.options?.hideTransitionOptions}ms`);
              this._renderer.setStyle(dialog, 'transition', `opacity ${this.options?.hideTransitionOptions}ms`);
              this._renderer.setStyle(dialog, 'top', this.options?.position ? `${top}px` : `${(windowHeight - panelPos.height - this.offset) / 2}px`);
              this._renderer.setStyle(dialog, 'left', this.options?.position ? `${left}px` : `${(windowWidth - panelPos.width - this.offset) / 2}px`);

            }
    }

    goFullPage() {
        const dialog = document.querySelector('.cl-dialog');
        this.lastPosition = !this.fullPage ? dialog?.getBoundingClientRect() : this.lastPosition;
        this.fullPage = !this.fullPage;
        if (!this.fullPage) {
          this._renderer.setStyle(dialog, 'top', `${this.lastPosition.top}px`);
          this._renderer.setStyle(dialog, 'left', `${this.lastPosition.left}px`);
        }
      }

    onOverlayClick() {
        if (this.options?.dismissible) {
            this.close();
        }
    }

    close() {
        this.dialogRefService.close();
    }

    get classes() {
        return `${this.options?.styleClasses ? this.options?.styleClasses : ''}
               ${this.fullPage ? 'cl-dialog-maximized ' : ''}`;
      }
}


@Injectable()
export class ClDynamicDialogService {
    private dialogInstances: ComponentRef<ClDynamicDialogComponent>[] = [];

    appRef = inject(ApplicationRef);
    injector = inject(Injector);
    environmentInjector = inject(EnvironmentInjector);

    open<C extends object, T = any, R = any>(
        componentToCreate: Type<C>,
        options?: ClDynamicDialogOptions<T>
    ): ClDialogRef<T, R> {
        const dialogRef = new ClDialogRef<T, R>(options?.data || {} as T);

        const customInjector = Injector.create({
            providers: [
                { provide: ClDialogRef, useValue: dialogRef },
                { provide: DIALOG_DATA, useValue: options?.data || {} },
            ],
            parent: this.injector,
        });

        const targetComponent = createComponent<C>(componentToCreate, {
            environmentInjector: this.environmentInjector,
            elementInjector: customInjector,
        });

        (targetComponent.instance as any).dialogRef = dialogRef;

        const dialogComponent = createComponent(ClDynamicDialogComponent, {
            environmentInjector: this.environmentInjector,
            projectableNodes: [[targetComponent.location.nativeElement]],
        });

        dialogComponent.instance.options = options;
        dialogComponent.instance.dialogRefService = dialogRef;

        document.body.appendChild(dialogComponent.location.nativeElement);
        this.appRef.attachView(targetComponent.hostView);
        this.appRef.attachView(dialogComponent.hostView);

        this.dialogInstances.push(dialogComponent);

        dialogRef.onClose.subscribe(() => {
            this.dialogInstances.pop()?.destroy();
            targetComponent.destroy();
        });

        return dialogRef;
    }

    closeAll() {
        while (this.dialogInstances.length) {
            const dialogInstance = this.dialogInstances.pop();
            dialogInstance?.destroy();
        }
    }
}
