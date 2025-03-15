import {
  Component,
  Input,
  ElementRef,
  Attribute,
  Output,
  EventEmitter,
  HostListener, OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClMenuItem} from '@sadad/component-lib/src/models';
import {RouterModule} from "@angular/router";
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClImageComponent} from "@sadad/component-lib/src/lib/image";

const INITIAL_VALUE: { [key: string]: any } = {
  showIconsOnClose: true
};

@Component({
  selector: 'cl-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ClImageComponent],
  templateUrl: './side-menu.component.html',
})
export class ClSideMenuComponent implements OnInit {
  @Input() multipleExpanded: boolean = false;
  @Input() showIconsOnClose: boolean = true;
  @Input() openOnHover: boolean = false;
  @Input() openMenu: boolean = false;
  @Input() menu: ClMenuItem[] | undefined = [];
  @Input() logoSrc?: string;

  @Output() openMenuChange = new EventEmitter<boolean>();
  @Output() onClick = new EventEmitter<ClMenuItem>();


  constructor(private _sharedService: ClSharedService,
              private _elRef: ElementRef,
              @Attribute("position") public position: 'fixed' | 'static' = 'fixed',
              @Attribute("styleClasses") public styleClasses: string = '') {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  @HostListener('document:click', ['$event'])
  docClick(event: any) {
    if (this.openMenu && !this._elRef.nativeElement.contains(event.target)) {
      this.openCloseMenu(false);

    }
  }

  openCloseMenu(open: boolean) {
    this.openMenu = open;
    this.openMenuChange.emit(this.openMenu);
  }

  showMenuOnHover() {
    if (!this.openMenu && this.openOnHover) {
      this.openCloseMenu(true);
    }
  }

  onItemClick(items: ClMenuItem[], item: ClMenuItem) {
    if (!item?.items?.length) {
      if (!(!this.openMenu && this.showIconsOnClose)) {
        this.openCloseMenu(!this.openMenu);
      }
      item?.command ? item?.command(item) : '';
      this.onClick.emit(item);
    } else {
      if (!this.openMenu && this.showIconsOnClose) {
        this.openCloseMenu(!this.openMenu);
      } else {
        this.toggleItem(items, item);
      }
    }

  }

  collapseAll(items?: ClMenuItem[]) {
    items?.forEach(item => {
      item['expanded'] = false;
      if (item?.items?.length) {
        this.collapseAll(item?.items);
      }
    })
  }

  toggleItem(items: ClMenuItem[], item: ClMenuItem) {
    const lastState = item.expanded;
    if (!this.multipleExpanded) {
      this.collapseAll(items);
    }
    item.expanded = !lastState;
  }

  get classes() {
    return `${this.styleClasses} ${this.showIconsOnClose && !this.openMenu ? 'only-icon ' : ''} ${this.position || 'fixed'}`
  }

}
