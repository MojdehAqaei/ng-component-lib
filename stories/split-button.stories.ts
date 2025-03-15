import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import type { StoryFn, Meta } from "@storybook/angular";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { ClSplitButtonComponent } from "@sadad/component-lib/src/lib/split-button";

export default {
  title: "Components/Button/SplitButton",
  component: ClSplitButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClButtonComponent],
    }),
  ],
} as Meta;

const Template: StoryFn<ClSplitButtonComponent> = (
  args,
) => ({
  props: args,
});

export const Default = {
  render: Template,

  args: {
    label: "ثبت",
    icon: "check",
    actions: [
      { label: "update", icon: "update" },
      { label: "delete", icon: "delete" },
      { label: "print", icon: "print" },
    ],
  },
};

export const WarningType = {
  render: Template,

  args: {
    label: "ثبت",
    type: "warning",
    icon: "check",
    actions: [
      { label: "update", icon: "update" },
      { label: "delete", icon: "delete" },
      { label: "print", icon: "print" },
    ],
  },
};

export const Outlined = {
  render: Template,

  args: {
    label: "ثبت",
    outlined: true,
    icon: "check",
    actions: [
      { label: "update", icon: "update" },
      { label: "delete", icon: "delete" },
      { label: "print", icon: "print" },
    ],
  },
};

export const LabelClickable = {
  render: Template,

  args: {
    label: "ثبت",
    labelClickable: true,
    icon: "check",
    actions: [
      { label: "update", icon: "update" },
      { label: "delete", icon: "delete" },
      { label: "print", icon: "print" },
    ],
  },
};

export const Disabled = {
  render: Template,

  args: {
    label: "ثبت",
    icon: "check"
  },
};
