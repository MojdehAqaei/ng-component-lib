import { ClSpinnerComponent } from "@sadad/component-lib/src/lib/spinner";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Misc/Spinner",
  component: ClSpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, BrowserAnimationsModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

type Story = StoryObj<ClSpinnerComponent>;

export const defaultSpinner: Story = {
  render: () => ({
    props: {
      show: true,
      colorList: ["#d62d20", "#0057e7", "#008744", "#ffa700"],
      size: "md",
    },
    template: `
    <span>برای رنگ باید از یک آرایه 4 آیتمی استفاده شود</span>
    <cl-spinner [show]="show" [colorList]="colorList" [size]="size"></cl-spinner>`,
  }),
};
