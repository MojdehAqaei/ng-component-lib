import { StoryObj, StoryFn, Meta, moduleMetadata } from "@storybook/angular";
import { ClObjectToStringPipe } from "@sadad/component-lib/src/pipes";
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "cl-pipe-test",
  standalone: true,
  imports: [CommonModule, ClObjectToStringPipe],
  template: `
    <div style="margin-top: 20px">
      <p>
        ترتیب پارامترها باید رعایت شود به اینصورت که ابتدا separator تعرف شود و
        سپس بقیه پارامترها همچنین separator باید مقدار داشته باشد
      </p>
      <p>obj | ClObjectToString: ' ' : firstItem : secondItem : thirdItem</p>
      <br />
      <p style="white-space: pre">
        تبدیل به استرینگ:
        {{
          obj
            | ClObjectToString
              : " " + "-" + " "
              : firstItem
              : secondItem
              : thirdItem
        }}
      </p>
    </div>
  `,
})
class PipeTestComponent {
  @Input() obj = {};
  @Input() firstItem = "";
  @Input() secondItem = "";
  @Input() thirdItem = "";

  constructor() {}
}

export default {
  title: "Components/Misc/ObjectToStringPipe",
  component: PipeTestComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  args: {},
} as Meta;

const data = {
  label: "کاربر",
  data: "کاربر عادی",
  icon: "folder_open",
  children: {
    label: "سازمان",
    data: "شرکت سداد",
    icon: "work",
    children: {
      label: "واحد",
      icon: "note",
      data: "پروژه های ستادی",
    },
  },
};

export const defaultTest: StoryObj<PipeTestComponent> = {
  render: (args: PipeTestComponent) => ({
    props: {
      obj: args.obj,
      firstItem: args.firstItem,
      secondItem: args.secondItem,
      thirdItem: args.thirdItem,
    },
  }),

  args: {
    obj: data,
    firstItem: "label",
    secondItem: "children.data",
    thirdItem: "children.children.data",
  },
};
