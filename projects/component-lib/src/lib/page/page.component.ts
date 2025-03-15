import {Component, EventEmitter, Input, Output, OnInit, Attribute} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Event} from "@angular/router";
import {ClLinkComponent} from '@sadad/component-lib/src/lib/link';
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClButtonType} from "@sadad/component-lib/src/enums";

const INITIAL_VALUE: { [key: string]: any } = {
  type: 'empty',
};

@Component({
  selector: 'cl-page',
  standalone: true,
  imports: [CommonModule, ClLinkComponent],
  templateUrl: './page.component.html',
})
export class ClPageComponent implements OnInit {
  @Input() type: 'error' | 'not found' | 'access denied' | 'loading' | 'empty' = 'empty';
  @Output() onClick = new EventEmitter<Event>();

  private _icon: string = '';
  private _header: string = '';
  private _subHeader: string = '';
  private _linkType: ClButtonType = 'default';

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit(): void {

    if (this.type) {
      switch (this.type) {
        case 'empty':
          this._icon = 'check_box_outline_blank';
          this._header = 'صفحه خالی';
          this._subHeader = 'در حال حاضر محتوایی در صفحه مورد نظر وجود ندارد';
          this._linkType = 'default';
          break;
        case 'error':
          this._icon = 'error';
          this._header = 'صفحه با خطا مواجه شد';
          this._subHeader = 'لطفا بعدا اقدام فرمایید';
          this._linkType = 'danger';
          break;
        case 'not found':
          this._icon = 'cancel';
          this._header = 'صفحه یافت نشد';
          this._subHeader = 'از صحت آدرس صفحه مورد نظر اطمینان حاصل کنید';
          this._linkType = 'info';
          break;
        case 'access denied':
          this._icon = 'block';
          this._header = 'صفحه غیر قابل دسترسی';
          this._subHeader = 'مجوزهای لازم جهت دسترسی را ندارید';
          this._linkType = 'warning';
          break;
        case 'loading':
          this._icon = 'autorenew';
          this._header = 'صفحه در حال بارگذاری است';
          this._subHeader = 'کمی صبر کنید';
          this._linkType = 'secondary';
          break;
      }
    }
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);

  }

  get classes(): string {
    return `
            ${this.type == 'error' ? 'cl-page-error' : ''}
            ${this.type == 'not found' ? 'cl-page-notfound' : ''}
            ${this.type == 'access denied' ? 'cl-page-denied' : ''}
            ${this.type == 'loading' ? 'cl-page-loading' : ''}
            ${this.type == 'empty' ? 'cl-page-empty' : ''}
            ${this.styleClasses}
    `;
  }


  get icon(): string {
    return this._icon;
  }

  get header(): string {
    return this._header;
  }

  get subHeader(): string {
    return this._subHeader;
  }

  get linkType(): ClButtonType {
    return this._linkType;
  }
}
