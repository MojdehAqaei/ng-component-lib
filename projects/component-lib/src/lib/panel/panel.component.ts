import {Attribute, Component, ContentChild, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClPanelAction} from '@sadad/component-lib/src/models';
import {ClButtonComponent} from '@sadad/component-lib/src/lib/button';
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";

const INITIAL_VALUE: { [key: string]: any } = {
  hasHeader: true,
  hasFooter: true,
};

@Component({
  selector: 'cl-panel',
  standalone: true,
  imports: [CommonModule, ClButtonComponent, ClTemplateDirective],
  templateUrl: './panel.component.html',
})
export class ClPanelComponent implements OnInit {
  @Input() header?: string = '';
  @Input() subHeader?: string = '';
  @Input() icon?: string = ''; // material-icons
  @Input() actionList: ClPanelAction[] = [];

  @ContentChild(ClTemplateDirective) headerTemplate!: ClTemplateDirective;

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }
}

