import { moduleMetadata, StoryObj, Meta } from "@storybook/angular";

import { ClDrawerComponent } from "@sadad/component-lib/src/lib/drawer";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";

export default {
  title: "Components/Overlay/Drawer",
  component: ClDrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [ClButtonComponent],
    }),
  ],
} as Meta;

type Story = StoryObj<ClDrawerComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      visible: false,
      width: "300px",
      position: "right",
      headerIcon: "home",
      headerTitle: "عنوان",
      appendTo: "body",
    },
    template: `
        <cl-drawer [(visible)]="visible"
                   [headerIcon]="headerIcon"
                   [headerTitle]="headerTitle"
                   [position]="position"
                   [width]="width">
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
        </cl-drawer>

        <cl-button label="کلیک کنید" (onClick)="visible = !visible"></cl-button>
    `,
  }),
};
