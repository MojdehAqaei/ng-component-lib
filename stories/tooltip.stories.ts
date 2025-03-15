import { ClTooltipDirective } from "@sadad/component-lib/src/lib/tooltip";
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryFn,
} from "@storybook/angular";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/Overlay/Tooltip",
  decorators: [
    moduleMetadata({
      imports: [ClTooltipDirective, HttpClientModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em">${story}</div>`,
    ),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const template: StoryFn<any> = (args: any) => ({
  props: args,
  template: `
      <span clTooltip="left description" placement="left"  style="margin:10px;word-break: keep-all">tootip on left</span>
      <span clTooltip="top description" placement="top" delay="500" style="margin:10px">tootip on top</span>
      <span clTooltip="bottom description" placement="bottom" delay="500" style="margin:10px">tootip on bottom</span>
      <span clTooltip="right description" placement="right" style="margin:10px;">tootip on right</span>
`,
});

export const Default = {
  render: template,
};
