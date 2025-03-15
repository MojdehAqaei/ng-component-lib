import { ClToolbarComponent } from "@sadad/component-lib/src/lib/toolbar";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { ClSplitButtonComponent } from "@sadad/component-lib/src/lib/split-button";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ClAvatarComponent } from "@sadad/component-lib/src/lib/avatar";
import { action } from "@storybook/addon-actions";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: "Components/Panel/Toolbar",
  component: ClToolbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClButtonComponent,
        ClSplitButtonComponent,
        ClTemplateDirective,
        ClAvatarComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const Default: StoryObj<ClToolbarComponent> = {
  render: () => ({
    props: {
      data: [
        {
          items: [
            {
              type: "button",
              label: "جدید",
              icon: "add",
              command: (event: any) => action("clicked")(event),
            },
            {
              type: "button",
              label: "آپلود",
              icon: "upload",
              buttonType: "success",
              command: (event: any) => action("clicked")(event),
            },
            {
              type: "icon",
              icon: "menu",
              command: (event: any) => action("clicked")(event),
            },
          ],
          direction: "start",
        },
        {
          items: [
            {
              type: "avatar",
              icon: "person",
              command: (event: any) => action("person avatar clicked")(event),
            },
            {
              type: "text",
              label: "نام کاربر",
              command: (event: any) => action("username clicked")(event),
            },
          ],
          direction: "center",
        },
        {
          items: [
            {
              type: "button",
              icon: "close",
              tooltip: "بستن",
              command: (event: any) => action("clicked")(event),
            },
            {
              type: "button",
              icon: "calendar_today",
              buttonType: "success",
              tooltip: "تقویم",
              command: (event: any) => action("clicked")(event),
            },
            {
              type: "button",
              icon: "search",
              buttonType: "danger",
              tooltip: "جستجو",
              command: (event: any) => action("clicked")(event),
            },
          ],
          direction: "end",
        },
      ],
    },
    template: `
     <style>
       .cl-toolbar {
         .cl-toolbar-items{
            margin: 0 3px;
         }
       }

     </style>
     <cl-toolbar [actions]="data" ></cl-toolbar>
     `,
  }),
};

export const withTemplate: StoryObj<ClToolbarComponent> = {
  render: (args) => ({
    props: args,
    template: `

          <cl-toolbar>

            <ng-template clTemplate="start">
              <cl-button label="جدید" icon="add" size="sm" style="margin: 0 3px;"></cl-button>
              <cl-button label="آپلود" icon="upload" type="success" size="sm" style="margin: 0 3px;"></cl-button>
              <i class="material-icons" style="margin:0 3px;">menu</i>
              <cl-split-button label="ذخیره" icon="check" type="warning" style="margin: 0 3px;"></cl-split-button>
            </ng-template>

            <ng-template clTemplate="center">
              <cl-avatar shape="square" type="img" value="/user.png" style="margin: 0 3px;"></cl-avatar>
              <span style="margin: 0 3px;">نام کاربر</span>
            </ng-template>

            <ng-template clTemplate="end">
              <cl-button icon="close" size="sm" style="margin:0 3px;"></cl-button>
              <cl-button icon="calendar_today" type="success" size="sm" style="margin:0 3px;"></cl-button>
              <cl-button icon="search" type="danger" size="sm" style="margin: 0 3px;"></cl-button>
            </ng-template>

          </cl-toolbar>
    `,
  }),
};
