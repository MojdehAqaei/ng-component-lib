import { ColorPickerComponent } from "@sadad/component-lib/src/lib/color-picker";
import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

export default {
  title: "Components/Form/ColorPicker",
  component: ColorPickerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta;

type Story = StoryObj<ColorPickerComponent>;

export const defaultPicker: Story = {
  render: () => ({
    props: {
      label: "انتخاب رنگ",
      icon: "colorize",
    },
    template: `
   <cl-color-picker [label]="label" [icon]="icon" ></cl-color-picker>`,
  }),
};
