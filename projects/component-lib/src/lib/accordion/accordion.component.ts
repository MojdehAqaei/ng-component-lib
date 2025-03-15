import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, Attribute, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";

@Component({
  selector: 'cl-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cl-accordion-item" [ngClass]="{'cl-disabled ':disabled}">
      <div class="cl-accordion-item-header" (click)="onToggle.emit($event)" [ngClass]="opened ? 'expanded' : 'closed'">
        <i class="material-icons toggle-icon">{{ opened ? 'expand_less' : 'expand_more '}}</i>
        <div *ngIf="titleTemplateRef" class="cl-accordion-item-title">
        <ng-container  [ngTemplateOutlet]="titleTemplateRef"></ng-container>
        </div>
        <span *ngIf="!titleTemplateRef" class="cl-accordion-item-title">{{title}}</span>
      </div>
      <div class="cl-accordion-item-content" [ngClass]="opened ? 'expanded' : 'closed' " #cl_accordion_content>
        <ng-content  *ngIf="opened"></ng-content>
      </div>
    </div>

  `,
})
export class ClAccordionItemComponent {

  @ContentChildren(ClTemplateDirective) templates!: QueryList<ClTemplateDirective>;
  titleTemplateRef?: TemplateRef<any>;

  @Input() opened = false;
  @Input() title?: string;
  @Input() disabled?: boolean;
  @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _cdRef: ChangeDetectorRef){}

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach(templateDir => {
        if (templateDir.template) {
          if (templateDir.name == 'title') {
            this.titleTemplateRef = templateDir.template;
          }
        }
      })
    }
    this._cdRef.detectChanges();
  }
}

@Component({
  selector: 'cl-accordion',
  standalone: true,
  imports: [CommonModule, ClAccordionItemComponent],
  template: `<div class="cl-accordion" [ngClass]="styleClasses"><ng-content></ng-content></div>`,
})
export class ClAccordionComponent implements AfterContentInit{

  @Input() multiple: boolean = false;

  constructor(@Attribute("styleClasses") public styleClasses: string = ''){}

  @ContentChildren(ClAccordionItemComponent) items!: QueryList<ClAccordionItemComponent>;

  ngAfterContentInit() {
    this.items.toArray().forEach((item: ClAccordionItemComponent) => {
       item.onToggle.subscribe(() => {
        if(item.opened){
          item.opened = false;
        }else{
          if(this.multiple){
            item.opened = true;
          }else{
            this.items.toArray().forEach(p => p.opened = false);
            item.opened = true;
          }
        }
      });
    });
  }
}
