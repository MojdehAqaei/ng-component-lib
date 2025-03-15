import {
  AfterViewInit,
  Attribute,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClAction, ClColumn } from '@sadad/component-lib/src/models';
import { ClTemplateDirective } from '@sadad/component-lib/src/lib/template';
import { ClCheckboxComponent } from '@sadad/component-lib/src/lib/checkbox';
import { ClInputTextComponent } from '@sadad/component-lib/src/lib/input-text';
import { ClSelectComponent } from '@sadad/component-lib/src/lib/select';
import { ClPaginatorComponent } from '@sadad/component-lib/src/lib/paginator';
import { ClColumnDataType, ClTableData } from '@sadad/component-lib/src/models';
import {
  ClButtonType,
  ClFormControlTypes,
} from '@sadad/component-lib/src/enums';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClSharedService } from '@sadad/component-lib/src/services';
import { ClSplitButtonComponent } from '@sadad/component-lib/src/lib/split-button';
import { ClObjectToStringPipe } from '@sadad/component-lib/src/pipes';

const INITIAL_VALUE: { [key: string]: any } = {
  rows: 10,
  first: 0,
  totalRecords: 0,
  size: 'md',
  responsiveLayout: 'stack',
  rowGroupMode: 'subheader',
  columnResizeMode: 'fit',
  scrollHeight: 'unset',
};

@Component({
  selector: 'cl-data-table',
  standalone: true,
  imports: [
    CommonModule,
    ClTemplateDirective,
    ClCheckboxComponent,
    ClPaginatorComponent,
    FormsModule,
    ReactiveFormsModule,
    ClSelectComponent,
    ClInputTextComponent,
    ClSplitButtonComponent,
  ],
  templateUrl: './data-table.component.html',
  providers: [ClObjectToStringPipe],
})
export class ClDataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() value!: any[];
  @Input() cols!: ClColumn[];
  @Input() title?: string;
  @Input() noStickyHead: boolean = false;
  @Input() showGridLines: boolean = false;
  @Input() striped: boolean = false;
  @Input() loading: boolean = false;
  @Input() isLazy: boolean = false;
  @Input() filterable: boolean = false;
  @Input() sortable: boolean = false;
  @Input() selectable: boolean = false;
  @Input() scrollHorizontal: boolean = false;
  @Input() scrollVertical: boolean = false;
  @Input() selectedRows?: any[];
  @Input() rowExpand: boolean = false;
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() totalRecords: number = 0;
  @Input() hasPaginator: boolean = false;
  @Input() rowsPerPageOptions: number[] = [];
  @Input() actions?: ClAction[];
  @Input() actionsBtnType?: ClButtonType;
  @Input() actionsBtnLabel?: string;
  @Input() actionsBtnIcon?: string;
  @Input() sortFunction: (sortType: 'asc' | 'desc', a: any, b: any) => number =
    (sortType, a, b) => (sortType == 'asc' ? (a < b ? -1 : 1) : a < b ? 1 : -1);

  @Output() onActionClick = new EventEmitter<{ action: ClAction; row: any }>();
  @Output() onPage = new EventEmitter<{
    first: number;
    rows: number;
    page: number;
  }>();
  @Output() onLazyLoad = new EventEmitter<{
    first: number;
    rows: number;
    page: number;
  }>();
  @Output() onSelect = new EventEmitter<any[]>();
  @Output() onRowExpand = new EventEmitter<ClTableData>();

  @ContentChildren(ClTemplateDirective)
  templates!: QueryList<ClTemplateDirective>;

  dataList: ClTableData[] = [];
  captionTemplateRef: TemplateRef<any> | null = null;
  headerTemplateRef: TemplateRef<any> | null = null;
  bodyTemplateRef?: TemplateRef<any>;
  rowExpansionTemplateRef?: TemplateRef<any>;
  groupHeaderTemplateRef?: TemplateRef<any>;
  groupFooterTemplateRef?: TemplateRef<any>;
  footerTemplateRef?: TemplateRef<any>;
  summaryTemplateRef?: TemplateRef<any>;
  tableColumnType: typeof ClColumnDataType;
  tableSelected: boolean = false;
  totalColSpan: number = 1;
  currentPage: number = 1;
  filterFormGroup: FormGroup = new FormGroup({});

  constructor(
    @Attribute('styleClasses') public styleClasses: string = '',
    @Attribute('dataKey') public dataKey: string,
    @Attribute('size') public size: 'sm' | 'lg' | 'md',
    @Attribute('responsiveLayout') public responsiveLayout: 'scroll' | 'stack',
    @Attribute('rowGroupMode') public rowGroupMode: 'subheader' | 'rowspan',
    @Attribute('groupRowsBy') public groupRowsBy: string = '',
    @Attribute('columnResizeMode') public columnResizeMode: 'fit' | 'expand',
    @Attribute('scrollHeight') public scrollHeight: 'flex' | 'unset' | string,
    private _sharedService: ClSharedService,
    private _cdRef: ChangeDetectorRef,
    private _objectToStringPipe: ClObjectToStringPipe
  ) {
    this.dataKey = this.dataKey || 'id';
    this.size = this.size || 'md';
    this.responsiveLayout = this.responsiveLayout || 'stack';
    this.rowGroupMode = this.rowGroupMode || 'subheader';
    this.columnResizeMode = this.columnResizeMode || 'fit';
    this.scrollHeight = this.scrollHeight || 'unset';
    this.tableColumnType = ClColumnDataType;
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach((templateDir) => {
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
          } else if (templateDir.name == 'groupheader') {
            this.groupHeaderTemplateRef = templateDir.template;
          } else if (templateDir.name == 'groupfooter') {
            this.groupFooterTemplateRef = templateDir.template;
          }
        }
      });
      this._cdRef.detectChanges();
    }
  }

  ngOnChanges(changes: any): void {
    if (changes?.isLazy?.currentValue) {
      this.onLazyLoad.emit();
    }
    if (changes?.cols?.currentValue) {
      this.cols = this.cols?.filter((x) => !x.hidden);
      this.totalColSpan = this.getTotalColSpan();
    }

    if (changes?.value?.currentValue) {
      this.getTableData();
    }
    if (changes?.first || changes?.rows) {
      this.currentPage =
        this.first && this.rows
          ? this.first < this.rows
            ? 1
            : Math.floor(this.first / this.rows) + 1
          : 1;
    }
    if (
      changes?.filterable?.currentValue ||
      changes?.value?.currentValue ||
      changes?.cols?.currentValue
    ) {
      this.cols?.forEach((col, index) => {
        if (col.type != ClColumnDataType.ACTION && col.filterSchema) {
          this.filterFormGroup?.addControl(
            'colFilter' + index,
            new FormControl(null)
          );
          if (col.filterSchema.controlType == ClFormControlTypes.MULTISELECT) {
            col.filterSchema.options = [];
            this.value?.forEach((row) => {
              const colValue = col.value?.reduce(
                (prev, val, i) => prev + this.getColValue(row, col, val, i),
                ''
              );
              if (
                !col.filterSchema?.options?.find((x) => x.label === colValue)
              ) {
                col.filterSchema?.options?.push({
                  label: colValue,
                  value: colValue,
                });
              }
            });
          }
        }
      });
    }

    this.onSelect.subscribe((res) => {
      this.tableSelected = res?.length == this.value?.length;
    });
  }

  getActionCols(row: any) {
    return this.actions?.length
      ? this.actions
          ?.filter((each) => !this.disableAction(row.data, each))
          ?.map((x, index) => {
            return {
              index,
              ...x,
              command: () => {},
              disabled: this.disableAction(row.data, x),
            };
          })
      : [];
  }

  selectAll(check: boolean) {
    this.selectedRows = check ? this.value : [];
    if (this.groupRowsBy) {
      this.dataList.map((x) => (x.selected = check));
    }
    this.onSelect.emit(this.selectedRows);
  }

  groupIsSelected(group: ClTableData) {
    return !group.children?.filter(
      (item) =>
        this.selectedRows?.findIndex(
          (x) => x[this.dataKey] === item.data[this.dataKey]
        ) == -1
    )?.length;
  }

  selectRowGroup(check: boolean, group: ClTableData) {
    if (check) {
      this.selectedRows = (this.selectedRows || []).concat(
        group.children?.map((item) => {
          if (
            this.selectedRows?.findIndex(
              (x) => x[this.dataKey] === item.data[this.dataKey]
            ) == -1
          ) {
            return item.data;
          }
        })
      );
    } else {
      this.selectedRows =
        this.selectedRows?.filter(
          (item: any) =>
            group.children?.findIndex(
              (x) => x.data[this.dataKey] === item[this.dataKey]
            ) == -1
        ) || [];
    }
    this.onSelect.emit(this.selectedRows);
  }

  mapToTableData(data: any[]) {
    return data?.length
      ? this.groupRowsBy
        ? this.toGroupRows(data)
        : data.map((x, index) => {
            return {
              index: this.first + index + 1,
              data: x,
              expanded: false,
              children: [],
            } as ClTableData;
          })
      : [];
  }

  getColWidth(colSpan: number) {
    return colSpan ? colSpan * 100 + 'px' : 'unset';
  }

  getTableData() {
    this.dataList = this.sortDataTable(
      this.mapToTableData(
        this.filterable ? this.filterData(this.value) : this.value
      )
    );
    this.totalRecords = this.isLazy ? this.totalRecords : this.dataList?.length;
  }

  toGroupRows(data: any[]): ClTableData[] {
    const rows: ClTableData[] = [];
    data.forEach((row, i) => {
      const value = this._objectToStringPipe.nestedObjectValue(
        row,
        this.groupRowsBy
      );
      const index = rows.findIndex((x) => x.data == value);
      if (!rows?.length || index == -1) {
        rows.push({
          index: rows?.length + 1,
          data: value,
          children: [{ index: this.first + i + 1, data: row, expanded: false }],
          expanded: false,
        });
      } else {
        rows[index].children?.push({
          index: this.first + i + 1,
          data: row,
          expanded: false,
        });
      }
    });
    return rows;
  }

  disableAction(row: any, column: ClColumn | ClAction) {
    if (column.disabled) {
      return true;
    } else if (column.status) {
      if (
        column?.status?.on?.some((y) =>
          y.rowValue.includes(
            this._objectToStringPipe.nestedObjectValue(row, y.rowField)
          )
        )
      ) {
        return column?.status?.status;
      } else return !column?.status?.status;
    } else return false;
  }

  getColValue(data: any, col: ClColumn, props: string, valIndex: number) {
    const val = this._objectToStringPipe.nestedObjectValue(data, props);
    return val != null
      ? (col.valueMapper && col.valueMapper[valIndex]
          ? col?.valueMapper[valIndex][val] ||
            col.valueMapper[valIndex].get(val)
          : val) +
          (col.value?.length && valIndex < col.value?.length - 1
            ? col.valueSeparator || ' '
            : '')
      : '-';
  }

  getActionColStyleClasses(row: any, col: ClColumn) {
    return `${col?.styleClasses}  ${
      this.disableAction(row, col) ? 'cl-disabled' : ''
    }`;
  }

  getColStyleClasses(col: ClColumn, row: any) {
    let classes = col.styleClasses;
    col?.cellConfig?.map((item) => {
      classes =
        item.value === row[item.key]
          ? `${col.styleClasses} ${item.styleClass} `
          : classes;
    });
    return classes;
  }

  changePage(event: { rows: number; first: number; page: number }) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page;
    this.onPage.emit(event);
  }

  getTotalColSpan(justStaticCols: boolean = false) {
    const staticColSpan =
      (this.actions?.length ? 1 : 0) +
      (this.selectable ? 1 : 0) +
      (this.rowExpand && !this.groupRowsBy ? 2 : 0) +
      (this.groupRowsBy && this.rowGroupMode == 'rowspan' ? 2 : 0) +
      1;
    return justStaticCols
      ? staticColSpan
      : staticColSpan +
          (this.cols?.length
            ? this.cols.reduce((pre, cur) => pre + cur.colSpan, 0)
            : 0);
  }

  changeSortType(col: ClColumn) {
    if (col.sortBy) {
      col.sortType = !col.sortType
        ? 'asc'
        : col.sortType == 'asc'
        ? 'desc'
        : undefined;
      this.getTableData();
    }
  }

  sortDataTable(data: ClTableData[]) {
    if (data?.length && this.sortable) {
      this.cols.forEach((column) => {
        data =
          column.sortBy && column.sortType
            ? this.groupRowsBy
              ? data.map((row) => {
                  return {
                    ...row,
                    children: row.children?.length
                      ? this.doSort(
                          row.children,
                          column.sortBy!,
                          column.sortType!
                        )
                      : [],
                  };
                })
              : this.doSort(data, column.sortBy!, column.sortType!)
            : data;
      });
    }
    return data;
  }

  doSort(data: ClTableData[], sortBy: string, sortType: 'asc' | 'desc') {
    return data.sort((a, b) => {
      const val1 = this._objectToStringPipe.nestedObjectValue(a.data, sortBy!);
      const val2 = this._objectToStringPipe.nestedObjectValue(b.data, sortBy!);
      return this.sortFunction(sortType!, val1, val2);
    });
  }

  filterData(data: any[]) {
    if (data?.length) {
      this.cols?.forEach((col, index) => {
        const controlValue = this.filterFormGroup.get(
          `colFilter${index}`
        )?.value;
        if (
          data?.length &&
          col.type != ClColumnDataType.ACTION &&
          col.filterSchema &&
          col.filterSchema?.controlType == ClFormControlTypes.MULTISELECT
            ? controlValue?.length
            : controlValue
        ) {
          data = data.filter((row: any) => {
            const colValue = col.value?.reduce(
              (prev, val, i) => prev + this.getColValue(row, col, val, i),
              ''
            );
            return colValue
              ? col.filterSchema?.controlType == ClFormControlTypes.MULTISELECT
                ? controlValue?.includes(colValue)
                : col.filterSchema?.operator == 'contain'
                ? colValue?.includes(controlValue)
                : col.filterSchema?.operator == 'equal'
                ? colValue == controlValue
                : false
              : false;
          });
        }
      });
    }
    return data;
  }

  get tableStyleClasses() {
    return `${this.styleClasses}
     ${
       this.size == 'sm'
         ? 'cl-datatable-sm'
         : this.size == 'lg'
         ? 'cl-datatable-lg'
         : ''
     }
     ${this.striped ? 'cl-datatable-striped' : ''}
     ${this.showGridLines ? 'cl-datatable-gridlines' : ''}
     ${
       this.scrollHorizontal || this.scrollVertical
         ? 'cl-datatable-scrollable'
         : ''
     }
     ${this.scrollHorizontal ? 'cl-scroll-horizontal' : ''}
     ${this.scrollVertical ? 'cl-scroll-vertical' : ''}`;
  }

  splitActionClick(action: ClAction, row: any) {
    if (this.actions?.length && this.actions[action.index].command) {
      this.actions[action.index].command!({ action, row });
      this.onActionClick.emit({ action, row });
    }
  }
}
