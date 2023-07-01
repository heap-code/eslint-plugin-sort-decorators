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

## Usage

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

> All these configuration can be done on a `override` section:
> <https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work>

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                   | 🔧 |
| :----------------------------------------------------- | :- |
| [sort-on-accessors](docs/rules/sort-on-accessors.md)   | 🔧 |
| [sort-on-classes](docs/rules/sort-on-classes.md)       | 🔧 |
| [sort-on-methods](docs/rules/sort-on-methods.md)       | 🔧 |
| [sort-on-parameters](docs/rules/sort-on-parameters.md) | 🔧 |
| [sort-on-properties](docs/rules/sort-on-properties.md) | 🔧 |

<!-- end auto-generated rules list -->
