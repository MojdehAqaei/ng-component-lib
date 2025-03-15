import { Component, Input, ContentChildren, QueryList, AfterContentInit, Attribute, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cl-tab-item',
  standalone: true,
  imports: [CommonModule],
  template: `
  <ng-container *ngIf="active">
    <ng-content></ng-content>
  </ng-container>
`,
})
export class ClTabItemComponent {
  @Input('tabTitle') title: string = '';
  @Input() active = false;
  @Input() icon = '';
}

@Component({
  selector: 'cl-tab',
  standalone: true,
  imports: [CommonModule, ClTabItemComponent],
  templateUrl: './tab.component.html',
})
export class TabComponent implements AfterContentInit {
  @Input() scrollable = false;
  //@Input() isRtl = false;
  @Output() onActiveItemChange = new EventEmitter();
  @ContentChildren(ClTabItemComponent) tabs!: QueryList<ClTabItemComponent> ;

  atStart = true;
  //atEnd = false;

  constructor(@Attribute("styleClasses") public styleClasses: string = ''){}

  ngAfterContentInit() {
    if (this.tabs.filter(tab => tab.active)?.length === 0) {
      this.selectTab(this.tabs.first ,0);
    }
    const element = document.getElementById("content");
    this.atStart = element?.scrollLeft === 0;
  }

  selectTab(tab: any , index:number) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
    this.onActiveItemChange.emit({...tab, index});
  }

  scrollTab(x: number) {
    const element = document.getElementById("content");

    if(element){
      element.scrollLeft += x;
      this.atStart = element.scrollLeft === 0 ? true : false;
    }
  }

}


