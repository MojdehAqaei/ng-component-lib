import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClFormMessageDirective } from "@sadad/component-lib/src/lib/form-message";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { ClTextAreaComponent } from "@sadad/component-lib/src/lib/text-area";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Form/FormMessages",
  args: {},
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClFormMessageDirective,
        ClInputTextComponent,
        ClSelectComponent,
        ClTextAreaComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const errorMessage: StoryObj<ClFormMessageDirective> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      name: ["", Validators.required],
      family: ["", Validators.required],
      gender: ["", Validators.required],
      discription: ["", Validators.required],
    });

    return {
      props: {
        messageType: args.messageType,
        messageText: args.messageText,
        form: formGroup,
        inputType: "text",
        placeholder: "نام خانوادگی",
        options: [
          { label: "زن", value: "1" },
          { label: "مرد", value: "2" },
        ],
      },
      template: `
          <form [formGroup]="form">
            <input type="inputType" formControlName="name" clFormAlert [messageType]="'success'" [messageShow]="form.controls['name'].errors" [messageText]="messageText" >
            <br>
            <br>

            <cl-input-text [type]="inputType" [placeholder]="placeholder" formControlName="family" clFormAlert [messageType]="'info'" [messageShow]="form.controls['family'].errors" [messageText]="messageText"></cl-input-text>
            <br>
            <br>

            <cl-select [options]="options"  formControlName="gender" clFormAlert [messageType]="messageType" [messageShow]="form.controls['gender'].errors" [messageText]="messageText" [filterable]="true"> </cl-select>
            <br>
            <br>

            <cl-text-area formControlName="discription" [rows]="1" placeholder="توضیحات را وارد نمایید" clFormAlert [messageType]="messageType" [messageShow]="form.controls['discription'].errors"></cl-text-area>
          </form>
          `,
    };
  },

  args: {
    messageType: "error",
    messageText: "فیلد مورد نظر نمیتواند خالی باشد",
  },
};
