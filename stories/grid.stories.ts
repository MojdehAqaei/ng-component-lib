import { StoryObj, StoryFn, Meta } from "@storybook/angular";

export default {
  title: "Components/Misc/Grid",
} as Meta;

export const responsiveGrid: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
      <style>
      .box {
          background-color: #cce4f7;
          text-align: center;
          padding-top: 1em;
          padding-bottom: 1em;
          border-radius: 4px;
          color: #333333;
          margin: 5px;
      }
      </style>
      <div class="row">
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
        <div class="col s12 m6 l4 xl2">
          <div class="box">s12 m6 l4 xl2</div>
        </div>
      </div>
      `,
  }),
};
