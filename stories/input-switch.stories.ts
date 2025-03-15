import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClInputSwitchComponent } from "@sadad/component-lib/src/lib/input-switch";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Form/InputSwitch",
  component: ClInputSwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

export const disable: StoryObj<ClInputSwitchComponent> = {
  render: (args) => ({
    props: {
      disabled: args.disabled,
    },
    template: `<cl-input-switch [disabled]="disabled"></cl-input-switch>`,
  }),

  args: {
    disabled: true,
  },
};

export const withNgModel: StoryObj<ClInputSwitchComponent> = {
  render: () => {
    const onClick = (data: any) => {
      action("change switch")();
      return JSON.stringify(data);
    };

    return {
      component: ClInputSwitchComponent,
      props: {
        result: true,
        onClick,
      },
      template: `
          <cl-input-switch [(ngModel)]="result" (onInputChange)="onClick($event)"></cl-input-switch>
          <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی : {{ result }}</p>
          </div>`,
    };
  },
};

export const withFormControl: StoryObj<ClInputSwitchComponent> = {
  render: () => {
    let formGroup = new FormBuilder().group({
      switch: [true],
    });

    const onClick = (data: any) => {
      action("change switch")();
      return JSON.stringify(data);
    };

    return {
      component: ClInputSwitchComponent,
      props: {
        form: formGroup,
        controlName: "switch",
        onClick,
      },
      template: `
          <form [formGroup]="form">
            <cl-input-switch [formControlName]="controlName" (onInputChange)="onClick($event)"></cl-input-switch>
          </form>

          <div style="margin-top: 20px">
            <p style="white-space: pre">
              مقدار برگشتی  : {{ form.value | json }}
            </p>
          </div>`,
    };
  },
};
