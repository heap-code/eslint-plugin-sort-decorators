# eslint-plugin-sort-decorators

[![CI](https://github.com/heap-code/eslint-plugin-sort-decorators/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/heap-code/eslint-plugin-sort-decorators/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-sort-decorators)](https://www.npmjs.com/package/eslint-plugin-sort-decorators)
![Code coverage](.badges/code/coverage.svg)

An ESLint plugin to sort decorators

## Installation

First, the peer dependencies must be installed:

- [eslint](http://eslint.org)
- [typescript](http://www.typescriptlang.org/)
- [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser/)

```bash
npm i --save-dev typescript eslint @typescript-eslint/parser
```

Next, install `eslint-plugin-sort-decorators`:

```bash
npm i --save-dev eslint-plugin-sort-decorators
```

## Usage - Flat Config (Eslint >= 9)

As this plugin only works with _typescript_,
the parser must be set:

```ts
import * as tsParser from "@typescript-eslint/parser"
import eslintSortDecorators from "eslint-plugin-sort-decorators";

export default [
  // other configurations
  {
    files: ["**/*.ts"], 
    plugins: { "sort-decorators": eslintSortDecorators },
    languageOptions: { parser: tsParser },
 
    rules: {
      'sort-decorators/sort-on-classes': 'error',
    }
  },
  // other configurations
]
```

Or simply use a configuration preset:

```ts
import eslintSortDecorators from "eslint-plugin-sort-decorators";

export default [
  // other configurations
  eslintSortDecorators.configs["flat/recommended"],
  // other configurations
]
```

### Configuration presets (Flat config)

| Name                                 | Description                                                    |
|:-------------------------------------|:---------------------------------------------------------------|
| `plugin:sort-decorators/flat/recommended` | Enables all rules with a `warn` security level.                |
| `plugin:sort-decorators/flat/strict`      | Enables all rules with a `error` security level and `autoFix`. |

## Usage - Legacy (Eslint < 9)

As this plugin only works with _typescript_,
the parser must be set in a [.eslintrc](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats)
file:

```json
{
  "parser": "@typescript-eslint/parser"
}
```

The plugin can then be activated by adding `sort-decorators` to the `plugins` property:

```json
{
  "plugins": ["sort-decorators"]
}
```

The different rules can be defined as follows:

```json
{
  "rules": {
    "sort-decorators/sort-on-classes": "error"
  }
}
```

Or simply extends a configuration preset:

```json
{
  "extends": ["plugin:sort-decorators/recommended"]
}
```

### Configuration presets

| Name                                 | Description                                                    |
|:-------------------------------------|:---------------------------------------------------------------|
| `plugin:sort-decorators/recommended` | Enables all rules with a `warn` security level.                |
| `plugin:sort-decorators/strict`      | Enables all rules with a `error` security level and `autoFix`. |

---

> All this configuration can be done on a `override` section:
> <https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work>

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔒 Set in the `strict` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                   | Description                             | 💼 | ⚠️ | 🔧 |
| :----------------------------------------------------- | :-------------------------------------- | :- | :- | :- |
| [sort-on-accessors](docs/rules/sort-on-accessors.md)   | Enforces order of accessors decorators  | 🔒 | ✅  | 🔧 |
| [sort-on-classes](docs/rules/sort-on-classes.md)       | Enforces order of class decorators      | 🔒 | ✅  | 🔧 |
| [sort-on-methods](docs/rules/sort-on-methods.md)       | Enforces order of methods decorators    | 🔒 | ✅  | 🔧 |
| [sort-on-parameters](docs/rules/sort-on-parameters.md) | Enforces order of parameters decorators | 🔒 | ✅  | 🔧 |
| [sort-on-properties](docs/rules/sort-on-properties.md) | Enforces order of properties decorators | 🔒 | ✅  | 🔧 |

<!-- end auto-generated rules list -->

## Releases

See information about breaking changes and release notes [here](https://github.com/heap-code/eslint-plugin-sort-decorators/blob/HEAD/CHANGELOG.md).
