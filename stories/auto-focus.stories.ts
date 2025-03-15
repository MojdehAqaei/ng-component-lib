import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import { ClAutofocusDirective } from "@sadad/component-lib/src/lib/auto-focus";
import { CommonModule } from "@angular/common";

export default {
  title: "Components/Directive/AutoFocus",
  args: {},
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClAutofocusDirective],
    }),
  ],
} as Meta;

export const inputFocus: StoryObj<ClAutofocusDirective> = {
  render: () => ({
    template: `<input type="text" clAutoFocus placeholder="focused"> `,
  }),
};
