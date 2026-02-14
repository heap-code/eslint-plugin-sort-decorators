import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import _import from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import jsdoc from "eslint-plugin-jsdoc";
import mdParser from "eslint-plugin-markdownlint/parser.js";
import prettier from "eslint-plugin-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortExports from "eslint-plugin-sort-exports";
import sortKeysPlus from "eslint-plugin-sort-keys-plus";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import parser from "yaml-eslint-parser";

// eslint-community/eslint-plugin-eslint-comments
// eslint-plugin-perfectionist

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	allConfig: js.configs.all,
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

// eslint-disable-next-line import/no-default-export -- config
export default defineConfig([
	globalIgnores([
		"**/coverage/",
		"**/dist/",
		"**/node_modules/",
		"**/package-lock.json",
		// # Do not ignore the rule configuration files
		"!**/.*rc.json",
		"!**/.release-it.json",
		"!**/.devcontainer/",
		"!**/.github/",
		"!.github/workflows/*.yml",
		"!**/.vscode/",
		".vscode/*",
		"!.vscode/extensions.json",
		"!.vscode/launch.json",
		"!.vscode/settings.json",
		"!.vscode/tasks.json",
		// # Generated files
		"**/CHANGELOG.md",
	]),

	js.configs.recommended,
	comments.recommended,
	{
		extends: compat.extends("plugin:eslint-plugin/recommended"),

		plugins: {
			import: fixupPluginRules(_import),
			prettier,
			sonarjs,
			"sort-destructure-keys": sortDestructureKeys,
			"sort-keys-plus": sortKeysPlus,
			unicorn,
			"unused-imports": unusedImports,
		},

		rules: {
			"@eslint-community/eslint-comments/no-unused-disable": "error",
			"@eslint-community/eslint-comments/require-description": [
				"warn",
				{
					ignore: ["eslint-enable"],
				},
			],
			curly: ["error", "all"],
			"eol-last": "error",
			eqeqeq: "error",

			"eslint-plugin/require-meta-docs-description": "error",
			"eslint-plugin/require-meta-docs-url": "error",

			"func-style": [
				"error",
				"declaration",
				{
					allowArrowFunctions: true,
				},
			],

			"import/first": "error",
			"import/newline-after-import": "error",
			"import/no-default-export": "error",
			"import/no-mutable-exports": "error",
			"import/no-useless-path-segments": "error",

			"import/order": [
				"error",
				{
					alphabetize: {
						order: "asc",
					},

					distinctGroup: false,

					groups: [
						["builtin", "external"],
						["internal", "parent", "sibling", "index"],
						"object",
					],

					"newlines-between": "always",
				},
			],

			"no-alert": "error",
			"no-case-declarations": "off",
			"no-console": "error",
			"no-empty": "error",
			"no-extra-semi": "error",
			"no-mixed-spaces-and-tabs": "off",

			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["*.spec"],
							message:
								"Test files must not be imported in other files (at least not app code).",
						},
					],
				},
			],

			"no-return-await": "error",
			"no-trailing-spaces": "error",
			"no-unused-expressions": "error",
			"no-unused-labels": "error",
			"no-use-before-define": "error",
			"no-var": "error",

			"object-curly-spacing": [
				"error",
				"always",
				{
					objectsInObjects: true,
				},
			],

			"object-property-newline": [
				"warn",
				{
					allowAllPropertiesOnSameLine: true,
				},
			],

			"prefer-const": "error",
			"prefer-rest-params": "error",
			"prefer-template": "error",
			"prettier/prettier": "error",

			quotes: [
				"error",
				"double",
				{
					allowTemplateLiterals: true,
					avoidEscape: true,
				},
			],

			"sort-destructure-keys/sort-destructure-keys": "error",

			"sort-keys": [
				"error",
				"asc",
				{
					allowLineSeparatedGroups: true,
				},
			],

			"sort-keys-plus/sort-keys": [
				"error",
				"asc",
				{
					allowLineSeparatedGroups: true,
				},
			],
		},
	},
	{
		extends: compat.extends("plugin:jsonc/base", "plugin:jsonc/recommended-with-json"),
		files: ["**/*.json"],

		rules: {
			"jsonc/indent": ["error", "tab"],

			"jsonc/key-spacing": [
				"error",
				{
					afterColon: true,
					beforeColon: false,
					mode: "strict",
				},
			],

			"jsonc/no-comments": "warn",

			"jsonc/object-curly-newline": [
				"error",
				{
					consistent: true,
					minProperties: 1,
					multiline: true,
				},
			],

			"jsonc/object-property-newline": [
				"error",
				{
					allowAllPropertiesOnSameLine: false,
				},
			],

			"jsonc/sort-keys": "error",
			"max-len": "off",

			"no-multiple-empty-lines": [
				"error",
				{
					max: 0,
				},
			],
		},
	},
	{
		files: [
			".devcontainer/**/devcontainer.json",
			"**/.eslintrc.json",
			"**/.prettierrc.json",
			"**/tsconfig.json",
			"**/tsconfig.*.json",
			".vscode/*.json",
		],

		rules: {
			"jsonc/no-comments": "off",
		},
	},
	{
		extends: compat.extends("plugin:yml/recommended", "plugin:yml/prettier"),
		files: ["**/*.yml", "**/*.yaml"],

		languageOptions: { parser: parser },
	},
	{
		...jsdoc.configs.recommended,
		files: ["**/*.ts", "**/*.js"],

		plugins: { jsdoc },

		rules: {
			"jsdoc/multiline-blocks": [
				"error",
				{
					minimumLengthForMultiline: 60,
					noMultilineBlocks: true,
				},
			],

			"jsdoc/no-blank-blocks": [
				"error",
				{
					enableFixer: true,
				},
			],

			"jsdoc/no-undefined-types": "off",
			"jsdoc/require-asterisk-prefix": ["error", "always"],
			"jsdoc/require-hyphen-before-param-description": ["error", "never"],

			"jsdoc/require-jsdoc": [
				"warn",
				{
					contexts: ["TSEnumDeclaration", "TSInterfaceDeclaration"],
					publicOnly: true,
				},
			],

			"jsdoc/require-param": [
				"warn",
				{
					exemptedBy: ["inheritDoc", "internal", "private"],
				},
			],

			"jsdoc/require-returns": [
				"warn",
				{
					exemptedBy: ["inheritDoc", "internal", "private"],
				},
			],

			"jsdoc/require-throws": "warn",

			"jsdoc/tag-lines": [
				"error",
				"any",
				{
					startLines: 1,
				},
			],

			"sonarjs/no-all-duplicated-branches": "error",
			"sonarjs/no-element-overwrite": "error",
			"sonarjs/no-identical-conditions": "error",
			"sonarjs/no-identical-expressions": "error",
			"sonarjs/non-existent-operator": "error",
			"sonarjs/prefer-immediate-return": "error",

			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
				},
			],

			"unicorn/no-abusive-eslint-disable": "error",
			"unicorn/no-array-for-each": "error",
			"unicorn/no-await-expression-member": "error",
			"unicorn/no-empty-file": "error",
			"unicorn/no-for-loop": "error",
			"unicorn/no-lonely-if": "error",
			"unicorn/no-negated-condition": "error",
			"unicorn/no-thenable": "error",
			"unicorn/prefer-array-find": "error",
			"unicorn/prefer-array-flat": "error",
			"unicorn/prefer-array-flat-map": "error",
			"unicorn/prefer-array-some": "error",
			"unicorn/prefer-default-parameters": "error",
			"unicorn/prefer-includes": "error",
			"unicorn/prefer-object-from-entries": "error",
			"unicorn/prefer-optional-catch-binding": "error",
			"unicorn/throw-new-error": "error",
			"unused-imports/no-unused-imports": "error",

			"unused-imports/no-unused-vars": [
				"warn",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		files: ["**/*.ts"],

		extends: compat.extends(
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/recommended-requiring-type-checking",
			"plugin:@typescript-eslint/strict",
		),

		languageOptions: {
			ecmaVersion: 5,
			parser: tsParser,
			sourceType: "module",

			parserOptions: { project: "./tsconfig.lint.json" },
		},

		rules: {
			"@typescript-eslint/array-type": ["error", { default: "array-simple" }],

			"@typescript-eslint/ban-ts-comment": [
				"error",
				{
					"ts-expect-error": {
						descriptionFormat: "^ - TS\\d+: .+$",
					},
				},
			],

			"@typescript-eslint/consistent-generic-constructors": ["error", "constructor"],
			"@typescript-eslint/consistent-indexed-object-style": ["error", "record"],

			"@typescript-eslint/consistent-type-assertions": [
				"error",
				{
					assertionStyle: "as",
					objectLiteralTypeAssertions: "never",
				},
			],

			"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/explicit-member-accessibility": "error",

			"@typescript-eslint/member-ordering": [
				"error",
				{
					default: {
						memberTypes: [
							"signature",
							"public-static-field",
							"protected-static-field",
							"private-static-field",
							"public-static-get",
							"protected-static-get",
							"private-static-get",
							"static-initialization",
							"public-static-method",
							"protected-static-method",
							"private-static-method",
							"public-abstract-field",
							"protected-abstract-field",
							"public-instance-field",
							"protected-instance-field",
							"private-instance-field",
							["public-abstract-get", "public-abstract-set"],
							["public-instance-get", "public-instance-set"],
							["protected-abstract-get", "protected-abstract-set"],
							["protected-instance-get", "protected-instance-set"],
							["private-instance-get", "private-instance-set"],
							"constructor",
							"public-abstract-method",
							"public-instance-method",
							"protected-abstract-method",
							"protected-instance-method",
							"private-instance-method",
						],
					},

					interfaces: {
						memberTypes: ["field", "constructor", "method"],
						order: "alphabetically",
					},
				},
			],

			"@typescript-eslint/no-confusing-non-null-assertion": "error",

			"@typescript-eslint/no-confusing-void-expression": [
				"error",
				{
					ignoreArrowShorthand: true,
					ignoreVoidOperator: true,
				},
			],

			"@typescript-eslint/no-extra-non-null-assertion": "error",

			"@typescript-eslint/no-extraneous-class": ["warn", { allowWithDecorator: true }],

			"@typescript-eslint/no-for-in-array": "error",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/no-misused-new": "error",
			"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
			"@typescript-eslint/no-redundant-type-constituents": "error",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
			"@typescript-eslint/no-unsafe-declaration-merging": "warn",
			"@typescript-eslint/prefer-for-of": "warn",
			"@typescript-eslint/prefer-includes": "warn",
			"@typescript-eslint/prefer-optional-chain": "warn",
			"@typescript-eslint/prefer-reduce-type-parameter": "error",
			"@typescript-eslint/prefer-return-this-type": "error",
			"@typescript-eslint/prefer-ts-expect-error": "error",
			"@typescript-eslint/sort-type-constituents": "error",

			"jsdoc/require-param-type": "off",
			"jsdoc/require-returns-type": "off",
		},
	},
	{
		files: ["**/jest.config.ts", "src/index.ts", "src/configs/*.ts"],

		rules: {
			"import/no-default-export": "off",
		},
	},
	{
		files: ["**/index.ts"],

		plugins: { "sort-exports": sortExports },

		rules: {
			"sort-exports/sort-exports": [
				"error",
				{
					sortDir: "asc",
				},
			],
		},
	},
	{
		extends: compat.extends("plugin:jest/recommended", "plugin:jest/style"),
		files: ["**/*.spec.ts", "**/*.spec.js"],

		plugins: { jest },

		languageOptions: {
			globals: {
				...globals.jest,
			},
		},

		rules: {
			"@typescript-eslint/no-non-null-assertion": "off",

			"jest/consistent-test-it": ["error", { fn: "it" }],

			"jest/prefer-lowercase-title": ["error", { ignore: ["describe"] }],
		},
	},
	{
		extends: compat.extends("plugin:markdownlint/recommended"),
		files: ["**/*.md"],

		languageOptions: { parser: mdParser },

		rules: {
			"markdownlint/md013": ["error", { line_length: 100, tables: false }],

			"markdownlint/md033": [
				"error",
				{ allowed_elements: ["a", "img", "br", "details", "summary", "code"] },
			],

			"no-trailing-spaces": "off",
			"prettier/prettier": "off",
		},
	},
	{
		files: ["**/Dockerfile"],

		languageOptions: { parser: parser },

		rules: { "prettier/prettier": "error" },
	},
	{
		files: ["docs/rules/*.md"],

		rules: { "markdownlint/md024": "off" },
	},
	{
		files: ["**/README.md"],

		rules: { "unicorn/filename-case": "off" },
	},
]);
