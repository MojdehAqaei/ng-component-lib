import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ClAutofocusDirective } from "@sadad/component-lib/src/lib/auto-focus";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClKeyFilterDirective } from "@sadad/component-lib/src/lib/key-filter";
import { applicationConfig, Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";

export default {
  title: "Components/Form/InputText",
  component: ClInputTextComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClKeyFilterDirective,
        ReactiveFormsModule,
        FormsModule,
        ClAutofocusDirective,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const Template: StoryFn<ClInputTextComponent> = (args) => ({
  component: ClInputTextComponent,
  props: args,
});

export const Default = {
  render: Template,
};

export const LargeInput = {
  render: Template,

  args: {
    size: "lg",
  },
};

export const SmallInput = {
  render: Template,

  args: {
    size: "sm",
  },
};

export const AutoFocus: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    component: ClInputTextComponent,
    props: {
      placeholder: args.placeholder,
    },
    template: `
      <cl-input-text  [placeholder]="placeholder" clAutoFocus></cl-input-text>`,
  }),

  args: {
    placeholder: "نام و نام خانوادگی ",
  },
};

export const hasTypeText: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    component: ClInputTextComponent,
    props: args,
    template: `
    <h4>مقدار دهی type  و  placeholder </h4>

  <cl-input-text [type]="type" [placeholder]="placeholder"></cl-input-text>
    `,
  }),

  args: {
    type: "text",
    placeholder: "نام و نام خانوادگی ",
  },
};

export const hasIcon: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    component: ClInputTextComponent,
    props: args,
    template: `
      <h4> ارسال icon material</h4>
      <cl-input-text [type]="type" [placeholder]="placeholder" [icon]="icon" [iconPosition]="'left'"></cl-input-text>
      <br><br>
      <cl-input-text [type]="type" [placeholder]="placeholder" [icon]="icon" [iconPosition]="'right'"></cl-input-text>
    `,
  }),

  args: {
    type: "text",
    placeholder: "نام و نام خانوادگی ",
    icon: "refresh",
  },
};

export const hasKeyFilter: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    component: ClInputTextComponent,
    props: args,
    template: `
      <h4> ارسال keyFilter </h4>
      <cl-input-text [type]="type" [placeholder]="placeholder"  clKeyFilter="alphaNumPersian"></cl-input-text>
    `,
  }),

  args: {
    type: "text",
    placeholder: "فقط کاراکتر فارسی و عدد",
  },
};

export const Disabled: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    component: ClInputTextComponent,
    props: {
      type: args.type,
      placeholder: args.placeholder,
      disabled: args.disabled,
    },
    template: `
      <cl-input-text [type]="type" [placeholder]="placeholder" [disabled]="disabled"></cl-input-text>`,
  }),

  args: {
    type: "text",
    placeholder: "کد پرسنلی ",
    disabled: true,
  },
};

export const readonly: StoryObj<ClInputTextComponent> = {
    render: (args) => {
      let formGroup = new FormBuilder().group({
        text: new FormControl('1234567'),
      });

      return {
        component: ClInputTextComponent,
        props: {
          type: args.type,
          group: formGroup,
          readonly:args.readonly,
          controlName: "text",
        },
        template: `
          <form [formGroup]="group">
               <cl-input-text [type]="type" [readonly]="readonly" [placeholder]="placeholder" [formControlName]="controlName"></cl-input-text>
          </form>

        `,
      };
    },

    args: {
      type: "text",
      readonly: true,
    },
  };


export const WithNgModel: StoryObj<ClInputTextComponent> = {
  render: (args) => ({
    props: {
      temp: null,
      type: args.type,
      placeholder: args.placeholder,
    },
    template: `
      <cl-input-text [type]="type" [placeholder]="placeholder"  [(ngModel)]="temp"></cl-input-text>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  }),

  args: {
    type: "text",
    placeholder: "کد پرسنلی ",
  },
};

export const WithFormControl: StoryObj<ClInputTextComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      text: new FormControl(null),
    });

    return {
      component: ClInputTextComponent,
      props: {
        type: args.type,
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "text",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-text [type]="type" [placeholder]="placeholder"  [formControlName]="controlName"></cl-input-text>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  },

  args: {
    type: "text",
    placeholder: "کد پرسنلی ",
  },
};

export const DisabledFormControl: StoryObj<ClInputTextComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      text: new FormControl({ value: null, disabled: true }),
    });

    return {
      component: ClInputTextComponent,
      props: {
        type: args.type,
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "text",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-text [type]="type" [placeholder]="placeholder" [formControlName]="controlName"></cl-input-text>
        </form>

      `,
    };
  },

  args: {
    type: "text",
    placeholder: "کد پرسنلی ",
  },
};
