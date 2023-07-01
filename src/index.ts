import { TSESLint } from "@typescript-eslint/utils";

import * as configs from "./configs";
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
	sortOnProperties
} from "./rules";

export default {
	configs: {
		recommended: configs.recommended,
		strict: configs.strict
	},
	rules: {
		[SORT_ON_ACCESSORS_NAME]: sortOnAccessors,
		[SORT_ON_CLASSES_NAME]: sortOnClasses,
		[SORT_ON_METHODS_NAME]: sortOnMethods,
		[SORT_ON_PARAMETERS_NAME]: sortOnParameters,
		[SORT_ON_PROPERTIES_NAME]: sortOnProperties
	}
} satisfies TSESLint.Linter.Plugin;
