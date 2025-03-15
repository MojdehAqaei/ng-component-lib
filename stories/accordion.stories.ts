import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import {
  ClAccordionComponent,
  ClAccordionItemComponent,
} from "@sadad/component-lib/src/lib/accordion";
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { CommonModule } from "@angular/common";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Panel/Accordion",
  component: ClAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClAccordionItemComponent, ClTemplateDirective],
    }),
  ],
} as Meta;

export const defaultAccordion: StoryObj<ClAccordionComponent> = {
  render: (args: ClAccordionComponent) => {
    const onTogglePanel = (value: any) => {
      action("click on accordion item")();
      return JSON.stringify(value);
    };

    return {
      component: ClAccordionComponent,
      props: {
        listItems: [
          { name: "آیتم 1", isOpened: true, desc: "محتوای 1" },
          { name: "آیتم 2", isOpened: false, desc: "محتوای 2" },
          { name: "آیتم 3", isOpened: false, desc: "محتوای 3" },
        ],
        onTogglePanel,
      },
      template: `
          <cl-accordion>
            <cl-accordion-item *ngFor="let i of listItems" [title]="i.name" [opened]="i.isOpened" (onToggle)="onTogglePanel($event)">{{i.desc}}</cl-accordion-item>
          </cl-accordion>
          `,
    };
  },
};

export const multiple: StoryObj<ClAccordionComponent> = {
  render: (args: ClAccordionComponent) => {
    const onTogglePanel = (value: any) => {
      action("click on accordion item")();
      return JSON.stringify(value);
    };

    return {
      component: ClAccordionComponent,
      props: {
        listItems: [
          { name: "آیتم 1", isOpened: true, desc: "محتوای 1" },
          { name: "آیتم 2", isOpened: false, desc: "محتوای 2" },
          { name: "آیتم 3", isOpened: false, desc: "محتوای 3" },
        ],
        onTogglePanel,
        multiple: args.multiple,
      },
      template: `
          <cl-accordion [multiple]="multiple">
            <cl-accordion-item *ngFor="let i of listItems" [title]="i.name" [opened]="i.isOpened" (onToggle)="onTogglePanel($event)">{{i.desc}}</cl-accordion-item>
          </cl-accordion>
          `,
    };
  },

  args: {
    multiple: true,
  },
};

export const disabled: StoryObj<ClAccordionComponent> = {
  render: (args: ClAccordionComponent) => {
    const onTogglePanel = (value: any) => {
      action("click on accordion item")();
      return JSON.stringify(value);
    };

    return {
      component: ClAccordionComponent,
      props: {
        listItems: [
          { name: "آیتم 1", isOpened: true, desc: "محتوای 1" },
          { name: "آیتم 2", isOpened: false, desc: "محتوای 2" },
          { name: "آیتم 3", isOpened: false, desc: "محتوای 3", disabled: true },
        ],
        onTogglePanel,
      },
      template: `
          <cl-accordion>
            <cl-accordion-item *ngFor="let i of listItems" [title]="i.name" [opened]="i.isOpened" [disabled]="i.disabled" (onToggle)="onTogglePanel($event)">{{i.desc}}</cl-accordion-item>
          </cl-accordion>
          `,
    };
  },
};

export const withTemplate: StoryObj<ClAccordionComponent> = {
  render: (args: ClAccordionComponent) => {
    const onTogglePanel = (value: any) => {
      action("click on accordion item")();
      return JSON.stringify(value);
    };

    return {
      component: ClAccordionComponent,
      template: `
          <cl-accordion>
            <cl-accordion-item>
              <ng-template clTemplate="title">
                <i class="material-icons" style="margin:0 5px;">check_circle</i>
                <span>آیتم 1</span>
              </ng-template>
              محتوای 1
            </cl-accordion-item>
            <cl-accordion-item>
              <ng-template clTemplate="title">
                <i class="material-icons" style="margin:0 5px;">report_problem</i>
                <span>آیتم 2</span>
              </ng-template>
              محتوای 2
            </cl-accordion-item>
            <cl-accordion-item>
              <ng-template clTemplate="title">
                <i class="material-icons" style="margin:0 5px;">description</i>
                <span>آیتم 3</span>
              </ng-template>
              محتوای 3
            </cl-accordion-item>
          </cl-accordion>
          `,
    };
  },
};
