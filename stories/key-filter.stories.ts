import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClKeyFilterDirective } from "@sadad/component-lib/src/lib/key-filter";
import { CommonModule } from "@angular/common";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClInputNumberComponent } from "@sadad/component-lib/src/lib/input-number";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: "Components/Form/KeyFilter",
  args: {},
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClKeyFilterDirective,
        ClInputTextComponent,
        ClInputNumberComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const Document: StoryObj<ClKeyFilterDirective> = {
  render: (args: ClKeyFilterDirective) => ({
    template: `
      <input  clKeyFilter="int" type="text" placeholder="int">
      <br>
      <br>
      <cl-input-text  clKeyFilter="pint" type="text" placeholder="pint"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="email" type="email" placeholder="email"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="int" type="text" placeholder="int"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="num" type="text" placeholder="num"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="pnum" type="text" placeholder="pnum"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="alpha" type="text" placeholder="alpha"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="alphanum" type="text" placeholder="alphanum"></cl-input-text>
      <br>
      <br>
      <cl-input-text  clKeyFilter="alphaNumPersian" type="text" placeholder="alphaNumPersian"></cl-input-text><br>
      <br>
      <cl-input-number  clKeyFilter="pint" type="text" placeholder="pint"></cl-input-number>
      `,
  }),
};
