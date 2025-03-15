import {StoryObj, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { ClPickListComponent } from "@sadad/component-lib/src/lib/pick-list";
import { CommonModule } from "@angular/common";
import { action } from "@storybook/addon-actions";
import { HttpClientModule } from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";

export interface Product {
  name?: string;
  description?: string;
  price?: number;
}

const sourceProducts: Product[] = [
  {
    name: "پراید",
    description: "تولید سایپا",
    price: 10000000,
  },
  {
    name: "پژو 405",
    description: "تولید ایران خودرو",
    price: 20000000,
  },
  {
    name: "پژو 206",
    description: "تولید ایران خودرو",
    price: 40000000,
  },
  {
    name: "کوییک",
    description: "تولید سایپا",
    price: 15000000,
  },
  {
    name: "ال90",
    description: "تولید گروه بهمن",
    price: 45000000,
  },
];

const targetProducts: Product[] = [];

export default {
  title: "Components/Data/PickList",
  component: ClPickListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

export const defaultPickList: StoryObj<ClPickListComponent> = {
  render: (args) => {
    const onMoveitems = (value: any) => {
      action("item moves")();
      return JSON.stringify(value);
    };

    const sourceChanged = (value: any) => {
      action("source items changed")();
      return JSON.stringify(value);
    };

    const targetchanged = (value: any) => {
      action("target items changed")();
      return JSON.stringify(value);
    };

    return {
      props: {
        product: args.source,
        source: args.source,
        target: args.target,
        sourceHeader: args.sourceHeader,
        targetHeader: args.targetHeader,
        filter: args.filter,
        filterBy: args.filterBy,
        sourcePlaceHolder: args.sourcePlaceHolder,
        targetPlaceHolder: args.targetPlaceHolder,
        onMoveitems,
        sourceChanged,
        targetchanged,
      },
      template: `
          <cl-pick-list [source]="source" [target]="target" [sourceHeader]="sourceHeader" [targetHeader]="targetHeader"
          [filter]="filter" [filterBy]="filterBy" [sourcePlaceHolder]="sourcePlaceHolder" [targetPlaceHolder]="targetPlaceHolder"
           (onMove)="onMoveitems($event)" (onSourceChange)="sourceChanged($event)" (onTargetChange)="targetchanged($event)">
             <ng-template let-car #item>
                  <div  class="row">
                      <div class="col s12 m6">
                          <div class="row">
                              <i class="material-icons col s12 m4">directions_car</i>
                              <h5 class="col s12 m4">{{car.name}}</h5>
                              <span class="col s12 m4">{{car.description}}</span>
                          </div>
                      </div>
                      <div class="col s12 m6">
                          <h6>{{car.price}}</h6>
                      </div>
                  </div>
              </ng-template>
          </cl-pick-list>
           `,
    };
  },

  args: {
    source: sourceProducts,
    target: targetProducts,
    sourceHeader: "خودروهای موجود",
    targetHeader: "خودروهای انتخاب شده",
    filter: true,
    filterBy: "name",
    sourcePlaceHolder: "جستجوی نام کالا",
    targetPlaceHolder: "جستجوی نام کالا",
  },
};
