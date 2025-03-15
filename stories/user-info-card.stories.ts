import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClUserInfoCardComponent } from "@sadad/component-lib/src/lib/user-info-card";
import { ClDialogComponent } from "@sadad/component-lib/src/lib/dialog";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: "Components/Panel/UserInfoCard",
  decorators: [
    moduleMetadata({
      imports: [
        ClUserInfoCardComponent,
        ClDialogComponent,
        ClTemplateDirective,
        ClButtonComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const Default: StoryObj<ClUserInfoCardComponent> = {
  render: (args) => ({
    props: {
      lastName: args.lastName,
      firstName: args.firstName,
    },
    template: `
  <cl-user-info-card [firstName]="firstName" [lastName]="lastName" [loading]="loading"></cl-user-info-card>
  `,
  }),

  args: {
    firstName: "کاربر",
    lastName: "تست",
  },
};

export const withSkeleton: StoryObj<ClUserInfoCardComponent> = {
  render: (args) => ({
    props: {
      loading: args.loading,
      lastName: args.lastName,
      firstName: args.firstName,
    },
    template: `
  <cl-user-info-card [firstName]="firstName" [lastName]="lastName" [loading]="loading"></cl-user-info-card>
  `,
  }),

  args: {
    loading: true,
    firstName: "کاربر",
    lastName: "تست",
  },
};
