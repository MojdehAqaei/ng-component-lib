import {StoryObj, Meta, moduleMetadata} from "@storybook/angular";
import { ClContextMenuComponent } from "@sadad/component-lib/src/lib/context-menu";
import { ClMenuItem } from "@sadad/component-lib/src/models";

export default {
  title: "Components/Menu/ContextMenu",
  decorators: [
    moduleMetadata({
      imports: [ClContextMenuComponent],
    }),
  ],
  args: {},
} as Meta;

const data: ClMenuItem[] = [
  {
    label: "فایل",
    icon: "folder",
    items: [
      {
        label: "جدید",
        icon: "new_releases",
        items: [
          {
            label: "بوک مارک",
            icon: "bookmark",
          },
          {
            label: "ویدئو",
            icon: "videocam",
          },
        ],
      },
      {
        label: "حذف",
        icon: "delete",
      },
      {
        label: "گسترش",
        icon: "folder_open",
      },
    ],
    // command:(event)=>{
    //   this.itemClicked(event);
    // }
  },
  {
    label: "ویرایش",
    icon: "edit",
    items: [
      {
        label: "چپ",
        icon: "format_align_left",
      },
      {
        label: "راست",
        icon: "format_align_right",
      },
      {
        label: "مرکز",
        icon: "format_align_center",
      },
      {
        label: "افقی",
        icon: "graphic_eq",
      },
    ],
  },
  {
    label: "کاربران",
    icon: "person",
    items: [
      {
        label: "جدید",
        icon: "person_add",
      },
      {
        label: "حذف",
        icon: "person_remove",
      },
      {
        label: "جستجو",
        icon: "search",
        items: [
          {
            label: "فیلتر",
            icon: "filter",
            items: [
              {
                label: "چاپ",
                icon: "print",
              },
            ],
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
    label: "رویدادها",
    icon: "event",
    items: [
      {
        label: "ویرایش",
        icon: "edit",
        items: [
          {
            label: "ذخیره",
            icon: "save",
          },
          {
            label: "حذف",
            icon: "delete",
          },
        ],
      },
      {
        label: "آرشیو",
        icon: "archive",
        items: [
          {
            label: "حذف",
            icon: "delete",
          },
        ],
      },
    ],
  },
];

export const withDiv: StoryObj<ClContextMenuComponent> = {
  render: (args) => ({
    props: {
      list: args.list,
      isRtl: args.isRtl,
    },
    template: `
      <div #mydiv>Right click here<div>
      <cl-context-menu [list]="list" [appendTo]="mydiv" [isRtl]="isRtl"></cl-context-menu>
      `,
  }),

  args: {
    list: data,
    isRtl: true,
  },
};

export const withImage: StoryObj<ClContextMenuComponent> = {
  render: (args) => ({
    props: {
      list: args.list,
      isRtl: args.isRtl,
    },
    template: `
      <img src="/tree.jpg" #image/>
      <cl-context-menu [list]="list" [appendTo]="image" [isRtl]="isRtl"></cl-context-menu>
      `,
  }),

  args: {
    list: data,
    isRtl: true,
  },
};

export const withList: StoryObj<ClContextMenuComponent> = {
  render: (args) => ({
    props: {
      list: args.list,
      isRtl: args.isRtl,
    },
    template: `
      <ul>
        <li>آیتم 1</li>
        <li>آیتم 2</li>
        <li #li3>آیتم 3</li>
        <li>آیتم 4</li>
        <li>آیتم 5</li>
      </ul>
      <cl-context-menu [list]="list" [appendTo]="li3" [isRtl]="isRtl"></cl-context-menu>
      `,
  }),

  args: {
    list: data,
    isRtl: true,
  },
};
