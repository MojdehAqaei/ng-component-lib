import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClDataTableComponent } from "@sadad/component-lib/src/lib/data-table";
import { CommonModule } from "@angular/common";
import {
  ClAction,
  ClColumn,
  ClColumnDataType,
} from "@sadad/component-lib/src/models";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClCheckboxComponent } from "@sadad/component-lib/src/lib/checkbox";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { ClPaginatorComponent } from "@sadad/component-lib/src/lib/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClFormControlTypes } from "@sadad/component-lib/src/enums";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Data/DataTable",
  component: ClDataTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClTemplateDirective,
        ClCheckboxComponent,
        ClPaginatorComponent,
        FormsModule,
        ReactiveFormsModule,
        ClSelectComponent,
        ClInputTextComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const COLS: ClColumn[] = [
  {
    header: "کد",
    value: ["code"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "code",
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "نام",
    value: ["name"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "name",
    filterSchema: {
      operator: "contain",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "دسته بندی",
    value: ["category.name", "category.code"],
    valueSeparator: "-",
    type: ClColumnDataType.TEXT,
    colSpan: 2,
    sortBy: "category.name",
    filterSchema: {
      controlType: ClFormControlTypes.MULTISELECT,
      operator: "equal",
      options: [
        { label: "گروه 1", value: "گروه 1" },
        { label: "گروه 2", value: "گروه 2" },
        { label: "گروه 3", value: "گروه 3" },
        { label: "گروه 4", value: "گروه 4" },
        { label: "گروه 5", value: "گروه 5" },
        { label: "گروه 6", value: "گروه 6" },
      ],
    },
  },
  {
    header: "تعداد",
    value: ["count"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "count",
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "وضعیت",
    value: ["available"],
    colSpan: 1,
    sortBy: "available",
    type: ClColumnDataType.BOOLEAN,
    valueMapper: [
      new Map<any, string>().set(false, "  نا موجود").set(true, "موجود"),
    ],
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.MULTISELECT,
      options: [
        { label: "موجود", value: true },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
      ],
    },
  },
  {
    header: "توضیحات",
    value: ["description"],
    type: ClColumnDataType.TEXT,
    colSpan: 3,
  },
  {
    header: "تصویر",
    value: ["img"],
    type: ClColumnDataType.ACTION,
    colSpan: 1,
    icon: "file_download",
    styleClasses: "blue-text",
  },
];

const COLS_1: ClColumn[] = [
  {
    header: "کد",
    value: ["code"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "code",
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "نام",
    value: ["name"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "name",
    filterSchema: {
      operator: "contain",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "دسته بندی",
    value: ["category.name", "category.code"],
    valueSeparator: "-",
    type: ClColumnDataType.TEXT,
    colSpan: 2,
    sortBy: "category.name",
    filterSchema: {
      controlType: ClFormControlTypes.MULTISELECT,
      operator: "equal",
      options: [
        { label: "گروه 1", value: "گروه 1" },
        { label: "گروه 2", value: "گروه 2" },
        { label: "گروه 3", value: "گروه 3" },
        { label: "گروه 4", value: "گروه 4" },
        { label: "گروه 5", value: "گروه 5" },
        { label: "گروه 6", value: "گروه 6" },
      ],
    },
  },
  {
    header: "تعداد",
    value: ["count"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "count",
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "وضعیت",
    value: ["available"],
    colSpan: 1,
    sortBy: "available",
    type: ClColumnDataType.BOOLEAN,
    valueMapper: [
      new Map<any, string>().set(false, "  نا موجود").set(true, "موجود"),
    ],
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.MULTISELECT,
      options: [
        { label: "موجود", value: true },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
      ],
    },
    cellConfig: [
      { key: "available", value: true, styleClass: "green-text darken-2" },
      { key: "available", value: false, styleClass: "red-text text-accent-2" },
    ],
  },
  {
    header: "تصویر",
    value: ["img"],
    type: ClColumnDataType.ACTION,
    colSpan: 1,
    icon: "file_download",
    styleClasses: "blue-text",
  },
];

const COLS_2: ClColumn[] = [
  {
    header: "کد",
    value: ["code"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "code",
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "نام",
    value: ["name"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
    sortBy: "name",
    filterSchema: {
      operator: "contain",
      controlType: ClFormControlTypes.INPUT_TEXT,
    },
  },
  {
    header: "دسته بندی",
    value: ["category.name", "category.code"],
    valueSeparator: "-",
    type: ClColumnDataType.TEXT,
    colSpan: 2,
    sortBy: "category.name",
    filterSchema: {
      controlType: ClFormControlTypes.MULTISELECT,
      operator: "equal",
      options: [
        { label: "گروه 1", value: "گروه 1" },
        { label: "گروه 2", value: "گروه 2" },
        { label: "گروه 3", value: "گروه 3" },
        { label: "گروه 4", value: "گروه 4" },
        { label: "گروه 5", value: "گروه 5" },
        { label: "گروه 6", value: "گروه 6" },
      ],
    },
  },
  {
    header: "وضعیت",
    value: ["available"],
    colSpan: 1,
    sortBy: "available",
    type: ClColumnDataType.BOOLEAN,
    valueMapper: [
      new Map<any, string>().set(false, "  نا موجود").set(true, "موجود"),
    ],
    filterSchema: {
      operator: "equal",
      controlType: ClFormControlTypes.MULTISELECT,
      options: [
        { label: "موجود", value: true },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
        { label: "ناموجود", value: false },
      ],
    },
  },
];

const ACTIONS_COL: ClAction[] = [
  {
    label: 'توضیحات',
    icon: 'description',
    status: {
      status: false,
      on: [{ rowField: 'code', rowValue: [100] }],
    },
    command: (event) => {
      console.log(event);
    },
    styleClasses: 'yellow-text text-darken-3',
  },
  {
    label: 'مشاهده',
    icon: 'reply',
    command: (event) => {
      console.log(event);
    },
    status: {
      status: false,
      on: [{ rowField: 'code', rowValue: [100, 200] }],
    },
    styleClasses: 'blue-text',
  },
];

const PRODUCTS = [
  {
    id: "001",
    code: 100,
    name: "محصول 1",
    category: { name: "گروه 1", code: 1011 },
    count: 10,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: true,
  },
  {
    id: "002",
    code: 200,
    name: "محصول 2",
    category: { name: "گروه 2", code: 1012 },
    count: 11,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: true,
    description:
      "محصول کاملا سالم ومحصول کاملا سالم ومحصول کاملا سالم ومحصول کاملا سالم و ",
  },
  {
    id: "003",
    code: 300,
    name: "محصول 3",
    category: { name: "گروه 3", code: 1013 },
    count: 1,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "008",
    code: 900,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 5,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "011",
    code: 1200,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 100,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: true,
  },
  {
    id: "010",
    code: 1100,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 1,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "004",
    code: 400,
    name: "محصول 4",
    category: { name: "گروه 4", code: 1014 },
    count: 7,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "005",
    code: 600,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 8,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: true,
  },
  {
    id: "006",
    code: 700,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 9,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "007",
    code: 800,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    count: 22,
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: false,
  },
  {
    id: "009",
    code: 1000,
    name: "محصول 5",
    category: { name: "گروه 5", code: 1015 },
    lastYearSale: 12000,
    thisYearSale: 52000,
    available: true,
  },
];

export const Default: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `<cl-data-table [value]="data.value"
                              [cols]="data.cols"
                              [hasPaginator]="data.hasPaginator"
                              [rows]="data.rows"
                              [rowsPerPageOptions]="data.rowsPerPageOptions"
                              [selectable]="data.selectable"
                              [sortable]="data.sortable"
                              [filterable]="data.filterable"
                              [scrollVertical]="data.scrollVertical"
                              [rowExpand]="data.rowExpand"
                              [actions]="data.actions"
                              ></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS,
    hasPaginator: true,
    rows: 10,
    rowExpand: true,
    rowsPerPageOptions: [10, 25, 50],
    selectable: true,
    sortable: true,
    scrollHorizontal: true,
    scrollVertical: true,
    filterable: true,
    actions: ACTIONS_COL,
  },
};

export const Empty: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `<cl-data-table [value]="data.value" [cols]="data.cols"></cl-data-table>`,
  }),

  args: {
    value: [],
    cols: COLS_1,
  },
};

export const CustomTemplating: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
  <style>
   .topMargin{
   margin: 1rem 0;
   }
  </style>
  <div class="topMargin">
  <h3>Basic</h3>
  <cl-data-table [value]="data.value">
    <ng-template clTemplate="caption"><span>this is caption </span></ng-template>

    <ng-template clTemplate="header">
      <tr>
        <th>کد</th>
        <th>نام</th>
        <th>دسته بندی</th>
        <th>تعداد</th>
      </tr>
    </ng-template>
    <ng-template clTemplate="body" let-row="row">
      <tr>
        <td>{{row.code}}</td>
        <td>{{row.name}}</td>
        <td>{{row.category.name}}</td>
        <td>{{row.count}}</td>
      </tr>
    </ng-template>
    <ng-template clTemplate="summary"><span>this is summary</span></ng-template>

  </cl-data-table>
  </div>
  <div class="topMargin">
  <h3>rowSpan/colSpan</h3>
  <cl-data-table [value]="data.value">
    <ng-template clTemplate="header">
      <tr>
        <th rowspan="3"> محصول</th>
        <th colspan="4">نرخ تخفیف</th>
      </tr>
      <tr>
        <th colspan="2">فروش</th>
        <th colspan="2">سود</th>
      </tr>
      <tr>
        <th>سال اخر</th>
        <th>امسال</th>
        <th>سال اخر</th>
        <th>امسال</th>
      </tr>
    </ng-template>
    <ng-template clTemplate="body" let-sale="row">
      <tr>
        <td>{{sale.product}}</td>
        <td>{{sale.lastYearSale}}%</td>
        <td>{{sale.thisYearSale}}%</td>
        <td>{{sale.thisYearSale}}</td>
        <td>{{sale.lastYearSale}}</td>
      </tr>
    </ng-template>
    <ng-template clTemplate="footer">
      <tr>
        <th colspan="3">جمع</th>
        <td>-</td>
        <td>-</td>
      </tr>
    </ng-template>

  </cl-data-table>

  </div>

  <div class="topMargin">
  <h3>rowexpansion</h3>
       <cl-data-table [value]="data.value" [cols]="data.cols"  [rowExpand]="true">
       <ng-template clTemplate="rowexpansion" let-data="data">
         <span>this is rowExpansion </span>
       </ng-template>
       </cl-data-table>
  </div>
  <div class="topMargin">
  <h3>rowGroup</h3>
       <cl-data-table [value]="data.value" [cols]="data.cols" groupRowsBy="category.name">
       <ng-template clTemplate="groupheader"  let-data="data">
         <span>this is groupheader </span>
       </ng-template>
        <ng-template clTemplate="groupfooter" let-data="data">
         <span>this is groupfooter </span>
       </ng-template>
       </cl-data-table>
  </div>

  `,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
  },
};

export const Page: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `<cl-data-table [value]="data.value" [cols]="data.cols"  [hasPaginator]="data.hasPaginator" [rows]="data.rows"
          [rowsPerPageOptions]="data.rowsPerPageOptions"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    hasPaginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 25, 50],
  },
};

export const Sort: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" [sortable]="data.sortable"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    sortable: true,
  },
};

export const Selection: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" [selectable]="data.selectable"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    selectable: true,
  },
};

export const Lazy: StoryObj<ClDataTableComponent> = {
  render: (args) => {
    let dynamicValue: any[] = [];
    const getValue = () => {
      setTimeout(() => {
        dynamicValue = args.value;
      }, 2000);
    };
    getValue();
    return {
      props: {
        data: args,
        dynamicValue,
      },
      template: `
       <cl-data-table [value]="dynamicValue" [cols]="data.cols" [isLazy]="data.isLazy" [loading]="data.loading" [hasPaginator]="data.hasPaginator" [rows]="data.rows" [totalRecords]="data.totalRecords"></cl-data-table>`,
    };
  },

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    isLazy: true,
    loading: true,
    hasPaginator: true,
    rows: 20,
    totalRecords: 1000,
  },
};

export const Scroll: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
      cols_1: COLS_1,
      cols: COLS,
    },
    template: `
  <style>
   .topMargin{
   margin: 1rem 0;
   }
  </style>
       <h5 style="color:red">    در صورت فعالسازی اسکرول افقی sticky   head  غیر فعال میشود . </h5>
       <div class="topMargin">
         <cl-data-table [value]="data.value" [cols]="cols_1"></cl-data-table>
       </div>
       <div class="topMargin">
         <cl-data-table [value]="data.value" [cols]="cols"></cl-data-table>
       </div>
       <div class="topMargin">
          <h5> افقی</h5>
          <cl-data-table [value]="data.value" [cols]="cols" [scrollVertical]="data.scrollVertical"></cl-data-table>
       </div>
        <div class="topMargin">
         <h5> عمودی</h5>
         <cl-data-table [value]="data.value" [cols]="cols" [scrollVertical]="data.scrollVertical" [scrollHorizontal]="data.scrollable" scrollHeight="400px"></cl-data-table>
       </div>`,
  }),

  args: {
    value: PRODUCTS,
    scrollHorizontal: true,
    scrollVertical: true,
  },
};

export const RowExpansion: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols"  [rowExpand]="data.rowExpand"></cl-data-table>
      `,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    rowExpand: true,
  },
};

export const RowGroupSubHeader: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" groupRowsBy="category.name"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
  },
};

export const RowGroupRowSpan: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" groupRowsBy="category.name" rowGroupMode="rowspan"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
  },
};

export const NoStickyHead: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" [noStickyHead]="data.noStickyHead"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_1,
    noStickyHead: true,
  },
};

export const Filter: StoryObj<ClDataTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-data-table [value]="data.value" [cols]="data.cols" [filterable]="data.filterable"></cl-data-table>`,
  }),

  args: {
    value: PRODUCTS,
    cols: COLS_2,
    filterable: true,
  },
};
