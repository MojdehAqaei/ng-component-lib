import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClTreeTableComponent } from "@sadad/component-lib/src/lib/tree-table";
import { CommonModule } from "@angular/common";
import { ClColumn, ClColumnDataType } from "@sadad/component-lib/src/models";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClCheckboxComponent } from "@sadad/component-lib/src/lib/checkbox";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { ClPaginatorComponent } from "@sadad/component-lib/src/lib/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Data/TreeTable",
  component: ClTreeTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        HttpClientModule,
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

const PRODUCTS = [
  {
    data: { id: "001", title: "برقی", code: "3T55DL" },
    children: [
      {
        data: {
          id: "002",
          title: "اتو",
          code: "3T55DL1",
          count: 0,
          available: false,
        },
      },
      {
        data: { id: "003", title: "چای ساز", code: "3T55DL2" },
        children: [
          {
            data: {
              id: "004",
              title: "چای ساز AGR",
              code: "3T55DL21",
              count: 12,
              available: true,
            },
          },
          {
            data: {
              id: "005",
              title: "چای ساز",
              code: "3T55DL22",
              count: 13,
              available: true,
            },
          },
        ],
      },
      {
        data: { id: "006", title: "غذاساز", code: "3T55DL" },
        children: [
          {
            data: {
              id: "007",
              title: "غذا سازBOSH ",
              code: "3T55DL",
              count: 0,
              available: false,
            },
          },
        ],
      },
    ],
  },
  {
    data: { id: "008", title: "چوب", code: "3T55DM" },
    children: [
      {
        data: {
          id: "009",
          title: "تخت",
          code: "3T55DM1",
          count: 1,
          available: true,
        },
      },
      {
        data: {
          id: "010",
          title: "مبلمان",
          code: "3T55DM2",
          count: 2,
          available: true,
        },
      },
      {
        data: {
          id: "011",
          title: "کمد",
          code: "3T55DM3",
          count: 1,
          available: true,
        },
      },
    ],
  },
];
const COLS: ClColumn[] = [
  {
    header: "کد",
    value: ["code"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
  },
  {
    header: "نام",
    value: ["title"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
  },
  {
    header: "تعداد",
    value: ["count"],
    type: ClColumnDataType.TEXT,
    colSpan: 1,
  },
  {
    header: "وضعیت",
    value: ["available"],
    colSpan: 1,
    type: ClColumnDataType.BOOLEAN,
    valueMapper: [
      new Map<any, string>().set(false, "  نا موجود").set(true, "موجود"),
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
  {
    header: "ویرایش",
    value: ["edit"],
    type: ClColumnDataType.ACTION,
    colSpan: 1,
    icon: "edit",
    styleClasses: "blue-text text-darken-3",
  },
];

export const Empty: StoryObj<ClTreeTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `<cl-tree-table [data]="data.data" [cols]="data.cols"></cl-tree-table>`,
  }),

  args: {
    data: [],
    cols: COLS,
  },
};

export const Page: StoryObj<ClTreeTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `<cl-tree-table [data]="data.data" [cols]="data.cols"
                              [totalRecords]="data.totalRecords"
                              [hasPaginator]="data.hasPaginator" [rows]="data.rows"
                              [rowsPerPageOptions]="data.rowsPerPageOptions"></cl-tree-table>`,
  }),

  args: {
    data: PRODUCTS,
    totalRecords: PRODUCTS?.length,
    cols: COLS,
    hasPaginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 25, 50],
  },
};

export const Selection: StoryObj<ClTreeTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-tree-table [data]="data.data" [cols]="data.cols"   [totalRecords]="data.totalRecords"[selectable]="data.selectable"></cl-tree-table>`,
  }),

  args: {
    data: PRODUCTS,
    totalRecords: PRODUCTS?.length,
    cols: COLS,
    selectable: true,
  },
};

export const Scroll: StoryObj<ClTreeTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
      COLS: COLS,
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
         <cl-tree-table [data]="data.data" [cols]="COLS"></cl-tree-table>
       </div>
       <div class="topMargin">
         <cl-tree-table [data]="data.data" [cols]="cols"></cl-tree-table>
       </div>
       <div class="topMargin">
          <h5> افقی</h5>
          <cl-tree-table [data]="data.data" [cols]="cols" [scrollVertical]="data.scrollVertical"></cl-tree-table>
       </div>
        <div class="topMargin">
         <h5> عمودی</h5>
         <cl-tree-table [data]="data.data" [cols]="cols" [scrollVertical]="data.scrollVertical" [scrollHorizontal]="data.scrollable" scrollHeight="400px"></cl-tree-table>
       </div>`,
  }),

  args: {
    data: PRODUCTS,
    scrollHorizontal: true,
    scrollVertical: true,
  },
};

export const NoStickyHead: StoryObj<ClTreeTableComponent> = {
  render: (args) => ({
    props: {
      data: args,
    },
    template: `
       <cl-tree-table [data]="data.data" [cols]="data.cols" [totalRecords]="data.totalRecords" [noStickyHead]="data.noStickyHead"></cl-tree-table>`,
  }),

  args: {
    data: PRODUCTS,
    totalRecords: PRODUCTS?.length,
    cols: COLS,
    noStickyHead: true,
  },
};
