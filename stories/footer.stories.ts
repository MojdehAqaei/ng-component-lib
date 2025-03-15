import type { StoryFn, Meta } from "@storybook/angular";

import { ClFooterComponent } from "@sadad/component-lib/src/lib/footer";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";

export default {
  title: "Components/Panel/Footer",
  component: ClFooterComponent,
  parameters: {
    backgrounds: {
      values: [
        { name: "white", value: "#f6f4f4" },
        { name: "black", value: "#494848" },
        { name: "blue", value: "#c0c0e0" },
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClTemplateDirective],
    }),
  ],
} as Meta;

const Template: StoryFn<ClFooterComponent> = (args: ClFooterComponent) => ({
  props: args,
});

export const Default = {
  render: Template,

  args: {
    copyRight: "1401",
    lastUpdate: "1401/05/10",
    appVersion: "0.0.2",
  },
};

export const JustCopyright = {
  render: Template,

  args: {
    copyRight: "1401",
  },
};

const CustomTemplate: StoryFn<ClFooterComponent> = (args) => ({
  props: args,
  template: `
<style>


  .footer-links{
    display: flex;
    flex-direction: column;
    align-items: start;
  }
   .footer-icons .material-icons{
   margin: 0 0.2em;
  }


</style>
  <cl-footer [appVersion]="appVersion" [copyRight]="copyRight" [lastUpdate]="lastUpdate" [positionFixed]="positionFixed">
<ng-template  clTemplate="column_1">
    <div class="footer-links">
      <span>تماس با ما</span>
      <span>درباره ما </span>
      <span>فرصت شغلی</span>
    </div>
  </ng-template>

  <ng-template clTemplate="column_2">
    <div  class="footer-links">
      <span>حریم خصوصی</span>
      <span>شرایط استفاده</span>
      <span>گزارش باگ</span>
    </div>
  </ng-template>

  <ng-template clTemplate="column_3">

   <div class="footer-icons">
   <span class="material-icons">whatsapp</span>
   <span class="material-icons">email</span>
   <span class="material-icons">location_on</span>
   <span class="material-icons">shop</span>
  </div>
  </ng-template>
  </cl-footer>
  `,
});

export const CustomContent = {
  render: CustomTemplate,

  args: {
    ...Default.args,
  },
};

export const justCustomContent = {
  render: CustomTemplate,
};

export const FixedBottom = {
  render: CustomTemplate,

  args: {
    ...Default.args,
    positionFixed: true,
  },
};
