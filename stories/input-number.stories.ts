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
import { ClInputNumberComponent } from "@sadad/component-lib/src/lib/input-number";
import { applicationConfig, Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";

export default {
  title: "Components/Form/InputNumber",
  component: ClInputNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
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

const Template: StoryFn<ClInputNumberComponent> = (args) => ({
  component: ClInputNumberComponent,
  props: {
    useGrouping: args.useGrouping,
    placeholder: args.placeholder,
    mode: args.mode,
    prefix: args.prefix,
    suffix: args.suffix,
  },
  template: `
<label>مبلغ کل </label>
<cl-input-number  [mode]="mode" [useGrouping]="useGrouping" [placeholder]="placeholder" [prefix]="prefix" [suffix]="suffix"></cl-input-number>
  `,
});

export const Default = {
  render: Template,
};

export const Mode = {
  render: Template,

  args: {
    placeholder: "مبلغ کل",
    mode: "pint",
  },
};

export const UseGrouping = {
  render: Template,

  args: {
    placeholder: "مبلغ کل",
    useGrouping: true,
  },
};

export const HasPrefix = {
  render: Template,

  args: {
    placeholder: "مبلغ کل",
    prefix: "مبلغ :",
  },
};

export const HasSuffix = {
  render: Template,

  args: {
    placeholder: "مبلغ کل",
    suffix: "ریال",
  },
};

export const PrefixAndSuffixInGroupedMode = {
  render: Template,

  args: {
    placeholder: "مبلغ کل",
    suffix: "ریال",
    prefix: "مبلغ :",
    useGrouping: true,
  },
};

export const Disabled: StoryObj<ClInputNumberComponent> = {
  render: (args) => ({
    component: ClInputNumberComponent,
    props: {
      placeholder: args.placeholder,
      disabled: args.disabled,
    },
    template: `
      <cl-input-number  [placeholder]="placeholder" [disabled]="disabled"></cl-input-number>`,
  }),

  args: {
    placeholder: "مبلغ کل",
    disabled: true,
  },
};

export const readonly: StoryObj<ClInputNumberComponent> = {
    render: (args) => {
      let formGroup = new FormBuilder().group({
        text: new FormControl(1234567),
      });

      return {
        component: ClInputNumberComponent,
        props: {
          group: formGroup,
          readonly:args.readonly,
          controlName: "text",
        },
        template: `
          <form [formGroup]="group">
               <cl-input-number [type]="type" [readonly]="readonly" [placeholder]="placeholder" [formControlName]="controlName"></cl-input-number>
          </form>

        `,
      };
    },

    args: {
      readonly: true,
    },
  };


export const AutoFocus: StoryObj<ClInputNumberComponent> = {
  render: (args) => ({
    component: ClInputNumberComponent,
    props: {
      placeholder: args.placeholder,
      autoFocus: true,
    },
    template: `
      <cl-input-number  [placeholder]="placeholder" clAutoFocus></cl-input-number>`,
  }),

  args: {
    placeholder: "مبلغ کل",
  },
};

export const WithNgModel: StoryObj<ClInputNumberComponent> = {
  render: (args) => ({
    props: {
      temp: 0,
      placeholder: args.placeholder,
    },
    template: `
      <cl-input-number  [placeholder]="placeholder"  [(ngModel)]="temp"></cl-input-number>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  }),

  args: {
    placeholder: "مبلغ کل",
  },
};

export const WithFormControl: StoryObj<ClInputNumberComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      totalSum: new FormControl(null),
    });

    return {
      component: ClInputNumberComponent,
      props: {
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "totalSum",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-number  [placeholder]="placeholder"  [formControlName]="controlName"></cl-input-number>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  },

  args: {
    placeholder: "مبلغ کل",
  },
};

export const DisabledFormControl: StoryObj<ClInputNumberComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      totalSum: new FormControl({ value: null, disabled: true }),
    });

    return {
      component: ClInputNumberComponent,
      props: {
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "totalSum",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-number  [placeholder]="placeholder" [formControlName]="controlName"></cl-input-number>
        </form>
      `,
    };
  },

  args: {
    placeholder: "مبلغ کل",
  },
};
