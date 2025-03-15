import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ClLoadingComponent } from "@sadad/component-lib/src/lib/loading";
import { CommonModule } from "@angular/common";
import { ClLoadingService } from "@sadad/component-lib/src/services";
import { Component } from "@angular/core";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "cl-loading-test",
  standalone: true,
  imports: [
    CommonModule,
    ClLoadingComponent,
    HttpClientModule,
    ClButtonComponent,
  ],
  template: `
    <cl-button
      type="success"
      [label]="'show loading'"
      (onClick)="showLoading()"
      style="margin-left: 10px"
    ></cl-button>
    <cl-button
      type="danger"
      [label]="'hide loading'"
      (onClick)="hideLoading()"
    ></cl-button>
    <br />
    <br />
    <cl-loading mode="indeterminate"></cl-loading>
  `,
})
class LoadingTest {
  constructor(private _loadingService: ClLoadingService) {}

  showLoading() {
    this._loadingService.show("indeterminate");
  }

  hideLoading() {
    this._loadingService.hide("indeterminate");
  }
}

export default {
  title: "Components/Misc/Loading",
  component: LoadingTest,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, LoadingTest],
      providers: [ClLoadingService],
    }),
  ],
} as Meta;

type Story = StoryObj<LoadingTest>;

export const defaultLoading: Story = {
  render: () => ({
    component: LoadingTest,
    props: {},
  }),
};
