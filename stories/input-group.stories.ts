import { StoryObj, Meta, moduleMetadata, StoryFn } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ClInputGroupComponent } from "@sadad/component-lib/src/lib/input-group";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { ClAutofocusDirective } from "@sadad/component-lib/src/lib/auto-focus";

export default {
  title: "Components/Form/InputGroup",
  component: ClInputGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ClButtonComponent,
        ClAutofocusDirective,
      ],
    }),
  ],
} as Meta;

const Template: StoryFn<ClInputGroupComponent> = (args) => ({
  component: ClInputGroupComponent,
  props: args,
});

export const Default: StoryObj<ClInputGroupComponent> = {
  render: (args) => ({
    component: ClInputGroupComponent,
    props: {
      ...args,
      addons: [{ label: "+98", position: "end" }],
      addons1: [
        { icon: "search", type: "button", position: "start" },
        { icon: "person", type: "icon", position: "end" },
      ],
      addons2: [
        { icon: "search", type: "button", position: "start" },
        { icon: "person", type: "icon", position: "start" },
      ],
      addons3: [
        { icon: "search", type: "button", position: "end" },
        { icon: "person", type: "icon", position: "end" },
      ],
      addons4: [
        {
          icon: "clear",
          type: "button",
          position: "end",
          styleClasses: "red darken-2",
        },
        { icon: "check", type: "button", position: "end" },
        { icon: "person", type: "icon", position: "start" },
      ],
    },
    template: `
     <cl-input-group  [addons]="addons"  ></cl-input-group>
     <br/>

     <cl-input-group  [addons]="addons1" ></cl-input-group>
     <br/>

     <cl-input-group  [addons]="addons2" ></cl-input-group>
     <br/>

     <cl-input-group  [addons]="addons3" ></cl-input-group>
     <br/>

     <cl-input-group  [addons]="addons4" clAutoFocus></cl-input-group>
     <br/>
  `,
  }),

  args: {},
};

export const Disabled: StoryObj<ClInputGroupComponent> = {
  render: (args) => ({
    component: ClInputGroupComponent,
    props: {
      addons: args.addons,
      placeholder: args.placeholder,
      disabled: args.disabled,
    },
    template: `
      <cl-input-group [addons]="addons"  [placeholder]="placeholder" [disabled]="disabled"></cl-input-group>`,
  }),

  args: {
    placeholder: "تلفن",
    addons: [
      { icon: "phone", type: "button", position: "start" },
      { label: "+98", position: "end" },
    ],
    disabled: true,
  },
};

export const WithNgModel: StoryObj<ClInputGroupComponent> = {
  render: (args) => ({
    props: {
      temp: null,
      addons: args.addons,
      placeholder: args.placeholder,
    },
    template: `
      <cl-input-group [addons]="addons"  [placeholder]="placeholder"  [(ngModel)]="temp"></cl-input-group>
      <div style="margin-top: 20px">
          <p style="white-space: pre">مقدار برگشتی  :{{temp}}</p>
      </div>`,
  }),

  args: {
    placeholder: "تلفن",
    addons: [
      { icon: "phone", type: "button", position: "start" },
      { label: "+98", position: "end" },
    ],
  },
};

export const WithFormControl: StoryObj<ClInputGroupComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      tel: new FormControl(null),
    });

    return {
      component: ClInputGroupComponent,
      props: {
        addons: args.addons,
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "tel",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-group  [addons]="addons" [placeholder]="placeholder"  [formControlName]="controlName"></cl-input-group>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  },

  args: {
    placeholder: "تلفن",
    addons: [
      { icon: "phone", type: "button", position: "start" },
      { label: "+98", position: "end" },
    ],
  },
};

export const DisabledFormControl: StoryObj<ClInputGroupComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      tel: new FormControl({ value: null, disabled: true }),
    });

    return {
      component: ClInputGroupComponent,
      props: {
        addons: args.addons,
        placeholder: args.placeholder,
        group: formGroup,
        controlName: "tel",
      },
      template: `
        <form [formGroup]="group">
             <cl-input-group [addons]="addons"  [placeholder]="placeholder" [formControlName]="controlName"></cl-input-group>
        </form>

        <div style="margin-top: 20px">
          <p style="white-space: pre">
          مقدار برگشتی  : {{group.get(controlName).value}}</p>
        </div>
      `,
    };
  },

  args: {
    placeholder: "تلفن",
    addons: [
      { icon: "phone", type: "button", position: "start" },
      { label: "+98", position: "end" },
    ],
  },
};
