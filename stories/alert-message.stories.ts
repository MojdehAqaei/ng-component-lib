import { ClAlertMessagesComponent } from "@sadad/component-lib/src/lib/alert-message";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";

export default {
  title: "Components/Message/AlertMessages",
  component: ClAlertMessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta;

type Story = StoryObj<ClAlertMessagesComponent>;

export const Default: Story = {
  render: () => ({
    Component: ClAlertMessagesComponent,
    props: {
      messageList: [
        {
          type: "success",
          icon: "check",
          detail: "عملیات با موفقیت انجام شد",
          closeable: true,
        },
        {
          type: "warning",
          icon: "warning",
          detail: "<u>عملیات</u> مورد نظر تمام نشده است",
          closeable: false,
        },
        {
          type: "info",
          icon: "info_outline",
          detail: "عملیات در حال انجام شدن است",
          closeable: true,
        },
      ],
    },
    template: `<cl-alert-message [messages]="messageList"></cl-alert-message>`,
  }),
};
