import type {Meta, StoryFn} from "@storybook/angular";
import {applicationConfig, moduleMetadata} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {ClAvatarComponent} from "@sadad/component-lib/src/lib/avatar";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

export default {
  title: "Components/Misc/Avatar",
  component: ClAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom([HttpClientModule])
      ]
    })
  ],
} as Meta;

const Template: StoryFn<ClAvatarComponent> = (args) => ({
  props: args,
});

export const ByLabel = {
  render: Template,

  args: {
    value: "تست",
  },
};

export const ByIcon = {
  render: Template,

  args: {
    type: "icon",
    value: "person",
  },
};

export const ByImage = {
  render: Template,

  args: {
    value: "/user.png",
    size: "lg",
    shape: "circle",
    type: "img",
  },
};
