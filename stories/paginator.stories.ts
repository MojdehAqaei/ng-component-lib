import { ClPaginatorComponent } from "@sadad/component-lib/src/lib/paginator";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { HttpClientModule } from "@angular/common/http";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { CommonModule } from "@angular/common";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Data/Paginator",
  component: ClPaginatorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClSelectComponent],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

type Story = StoryObj<ClPaginatorComponent>;

export const TotalRecordsLessThanRows: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 10,
      totalRecords: 2,
    },
    template: `<cl-paginator  [rows]="rows"  [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const AlwaysShowPaginatorIsTrue: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 20,
      totalRecords: 11,
      alwaysShow: true,
    },
    template: `<cl-paginator  [rows]="rows" [alwaysShow]="alwaysShow"  [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const TotalRecordsMoreThanRows: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 10,
      totalRecords: 125,
    },
    template: `<cl-paginator   [rows]="rows"  [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const SetPageLinkSize: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 20,
      pageLinkSize: 3,
      totalRecords: 120,
    },
    template: `<cl-paginator   [rows]="rows"  [pageLinkSize]="pageLinkSize"  [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const pageCountIsLessThanPageLinkSize: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 20,
      pageLinkSize: 8,
      totalRecords: 120,
    },
    template: `<cl-paginator   [rows]="rows"  [pageLinkSize]="pageLinkSize"  [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const SetFirstRowToShow: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      rows: 10,
      first: 11,
      totalRecords: 120,
    },
    template: `<cl-paginator  [first]="first" [rows]="rows"     [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const ShowRowSelection: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      showRowSelection: true,
      totalRecords: 120,
    },
    template: `<cl-paginator  [showRowSelection]="showRowSelection" [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};

export const CustomRowSelection: Story = {
  render: () => ({
    component: ClPaginatorComponent,
    props: {
      showRowSelection: true,
      rowsPerPageOptions: [12, 31, 51],
      totalRecords: 120,
    },
    template: `<cl-paginator  [rowsPerPageOptions]="rowsPerPageOptions" [showRowSelection]="showRowSelection"     [totalRecords]="totalRecords"></cl-paginator>`,
  }),
};
