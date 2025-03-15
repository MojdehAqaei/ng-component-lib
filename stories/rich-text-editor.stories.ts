import { ClRichTextEditorComponent } from "@sadad/component-lib/src/lib/rich-text-editor";
import {applicationConfig, Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Form/RichTextEditor",
  component: ClRichTextEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

type Story = StoryObj<ClRichTextEditorComponent>;

export const defaultEditor: Story = {
  render: () => ({
    props: {},
    template: `
   <cl-rich-text-editor></cl-rich-text-editor>`,
  }),
};
