import { StoryObj, Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ClKeyFilterDirective } from "@sadad/component-lib/src/lib/key-filter";
import { ClAutofocusDirective } from "@sadad/component-lib/src/lib/auto-focus";
import { ClInputMaskComponent } from "@sadad/component-lib/src/lib/input-mask";
import { HttpClientModule } from "@angular/common/http";

export default {
  title: "Components/Form/InputMask",
  component: ClInputMaskComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClKeyFilterDirective,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ClAutofocusDirective,
      ],
    }),
  ],
} as Meta;

const Template: StoryFn<ClInputMaskComponent> = (args) => ({
  component: ClInputMaskComponent,
  props: args,
});

export const Document: StoryObj<ClInputMaskComponent> = {
  render: () => ({
    template: `
        کاراکتر های * و 9 و a  کاراکتر های رزرو شده این کامپوننت میباشند . a برای حروف انگلیسی و 9 برای اعداد و * برای حروف و اعداد می باشد .
      `,
  }),
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

export const AutoFocus: StoryObj<ClInputMaskComponent> = {
  render: () => ({
    component: ClInputMaskComponent,
    props: {
      autoFocus: true,
    },
    template: `
      <cl-input-mask  clAutoFocus></cl-input-mask>`,
  }),
};

export const hasIcon: StoryObj<ClInputMaskComponent> = {
  render: (args) => ({
    props: {
      mask: args.mask,
    },
    template: `
          <h4> ارسال icon material</h4>
      <cl-input-mask [mask]="mask"   [icon]="icon" [iconPosition]="iconPosition"></cl-input-mask>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  }),

  args: {
    mask: "aaaa-99-aaa",
    icon: "refresh",
    iconPosition: "left",
  },
};

export const hasKeyFilter: StoryObj<ClInputMaskComponent> = {
  render: (args) => ({
    component: ClInputMaskComponent,
    props: {
      mask: args.mask,
      keyFilter: args.keyFilter,
    },
    template: `
      <h4> ارسال keyFilter </h4>
      <cl-input-mask [mask]="mask"   [keyFilter]="keyFilter"></cl-input-mask>
    `,
  }),

  args: {
    mask: "aaaa-99-aaa",
    keyFilter: "alphaNumPersian",
  },
};

export const Disabled: StoryObj<ClInputMaskComponent> = {
  render: (args) => ({
    component: ClInputMaskComponent,
    props: {
      disabled: args.disabled,
    },
    template: `
      <cl-input-mask [disabled]="disabled"></cl-input-mask>`,
  }),

  args: {
    disabled: true,
  },
};

export const WithNgModel: StoryObj<ClInputMaskComponent> = {
  render: (args) => ({
    props: {
      temp: null,
      mask: args.mask,
    },
    template: `
      <cl-input-mask [mask]="mask"  [(ngModel)]="temp"></cl-input-mask>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  }),

  args: {
    mask: "99****",
  },
};

export const WithFormControl: StoryObj<ClInputMaskComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      date: new FormControl(null),
    });

    return {
      component: ClInputMaskComponent,
      props: {
        mask: args.mask,
        group: formGroup,
        controlName: "date",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-mask [mask]="mask"  [formControlName]="controlName"></cl-input-mask>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  },

  args: {
    mask: "9999/99/99",
  },
};

export const DisabledFormControl: StoryObj<ClInputMaskComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      text: new FormControl({ value: null, disabled: true }),
    });

    return {
      component: ClInputMaskComponent,
      props: {
        mask: args.mask,
        group: formGroup,
        controlName: "text",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-mask [mask]="mask" [formControlName]="controlName"></cl-input-mask>
        </form>
      `,
    };
  },

  args: {
    mask: "(99)9-99-aaa-*",
  },
};
