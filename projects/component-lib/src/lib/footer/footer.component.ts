import {Attribute, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";

@Component({
  selector: 'cl-footer',
  standalone: true,
  imports: [CommonModule, ClTemplateDirective],
  templateUrl: './footer.component.html'
})
export class ClFooterComponent {


  @Input() positionFixed: boolean = false;
  @Input() appVersion: string = '';
  @Input() copyRight: string = '';
  @Input() lastUpdate: string = '';


  @ContentChildren(ClTemplateDirective) columnsTemplate!: QueryList<ClTemplateDirective>;


  constructor(@Attribute('styleClasses') public styleClasses: string = '') {
  }

}
