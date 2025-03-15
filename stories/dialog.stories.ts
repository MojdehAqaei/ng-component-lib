import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClDialogComponent } from "@sadad/component-lib/src/lib/dialog";

export default {
  title: "Components/Overlay/Dialog",
  decorators: [
    moduleMetadata({
      imports: [ClDialogComponent, ClTemplateDirective],
    }),
  ],
} as Meta;

type Story = StoryObj<ClDialogComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      showDialog: null,
      showDialog_1: null,
      content: `لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.`,
    },
    template: `

     <style>
        .btn{
          background-color:#0088ff;
          color:white;
          border:1px solid white;
          padding:5px;
          border-radius:3px;
          margin:10px;
        }
     </style>


       <button class="btn" (click)="dialog.show()">open by reference</button>
       <cl-dialog #dialog [(visible)]="showDialog" header="عنوان" [resizeable]="true">
         dialog is open : {{showDialog}}
       </cl-dialog>

      <button class="btn" (click)="showDialog_1 = true">center</button>
      <cl-dialog [(visible)]="showDialog_1" header="عنوان">
       {{content}}
      </cl-dialog>

       <button class="btn" (click)="dialog_topLeft.show()">topLeft</button>
       <cl-dialog #dialog_topLeft header="عنوان" position="topLeft">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_bottomLeft.show()">bottomLeft</button>
       <cl-dialog #dialog_bottomLeft header="عنوان" position="bottomLeft">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_5.show()">topRight</button>
       <cl-dialog #dialog_5 header="عنوان" position="topRight">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_bottomRight.show()">bottomRight</button>
       <cl-dialog #dialog_bottomRight header="عنوان" position="bottomRight">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_top.show()">top</button>
       <cl-dialog #dialog_top header="عنوان" position="top">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_bottom.show()">bottom</button>
       <cl-dialog #dialog_bottom header="عنوان" position="bottom">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_right.show()">right</button>
       <cl-dialog #dialog_right header="عنوان" position="right">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_left.show()">left</button>
       <cl-dialog #dialog_left header="عنوان" position="left">
         some content
       </cl-dialog>

      <button class="btn" (click)="dialog_onTop.show($event)">onButtonTop</button>
       <cl-dialog #dialog_onTop header="عنوان" position="top">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_onBottom.show($event)">onButtonBottom</button>
       <cl-dialog #dialog_onBottom header="عنوان" position="bottom">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_onRight.show($event)">onButtonRight</button>
       <cl-dialog #dialog_onRight header="عنوان" position="right">
         some content
       </cl-dialog>

       <button class="btn" (click)="dialog_onLeft.show($event)">onButtonLeft</button>
       <cl-dialog #dialog_onLeft header="عنوان" position="left">
         some content
       </cl-dialog>

`,
  }),
};

export const Dismissible: Story = {
  render: () => ({
    template: `
   <button class="btn" (click)="dialog.show()">open Dialog</button>
       <cl-dialog #dialog  header="عنوان" [dismissible]="true">
             some content
       </cl-dialog>
`,
  }),
};

export const WithTemplate: Story = {
  render: () => ({
    template: `
   <button class="btn" (click)="dialog.show()">open Dialog</button>
       <cl-dialog #dialog>
       <ng-template clTemplate="header"> header</ng-template>
          some content
       <ng-template clTemplate="footer"> footer</ng-template>

       </cl-dialog>
`,
  }),
};
