import {ClSideMenuComponent} from "@sadad/component-lib/src/lib/side-menu";
import {ClMenuItem} from "@sadad/component-lib/src/models";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

const data: ClMenuItem[] = [
  {
    label: "کاربران",
    icon: "people",
    items: [
      {
        label: "جدید",
        icon: "add",
      },
      {
        label: "حذف",
        icon: "remove",
      },
      {
        label: "جستجو",
        icon: "people",
        items: [
          {
            label: "چاپ",
            icon: "print",
          },
          {
            icon: "list",
            label: "لیست",
          },
        ],
      },
    ],
  },
  {
    label: "گزارشات",
    icon: "analytics",
    items: [
      {
        label: "گزارش مدیریتی",
        icon: "pie_chart",
      },
      {
        label: "گزارش تغییرات",
        icon: "poll",
      },
    ],
  },
  {
    label: "فعالیت های پایه",
    icon: "event",
  },
  {
    label: "مستندات",
    icon: "task",
    items: [
      {
        label: "جدید",
        icon: "add",
        items: [
          {
            label: "بوک مارک",
            icon: "bookmark",
          },
          {
            label: "ویدئو",
            icon: "play_arrow",
          },
        ],
      },
      {
        label: "حذف",
        icon: "remove",
        items: [
          {
            label: "بوک مارک",
            icon: "bookmark",
          },
          {
            label: "ویدئو",
            icon: "play_arrow",
          },
        ],
      },
    ],
    // command:(event)=>{
    //   this.itemClicked(event);
    // }
  },
];

export default {
  title: "Components/Menu/SideMenu",
  component: ClSideMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        RouterTestingModule,
        RouterModule.forChild([]),
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
  args: {
    menu: data,
  },
} as Meta;

type Story = StoryObj<ClSideMenuComponent>;

export const Open: Story = {
  render: () => ({
    props: {
      openMenu: true,
      menu: data,
    },
    template: `
    <cl-side-menu [menu]="menu" [openMenu]="openMenu" ></cl-side-menu>
  `,
  }),
};

export const OpenOnHover: Story = {
  render: () => ({
    props: {
      showIconsOnClose: true,
      openOnHover: true,
      menu: data,
    },
    template: `
      <cl-side-menu [menu]="menu" [openOnHover]="openOnHover" [showIconsOnClose]="displayIconsOnHide" ></cl-side-menu>
`,
  }),
};

export const MultipleExpanded: Story = {
  render: () => ({
    props: {
      openMenu: true,
      multipleExpanded: true,
      menu: data,
    },
    template: `
      <cl-side-menu [menu]="menu" [openMenu]="openMenu" [multipleExpanded]="multipleExpanded" ></cl-side-menu>
`,
  }),
};

export const HideAllMenu: Story = {
  render: () => ({
    props: {
      displayIconsOnHide: false,
      showIconsOnClose: false,
      menu: data,
    },
    template: `
    <button (click)="displayMenu = true">open/close</button>
    <cl-side-menu [menu]="menu" [showIconsOnClose]="displayIconsOnHide" [(openMenu)]="displayMenu"></cl-side-menu>
`,
  }),
};

export const WithLogo: Story = {
  render: () => ({
    props: {
      openMenu: false,
      menu: data,
      logoSrc: "/logo/png",
    },
    template: `
    <cl-side-menu [menu]="menu" [logoSrc]="logoSrc" [openMenu]="openMenu" ></cl-side-menu>
  `,
  }),
};
