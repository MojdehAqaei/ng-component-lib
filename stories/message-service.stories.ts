import { ClMessageTypes } from "@sadad/component-lib/src/enums";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClMessageService } from "@sadad/component-lib/src/services";
import { Meta, StoryObj } from "@storybook/angular";

@Component({
  selector: "cl-dummy",
  standalone: true,
  template: ``,
  imports: [CommonModule],
})
class DummyComponent {
  constructor(private _messageService: ClMessageService) {
    this._messageService.add({
      type: ClMessageTypes.error,
      detail: "خطایی رخ داده است ",
      summary: "خطا",
      lifeTime: 2000,
      closeable: true,
    });
    this._messageService.add({
      type: ClMessageTypes.help,
      detail: "فایل راهنما را مطالعه کنید ",
      summary: "راهنما",
      lifeTime: 2500,
      closeable: true,
    });
    this._messageService.add({
      type: ClMessageTypes.info,
      detail: "خطایی رخ داده است ",
      lifeTime: 3000,
      closeable: true,
    });
    this._messageService.add({
      type: ClMessageTypes.success,
      detail: "خطایی رخ داده است ",
      lifeTime: 3500,
      closeable: true,
    });
    this._messageService.add({
      type: ClMessageTypes.warning,
      detail: "هشدار محدودیت سال ",
      closeable: true,
    });
  }
}

export default {
  title: "Components/Message/MessageService",
  component: DummyComponent,
  args: {},
} as Meta;

type Story = StoryObj<DummyComponent>;

export const Default: Story = {
  render: () => ({
    component: DummyComponent,
    props: {},
  }),
};
