import {ClLinkComponent} from "@sadad/component-lib/src/lib/link";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

export default {
  title: "Components/Misc/Link",
  component: ClLinkComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
  args: {},
} as Meta;

type Story = StoryObj<ClLinkComponent>;

export const defaultLink: Story = {
  render: () => ({
    props: {
      href: "https://www.w3schools.com/html/html_links.asp",
      title: "HTML Links",
      target: "_blank",
    },
    template: `<cl-link [href]="href" [title]="title" [target]="target"></cl-link>`,
  }),
};

export const imageLink: Story = {
  render: () => ({
    props: {
      href: "https://www.google.com/",
      title: "google search",
      target: "_self",
      imageSrc: "/google.png",
    },
    template: `<cl-link [href]="href" [title]="title" [target]="target" [imageSrc]="imageSrc"></cl-link>`,
  }),
};

export const iconLink: Story = {
  render: () => ({
    props: {
      href: "https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FCirclonGroup%2Fangular-tree-component%2Fissues%2F33",
      title: "git login",
      target: "_blank",
      icon: "account_box",
    },
    template: `<cl-link [href]="href" [title]="title" [target]="target" [icon]="icon"></cl-link>`,
  }),
};

export const colorLink: Story = {
  render: () => ({
    props: {
      href: "https://www.time.ir/",
      title: " سایت time.ir ",
      target: "_parent",
      color: "success",
    },
    template: `<cl-link [href]="href" [title]="title" [target]="target" [color]="color"></cl-link>`,
  }),
};

export const underlineLink: Story = {
  render: () => ({
    props: {
      href: "https://www.w3schools.com/",
      title: "مطالب آموزشی",
      target: "_parent",
      underline: "hover",
    },
    template: `<cl-link [href]="href" [title]="title" [target]="target" [underline]="underline"></cl-link>`,
  }),
};
