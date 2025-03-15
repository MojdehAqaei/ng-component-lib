import { JsonPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ClDynamicDialogService, DIALOG_DATA } from "@sadad/component-lib/src/services";
import { Meta, StoryObj } from "@storybook/angular";

@Component({
    selector: "cl-child",
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div>
        {{data | json}}
    </div>
  `,
})
class ChildComponent  {
    data = inject(DIALOG_DATA);
}


@Component({
    selector: "cl-parent",
    standalone: true,
    imports: [JsonPipe],
    styles: `
    .btn{
            background-color:#0088ff;
            color:white;
            border:1px solid white;
            padding:5px;
            border-radius:3px;
            margin:10px;
            }
            `,
    template: `
        <button class="btn" (click)="openDialog()">open</button>
    `,
    providers: [ClDynamicDialogService]
  })
  class ParentComponent {
      dynamicDialogService = inject(ClDynamicDialogService);
      openDialog() {
        const ref = this.dynamicDialogService.open(ChildComponent, {
            width: '500px',
            closeable: true,
            dismissible: false,
            data: { data: 'test' }
        });

        ref.onClose.subscribe((result:any) => {
           alert('close')
        });
    }
  }

  export default {
    title: "Components/Overlay/DynamicDialog",
    component: ParentComponent,
    args: {},
  } as Meta;

type Story = StoryObj<ParentComponent>;

export const Default: Story = {
  render: () => ({
    component: ParentComponent,
    props: {},
  }),
};
