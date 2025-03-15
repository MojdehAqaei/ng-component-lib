import type { StoryObj, Meta } from "@storybook/angular";

import { moduleMetadata } from "@storybook/angular";
import { ClSliderComponent } from "@sadad/component-lib/src/lib/slider";
import { FormsModule } from "@angular/forms";

export default {
  title: "Components/Form/Slider",
  component: ClSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
} as Meta;

export const sliderWithRange: StoryObj<ClSliderComponent> = {
  render: (args) => ({
    props: {
      range: args.range,
      value: args.value,
    },
    template: `
         <p>{{ 'values: ' + value }}</p>
         <cl-slider [(ngModel)]="value" [range]="range"></cl-slider>
      `,
  }),

  args: {
    range: true,
  },
};

export const sliderWithSteps: StoryObj<ClSliderComponent> = {
  render: (args) => ({
    props: {
      step: args.step,
      value: args.value,
    },
    template: `
         <p>{{ 'value: ' + value }}</p>
         <cl-slider [(ngModel)]="value" [step]="step"></cl-slider>
      `,
  }),

  args: {
    step: 10,
  },
};

export const sliderWithMinMax: StoryObj<ClSliderComponent> = {
  render: (args) => ({
    props: {
      min: args.min,
      max: args.max,
      value: args.value,
    },
    template: `
         <p>{{ 'value: ' + value }}</p>
         <p>{{ 'min: ' + min }}</p>
         <p>{{ 'max: ' + max }}</p>
         <cl-slider [(ngModel)]="value" [min]="min" [max]="max"></cl-slider>
      `,
  }),

  args: {
    value: 1000,
    min: 1000,
    max: 250000,
  },
};
