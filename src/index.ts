import * as tsParser from "@typescript-eslint/parser";
import type { TSESLint } from "@typescript-eslint/utils";

import * as configs from "./configs";
import { PLUGIN_NAME } from "./configs/common";
import {
	SORT_ON_ACCESSORS_NAME,
	SORT_ON_CLASSES_NAME,
	SORT_ON_METHODS_NAME,
	SORT_ON_PARAMETERS_NAME,
	SORT_ON_PROPERTIES_NAME,
	sortOnAccessors,
	sortOnClasses,
	sortOnMethods,
	sortOnParameters,
	sortOnProperties,
} from "./rules";

function toV9(configV8: typeof configs.recommended) {
	const { parser: _, ...configV9 } = configV8;

	return {
		...configV9,
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: { parser: tsParser },
		// Set after
		plugins: undefined,
	} as const satisfies TSESLint.FlatConfig.Config;
}

const plugin = {
	configs: {
		// v8
		recommended: configs.recommended,
		strict: configs.strict,

		// v9
		"flat/recommended": toV9(configs.recommended),
		"flat/strict": toV9(configs.strict),
	},
	rules: {
		[SORT_ON_ACCESSORS_NAME]: sortOnAccessors,
		[SORT_ON_CLASSES_NAME]: sortOnClasses,
		[SORT_ON_METHODS_NAME]: sortOnMethods,
		[SORT_ON_PARAMETERS_NAME]: sortOnParameters,
		[SORT_ON_PROPERTIES_NAME]: sortOnProperties,
	},
} satisfies TSESLint.Linter.Plugin;

// @ts-expect-error - TS2322: better?
plugin.configs["flat/recommended"].plugins = plugin.configs["flat/strict"].plugins = {
	[PLUGIN_NAME]: plugin,
};

export default plugin;
