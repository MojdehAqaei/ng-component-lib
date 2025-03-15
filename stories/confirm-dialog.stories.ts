import type { StoryObj, Meta, StoryFn } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ClConfirmationService } from "@sadad/component-lib/src/services";
import { action } from "@storybook/addon-actions";
import { Component, Input, ViewContainerRef } from "@angular/core";

@Component({
  selector: "cl-dialog-test",
  standalone: true,
  imports: [CommonModule],
  template: ` <button (click)="show()">نمایش dialog</button>`,
})
export class DialogTestComponent {
  @Input() header?: string;
  @Input() icon?: string;
  @Input() message?: string;
  @Input() rejectStyleClasses?: string;
  @Input() acceptStyleClasses?: string;
  @Input() acceptIcon?: string;
  @Input() acceptLabel?: string;
  @Input() acceptVisible?: boolean;
  @Input() rejectIcon?: string;
  @Input() rejectLabel?: string;
  @Input() rejectVisible?: boolean;
  @Input() closable?: boolean;
  @Input() baseZIndex?: number;
  @Input() reject?: Function;
  @Input() accept?: Function;

  constructor(
    private _confirmationService: ClConfirmationService,
    private _viewRef: ViewContainerRef,
  ) {}

  show() {
    this._confirmationService.confirm(this._viewRef, {
      header: this.header,
      icon: this.icon,
      message: this.message,
      acceptIcon: this.acceptIcon,
      acceptLabel: this.acceptLabel,
      acceptVisible: this.acceptVisible,
      acceptStyleClasses: this.acceptStyleClasses,
      rejectIcon: this.rejectIcon,
      rejectLabel: this.rejectLabel,
      rejectVisible: this.rejectVisible,
      rejectStyleClasses: this.rejectStyleClasses,
      closable: this.closable,
      baseZIndex: this.baseZIndex,
      accept: this.accept,
      reject: this.reject,
    });
  }
}

export default {
  title: "Components/Overlay/ConfirmDialog",
  component: DialogTestComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  args: {
    acceptVisible: true,
    rejectVisible: true,
    acceptLabel: "بله",
    rejectLabel: "خیر",
    closable: false,
    baseZIndex: 1101,
    message: "آیا از تایید درخواست اطمینان دارید ؟",
  },
} as Meta;

const Template: StoryFn<DialogTestComponent> = (args) => ({
  props: {
    header: args.header,
    icon: args.icon,
    message: args.message,
    acceptIcon: args.acceptIcon,
    acceptLabel: args.acceptLabel,
    acceptVisible: args.acceptVisible,
    acceptStyleClasses: args.acceptStyleClasses,
    rejectIcon: args.rejectIcon,
    rejectLabel: args.rejectLabel,
    rejectVisible: args.rejectVisible,
    rejectStyleClasses: args.rejectStyleClasses,
    closable: args.closable,
    baseZIndex: args.baseZIndex,
    accept: () => {
      action("accept");
    },
    reject: () => {
      action("reject");
    },
    btnLabel: "نمایش confirm-dialog",
  },
});

export const Document: StoryObj<DialogTestComponent> = {
  render: () => ({
    props: {
      text1:
        " برای استفاده از کامپوننت ابتدا سرویس ConfirmationService  و ViewContainerRef  رو  Inject  کنید و متد  confirm   سرویس  confirmationService رو اجرا کنید .  ورودی متد  confirm  یک   viewContainerRef و   object از Confirmation  می باشد .  ",
      codeSample: `
    @Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app.component.html',
  })
  export class AppComponent  {

    constructor(private _confirmationService: ConfirmationService,
                private _viewRef: ViewContainerRef) {
    }

    show() {
      this._confirmationService.confirm(this._viewRef ,{
        header: 'some header',
        icon: 'material icon',
        message: 'some message',
      })

    }

  }`,
    },
    template: `
   <style>
            p{
            line-height:1.5;
            }
            pre{
             direction: ltr;background-color: #050528;color: white;padding:5px
            }

   </style>
    <p>{{text1}}</p>
    <br/>
    <pre>{{codeSample}}</pre>

      `,
  }),
};

export const SetIcon = {
  render: Template,

  args: {
    icon: "info",
  },
};

export const SetHeader = {
  render: Template,

  args: {
    header: "پرسشنامه",
  },
};

export const CloseAble = {
  render: Template,

  args: {
    closable: true,
  },
};

export const AcceptButtonVisible = {
  render: Template,

  args: {
    acceptVisible: false,
  },
};

export const RejectButtonVisible = {
  render: Template,

  args: {
    rejectVisible: false,
  },
};

export const CustomAcceptRejectBtn = {
  render: Template,

  args: {
    acceptLabel: "مطمینم",
    acceptIcon: "check",
    rejectLabel: "اصلا",
    rejectIcon: "clear",
  },
};
