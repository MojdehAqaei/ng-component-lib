import {applicationConfig, Meta, moduleMetadata, StoryFn} from "@storybook/angular";
import { ClTourAnchorDirective } from "@sadad/component-lib/src/lib/tour-anchor";
import { ClTourComponent } from "@sadad/component-lib/src/lib/tour";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { CommonModule } from "@angular/common";
import {AfterViewInit, Component, importProvidersFrom, Input} from "@angular/core";
import { ClTourService } from "@sadad/component-lib/src/services";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: "cl-dummy",
  standalone: true,
  imports: [CommonModule, ClTourAnchorDirective, ClInputTextComponent],
  template: `
    <div
      style="display: flex; flex-direction: row;justify-content: space-around"
    >
      <div clTourAnchor="anchor_fName">
        <cl-input-text placeholder="نام"></cl-input-text>
      </div>
      <div clTourAnchor="anchor_lName">
        <cl-input-text placeholder="نام خانوادگی"></cl-input-text>
      </div>
    </div>
  `,
})
class DummyComponent implements AfterViewInit {
  @Input() showStartBtn = true;

  constructor(private tourService: ClTourService) {
    this.tourService.initialize([
      {
        anchorId: "anchor_fName",
        content: " فقط کاراکتر فارسی مجاز میباشد",
      },
      {
        anchorId: "anchor_lName",
        content: "فقط کاراکتر فارسی و اعداد مجاز میباشد",
      },
    ]);
  }

  ngAfterViewInit() {
    if (!this.showStartBtn) {
      this.tourService.start();
    }
  }
}

export default {
  title: "Components/Tour/Tour",
  decorators: [
    moduleMetadata({
      imports: [
        ClTourAnchorDirective,
        ClTourComponent,
        ClInputTextComponent,
        DummyComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const Template: StoryFn<ClTourComponent> = (args) => ({
  props: {
    show: args.showStartBtn,
  },
  template: `

   <cl-tour [showStartBtn]="show"
            prevBtnTitle="قبلی"
            nextBtnTitle="بعدی"
            endBtnTitle="پایان"
             ></cl-tour>
   <cl-dummy [showStartBtn]="show"></cl-dummy>
`,
});

export const Default = {
  render: Template,

  args: {
    showStartBtn: true,
  },
};

export const DisableStartBtn = {
  render: Template,

  args: {
    showStartBtn: false,
  },
};
