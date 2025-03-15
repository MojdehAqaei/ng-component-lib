import {
  Component,
  TemplateRef,
  AfterViewInit,
  ContentChildren,
  QueryList,
  ChangeDetectorRef,
  Input,
  Attribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";
import {ClToolbarAction} from "@sadad/component-lib/src/models";
import {ClAvatarComponent} from "@sadad/component-lib/src/lib/avatar";
import {ClTooltipDirective} from "@sadad/component-lib/src/lib/tooltip";
import {ClButtonComponent} from '@sadad/component-lib/src/lib/button';


@Component({
  selector: 'cl-toolbar',
  standalone: true,
  imports: [CommonModule, ClTooltipDirective, ClAvatarComponent, ClButtonComponent],
  templateUrl: './toolbar.component.html',
})
export class ClToolbarComponent implements AfterViewInit {

  @ContentChildren(ClTemplateDirective) templates!: QueryList<ClTemplateDirective>;

  @Input() actions?: ClToolbarAction[] = [];

  startTemplateRef?: TemplateRef<any>;
  endTemplateRef?: TemplateRef<any>;
  centerTemplateRef?: TemplateRef<any>;

  constructor(private _cdRef:ChangeDetectorRef, @Attribute("styleClasses") public styleClasses: string = ''){}

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach(templateDir => {
        if (templateDir.template) {
          if (templateDir.name == 'start') {
            this.startTemplateRef = templateDir.template;
          } else if (templateDir.name == 'end') {
            this.endTemplateRef = templateDir.template;
          } else if (templateDir.name == 'center') {
            this.centerTemplateRef = templateDir.template;
          }
        }
      })
    }
    this._cdRef.detectChanges();
  }


}
