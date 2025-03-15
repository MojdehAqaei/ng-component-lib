import { StoryFn, StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import { ClCheckboxComponent } from "@sadad/component-lib/src/lib/checkbox";
import { CommonModule } from "@angular/common";
import { action } from "@storybook/addon-actions";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

export default {
  title: "Components/Form/Checkbox",
  component: ClCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta;

export const Default: StoryObj<ClCheckboxComponent> = {
  render: () => {
    let formGroup = new FormBuilder().group({
      choice: new FormControl(),
    });
    const onClickFun = (date: any) => {
      action("click on checkbox")();
      return JSON.stringify(date);
    };

    return {
      component: ClCheckboxComponent,
      props: {
        temp: null,
        labelFirst: "گزینه اول",
        labelSecond: "گزینه دو",
        valueFirst: "1",
        valueSecond: "2",
        group: formGroup,
        controlName: "choice",
        onClickFun,
      },
      template: `
        <p> <label>مقدار پیش فرض : 1</label></p>
        <cl-checkbox [value]="valueFirst" [label]="labelFirst" [(ngModel)]="temp"   (onCheck)="onClickFun($event)" [binary]="binary"> </cl-checkbox>
        <br/>
        <br/>
        <cl-checkbox [value]="valueSecond" [label]="labelSecond" [(ngModel)]="temp"   (onCheck)="onClickFun($event)" [binary]="binary"> </cl-checkbox>
        <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
        </div>

       <p><label>formControl با مقدار پیش فرض </label></p>
        <form [formGroup]="group">
          <cl-checkbox
            [value]="valueFirst"
            [label]="labelFirst"
             (onCheck)="onClickFun($event)"
            [formControlName]="controlName">
          </cl-checkbox>
          <br/>
          <br/>
          <cl-checkbox
            [value]="valueSecond"
            [label]="labelSecond"
             (onCheck)="onClickFun($event)"
            [formControlName]="controlName">
          </cl-checkbox>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>

  `,
    };
  },
};

export const Binary: StoryObj<ClCheckboxComponent> = {
  render: () => {
    let formGroup = new FormBuilder().group({
      active: new FormControl(true),
    });

    return {
      component: ClCheckboxComponent,
      props: {
        binary: true,
        firstCheckbox: true,
        formGroup: formGroup,
      },
      template: `
     <p> <label>مقدار پیش فرض : true</label></p>
     <cl-checkbox [label]="'گزینه 1'"  [binary]="binary" [(ngModel)]="firstCheckbox"> </cl-checkbox>
     <p><label>{{firstCheckbox}}</label></p>
     <p><label>formControl مقدار پیش فرض : true</label></p>
     <form [formGroup]="formGroup">
       <cl-checkbox
          [label]="'گزینه 2'"
          [binary]="binary"
          [formControlName]="'active'">
       </cl-checkbox>
     </form>
     <p><label>{{formGroup.get('active').value}}</label></p>
  `,
    };
  },
};

export const Disabled: StoryFn<ClCheckboxComponent> = () => ({
  component: ClCheckboxComponent,
  props: {
    disabled: true,
  },
  template: `<cl-checkbox  [label]="label" [disabled]="disabled"> </cl-checkbox>`,
});

export const DisabledFormControl: StoryObj<ClCheckboxComponent> = {
  render: () => {
    let formGroup = new FormBuilder().group({
      choice: new FormControl({ value: null, disabled: true }),
    });

    return {
      component: ClCheckboxComponent,
      props: {
        label: "گزینه اول",
        value: "1",
        group: formGroup,
        controlName: "choice",
      },
      template: `
        <form [formGroup]="group">
          <cl-checkbox
            [value]="value"
            [label]="label"
            [formControlName]="controlName">
          </cl-checkbox>
        </form>

      `,
    };
  },
};
