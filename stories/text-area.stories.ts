import { CommonModule } from "@angular/common";
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ClAutofocusDirective } from "@sadad/component-lib/src/lib/auto-focus";
import { ClTextAreaComponent } from "@sadad/component-lib/src/lib/text-area";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

export default {
  title: "Components/Form/TextArea",
  component: ClTextAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClAutofocusDirective,
      ],
    }),
  ],
} as Meta;

export const withCharCount: StoryObj<ClTextAreaComponent> = {
  render: (args) => ({
    props: {
      rows: args.rows,
      maxLength: args.maxLength,
      showLength: args.showLength,
      disabled: args.disabled,
      placeholder: args.placeholder,
    },
    template: `<cl-text-area [rows]="rows" [maxLength]="maxLength" [showLength]="showLength" [placeholder]="placeholder" [disabled]="disabled"></cl-text-area>`,
  }),

  args: {
    rows: 5,
    maxLength: 300,
    showLength: true,
    disabled: false,
    placeholder: "در این قسمت تایپ کنید",
  },
};

export const withoutCharCount: StoryObj<ClTextAreaComponent> = {
  render: (args) => ({
    props: {
      rows: args.rows,
      maxChars: args.maxLength,
      showLength: args.showLength,
      disabled: args.disabled,
    },
    template: `<cl-text-area [rows]="rows" [showLength]="showLength" [disabled]="disabled"></cl-text-area>`,
  }),

  args: {
    rows: 5,
    maxLength: 200,
    showLength: false,
    disabled: false,
  },
};

export const disable: StoryObj<ClTextAreaComponent> = {
  render: (args) => ({
    props: {
      rows: args.rows,
      maxLength: args.maxLength,
      showLength: args.showLength,
      disabled: args.disabled,
    },
    template: `<cl-text-area [rows]="rows" [showLength]="showLength" [maxLength]="maxLength" [disabled]="disabled"></cl-text-area>`,
  }),

  args: {
    rows: 5,
    maxLength: 200,
    showLength: true,
    disabled: true,
  },
};

// export const readonly: StoryObj<ClTextAreaComponent> = {
//     render: (args) => ({
//       props: {
//         rows: args.rows,
//         maxLength: args.maxLength,
//         showLength: args.showLength,
//         readonly: args.readonly,
//       },
//       template: `<cl-text-area [rows]="rows" [showLength]="showLength" [maxLength]="maxLength" [readonly]="readonly"></cl-text-area>`,
//     }),

//     args: {
//       rows: 5,
//       maxLength: 200,
//       showLength: true,
//       readonly: true,
//     },
//   };

export const readonly: StoryObj<ClTextAreaComponent> = {
    render: (args) => {
      let formGroup = new FormBuilder().group({
        text: new FormControl('1234567'),
      });

      return {
        component: ClTextAreaComponent,
        props: {
          group: formGroup,
          controlName: "text",
          readonly: args.readonly,
        },
        template: `
          <form [formGroup]="group">
               <cl-text-area [readonly]="readonly" [placeholder]="placeholder" [formControlName]="controlName"></cl-text-area>
          </form>

        `,
      };
    },

    args: {
      readonly: true,
    },
  };

export const withNgModel: StoryObj<ClTextAreaComponent> = {
  render: (args) => {
    return {
      component: ClTextAreaComponent,
      props: {
        rows: args.rows,
        maxLength: args.maxLength,
        showLength: args.showLength,
      },
      template: `
          <cl-text-area [rows]="rows" [maxLength]="maxLength" [showLength]="showLength" [(ngModel)]="textVal"></cl-text-area>
          <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی : {{ textVal }}</p>
          </div>`,
    };
  },

  args: {
    rows: 5,
    maxLength: 200,
    showLength: true,
  },
};

export const withFormControl: StoryObj<ClTextAreaComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      text: new FormControl(),
    });

    return {
      component: ClTextAreaComponent,
      props: {
        form: formGroup,
        controlName: "text",
        rows: args.rows,
        maxLength: args.maxLength,
        showLength: args.showLength,
        placeholder: args.placeholder,
      },
      template: `
          <form [formGroup]="form">
            <cl-text-area [formControlName]="controlName" [rows]="rows" [placeholder]="placeholder"></cl-text-area>
          </form>

          <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی : {{ form.value | json }}</p>
          </div>`,
    };
  },

  args: {
    rows: 5,
    maxLength: 200,
    showLength: true,
    placeholder: "در این قسمت تایپ کنید",
  },
};

export const AutoFocus: StoryObj<ClAutofocusDirective> = {
  render: () => ({
    template: `<cl-text-area clAutoFocus [rows]="1" placeholder="cl-text-area focused"></cl-text-area> `,
  }),
};
