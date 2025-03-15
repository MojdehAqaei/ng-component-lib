import type { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ClTooltipDirective } from '@sadad/component-lib/src/lib/tooltip';
import { ClHeaderComponent } from '@sadad/component-lib/src/lib/header';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Components/Panel/Header',
  component: ClHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClTooltipDirective,
        HttpClientModule,
        RouterTestingModule,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    toggleMenu: { action: 'clicked on toggleMenu' },
  },
} as Meta;

const Template: StoryFn<ClHeaderComponent> = (args) => ({
  props: args,
});

export const Default: StoryObj<ClHeaderComponent> = {
  render: () => ({
    props: {
      appTitle: 'سامانه بانک ملی ',
      logoSrc: '/logo.png',
      icons: [
        {
          type: 'icon',
          icon: 'help',
          tooltip: 'راهنما',
          command: (event: any) => action('clicked')(event),
        },
        {
          type: 'icon',
          icon: 'notifications_active ',
          tooltip: 'هشدار ها',
          command: (event: any) => action('notification icon clicked')(event),
        },
        {
          type: 'avatar',
          icon: 'person',
          command: (event: any) => action('person avatar clicked')(event),
        },
        {
          type: 'text',
          label: 'کاربر تستی',
          command: (event: any) => action('username clicked')(event),
        },
      ],
      template: `<cl-header  [appTitle]="appTitle" [logoSrc]="logoSrc" [icons]="icons"/>`,
    },
  }),
};

export const CustomTemplate: StoryObj<ClHeaderComponent> = {
  render: () => ({
    props: {
      template: `<cl-header>
                    <ng-template #leftBar>lkhjlhjl</ng-template>
                 </cl-header>`,
    },
  }),
};

export const positionFixed = {
  render: Template,
  args: {
    ...Default.args,
    positionFixed: true,
  },
};
