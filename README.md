# vue-cli-plugin-uikit
A [vue-cli plugin](https://cli.vuejs.org/guide/plugins-and-presets.html) to add [UIKit](https://getuikit.com) to a Vue project.

## Requires `@vue/cli`

Make sure [`@vue/cli` is installed](https://cli.vuejs.org/guide/installation.html) globally

```sh
yarn global add @vue/cli
```

## Add this plugin to an existing project

```sh
vue add uikit
```

— Or —

```sh
yarn add --dev vue-cli-plugin-uikit 
vue invoke uikit
```

## Changes to your project made by this plugin

_**[When installing any vue-cli plugin](https://cli.vuejs.org/guide/plugins-and-presets.html#installing-plugins-in-an-existing-project), you should first commit any other changes you’ve made to your project, so you can `diff` this plugin’s changes.**_

This plugin makes the following changes to your project, which you can review in [/generator](./generator):

- Adds `uikit` to `package.json` dependencies
- Adds the `UIkit` global to `package.json` eslint globals
- `include`s UIKit (and optionally UIKit Icons) in `src/main.js`
- Adds `src/assets/styles/styles.scss` and `include`s that in `src/main.js`
- Sets the global `window.UIkit` in `src/main.js` to allow UIKit’s JavaScript components to be used globally

## Customize styles.scss

This plugin creates `src/assets/styles/styles.scss` which `@includes` the UIKit sass styles in the right order. You can customize the styles / theme according to the [UIKit documentation](https://getuikit.com/docs/sass), or switch the `src/main.js` include to include the `less` styles or rendered css styles as you wish.

## TODO:
- [ ] Prompt for desired style language (scss, less, css)
- [ ] Detect if eslint is enabled before adding global
- [ ] Detect if separate config files are used and make changes appropriately?