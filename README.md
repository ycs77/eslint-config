# @ycs77/eslint-config

> Extended from [@antfu/eslint-config](https://github.com/antfu/eslint-config)

[![NPM version][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE)
[![GitHub Tests Action Status][ico-github-action]][link-github-action]
[![Total Downloads][ico-downloads]][link-downloads]

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, JSX, Vue out-of-box
- Lints also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- Respects `.gitignore` by default
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- **Style principle**: Minimal for reading, stable for diff, consistent

## Usage

### Install

```bash
yarn add eslint @ycs77/eslint-config -D
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import ycs77 from '@ycs77/eslint-config'

export default ycs77()
```

With CJS:

```js
// eslint.config.js
const ycs77 = require('@ycs77/eslint-config').default

module.exports = ycs77()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## Customization

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `ycs77` preset:

```js
// eslint.config.js
import ycs77 from '@ycs77/eslint-config'

export default ycs77()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import ycs77 from '@ycs77/eslint-config'

export default ycs77({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ],
})
```

The `ycs77` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import ycs77 from '@ycs77/eslint-config'

export default ycs77(
  {
    // Configures for ycs77's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

More advanced you can see the [@antfu/eslint-config's customization](https://github.com/antfu/eslint-config#customization) for more details.

## Credit

* [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

Under the [MIT LICENSE](LICENSE)

[ico-version]: https://img.shields.io/npm/v/@ycs77/eslint-config?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square
[ico-github-action]: https://img.shields.io/github/actions/workflow/status/ycs77/eslint-config/ci.yml?branch=main&label=tests&style=flat-square
[ico-downloads]: https://img.shields.io/npm/dt/@ycs77/eslint-config?style=flat-square

[link-npm]: https://www.npmjs.com/package/@ycs77/eslint-config
[link-github-action]: https://github.com/ycs77/eslint-config/actions/workflows/ci.yml?query=branch%3Amain
[link-downloads]: https://www.npmjs.com/package/@ycs77/eslint-config
