import {
  AfterViewInit,
  Attribute,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";

@Component({
  selector: 'cl-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  imports: [CommonModule]
})
export class ClDrawerComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() visible: boolean = false;
  @Input() width: string = '30vw';
  @Input() headerTitle?: string;
  @Input() headerIcon?: string;
  @Input() position: 'right' | 'left' = 'right';
  @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any | 'body';

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSlideEnd: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(@Attribute('styleClasses') public styleClasses: string = '',
              private _renderer: Renderer2,
              private _drawerRef: ElementRef,
              @Inject(DOCUMENT) private _document: Document) {
  }

  // @HostListener('document:click', ['$event'])
  // clickOut(event: Event) {
  //   if (!this._drawerRef?.nativeElement?.firstChild?.firstChild?.contains(event.target)) {
  //     this.visible = false;
  //     this.visibleChange.emit(this.visible);
  //     this.onSlideEnd.emit(event);
  //   }
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['visible']?.currentValue != changes['visible']?.previousValue) {
      this.visibleChange.emit(this.visible);
    }
  }

   ngAfterViewInit() {
     this.appendDrawer();
   }

  closeDrawer(event: Event) {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onSlideEnd.emit(event);
  }

  private isElement(obj: any) {
    return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }

  private appendChild(element: any, target: any) {
    if (this.isElement(target)) target.appendChild(element);
    else if (target && target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);
    else throw 'Cannot append ' + target + ' to ' + element;
  }

  private appendDrawer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        this._renderer.appendChild(this._document.body, this._drawerRef?.nativeElement);
      } else {
        this.appendChild(this._drawerRef?.nativeElement, this.appendTo);
      }
    }
  }

  private removeChild(element: any, target: any) {
    if (this.isElement(target)) target.removeChild(element);
    else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element);
    else throw 'Cannot remove ' + element + ' from ' + target;
  }

  private removeAppendedDrawer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        if (this._drawerRef) {
          this._renderer.removeChild(this._document.body, this._drawerRef?.nativeElement);
        }
      } else {
        this.removeChild(this._drawerRef?.nativeElement, this.appendTo);
      }
    }
  }

  ngOnDestroy() {
    this.removeAppendedDrawer();
  }
}
