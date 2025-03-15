import {
  Attribute,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClMenuItem} from '@sadad/component-lib/src/models';
import {deepCopy} from '@angular-devkit/core/src/utils/object';

@Component({
  selector: 'cl-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html'
})
export class ClContextMenuComponent implements OnChanges {
  @Input() list: ClMenuItem[] = [];
  @Input() appendTo: ElementRef | any;
  @Input() isRtl: boolean = false;

  @ViewChild('menu') menu!: ElementRef<any>;

  show: boolean = false;
  contextX: number = 0;
  contextY: number = 0;
  menuItems: ClMenuItem[] = [];


  constructor(private _elRef: ElementRef<HTMLElement>,
              @Attribute("styleClasses") public styleClasses: string = '') {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'])
      this.menuItems = deepCopy(this.list);
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: any) {
    this.show = false;

    if (this.appendTo) {
      event.preventDefault();
      this.menuItems = deepCopy(this.list);
      this.show = true;
      this.setPosition(event);
    }
  }

  setPosition(event: any) {
    const menuWidth = this.menu.nativeElement.offsetWidth;
    const menuHeight = this.menu.nativeElement.offsetHeight;

    this.contextX = this.isRtl ? event.pageX - menuWidth : event.pageX;
    this.contextY = event.pageY > window.innerHeight / 2 ? event.pageY - menuHeight : event.pageY;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this._elRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  onToggleItem(item: ClMenuItem) {
    item.expanded = !item.expanded;
  }

  onItemClick(item: ClMenuItem) {
    this.show = Boolean(item.items);
    if (item.command) {
      item.command(item);
    }
  }


}
