import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClRadioButtonComponent } from "@sadad/component-lib/src/lib/radio-button";

export default {
  title: "Components/Form/RadioButton",
  component: ClRadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

export const defaultRadiobutton: StoryObj<ClRadioButtonComponent> = {
  render: (args) => ({
    props: {
      value: args.value,
      label: args.label,
      name: args.name,
      disabled: args.disabled,
    },
    template: `<cl-radio-button [value]="value" [label]="label" [name]="name" [disabled]="disabled"></cl-radio-button>`,
  }),

  args: {
    value: 1,
    label: "انتخاب شود",
    name: "radioBtn",
    disabled: false,
  },
};

export const disable: StoryObj<ClRadioButtonComponent> = {
  render: (args) => ({
    props: {
      value: args.value,
      label: args.label,
      name: args.name,
      disabled: args.disabled,
    },
    template: `<cl-radio-button [value]="value" [label]="label" [name]="name" [disabled]="disabled"></cl-radio-button>`,
  }),

  args: {
    value: 1,
    label: "انتخاب شود",
    name: "radioBtn",
    disabled: true,
  },
};

export const withNgModel: StoryObj<ClRadioButtonComponent> = {
  render: () => {
    const onClick = (data: any) => {
      action("click on radioButton")();
      return JSON.stringify(data);
    };

    return {
      component: ClRadioButtonComponent,
      props: {
        result: 1,
        name: "radioGroup",
        onClick,
      },
      template: `
          <cl-radio-button [label]="'گزینه 1'" [value]="1" [name]=name [(ngModel)]="result" (onInputChange)="onClick($event)"></cl-radio-button>
          <cl-radio-button [label]="'گزینه 2'" [value]="2" [name]=name [(ngModel)]="result" (onInputChange)="onClick($event)"></cl-radio-button>
          <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی : {{ result }}</p>
          </div>`,
    };
  },
};

export const withFormControl: StoryObj<ClRadioButtonComponent> = {
  render: () => {
    let formGroup = new FormBuilder().group({
      radio: [1],
    });

    const onClick = (data: any) => {
      action("click on radioButton")();
      return JSON.stringify(data);
    };

    return {
      component: ClRadioButtonComponent,
      props: {
        form: formGroup,
        controlName: "radio",
        name: "radioGroup",
        onClick,
      },
      template: `
          <form [formGroup]="form">
          <cl-radio-button [formControlName]="controlName" [label]="'گزینه 1'" [value]="1" [name]=name (onInputChange)="onClick($event)"></cl-radio-button>
          <cl-radio-button [formControlName]="controlName" [label]="'گزینه 2'" [value]="2" [name]=name (onInputChange)="onClick($event)"></cl-radio-button>
          </form>

          <div style="margin-top: 20px">
            <p style="white-space: pre">
            مقدار برگشتی  : {{ form.value | json }}</p>
          </div>
        `,
    };
  },
};
