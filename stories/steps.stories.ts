import {
  StoryObj,
  Meta,
  moduleMetadata,
  applicationConfig,
} from '@storybook/angular';
import { ClStepsComponent } from '@sadad/component-lib/src/lib/steps';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClStepItem } from '@sadad/component-lib/src/models';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [];
const stepItem: ClStepItem[] = [
  {
    label: 'اطلاعات شخصی',
    status: true,
    alertMessage: [
      {
        type: 'warning',
        icon: 'add_alert',
        detail: 'اطلاعات این مرحله باید تکمیل شود',
        closeable: true,
      },
    ],
  },
  {
    label: 'اطلاعات آدرس',
    status: true,
  },
  {
    label: 'اطلاعات پرداخت',
    status: true,
  },
  {
    label: 'تایید اطلاعات',
    status: false,
  },
];

export default {
  title: 'Components/Menu/steps',
  component: ClStepsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClStepsComponent,
        RouterTestingModule,
        RouterModule.forChild(routes),
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom([HttpClientModule])],
    }),
  ],
} as Meta;

export const Default: StoryObj<ClStepsComponent> = {
  render: () => ({
    component: ClStepsComponent,
    props: {
      currentIndex: 2,
      steps: stepItem,
    },
    template: `
          <cl-steps [steps]="steps"  [(activeIndex)]="currentIndex">
                  <b>activeIndex: {{currentIndex}}</b>
           </cl-steps>
          `,
  }),
};

export const Readonly: StoryObj<ClStepsComponent> = {
  render: () => ({
    component: ClStepsComponent,
    props: {
      currentIndex: 0,
      steps: stepItem,
      readonly: true,
    },
    template: `
          <cl-steps [steps]="steps" [readonly]="readonly" [(activeIndex)]="currentIndex">
                  <b>activeIndex: {{currentIndex}}</b>
           </cl-steps>
          `,
  }),
};

export const PreviousStepNotAllowed: StoryObj<ClStepsComponent> = {
  render: () => ({
    component: ClStepsComponent,
    props: {
      currentIndex: 0,
      steps: stepItem,
      prevAllowed: false,
    },
    template: `
          <cl-steps [steps]="steps" [prevAllowed]="prevAllowed" [(activeIndex)]="currentIndex">
                  <b>activeIndex: {{currentIndex}}</b>
           </cl-steps>
          `,
  }),
};
