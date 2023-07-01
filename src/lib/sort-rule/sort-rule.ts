import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

import { SortRuleMessageIds } from "./sort-rule.message-ids";
import { SortRuleOptions } from "./sort-rule.options";

type SortRule = ESLintUtils.RuleWithMetaAndName<
	[SortRuleOptions],
	SortRuleMessageIds,
	TSESLint.RuleListener
>;

interface SortRuleMeta
	extends Omit<SortRule["meta"], "docs" | "fixable" | "messages" | "schema" | "type"> {
	docs: Omit<SortRule["meta"]["docs"], "recommended">;
}

/**
 * The information to create a "sort-decorators" rule
 */
export interface SortRuleWithMetaAndName extends Omit<SortRule, "defaultOptions" | "meta"> {
	meta: SortRuleMeta;
}

const sortRuleCreator = ESLintUtils.RuleCreator(name => name);

/**
 * @param rule the parameter to create a rule
 * @returns the created rule
 */
export function createSortRule(rule: SortRuleWithMetaAndName) {
	return sortRuleCreator({
		...rule,
		defaultOptions: [{ autoFix: false, caseSensitive: true, direction: "asc" }],
		meta: {
			schema: {
				// TODO
			},

			...rule.meta,
			docs: {
				requiresTypeChecking: false,

				...rule.meta.docs,
				recommended: "warn"
			},
			fixable: "code",
			messages: {
				"incorrect-order":
					"Decorator `@{{ after }}` should be placed before `@{{ previous }}`."
			},
			type: "layout"
		}
	});
}
