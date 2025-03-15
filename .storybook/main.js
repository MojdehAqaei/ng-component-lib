module.exports = {
  "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-docs',
    "@storybook/addon-mdx-gfm"
  ],

  "framework": {
    name: "@storybook/angular",

    options: {
      builder: {
        lazyCompilation: true,
        fsCache: true
      }
    }
  },

  staticDirs: ['../stories/assets'],

  docs: {
    autodocs: true
  }
}
