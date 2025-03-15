import {
  Attribute,
  Component, ContentChild,
  EventEmitter,
  Input, OnChanges, OnInit,
  Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClAction, ClColumn, ClTreeNode} from "@sadad/component-lib/src/models";
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";
import {ClCheckboxComponent} from "@sadad/component-lib/src/lib/checkbox";
import {ClPaginatorComponent} from "@sadad/component-lib/src/lib/paginator";
import {ClColumnDataType} from "@sadad/component-lib/src/models";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  rows: 10,
  first: 0,
  totalRecords: 0,
};

@Component({
  selector: 'cl-tree-table',
  standalone: true,
  imports: [CommonModule, ClTemplateDirective, ClCheckboxComponent, ClPaginatorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tree-table.component.html',
})
export class ClTreeTableComponent implements OnInit, OnChanges {


  @Input() data!: ClTreeNode<any>[];
  @Input() cols!: ClColumn[];
  @Input() noStickyHead: boolean = false;
  @Input() showGridLines: boolean = false;
  @Input() selectable: boolean = false;
  @Input() scrollHorizontal: boolean = false;
  @Input() scrollVertical: boolean = false;
  @Input() selectedRows?: any[];
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() totalRecords: number = 0;
  @Input() hasPaginator: boolean = false;
  @Input() rowsPerPageOptions: number[] = [];

  @Output() onPage = new EventEmitter<{ first: number, rows: number }>();
  @Output() onLazyLoad = new EventEmitter<{ first: number, rows: number }>();
  @Output() selectedRowsChange = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter<ClTreeNode<any>>();
  @Output() onNodeUnSelect = new EventEmitter<ClTreeNode<any>>();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();

  tableColumnType: typeof ClColumnDataType;
  totalColSpan: number = 1;
  currentPage: number = 1;


  @ContentChild(ClTemplateDirective) templateRef?: ClTemplateDirective;


  constructor(private _sharedService: ClSharedService,
              @Attribute('styleClasses') public styleClasses: string = '',
              @Attribute('dataKey') public dataKey: string,
              @Attribute('size') public size: 'sm' | 'lg' | 'md',
              @Attribute('responsiveLayout') public responsiveLayout: 'scroll' | 'stack',
              @Attribute('scrollHeight') public scrollHeight: 'flex' | 'unset' | string) {
    this.dataKey = this.dataKey || 'id';
    this.size = this.size || 'md';
    this.responsiveLayout = this.responsiveLayout || 'stack';
    this.scrollHeight = this.scrollHeight || 'unset';
    this.first = 0;
    this.tableColumnType = ClColumnDataType;
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: any): void {

    if (changes?.cols?.currentValue) {
      this.cols = this.cols?.filter(x => !x.hidden);
      this.totalColSpan = this.getTotalColSpan();
    }

    if (this.data?.length && this.selectable) {
      this.updateTreeNodes(this.data);
    }
  }

  updateTreeNodes(nodes: ClTreeNode<any>[], parent?: ClTreeNode<any>) {
    let allChildrenSelected = true;
    let partialSelected = false;
    nodes.forEach(node => {
      node['parent'] = parent;
      if (this.selectedRows?.length) {
        node.selected = this.selectedRows?.find((x: any) => this.dataKey ? node.data[this.dataKey] === x : node.data === x);
      }
      if (node?.children?.length) {
        this.updateTreeNodes(node.children, node);
      }

      allChildrenSelected = !!node.selected && allChildrenSelected;
      partialSelected = partialSelected || !!node.selected || !!node.partialSelected;
    });
    partialSelected = allChildrenSelected ? false : partialSelected;
    if (parent) {
      parent.partialSelected = partialSelected;
    }
  }

  onToggleItem(item: ClTreeNode<any>) {
    item.expanded = !item.expanded;
    item.expanded ? this.onNodeExpand.emit(item) : this.onNodeCollapse.emit(item);
  }

  onNodeClick(node: ClTreeNode<any>) {
    if (!node.disabled && this.selectable) {
      const selected = !node.selected;
      this.changeSelectionRecursive([node], selected);
      this.checkPartialSelection(node.parent);

      this.selectedRowsChange.emit(this.selectedRows);
      node.selected ? this.onNodeSelect.emit(node) : this.onNodeUnSelect.emit(node);
    }
  }

  getActionColStyleClasses(row: any, col: ClAction | ClColumn) {
    return `${col?.styleClasses}  ${this.disableAction(row, col) ? 'cl-disabled' : ''}`;
  }

  getColStyleClasses(col: ClColumn, row: any) {
    let classes = col.styleClasses;
    col?.cellConfig?.map(item => {
      classes = item.value === row[item.key] ? `${col.styleClasses} ${item.styleClass} ` : classes;
    });
    return classes;
  }


  getColWidth(colSpan: number) {
    return colSpan ? (colSpan * 100) + 'px' : 'unset'
  }

  changeSelectionRecursive(nodeList: ClTreeNode<any>[], selected: boolean) {
    nodeList.forEach((node: ClTreeNode<any>) => {
      if (!node.disabled) {
        node.selected = selected;
        this.changeSelectionList(node, selected);
        if (node.children?.length) {
          this.changeSelectionRecursive(node.children, selected);
        }
      }
    });
  }

  changeSelectionList(node: ClTreeNode<any>, selected: boolean) {
    this.selectedRows = selected ?
      !this.selectedRows?.find((x: any) => this.dataKey ? node.data[this.dataKey] === x : node.data === x) ? (this.selectedRows || []).concat(this.dataKey ? node.data[this.dataKey] : node.data) : this.selectedRows :
      this.selectedRows?.filter((x: any) => this.dataKey ? node.data[this.dataKey] !== x : node.data !== x);
  }

  checkPartialSelection(node: ClTreeNode<any> | undefined) {
    if (node) {
      let allChildrenSelected = true;
      let partialSelected = false;
      node.children?.forEach(item => {
        allChildrenSelected = !!item.selected && allChildrenSelected;
        partialSelected = partialSelected || !!item.selected || !!item.partialSelected;
      });
      partialSelected = allChildrenSelected ? false : partialSelected;
      if ((allChildrenSelected && !node.selected) || node.partialSelected !== partialSelected) {
        node.partialSelected = partialSelected;
        if (allChildrenSelected && !node.selected) {
          node.selected = true;
          this.changeSelectionList(node, true);
        }
        this.checkPartialSelection(node.parent);
      }
    }
  }

  disableAction(row: any, column: ClColumn | ClAction) {
    if (column.status) {
      if (column?.status?.on?.some(y => y.rowValue.includes(this.getNestedValue(y.rowField, row)))) {
        return column?.status?.status;
      } else return !column?.status?.status;
    } else return false;
  }

  getColValue(data: any, col: ClColumn, props: string, valIndex: number) {
    const val = this.getNestedValue(props, data);
    return val != null ? (col.valueMapper && col.valueMapper[valIndex] ? col?.valueMapper[valIndex][val] || col.valueMapper[valIndex].get(val) : val) + ((col.value?.length && valIndex < (col.value?.length - 1)) ? col.valueSeparator || ' ' : '') : '-';
  }


  getNestedValue(props: string, data: any) {
    const nestedObjectKeys = props?.split('.');
    let tempVal = data;
    for (let item of nestedObjectKeys) {
      tempVal = tempVal ? tempVal[item] : null;
      if (!tempVal)
        break;
    }
    return tempVal;
  }


  changePage(event: { rows: number, first: number, page: number }) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page;
    this.onPage.emit(event);
  }

  getTotalColSpan(justStaticCols: boolean = false) {
    const staticColSpan = (this.selectable ? 1 : 0) + 1;
    return justStaticCols ? staticColSpan : staticColSpan + (this.cols?.length ? this.cols.reduce((pre, cur) => pre + cur.colSpan, 0) : 0);
  }

  get tableStyleClasses() {
    return `${this.styleClasses}
     ${this.size == 'sm' ? 'cl-treetable-sm' : this.size == 'lg' ? 'cl-treetable-lg' : ''}
     ${this.showGridLines ? 'cl-treetable-gridlines' : ''}
     ${this.scrollHorizontal || this.scrollVertical ? 'cl-treetable-scrollable' : ''}
     ${this.scrollHorizontal ? 'cl-scroll-horizontal' : ''}
     ${this.scrollVertical ? 'cl-scroll-vertical' : ''}`;
  }

}
