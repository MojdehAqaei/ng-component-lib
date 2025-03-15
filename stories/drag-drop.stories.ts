import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import { ClDragDropDirective } from "@sadad/component-lib/src/lib/drag-drop";

export default {
  title: "Components/Directive/DragDrop",
  decorators: [
    moduleMetadata({
      imports: [ClDragDropDirective],
    }),
  ],
  args: {},
} as Meta;

export const simple: StoryObj<ClDragDropDirective> = {
  render: () => ({
    props: {},
    template: `
      <style>
      .example-box {
          width: 200px;
          height: 200px;
          border: solid 1px #ccc;
          color: rgba(0, 0, 0, 0.87);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: #fff;
          border-radius: 4px;
          position: relative;
          z-index: 1;
          transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
            0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        }

        .example{
          border: solid 2px #ccc;
          width: 250px;
          height: 300px;
        }
      </style>
      <span>برای المانی که drag میشود باید یک id تعریف شود</span>
      <br>
      <br>
      <br>
      <div class="row">
        <div class="example-box col" id="dragelem" clDragDrop [draggable]="true">Drag me box</div>
        <div class="col">
        <div class="example col" clDragDrop [droppable]="true"></div>
      </div>

      `,
  }),
};
