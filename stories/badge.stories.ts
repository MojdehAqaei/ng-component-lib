import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClBadgeDirective } from "@sadad/component-lib/src/lib/badge";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Misc/Badge",
  decorators: [
    moduleMetadata({
      imports: [ClBadgeDirective],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
  args: {},
} as Meta;

export const withIcon: StoryObj<ClBadgeDirective> = {
  render: (args) => ({
    props: {
      type: args.badgeType,
      label: args.badgeLabel,
    },
    template: `
      <i class="material-icons" clBadge [badgeType]="type" [badgeLabel]="label">archive</i>
      `,
  }),

  args: {
    badgeType: "info",
    badgeLabel: "10",
  },
};

export const withLable: StoryObj<ClBadgeDirective> = {
  render: (args) => ({
    props: {
      type: args.badgeType,
      label: args.badgeLabel,
    },
    template: `
      <label clBadge [badgeType]="type" [badgeLabel]="label">archive label</label>
      `,
  }),

  args: {
    badgeType: "warning",
    badgeLabel: "la",
  },
};

export const withPosition: StoryObj<ClBadgeDirective> = {
  render: (args) => ({
    props: {
      type: args.badgeType,
      label: args.badgeLabel,
      position: args.badgePosition,
    },
    template: `
      <button style="margin:15px" clBadge [type]="type" [badgeLabel]="label" [badgePosition]="position">click here</button>
      `,
  }),

  args: {
    badgeType: "success",
    badgeLabel: "<<",
    badgePosition: "right",
  },
};
