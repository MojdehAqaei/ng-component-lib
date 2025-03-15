import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClInputTextComponent} from "@sadad/component-lib/src/lib/input-text";
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClDragDropDirective} from "@sadad/component-lib/src/lib/drag-drop";
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  filter: true,
};

@Component({
  selector: 'cl-pick-list',
  standalone: true,
  imports: [CommonModule, ClInputTextComponent, ScrollingModule, ClButtonComponent, ClDragDropDirective],
  templateUrl: './pick-list.component.html',

})
export class ClPickListComponent implements OnInit, OnChanges {
  @Input() source: any[] = [];
  @Input() target: any[] = [];
  @Input() sourceHeader: string = '';
  @Input() targetHeader: string = '';
  @Input() filter: boolean = true;
  @Input() filterBy: string = '';
  @Input() sourcePlaceHolder: string = '';
  @Input() targetPlaceHolder: string = '';
  @Output() onMove = new EventEmitter<any>();
  @Output() onDrag = new EventEmitter<any>();
  @Output() onDrop = new EventEmitter<any>();
  @Output() onSourceChange = new EventEmitter<any>();
  @Output() onTargetChange = new EventEmitter<any>();

  sourceList: any[] = [];
  targetList: any[] = [];
  filteredSource: any[] = [];
  filteredTarget: any[] = [];
  selectedSource: any;
  selectedTarget: any;
  containerHeight: number = 200;
  disableOneToTarget: boolean = true;
  disableAllToTarget: boolean = false;
  disableOneToSource: boolean = true;
  disableAllToSource: boolean = true;


  @ContentChild('item', {static: false}) templateRef?: TemplateRef<any>;

  constructor(private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] || changes['target']) {
      this.sourceList = this.filteredSource = this.source;
      this.targetList = this.filteredTarget = this.target;
    }
  }

  filterSourceList(searchValue: any) {
    if (this.filter && this.filterBy) {
      this.filteredSource = this.filterList(searchValue, this.sourceList);
      this.onSourceChange.emit(this.filteredSource);
      this.disableAllToTarget = false;
    }
  }

  filterTargetList(searchValue: any) {
    if (this.filter && this.filterBy) {
      this.filteredTarget = this.filterList(searchValue, this.targetList);
      this.onTargetChange.emit(this.filteredTarget);
      this.disableAllToSource = false;
    }
  }

  onSourceSelected(selected: any) {
    this.selectedSource = selected;
    this.disableOneToTarget = false;
  }

  onTargetSelected(selected: any) {
    this.selectedTarget = selected;
    this.disableOneToSource = false;
  }

  moveOneToTarget() {
    if (this.selectedSource) {
      this.filteredTarget.push(this.selectedSource);
      this.onTargetChange.emit(this.filteredTarget);
      this.filteredSource = this.removeItem(this.selectedSource, this.filteredSource);
      this.sourceList = this.removeItem(this.selectedSource, this.sourceList);

      this.onMove.emit(this.selectedSource);
      this.onSourceChange.emit(this.filteredSource);

      this.disableAllToSource = false;
      this.disableOneToTarget = true;
      this.disableOneToSource = true;

      this.selectedSource = null;
      this.selectedTarget = null;

      this.disableAllToTarget = this.filteredSource.length == 0 ? true : false;
    }
  }

  moveOneToSource() {
    if (this.selectedTarget) {
      this.filteredSource.push(this.selectedTarget);
      this.onSourceChange.emit(this.filteredSource);
      this.filteredTarget = this.removeItem(this.selectedTarget, this.filteredTarget);
      this.onTargetChange.emit(this.filteredTarget);
      this.targetList = this.removeItem(this.selectedTarget, this.targetList);

      this.onMove.emit(this.selectedTarget);

      this.disableAllToTarget = false;
      this.disableOneToSource = true;
      this.disableOneToTarget = true;

      this.selectedSource = null;
      this.selectedTarget = null;

      this.disableAllToSource = this.filteredTarget.length == 0 ? true : false;
    }
  }

  moveAllToTarget() {
    let sourceList = [...this.sourceList];
    let targetList = [...this.targetList];

    this.filteredSource.forEach((item: any) => {
      this.filteredTarget.push(item);
      targetList.push(item);

      sourceList.forEach((source: any) => {
        if (source == item) {
          sourceList = this.removeItem(item, sourceList);
        }
      })
    });

    this.onMove.emit(this.filteredSource);
    this.onTargetChange.emit(this.filteredTarget);

    this.filteredSource = [];
    this.sourceList = sourceList;
    this.targetList = targetList;

    this.disableAllToSource = false;
    this.disableAllToTarget = true;
    this.disableOneToTarget = true;

    this.selectedSource = null;
    this.selectedTarget = null;

    this.onSourceChange.emit(this.filteredSource);
  }

  moveAllToSource() {
    let sourceList = [...this.sourceList];
    let targetList = [...this.targetList];

    this.filteredTarget.forEach((item: any) => {
      this.filteredSource.push(item);
      sourceList.push(item);

      targetList.forEach((target: any) => {
        if (target == item) {
          targetList = this.removeItem(item, targetList);
        }
      })
    })

    this.onMove.emit(this.filteredTarget);
    this.onSourceChange.emit(this.filteredSource);

    this.filteredTarget = [];
    this.targetList = targetList;
    this.sourceList = sourceList;

    this.disableAllToTarget = false;
    this.disableAllToSource = true;
    this.disableOneToSource = true;

    this.selectedSource = null;
    this.selectedTarget = null;

    this.onTargetChange.emit(this.filteredTarget);
  }


  filterList(searchValue: any, options: any[]) {
    const val = searchValue.trim();
    let filterOptions: any[];

    if (val && options.length > 0) {
      filterOptions = options.filter((item) => item[this.filterBy].toLowerCase().indexOf(val) !== -1);
    } else {
      filterOptions = options;
    }

    return filterOptions;
  }

  removeItem(selected: any, array: any[]) {
    const index = array.indexOf(selected);
    if (index > -1)
      array.splice(index, 1);
    return array;
  }

  onSourceDrag(item: any) {
    this.selectedSource = item;
    this.onDrag.emit(item);
  }

  onSourceDragEnd() {
    this.selectedSource = null;
    this.selectedTarget = null;
  }

  onSourceDrop() {
    this.moveOneToSource();
    this.onDrop.emit();
  }

  onTargetDrag(item: any) {
    this.selectedTarget = item;
    this.onDrag.emit(item);
  }

  onTargetDragEnd() {
    this.selectedSource = null;
    this.selectedTarget = null;
  }

  onTargetDrop() {
    this.moveOneToTarget();
    this.onDrop.emit();
  }

}
