import {
  AfterViewInit,
  Attribute, ChangeDetectorRef,
  Component, ContentChildren,
  ElementRef, EventEmitter, HostListener,
  Input, OnChanges, OnInit, Output, QueryList,
  Renderer2, SimpleChanges, TemplateRef, ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";

const INITIAL_VALUE: { [key: string]: any } = {
  closeable: true,
  baseZIndex: 1000,
  width: '50vw',
  hideTransitionOptions: 200,
};

@Component({
  selector: 'cl-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'dialog.component.html'
})
export class ClDialogComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() dismissible: boolean = false;
  @Input() closeable: boolean = true;
  @Input() resizeable: boolean = false;
  @Input() baseZIndex: number = 1000;
  @Input() width: string = '50vw';
  @Input() minHeight?: number;
  @Input() header: string = '';
  @Input() visible: boolean = false;
  @Input() hideTransitionOptions: number = 200;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();
  headerTemplateRef?: TemplateRef<any>;
  footerTemplateRef?: TemplateRef<any>;
  lastPosition: any;
  fullPage = false;
  offset = 15;
  @ContentChildren(ClTemplateDirective) templates!: QueryList<ClTemplateDirective>;
  @ViewChild('dialog')  dialogRef?:ElementRef<any>;

  constructor(private _cdRef: ChangeDetectorRef,
              private _renderer: Renderer2,
              @Attribute('styleClasses') public styleClasses: string = '',
              @Attribute('position') public position: 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight' | 'top' | 'bottom' | 'left' | 'right') {
  }

  ngOnInit() {
    for (let property in this) {
      if (this[property] == undefined || this[property] == null) {
        this[property] = INITIAL_VALUE[property];
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue) {
      this.show();
    } else if (changes['visible']?.currentValue == false) {
      this.hide();
    }
  }

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach(templateDir => {
        if (templateDir.template) {
          if (templateDir.name == 'header') {
            this.headerTemplateRef = templateDir.template;
          } else if (templateDir.name == 'footer') {
            this.footerTemplateRef = templateDir.template;
          }
        }
      })
    }
  }


  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: any) {
    if (this.visible && this.dismissible && this.dialogRef && event.key === 'Escape') {
      this.hide();
    }
    return true
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (this.visible && this.dismissible && this.dialogRef && !this.dialogRef.nativeElement.contains(event.target)) {
      this.hide();
    }
    return true
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

  show(host?: any) {
    if (!this.visible) {
      host?.stopPropagation();

      this.visible = true;
      this.visibleChange.emit(this.visible);
      this.onShow.emit();
      this._cdRef.detectChanges();
      const dialog = document.querySelector('.cl-dialog');
      if (dialog) {
        let top, left;
        const panelPos = dialog.getBoundingClientRect();
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (this.position) {
          const hostPos = host ? host.target.getBoundingClientRect() : null;

          if (this.position === 'top') {
            top = host ? hostPos.top - panelPos.height - this.offset : this.offset;
            left = host ? hostPos.left + (hostPos.width - panelPos.width) / 2 : (windowWidth - panelPos.width - this.offset) / 2;
          } else if (this.position === 'bottom') {
            top = host ? hostPos.bottom + this.offset : windowHeight - panelPos.height - this.offset;
            left = host ? hostPos.left + (hostPos.width - panelPos.width) / 2 : (windowWidth - panelPos.width - this.offset) / 2;
          } else if (this.position === 'left') {
            top = host ? hostPos.top + (hostPos.height - panelPos.height) / 2 : (windowHeight - panelPos.height - this.offset) / 2;
            left = host ? hostPos.left - panelPos.width - this.offset : this.offset;
          } else if (this.position === 'right') {
            top = host ? hostPos.top + (hostPos.height - panelPos.height) / 2 : (windowHeight - panelPos.height - this.offset) / 2;
            left = host ? hostPos.right + this.offset : windowWidth - panelPos.width - this.offset;
          } else if (this.position === 'bottomLeft') {
            top = windowHeight - panelPos.height - this.offset;
            left = this.offset;
          } else if (this.position === 'bottomRight') {
            top = windowHeight - panelPos.height - this.offset;
            left = windowWidth - panelPos.width - this.offset;
          } else if (this.position === 'topLeft') {
            top = this.offset;
            left = this.offset;
          } else if (this.position === 'topRight') {
            top = this.offset;
            left = windowWidth - panelPos.width - this.offset;
          }

          //change position if tooltip  is outside the window
          left = left < 0 ? this.offset : (panelPos.width + left) > windowWidth ? windowWidth - panelPos.width - this.offset : left;
          top = top < 0 ? this.offset : (panelPos.height + top) > windowHeight ? windowHeight - panelPos.height - this.offset : top;

          this._renderer.addClass(dialog, `cl-dialog-${this.position}`);
        }

        this._renderer.setStyle(dialog, '-webkit-transition', `opacity ${this.hideTransitionOptions}ms`);
        this._renderer.setStyle(dialog, '-moz-transition', `opacity ${this.hideTransitionOptions}ms`);
        this._renderer.setStyle(dialog, '-o-transition', `opacity ${this.hideTransitionOptions}ms`);
        this._renderer.setStyle(dialog, 'transition', `opacity ${this.hideTransitionOptions}ms`);
        this._renderer.setStyle(dialog, 'top', this.position ? `${top}px` : `${(windowHeight - panelPos.height - this.offset) / 2}px`);
        this._renderer.setStyle(dialog, 'left', this.position ? `${left}px` : `${(windowWidth - panelPos.width - this.offset) / 2}px`);

        this._cdRef.detectChanges();
      }
    }
  }


  hide() {
    window.setTimeout(() => {
      this.visible = false;
      this.visibleChange.emit(false);
      this.onHide.emit();
    }, this.hideTransitionOptions);
  }

  get classes() {
    return `${this.styleClasses ? this.styleClasses : ''}
           ${this.visible ? 'cl-dialog-visible' : ''}
           ${this.fullPage && this.visible ? 'cl-dialog-maximized ' : ''}`;
  }

}
