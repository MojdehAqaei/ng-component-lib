import '!style-loader!css-loader!sass-loader!./../projects/component-lib/src/styles/normalize.scss';
import '!style-loader!css-loader!sass-loader!../projects/component-lib/src/styles/theme.scss';
import '!style-loader!css-loader!sass-loader!./../projects/component-lib/src/styles/rtl.scss';
import '!style-loader!css-loader!sass-loader!./../projects/component-lib/src/styles/primeicons.scss';
import '!style-loader!css-loader!sass-loader!./../projects/component-lib/src/styles/primeng.scss';

import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}
