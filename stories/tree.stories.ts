import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { ClTreeComponent } from '@sadad/component-lib/src/lib/tree';
import { ClMenuItem, ClTreeNode } from '@sadad/component-lib/src/models';
import { ClContextMenuComponent } from '@sadad/component-lib/src/lib/context-menu';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

const data_1: ClTreeNode<string>[] = [
  {
    label: 'اسناد',
    data: 'Documents Folder',
    icon: 'folder_open',
    children: [
      {
        label: 'doc',
        icon: 'note',
        leaf: true,
        data: 'Document',
      },
      {
        label: 'محل کار',
        data: 'Work Folder',
        icon: 'work',
        children: [
          {
            label: 'مخارج.doc',
            icon: 'note',
            data: 'Expenses Document',
          },
          {
            label: 'رزومه.doc',
            icon: 'note',
            data: 'Resume Document',
          },
        ],
      },
      {
        label: 'خانه',
        data: 'Home Folder',
        icon: 'home',
        children: [
          {
            label: 'فاکتور.txt',
            icon: 'note',
            data: 'Invoices for this month',
          },
        ],
      },
    ],
  },
  {
    label: 'عکس ها',
    data: 'Pictures Folder',
    icon: 'perm_media',
    children: [
      {
        label: 'barcelona.jpg',
        icon: 'image',
        data: 'Barcelona Photo',
        leaf: true,
      },
      { label: 'logo.jpg', icon: 'image', data: 'PrimeFaces Logo', leaf: true },
      { label: 'primeui.png', icon: 'image', data: 'PrimeUI Logo', leaf: true },
    ],
  },
  {
    label: 'فیلم ها',
    data: 'Movies Folder',
    icon: 'live_tv',
    children: [
      {
        label: 'ال پاچینو',
        data: 'Pacino Movies',
        children: [
          {
            label: 'Scarface',
            icon: 'movie',
            data: 'Scarface Movie',
            leaf: true,
          },
          {
            label: 'Serpico',
            icon: 'movie',
            data: 'Serpico Movie',
            leaf: true,
          },
        ],
      },
      {
        label: 'رابرت دنیرو',
        data: 'De Niro Movies',
        children: [
          {
            label: 'Goodfellas',
            icon: 'movie',
            data: 'Goodfellas Movie',
            leaf: true,
          },
          {
            label: 'Untouchables',
            icon: 'movie',
            data: 'Untouchables Movie',
            leaf: true,
          },
        ],
      },
    ],
  },
];
const data_2: ClTreeNode<any>[] = [
  {
    label: 'اسناد',
    data: { id: 'Documents Folder' },
    icon: 'folder_open',
    children: [
      {
        label: 'محل کار',
        data: { id: 'Work Folder' },
        icon: 'work',
        children: [
          {
            label: 'مخارج.doc',
            icon: 'note',
            data: { id: 'Expenses Document' },
            leaf: true,
            disabled: true,
          },
          {
            label: 'رزومه.doc',
            icon: 'note',
            data: { id: 'Resume Document' },
            leaf: true,
            disabled: true,
          },
        ],
      },
      {
        label: 'خانه',
        data: { id: 'Home Folder' },
        icon: 'home',
        children: [
          {
            label: 'فاکتور.txt',
            icon: 'note',
            data: { id: 'Invoices for this month' },
            leaf: true,
          },
        ],
      },
    ],
  },
  {
    label: 'عکس ها',
    data: { id: 'Pictures Folder' },
    icon: 'perm_media',
    children: [
      {
        label: 'barcelona.jpg',
        icon: 'image',
        data: { id: 'Barcelona Photo' },
        leaf: true,
      },
      {
        label: 'logo.jpg',
        icon: 'image',
        data: { id: 'PrimeFaces Logo' },
        leaf: true,
      },
      {
        label: 'primeui.png',
        icon: 'image',
        data: { id: 'PrimeUI Logo' },
        leaf: true,
      },
    ],
  },
  {
    label: 'فیلم ها',
    data: { id: 'Movies Folder' },
    icon: 'live_tv',
    children: [
      {
        label: 'ال پاچینو',
        data: 'Pacino Movies',
        children: [
          {
            label: 'Scarface',
            icon: 'movie',
            data: { id: 'Scarface Movie' },
            leaf: true,
          },
          {
            label: 'Serpico',
            icon: 'movie',
            data: { id: 'Serpico Movie' },
            leaf: true,
          },
        ],
      },
      {
        label: 'رابرت دنیرو',
        data: { id: 'De Niro Movies' },
        children: [
          {
            label: 'Goodfellas',
            icon: 'movie',
            data: { id: 'Goodfellas Movie' },
            leaf: true,
          },
          {
            label: 'Untouchables',
            icon: 'movie',
            data: { id: 'Untouchables Movie' },
            leaf: true,
          },
        ],
      },
    ],
  },
];
const data_3: ClTreeNode<any>[] = [
  {
    label: 'اسناد',
    data: { id: 'Documents Folder' },
    icon: 'folder_open',
    badgeType: 'error',
    badgeLabel: 'غیرفعال',
    children: [
      {
        label: 'محل کار',
        data: { id: 'Work Folder' },
        icon: 'work',
        children: [
          {
            label: 'مخارج.doc',
            icon: 'note',
            data: { id: 'Expenses Document' },
            leaf: true,
            disabled: true,
            badgeType: 'success',
            badgeLabel: 'جدید',
          },
          {
            label: 'رزومه.doc',
            icon: 'note',
            data: { id: 'Resume Document' },
            leaf: true,
            disabled: true,
          },
        ],
      },
      {
        label: 'خانه',
        data: { id: 'Home Folder' },
        icon: 'home',
        children: [
          {
            label: 'فاکتور.txt',
            icon: 'note',
            data: { id: 'Invoices for this month' },
            leaf: true,
          },
        ],
      },
    ],
  },
];

export default {
  title: 'Components/Data/Tree',
  component: ClTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [ClContextMenuComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
} as Meta;

export const Default: StoryObj<ClTreeComponent> = {
  render: (args) => ({
    props: {
      data: args.data,
    },
    template: ` <cl-tree [data]="data"></cl-tree> `,
  }),

  args: {
    data: data_1,
  },
};

export const SingleSelect: StoryObj<ClTreeComponent> = {
  render: (args) => {
    return {
      props: {
        data: args.data,
        selectable: args.selectable,
        selectNode: null,
      },
      template: `
          <cl-tree [data]="data" [loading]="loading" [selectable]="selectable" [(selection)]="selectNode" ></cl-tree>
          <br>
          <div style="margin-top: 20px">
              <p style="white-space: pre">نود انتخاب شده : {{ selectNode | json }}</p>
          </div>
          `,
    };
  },

  args: {
    data: data_1,
    selectable: true,
  },
};

export const MultipleSelect: StoryObj<ClTreeComponent> = {
  render: (args) => {
    return {
      props: {
        data: args.data,
        selectable: args.selectable,
        selectionMode: args.selectionMode,
        selectNode: null,
      },
      template: `
          <cl-tree [data]="data" [loading]="loading" [selectable]="selectable" #tree [selectionMode]="selectionMode" [(selection)]="selectNode" ></cl-tree>
          <br>
          <button (click)="tree.selectAll()">select all</button>
          <div style="margin-top: 20px">
              <p style="white-space: pre">نود انتخاب شده : {{ selectNode | json }}</p>
          </div>
          `,
    };
  },

  args: {
    data: data_1,
    selectable: true,
    selectionMode: 'multiple',
  },
};

export const MultipleSelectWithDataKey: StoryObj<ClTreeComponent> = {
  render: (args) => {
    return {
      props: {
        data: args.data,
        selectable: args.selectable,
        selectionMode: args.selectionMode,
        dataKey: args.dataKey,
        selectNode: args.selection,
      },
      template: `
          <cl-tree [data]="data" [loading]="loading" [dataKey]="dataKey" [selectable]="selectable" [selectionMode]="selectionMode" [(selection)]="selectNode" ></cl-tree>
          <br>
          <div style="margin-top: 20px">
              <p style="white-space: pre">نود انتخاب شده : {{ selectNode | json }}</p>
          </div>
          `,
    };
  },

  args: {
    data: data_2,
    selectable: true,
    selection: [
      'Expenses Document',
      'Barcelona Photo',
      'PrimeFaces Logo',
      'PrimeUI Logo',
    ],
    selectionMode: 'multiple',
    dataKey: 'id',
  },
};

export const Filtering: StoryObj<ClTreeComponent> = {
  render: (args) => ({
    props: {
      data: args.data,
      loading: args.loading,
      filter: args.filterable,
      selectable: args.selectable,
    },
    template: `
      <cl-tree [data]="data" [loading]="loading" [filterable]="filter"></cl-tree>
      <br>
      `,
  }),

  args: {
    data: data_1,
    selectable: false,
    loading: false,
    filterable: true,
  },
};

export const Contextmenu: StoryObj<ClTreeComponent> = {
  render: (args) => {
    const contextData: ClMenuItem[] = [
      {
        label: 'نمایش',
        icon: 'view_list',
        command: (event) => {
          itemClicked(event);
        },
      },
      {
        label: 'عدم انتخاب',
        icon: 'clear',
        command: (event) => {
          itemClicked(event);
        },
      },
    ];

    let treeNode: any;

    const itemClicked = (event: any) => {
      console.log('clicked!');
      action('click on menu')();
      return JSON.stringify(event);
    };

    return {
      props: {
        data: args.data,
        selectable: args.selectable,
        selection: args.selection,
        list: contextData,
      },
      template: `
          <cl-tree [data]="data" #treeRef [selectable]="selectable" [selection]="selection"></cl-tree>
          <cl-context-menu [list]="list" [appendTo]="treeRef" [isRtl]="true"></cl-context-menu>
          `,
    };
  },

  args: {
    data: data_1,
    selectable: true,
    selection: data_1[0].data,
  },
};

export const withLoading: StoryObj<ClTreeComponent> = {
  render: (args) => ({
    props: {
      data: [],
      loading: args.loading,
      filter: args.filterable,
      selectable: args.selectable,
      selectNode: args.selection,
    },
    template: `
      <cl-tree [data]="data" [loading]="loading" [filterable]="filter"></cl-tree>
      <br>
      `,
  }),

  args: {
    selectable: false,
    selection: data_1[0],
    loading: true,
    filterable: false,
  },
};

export const withLabelBadge: StoryObj<ClTreeComponent> = {
  render: (args) => ({
    props: {
      data: data_3,
    },
    template: `
      <cl-tree [data]="data"/>`,
  }),
};
