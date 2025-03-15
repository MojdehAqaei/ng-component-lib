import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ClListBoxComponent } from '@sadad/component-lib/src/lib/list-box';
import { ClTemplateDirective } from '@sadad/component-lib/src/lib/template';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

const listData = [
  { name: 'ایتم 1', value: 1 },
  { name: 'ایتم 2', value: 2 },
  { name: 'ایتم 3', value: 3 },
  { name: 'ایتم 4', value: 4 },
];

export default {
  title: 'Components/Data/ListBox',
  component: ClListBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ClTemplateDirective,
        RouterTestingModule
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
} as Meta;

type Story = StoryObj<ClListBoxComponent>;

export const Default: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      data: listData,
    },
    template: `<cl-list-box  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" ></cl-list-box>`,
  }),
};

export const Draggable: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      data: listData,
    },
    template: `<cl-list-box [draggable]="true"  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" ></cl-list-box>`,
  }),
};

export const Empty: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      emptyDataMessage: 'اطلاعاتی برای نمایش وجود ندارد .',
      data: [],
    },
    template: `<cl-list-box [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [emptyDataMessage]="emptyDataMessage"></cl-list-box>`,
  }),
};

export const OrderedList: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      isOrdered: true,
      data: listData,
    },
    template: `<cl-list-box   [data]="data" [isOrdered]="isOrdered"  [optionLabel]="optionLabel" [optionValue]="optionValue"></cl-list-box>`,
  }),
};

export const ListDefaultStyle: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      noDefaultStyle: false,
      data: listData,
    },
    template: `<cl-list-box   [data]="data" [noDefaultStyle]="noDefaultStyle"  [optionLabel]="optionLabel" [optionValue]="optionValue" ></cl-list-box>`,
  }),
};

export const CustomIcon: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      icon: 'panorama_fish_eye',
      data: listData,
    },
    template: `<cl-list-box   [data]="data" [icon]="icon"  [optionLabel]="optionLabel" [optionValue]="optionValue" ></cl-list-box>`,
  }),
};

export const CustomImage: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      image: '/images.jfif',
      data: listData,
    },
    template: `<cl-list-box   [data]="data"  [image]="image"  [optionLabel]="optionLabel" [optionValue]="optionValue" ></cl-list-box>`,
  }),
};

export const CustomTemplate: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      data: [
        { name: 'ایتم یک', value: 1, pic: '/user.png' },
        { name: 'ایتم دو', value: 2, pic: '/user.png' },
        { name: 'ایتم سه', value: 3, pic: '/user.png' },
        { name: 'ایتم چهار', value: 4, pic: '/user.png' },
      ],
    },
    template: `<cl-list-box [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue">
     <ng-template clTemplate="item" let-data="data" let-index="index">
        <div style="background-color: #e9e2e287;width:100%;padding: 5px;display: flex;align-items: center;border-radius:2px">
          <img [src]="data.pic" style="width: 35px;height: 35px;border-radius: 50%;border: 2px solid white;margin-left: 10px;"/>
          <span> {{index+1}}- {{data.name}}</span>
          </div>
         </ng-template>
     </cl-list-box>`,
  }),
};

export const NestedItemLabel: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'location.geo.text',
      optionValue: 'value',
      data: [
        { value: 1, location: null },
        { value: 2, location: { geo: { text: 'متن تستی 2' } } },
        { value: 3, location: { geo: { text: 'متن تستی 3' } } },
        { value: 4, location: { geo: { text: 'متن تستی 4' } } },
      ],
    },
    template: `<cl-list-box   [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue"></cl-list-box>`,
  }),
};

export const Selectable: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      selectable: true,
      data: listData,
    },
    template: `<cl-list-box  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [selectable]="selectable"></cl-list-box>`,
  }),
};

export const MultiSelect: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      selectable: true,
      multiple: true,
      data: listData,
    },
    template: `<cl-list-box  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [selectable]="selectable" [multiple]="multiple"></cl-list-box>`,
  }),
};

export const MultiSelectDefaultValue: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      selectable: true,
      multiple: true,
      selectedOptions: [1, 3],
      data: listData,
    },
    template: `<cl-list-box [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [selectable]="selectable" [multiple]="multiple"  [(ngModel)]="selectedOptions"/>
        <p>{{ selectedOptions | json }}</p>`,
  }),
};

export const SelectDefaultValue: Story = {
  render: () => ({
    component: ClListBoxComponent,
    props: {
      optionLabel: 'name',
      optionValue: 'value',
      selectable: true,
      selectedOptions: 2,
      data: listData,
    },
    template: `<cl-list-box  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [selectable]="selectable"  [(ngModel)]="selectedOptions"/>
                <p>{{ selectedOptions | json }}</p>`,
  }),
};

export const WithFormControl: Story = {
  render: () => {
    let formGroup = new FormBuilder().group({
      listBox: new FormControl([2]),
    });

    return {
      component: ClListBoxComponent,
      props: {
        optionLabel: 'name',
        optionValue: 'value',
        selectable: true,
        multiple: true,
        data: listData,
        group: formGroup,
        controlName: "listBox",
      },
      template: `
            <form [formGroup]="group">
                <cl-list-box  [data]="data" [optionLabel]="optionLabel" [optionValue]="optionValue" [multiple]="multiple" [selectable]="selectable" [formControlName]="controlName"/>
            </form>
            <p>{{group.get(controlName)?.value}}</p>
`
    }
  },
};
