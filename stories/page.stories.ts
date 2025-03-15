import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { ClPageComponent } from "@sadad/component-lib/src/lib/page";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

export default {
  title: "Components/Panel/Page",
  decorators: [
    moduleMetadata({
      imports: [ClPageComponent, HttpClientModule, RouterTestingModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
  args: {},
} as Meta;

type Story = StoryObj<ClPageComponent>;

export const empty: Story = {
  render: () => ({
    props: {
      type: "empty",
    },
    template: `
    <cl-page [type]="type"></cl-page>
    `,
  }),
};

export const error: Story = {
  render: () => ({
    props: {
      type: "error",
    },
    template: `
    <cl-page [type]="type"></cl-page>
    `,
  }),
};

export const notFound: Story = {
  render: () => ({
    props: {
      type: "not found",
    },
    template: `
    <cl-page [type]="type"></cl-page>
    `,
  }),
};

export const accessDenied: Story = {
  render: () => ({
    props: {
      type: "access denied",
    },
    template: `
    <cl-page [type]="type"></cl-page>
    `,
  }),
};

export const loading: Story = {
  render: () => ({
    props: {
      type: "loading",
    },
    template: `
    <cl-page [type]="type"></cl-page>
    `,
  }),
};
