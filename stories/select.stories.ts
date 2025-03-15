import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import {HttpClientModule, HttpContext, HttpParams} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import { SKIP_LOADING, LOAD_MODE } from "@sadad/component-lib/src/interceptors";

export default {
  title: "Components/Form/Select",
  component: ClSelectComponent,
  args: {
    placeholder: "انتخاب کنید",
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const data = [
  { label: "1 آیتم", value: "1" },
  { label: "2 آیتم", value: "2" },
  { label: "3 آیتم", value: "3" },
  { label: "4 آیتم", value: "4" },
  { label: "5 آیتم", value: "5" },
];

export const Default: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    component: ClSelectComponent,
    props: {
      options: args.options,
    },
    template: `<cl-select [options]="options" ></cl-select>`,
  }),

  args: {
    options: data,
  },
};

export const Disable: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    component: ClSelectComponent,
    props: {
      options: args.options,
      disabled: args.disabled,
    },
    template: `<cl-select [options]="options"  [disabled]="disabled"></cl-select>`,
  }),

  args: {
    options: data,
    disabled: true,
  },
};

export const MultiSelect: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    component: ClSelectComponent,
    props: {
      options: args.options,
      multiple: args.multiple,
    },
    template: `<cl-select [options]="options"  [multiple]="multiple" [filterable]="true"></cl-select>`,
  }),

  args: {
    options: data,
    multiple: true,
  },
};

export const filterable: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    component: ClSelectComponent,
    props: {
      options: args.options,
      filterable: args.filterable,
    },
    template: `<cl-select [options]="options" [filterable]="filterable"></cl-select>`,
  }),

  args: {
    options: data,
    filterable: true,
  },
};

export const lazyFilter: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    component: ClSelectComponent,
    props: {
      url: args.url,
      httpParams: args.httpParams,
      httpContext: args.httpContext,
      lazyFilter: args.lazyFilter,
    },
    template: `<cl-select [url]="url" [filterable]="true" [lazyFilter]="lazyFilter" [httpParams]="httpParams" [httpContext]="httpContext"></cl-select>`,
  }),

  args: {
    url: 'http://localhost:8080/fms/client/org-units',
    httpParams: new HttpParams().set('test', '1'),
    httpContext: new HttpContext().set(SKIP_LOADING, true).set(LOAD_MODE, 'indeterminate'),
    lazyFilter: true,
  },
};

export const empty: StoryObj<ClSelectComponent> = {
  render: (args) => ({
    props: {
      options: args.options,
    },
    template: `<cl-select [options]="options" ></cl-select>`,
  }),

  args: {
    options: [],
  },
};

export const MultiSelectWithNgModel: StoryObj<ClSelectComponent> = {
  render: () => {
    return {
      component: ClSelectComponent,
      props: {
        options: data,
        defaultValue: ["2"],
      },
      template: `
        <cl-select  [options]="options" [multiple]="true" [(ngModel)]="defaultValue"> </cl-select>

        <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی  :{{ defaultValue }}</p>
        </div>`,
    };
  },
};

export const SelectWithNgModel: StoryObj<ClSelectComponent> = {
  render: () => {
    return {
      component: ClSelectComponent,
      props: {
        options: data,
        defaultValue: { label: "آیتم 2", value: "2" },
      },
      template: `
        <cl-select  [options]="options"  [(ngModel)]="defaultValue"> </cl-select>

        <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی  :{{ defaultValue }}</p>
        </div>`,
    };
  },
};

export const SelectWithFormControl: StoryObj<ClSelectComponent> = {
  render: () => {
    let formGroup = new FormGroup({
      select: new FormControl({ label: "آیتم 2", value: "2" }),
    });

    return {
      component: ClSelectComponent,
      props: {
        options: data,
        form: formGroup,
        controlName: "select",
      },
      template: `
          <form [formGroup]="form">
            <cl-select  [options]="options" [formControlName]="controlName"> </cl-select>
          </form>

          <div style="margin-top: 20px">
            <p style="white-space: pre">مقدار برگشتی: {{ form.value[controlName] | json }}</p>
          </div>`,
    };
  },
};

export const DefaultValue: StoryObj<ClSelectComponent> = {
  render: () => {
    return {
      component: ClSelectComponent,
      props: {
        options: data,
        select1: "2",
        select2: { label: "آیتم 2", value: "2" },
        select3: { name: "آیتم 2", id: "2" },
      },
      template: `
       <div style="margin-top: 20px">
             <h3>options List is not empty</h3>
            <cl-select  [options]="options" [(ngModel)]="select1"> </cl-select>
            <p style="white-space: pre">مقدار برگشتی: {{ select1 | json }}</p>
        </div>

        <div style="margin-top: 20px">
            <h3>options List is  empty</h3>
            <cl-select  [options]="null" [(ngModel)]="select2"> </cl-select>
            <p style="white-space: pre">مقدار برگشتی: {{select2  | json }}</p>
         </div>
         <div style="margin-top: 20px">
               <h3>options List is  empty but optionLabel  has value </h3>
               <cl-select  [options]="null" [optionLabel]="['name']" [(ngModel)]="select3"> </cl-select>
              <p style="white-space: pre">مقدار برگشتی: {{select3 | json }}</p>
          </div>

      `,
    };
  },
};
