import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import { ClAutofocusDirective } from '@sadad/component-lib/src/lib/auto-focus';

export default {
  title: 'Components/Form/Chips',
  component: ClChipsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ClAutofocusDirective,
      ],
    }),
  ],
  args: {
    placeholder: 'مهارت ها ',
  },
} as Meta;

export const Disabled: StoryObj<ClChipsComponent> = {
  render: (args) => ({
    component: ClChipsComponent,
    props: {
      placeholder: args.placeholder,
      disabled: args.disabled,
    },
    template: `
      <cl-chips [placeholder]="placeholder" [disabled]="disabled"/>`,
  }),

  args: {
    disabled: true,
  },
};

export const AllowDuplicateItem: StoryObj<ClChipsComponent> = {
  render: (args) => ({
    component: ClChipsComponent,
    props: {
      placeholder: args.placeholder,
      allowDuplicate: args.allowDuplicate,
    },
    template: `
      <cl-chips [placeholder]="placeholder" [allowDuplicate]="allowDuplicate"/>`,
  }),

  args: {
    allowDuplicate: true,
  },
};

export const MaxCount: StoryObj<ClChipsComponent> = {
  render: (args) => ({
    component: ClChipsComponent,
    props: {
      placeholder: args.placeholder,
      maxLength: args.maxLength,
      showLength: args.showLength,
    },
    template: `
      <cl-chips [placeholder]="placeholder" [showLength]="showLength" [maxLength]="maxLength"/>`,
  }),

  args: {
    showLength: true,
    maxLength: 3,
  },
};

export const SetDefaultValue: StoryObj<ClChipsComponent> = {
  render: (args) => ({
    props: {
      temp: [
        { label: 'HTML', value: 'HTML' },
        { label: 'CSS', value: 'CSS' },
        { label: 'JS', value: 'JS' },
      ],
      placeholder: args.placeholder,
    },
    template: `  <cl-chips  [placeholder]="placeholder"  [(ngModel)]="temp"/>`,
  }),
};

export const WithNgModel: StoryObj<ClChipsComponent> = {
  render: (args) => ({
    props: {
      temp: null,
      placeholder: args.placeholder,
    },
    template: `
      <cl-chips  [placeholder]="placeholder"  [(ngModel)]="temp"/>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp | json}}</p>
      </div>`,
  }),
};

export const WithFormControl: StoryObj<ClChipsComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      items: new FormControl([{ value: 'HTML', label: 'HTML' }]),
    });

    return {
      component: ClChipsComponent,
      props: {
        placeholder: args.placeholder,
        group: formGroup,
        controlName: 'items',
      },
      template: `
        <form [formGroup]="group">
             <cl-chips [placeholder]="placeholder"  [formControlName]="controlName"/>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value | json}}</p>
        </div>
      `,
    };
  },
};

export const DisabledFormControl: StoryObj<ClChipsComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      items: new FormControl({
        value: [{ value: 'HTML', label: 'HTML' }],
        disabled: true,
      }),
    });

    return {
      component: ClChipsComponent,
      props: {
        placeholder: args.placeholder,
        group: formGroup,
        controlName: 'items',
      },
      template: `
        <form [formGroup]="group">
             <cl-chips  [placeholder]="placeholder" [formControlName]="controlName"/>
        </form>
      `,
    };
  },
};

export const InvalidFormControl: StoryObj<ClChipsComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      items: new FormControl(null, [Validators.required]),
    });

    return {
      component: ClChipsComponent,
      props: {
        placeholder: args.placeholder,
        group: formGroup,
        controlName: 'items',
      },
      template: `
        <form [formGroup]="group">
             <cl-chips  [placeholder]="placeholder" [formControlName]="controlName"/>
        </form>
        <br/>
        <span>
      با توجه به  required  بودن  formControl  در صورتی که متنی تایپ کنید و سپس پاک کنید رنگ  border  تغییر میکند.
     </span> `,
    };
  },
};

export const ChipsAutoFocus: StoryObj<ClChipsComponent> = {
  render: () => ({
    props: {
      value: [{ value: 'HTML', label: 'HTML' }],
    },
    template: `<cl-chips clAutoFocus [(ngModel)]="value"/>`,
  }),
};
