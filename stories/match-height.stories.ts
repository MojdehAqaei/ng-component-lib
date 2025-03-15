import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClMatchHeightDirective } from "@sadad/component-lib/src/lib/match-height";
import { CommonModule } from "@angular/common";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClTextAreaComponent } from "@sadad/component-lib/src/lib/text-area";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Directive/MatchHeight",
  args: {},
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClMatchHeightDirective,
        HttpClientModule,
        ClInputTextComponent,
        ClTextAreaComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const matchWithInput: StoryObj<ClMatchHeightDirective> = {
  render: (args) => ({
    props: {
      maxWidth: args.maxWidth,
      minWidth: args.minWidth,
    },
    template: `
      <div clMatchHeight matchHeightClass="matchHeightInput" [maxWidth]="maxWidth" [minWidth]="minWidth" >
          <input class="matchHeightInput" type="text" placeholder="input">
          <br>
          <br>
          <div class="matchHeightInput" style="background-color: azure; width: 50%; border: 1px solid black;">
            div
          </div>
          <br>
          <div class="matchHeightInput">
          <cl-input-text [type]="text" placeholder="cl-input-text"></cl-input-text>
          </div>

      </div>
      `,
  }),

  args: {
    maxWidth: 700,
    minWidth: 500,
  },
};

export const matchWithTextArea: StoryObj<ClMatchHeightDirective> = {
  render: (args) => ({
    props: {
      maxWidth: args.maxWidth,
      minWidth: args.minWidth,
    },
    template: `
      <div clMatchHeight matchHeightClass="matchHeightArea" [maxWidth]="maxWidth" [minWidth]="minWidth" >
          <textarea class="matchHeightArea" placeholder="textarea"></textarea>
          <br>
          <br>
          <div class="matchHeightArea" style="background-color: azure; width: 50%; border: 1px solid black;">
            div
          </div>
          <br>
          <cl-text-area class="matchHeightArea" placeholder="cl-text-area"></cl-text-area>
      </div>
      `,
  }),

  args: {
    maxWidth: 700,
    minWidth: 500,
  },
};
