import {ClDatePickerComponent} from "@sadad/component-lib/src/lib/date-picker";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {
  FormBuilder, FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";


export default {
  title: "Components/Form/DatePicker",
  component: ClDatePickerComponent,
  args: {
    placeholder: 'تاریخ'
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
  })
  ]
} as Meta;

type Story = StoryObj<ClDatePickerComponent>;

export const Default: Story = {
  args: {
  }
};


export const WithRange: Story = {
  args: {
    range: {
      min: '2024-05-25',
      max: '2024-05-31'
    }
  }
};

export const Formatted: Story = {
  args: {
    format: 'YYYY MMMM DD'
  }
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      disabled: args.disabled
    },
    template: `<cl-date-picker [disabled]="disabled"/>`
  }),
  args: {
    disabled: true
  }
};

export const Positioning: Story = {
  render: () => ({
    template: `
      <div style="height: calc(100vh - 91px)"></div>
      <cl-date-picker [disabled]="disabled"/>
    `
  }),
}

export const WithClearButton: Story = {
  render: (args) => ({
    props: {
      value: null,
      clear: args.clear
    },
    template: `
      <cl-date-picker [clear]="clear" [(ngModel)]="value"/>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{value}}</p>
      </div>
    `
  }),
  args: {
    clear: true
  }
}

export const WithNgModel: Story = {
  render: (args) => ({
    props: {
      temp: new Date('2024-08-01')
    },
    template: `
      <cl-date-picker [(ngModel)]="temp"/>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  })
};

export const WithFormControl: Story = {
  render: () => {
    let formGroup = new FormBuilder().group({
      date: new FormControl
    });
    return {
      props: {
        group: formGroup,
        controlName: "date",
      },
      template: `
        <form [formGroup]="group">
             <cl-date-picker [formControlName]="controlName"/>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  }
};
