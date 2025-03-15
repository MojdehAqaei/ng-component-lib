import { action } from '@storybook/addon-actions';
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { ClSelectButtonComponent } from '../projects/component-lib/src/lib/select-button/select-button.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

const meta: Meta<ClSelectButtonComponent> = {
  title: 'Components/Button/SelectButton',
  component: ClSelectButtonComponent,
  render: (args) => ({
    props: {
      ...args,
      onSelect: action('onSelect'),
    },
    template: `<cl-select-button ${argsToTemplate(args)}></cl-select-button>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ClSelectButtonComponent>;

export const Default: Story = {
  args: {
    options: [
      { content: 'گزینه ۱' },
      { content: 'گزینه ۲' },
      { content: 'گزینه ۳' },
    ],
  },
};

export const WithTemplate: Story = {
  args: {
    options: [
      { content: '<ng-container style="color: red;">گزینه ۱</ng-container>' },
      { content: '<ng-container style="color: green;">گزینه ۲</ng-container>' },
      { content: '<ng-container style="color: blue;">گزینه ۳</ng-container>' },
    ],
    renderHtml: true,
  },
};

export const Separate: Story = {
  args: {
    separate: true,
    options: [
      { content: 'گزینه ۱' },
      { content: 'گزینه ۲' },
      { content: 'گزینه ۳' },
    ],
    gap: '1rem',
  },
};

export const WithNgModel: Story = {
  args: {
    options: [
      { content: 'گزینه ۱' },
      { content: 'گزینه ۲' },
      { content: 'گزینه ۳' },
    ],
  },
  render: (args) => ({
    props: { ...args, temp: {} },
    template: `
      <cl-select-button [options]="options" [(ngModel)]="temp"></cl-select-button>
      <div style="margin-top: 1rem">{{ temp | json }}</div>
    `,
  }),
};

export const WithFormControl: Story = {
  args: {
    options: [
      { content: 'گزینه ۱', value: '1' },
      { content: 'گزینه ۲', value: '2' },
      { content: 'گزینه ۳', value: '3' },
    ],
  },
  render: (args) => {
    const formGroup = new FormBuilder().group({
      option: new FormControl({
        value: args.options[1],
        disabled: false,
      }),
    });

    return {
      props: { ...args, group: formGroup, controlName: 'option' },
      template: `
      <form [formGroup]="group">
        <cl-select-button [options]="options" [formControlName]="controlName"></cl-select-button>
      </form>
      <div style="margin-top: 1rem">{{ group.get(controlName).value | json }}</div>
    `,
    };
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { content: 'گزینه ۱' },
      { content: 'گزینه ۲' },
      { content: 'گزینه ۳' },
    ],
  },
  render: (args) => ({
    props: { ...args },
    template: `<cl-select-button [options]="options" [disabled]="disabled"></cl-select-button>`,
  }),
};
