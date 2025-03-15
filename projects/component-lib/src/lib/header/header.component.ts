import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClAvatarComponent } from '@sadad/component-lib/src/lib/avatar';
import { ClAction } from '@sadad/component-lib/src/models';
import { ClTooltipDirective } from '@sadad/component-lib/src/lib/tooltip';
import { ClImageComponent } from '@sadad/component-lib/src/lib/image';
import { ClSharedService } from '@sadad/component-lib/src/services';

const INITIAL_VALUE: { [key: string]: any } = {
  hasToggleMenu: true,
};

@Component({
  selector: 'cl-header',
  standalone: true,
  imports: [
    CommonModule,
    ClTooltipDirective,
    ClAvatarComponent,
    RouterLink,
    ClImageComponent,
  ],
  templateUrl: './header.component.html',
})
export class ClHeaderComponent implements OnInit {
  @Input() positionFixed: boolean = false;
  @Input() hasToggleMenu: boolean = true;
  @Input() icons?: ClAction[];
  @Input() menuIsOpen: boolean = false;
  @Input() appTitle?: string;
  @Input() logoSrc?: string;
  @Output() onToggleMenu = new EventEmitter<any>();
  @ContentChild('leftBar') leftBar: TemplateRef<any> | null = null;

  constructor(private _sharedService: ClSharedService) {}

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
    this.onToggleMenu.emit(this.menuIsOpen);
  }
}
