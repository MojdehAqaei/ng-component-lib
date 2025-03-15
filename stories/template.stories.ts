import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import type { StoryObj, StoryFn, Meta } from "@storybook/angular";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";

export default {
  title: "Components/Directive/ClTemplate",
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClTemplateDirective],
    }),
  ],
} as Meta;

export const Document: StoryObj<any> = {
  render: (args) => ({
    props: {
      text: "از clTemplate برای customize بخشی از content  در  component  های دیگر میتوان استفاده کرد ",
      code: `
      <cl-data-table>
        <ng-template  clTemplate="header">
           <section>    this is header section</section>
         </ng-template>
         <ng-template  clTemplate="caption">
            <section>    this is caption section</section>
         </ng-template>
         <ng-template  clTemplate="footer">
             <section>    this is footer section</section>
         </ng-template>
      </cl-data-table>
  `,
    },
    template: `
   <style>
            p{
            line-height:1.5;
            }
            pre{
             direction: ltr;background-color: #02024b;color: white;padding:5px
            }
       </style>
    <p >{{text}}</p>
    <br/>
    <pre >{{code}}</pre>

  `,
  }),
};
