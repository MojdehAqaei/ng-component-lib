import {Meta, moduleMetadata, StoryObj} from "@storybook/angular";
import {ClImageComponent} from "@sadad/component-lib/src/lib/image";
import {RouterTestingModule} from "@angular/router/testing";

export default {
  title: "Components/Media/Image",
  decorators: [
    moduleMetadata({
      imports: [ClImageComponent, RouterTestingModule],
    }),
  ],
  args: {},
} as Meta;

export const simpleImage: StoryObj<ClImageComponent> = {
  render: (args: ClImageComponent) => ({
    props: {
      src: args.src,
      preview: args.hasPreview,
      roundEdges: args.roundEdges,
    },
    template: `
      <div style="max-height: 300px; max-width: 300px;">
        <cl-image [src]="src" [hasPreview]="hasPreview" [roundEdges]="roundEdges"></cl-image>
      </div>

      `,
  }),

  args: {
    //src:'/tree.jpg',
    src: "/nature.jpeg",
    hasPreview: false,
    roundEdges: false,
  },
};

export const roundedImage: StoryObj<ClImageComponent> = {
  render: (args: ClImageComponent) => ({
    props: {
      src: args.src,
      hasPreview: args.hasPreview,
      roundEdges: args.roundEdges,
    },
    template: `
      <div style="max-height: 300px; max-width: 300px;">
        <cl-image [src]="src" [hasPreview]="hasPreview" [roundEdges]="roundEdges"></cl-image>
      </div>
       `,
  }),

  args: {
    src: "/nature.jpeg",
    hasPreview: false,
    roundEdges: true,
  },
};

export const withPreview: StoryObj<ClImageComponent> = {
  render: (args: ClImageComponent) => ({
    props: {
      src: args.src,
      hasPreview: args.hasPreview,
      roundEdges: args.roundEdges,
    },
    template: `
      <div style="max-height: 300px; max-width: 300px;">
      <cl-image [src]="src" [hasPreview]="hasPreview" [roundEdges]="roundEdges"></cl-image>
      </div>
      `,
  }),

  args: {
    //src:'/plant.jpg',
    src: "/nature.jpeg",
    hasPreview: true,
    roundEdges: false,
  },
};
