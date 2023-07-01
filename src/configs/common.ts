import { TSESLint } from "@typescript-eslint/utils";
import { Linter } from "eslint";

import { SortRuleOptions } from "../lib/sort-rule";
import {
	SORT_ON_ACCESSORS_NAME,
	SORT_ON_CLASSES_NAME,
	SORT_ON_METHODS_NAME,
	SORT_ON_PARAMETERS_NAME,
	SORT_ON_PROPERTIES_NAME
} from "../rules";

export const PLUGIN_NAME = "sort-decorators";

/**
 * @param ruleEntry the rule entry to set to all rules
 * @returns A configuration with all its rules set with the given entry
 */
export function createConfiguration(ruleEntry: Linter.RuleEntry<[SortRuleOptions]>) {
	return {
		parser: "@typescript-eslint/parser",
		plugins: [PLUGIN_NAME],
		rules: {
			[`${PLUGIN_NAME}/${SORT_ON_ACCESSORS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_CLASSES_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_METHODS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_PARAMETERS_NAME}`]: ruleEntry,
			[`${PLUGIN_NAME}/${SORT_ON_PROPERTIES_NAME}`]: ruleEntry
		}
	} as const satisfies TSESLint.Linter.Config;
}
