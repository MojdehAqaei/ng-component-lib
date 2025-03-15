import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ClAction} from "@sadad/component-lib/src/models";
import {ClButtonType} from '@sadad/component-lib/src/enums';

@Component({
  selector: 'cl-split-button',
  standalone: true,
  imports: [CommonModule, ClButtonComponent],
  templateUrl: './split-button.component.html',
})
export class ClSplitButtonComponent implements AfterViewInit{


  @Input() icon?: string;
  @Input() label?: string = '';
  @Input() size?: 'sm' | 'lg';
  @Input() outlined: boolean = false;
  @Input() labelClickable: boolean = false;
  @Input() actions: ClAction[] = [];
  @Input() styleClasses: string = '';
  @Input() type?: ClButtonType;
  @Output() onClick = new EventEmitter<any>();
  showPanel: boolean = false;
  panel: any;
  offset = 10;
  toggleButtonRef:any;

  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {
  }


  @HostListener('document:click', ['$event'])
  documentOnClick(event: any) {
    if (!this.panel?.contains(event.target) && !this.toggleButtonRef.contains(event.target)) {
      this.showPanel = false;
    }

  }

  ngAfterViewInit() {
    this.toggleButtonRef = this._elRef.nativeElement.querySelector('.cl-split-button-menu-button');
  }

  setPosition(target: any) {
    if (!this.showPanel) {
      this.panel = this._elRef.nativeElement.querySelector('.cl-split-button-panel');
      const hostPos = this._elRef.nativeElement.querySelector('.cl-split-button-buttons')?.getBoundingClientRect();
      const panelPos = this.panel.getBoundingClientRect();

      if ((hostPos.bottom + panelPos.height + this.offset) > (window.innerHeight || document.documentElement.clientHeight)) {
        this._renderer.setStyle(this.panel, 'top', `-${panelPos.height+this.offset}px`);
      } else {
        this._renderer.setStyle(this.panel, 'top', `${hostPos.height  + this.offset}px`);
      }

      let left = hostPos.width >  panelPos.width ? (hostPos.width - panelPos.width) / 2 :  (panelPos.width - hostPos.width) / 2;
      this._renderer.setStyle(this.panel, 'left' ,`${left < 0 ? 0 : -left}px`);

      if(this.panel.getBoundingClientRect().left < 0) {
        this._renderer.setStyle(this.panel, 'left' ,'0');
      }
      else if((this.panel.getBoundingClientRect().right) > (window.innerWidth || document.documentElement.clientWidth)) {
        this._renderer.setStyle(this.panel, 'right' ,'0');
        this._renderer.setStyle(this.panel, 'left' ,'auto');
      }
      this.showPanel = true;
    } else {
      this.showPanel = false;
    }
  }

  get buttonClasses() {
    return `cl-split-button-default-button ${this.labelClickable ? 'cl-split-button-default-button-clickable' : ''}`
  }

  get toggleButtonClasses() {
    return `cl-split-button-menu-button  ${this.outlined ? ' outlined' : ''}`
  }
  getActionClasses(action:ClAction){
    return `${action.styleClasses ? action.styleClasses:''} ${action.disabled?'cl-disabled':''}`
  }

  click(item?: any) {
    if (!item?.loading) {
      this.showPanel = false;
      if (item && item?.command) {
        item.command(item);
      }
      this.onClick.emit(item);
    }
  }

  compareActions(item: any){
    return item;
  }
}
