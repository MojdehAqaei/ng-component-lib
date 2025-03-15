import { StoryObj, Meta, moduleMetadata } from "@storybook/angular";
import {
  TabComponent,
  ClTabItemComponent,
} from "@sadad/component-lib/src/lib/tab";
import { CommonModule } from "@angular/common";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Panel/Tab",
  component: TabComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ClTabItemComponent],
    }),
  ],
} as Meta;

export const defaultTab: StoryObj<TabComponent> = {
  render: () => {
    const activeItemChange = (value: any) => {
      action("tab item is select")();
      return JSON.stringify(value);
    };

    return {
      component: TabComponent,
      props: {
        activeItemChange,
      },
      template: `
            <cl-tab (onActiveItemChange)="activeItemChange($event)">
              <cl-tab-item [tabTitle]="'عنوان 1'">Tab 1 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 2'">Tab 2 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 3'">Tab 3 content</cl-tab-item>
            </cl-tab>
            `,
    };
  },
};

export const activeTab: StoryObj<TabComponent> = {
  render: () => {
    const activeItemChange = (value: any) => {
      action("tab item is select")();
      return JSON.stringify(value);
    };

    return {
      component: TabComponent,
      props: {
        activeItemChange,
      },
      template: `
            <cl-tab (onActiveItemChange)="activeItemChange($event)">
              <cl-tab-item [tabTitle]="'عنوان 1'">Tab 1 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 2'" [active]="true">Tab 2 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 3'">Tab 3 content</cl-tab-item>
            </cl-tab>
            `,
    };
  },
};

export const withIcon: StoryObj<TabComponent> = {
  render: () => {
    return {
      component: TabComponent,
      props: {},
      template: `
            <cl-tab>
              <cl-tab-item [tabTitle]="'عنوان 1'" icon="email">Tab 1 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 2'" icon="contacts">Tab 2 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 3'" icon="description">Tab 3 content</cl-tab-item>
            </cl-tab>
            `,
    };
  },
};

export const moreTabWithoutScroll: StoryObj<TabComponent> = {
  render: () => {
    const activeItemChange = (value: any) => {
      action("tab item is select")();
      return JSON.stringify(value);
    };

    return {
      component: TabComponent,
      props: {
        activeItemChange,
      },
      template: `
            <cl-tab (onActiveItemChange)="activeItemChange($event)">
              <cl-tab-item [tabTitle]="'عنوان 1'">Tab 1 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 2'">Tab 2 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 3'">Tab 3 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 4'">Tab 4 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 5'">Tab 5 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 6'">Tab 6 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 7'">Tab 7 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 8'">Tab 8 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 9'">Tab 9 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 10'">Tab 10 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 11'">Tab 11 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 12'">Tab 12 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 13'">Tab 13 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 14'">Tab 14 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 15'">Tab 15 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 16'">Tab 16 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 17'">Tab 17 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 18'">Tab 18 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 19'">Tab 19 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 20'">Tab 20 content</cl-tab-item>
            </cl-tab>
            `,
    };
  },
};

export const moreTabWithScroll: StoryObj<TabComponent> = {
  render: () => {
    const activeItemChange = (value: any) => {
      action("tab item is select")();
      return JSON.stringify(value);
    };

    return {
      component: TabComponent,
      props: {
        activeItemChange,
      },
      template: `
            <cl-tab (onActiveItemChange)="activeItemChange($event)" [scrollable]="true">
              <cl-tab-item [tabTitle]="'عنوان 1'">Tab 1 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 2'">Tab 2 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 3'">Tab 3 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 4'">Tab 4 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 5'">Tab 5 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 6'">Tab 6 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 7'">Tab 7 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 8'">Tab 8 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 9'">Tab 9 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 10'">Tab 10 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 11'">Tab 11 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 12'">Tab 12 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 13'">Tab 13 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 14'">Tab 14 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 15'">Tab 15 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 16'">Tab 16 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 17'">Tab 17 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 18'">Tab 18 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 19'">Tab 19 content</cl-tab-item>
              <cl-tab-item [tabTitle]="'عنوان 20'">Tab 20 content</cl-tab-item>
            </cl-tab>
            `,
    };
  },
};
