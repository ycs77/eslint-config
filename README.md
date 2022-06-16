# @ycs77/eslint-config

> Fork from [@antfu/eslint-config](https://github.com/antfu/eslint-config)

[![npm](https://img.shields.io/npm/v/@ycs77/eslint-config?style=flat-square)](https://npmjs.com/package/@ycs77/eslint-config)

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- TypeScript, Vue, React out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas for cleaner commit diff
- Reasonable defaults, best practices, only one-line of config

## Usage

### Install

```bash
pnpm add -D eslint @ycs77/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": "@ycs77"
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

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

### Config VS Code auto fix

Create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Testing @ycs77/eslint-config against external packages

You may wish to test your locally-modified copy of @ycs77/eslint-config against another package that is built with @ycs77/eslint-config. For pnpm, after building @ycs77/eslint-config, you can use [`pnpm.overrides`](https://pnpm.io/package_json#pnpmoverrides). Please note that `pnpm.overrides` must be specified in the root `package.json` and you must first list the package as a dependency in the root `package.json`:

```json
{
  "devDependencies": {
    "@ycs77/eslint-config": "*"
  },
  "pnpm": {
    "overrides": {
      "@ycs77/eslint-config": "link:../eslint-config/packages/all"
    }
  }
}
```

And install the `@rushstack/eslint-patch` into project to fix the eslint with monorepo bug:

```
pnpm add @rushstack/eslint-patch -D
```

Create `.eslintrc.js` file:

```js
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: '@ycs77',
  parserOptions: { tsconfigRootDir: __dirname },
}
```

And re-run `pnpm install` to link the package.

## License

MIT
