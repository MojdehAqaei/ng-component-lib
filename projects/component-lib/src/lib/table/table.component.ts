import {
  AfterViewInit, Attribute,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList, TemplateRef,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Table, TableModule} from "primeng/table";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ClColumn} from "@sadad/component-lib/src/models";
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";
import {ClColumnDataType} from "@sadad/component-lib/src/models";

@Component({
  selector: 'cl-table',
  standalone: true,
  imports: [CommonModule, TableModule, NoopAnimationsModule,ClTemplateDirective],
  templateUrl: './table.component.html',
})
export class ClTableComponent implements AfterViewInit {

  @Input() value!: any[];
  @Input() cols!: ClColumn[];
  @Input() actionsCol?: ClColumn[];
  @Input() title?: string;
  @Input() noStickyHead: boolean = false;
  @Input() loading: boolean = false;
  @Input() isLazy: boolean = false;
  @Input() isSortable: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() selectedRows?: any[];
  @Input() resizableColumns: boolean = false;
  @Input() reorderAbleColumns: boolean = false;
  @Input() rowExpand: boolean = false;
  @Input() horizontalScrollable: boolean = false;
  @Input() verticalScrollable: boolean = false;
  @Input() rows: number = 10;
  @Input() totalRecords: number = 0;
  @Input() hasPaginator: boolean = false;
  @Input() rowsPerPageOptions: number[] = [10, 30, 100];
  @Input() showCurrentPageReport: boolean = true;
  @Input() currentPageReportTemplate: string = "نمایش {first}-{last} از {totalRecords}";

  @Output() onPage = new EventEmitter<{ first: number, rows: number }>();
  @Output() onLazyLoad = new EventEmitter<{ first: number, rows: number }>();
  @Output() onSelect = new EventEmitter<any[]>();

  @ViewChild('tableRef', {read: Table}) tableRef!: Table;
  @ContentChildren(ClTemplateDirective) templates!: QueryList<ClTemplateDirective>;


  captionTemplateRef?: TemplateRef<any>;
  headerTemplateRef?: TemplateRef<any>;
  bodyTemplateRef?: TemplateRef<any>;
  rowExpansionTemplateRef?: TemplateRef<any>;
  groupHeaderTemplateRef?: TemplateRef<any>;
  groupFooterTemplateRef?: TemplateRef<any>;
  footerTemplateRef?: TemplateRef<any>;
  summaryTemplateRef?: TemplateRef<any>;
  tableColumnType: typeof ClColumnDataType;
  pageStart: number;

  constructor(@Attribute('styleClasses') public styleClasses: string = '',
              @Attribute('columnKey') public columnKey: string = 'id',
              @Attribute('responsiveLayout') public responsiveLayout: 'scroll' | 'stack' = 'stack',
              @Attribute('sortMode') public sortMode: 'multiple' | 'single' = 'single',
              @Attribute('sortField') public sortField?: string,
              @Attribute('rowGroupMode') public rowGroupMode: 'subheader' | 'rowspan' | string  = '',
              @Attribute('groupRowsBy') public groupRowsBy?: string,
              @Attribute('columnResizeMode') public columnResizeMode: 'fit' | 'expand' = 'fit',
              @Attribute('scrollHeight') public scrollHeight: 'flex' |'unset'| string = 'unset',
              ) {
    this.pageStart = 0;
    this.tableColumnType = ClColumnDataType;
  }

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach(templateDir => {
        if (templateDir.template) {
          if (templateDir.name == 'caption') {
            this.captionTemplateRef = templateDir.template;
          } else if (templateDir.name == 'header') {
            this.headerTemplateRef = templateDir.template;
          } else if (templateDir.name == 'body') {
            this.bodyTemplateRef = templateDir.template;
          } else if (templateDir.name == 'footer') {
            this.footerTemplateRef = templateDir.template;
          } else if (templateDir.name == 'summary') {
            this.summaryTemplateRef = templateDir.template;
          } else if (templateDir.name == 'rowexpansion') {
            this.rowExpansionTemplateRef = templateDir.template;
          }else if (templateDir.name == 'groupheader') {
            this.groupHeaderTemplateRef = templateDir.template;
          }else if (templateDir.name == 'groupfooter') {
            this.groupFooterTemplateRef = templateDir.template;
          }
        }
      })
    }
  }

  ngOnChanges(changes: any): void {
    if (changes?.value?.currentValue) {
      this.totalRecords = this.value?.length;
      this.tableRef?.reset();
    }
    if (changes?.cols?.currentValue) {
      this.cols = this.cols?.filter(x => !x.hidden);
    }
  }


  load(event: { first: number, rows: number }) {
    this.pageStart = event.first;
    this.tableRef?.reset();
    this.onPage.emit(event);
  }

  select() {
    this.onSelect.emit(this.selectedRows);
  }

  disableAction(row: any, column: ClColumn) {
    if (column.status) {
      if (column?.status?.on?.some(y => y.rowValue.includes(this.getInnerValueProp(y.rowField, row)))) {
        return column?.status?.status;
      } else return !column?.status?.status;
    } else return false;
  }

 get colsLength(){
    return this.cols.length+1 +(this.isSelectable ? 1 : 0)+(this.reorderAbleColumns ? 1 :0)+ (this.rowExpand? 1:0);
 }
  getActionColStyleClasses(row: any, col: ClColumn) {
    return [col.styleClasses || '', this.disableAction(row, col) ? 'cl-disabled' : '']
  }

  get tableStyleClasses() {
    return `${this.styleClasses} p-datatable-striped ${this.noStickyHead ? 'cl-no-sticky-table' : ''} ${this.horizontalScrollable ? 'p-scroll-horizontal':''}`;
  }

  getInnerValueProp(props: string, data: any) {
    const propArray = props.split('.');
      for (let i = 0; i < propArray.length; i++) {
        data = data ? data[propArray[i]] : data ;
        if (!data)
          break;
      }
    return  data;
  }

  getColumnText(col: ClColumn, row: any, val: string, valIndex: number) {
    const rowVal = this.getInnerValueProp(val, row);
    return (valIndex > 0 ? col.valueSeparator || ' ' : '') + (rowVal ? col.valueMapper && col.valueMapper[valIndex] ? col.valueMapper[valIndex][rowVal] || col.valueMapper[valIndex].get(rowVal) : rowVal || '-' : '-');
  }

}
