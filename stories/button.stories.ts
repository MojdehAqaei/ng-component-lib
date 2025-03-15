import { Meta, StoryFn } from "@storybook/angular";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";

export default {
  title: "Components/Button/Button",
  component: ClButtonComponent,
  args: {
    icon: "check",
    label: "کلیک کنید",
  },
} as Meta;

const Template: StoryFn<ClButtonComponent> = (args) => ({
  props: args,
});

export const Type = {
  render: Template,

  args: {
    type: "secondary",
  },
};

export const IconOnly = {
  render: Template,

  args: {
    label: "",
  },
};

export const Disabled = {
  render: Template,

  args: {
    disabled: true,
  },
};

export const SmallSize = {
  render: Template,

  args: {
    size: "sm",
  },
};

export const LargeSize = {
  render: Template,

  args: {
    size: "lg",
  },
};

export const loadingMode = {
  render: Template,

  args: {
    loading: true,
  },
};

export const IconLeft = {
  render: Template,

  args: {
    iconPosition: "left",
  },
};

export const Rounded = {
  render: Template,

  args: {
    rounded: true,
  },
};

export const Outlined = {
  render: Template,

  args: {
    outlined: true,
  },
};
