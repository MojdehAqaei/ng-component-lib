import {
  StoryObj,
  Meta,
  moduleMetadata,
  applicationConfig,
} from '@storybook/angular';
import { ClFormControlTypes } from '@sadad/component-lib/src/enums';
import { ClFormGeneratorComponent } from '@sadad/component-lib/src/lib/form-generator';
import { ClFormMessageDirective } from '@sadad/component-lib/src/lib/form-message';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

export default {
  title: 'Components/Form/FormGenerator',
  component: ClFormGeneratorComponent,
  args: {},
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
    moduleMetadata({
      imports: [CommonModule, ClFormMessageDirective, ClButtonComponent],
    }),
  ],
} as Meta;

const data: ClFormControlSchema[] = [
  {
    value: 'مهسا کاظم پناه',
    name: 'firstName',
    label: 'نام',
    controlType: ClFormControlTypes.INPUT_TEXT,
    required: true,
    maxLength: 10,
    keyFilter: 'alphaNumPersian',
    order: 1,
    inputTextType: 'text',
    disabled: false,
    validators: [Validators.maxLength(10), Validators.minLength(2)],
  },
  {
    order: 2,
    value: null,
    name: 'nationalCode',
    label: 'کد ملی',
    controlType: ClFormControlTypes.INPUT_TEXT,
    keyFilter: 'pint',
    required: true,
    validators: [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ],
    validatorsError: {
      required: 'فیلد های اجبار ی را مقدار دهی کنید ',
      maxlength: 'حداکثر 10 کاراکتر مجاز است ',
    },
    disabled: false,
  },
  {
    order: 3,
    value: null,
    name: 'year',
    label: 'سن',
    controlType: ClFormControlTypes.INPUT_NUMBER,
    min: 1,
    max: 100,
    required: true,
    validators: [Validators.required, Validators.min(1), Validators.max(100)],
  },
  {
    order: 4,
    name: 'city',
    label: 'شهر',
    controlType: ClFormControlTypes.SELECT,
    required: true,
    filterable: true,
    options: [
      { label: 'تهران', value: '1' },
      { label: 'شیراز', value: '2' },
      { label: 'ساری', value: '3' },
    ],
    disabled: false,
  },
  {
    order: 5,
    label: 'شماره تلفن',
    name: 'phone',
    maxLength: 11,
    validators: [Validators.maxLength(11)],
    controlType: ClFormControlTypes.INPUT_GROUP,
    addons: [
      { icon: 'phone', type: 'button', position: 'start' },
      { label: '+98', position: 'end' },
    ],
    required: true,
    disabled: false,
  },
  {
    order: 6,
    label: 'تحصیلات',
    name: 'education',
    controlType: ClFormControlTypes.CHECKBOX,
    options: [
      { label: 'دیپلم', value: '101' },
      { label: 'کارشناسی', value: '102' },
      { label: 'کارشناسی ارشد', value: '103' },
    ],
    required: true,
    validatorsError: {
      required: 'حداقل یک مورد انتخاب کنید',
    },
    disabled: false,
  },
  {
    order: 7,
    label: 'دوره های آموزشی',
    name: 'classes',
    controlType: ClFormControlTypes.MULTISELECT,
    options: [
      { label: 'تایپ', value: '30' },
      { label: 'ICDL', value: '40' },
      { label: 'برنامه نویسی', value: '50' },
      { label: 'شبکه', value: '60' },
      { label: 'طراحی', value: '50' },
    ],
    required: true,
    disabled: false,
  },
  {
    order: 8,
    label: 'تاریخ تولد',
    name: 'birthDate',
    controlType: ClFormControlTypes.DATEPICKER,
    required: true,
    disabled: false,
  },
  {
    order: 9,
    value: '11',
    name: 'gender',
    label: 'جنسیت',
    controlType: ClFormControlTypes.RADIO_BUTTON,
    options: [
      { label: 'مونث', value: '11' },
      { label: 'مذکر', value: '22' },
    ],
    required: true,
    disabled: false,
  },
  {
    order: 10,
    value: true,
    name: 'active',
    label: 'کاربر فعال',
    controlType: ClFormControlTypes.INPUT_SWITCH,
    required: false,
    disabled: false,
  },
  {
    order: 11,
    label: 'توضیحات',
    name: 'description',
    controlType: ClFormControlTypes.TEXTAREA,
    required: true,
    rows: 2,
    validators: [Validators.maxLength(10)],
    validatorsError: {
      maxlength: 'کمتر از 10 کاراکتر مجاز است .',
    },
    disabled: false,
    styleClasses: 'col s12',
  },
  {
    order: 12,
    label: 'فونت',
    name: 'font',
    controlType: ClFormControlTypes.SELECT_BUTTON,
    required: true,
    options: [
      { content: '<i>I</i>' },
      { content: '<b>B</b>' },
      { content: '<u>U</u>' },
    ],
    renderHtml: true,
    disabled: false,
    styleClasses: 'col s12',
  },
];

export const Default: StoryObj<ClFormGeneratorComponent> = {
  render: (args) => {
    return {
      props: {
        formSchema: args.formSchema,
        formService: null,
        validate: false,
      },
      template: `
          <cl-form-generator [formSchema]="formSchema" (onChange)="formService = $event" [submitted]="validate"/>

          <cl-button  label="ثبت" (onClick)="validate=true;formService.validate()"/>
          <cl-button  label="پاک کردن" (onClick)="formService.clear()"/>
          `,
    };
  },

  args: {
    formSchema: data,
  },
};
