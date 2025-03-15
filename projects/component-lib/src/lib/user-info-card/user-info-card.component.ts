import {Attribute, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ClSkeletonDirective} from "@sadad/component-lib/src/lib/skeleton";

@Component({
  selector: 'cl-user-info-card',
  standalone: true,
  imports: [CommonModule , ClButtonComponent,ClSkeletonDirective],
  templateUrl: './user-info-card.component.html',
})
export class ClUserInfoCardComponent {


  @Input() firstName: string ='';
  @Input() lastName: string ='';
  @Input() nationalCode: string='';
  @Input() organizationUnit: string='';
  @Input() role: string='';
  @Input() loading: boolean = false;
  @Input() showLogout: boolean = false;

  @Output() onLogout = new EventEmitter<any>();

  constructor(@Attribute('styleClasses') public styleClasses: string = '') {
  }

}
